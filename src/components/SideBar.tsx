"use client";

import React from 'react';
import Link from 'next/link';
import { useState } from 'react';
import { FaHome, FaShoppingBag, FaTshirt, FaPlusCircle, FaCog, FaHeart, FaExpand } from 'react-icons/fa';

const SideBar: React.FC = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  return (
    <div className="fixed bottom-0 left-0 w-full flex flex-col bg-[#1C1832] text-white shadow-lg lg:flex lg:flex-col lg:w-28 lg:h-screen md:flex-row md:items-center md:h-16 z-50">
      {/* Icon Container for Desktop and Mobile */}
      <div className="flex flex-col lg:flex-row lg:overflow-y-auto lg:whitespace-nowrap lg:justify-start lg:items-start lg:h-full lg:mt-10">
        {/* Icon Menu */}
        <div className="flex flex-row md:flex-row lg:flex-col space-x-4 lg:space-x-0 lg:space-y-4 items-center lg:items-start p-4 lg:p-2 overflow-x-auto lg:overflow-hidden">
          {/* Home */}
          <Link href="/index" className="group">
            <div className="hover:bg-[#2c284d] bg-[#231f3e] p-3 rounded-lg cursor-pointer transition-all duration-300 ease-in-out shadow-md">
              <FaHome className="text-3xl group-hover:text-[#c1b9f2] text-[#958ec7]" /> {/* Increased icon size */}
            </div>
          </Link>

          {/* Shop */}
          <Link href="/shop" className="group">
            <div className="hover:bg-[#2c284d] bg-[#231f3e] p-3 rounded-lg cursor-pointer transition-all duration-300 ease-in-out shadow-md">
              <FaShoppingBag className="text-3xl group-hover:text-[#c1b9f2] text-[#958ec7]" /> {/* Increased icon size */}
            </div>
          </Link>

          {/* Collections */}
          <Link href="/collections" className="group">
            <div className="hover:bg-[#2c284d] bg-[#231f3e] p-3 rounded-lg cursor-pointer transition-all duration-300 ease-in-out shadow-md">
              <FaTshirt className="text-3xl group-hover:text-[#c1b9f2] text-[#958ec7]" /> {/* Increased icon size */}
            </div>
          </Link>

          {/* Create Item */}
          <Link href="/create-item" className="group">
            <div className="hover:bg-[#2c284d] bg-[#231f3e] p-3 rounded-lg cursor-pointer transition-all duration-300 ease-in-out shadow-md">
              <FaPlusCircle className="text-3xl group-hover:text-[#c1b9f2] text-[#958ec7]" /> {/* Increased icon size */}
            </div>
          </Link>

          {/* Favorites */}
          <Link href="/favorites" className="group">
            <div className="hover:bg-[#2c284d] bg-[#231f3e] p-3 rounded-lg cursor-pointer transition-all duration-300 ease-in-out shadow-md">
              <FaHeart className="text-3xl group-hover:text-[#c1b9f2] text-[#958ec7]" /> {/* Increased icon size */}
            </div>
          </Link>

          {/* Settings Icon */}
          <div className="group flex-shrink-0">
            <div
              className="hover:bg-[#2c284d] bg-[#231f3e] p-3 rounded-lg cursor-pointer transition-all duration-300 ease-in-out shadow-md"
              onClick={toggleSettings}
            >
              <FaCog className="text-3xl text-[#958ec7] group-hover:text-[#c1b9f2]" /> {/* Increased icon size */}
            </div>

            {/* Settings Menu (Dropdown) */}
            {isSettingsOpen && (
              <div className="bg-[#231f3e] mt-2 rounded-lg shadow-lg p-4 w-48 text-gray-300">
                <ul>
                  <li className="hover:bg-[#2c284d] p-2 rounded">
                    <Link href="/profile-settings">Profile Settings</Link>
                  </li>
                  <li className="hover:bg-[#2c284d] p-2 rounded">
                    <Link href="/account-settings">Account Settings</Link>
                  </li>
                  <li className="hover:bg-[#2c284d] p-2 rounded">
                    <Link href="/logout">Logout</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Fullscreen Icon at the bottom corner for MD and LG screens only */}
      <div className="hidden md:block absolute bottom-2 right-4 lg:bottom-4 lg:right-6">
        <div
          className="hover:bg-[#2c284d] bg-[#231f3e] p-3 rounded-lg cursor-pointer transition-all duration-300 ease-in-out shadow-md"
          onClick={toggleFullscreen}
        >
          <FaExpand className="text-3xl text-[#958ec7] group-hover:text-[#c1b9f2]" /> {/* Increased icon size */}
        </div>
      </div>

      {/* Spacer for Desktop */}
      <div className="flex-grow lg:flex-grow-0 md:hidden"></div>
    </div>
  );
};

export default SideBar;
