"use client"

import React from 'react';
import VideoLinkExtractor from './VideoLinkExtractor';

const HeroSection = () => {
  return (
    <div className="relative min-h-screen bg-[#0A0C15] overflow-hidden font-sora pt-28">
      {/* Static Background Illustrations */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Main Grid Pattern */}
        <div className="absolute inset-0" 
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #2c62e0 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            opacity: 0.15
          }}>
        </div>

        {/* Top Right Circles */}
        <div className="absolute top-20 right-20">
          <svg width="400" height="400" viewBox="0 0 400 400">
            <circle cx="200" cy="200" r="160" stroke="#2c62e0" strokeWidth="1" fill="none" opacity="0.3" />
            <circle cx="200" cy="200" r="120" stroke="#2c62e0" strokeWidth="1" fill="none" opacity="0.4" />
            <circle cx="200" cy="200" r="80" stroke="#2c62e0" strokeWidth="1" fill="none" opacity="0.5" />
          </svg>
        </div>

        {/* Bottom Left Squares */}
        <div className="absolute -bottom-20 -left-20">
          <svg width="400" height="400" viewBox="0 0 400 400">
            <rect x="80" y="80" width="240" height="240" stroke="#2c62e0" strokeWidth="1" fill="none" opacity="0.3" />
            <rect x="120" y="120" width="160" height="160" stroke="#2c62e0" strokeWidth="1" fill="none" opacity="0.4" />
            <rect x="160" y="160" width="80" height="80" stroke="#2c62e0" strokeWidth="1" fill="none" opacity="0.5" />
          </svg>
        </div>

        {/* Decorative Lines */}
        <div className="absolute top-1/4 right-0 w-1/3 h-px bg-gradient-to-r from-transparent via-[#2c62e0] to-transparent opacity-30"></div>
        <div className="absolute bottom-1/3 left-0 w-1/3 h-px bg-gradient-to-r from-[#2c62e0] via-[#2c62e0] to-transparent opacity-30"></div>
        
        {/* Additional Corner Elements */}
        <div className="absolute top-40 left-40">
          <svg width="160" height="160" viewBox="0 0 160 160">
            <path d="M80 20L140 80L80 140L20 80L80 20Z" stroke="#2c62e0" strokeWidth="1" fill="none" opacity="0.4" />
            <path d="M80 40L120 80L80 120L40 80L80 40Z" stroke="#2c62e0" strokeWidth="1" fill="none" opacity="0.5" />
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative pt-20 pb-24 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Convert Your{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2c62e0] to-[#4a7cf5]">
              Playlist
            </span>{" "}
            To
            <span className="bg-clip-text ml-3 text-transparent bg-gradient-to-r from-[#2c62e0] to-[#4a7cf5]">
              Links
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Instantly convert playlists into structured learning paths.
          </p>
        </div>

        {/* Video Link Extractor Component */}
        <VideoLinkExtractor />
      </div>
    </div>
  );
};

export default HeroSection;