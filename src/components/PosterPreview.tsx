import React, { useRef, useState, useEffect } from 'react';
import { PosterConfig, DesignTheme } from '../types';
import BotanicalLeaf from './BotanicalLeaf';

interface PosterPreviewProps {
  config: PosterConfig;
  theme: DesignTheme;
  previewRef: React.RefObject<HTMLDivElement | null>;
}

export default function PosterPreview({ config, theme, previewRef }: PosterPreviewProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Micro-interaction for leaves float tracking mouse
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  // Convert letter spacing options to tailwind classes
  const getTrackingClass = () => {
    switch (config.letterSpacing) {
      case 'tight': return 'tracking-tight';
      case 'normal': return 'tracking-normal';
      case 'wide': return 'tracking-[0.12em]';
      case 'widest': return 'tracking-[0.22em]';
      default: return 'tracking-wide';
    }
  };

  const getAlignmentClass = () => {
    switch (config.alignment) {
      case 'left': return 'text-left';
      case 'right': return 'text-right';
      case 'center': default: return 'text-center';
    }
  };

  const leafMoveStyle = (multiplier: number) => {
    const translateScale = multiplier * 15;
    const rotateScale = multiplier * 8;
    return {
      transform: `translate(${mousePos.x * translateScale}px, ${mousePos.y * translateScale}px) rotate(${mousePos.x * rotateScale}deg)`,
      transition: mousePos.x === 0 ? 'transform 0.8s ease-out' : 'transform 0.15s ease-out',
    };
  };

  return (
    <div className="w-full flex justify-center items-center py-4 select-none">
      {/* 9:16 Vertical Poster Container */}
      <div 
        ref={previewRef}
        id="estate-poster-canvas"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        ref-container={containerRef}
        className="relative w-full max-w-[450px] aspect-[9/16] shadow-2xl overflow-hidden flex flex-col justify-between transition-colors duration-500 rounded-sm"
        style={{ 
          backgroundColor: theme.surface,
          color: theme.primary,
          fontFamily: '"DM Sans", sans-serif'
        }}
      >
        
        {/* Dynamic Topographic Wave Background Pattern */}
        {config.topoBg && (
          <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
            <svg width="100%" height="100%" viewBox="0 0 400 711" xmlns="http://www.w3.org/2000/svg">
              <path 
                d="M-50 711 C20 622 100 658 180 622 C260 586 340 622 420 568 C500 514 580 550 580 442" 
                fill="none" 
                stroke={theme.secondary} 
                strokeWidth="1" 
                strokeOpacity="0.25"
              />
              <path 
                d="M-50 568 C40 497 140 533 240 462 C340 391 440 427 540 355 C570 319 600 337 600 266" 
                fill="none" 
                stroke={theme.secondary} 
                strokeWidth="1" 
                strokeOpacity="0.18"
              />
              <path 
                d="M-50 426 C20 355 90 391 160 319 C230 248 300 284 370 213 C440 142 510 178 600 89" 
                fill="none" 
                stroke={theme.secondary} 
                strokeWidth="1" 
                strokeOpacity="0.2"
              />
              <path 
                d="M-20 250 C50 180 130 200 210 120 C290 40 380 90 450 10" 
                fill="none" 
                stroke={theme.secondary} 
                strokeWidth="1" 
                strokeOpacity="0.12"
              />
            </svg>
          </div>
        )}

        {/* Refined Double-Rule Border framing */}
        {config.doubleBorder && (
          <>
            <div 
              className="absolute pointer-events-none transition-all duration-300"
              style={{
                top: '16px', left: '16px', right: '16px', bottom: '16px',
                border: `0.5px solid ${theme.primary}`,
                opacity: 0.25
              }}
            />
            <div 
              className="absolute pointer-events-none transition-all duration-300"
              style={{
                top: '20px', left: '20px', right: '20px', bottom: '20px',
                border: `1px solid ${theme.primary}`,
                opacity: 0.12
              }}
            />
          </>
        )}

        {/* Corner Flourishes */}
        {config.cornerDecor && (
          <div className="absolute inset-0 pointer-events-none z-10 font-[Material Symbols Outlined]">
            {/* Top Left */}
            <div className="absolute top-[21px] left-[21px] w-6 h-6 flex items-center justify-center p-0.5 opacity-60" style={{ color: theme.secondary }}>
              <BotanicalLeaf type="default" className="w-5 h-5" />
            </div>
            {/* Top Right */}
            <div className="absolute top-[21px] right-[21px] w-6 h-6 flex items-center justify-center p-0.5 rotate-90 opacity-60" style={{ color: theme.secondary }}>
              <BotanicalLeaf type="default" className="w-5 h-5" />
            </div>
            {/* Bottom Left */}
            <div className="absolute bottom-[21px] left-[21px] w-6 h-6 flex items-center justify-center p-0.5 -rotate-90 opacity-60" style={{ color: theme.secondary }}>
              <BotanicalLeaf type="default" className="w-5 h-5" />
            </div>
            {/* Bottom Right */}
            <div className="absolute bottom-[21px] right-[21px] w-6 h-6 flex items-center justify-center p-0.5 rotate-180 opacity-60" style={{ color: theme.secondary }}>
              <BotanicalLeaf type="default" className="w-5 h-5" />
            </div>
          </div>
        )}

        {/* Floating Accent Watermark Leaves */}
        {config.leafType !== 'none' && (
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <div 
              className="absolute top-[23%] left-[12%] w-10 h-10 select-none"
              style={{ 
                color: theme.secondary, 
                opacity: config.leafOpacity * 0.9,
                ...leafMoveStyle(config.leafScale * 1.0)
              }}
            >
              <BotanicalLeaf type={config.leafType} />
            </div>
            <div 
              className="absolute top-[38%] right-[8%] w-8 h-8 select-none"
              style={{ 
                color: theme.secondary, 
                opacity: config.leafOpacity * 0.7,
                ...leafMoveStyle(config.leafScale * -0.7)
              }}
            >
              <BotanicalLeaf type={config.leafType} className="rotate-[45deg]" />
            </div>
            <div 
              className="absolute bottom-[28%] left-[8%] w-12 h-12 select-none"
              style={{ 
                color: theme.secondary, 
                opacity: config.leafOpacity * 0.8,
                ...leafMoveStyle(config.leafScale * 0.5)
              }}
            >
              <BotanicalLeaf type={config.leafType} className="-rotate-[30deg]" />
            </div>
            <div 
              className="absolute top-[12%] right-[22%] w-7 h-7 select-none"
              style={{ 
                color: theme.secondary, 
                opacity: config.leafOpacity * 0.5,
                ...leafMoveStyle(config.leafScale * -1.2)
              }}
            >
              <BotanicalLeaf type={config.leafType} className="rotate-[120deg]" />
            </div>
          </div>
        )}

        {/* HEADER: Luxury Masthead */}
        <header className="w-full flex flex-col items-center pt-[55px] px-8 z-10 select-text">
          <div 
            className="text-[10px] sm:text-[11px] font-semibold text-center tracking-[0.3em] transition-all duration-300"
            style={{ color: theme.primary, fontFamily: '"DM Sans", sans-serif' }}
          >
            {config.masthead.toUpperCase()}
          </div>
          <div 
            className="w-14 h-[1px] mt-2.5 opacity-30 transition-all duration-300"
            style={{ backgroundColor: theme.primary }}
          />
        </header>

        {/* MIDDLE CONTENT: High-Contrast Editorial Typography */}
        <section 
          className={`flex flex-col flex-grow justify-start pt-10 px-10 z-10 select-text ${getAlignmentClass()}`}
        >
          {/* Main Display Title */}
          <h1 
            className={`font-serif tracking-tight leading-[1.12] mb-5 font-semibold transition-all duration-300`}
            style={{ 
              color: theme.primary,
              fontSize: `${config.titleSize}px`
            }}
          >
            {config.title}
          </h1>

          {/* Elegant Leaf motif under Title */}
          <div className={`flex items-center gap-2 mb-4 opacity-50 ${config.alignment === 'center' ? 'justify-center' : config.alignment === 'right' ? 'justify-end' : 'justify-start'}`}>
            <div className="w-6 h-[0.5px]" style={{ backgroundColor: theme.secondary }} />
            <BotanicalLeaf type="default" className="w-3.5 h-3.5" style={{ color: theme.secondary }} />
            <div className="w-6 h-[0.5px]" style={{ backgroundColor: theme.secondary }} />
          </div>

          {/* Subtitle/Body Section */}
          <p 
            className={`font-serif italic font-medium leading-[1.35] transition-all duration-300 ${getTrackingClass()}`}
            style={{ 
              color: theme.primary,
              fontSize: `${config.subtitleSize}px`,
              opacity: 0.95
            }}
          >
            {config.subtitle}
          </p>

          {/* Delicate continuous description text */}
          <p 
            className="mt-4 font-sans text-xs sm:text-sm font-light leading-relaxed max-w-[90%] mx-auto transition-all duration-300 text-center select-text"
            style={{ 
              color: theme.primary,
              opacity: 0.78,
              lineHeight: 1.6,
              textAlign: config.alignment
            }}
          >
            {config.description}
          </p>
        </section>

        {/* LOWER SECTION: Picture frame fade and Microcopy */}
        <div className="relative w-full h-[40%] mt-auto z-0 overflow-hidden">
          {/* Golden Hour Fade Overlay */}
          <div 
            className="absolute inset-[1px] bottom-0 z-10 pointer-events-none"
            style={{
              background: `linear-gradient(to top, rgba(0,0,0,0) 0%, ${theme.surface} 98%)`,
            }}
          />

          <div className="w-full h-full relative" style={{ overflow: 'hidden' }}>
            <img 
              alt="Brand story backdrop" 
              src={config.imageURL}
              crossOrigin="anonymous"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-all duration-500"
              style={{
                filter: `
                  brightness(${config.brightness}) 
                  contrast(${config.contrast}) 
                  grayscale(${config.grayscale}) 
                  sepia(${config.sepia})
                `,
              }}
            />
            {/* Soft Warm/Aesthetic color cast overlay matching the selected Theme accent */}
            <div 
              className="absolute inset-0 mix-blend-color opacity-25 pointer-events-none"
              style={{ backgroundColor: theme.secondary }}
            />
          </div>

          {/* FOOTER: Microcopy and divider elements */}
          <footer className="absolute bottom-[35px] left-0 w-full flex flex-col items-center px-8 z-20 select-text">
            <div className="flex items-center gap-3.5 mb-2.5 opacity-30">
              <div className="h-[0.5px] w-6" style={{ backgroundColor: theme.primary }} />
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.secondary }} />
              <div className="h-[0.5px] w-6" style={{ backgroundColor: theme.primary }} />
            </div>

            <p 
              className="text-[8.5px] leading-relaxed tracking-[0.22em] font-medium text-center max-w-[85%] uppercase transition-all duration-300"
              style={{ 
                color: theme.primary, 
                opacity: 0.8,
                fontFamily: '"DM Sans", sans-serif'
              }}
            >
              {config.footerTagline}
            </p>
          </footer>
        </div>

      </div>
    </div>
  );
}
