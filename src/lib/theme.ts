// Material You theme system
export type AccentColor = 'google-blue' | 'neo-mint' | 'deep-indigo' | 'cyan-tech' | 'warm-coral';

export interface AccentPalette {
  name: AccentColor;
  hsl: string; // HSL values for primary color
  rgb: string; // RGB for direct use
  tint: string; // Tint color for backgrounds (light mode)
  glow: string; // Glow color
  surfaceTint: string; // Surface tint for dark mode background
}

export const accentPalettes: Record<AccentColor, AccentPalette> = {
  'google-blue': {
    name: 'google-blue',
    hsl: '214 100% 66%', // #4C8BF5
    rgb: '76, 139, 245',
    tint: 'rgba(76, 139, 245, 0.08)',
    glow: 'rgba(76, 139, 245, 0.15)',
    surfaceTint: '232 240 254', // #E8F0FE
  },
  'neo-mint': {
    name: 'neo-mint',
    hsl: '160 100% 45%', // #00E5A8
    rgb: '0, 229, 168',
    tint: 'rgba(0, 229, 168, 0.08)',
    glow: 'rgba(0, 229, 168, 0.15)',
    surfaceTint: '232 252 245', // #E8FCF5
  },
  'deep-indigo': {
    name: 'deep-indigo',
    hsl: '258 90% 66%', // #7C4DFF
    rgb: '124, 77, 255',
    tint: 'rgba(124, 77, 255, 0.08)',
    glow: 'rgba(124, 77, 255, 0.15)',
    surfaceTint: '242 238 255', // #F2EEFF
  },
  'cyan-tech': {
    name: 'cyan-tech',
    hsl: '188 100% 42%', // #00B8D4
    rgb: '0, 184, 212',
    tint: 'rgba(0, 184, 212, 0.08)',
    glow: 'rgba(0, 184, 212, 0.15)',
    surfaceTint: '230 248 252', // #E6F8FC
  },
  'warm-coral': {
    name: 'warm-coral',
    hsl: '0 100% 71%', // #FF6B6B
    rgb: '255, 107, 107',
    tint: 'rgba(255, 107, 107, 0.08)',
    glow: 'rgba(255, 107, 107, 0.15)',
    surfaceTint: '255 245 245', // #FFF5F5
  },
};

const THEME_STORAGE_KEY = 'grs-portfolio-theme';
const ACCENT_STORAGE_KEY = 'grs-portfolio-accent';
const PITCH_BLACK_STORAGE_KEY = 'grs-portfolio-pitch-black';

export function getStoredAccent(): AccentColor {
  if (typeof window === 'undefined') return 'google-blue';
  const stored = localStorage.getItem(ACCENT_STORAGE_KEY);
  if (!stored) return 'google-blue';
  
  // Migrate old accent names to new ones
  const migrationMap: Record<string, AccentColor> = {
    'emerald': 'neo-mint',
    'blue': 'google-blue',
    'violet': 'deep-indigo',
    'orange': 'warm-coral',
    'rose': 'warm-coral',
  };
  
  const migrated = migrationMap[stored] || stored;
  
  // Validate that the accent exists in the palette
  if (accentPalettes[migrated as AccentColor]) {
    return migrated as AccentColor;
  }
  
  return 'google-blue';
}

export function setStoredAccent(accent: AccentColor) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(ACCENT_STORAGE_KEY, accent);
  applyAccentColor(accent);
}

export function getStoredPitchBlack(): boolean {
  if (typeof window === 'undefined') return false;
  const stored = localStorage.getItem(PITCH_BLACK_STORAGE_KEY);
  return stored === 'true';
}

export function setStoredPitchBlack(enabled: boolean) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(PITCH_BLACK_STORAGE_KEY, enabled.toString());
}

export function applyAccentColor(accent: AccentColor) {
  if (typeof document === 'undefined') return;
  
  // Validate accent exists, fallback to default if not
  const palette = accentPalettes[accent] || accentPalettes['google-blue'];
  
  if (!palette) {
    console.warn(`Invalid accent color: ${accent}, using default`);
    return;
  }
  
  const root = document.documentElement;
  root.style.setProperty('--primary', palette.hsl);
  root.style.setProperty('--accent', palette.hsl);
  root.style.setProperty('--ring', palette.hsl);
  root.style.setProperty('--emerald-tint', palette.tint);
  root.style.setProperty('--emerald-glow', palette.glow);
  root.style.setProperty('--surface-tint', palette.surfaceTint);
}

export function applyPitchBlack(enabled: boolean, isDark: boolean, accent: AccentColor = 'google-blue') {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  
  // Only apply pitch black in dark mode
  if (!isDark) {
    // Reset to light mode defaults (remove any dark mode overrides)
    root.style.removeProperty('--background');
    root.style.removeProperty('--card');
    root.style.removeProperty('--popover');
    root.style.removeProperty('--secondary');
    root.style.removeProperty('--muted');
    root.style.removeProperty('--border');
    return;
  }
  
  if (enabled) {
    // Pure black (pitch black mode)
    root.style.setProperty('--background', '0 0% 0%');
    root.style.setProperty('--card', '0 0% 2%');
    root.style.setProperty('--popover', '0 0% 2%');
    root.style.setProperty('--secondary', '0 0% 4%');
    root.style.setProperty('--muted', '0 0% 4%');
    root.style.setProperty('--border', '0 0% 8%');
  } else {
    // Material You dark mode - use default dark mode values from CSS
    // Remove pitch black overrides to use CSS defaults
    root.style.removeProperty('--background');
    root.style.removeProperty('--card');
    root.style.removeProperty('--popover');
    root.style.removeProperty('--secondary');
    root.style.removeProperty('--muted');
    root.style.removeProperty('--border');
  }
}

// Initialize theme on mount
export function initializeTheme(isDark: boolean = true) {
  if (typeof window === 'undefined') return;
  const accent = getStoredAccent();
  const pitchBlack = getStoredPitchBlack();
  applyAccentColor(accent);
  // Only apply pitch black if in dark mode and enabled
  if (isDark) {
    applyPitchBlack(pitchBlack, isDark, accent);
  }
}
