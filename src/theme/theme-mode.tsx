import React, { createContext, useContext, useMemo, useState } from 'react';
import { useColorScheme } from 'react-native';

import {
  type AppThemeData,
  DeepPurpleDarkTheme,
  DeepPurpleLightTheme,
} from './deep-purple-theme';

export type ThemeMode = 'light' | 'dark' | 'system';

export const THEME_MODE_LABELS: Record<ThemeMode, string> = {
  light: 'Light',
  dark: 'Dark',
  system: 'System',
};

interface ThemeContextValue {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  resolvedScheme: 'light' | 'dark';
  isDark: boolean;
  theme: AppThemeData;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function AppThemeProvider({ children }: { children: React.ReactNode }) {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState<ThemeMode>('system');

  const value = useMemo<ThemeContextValue>(() => {
    const resolvedScheme: 'light' | 'dark' =
      themeMode === 'system'
        ? systemColorScheme === 'dark'
          ? 'dark'
          : 'light'
        : themeMode;
    const isDark = resolvedScheme === 'dark';
    const theme = isDark ? DeepPurpleDarkTheme : DeepPurpleLightTheme;

    return {
      themeMode,
      setThemeMode,
      resolvedScheme,
      isDark,
      theme,
    };
  }, [systemColorScheme, themeMode]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useThemeMode() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeMode must be used within an AppThemeProvider');
  }
  return {
    themeMode: context.themeMode,
    setThemeMode: context.setThemeMode,
    resolvedScheme: context.resolvedScheme,
    isDark: context.isDark,
  };
}

export function useAppTheme(): AppThemeData {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useAppTheme must be used within an AppThemeProvider');
  }
  return context.theme;
}
