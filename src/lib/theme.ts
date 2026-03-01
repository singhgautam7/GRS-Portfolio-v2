// Material You theme system
export type AccentColor = 'google-blue' | 'cyan-tech' | 'solar-gold' | 'deep-indigo' | 'neo-mint' | 'blood-red' | 'cosmic-titan' | 'molten-sunset';

export interface AccentPalette {
  name: AccentColor;
  hsl: string; // HSL values for primary color
  lightHsl?: string; // Optional specific HSL for high contrast in light mode
  rgb: string; // RGB for direct use
  tint: string; // Tint color for backgrounds (light mode)
  lightTint?: string; // Optional specific tint for light mode UI surfaces
  glow: string; // Glow color

  // Light Mode Surfaces
  lightSurface: string;
  lightSurfaceVariant: string;
  lightBorder: string;
  lightMuted: string;

  // Dark Mode Surfaces
  darkSurface: string;
  darkSurfaceVariant: string;
  darkBorder: string;
  darkMuted: string;
}

export const accentPalettes: Record<AccentColor, AccentPalette> = {
  'google-blue': {
    name: 'google-blue',
    hsl: '214 100% 66%', // #4C8BF5
    rgb: '76, 139, 245',
    tint: 'rgba(76, 139, 245, 0.08)',
    glow: 'rgba(76, 139, 245, 0.15)',
    lightSurface: '228 100% 98%', // #F5F8FF
    lightSurfaceVariant: '224 100% 96%', // #EEF3FF
    lightBorder: '214 30% 88%',
    lightMuted: '214 20% 30%',
    darkSurface: '214 50% 8%', // Very dark blue
    darkSurfaceVariant: '214 40% 12%',
    darkBorder: '214 30% 20%',
    darkMuted: '214 25% 75%',
  },
  'cyan-tech': {
    name: 'cyan-tech',
    hsl: '188 100% 42%', // #00B8D4
    rgb: '0, 184, 212',
    tint: 'rgba(0, 184, 212, 0.08)',
    glow: 'rgba(0, 184, 212, 0.15)',
    lightSurface: '188 80% 97%', // #E6F8FC
    lightSurfaceVariant: '188 80% 95%',
    lightBorder: '188 30% 88%',
    lightMuted: '188 20% 30%',
    darkSurface: '188 50% 7%', // Very dark cyan
    darkSurfaceVariant: '188 40% 11%',
    darkBorder: '188 30% 19%',
    darkMuted: '188 25% 75%',
  },
  'solar-gold': {
    name: 'solar-gold',
    hsl: '44 91% 61%', // #F5C542
    lightHsl: '43 89% 38%', // #B8860B (Darker Goldenrod for readable Light Mode text)
    rgb: '245, 197, 66',
    tint: 'rgba(245, 197, 66, 0.12)',
    lightTint: 'rgba(184, 134, 11, 0.14)', // Stronger tint for subtle light mode backing
    glow: 'rgba(245, 197, 66, 0.18)',
    lightSurface: '44 100% 98%', // Soft gold tint
    lightSurfaceVariant: '44 100% 96%',
    lightBorder: '44 30% 88%',
    lightMuted: '44 20% 30%',
    darkSurface: '44 50% 6%', // Very dark gold ground
    darkSurfaceVariant: '44 40% 10%',
    darkBorder: '44 30% 18%',
    darkMuted: '44 25% 75%',
  },
  'deep-indigo': {
    name: 'deep-indigo',
    hsl: '262 83% 58%', // #7C3AED
    rgb: '124, 58, 237',
    tint: 'rgba(124, 58, 237, 0.08)',
    glow: 'rgba(124, 58, 237, 0.15)',
    lightSurface: '262 100% 98%', // #F7F4FF
    lightSurfaceVariant: '262 100% 96%', // #F1ECFF
    lightBorder: '262 30% 88%',
    lightMuted: '262 20% 30%',
    darkSurface: '262 50% 8%', // Very dark purple
    darkSurfaceVariant: '262 40% 12%',
    darkBorder: '262 30% 20%',
    darkMuted: '262 25% 75%',
  },
  'neo-mint': {
    name: 'neo-mint',
    hsl: '142 71% 45%', // #22C55E (Softer Emerald)
    rgb: '34, 197, 94',
    tint: 'rgba(34, 197, 94, 0.08)',
    glow: 'rgba(34, 197, 94, 0.15)',
    lightSurface: '146 60% 97%', // #F4FBF7
    lightSurfaceVariant: '145 60% 95%', // #ECF7F1
    lightBorder: '142 30% 88%',
    lightMuted: '142 20% 30%',
    darkSurface: '142 50% 6%', // Very dark green
    darkSurfaceVariant: '142 40% 10%',
    darkBorder: '142 30% 18%',
    darkMuted: '142 25% 75%',
  },
  'blood-red': {
    name: 'blood-red',
    hsl: '0 65% 51%', // #D32F2F
    rgb: '211, 47, 47',
    tint: 'rgba(211, 47, 47, 0.08)',
    glow: 'rgba(211, 47, 47, 0.15)',
    lightSurface: '0 100% 98%', // #FFF5F5
    lightSurfaceVariant: '0 100% 96%', // #FFECEC
    lightBorder: '0 30% 88%',
    lightMuted: '0 20% 30%',
    darkSurface: '0 50% 8%', // subtle dark red
    darkSurfaceVariant: '0 40% 12%',
    darkBorder: '0 30% 20%',
    darkMuted: '0 25% 75%',
  },
  'cosmic-titan': {
    name: 'cosmic-titan',
    hsl: '292 84% 61%', // #D946EF
    rgb: '217, 70, 239',
    tint: 'rgba(217, 70, 239, 0.08)',
    glow: 'rgba(217, 70, 239, 0.15)',
    lightSurface: '292 60% 98%',
    lightSurfaceVariant: '292 60% 95%',
    lightBorder: '292 30% 88%',
    lightMuted: '292 20% 30%',
    darkSurface: '292 50% 8%', // Deep cosmic purple
    darkSurfaceVariant: '292 40% 12%',
    darkBorder: '292 30% 20%',
    darkMuted: '292 25% 75%',
  },
  'molten-sunset': {
    name: 'molten-sunset',
    hsl: '24 95% 55%', // Orange-amber gradient tone
    rgb: '250, 102, 30',
    tint: 'rgba(250, 102, 30, 0.08)',
    glow: 'rgba(250, 102, 30, 0.15)',
    lightSurface: '24 60% 98%',
    lightSurfaceVariant: '24 60% 95%',
    lightBorder: '24 30% 88%',
    lightMuted: '24 20% 30%',
    darkSurface: '24 50% 8%', // Warm dark ember
    darkSurfaceVariant: '24 40% 12%',
    darkBorder: '24 30% 20%',
    darkMuted: '24 25% 75%',
  },
};

const ACCENT_STORAGE_KEY = 'grs-portfolio-accent';
const PITCH_BLACK_STORAGE_KEY = 'grs-portfolio-pitch-black';
const AURORA_STORAGE_KEY = 'grs-portfolio-aurora';

export function getStoredAccent(): AccentColor {
  if (typeof window === 'undefined') return 'google-blue';
  const stored = localStorage.getItem(ACCENT_STORAGE_KEY);
  if (!stored) return 'google-blue';

  // Migrate old accent names to new ones
  const migrationMap: Record<string, AccentColor> = {
    'emerald': 'neo-mint',
    'blue': 'google-blue',
    'violet': 'deep-indigo',
    'orange': 'blood-red',
    'rose': 'blood-red',
    'warm-coral': 'blood-red',
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

export function getStoredAuroraEnabled(): boolean {
  if (typeof window === 'undefined') return true;
  const stored = localStorage.getItem(AURORA_STORAGE_KEY);
  // Default to true if not set
  if (stored === null) return true;
  return stored === 'true';
}

export function setStoredAuroraEnabled(enabled: boolean) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(AURORA_STORAGE_KEY, enabled.toString());
}

export function applyAccentColor(accent: AccentColor, isDarkOverride?: boolean) {
  if (typeof document === 'undefined') return;

  // Validate accent exists, fallback to default if not
  const palette = accentPalettes[accent] || accentPalettes['google-blue'];

  if (!palette) {
    console.warn(`Invalid accent color: ${accent}, using default`);
    return;
  }

  const root = document.documentElement;
  const isDark = isDarkOverride !== undefined ? isDarkOverride : root.classList.contains('dark');

  const currentHsl = (!isDark && palette.lightHsl) ? palette.lightHsl : palette.hsl;
  const currentTint = (!isDark && palette.lightTint) ? palette.lightTint : palette.tint;

  root.style.setProperty('--primary', currentHsl);
  root.style.setProperty('--accent', currentHsl);
  root.style.setProperty('--ring', currentHsl);
  root.style.setProperty('--emerald-tint', currentTint);
  root.style.setProperty('--emerald-glow', palette.glow);
}

export function applyThemeMode(isDark: boolean, pitchBlack: boolean, accent: AccentColor = 'google-blue', auroraEnabled: boolean = true) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  const palette = accentPalettes[accent] || accentPalettes['google-blue'];

  // Logic constraint: Pitch Black instantly kills Aurora
  const effectiveAurora = pitchBlack ? false : auroraEnabled;

  if (effectiveAurora) {
    root.classList.add('aurora-enabled');
  } else {
    root.classList.remove('aurora-enabled');
  }

  if (pitchBlack && isDark) {
    root.classList.add('pitch-black');
  } else {
    root.classList.remove('pitch-black');
  }

  if (!isDark) {
    // Light Mode with Material You tinted surfaces
    root.style.setProperty('--background', palette.lightSurface);
    root.style.setProperty('--card', palette.lightSurfaceVariant);
    root.style.setProperty('--popover', palette.lightSurfaceVariant);
    root.style.setProperty('--secondary', palette.lightSurfaceVariant);
    root.style.setProperty('--muted', palette.lightSurfaceVariant);
    root.style.setProperty('--border', palette.lightBorder);
    root.style.setProperty('--muted-foreground', palette.lightMuted);
    return;
  }

  if (pitchBlack) {
    // Pure black (pitch black mode)
    root.style.setProperty('--background', '0 0% 0%');
    root.style.setProperty('--card', '0 0% 2%');
    root.style.setProperty('--popover', '0 0% 2%');
    root.style.setProperty('--secondary', '0 0% 4%');
    root.style.setProperty('--muted', '0 0% 4%');
    root.style.setProperty('--border', '0 0% 8%');
    root.style.setProperty('--muted-foreground', palette.darkMuted);
  } else {
    // Material You dark mode with accent-based surfaces
    root.style.setProperty('--background', palette.darkSurface);
    root.style.setProperty('--card', palette.darkSurfaceVariant);
    root.style.setProperty('--popover', palette.darkSurfaceVariant);
    root.style.setProperty('--secondary', palette.darkSurfaceVariant);
    root.style.setProperty('--muted', palette.darkSurfaceVariant);
    root.style.setProperty('--border', palette.darkBorder);
    root.style.setProperty('--muted-foreground', palette.darkMuted);
  }

  // Re-apply accent variables to ensure mode-specific (lightHsl/lightTint) variations are swapped seamlessly explicitly overriding DOM stale states
  applyAccentColor(accent, isDark);
}

// Initialize theme on mount
export function initializeTheme(isDark: boolean = true) {
  if (typeof window === 'undefined') return;
  const accent = getStoredAccent();
  const pitchBlack = getStoredPitchBlack();
  const auroraEnabled = getStoredAuroraEnabled();
  applyAccentColor(accent);
  applyThemeMode(isDark, pitchBlack, accent, auroraEnabled);
}
