import type { Video } from '../constants';
import { domains } from '../constants';

export const fetchVideos = async (
  domain: keyof typeof domains,
  // ip: string,
  litemode: string,
  videoIds: string[]
): Promise<Video[]> => {
  const baseUrl = domains[domain];
  const params = new URLSearchParams({
    ids: videoIds.join(','),
    limit: String(videoIds.length),
    litemode,
  });

  const url = `${baseUrl}/api/videos/v1?${params}`;

  const response = await fetch(url, {
    // headers: {
    //   'Cf-Connecting-Ip': ip,
    // },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API request failed with status ${response.status}: ${errorText}`);
  }

  const data = await response.json();
  // Assuming the API returns a list of videos directly.
  return data as Video[];
};
