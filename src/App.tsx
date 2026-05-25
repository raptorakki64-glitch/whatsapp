import React, { useState, useRef } from 'react';
import { PosterConfig, DesignTheme, THEMES, PRESET_POSTERS } from './types';
import PosterPreview from './components/PosterPreview';
import EditorSidebar from './components/EditorSidebar';
import { toPng } from 'html-to-image';
import { 
  Download, FileCode, Printer, RotateCcw, Sparkles, 
  HelpCircle, Eye, RefreshCw, Feather, CheckCircle, AlertTriangle
} from 'lucide-react';

export default function App() {
  const [config, setConfig] = useState<PosterConfig>(PRESET_POSTERS[0]);
  const [isExporting, setIsExporting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ text: string, type: 'success' | 'info' | 'error' } | null>(null);
  
  const posterRef = useRef<HTMLDivElement>(null);
  const activeTheme = THEMES.find(t => t.id === config.themeId) || THEMES[0];

  const triggerStatus = (text: string, type: 'success' | 'info' | 'error' = 'success') => {
    setStatusMessage({ text, type });
    setTimeout(() => setStatusMessage(null), 4000);
  };

  // 1. Download High-Resolution story/flyer PNG (at high DPI)
  const handleDownloadPNG = async () => {
    if (!posterRef.current) return;
    setIsExporting(true);
    triggerStatus('Compiling visual layers. Please wait...', 'info');

    try {
      // Direct high-DPI scaling rendering bypassing browser window sizing
      const dataUrl = await toPng(posterRef.current, {
        pixelRatio: 2.5, // 2.5x scaling gives crisp print-ready 1125x2000 pixels
        cacheBust: true,
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left',
          borderRadius: '0px'
        }
      });
      
      const link = document.createElement('a');
      link.download = `${config.masthead.toLowerCase().replace(/\s+/g, '-')}-heritage-poster.png`;
      link.href = dataUrl;
      link.click();
      triggerStatus('High-Resolution PNG exported successfully!', 'success');
    } catch (error) {
      console.error('PNG conversion failed:', error);
      triggerStatus('Error capturing high-res graphics. Check connection or try uploading local media.', 'error');
    } finally {
      setIsExporting(false);
    }
  };

  // 2. Standalone HTML file compilation export
  const handleExportHTML = () => {
    try {
      // Build an elegant self-contained single-file HTML layout replicating the exact designer style
      const htmlOutput = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${config.title} | ${config.masthead}</title>
  <!-- Tailwind CSS CDN and Google Fonts -->
  <script src="https://cdn.tailwindcss.com?plugins=forms"></script>
  <link href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,wght@0,400..900;1,400..900&family=DM+Sans:ital,wght@0,100..1000;1,100..1000&display=swap" rel="stylesheet" />
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            serif: ["Bodoni Moda", "serif"],
            sans: ["DM Sans", "sans-serif"]
          }
        }
      }
    }
  </script>
  <style>
    /* Continuous soft wind rotation animation */
    @keyframes windSway {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      50% { transform: translateY(-8px) rotate(4deg); }
    }
    .wind-leaf {
      animation: windSway 8s ease-in-out infinite;
    }
  </style>
</head>
<body class="min-h-screen flex items-center justify-center p-4" style="background-color: ${activeTheme.surfaceContainer};">
  
  <!-- 9:16 vertical poster card -->
  <main class="relative w-full max-w-[450px] aspect-[9/16] shadow-2xl overflow-hidden flex flex-col justify-between rounded-sm" 
        style="background-color: ${activeTheme.surface}; color: ${activeTheme.primary}; font-family: 'DM Sans', sans-serif;">
    
    <!-- Topographic Waves Background -->
    ${config.topoBg ? `
    <div class="absolute inset-0 z-0 pointer-events-none opacity-25">
      <svg width="100%" height="100%" viewBox="0 0 400 711" xmlns="http://www.w3.org/2000/svg">
        <path d="M-50 711 C20 622 100 658 180 622 C260 586 340 622 420 568 C500 514 580 550 580 442" fill="none" stroke="${activeTheme.secondary}" stroke-width="1" stroke-opacity="0.25"/>
        <path d="M-50 568 C40 497 140 533 240 462 C340 391 440 427 540 355 C570 319 600 337 600 266" fill="none" stroke="${activeTheme.secondary}" stroke-width="1" stroke-opacity="0.18"/>
        <path d="M-50 426 C20 355 90 391 160 319 C230 248 300 284 370 213" fill="none" stroke="${activeTheme.secondary}" stroke-width="1" stroke-opacity="0.2"/>
      </svg>
    </div>` : ''}

    <!-- Double Rule borders -->
    ${config.doubleBorder ? `
    <div class="absolute inset-[16px] pointer-events-none opacity-25" style="border: 0.5px solid ${activeTheme.primary};"></div>
    <div class="absolute inset-[20px] pointer-events-none opacity-12" style="border: 1px solid ${activeTheme.primary};"></div>` : ''}

    <!-- Leaf Accents / Watermarks -->
    ${config.leafType !== 'none' ? `
    <div class="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <div class="absolute top-[23%] left-[12%] w-10 h-10 wind-leaf" style="color: ${activeTheme.secondary}; opacity: ${config.leafOpacity * 0.9}; transform: scale(${config.leafScale});">
        <!-- SVG Vector Leaf -->
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="4"><path d="M10 80 Q 40 70 50 30 M50 30 Q 30 10 10 10 Q 20 40 50 30 M50 30 Q 70 50 90 90 M50 30 Q 80 20 90 10 Q 70 5 50 30" /></svg>
      </div>
      <div class="absolute top-[38%] right-[8%] w-8 h-8 wind-leaf" style="color: ${activeTheme.secondary}; opacity: ${config.leafOpacity * 0.7}; transform: scale(${config.leafScale}) rotate(30deg); animation-delay: 1.5s;">
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="4"><path d="M10 80 Q 40 70 50 30 M50 30 Q 30 10 10 10 Q 20 40 50 30 M50 30 Q 70 50 90 90 M50 30 Q 80 20 90 10 Q 70 5 50 30" /></svg>
      </div>
    </div>` : ''}

    <!-- Header -->
    <header class="w-full flex flex-col items-center pt-[55px] px-8 z-10 text-center">
      <div class="text-[11px] font-semibold tracking-[0.3em]" style="color: ${activeTheme.primary}; font-family: 'DM Sans', sans-serif;">
        ${config.masthead.toUpperCase()}
      </div>
      <div class="w-14 h-[1px] mt-2.5 opacity-30" style="background-color: ${activeTheme.primary};"></div>
    </header>

    <!-- Main Copy -->
    <section class="flex flex-col flex-grow justify-start pt-10 px-10 z-10 text-${config.alignment}">
      <h1 class="font-serif tracking-tight leading-[1.12] mb-5 font-semibold" style="color: ${activeTheme.primary}; font-size: ${config.titleSize}px;">
        ${config.title}
      </h1>
      <div class="flex items-center gap-2 mb-4 opacity-50 ${config.alignment === 'center' ? 'justify-center' : config.alignment === 'right' ? 'justify-end' : 'justify-start'}">
        <div class="w-6 h-[0.5px]" style="background-color: ${activeTheme.secondary};"></div>
        <div class="w-1.5 h-1.5 rounded-full" style="background-color: ${activeTheme.secondary};"></div>
        <div class="w-6 h-[0.5px]" style="background-color: ${activeTheme.secondary};"></div>
      </div>
      <p class="font-serif italic font-medium leading-[1.35]" style="color: ${activeTheme.primary}; font-size: ${config.subtitleSize}px;">
        ${config.subtitle}
      </p>
      <p class="mt-4 font-sans text-xs font-light leading-relaxed max-w-[90%] mx-auto" style="color: ${activeTheme.primary}; opacity: 0.78; text-align: ${config.alignment};">
        ${config.description}
      </p>
    </section>

    <!-- Lower Section Background Image and Footer -->
    <div class="relative w-full h-[40%] mt-auto z-0 overflow-hidden">
      <div class="absolute inset-[1px] bottom-0 z-10 pointer-events-none" style="background: linear-gradient(to top, rgba(0,0,0,0) 0%, ${activeTheme.surface} 98%);"></div>
      <img src="${config.imageURL}" class="w-full h-full object-cover" style="filter: brightness(${config.brightness}) contrast(${config.contrast}) grayscale(${config.grayscale}) sepia(${config.sepia});">
      
      <!-- Footer Microcopy -->
      <footer class="absolute bottom-[35px] left-0 w-full flex flex-col items-center px-8 z-20">
        <div class="flex items-center gap-3.5 mb-2.5 opacity-30">
          <div class="h-[0.5px] w-6" style="background-color: ${activeTheme.primary};"></div>
          <div class="w-1.5 h-1.5 rounded-full" style="background-color: ${activeTheme.secondary};"></div>
          <div class="h-[0.5px] w-6" style="background-color: ${activeTheme.primary};"></div>
        </div>
        <p class="text-[8.5px] leading-relaxed tracking-[0.22em] font-medium text-center uppercase" style="color: ${activeTheme.primary}; opacity: 0.8; font-family: 'DM Sans', sans-serif;">
          ${config.footerTagline}
        </p>
      </footer>
    </div>
  </main>
</body>
</html>`;

      const blob = new Blob([htmlOutput], { type: 'text/html' });
      const link = document.createElement('a');
      link.download = `${config.masthead.toLowerCase().replace(/\s+/g, '-')}-estate-flyer.html`;
      link.href = URL.createObjectURL(blob);
      link.click();
      triggerStatus('Self-contained HTML Page exported successfully!', 'success');
    } catch (err) {
      console.error(err);
      triggerStatus('Error compiled standard HTML template.', 'error');
    }
  };

  // 3. Print Poster directly / Launch Standard PDF capture
  const handlePrintPdf = () => {
    triggerStatus('Launching browser print queue. Choose "Save as PDF" relative to portrait dimensions.', 'info');
    setTimeout(() => {
      window.print();
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#E5E5E1] flex flex-col font-sans select-none overflow-x-hidden animate-fade-in">
      
      {/* Top Professional Header Bar */}
      <header className="bg-white border-b border-black/10 text-zinc-800 px-8 py-4 flex items-center justify-between z-40 shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-black text-white rounded-sm shadow-sm flex items-center justify-center">
            <Feather size={16} className="transform -rotate-45 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-serif font-bold text-zinc-900 tracking-tight leading-none">Estate Heritage</h1>
            <p className="text-[9px] text-zinc-400 uppercase tracking-widest font-mono mt-1">Premium Agrarian Flyer Builder</p>
          </div>
        </div>

        {/* Global Export Smooth Controllers */}
        <div className="flex items-center gap-2">
          {/* Print PDF */}
          <button
            onClick={handlePrintPdf}
            className="hidden sm:flex items-center gap-1.5 text-xs bg-white hover:bg-zinc-50 text-zinc-700 hover:text-black px-3.5 py-1.5 rounded-sm transition-all font-medium border border-zinc-200 cursor-pointer"
            title="Saves directly to crisp print layout PDF via Print queue"
          >
            <Printer size={13} className="text-zinc-500" />
            <span>Save PDF / Print</span>
          </button>

          {/* HTML download */}
          <button
            onClick={handleExportHTML}
            className="flex items-center gap-1.5 text-xs bg-white hover:bg-zinc-50 text-zinc-700 hover:text-black px-3.5 py-1.5 rounded-sm transition-all font-medium border border-zinc-200 cursor-pointer"
            title="Download fully responsive, standalone Single-File HTML"
          >
            <FileCode size={13} className="text-zinc-500" />
            <span>Code Export</span>
          </button>

          {/* PNG High-Res export */}
          <button
            onClick={handleDownloadPNG}
            disabled={isExporting}
            className="flex items-center gap-1.5 text-xs bg-black hover:bg-zinc-900 text-white px-4 py-1.5 rounded-sm transition-all font-semibold shadow-sm disabled:opacity-50 cursor-pointer"
            title="Downloads 2.5K high-contrast image asset for story placement"
          >
            {isExporting ? (
              <RefreshCw size={13} className="animate-spin text-white" />
            ) : (
              <Download size={13} />
            )}
            <span>{isExporting ? 'Compiling...' : 'PNG Export'}</span>
          </button>

          {/* Reset button */}
          <button
            onClick={() => {
              const defaultPreset = PRESET_POSTERS.find(p => p.id === config.id) || PRESET_POSTERS[0];
              setConfig(defaultPreset);
              triggerStatus('Reset template to original preset properties.', 'info');
            }}
            className="p-1.5 bg-zinc-50 hover:bg-zinc-100 text-zinc-400 hover:text-zinc-800 rounded-sm border border-zinc-200 transition-colors cursor-pointer"
            title="Reset active elements"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </header>

      {/* Main Container Area */}
      <div className="flex-grow flex flex-col md:flex-row overflow-hidden relative">
        
        {/* Left Navigation Rail (Aesthetic Rail from Design HTML) */}
        <nav className="hidden lg:flex w-20 flex-col items-center py-6 bg-white border-r border-black/10 shrink-0 h-full justify-between">
          <div className="flex flex-col items-center gap-8">
            {/* Estate Logo Emblem */}
            <div className="w-10 h-10 bg-black rounded-sm flex items-center justify-center text-white font-serif text-xl font-bold italic" title="Heritage Estates">
              E
            </div>
            
            {/* Visual indicators representation of layout/draft state */}
            <div className="flex flex-col gap-5 mt-4">
              <div className="w-4 h-4 border-2 border-black rounded-full" title="Active Layout state" />
              <div className="w-4 h-4 border border-zinc-200 rounded-full flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-zinc-200 rounded-full" />
              </div>
              <div className="w-4 h-4 border border-zinc-200 rounded-full flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-zinc-200 rounded-full" />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="w-1 h-3 bg-zinc-200 rounded-full" />
            <div className="w-7 h-7 rounded-sm bg-zinc-50 border border-zinc-200 flex items-center justify-center text-[9px] font-mono text-zinc-400 font-bold uppercase tracking-wider">
              PRM
            </div>
          </div>
        </nav>

        {/* Workspace Display Area */}
        <div className="flex-grow p-6 flex flex-col items-center justify-center overflow-y-auto bg-[#E5E5E1] select-none">
          
          {/* Aesthetic Tips Badge */}
          <div className="mb-4 max-w-[450px] w-full p-3 bg-white/95 border border-black/10 rounded-sm shadow-sm flex items-start gap-2.5">
            <Sparkles size={14} className="text-zinc-650 shrink-0 mt-0.5" />
            <p className="text-[10px] sm:text-xs text-zinc-650 leading-relaxed font-light">
              <span className="font-semibold text-zinc-900">Wind Response Enabled:</span> Glide your pointer across the canvas preview. The gold-leaf accents will list and sway with the organic inertia.
            </p>
          </div>

          {/* Dynamic Floating Notification */}
          {statusMessage && (
            <div 
              className={`max-w-[450px] w-full mb-3 p-3.5 text-xs flex items-center gap-2.5 rounded-sm shadow-sm transition-all duration-300 ${
                statusMessage.type === 'success' 
                  ? 'bg-zinc-900 border border-black text-emerald-300 shadow-sm' 
                  : statusMessage.type === 'error'
                  ? 'bg-rose-50 border border-rose-250 text-rose-800'
                  : 'bg-zinc-900 border border-black text-white shadow-sm'
              }`}
            >
              {statusMessage.type === 'success' ? (
                <CheckCircle size={14} className="shrink-0 text-emerald-400" />
              ) : statusMessage.type === 'error' ? (
                <AlertTriangle size={14} className="shrink-0 text-rose-500" />
              ) : (
                <Eye size={14} className="shrink-0 text-amber-400 animate-pulse" />
              )}
              <span className="leading-tight shrink font-semibold">{statusMessage.text}</span>
            </div>
          )}

          {/* Poster Wrapper with 9:16 constraints */}
          <div className="relative w-full max-w-[450px] shadow-2xl rounded-sm border border-black/10 overflow-hidden">
            <PosterPreview 
              config={config} 
              theme={activeTheme} 
              previewRef={posterRef} 
            />
          </div>

          {/* Mobile direct export cues */}
          <div className="mt-4 flex gap-3 sm:hidden justify-center max-w-[450px] w-full">
            <button
              onClick={handleDownloadPNG}
              className="flex-grow py-2.5 text-xs bg-black text-white rounded-sm font-semibold text-center flex items-center justify-center gap-1.5"
            >
              <Download size={13} />
              <span>PNG Export</span>
            </button>
            <button
              onClick={handleExportHTML}
              className="flex-grow py-2.5 text-xs bg-white text-zinc-800 border border-zinc-200 rounded-sm font-medium text-center flex items-center justify-center gap-1.5"
            >
              <FileCode size={13} />
              <span>HTML Export</span>
            </button>
          </div>
        </div>

        {/* Right Sidebar refinery */}
        <div className="w-full md:w-[380px] lg:w-[420px] shrink-0 h-full border-t border-black/15 md:border-t-0">
          <EditorSidebar config={config} onChange={setConfig} />
        </div>

      </div>

      {/* Styled Printable Frame CSS strictly configured for Print-to-PDF queue (Invisible in app viewport) */}
      <style>{`
        @media print {
          /* Hide workspace controls and sidebars entirely */
          body, html, #root {
            background: #FFFFFF !important;
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
            height: 100% !important;
            overflow: hidden !important;
          }
          header, 
          .bg-neutral-900,
          .md\\:w-\\[380px\\],
          .mb-4,
          .mt-4,
          .flex-shrink-0,
          .border-l,
          button,
          .editor-sidebar-container,
          .editor-tabs,
          aside {
            display: none !important;
          }
          /* Align physical canvas perfectly for printable page bounds */
          #root > div {
            display: block !important;
            height: 100% !important;
          }
          #root > div > div {
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
            width: 100% !important;
            height: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          #estate-poster-canvas {
            width: 90vw !important;
            height: 160vw !important;
            max-width: 100% !important;
            max-height: 100% !important;
            box-shadow: none !important;
            border: none !important;
            margin: 0 auto !important;
            page-break-inside: avoid !important;
          }
        }
      `}</style>
    </div>
  );
}
