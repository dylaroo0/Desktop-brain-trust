import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Basic theme types for now - we'll expand these as needed
interface Theme {
  id: string;
  name: string;
  colors: {
    background: string;
    surface: string;
    surfaceVariant: string;
    primary: string;
    primaryContainer: string;
    onBackground: string;
    onSurface: string;
    onSurfaceVariant: string;
    onPrimary: string;
    outline: string;
    outlineVariant: string;
  };
  typography?: {
    fontFamily: string;
    fontSize: string;
  };
  spacing?: {
    small: string;
    medium: string;
    large: string;
  };
}

const DEFAULT_THEME: Theme = {
  id: 'default-dark',
  name: 'Default Dark',
  colors: {
    background: '#0f0f0f',
    surface: '#1a1a1a',
    surfaceVariant: '#2a2a2a',
    primary: '#007acc',
    primaryContainer: '#005a9e',
    onBackground: '#ffffff',
    onSurface: '#ffffff',
    onSurfaceVariant: '#cccccc',
    onPrimary: '#ffffff',
    outline: '#404040',
    outlineVariant: '#606060',
  },
  typography: {
    fontFamily: 'system-ui, -apple-system, sans-serif',
    fontSize: '14px',
  },
  spacing: {
    small: '8px',
    medium: '16px',
    large: '24px',
  },
};

interface ThemeStore {
  // Current theme
  currentTheme: Theme;

  // Theme management
  savedThemes: Theme[];
  presetThemes: Theme[];

  // Actions
  setTheme: (theme: Theme) => void;
  updateThemeColors: (colors: Partial<Theme['colors']>) => void;
  updateThemeTypography: (typography: Partial<Theme['typography']>) => void;
  updateThemeSpacing: (spacing: Partial<Theme['spacing']>) => void;
  saveTheme: (name: string) => void;
  loadTheme: (themeId: string) => void;
  resetToDefault: () => void;
}

// Preset themes for users to choose from
const PRESET_THEMES: Theme[] = [
  DEFAULT_THEME,
  {
    ...DEFAULT_THEME,
    id: 'dark-blue',
    name: 'Dark Blue',
    colors: {
      ...DEFAULT_THEME.colors,
      background: '#0f172a',
      surface: '#1e293b',
      surfaceVariant: '#334155',
      primary: '#0ea5e9',
      primaryContainer: '#0284c7',
    }
  },
  {
    ...DEFAULT_THEME,
    id: 'warm-dark',
    name: 'Warm Dark',
    colors: {
      ...DEFAULT_THEME.colors,
      background: '#1c1917',
      surface: '#292524',
      surfaceVariant: '#44403c',
      primary: '#f97316',
      primaryContainer: '#ea580c',
    }
  },
  {
    ...DEFAULT_THEME,
    id: 'purple-theme',
    name: 'Purple Theme',
    colors: {
      ...DEFAULT_THEME.colors,
      background: '#1e1b4b',
      surface: '#312e81',
      surfaceVariant: '#4338ca',
      primary: '#8b5cf6',
      primaryContainer: '#7c3aed',
    }
  },
  {
    ...DEFAULT_THEME,
    id: 'high-contrast',
    name: 'High Contrast',
    colors: {
      ...DEFAULT_THEME.colors,
      background: '#000000',
      surface: '#1a1a1a',
      surfaceVariant: '#333333',
      onBackground: '#ffffff',
      onSurface: '#ffffff',
      onSurfaceVariant: '#ffffff',
      primary: '#ffffff',
      onPrimary: '#000000',
      outline: '#ffffff',
      outlineVariant: '#cccccc',
    }
  }
];

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      currentTheme: DEFAULT_THEME,
      savedThemes: [],
      presetThemes: PRESET_THEMES,

      setTheme: (theme) => set({ currentTheme: theme }),

      updateThemeColors: (colors) => {
        const { currentTheme } = get();
        set({
          currentTheme: {
            ...currentTheme,
            colors: { ...currentTheme.colors, ...colors }
          }
        });
      },

      updateThemeTypography: (typography) => {
        const { currentTheme } = get();
        set({
          currentTheme: {
            ...currentTheme,
            typography: { ...currentTheme.typography, ...typography }
          }
        });
      },

      updateThemeSpacing: (spacing) => {
        const { currentTheme } = get();
        set({
          currentTheme: {
            ...currentTheme,
            spacing: { ...currentTheme.spacing, ...spacing }
          }
        });
      },

      saveTheme: (name) => {
        const { currentTheme, savedThemes } = get();
        const newTheme = { ...currentTheme, id: `custom-${Date.now()}`, name };
        set({ savedThemes: [...savedThemes, newTheme] });
      },

      loadTheme: (themeId) => {
        const { savedThemes, presetThemes } = get();
        const allThemes = [...savedThemes, ...presetThemes];
        const theme = allThemes.find(t => t.id === themeId);
        if (theme) {
          set({ currentTheme: theme });
        }
      },

      resetToDefault: () => set({ currentTheme: DEFAULT_THEME }),
    }),
    { name: 'theme-store-v1' }
  )
);

export { DEFAULT_THEME, PRESET_THEMES };
export type { Theme };
