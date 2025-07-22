
import React, { useState } from 'react';
import * as m3u8Parser from 'm3u8-parser';
import { saveAs } from 'file-saver';
import { Box, Button, TextField, Typography, Paper, LinearProgress, Alert } from '@mui/material';

const M3U8Downloader: React.FC = () => {
  const [m3u8Url, setM3u8Url] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [showCorsWarning, setShowCorsWarning] = useState(false);

  const handleDownload = async () => {
    setIsLoading(true);
    setError(null);
    setProgress(0);
    setShowCorsWarning(true);

    try {
      const parser = new m3u8Parser.Parser();
      // Use a CORS proxy for fetching the manifest and segments
      const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
      const response = await fetch(`${proxyUrl}${m3u8Url}`);
      const manifest = await response.text();

      parser.push(manifest);
      parser.end();

      const segments = parser.manifest.segments.map((segment) => new URL(segment.uri, m3u8Url).href);

      if (!segments || segments.length === 0) {
        throw new Error('No video segments found in the M3U8 file.');
      }

      const totalSegments = segments.length;
      const videoChunks: BlobPart[] = [];

      for (let i = 0; i < totalSegments; i++) {
        const segmentUrl = segments[i];
        try {
          const segmentResponse = await fetch(`${proxyUrl}${segmentUrl}`);
          if (!segmentResponse.ok) {
            throw new Error(`Failed to fetch segment ${i + 1}/${totalSegments}: ${segmentResponse.statusText}`);
          }
          const segmentBlob = await segmentResponse.blob();
          videoChunks.push(segmentBlob);
          setProgress(((i + 1) / totalSegments) * 100);
        } catch (segmentError) {
          console.error(`Skipping segment ${i + 1} due to error:`, segmentError);
        }
      }

      if (videoChunks.length === 0) {
        throw new Error('All video segments failed to download.');
      }

      const finalVideo = new Blob(videoChunks, { type: 'video/mp2t' });
      saveAs(finalVideo, 'downloaded_video.ts');

    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 3, width: '100%', bgcolor: 'transparent', boxShadow: 'none', flexGrow: 1 }}>
      <Typography variant="h1" component="h1" sx={{ mb: 4, fontSize: '2.5rem' }}>M3U8 Downloader</Typography>

      {showCorsWarning &&
        <Alert severity="warning" sx={{ mb: 2 }}>
          Due to browser security restrictions (CORS), this tool might not be able to download certain m3u8 files. If the download fails, please check the developer console for error messages.
        </Alert>
      }

      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <TextField
          fullWidth
          label="M3U8 URL"
          variant="outlined"
          value={m3u8Url}
          onChange={(e) => setM3u8Url(e.target.value)}
          disabled={isLoading}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleDownload}
          disabled={isLoading || !m3u8Url}
          sx={{ height: '56px' }} // Match TextField height
        >
          {isLoading ? 'Downloading...' : 'Download'}
        </Button>
      </Box>

      {isLoading && (
        <Box sx={{ width: '100%', mt: 2 }}>
          <LinearProgress variant="determinate" value={progress} />
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mt: 1 }}>
            {`${progress.toFixed(2)}%`}
          </Typography>
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </Paper>
  );
};

export default M3U8Downloader;

