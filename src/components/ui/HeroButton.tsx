"use client";

import React from 'react';
import Link from 'next/link';

interface CustomButtonProps {
  children: React.ReactNode;
}

const CustomButton: React.FC<CustomButtonProps> = ({ children }) => {
  return (
    <Link href="/shop" passHref>
      <button className="custom-button">
        <span className="font-semibold p-0 m-0">{children}</span>
        <svg 
          className="arrow-icon z-50" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor" 
          width="20" 
          height="20" 
          style={{ marginLeft: '8px' }} // Space between text and icon
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M13 7l5 5-5 5M6 12h12" 
          />
        </svg>
      </button>
      <style jsx>{`
        .custom-button {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 200px; 
          height: 50px; 
          background: transparent;
          color: white;
          border: none; 
          border-radius: 50px; 
          transition: color 0.3s ease-in-out; 
          padding: 0;
          overflow: hidden;
          cursor: pointer; 
        }

        .custom-button::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 15%; 
          width: 50px; 
          height: 50px; 
          background: linear-gradient(90deg, rgba(99, 69, 237, 1) 0%, rgba(224, 57, 253, 1) 100%);
          border-radius: 50%; 
          transform: translate(-50%, -50%); 
          transition: transform 0.5s ease-in-out; 
          z-index: 0; 
        }

        .custom-button:hover::before {
          transform: translate(-50%, -50%) scale(10); 
        }

        .custom-button span {
          position: relative;
          z-index: 1; 
          transition: color 0.3s ease-in-out; 
        }

        .custom-button:hover span {
          color: #fff; 
        }

        .arrow-icon {
          fill: white; 
          transition: fill 0.3s ease-in-out; 
        }

        .custom-button:hover .arrow-icon {
          fill: #fff; 
        }
      `}</style>
    </Link>
  );
};

export default CustomButton;
