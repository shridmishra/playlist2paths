import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Types for better type safety
type VideoInput = {
  title: string;
  videoId: string;
  thumbnail: string;
};

type PlaylistInput = {
  playlistId: string;
  videos: VideoInput[];
  userId: string;
};

export async function POST(req: Request) {
  try {
    // Validate authentication header
    const authHeader = req.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ 
        error: 'Missing authorization header' 
      }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return NextResponse.json({ 
        error: 'Invalid token format' 
      }, { status: 401 });
    }

    // Parse request body
    let body: PlaylistInput;
    try {
      body = await req.json();
    } catch (error) {
      return NextResponse.json({ 
        error: 'Invalid request body' 
      }, { status: 400 });
    }

    const { playlistId, videos, userId } = body;

    // Validate required fields
    if (!playlistId || !videos || !Array.isArray(videos) || !userId) {
      return NextResponse.json({ 
        error: 'Missing required fields' 
      }, { status: 400 });
    }

    // Validate video data
    if (!videos.every(video => 
      typeof video.title === 'string' && 
      typeof video.videoId === 'string' && 
      typeof video.thumbnail === 'string'
    )) {
      return NextResponse.json({ 
        error: 'Invalid video data format' 
      }, { status: 400 });
    }

    // Check for existing playlist
    const existingPlaylist = await prisma.playlist.findFirst({
      where: {
        youtubeId: playlistId,
        userId: userId
      }
    });

    if (existingPlaylist) {
      return NextResponse.json({ 
        error: 'Playlist already exists for this user',
        playlistId: existingPlaylist.id 
      }, { status: 409 });
    }

    // Create new playlist with videos
    const playlist = await prisma.playlist.create({
      data: {
        youtubeId: playlistId,
        userId: userId,
        createdAt: new Date(),
        updatedAt: new Date(),
        videos: {
          create: videos.map((video, index) => ({
            title: video.title,
            videoId: video.videoId,
            thumbnail: video.thumbnail,
            position: index,
            createdAt: new Date(),
            updatedAt: new Date()
          }))
        }
      },
      include: {
        videos: {
          orderBy: {
            position: 'asc'
          }
        }
      }
    });

    return NextResponse.json({
      success: true,
      playlist
    });

  } catch (error) {
    console.error('Error saving playlist:', error);
    return NextResponse.json({
      error: 'Failed to save playlist',
      details: process.env.NODE_ENV === 'development' ? error : undefined
    }, { status: 500 });
  }
}

// Zustand store for authentication
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name?: string;
  // Add other user properties as needed
}

interface AuthState {
  user: User | null;
  token: string | null;
  setAuth: (user: User, token: string) => void;
  clearAuth: () => void;
  isAuthenticated: () => boolean;
}

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      setAuth: (user, token) => set({ user, token }),
      clearAuth: () => set({ user: null, token: null }),
      isAuthenticated: () => {
        const state = get();
        return !!(state.user && state.token);
      },
    }),
    {
      name: 'auth-storage', // name for localStorage key
      partialize: (state) => ({ 
        user: state.user,
        token: state.token 
      })
    }
  )
);