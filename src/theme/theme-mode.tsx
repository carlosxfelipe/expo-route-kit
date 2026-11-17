import React, { createContext, useContext, useMemo, useState } from "react";
import { useColorScheme } from "react-native";

import { CustomBlueTheme } from "./custom-blue-theme";
import { DeepPurpleTheme } from "./deep-purple-theme";
import type { AppThemeData, AppThemePair, AppThemePreset } from "./theme-types";

export type ThemeMode = "light" | "dark" | "system";

export const THEME_MODE_LABELS: Record<ThemeMode, string> = {
  light: "Light",
  dark: "Dark",
  system: "System",
};

export const THEME_PRESET_LABELS: Record<AppThemePreset, string> = {
  deep_purple: "Deep Purple",
  custom_blue: "Custom Blue",
};

// Swap the default active theme preset here ('deep_purple' | 'custom_blue').
export const DEFAULT_THEME_PRESET: AppThemePreset = "custom_blue";

const THEME_PRESETS: Record<AppThemePreset, AppThemePair> = {
  deep_purple: DeepPurpleTheme,
  custom_blue: CustomBlueTheme,
};

interface ThemeContextValue {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  themePreset: AppThemePreset;
  setThemePreset: (preset: AppThemePreset) => void;
  resolvedScheme: "light" | "dark";
  isDark: boolean;
  theme: AppThemeData;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function AppThemeProvider({
  children,
  initialPreset = DEFAULT_THEME_PRESET,
}: {
  children: React.ReactNode;
  initialPreset?: AppThemePreset;
}) {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState<ThemeMode>("system");
  const [themePreset, setThemePreset] = useState<AppThemePreset>(initialPreset);

  const value = useMemo<ThemeContextValue>(() => {
    const resolvedScheme: "light" | "dark" =
      themeMode === "system"
        ? systemColorScheme === "dark"
          ? "dark"
          : "light"
        : themeMode;
    const isDark = resolvedScheme === "dark";
    const pair = THEME_PRESETS[themePreset];
    const theme = isDark ? pair.dark : pair.light;

    return {
      themeMode,
      setThemeMode,
      themePreset,
      setThemePreset,
      resolvedScheme,
      isDark,
      theme,
    };
  }, [systemColorScheme, themeMode, themePreset]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useThemeMode() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeMode must be used within an AppThemeProvider");
  }
  return {
    themeMode: context.themeMode,
    setThemeMode: context.setThemeMode,
    themePreset: context.themePreset,
    setThemePreset: context.setThemePreset,
    resolvedScheme: context.resolvedScheme,
    isDark: context.isDark,
  };
}

export function useAppTheme(): AppThemeData {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useAppTheme must be used within an AppThemeProvider");
  }
  return context.theme;
}
