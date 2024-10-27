"use client";

import React, { useEffect, useState } from 'react';
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useRouter } from 'next/navigation';
import { Video, PlaylistData } from '@/types';

const PlaylistView: React.FC = () => {
  const router = useRouter();
  const [playlistData, setPlaylistData] = useState<PlaylistData | null>(null);

  useEffect(() => {
    const savedPlaylist = localStorage.getItem('currentPlaylist');
    if (savedPlaylist) {
      try {
        setPlaylistData(JSON.parse(savedPlaylist) as PlaylistData);
      } catch (error) {
        console.error("Error parsing playlist data:", error);
      }
    }
  }, []);

  if (!playlistData) {
    return (
      <div className="min-h-screen bg-gray-900 p-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-white">Loading playlist...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-400 hover:text-white mb-6"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Home
        </button>

        <h1 className="text-2xl font-bold text-white mb-6">
          Playlist Videos ({playlistData.videos.length})
        </h1>

        <div className="grid gap-6">
          {playlistData.videos.map((video, index) => (
            <Card
              key={video.id}
              className="bg-white/5 hover:bg-white/10 transition-all"
            >
              <a
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex p-4 gap-4"
              >
                <div className="relative">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-48 h-28 object-cover rounded-lg"
                  />
                  <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-xs text-white">
                    #{index + 1}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-white mb-2">
                    {video.title}
                  </h3>
                  <p className="text-gray-400 text-sm break-all">
                    {video.url}
                  </p>
                </div>
              </a>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlaylistView;
