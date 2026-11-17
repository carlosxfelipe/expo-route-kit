import {
  type AppColorScheme,
  type AppThemeData,
  type AppThemePair,
  createThemeData,
} from "./theme-types";

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

export const DeepPurpleLightTheme: AppThemeData = createThemeData({
  isDark: false,
  seedColor: DEEP_PURPLE_SEED,
  colors: lightColors,
});

export const DeepPurpleDarkTheme: AppThemeData = createThemeData({
  isDark: true,
  seedColor: DEEP_PURPLE_SEED,
  colors: darkColors,
});

export const DeepPurpleTheme: AppThemePair = {
  light: DeepPurpleLightTheme,
  dark: DeepPurpleDarkTheme,
};
