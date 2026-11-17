import {
  MaterialDesignIcons,
  type MaterialDesignIconsIconName,
} from "@react-native-vector-icons/material-design-icons";
import React from "react";
import type { StyleProp, TextStyle } from "react-native";

export type AppIconName = MaterialDesignIconsIconName;

export interface AppIconProps {
  name: AppIconName;
  size?: number;
  color?: string;
  style?: StyleProp<TextStyle>;
}

export function AppIcon({ name, size = 24, color, style }: AppIconProps) {
  return (
    <MaterialDesignIcons name={name} size={size} color={color} style={style} />
  );
}
