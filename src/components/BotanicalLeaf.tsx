import React from 'react';

interface LeafProps {
  type: 'default' | 'sprig' | 'laurel' | 'monstera' | 'none';
  className?: string;
  style?: React.CSSProperties;
}

export default function BotanicalLeaf({ type, className = '', style }: LeafProps) {
  if (type === 'none') return null;

  switch (type) {
    case 'laurel':
      return (
        <svg
          viewBox="0 0 100 100"
          className={className}
          style={style}
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Laurel Wreath Branch */}
          <path d="M50 85 C51 70 65 55 75 45 C73 48 68 53 65 58 C68 50 78 40 85 30 C80 34 75 40 72 45 C74 35 83 23 90 12 C83 18 76 25 74 32 C71 22 75 12 78 2 C73 9 69 18 69 25 C63 17 63 8 62 0 C59 7 57 15 59 22 C52 16 49 9 47 1 C46 8 46 16 50 23" />
          <path d="M50 85 C49 70 35 55 25 45 C27 48 32 53 35 58 C32 50 22 40 15 30 C20 34 25 40 28 45 C26 35 17 23 10 12 C17 18 24 25 26 32 C29 22 25 12 22 2 C27 9 31 18 31 25 C37 17 37 8 38 0 C41 7 43 15 41 22 C48 16 51 9 53 1 C54 8 54 16 50 23" />
          <circle cx="50" cy="85" r="3" />
        </svg>
      );
    case 'sprig':
      return (
        <svg
          viewBox="0 0 100 100"
          className={className}
          style={style}
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Olive Leaf Sprig */}
          <path d="M10 90 Q 40 60 48 20 Q 52 45 42 63" />
          <path d="M48 20 Q 75 10 90 2 Q 70 15 54 22" />
          {/* Leaves along the branch */}
          <path d="M26 74 Q 15 55 5 52 Q 22 55 30 68" />
          <path d="M31 68 Q 50 55 60 52 Q 45 61 34 65" />
          <path d="M36 55 Q 30 35 24 28 Q 36 38 39 49" />
          <path d="M41 47 Q 62 38 72 36 Q 58 45 45 46" />
        </svg>
      );
    case 'monstera':
      return (
        <svg
          viewBox="0 0 100 100"
          className={className}
          style={style}
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Organic Monstera leaf with split slits */}
          <path d="M50 95 C52 75 75 60 85 45 C92 35 90 20 75 15 C65 12 55 22 50 30 C45 22 35 12 25 15 C10 20 8 35 15 45 C25 60 48 75 50 95 Z" />
          {/* Cuts */}
          <path d="M50 35 L 50 85 M 50 50 Q 65 42 78 35" stroke="currentColor" strokeWidth="2" fill="none" />
          <path d="M50 60 Q 70 55 84 50" stroke="currentColor" strokeWidth="2" fill="none" />
          <path d="M50 70 Q 65 72 80 75" stroke="currentColor" strokeWidth="2" fill="none" />
          <path d="M50 50 Q 35 42 22 35" stroke="currentColor" strokeWidth="2" fill="none" />
          <path d="M50 60 Q 30 55 16 50" stroke="currentColor" strokeWidth="2" fill="none" />
          <path d="M50 70 Q 35 72 20 75" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
      );
    case 'default':
    default:
      return (
        <svg
          viewBox="0 0 100 100"
          className={className}
          style={style}
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Classic minimalist dual leaf */}
          <path d="M10 80 Q 40 70 50 30" />
          <path d="M50 30 Q 30 10 10 10 Q 20 40 50 30" fill="currentColor" fillOpacity="0.15" />
          <path d="M50 30 Q 70 50 90 90" />
          <path d="M50 30 Q 80 20 90 10 Q 70 5 50 30" fill="currentColor" fillOpacity="0.15" />
        </svg>
      );
  }
}
