import type { Theme as NavigationTheme } from "expo-router";
import { Platform, type TextStyle } from "react-native";

export type AppThemePreset = "deep_purple" | "custom_blue";

export interface AppColorScheme {
  primary: string;
  onPrimary: string;
  primaryContainer: string;
  onPrimaryContainer: string;
  secondary: string;
  onSecondary: string;
  secondaryContainer: string;
  onSecondaryContainer: string;
  tertiary: string;
  onTertiary: string;
  tertiaryContainer: string;
  onTertiaryContainer: string;
  error: string;
  onError: string;
  errorContainer: string;
  onErrorContainer: string;
  surface: string;
  surfaceContainerLowest: string;
  surfaceContainerLow: string;
  surfaceContainer: string;
  surfaceContainerHigh: string;
  surfaceContainerHighest: string;
  onSurface: string;
  onSurfaceVariant: string;
  outline: string;
  outlineVariant: string;
  inverseSurface: string;
  onInverseSurface: string;
  inversePrimary: string;
  scrim: string;
  shadow: string;
  online: string;
}

export interface AppTypography {
  headlineMedium: TextStyle;
  headlineSmall: TextStyle;
  titleLarge: TextStyle;
  titleMedium: TextStyle;
  bodyLarge: TextStyle;
  bodyMedium: TextStyle;
  bodySmall: TextStyle;
  labelLarge: TextStyle;
  labelMedium: TextStyle;
}

export interface AppThemeData {
  isDark: boolean;
  seedColor: string;
  colors: AppColorScheme;
  typography: AppTypography;
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
  radius: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
    full: number;
  };
}

export interface AppThemePair {
  light: AppThemeData;
  dark: AppThemeData;
}

const fontFamily = Platform.select({
  ios: "System",
  android: "Roboto",
  default:
    'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
});

export function buildTypography(colors: AppColorScheme): AppTypography {
  return {
    headlineMedium: {
      fontFamily,
      fontSize: 28,
      lineHeight: 36,
      fontWeight: "600",
      color: colors.onSurface,
    },
    headlineSmall: {
      fontFamily,
      fontSize: 24,
      lineHeight: 32,
      fontWeight: "500",
      color: colors.onSurface,
    },
    titleLarge: {
      fontFamily,
      fontSize: 22,
      lineHeight: 28,
      fontWeight: "500",
      color: colors.onSurface,
    },
    titleMedium: {
      fontFamily,
      fontSize: 16,
      lineHeight: 24,
      fontWeight: "600",
      letterSpacing: 0.15,
      color: colors.onSurface,
    },
    bodyLarge: {
      fontFamily,
      fontSize: 16,
      lineHeight: 24,
      fontWeight: "400",
      letterSpacing: 0.25,
      color: colors.onSurface,
    },
    bodyMedium: {
      fontFamily,
      fontSize: 14,
      lineHeight: 20,
      fontWeight: "400",
      letterSpacing: 0.2,
      color: colors.onSurface,
    },
    bodySmall: {
      fontFamily,
      fontSize: 12,
      lineHeight: 16,
      fontWeight: "400",
      letterSpacing: 0.3,
      color: colors.onSurfaceVariant,
    },
    labelLarge: {
      fontFamily,
      fontSize: 14,
      lineHeight: 20,
      fontWeight: "600",
      letterSpacing: 0.1,
      color: colors.onSurface,
    },
    labelMedium: {
      fontFamily,
      fontSize: 12,
      lineHeight: 16,
      fontWeight: "500",
      letterSpacing: 0.4,
      color: colors.onSurface,
    },
  };
}

export function createThemeData({
  isDark,
  seedColor,
  colors,
}: {
  isDark: boolean;
  seedColor: string;
  colors: AppColorScheme;
}): AppThemeData {
  return {
    isDark,
    seedColor,
    colors,
    typography: buildTypography(colors),
    spacing: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 20,
      xl: 24,
      xxl: 32,
    },
    radius: {
      sm: 8,
      md: 12,
      lg: 14,
      xl: 24,
      full: 999,
    },
  };
}

export function toNavigationTheme(theme: AppThemeData): NavigationTheme {
  return {
    dark: theme.isDark,
    colors: {
      primary: theme.colors.primary,
      background: theme.colors.surface,
      card: theme.colors.surfaceContainerLow,
      text: theme.colors.onSurface,
      border: theme.colors.outlineVariant,
      notification: theme.colors.error,
    },
    fonts: {
      regular: { fontFamily: fontFamily ?? "System", fontWeight: "400" },
      medium: { fontFamily: fontFamily ?? "System", fontWeight: "500" },
      bold: { fontFamily: fontFamily ?? "System", fontWeight: "700" },
      heavy: { fontFamily: fontFamily ?? "System", fontWeight: "800" },
    },
  };
}
