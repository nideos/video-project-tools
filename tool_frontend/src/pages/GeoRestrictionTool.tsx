import { useState } from 'react';
import { Box, Button, FormControl, InputLabel, Select, MenuItem, Typography, Paper, List, ListItem, ListItemText, Avatar, Stack } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import Papa from 'papaparse';
import { fetchVideos } from '../services/Video';
import type { Video } from '../constants';
import { domains, litemodes } from '../constants';

const GeoRestrictionTool = () => {
  const [domain, setDomain] = useState<keyof typeof domains>('stg');
  const [videoIds, setVideoIds] = useState<string[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [requestCompleted, setRequestCompleted] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setRequestCompleted(false);
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results: { data: { vod_id: string }[] }) => {
          const ids = results.data.map((row: { vod_id: string }) => row.vod_id).filter(Boolean);
          setVideoIds(ids);
        },
        error: (err) => {
          setError(`CSV 解析錯誤: ${err.message}`);
        }
      });
    }
  };

  const handleApiCall = async () => {
    if (videoIds.length === 0) {
      setError('請先上傳包含 vod_id 的 CSV 檔案。');
      return;
    }

    setLoading(true);
    setError('');
    setRequestCompleted(false);

    try {
      const result = await fetchVideos(domain, litemodes.lite, videoIds);
      setVideos(result);
      console.log('Response:', result);
    } catch (e: unknown) {
      setError(`API 請求失敗: ${e}`);
    } finally {
      setLoading(false);
      setRequestCompleted(true);
    }
  };

  return (
    <Paper sx={{ p: 3, width: '100%', bgcolor: 'transparent', boxShadow: 'none', flexGrow: 1 }}>
      <Typography variant="h1" component="h1" sx={{ mb: 4, fontSize: '2.5rem' }}>地區限制驗證</Typography>

      <FormControl fullWidth margin="normal">
        <InputLabel id="domain-select-label">選擇 Domain</InputLabel>
        <Select
          sx={{
            width: '15%'
          }}
          labelId="domain-select-label"
          value={domain}
          label="選擇 Domain"
          onChange={(e: SelectChangeEvent) => setDomain(e.target.value as keyof typeof domains)}
        >
          <MenuItem value="stg">Staging</MenuItem>
          <MenuItem value="aiyifan">愛一帆</MenuItem>
          <MenuItem value="nivod">泥視頻</MenuItem>
        </Select>
      </FormControl>
      <Stack direction="row" spacing={2} sx={{ my: 2 }}>
          <Button variant="contained" component="label" sx={{ width: '120px' }}>
            上傳 CSV
            <input type="file" accept=".csv" hidden onChange={handleFileChange} />
          </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={handleApiCall}
          disabled={loading || videoIds.length === 0}
        >
          {loading ? '執行中...' : '執行 API 請求'}
        </Button>
      </Stack>

      {fileName && <Typography>{fileName} ({videoIds.length} IDs)</Typography>}


      {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}

      {videos.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <List>
            {videos.map((video) => (
              <ListItem key={video.vod_id}>
                <Avatar
                  src={video.vod_pic}
                  alt={video.vod_name}
                  variant="rounded"
                  sx={{ width: 100, height: 60, mr: 2 }}
                />
                <ListItemText primary={video.vod_name} secondary={video.vod_id} sx={{ ml: 2 }} />


              </ListItem>
            ))}
          </List>
        </Box>
      )}

      {!loading && requestCompleted && videos.length === 0 && (videoIds.length > 0) && (
        <Typography variant="h2" sx={{ mt: 3, color: 'text.secondary' }}>所有影片都已屏蔽</Typography>
      )}
    </Paper>
  );
};

export default GeoRestrictionTool;
