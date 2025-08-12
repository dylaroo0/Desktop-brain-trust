import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the theme structure
export interface Theme {
  background: string;
  header: string;
  footer: string;
  primary: string;
  secondary: string;
  text: string;
  textSecondary: string;
  panelBackground: string;
  panelBorder: string;
  borderRadius: string;
  fontFamily: string;
}

// Default themes
const DEFAULT_THEMES = {
  'dark': {
    background: '#121826',
    header: '#1e293b',
    footer: '#1e293b',
    primary: '#4a6cf7',
    secondary: '#818cf8',
    text: '#f1f5f9',
    textSecondary: '#cbd5e1',
    panelBackground: '#2d3748',
    panelBorder: '#4a5568',
    borderRadius: '8px',
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif'
  },
  'light': {
    background: '#f8fafc',
    header: '#f1f5f9',
    footer: '#f1f5f9',
    primary: '#4338ca',
    secondary: '#6366f1',
    text: '#1e293b',
    textSecondary: '#475569',
    panelBackground: '#ffffff',
    panelBorder: '#e2e8f0',
    borderRadius: '8px',
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif'
  },
  'matrix': {
    background: '#000000',
    header: '#0a0a0a',
    footer: '#0a0a0a',
    primary: '#00ff00',
    secondary: '#39ff14',
    text: '#00ff00',
    textSecondary: '#39ff14',
    panelBackground: '#0a0a0a',
    panelBorder: '#00ff00',
    borderRadius: '0px',
    fontFamily: 'monospace'
  }
};

// Current active theme
const initialState: Theme = DEFAULT_THEMES.dark;

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      return { ...state, ...action.payload };
    },
    setDefaultTheme: (state, action: PayloadAction<keyof typeof DEFAULT_THEMES>) => {
      return { ...state, ...DEFAULT_THEMES[action.payload] };
    },
    updateThemeProperty: (state, action: PayloadAction<{ property: keyof Theme; value: string }>) => {
      state[action.payload.property] = action.payload.value;
    }
  }
});

export const { setTheme, setDefaultTheme, updateThemeProperty } = themeSlice.actions;
export default themeSlice.reducer;
