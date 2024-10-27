// First, update the API route (src/app/api/getPlaylistVideos/route.ts)
import { NextResponse } from 'next/server';
import axios from 'axios';

interface YouTubePlaylistItem {
  snippet: {
    resourceId: {
      videoId: string;
    };
    title: string;
    thumbnails: {
      medium: {
        url: string;
      };
    };
  };
}

interface YouTubePlaylistResponse {
  items: YouTubePlaylistItem[];
}

const API_KEY = process.env.YOUTUBE_API_KEY;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const playlistId = searchParams.get('playlistId');

  if (!playlistId) {
    return NextResponse.json({ error: 'Invalid playlist ID' }, { status: 400 });
  }

  const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=50&key=${API_KEY}`;

  try {
    const response = await axios.get<YouTubePlaylistResponse>(url);
    const items = response.data.items;

    const videos = items.map(item => ({
      id: item.snippet.resourceId.videoId,
      url: `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.medium.url
    }));

    return NextResponse.json({ videos });
  } catch (error) {
    console.error('Error fetching video links:', error);
    return NextResponse.json({ error: 'Error fetching video links' }, { status: 500 });
  }
}
