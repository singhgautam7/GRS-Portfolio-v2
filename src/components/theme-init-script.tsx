import { accentPalettes } from '@/lib/theme';

export function ThemeInitScript() {
  const code = `
    (function() {
      try {
        var isSaved = localStorage.getItem('saveThemePreferences') === 'true';
        if (!isSaved) {
          var palettes = ${JSON.stringify(accentPalettes)};
          var themeNames = Object.keys(palettes);
          var lastIndexStr = localStorage.getItem('lastThemeIndex');
          var lastIndex = lastIndexStr ? parseInt(lastIndexStr, 10) : -1;

          var newIndex = Math.floor(Math.random() * themeNames.length);
          if (themeNames.length > 1) {
            while (newIndex === lastIndex) {
              newIndex = Math.floor(Math.random() * themeNames.length);
            }
          }

          localStorage.setItem('lastThemeIndex', newIndex.toString());
          var chosenTheme = themeNames[newIndex];

          // Instruct next-themes to apply dark on mount natively
          localStorage.setItem('theme', 'dark');

          var palette = palettes[chosenTheme];
          var root = document.documentElement;
          root.classList.add('dark');
          root.style.colorScheme = 'dark';

          var currentHsl = palette.hsl;
          root.style.setProperty('--primary', currentHsl);
          root.style.setProperty('--accent', currentHsl);
          root.style.setProperty('--ring', currentHsl);
          root.style.setProperty('--emerald-tint', palette.tint);
          root.style.setProperty('--emerald-glow', palette.glow);

          root.style.setProperty('--background', palette.darkSurface);
          root.style.setProperty('--card', palette.darkSurfaceVariant);
          root.style.setProperty('--popover', palette.darkSurfaceVariant);
          root.style.setProperty('--secondary', palette.darkSurfaceVariant);
          root.style.setProperty('--muted', palette.darkSurfaceVariant);
          root.style.setProperty('--border', palette.darkBorder);
          root.style.setProperty('--muted-foreground', palette.darkMuted);

          root.classList.remove('aurora-enabled');
          root.classList.remove('pitch-black');

          window.__themeRolled = chosenTheme;
        } else {
          var accentName = localStorage.getItem('grs-portfolio-accent');
          var migrationMap = {
            'emerald': 'neo-mint',
            'blue': 'google-blue',
            'violet': 'deep-indigo',
            'orange': 'blood-red',
            'rose': 'blood-red',
            'warm-coral': 'blood-red',
          };
          var migrated = migrationMap[accentName] || accentName || 'google-blue';

          var palettes = ${JSON.stringify(accentPalettes)};
          var palette = palettes[migrated] || palettes['google-blue'];

          var isDark = localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
          var currentHsl = (!isDark && palette.lightHsl) ? palette.lightHsl : palette.hsl;
          var currentTint = (!isDark && palette.lightTint) ? palette.lightTint : palette.tint;

          var root = document.documentElement;
          root.style.setProperty('--primary', currentHsl);
          root.style.setProperty('--accent', currentHsl);
          root.style.setProperty('--ring', currentHsl);
          root.style.setProperty('--emerald-tint', currentTint);
          root.style.setProperty('--emerald-glow', palette.glow);

          window.__themeRolledSaved = migrated;
        }
      } catch (e) {}
    })();
  `;
  return <script dangerouslySetInnerHTML={{ __html: code }} suppressHydrationWarning />;
}
