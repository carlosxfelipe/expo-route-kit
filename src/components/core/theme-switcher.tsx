import React from 'react';

import { type ThemeMode, useThemeMode } from '@/theme';

import {
  AppSegmentedSwitcher,
  type SegmentedSwitcherOption,
} from './app-segmented-switcher';

export interface ThemeSwitcherProps {
  selectedMode?: ThemeMode;
  onChanged?: (mode: ThemeMode) => void;
}

const THEME_OPTIONS: readonly SegmentedSwitcherOption<ThemeMode>[] = [
  {
    value: 'light',
    label: 'Light',
    icon: 'white-balance-sunny',
  },
  {
    value: 'dark',
    label: 'Dark',
    icon: 'weather-night',
  },
  {
    value: 'system',
    label: 'System',
    icon: 'brightness-auto',
  },
];

export function ThemeSwitcher({ selectedMode, onChanged }: ThemeSwitcherProps) {
  const { themeMode, setThemeMode } = useThemeMode();

  return (
    <AppSegmentedSwitcher<ThemeMode>
      options={THEME_OPTIONS}
      selected={selectedMode ?? themeMode}
      onChanged={onChanged ?? setThemeMode}
    />
  );
}
