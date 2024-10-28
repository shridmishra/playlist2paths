"use client"
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Music, Youtube, Loader2, ArrowRight, PlayCircle, Video, Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useRouter } from 'next/navigation';
import { PlaylistData } from '@/types';
import GradientButton from './ui/GradientButton';

const VideoLinkExtractor = () => {
  const router = useRouter();
  const [playlistUrl, setPlaylistUrl] = useState<string>('');
  const [playlistData, setPlaylistData] = useState<PlaylistData | null>(null);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const extractPlaylistId = (url: string): string | null => {
    const regex = /list=([^&]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const playlistId = extractPlaylistId(playlistUrl);

    if (!playlistId) {
      setError('Invalid YouTube playlist URL');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/getPlaylistVideos?playlistId=${playlistId}`);
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      setPlaylistData({
        id: playlistId,
        videos: data.videos
      });
      setError('');
    } catch (error) {
      setError('Error fetching video links. Please try again.');
      setPlaylistData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlaylistClick = () => {
    if (playlistData) {
      localStorage.setItem('currentPlaylist', JSON.stringify(playlistData));
      router.push('/paths');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 shadow-2xl border border-white/10">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-blue-500/10 rounded-lg">
            <Youtube className="h-6 w-6 text-blue-500" />
          </div>
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
                onChange={(e) => setPlaylistUrl(e.target.value)}
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

          <GradientButton
            type="submit"
            disabled={isLoading}
            className="w-full h-14 bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-500 hover:to-blue-400 disabled:opacity-50 text-white text-lg font-medium transition-all duration-300 ease-out transform hover:scale-[1.02] disabled:hover:scale-100 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Plus className="h-5 w-5" />
                Create New Path
              </>
            )}
          </GradientButton>
        </form>

        {playlistData && playlistData.videos.length > 0 && (
          <div className="mt-8">
            <Card 
              className="bg-white/5 hover:bg-white/10 transition-all cursor-pointer group"
              onClick={handlePlaylistClick}
            >
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
                    Click to view all videos in this playlist
                  </p>
                  <div className="flex items-center gap-2 text-blue-400 text-sm font-medium">
                    View Path 
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