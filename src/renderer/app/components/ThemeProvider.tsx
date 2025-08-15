import React, { useEffect } from 'react';
import { useThemeStore } from '../store/theme/themeStore';

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const { currentTheme } = useThemeStore();

  useEffect(() => {
    // Apply theme to CSS custom properties
    const root = document.documentElement;

    // Apply color variables
    Object.entries(currentTheme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`, value as string);
    });

    // Apply typography variables if they exist
    if (currentTheme.typography) {
      root.style.setProperty('--font-family', currentTheme.typography.fontFamily);
      root.style.setProperty('--font-size', currentTheme.typography.fontSize);
    }

    // Apply spacing variables if they exist
    if (currentTheme.spacing) {
      Object.entries(currentTheme.spacing).forEach(([key, value]) => {
        root.style.setProperty(`--spacing-${key}`, value as string);
      });
    }
  }, [currentTheme]);

  return <>{children}</>;
};

export default ThemeProvider;
