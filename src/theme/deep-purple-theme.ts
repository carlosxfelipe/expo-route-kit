import type { Theme as NavigationTheme } from "expo-router";
import { Platform, type TextStyle } from "react-native";

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

const DEEP_PURPLE_SEED = "#673AB7";

const lightColors: AppColorScheme = {
  primary: "#6750A4",
  onPrimary: "#FFFFFF",
  primaryContainer: "#EADDFF",
  onPrimaryContainer: "#21005D",
  secondary: "#625B71",
  onSecondary: "#FFFFFF",
  secondaryContainer: "#E8DEF8",
  onSecondaryContainer: "#1D192B",
  tertiary: "#7D5260",
  onTertiary: "#FFFFFF",
  tertiaryContainer: "#FFD8E4",
  onTertiaryContainer: "#31111D",
  error: "#BA1A1A",
  onError: "#FFFFFF",
  errorContainer: "#FFDAD6",
  onErrorContainer: "#410002",
  surface: "#FEF7FF",
  surfaceContainerLowest: "#FFFFFF",
  surfaceContainerLow: "#F7F2FA",
  surfaceContainer: "#F3EDF7",
  surfaceContainerHigh: "#ECE6F0",
  surfaceContainerHighest: "#E6E0E9",
  onSurface: "#1D1B20",
  onSurfaceVariant: "#49454F",
  outline: "#79747E",
  outlineVariant: "#CAC4D0",
  inverseSurface: "#322F35",
  onInverseSurface: "#F5EFF7",
  inversePrimary: "#D0BCFF",
  scrim: "#000000",
  shadow: "#000000",
  online: "#2E7D32",
};

const darkColors: AppColorScheme = {
  primary: "#D0BCFF",
  onPrimary: "#381E72",
  primaryContainer: "#4F378B",
  onPrimaryContainer: "#EADDFF",
  secondary: "#CCC2DC",
  onSecondary: "#332D41",
  secondaryContainer: "#4A4458",
  onSecondaryContainer: "#E8DEF8",
  tertiary: "#EFB8C8",
  onTertiary: "#492532",
  tertiaryContainer: "#633B48",
  onTertiaryContainer: "#FFD8E4",
  error: "#FFB4AB",
  onError: "#690005",
  errorContainer: "#93000A",
  onErrorContainer: "#FFDAD6",
  surface: "#141218",
  surfaceContainerLowest: "#0F0D13",
  surfaceContainerLow: "#1D1B20",
  surfaceContainer: "#211F26",
  surfaceContainerHigh: "#2B2930",
  surfaceContainerHighest: "#36343B",
  onSurface: "#E6E0E9",
  onSurfaceVariant: "#CAC4D0",
  outline: "#938F99",
  outlineVariant: "#49454F",
  inverseSurface: "#E6E0E9",
  onInverseSurface: "#322F35",
  inversePrimary: "#6750A4",
  scrim: "#000000",
  shadow: "#000000",
  online: "#4CAF50",
};

const fontFamily = Platform.select({
  ios: "System",
  android: "Roboto",
  default:
    'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
});

function buildTypography(colors: AppColorScheme): AppTypography {
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

const sharedTokens = {
  seedColor: DEEP_PURPLE_SEED,
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

export const DeepPurpleLightTheme: AppThemeData = {
  isDark: false,
  ...sharedTokens,
  colors: lightColors,
  typography: buildTypography(lightColors),
};

export const DeepPurpleDarkTheme: AppThemeData = {
  isDark: true,
  ...sharedTokens,
  colors: darkColors,
  typography: buildTypography(darkColors),
};

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
