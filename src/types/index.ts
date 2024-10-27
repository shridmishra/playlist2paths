// Represents each video in the playlist
export interface Video {
    id: string;
    url: string;
    title: string;
    thumbnail: string;
  }
  
  // Represents the playlist data containing multiple videos
  export interface PlaylistData {
    id: string;
    videos: {
      id: string;
      url: string;
      title: string;
      thumbnail: string;
    }[];
  }

  // Define types for the API response
export interface YouTubePlaylistItem {
    snippet: {
      title: string;
      thumbnails: {
        medium: {
          url: string;
        };
      };
      resourceId: {
        videoId: string;
      };
    };
  }
  

export interface YouTubePlaylistResponse {
    items: YouTubePlaylistItem[];
  }