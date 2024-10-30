"use client";

import React, { useState, useCallback, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import { MapIcon } from 'lucide-react';

interface NavigationItem {
  label: string;
  href: string;
  submenu?: NavigationItem[];
}

const navigation: NavigationItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Explore', href: '/nft-marketplace' },
  { label: 'Collection', href: '/collections' },
  {
    label: 'Pages',
    href: '#',
    submenu: [
      { label: 'Activity', href: '/activity' },
      { label: 'Category', href: '/category' },
      { label: 'Ranking', href: '/ranking' },
      { label: 'Creators', href: '/creators' },
      { label: 'Market Single', href: '/market-single' },
      { label: 'Live Bidding', href: '/nft-live-bidding' },
      { label: 'Create Item', href: '/create-item' },
      { label: 'Author Profile', href: '/author-profile' },
      { label: 'Login & Register', href: '/login-register' }
    ]
  },
  {
    label: 'Blog',
    href: '#',
    submenu: [
      { label: 'Our Blog', href: '/blog' },
      { label: 'Blog Details', href: '/blog-details' }
    ]
  }
];

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false);
      setOpenSubmenus({});
    }
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen, handleClickOutside]);

  const toggleSubmenu = useCallback((label: string) => {
    setOpenSubmenus(prev => ({
      ...prev,
      [label]: !prev[label]
    }));
  }, []);

  const SearchBar = () => (
    <div className="relative">
      <input
        type="text"
        placeholder="Search Paths"
        aria-label="Search Paths"
        className="w-full p-2 pl-10 text-white bg-slate-900/80 rounded-full border border-slate-700 focus:border-[#2c62e0] focus:outline-none focus:ring-2 focus:ring-[#2c62e0] focus:ring-opacity-50 transition-colors placeholder-gray-400"
      />
      <button 
        type="submit" 
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#2c62e0] transition-colors"
        aria-label="Submit search"
      >
        <FaSearch size={18} />
      </button>
    </div>
  );

  const DesktopNavItem = ({ item }: { item: NavigationItem }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    return (
      <li 
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link 
          href={item.href}
          className={`block py-2 hover:text-[#2c62e0] transition-colors ${
            item.href === '/' ? 'text-[#2c62e0]' : 'text-white'
          }`}
        >
          {item.label}
        </Link>
        {item.submenu && isHovered && (
          <ul className="absolute top-full left-0 w-48 bg-[#0f172a] shadow-xl shadow-[#2c62e0]/10 rounded-xl py-2 animate-fadeIn border border-slate-800">
            {item.submenu.map((subItem) => (
              <li key={subItem.href}>
                <Link
                  href={subItem.href}
                  className="block px-4 py-2 text-gray-300 hover:bg-[#2c62e0]/10 hover:text-[#2c62e0] transition-colors"
                >
                  {subItem.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </li>
    );
  };

  const MobileNavItem = ({ item }: { item: NavigationItem }) => (
    <li>
      {item.submenu ? (
        <>
          <button
            onClick={() => toggleSubmenu(item.label)}
            className="w-full flex items-center justify-between p-2 text-white hover:bg-[#2c62e0]/10 rounded-xl transition-colors"
            aria-expanded={openSubmenus[item.label]}
          >
            {item.label}
            <span className="transform transition-transform duration-200">
              {openSubmenus[item.label] ? '−' : '+'}
            </span>
          </button>
          {openSubmenus[item.label] && (
            <ul className="pl-4 space-y-1 animate-slideDown">
              {item.submenu.map((subItem) => (
                <li key={subItem.href}>
                  <Link
                    href={subItem.href}
                    className="block p-2 text-gray-300 hover:bg-[#2c62e0]/10 rounded-xl transition-colors"
                  >
                    {subItem.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </>
      ) : (
        <Link
          href={item.href}
          className="block p-2 text-white hover:bg-[#2c62e0]/10 rounded-xl transition-colors"
        >
          {item.label}
        </Link>
      )}
    </li>
  );

  return (
    <header className={`font-sora fixed top-0 left-0 lg:left-36 mt-6 right-0 z-50 transition-all duration-300${
      isScrolled ? 'py-2' : 'py-4'
    }`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <nav className={`flex justify-between items-center rounded-2xl bg-[#0f172a] shadow-lg shadow-[#2c62e0]/10 border border-slate-800 ${
          isScrolled ? 'p-2' : 'p-4'
        }`}>
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2 text-white hover:text-[#2c62e0] transition-colors mr-28">
              <MapIcon size={28} strokeWidth={1.5} className="text-white" />
              <span className="font-bold text-lg">Paths</span>
            </Link>

            <div className="hidden md:w-72 md:block ">
              <SearchBar />
            </div>
          </div>

          <ul className="hidden lg:flex lg:items-center lg:space-x-8">
            {navigation.map((item) => (
              <DesktopNavItem key={item.label} item={item} />
            ))}
          </ul>

          <div className="flex justify-center">
          <Link 
          href="/signup" 
         >
          <button className="bg-gray-200 font-medium text-black hover:bg-[#2c62e0] hover:text-gray-100  mx-5 px-4 py-2 rounded-full" >
              SignUp
            </button>
        </Link>
        <Link 
          href="/signin" 
          
        >
          <button className="bg-gray-200 font-medium text-black hover:bg-[#2c62e0] hover:text-gray-100 px-4 py-2 rounded-full">
              Login
            </button>
        </Link>
        
           
          </div>

          <button
            className="md:hidden p-2 hover:bg-[#2c62e0]/10 rounded-xl transition-colors text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          ref={menuRef}
          className="fixed inset-y-0 right-0 w-64 bg-[#0f172a] shadow-xl shadow-[#2c62e0]/20 md:hidden transform transition-transform duration-300 ease-in-out z-50 border-l border-slate-800"
        >
          <div className="p-4">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-4 right-4 p-2 hover:bg-[#2c62e0]/10 rounded-xl transition-colors text-white"
              aria-label="Close menu"
            >
              <FaTimes size={24} />
            </button>

            <div className="mt-12 mb-4">
              <SearchBar />
            </div>

            <ul className="space-y-2">
              {navigation.map((item) => (
                <MobileNavItem key={item.label} item={item} />
              ))}
            </ul>

            <div className="mt-6">
              <button className="bg-gradient-to-r from-[#2c62e0] to-[#2c62e0]/80 hover:from-[#2c62e0]/90 hover:to-[#2c62e0]/70 w-full">
                SignUp
              </button>
              <button className="bg-gradient-to-r from-[#2c62e0] to-[#2c62e0]/80 hover:from-[#2c62e0]/90 hover:to-[#2c62e0]/70 w-full">
                Login
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;