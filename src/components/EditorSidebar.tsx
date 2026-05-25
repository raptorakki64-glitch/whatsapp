import React, { useState } from 'react';
import { PosterConfig, DesignTheme, THEMES, PRESET_POSTERS } from '../types';
import { 
  Type, Layout, Image as ImageIcon, Sliders, Sparkles, Upload, 
  HelpCircle, ChevronRight, Check, Search, Trash2, ArrowRight
} from 'lucide-react';

interface EditorSidebarProps {
  config: PosterConfig;
  onChange: (newConfig: PosterConfig) => void;
}

const QUICK_IMAGE_TAGS = [
  { label: 'Mangoes', query: 'mango orchard fruit tree' },
  { label: 'Vineyard', query: 'grape vineyard harvest wine hills twilight' },
  { label: 'Olives', query: 'olive grove fresh crop oil tuscany' },
  { label: 'Citrus', query: 'lemon citrus farm amalfi orange orchard' },
  { label: 'Peaches', query: 'peach orchard fresh sunlit peaches' },
  { label: 'Lavender', query: 'lavender fields provence sunset' },
  { label: 'Honey', query: 'beekeeping farm gold honeycomb' },
];

export default function EditorSidebar({ config, onChange }: EditorSidebarProps) {
  const [activeTab, setActiveTab] = useState<'presets' | 'content' | 'theme' | 'photo' | 'layout'>('presets');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [showNotification, setShowNotification] = useState<string | null>(null);

  const activeTheme = THEMES.find(t => t.id === config.themeId) || THEMES[0];

  const updateField = (key: keyof PosterConfig, value: any) => {
    onChange({
      ...config,
      [key]: value
    });
  };

  // Drag and drop photo upload handler
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      updateField('imageURL', url);
      triggerNotification('Photo uploaded successfully');
    }
  };

  const triggerNotification = (msg: string) => {
    setShowNotification(msg);
    setTimeout(() => setShowNotification(null), 3000);
  };

  const handleUnsplashSearch = async (tag: string) => {
    setIsSearching(true);
    try {
      // Use client-side direct dynamic fetch with Unsplash Source/API mock keywords
      const terms = encodeURIComponent(tag);
      const results = [
        `https://images.unsplash.com/photo-1553134988-5622813664d6?w=1000&q=80&fit=crop`, // general mango
        `https://images.unsplash.com/photo-1527018601619-a508a2be00cd?w=1000&q=80&fit=crop`, // general field
        `https://images.unsplash.com/photo-1474440691490-2619cd0a377b?w=1000&q=80&fit=crop`, // vineyard
        `https://images.unsplash.com/photo-1471193945509-9ad0617afabf?w=1000&q=80&fit=crop`, // olive tree
        `https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?w=1000&q=80&fit=crop`, // wine grapes
        `https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=1000&q=80&fit=crop`, // fresh apples
        `https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=1000&q=80&fit=crop`, // lemons
      ];
      // Create variation using random indexes or matching keywords
      const queryResults = Array.from({ length: 6 }).map((_, idx) => {
        return `https://images.unsplash.com/featured/?${terms},nature,organic&sig=${Math.floor(Math.random() * 1000) + idx}`;
      });
      setSearchResults(queryResults);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-white border-l border-black/10 text-zinc-800 overflow-hidden font-sans">
      {/* Editorial Title */}
      <div className="p-6 border-b border-black/15 flex items-center justify-between bg-[#FCFCFA]">
        <div>
          <span className="text-[10px] tracking-[0.25em] font-bold text-zinc-400 uppercase">AESTHETIC STUDIO</span>
          <h2 className="text-lg font-serif text-zinc-900 font-bold tracking-tight mt-0.5">Aesthetic Creator</h2>
        </div>
        <div className="p-1 px-2.5 rounded-sm bg-black text-white font-mono text-[9px] uppercase font-bold tracking-wider">
          v1.4 Premium
        </div>
      </div>

      {/* Tabs Switcher Grid */}
      <div className="grid grid-cols-5 bg-zinc-50 text-xs text-zinc-500 border-b border-black/10">
        <button 
          onClick={() => setActiveTab('presets')}
          className={`py-3 flex flex-col items-center justify-center gap-1 transition-all ${activeTab === 'presets' ? 'bg-white text-black font-bold border-b-2 border-black' : 'hover:bg-zinc-100/50 hover:text-black'}`}
        >
          <Sparkles size={14} />
          <span className="text-[10px] uppercase font-medium tracking-tight">Presets</span>
        </button>
        <button 
          onClick={() => setActiveTab('content')}
          className={`py-3 flex flex-col items-center justify-center gap-1 transition-all ${activeTab === 'content' ? 'bg-white text-black font-bold border-b-2 border-black' : 'hover:bg-zinc-100/50 hover:text-black'}`}
        >
          <Type size={14} />
          <span className="text-[10px] uppercase font-medium tracking-tight">Copy</span>
        </button>
        <button 
          onClick={() => setActiveTab('theme')}
          className={`py-3 flex flex-col items-center justify-center gap-1 transition-all ${activeTab === 'theme' ? 'bg-white text-black font-bold border-b-2 border-black' : 'hover:bg-zinc-100/50 hover:text-black'}`}
        >
          <Layout size={14} />
          <span className="text-[10px] uppercase font-medium tracking-tight">Palette</span>
        </button>
        <button 
          onClick={() => setActiveTab('photo')}
          className={`py-3 flex flex-col items-center justify-center gap-1 transition-all ${activeTab === 'photo' ? 'bg-white text-black font-bold border-b-2 border-black' : 'hover:bg-zinc-100/50 hover:text-black'}`}
        >
          <ImageIcon size={14} />
          <span className="text-[10px] uppercase font-medium tracking-tight">Media</span>
        </button>
        <button 
          onClick={() => setActiveTab('layout')}
          className={`py-3 flex flex-col items-center justify-center gap-1 transition-all ${activeTab === 'layout' ? 'bg-white text-black font-bold border-b-2 border-black' : 'hover:bg-zinc-100/50 hover:text-black'}`}
        >
          <Sliders size={14} />
          <span className="text-[10px] uppercase font-medium tracking-tight">Refine</span>
        </button>
      </div>

      {/* Editor Content Area */}
      <div className="flex-grow overflow-y-auto p-6 space-y-6 select-none scrollbar-thin">
        
        {/* OPTIMIZATION BANNER (from Editorial theme) */}
        <section className="space-y-4">
          <div className="p-4 bg-[#F5F5F0] rounded-sm border border-black/5">
            <div className="flex justify-between text-[9px] font-bold tracking-widest mb-1 text-zinc-800">
              <span>SMOOTH EXPORT ENGINE</span>
              <span className="text-emerald-700">ACTIVE</span>
            </div>
            <p className="text-[10px] leading-relaxed text-zinc-500 italic">
              Vector paths prioritized. Image compression set to adaptive 300DPI Bicubic sampling. Output is structured around true 9:16 layout limits.
            </p>
          </div>
        </section>

        {/* TAB 1: PRESETS */}
        {activeTab === 'presets' && (
          <div className="space-y-4">
            <p className="text-xs text-zinc-500 leading-relaxed font-light">
              Select one of our meticulously paired design configurations based on genuine heritage estates. These load matching images, typography weights, and color boards instantly.
            </p>
            <div className="space-y-3 pt-1">
              {PRESET_POSTERS.map((p) => {
                const pTheme = THEMES.find(t => t.id === p.themeId) || THEMES[0];
                const isActive = config.id === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => {
                      onChange(p);
                      triggerNotification(`Loaded preset: ${p.name}`);
                    }}
                    className={`w-full text-left p-4 rounded-sm flex items-center justify-between border transition-all duration-300 ${isActive ? 'bg-[#FAF9F5] border-black text-zinc-900 ring-1 ring-black/5' : 'bg-white border-zinc-200 text-zinc-600 hover:border-zinc-400 hover:bg-zinc-50'}`}
                  >
                    <div className="space-y-1 pr-4">
                      <div className="text-xs text-zinc-400 font-bold tracking-wider font-sans uppercase">{p.masthead}</div>
                      <div className="text-base font-medium font-serif text-zinc-800">{p.title}</div>
                      <div className="text-[10px] text-zinc-400 capitalize">Theme: {pTheme.name}</div>
                    </div>
                    <div className="flex-shrink-0 flex items-center gap-1.5">
                      <div 
                        className="w-4 h-4 rounded-sm border border-black/10 shadow-sm" 
                        style={{ backgroundColor: pTheme.surface }} 
                      />
                      <div 
                        className="w-4 h-4 rounded-sm border border-black/10 shadow-sm" 
                        style={{ backgroundColor: pTheme.primary }} 
                      />
                      {isActive && <Check size={15} className="text-zinc-900 ml-1.5" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: COPYEDIT/CONTENT */}
        {activeTab === 'content' && (
          <div className="space-y-5">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-400">Poster Copy-fitting</h3>
            
            <div className="space-y-4">
              {/* Masthead */}
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1.5 font-sans">Masthead Logo / Estate Name</label>
                <input 
                  type="text" 
                  value={config.masthead} 
                  onChange={(e) => updateField('masthead', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-sm bg-white border border-zinc-200 text-zinc-900 text-sm focus:outline-none focus:border-black font-mono"
                  placeholder="e.g., AK FARMING"
                />
              </div>

              {/* Title */}
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1.5 font-sans">Main Display Title</label>
                <textarea 
                  rows={2}
                  value={config.title} 
                  onChange={(e) => updateField('title', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-sm bg-white border border-zinc-200 text-zinc-900 text-sm focus:outline-none focus:border-black font-serif"
                  placeholder="e.g., This mango season."
                />
              </div>

              {/* Subheading / Highlight */}
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1.5 font-sans">Focus Subtitle (Italicized)</label>
                <textarea 
                  rows={2}
                  value={config.subtitle} 
                  onChange={(e) => updateField('subtitle', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-sm bg-white border border-zinc-200 text-zinc-900 text-sm focus:outline-none focus:border-black"
                  placeholder="e.g., Harness the tastiest mangoes —"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1.5 font-sans">Narrative Description</label>
                <textarea 
                  rows={3}
                  value={config.description} 
                  onChange={(e) => updateField('description', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-sm bg-white border border-zinc-200 text-zinc-800 text-xs leading-relaxed focus:outline-none focus:border-black"
                  placeholder="Explain the organic heritage details, sunset notes, or production values."
                />
              </div>

              {/* Tagline / Footer List */}
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1.5 font-sans">Bottom Tagline / Core Values List</label>
                <input 
                  type="text" 
                  value={config.footerTagline} 
                  onChange={(e) => updateField('footerTagline', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-sm bg-white border border-zinc-200 text-zinc-800 text-xs focus:outline-none focus:border-black"
                  placeholder="e.g., ORGANIC • NATURAL • VEGAN"
                />
                <span className="text-[10px] text-zinc-400 mt-1 block font-light leading-snug">Separate words using bullet points (•) for maximum editorial value.</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: THEME/COLORS */}
        {activeTab === 'theme' && (
          <div className="space-y-5">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-400">Color Palette Boards</h3>
            
            <div className="grid grid-cols-1 gap-3">
              {THEMES.map((theme) => {
                const isActive = config.themeId === theme.id;
                return (
                  <button
                    key={theme.id}
                    onClick={() => updateField('themeId', theme.id)}
                    className={`w-full p-3.5 rounded-sm border text-left flex items-center justify-between transition-all duration-300 ${isActive ? 'bg-[#FAF9F5] border-black text-black' : 'bg-white border-zinc-250 text-zinc-700 hover:border-zinc-400 hover:bg-zinc-50'}`}
                  >
                    <div>
                      <div className="text-sm font-bold font-serif">{theme.name}</div>
                      <div className="text-[9px] text-zinc-400 font-mono mt-1 flex gap-2">
                        <span>P: {theme.primary}</span>
                        <span>S: {theme.surface}</span>
                      </div>
                    </div>
                    {/* Visual spectrum circles */}
                    <div className="flex gap-1.5 border border-zinc-100 p-1.5 rounded-sm bg-zinc-50">
                      <div className="w-5 h-5 rounded-sm border border-zinc-200" style={{ backgroundColor: theme.surface }} title="Base Board" />
                      <div className="w-5 h-5 rounded-sm" style={{ backgroundColor: theme.primary }} title="Major Text" />
                      <div className="w-5 h-5 rounded-sm" style={{ backgroundColor: theme.secondary }} title="Accents" />
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: theme.accent }} title="Highlights" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: BRANDING PIC & STOCK */}
        {activeTab === 'photo' && (
          <div className="space-y-5">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-400">Product Backdrop Branding</h3>
            
            {/* Drag & Drop Upload field */}
            <div className="space-y-3">
              <label className="block text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Our Custom Estate Media</label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-28 border border-zinc-200 border-dashed rounded-sm cursor-pointer bg-zinc-50 hover:bg-zinc-100 hover:border-zinc-400 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                    <Upload size={20} className="text-zinc-600 mb-1.5" />
                    <p className="text-xs font-semibold text-zinc-700 mb-0.5">Drag & drop / click to upload</p>
                    <p className="text-[10px] text-zinc-400">JPG, PNG or SVG (Instant Preview)</p>
                  </div>
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*" 
                    onChange={handlePhotoUpload} 
                  />
                </label>
              </div>
            </div>

            {/* Direct URL input */}
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1.5">Direct Backdrop Image URL</label>
              <input 
                type="text" 
                value={config.imageURL} 
                onChange={(e) => updateField('imageURL', e.target.value)}
                className="w-full px-3.5 py-2 rounded-sm bg-white border border-zinc-200 text-zinc-800 text-xs focus:outline-none focus:border-black font-mono animate-fade-in"
                placeholder="Unsplash, Imgur or direct link"
              />
            </div>

            {/* Unsplash Search section */}
            <div className="space-y-3 pt-1">
              <label className="block text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Search Free Heritage Media</label>
              <div className="flex gap-2">
                <input 
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && searchQuery && handleUnsplashSearch(searchQuery)}
                  className="flex-grow px-3 py-1.5 rounded-sm bg-white border border-zinc-200 text-zinc-800 text-xs focus:outline-none"
                  placeholder="e.g. olive harvest Italy"
                />
                <button
                  type="button"
                  onClick={() => searchQuery && handleUnsplashSearch(searchQuery)}
                  className="px-3 bg-zinc-100 hover:bg-zinc-200 rounded-sm text-zinc-800 text-xs border border-zinc-200 flex items-center justify-center gap-1.5"
                >
                  <Search size={13} />
                  <span>Search</span>
                </button>
              </div>

              {/* Quick Preset Tags for Unsplash */}
              <div className="flex flex-wrap gap-1 mt-1">
                {QUICK_IMAGE_TAGS.map((tag) => (
                  <button
                    key={tag.label}
                    onClick={() => {
                      setSearchQuery(tag.label);
                      handleUnsplashSearch(tag.query);
                    }}
                    className="text-[10px] bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 px-2 py-1 rounded-sm text-zinc-500 transition-colors"
                  >
                    #{tag.label}
                  </button>
                ))}
              </div>

              {/* Searched media grids */}
              {isSearching ? (
                <div className="py-6 text-center text-xs text-zinc-400 italic">Searching beautiful collections...</div>
              ) : searchResults.length > 0 ? (
                <div className="grid grid-cols-3 gap-1.5 pt-1">
                  {searchResults.map((url, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        updateField('imageURL', url);
                        triggerNotification('Backdrop replaced successfully');
                      }}
                      className="aspect-square relative overflow-hidden rounded-sm border border-zinc-200 bg-zinc-100 group hover:border-black transition-colors"
                    >
                      <img src={url} alt="Stock option" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-white/70 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-[10px] font-bold text-zinc-900">
                        Apply
                      </div>
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        )}

        {/* TAB 5: REFINE / SLIDERS & ALIGNMENT */}
        {activeTab === 'layout' && (
          <div className="space-y-6">
            
            {/* Branding Details toggles */}
            <div className="space-y-3">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-400">Layout Framings</h3>
              <div className="grid grid-cols-2 gap-3 pt-1">
                <button
                  onClick={() => updateField('doubleBorder', !config.doubleBorder)}
                  className={`p-2.5 rounded-sm border text-xs text-center flex flex-col items-center justify-center gap-1.5 transition-colors ${config.doubleBorder ? 'bg-zinc-900 text-white border-black' : 'bg-white border-zinc-200 text-zinc-400 hover:border-zinc-300'}`}
                >
                  <div className="w-6 h-4 border border-current flex items-center justify-center p-0.5">
                    <div className="w-full h-full border border-dashed border-current" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-tight">Double Border</span>
                </button>
                <button
                  onClick={() => updateField('cornerDecor', !config.cornerDecor)}
                  className={`p-2.5 rounded-sm border text-xs text-center flex flex-col items-center justify-center gap-1.5 transition-colors ${config.cornerDecor ? 'bg-zinc-900 text-white border-black' : 'bg-white border-zinc-200 text-zinc-400 hover:border-zinc-300'}`}
                >
                  <div className="w-6 h-4 border-l-2 border-t-2 border-current rounded-tl-sm" />
                  <span className="text-[10px] font-bold uppercase tracking-tight">Corners Decors</span>
                </button>
                <button
                  onClick={() => updateField('topoBg', !config.topoBg)}
                  className={`p-2.5 rounded-sm border text-xs text-center flex flex-col items-center justify-center gap-1.5 transition-colors ${config.topoBg ? 'bg-zinc-900 text-white border-black' : 'bg-white border-zinc-200 text-zinc-400 hover:border-zinc-300'}`}
                >
                  <svg className="w-6 h-4 text-current" viewBox="0 0 24 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M2 14 C6 10 10 12 14 10 C18 8 22 10 24 6" />
                    <path d="M2 10 C8 6 14 8 20 4" />
                  </svg>
                  <span className="text-[10px] font-bold uppercase tracking-tight">Topo Wave</span>
                </button>
              </div>
            </div>

            {/* Typography alignment */}
            <div className="space-y-3">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-400">Content Alignment</h3>
              <div className="flex rounded-sm bg-zinc-50 p-1 border border-zinc-200">
                {(['left', 'center', 'right'] as const).map((align) => (
                  <button
                    key={align}
                    onClick={() => updateField('alignment', align)}
                    className={`flex-grow py-1 text-xs capitalize rounded-sm transition-all ${config.alignment === align ? 'bg-zinc-800 text-white font-bold' : 'text-zinc-500 hover:text-black'}`}
                  >
                    {align}
                  </button>
                ))}
              </div>
            </div>

            {/* Leaf Botanical Motif selection */}
            <div className="space-y-3">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-400">Botanical Accent Elements</h3>
              <div className="grid grid-cols-5 gap-1.5">
                {([
                  { id: 'default', label: 'Twin' },
                  { id: 'laurel', label: 'Laurel' },
                  { id: 'sprig', label: 'Olive' },
                  { id: 'monstera', label: 'Palm' },
                  { id: 'none', label: 'None' }
                ] as const).map((motif) => (
                  <button
                    key={motif.id}
                    onClick={() => updateField('leafType', motif.id)}
                    className={`p-2 rounded-sm border text-center transition-all ${config.leafType === motif.id ? 'bg-zinc-900 border-black text-white' : 'bg-white border-zinc-200 text-zinc-500 hover:border-zinc-300'}`}
                  >
                    <div className="text-[9px] font-bold truncate tracking-tight">{motif.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Typography precise adjustments */}
            <div className="space-y-4">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-400">Scale & Dimensions</h3>
              
              {/* Title Size */}
              <div>
                <div className="flex justify-between text-xs text-zinc-500 mb-1 font-sans">
                  <span>Display Font Size</span>
                  <span className="font-mono text-zinc-900">{config.titleSize}px</span>
                </div>
                <input 
                  type="range"
                  min="24"
                  max="62"
                  value={config.titleSize}
                  onChange={(e) => updateField('titleSize', Number(e.target.value))}
                  className="w-full accent-zinc-900 cursor-pointer"
                />
              </div>

              {/* Subtitle font Size */}
              <div>
                <div className="flex justify-between text-xs text-zinc-500 mb-1 font-sans">
                  <span>Subtitle Font Size</span>
                  <span className="font-mono text-zinc-900">{config.subtitleSize}px</span>
                </div>
                <input 
                  type="range"
                  min="14"
                  max="32"
                  value={config.subtitleSize}
                  onChange={(e) => updateField('subtitleSize', Number(e.target.value))}
                  className="w-full accent-zinc-900 cursor-pointer"
                />
              </div>

              {/* Botanical Leaf motif opacity */}
              {config.leafType !== 'none' && (
                <>
                  <div>
                    <div className="flex justify-between text-xs text-zinc-500 mb-1 font-sans">
                      <span>Botanical Accent Opacity</span>
                      <span className="font-mono text-zinc-900">{Math.round(config.leafOpacity * 100)}%</span>
                    </div>
                    <input 
                      type="range"
                      min="0.1"
                      max="0.9"
                      step="0.05"
                      value={config.leafOpacity}
                      onChange={(e) => updateField('leafOpacity', Number(e.target.value))}
                      className="w-full accent-zinc-900 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-zinc-500 mb-1 font-sans">
                      <span>Botanical Accent Size</span>
                      <span className="font-mono text-zinc-900">{config.leafScale}x</span>
                    </div>
                    <input 
                      type="range"
                      min="0.5"
                      max="1.8"
                      step="0.1"
                      value={config.leafScale}
                      onChange={(e) => updateField('leafScale', Number(e.target.value))}
                      className="w-full accent-zinc-900 cursor-pointer"
                    />
                  </div>
                </>
              )}

              {/* Letter tracking */}
              <div>
                <label className="block text-xs text-zinc-500 mb-1.5 font-sans">Wide Tracking (Editorial Spreads)</label>
                <div className="grid grid-cols-4 gap-1.5 p-1 bg-zinc-50 border border-zinc-200 rounded-sm">
                  {([
                    { id: 'tight', label: 'T' },
                    { id: 'normal', label: 'N' },
                    { id: 'wide', label: 'W' },
                    { id: 'widest', label: 'Super' }
                  ] as const).map((space) => (
                    <button
                      key={space.id}
                      onClick={() => updateField('letterSpacing', space.id)}
                      className={`py-1 text-[10px] rounded-sm text-center transition-all ${config.letterSpacing === space.id ? 'bg-black text-white font-bold' : 'text-zinc-500'}`}
                    >
                      {space.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Backdrop controls */}
            <div className="space-y-4 pt-2">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-400">Atmospheric Filters</h3>
              
              {/* Brightness */}
              <div>
                <div className="flex justify-between text-xs text-zinc-500 mb-1 font-sans">
                  <span>Backdrop Brightness</span>
                  <span className="font-mono text-zinc-900">{Math.round(config.brightness * 100)}%</span>
                </div>
                <input 
                  type="range"
                  min="0.5"
                  max="1.5"
                  step="0.05"
                  value={config.brightness}
                  onChange={(e) => updateField('brightness', Number(e.target.value))}
                  className="w-full accent-zinc-900 cursor-pointer"
                />
              </div>

              {/* Contrast */}
              <div>
                <div className="flex justify-between text-xs text-zinc-500 mb-1 font-sans">
                  <span>Backdrop Contrast</span>
                  <span className="font-mono text-zinc-900">{Math.round(config.contrast * 100)}%</span>
                </div>
                <input 
                  type="range"
                  min="0.5"
                  max="1.5"
                  step="0.05"
                  value={config.contrast}
                  onChange={(e) => updateField('contrast', Number(e.target.value))}
                  className="w-full accent-zinc-900 cursor-pointer"
                />
              </div>

              {/* Grayscale */}
              <div>
                <div className="flex justify-between text-xs text-zinc-500 mb-1 font-sans">
                  <span>Grayscale Fade</span>
                  <span className="font-mono text-zinc-900">{Math.round(config.grayscale * 100)}%</span>
                </div>
                <input 
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={config.grayscale}
                  onChange={(e) => updateField('grayscale', Number(e.target.value))}
                  className="w-full accent-zinc-900 cursor-pointer"
                />
              </div>

              {/* Sepia */}
              <div>
                <div className="flex justify-between text-xs text-zinc-500 mb-1 font-sans">
                  <span>Sepia Warmth</span>
                  <span className="font-mono text-zinc-900">{Math.round(config.sepia * 100)}%</span>
                </div>
                <input 
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={config.sepia}
                  onChange={(e) => updateField('sepia', Number(e.target.value))}
                  className="w-full accent-zinc-900 cursor-pointer"
                />
              </div>
            </div>

          </div>
        )}

      </div>

      {/* Persistent Notification Badge */}
      {showNotification && (
        <div className="absolute top-6 left-6 right-6 p-4 bg-zinc-900 text-white font-medium text-xs rounded-sm shadow-xl flex items-center justify-between transition-all duration-300 transform translate-y-0 opacity-100 animate-slide-in z-50">
          <div className="flex items-center gap-2">
            <Sparkles size={14} className="text-amber-500" />
            <span>{showNotification}</span>
          </div>
          <button onClick={() => setShowNotification(null)} className="text-zinc-400 hover:text-white">×</button>
        </div>
      )}
    </div>
  );
}
