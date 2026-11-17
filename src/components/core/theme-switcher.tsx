import React from "react";

import { type AppThemePreset, type ThemeMode, useThemeMode } from "@/theme";

import {
  AppSegmentedSwitcher,
  type SegmentedSwitcherOption,
} from "./app-segmented-switcher";

export interface ThemeSwitcherProps {
  selectedMode?: ThemeMode;
  onChanged?: (mode: ThemeMode) => void;
  testID?: string;
}

const THEME_OPTIONS: readonly SegmentedSwitcherOption<ThemeMode>[] = [
  {
    value: "light",
    label: "Light",
    icon: "white-balance-sunny",
  },
  {
    value: "dark",
    label: "Dark",
    icon: "weather-night",
  },
  {
    value: "system",
    label: "System",
    icon: "brightness-auto",
  },
];

export function ThemeSwitcher({
  selectedMode,
  onChanged,
  testID,
}: ThemeSwitcherProps) {
  const { themeMode, setThemeMode } = useThemeMode();

  return (
    <AppSegmentedSwitcher<ThemeMode>
      options={THEME_OPTIONS}
      selected={selectedMode ?? themeMode}
      onChanged={onChanged ?? setThemeMode}
      testID={testID}
    />
  );
}

export interface ThemePresetSwitcherProps {
  selectedPreset?: AppThemePreset;
  onChanged?: (preset: AppThemePreset) => void;
  testID?: string;
}

const PRESET_OPTIONS: readonly SegmentedSwitcherOption<AppThemePreset>[] = [
  {
    value: "deep_purple",
    label: "Deep Purple",
    icon: "palette-outline",
  },
  {
    value: "custom_blue",
    label: "Custom Blue",
    icon: "water-outline",
  },
];

export function ThemePresetSwitcher({
  selectedPreset,
  onChanged,
  testID,
}: ThemePresetSwitcherProps) {
  const { themePreset, setThemePreset } = useThemeMode();

  return (
    <AppSegmentedSwitcher<AppThemePreset>
      options={PRESET_OPTIONS}
      selected={selectedPreset ?? themePreset}
      onChanged={onChanged ?? setThemePreset}
      testID={testID}
    />
  );
}
