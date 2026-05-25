export interface PosterConfig {
  id: string;
  name: string;
  masthead: string;
  title: string;
  subtitle: string;
  description: string;
  footerTagline: string;
  imageURL: string;
  // Visual Styles
  themeId: string;
  doubleBorder: boolean;
  cornerDecor: boolean;
  topoBg: boolean;
  leafType: 'default' | 'sprig' | 'laurel' | 'monstera' | 'none';
  leafOpacity: number;
  leafScale: number;
  // Image Adjustments
  brightness: number;
  contrast: number;
  grayscale: number;
  sepia: number;
  // Font modifiers
  titleSize: number; // 24 to 80
  subtitleSize: number; // 14 to 36
  letterSpacing: 'tight' | 'normal' | 'wide' | 'widest';
  alignment: 'center' | 'left' | 'right';
  fontSerif: string; // Google font name
}

export interface DesignTheme {
  id: string;
  name: string;
  surface: string;
  surfaceContainer: string;
  primary: string;
  secondary: string;
  accent: string;
  textOnPrimary: string;
  borderTint: string;
}

export const THEMES: DesignTheme[] = [
  {
    id: 'estate-heritage',
    name: 'Estate Heritage (Mango)',
    surface: '#FCF9F3',
    surfaceContainer: '#F0EEE8',
    primary: '#061B0E',
    secondary: '#C5A059',
    accent: '#E9D5A3',
    textOnPrimary: '#FFFFFF',
    borderTint: 'rgba(6, 27, 14, 0.15)'
  },
  {
    id: 'vineyard-select',
    name: 'Burgundy Vineyard',
    surface: '#FAF4F0',
    surfaceContainer: '#ECE2DB',
    primary: '#3F121C',
    secondary: '#B57C58',
    accent: '#F2D7C2',
    textOnPrimary: '#FFFFFF',
    borderTint: 'rgba(63, 18, 28, 0.15)'
  },
  {
    id: 'olive-grove',
    name: 'Olive Garden',
    surface: '#F5F5EE',
    surfaceContainer: '#E5E6D8',
    primary: '#24301B',
    secondary: '#938B6B',
    accent: '#DADCBC',
    textOnPrimary: '#FFFFFF',
    borderTint: 'rgba(36, 48, 27, 0.15)'
  },
  {
    id: 'citrus-blossom',
    name: 'Amalfi Citrus',
    surface: '#FDFCF7',
    surfaceContainer: '#F3EFE0',
    primary: '#0B2347',
    secondary: '#D97706',
    accent: '#FEF3C7',
    textOnPrimary: '#FFFFFF',
    borderTint: 'rgba(11, 35, 71, 0.15)'
  },
  {
    id: 'noir-minimalist',
    name: 'Brutalist Ebony',
    surface: '#121212',
    surfaceContainer: '#1E1E1E',
    primary: '#F5F5F5',
    secondary: '#A3A3A3',
    accent: '#404040',
    textOnPrimary: '#121212',
    borderTint: 'rgba(245, 245, 245, 0.25)'
  }
];

export const PRESET_POSTERS: PosterConfig[] = [
  {
    id: 'mango-harvest',
    name: 'AK Farming - Mango Season',
    masthead: 'AK FARMING',
    title: 'This mango season.',
    subtitle: 'Harness the tastiest mangoes —',
    description: 'with nature’s pure delicacy and the essence of happiness.',
    footerTagline: 'PURE ORCHARD GROWN • NATURALLY RIPENED • SEASONAL DELICACY',
    imageURL: 'https://images.unsplash.com/photo-1553134988-5622813664d6?q=80&w=1000&auto=format&fit=crop',
    themeId: 'estate-heritage',
    doubleBorder: true,
    cornerDecor: true,
    topoBg: true,
    leafType: 'default',
    leafOpacity: 0.35,
    leafScale: 1,
    brightness: 1.05,
    contrast: 1.1,
    grayscale: 0.1,
    sepia: 0.15,
    titleSize: 42,
    subtitleSize: 22,
    letterSpacing: 'wide',
    alignment: 'center',
    fontSerif: 'Bodoni Moda'
  },
  {
    id: 'vineyard-classic',
    name: 'Castello di Amoroso - Grapes',
    masthead: 'ESTATE RESERVE',
    title: 'The Autumn grapes.',
    subtitle: 'Bottled in the heart of Tuscany —',
    description: 'harvested under crimson skies, refined over slow generations for your finest dining table.',
    footerTagline: 'CERTIFIED ORGANIC • ANCIENT CLAY BARRELS • TOASTED WHITE OAK',
    imageURL: 'https://images.unsplash.com/photo-1543418219-44e30b057fc5?q=80&w=1000&auto=format&fit=crop',
    themeId: 'vineyard-select',
    doubleBorder: true,
    cornerDecor: true,
    topoBg: true,
    leafType: 'laurel',
    leafOpacity: 0.25,
    leafScale: 1.1,
    brightness: 0.95,
    contrast: 1.05,
    grayscale: 0.2,
    sepia: 0.3,
    titleSize: 44,
    subtitleSize: 20,
    letterSpacing: 'wide',
    alignment: 'center',
    fontSerif: 'Bodoni Moda'
  },
  {
    id: 'olive-harvest',
    name: 'Grecian Olive - Cold Press',
    masthead: 'GRECIAN HERITAGE',
    title: 'Cold pressed gold.',
    subtitle: 'A single variety ancient cultivar —',
    description: 'harvested by hand from the dry hillsides of Messinia, delivering rich peppery notes and pure life.',
    footerTagline: 'EXTRA VIRGIN • PEYTON STONE COLD PRESS • SINGLE ORIGIN CRATER',
    imageURL: 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?q=80&w=1000&auto=format&fit=crop',
    themeId: 'olive-grove',
    doubleBorder: true,
    cornerDecor: false,
    topoBg: true,
    leafType: 'sprig',
    leafOpacity: 0.4,
    leafScale: 1,
    brightness: 1.0,
    contrast: 1.0,
    grayscale: 0.05,
    sepia: 0.1,
    titleSize: 40,
    subtitleSize: 18,
    letterSpacing: 'widest',
    alignment: 'center',
    fontSerif: 'Bodoni Moda'
  }
];
