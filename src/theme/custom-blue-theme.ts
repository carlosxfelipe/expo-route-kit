import {
  type AppColorScheme,
  type AppThemeData,
  type AppThemePair,
  createThemeData,
} from "./theme-types";

const CUSTOM_BLUE_SEED = "#2196F3";

// Neutral surface overrides matching flutter_route_kit/lib/theme/custom_blue_theme.dart:
// `surface` and `surfaceContainerLowest` share the same base color, so cards/containers
// use `surfaceContainer*` or `outlineVariant` borders for separation.
const lightColors: AppColorScheme = {
  primary: "#0061A4",
  onPrimary: "#FFFFFF",
  primaryContainer: "#D1E4FF",
  onPrimaryContainer: "#001D36",
  secondary: "#535F70",
  onSecondary: "#FFFFFF",
  secondaryContainer: "#D7E3F7",
  onSecondaryContainer: "#101C2B",
  tertiary: "#6B5778",
  onTertiary: "#FFFFFF",
  tertiaryContainer: "#F2DAFF",
  onTertiaryContainer: "#251431",
  error: "#BA1A1A",
  onError: "#FFFFFF",
  errorContainer: "#FFDAD6",
  onErrorContainer: "#410002",
  surface: "#FFFFFF",
  surfaceContainerLowest: "#FFFFFF",
  surfaceContainerLow: "#F7F7FA",
  surfaceContainer: "#F2F2F7",
  surfaceContainerHigh: "#ECECF2",
  surfaceContainerHighest: "#E5E5EC",
  onSurface: "#141418",
  onSurfaceVariant: "#494954",
  outline: "#73777F",
  outlineVariant: "#DADAE3",
  inverseSurface: "#2E3135",
  onInverseSurface: "#F0F0F3",
  inversePrimary: "#9ECAFF",
  scrim: "#000000",
  shadow: "#000000",
  online: "#2E7D32",
};

const darkColors: AppColorScheme = {
  primary: "#9ECAFF",
  onPrimary: "#003258",
  primaryContainer: "#00497D",
  onPrimaryContainer: "#D1E4FF",
  secondary: "#BBC7DB",
  onSecondary: "#253140",
  secondaryContainer: "#3B4858",
  onSecondaryContainer: "#D7E3F7",
  tertiary: "#D6BEE4",
  onTertiary: "#3B2948",
  tertiaryContainer: "#523F5F",
  onTertiaryContainer: "#F2DAFF",
  error: "#FFB4AB",
  onError: "#690005",
  errorContainer: "#93000A",
  onErrorContainer: "#FFDAD6",
  surface: "#000000",
  surfaceContainerLowest: "#000000",
  surfaceContainerLow: "#0D0D10",
  surfaceContainer: "#141418",
  surfaceContainerHigh: "#1C1C22",
  surfaceContainerHighest: "#24242C",
  onSurface: "#F5F5F7",
  onSurfaceVariant: "#B8B8C4",
  outline: "#8D9199",
  outlineVariant: "#2C2C35",
  inverseSurface: "#E2E2E6",
  onInverseSurface: "#2E3135",
  inversePrimary: "#0061A4",
  scrim: "#000000",
  shadow: "#000000",
  online: "#4CAF50",
};

export const CustomBlueLightTheme: AppThemeData = createThemeData({
  isDark: false,
  seedColor: CUSTOM_BLUE_SEED,
  colors: lightColors,
});

export const CustomBlueDarkTheme: AppThemeData = createThemeData({
  isDark: true,
  seedColor: CUSTOM_BLUE_SEED,
  colors: darkColors,
});

export const CustomBlueTheme: AppThemePair = {
  light: CustomBlueLightTheme,
  dark: CustomBlueDarkTheme,
};
