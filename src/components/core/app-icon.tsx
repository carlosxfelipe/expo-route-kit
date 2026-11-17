import {
  MaterialDesignIcons,
  type MaterialDesignIconsIconName,
} from "@react-native-vector-icons/material-design-icons";
import React from "react";
import type { StyleProp, TextStyle } from "react-native";

import { testProps } from "@/constants/test-ids";

export type AppIconName = MaterialDesignIconsIconName;

export interface AppIconProps {
  name: AppIconName;
  size?: number;
  color?: string;
  style?: StyleProp<TextStyle>;
  testID?: string;
  accessibilityLabel?: string;
}

export function AppIcon({
  name,
  size = 24,
  color,
  style,
  testID,
  accessibilityLabel,
}: AppIconProps) {
  return (
    <MaterialDesignIcons
      name={name}
      size={size}
      color={color}
      style={style}
      {...testProps(testID, accessibilityLabel)}
    />
  );
}
