"use client"
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Music, Youtube, Loader2, ArrowRight, PlayCircle, Video, Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useRouter } from 'next/navigation';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/lib/auth';

// Define proper types
interface Video {
  title: string;
  videoId: string;
  thumbnail: string;
}

interface PlaylistData {
  id: string;
  videos: Video[];
}

const VideoLinkExtractor = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { user, token } = useAuth();
  
  const [playlistUrl, setPlaylistUrl] = useState('');
  const [playlistData, setPlaylistData] = useState<PlaylistData | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const extractPlaylistId = (url: string): string | null => {
    const patterns = [
      /list=([^&]+)/,
      /playlist\/([^?&]+)/,
      /p\/([^?&]+)/
    ];

    for (const regex of patterns) {
      const match = url.match(regex);
      if (match) return match[1];
    }
    return null;
  };

  const savePlaylist = async (playlistId: string, videos: Video[]) => {
    if (!user || !token) {
      toast({
        title: "Error",
        description: "Please sign in to save playlists",
        variant: "destructive",
        duration: 3000,
      });
      return false;
    }

    setIsSaving(true);
    try {
      const response = await fetch('/api/playlists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          playlistId,
          videos,
          userId: user.id
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to save playlist');
      }

      toast({
        title: "Success!",
        description: "Playlist saved successfully",
        duration: 3000,
      });

      router.push('/paths');
      return true;
    } catch (error) {
      console.error('Error saving playlist:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save playlist",
        variant: "destructive",
        duration: 3000,
      });
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const fetchPlaylistVideos = async (playlistId: string): Promise<Video[]> => {
    const response = await fetch(`/api/getPlaylistVideos?playlistId=${playlistId}`);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch playlist videos');
    }
    
    if (!Array.isArray(data.videos)) {
      throw new Error('Invalid response format from API');
    }
    
    return data.videos;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!playlistUrl.trim()) {
      setError('Please enter a YouTube playlist URL');
      return;
    }

    if (!user || !token) {
      toast({
        title: "Error",
        description: "Please sign in to create a learning path",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      const playlistId = extractPlaylistId(playlistUrl);
      
      if (!playlistId) {
        throw new Error('Invalid YouTube playlist URL');
      }

      // First fetch the videos
      const videos = await fetchPlaylistVideos(playlistId);
      
      // Update the UI with the fetched data
      setPlaylistData({
        id: playlistId,
        videos: videos
      });

      // Then try to save the playlist
      const savedSuccessfully = await savePlaylist(playlistId, videos);
      
      if (!savedSuccessfully) {
        throw new Error('Failed to save playlist');
      }

    } catch (error) {
      console.error('Error in handleSubmit:', error);
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
      setPlaylistData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const isValidUrl = (url: string): boolean => {
    return url.trim() !== '' && (
      url.includes('youtube.com') || 
      url.includes('youtu.be')
    );
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 shadow-2xl border border-white/10">
        <div className="flex items-center gap-3 mb-8">
         
          <h2 className="text-2xl font-semibold text-white">Create Learning Path</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-white/90 text-sm font-medium block mb-2">
              Paste Your YouTube Playlist URL
            </label>
            <div className="relative group">
              <Input
                type="text"
                value={playlistUrl}
                onChange={(e) => {
                  setPlaylistUrl(e.target.value);
                  setError(''); // Clear error when user types
                }}
                placeholder="https://www.youtube.com/playlist?list="
                className="bg-white/5 border-white/10 text-white pl-12 h-14 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
              <PlayCircle className="absolute left-4 top-4 h-6 w-6 text-blue-500 group-hover:scale-110 transition-transform duration-200" />
            </div>
            {error && (
              <div className="flex items-center gap-2 text-red-400 mt-2 text-sm">
                <div className="w-1 h-1 rounded-full bg-red-400" />
                {error}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading || isSaving || !isValidUrl(playlistUrl)}
            className="w-full h-14 bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-500 hover:to-blue-400 disabled:opacity-50 text-white text-lg font-medium transition-all duration-300 ease-out transform hover:scale-[1.02] disabled:hover:scale-100 flex items-center justify-center gap-2"
          >
            {isLoading || isSaving ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                {isLoading ? 'Processing...' : 'Saving...'}
              </>
            ) : (
              <>
                <Plus className="h-5 w-5" />
                Create New Path
              </>
            )}
          </button>
        </form>

        {playlistData && playlistData.videos.length > 0 && (
          <div className="mt-8">
            <Card className="bg-white/5 hover:bg-white/10 transition-all cursor-pointer group">
              <div className="flex p-4 gap-4">
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={playlistData.videos[0].thumbnail}
                    alt={playlistData.videos[0].title}
                    className="w-48 h-28 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded-md flex items-center gap-1.5">
                    <Video className="h-3.5 w-3.5" />
                    <span className="text-xs text-white">{playlistData.videos.length}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-white mb-2 line-clamp-2">
                    {playlistData.videos[0].title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-3">
                    Processing your playlist...
                  </p>
                  <div className="flex items-center gap-2 text-blue-400 text-sm font-medium">
                    Creating Path 
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoLinkExtractor;