import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import { useAppTheme } from "@/theme";

import { AppIcon, type AppIconName } from "./app-icon";

export interface AppBannerCardProps {
  title: string;
  description?: string;
  icon?: AppIconName;
  backgroundColor?: string;
  foregroundColor?: string;
  padding?: number;
  borderRadius?: number;
  onPress?: () => void;
  footer?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function AppBannerCard({
  title,
  description,
  icon,
  backgroundColor,
  foregroundColor,
  padding = 20,
  borderRadius = 12,
  onPress,
  footer,
  style,
}: AppBannerCardProps) {
  const { colors, typography } = useAppTheme();
  const resolvedBg = backgroundColor ?? colors.primaryContainer;
  const resolvedFg = foregroundColor ?? colors.onPrimaryContainer;

  const inner = (
    <View style={{ padding }}>
      {icon ? (
        <AppIcon name={icon} size={24} color={resolvedFg} style={styles.icon} />
      ) : null}
      <Text style={[typography.titleLarge, { color: resolvedFg }]}>
        {title}
      </Text>
      {description ? (
        <Text
          style={[
            typography.bodyMedium,
            styles.description,
            { color: resolvedFg },
          ]}
        >
          {description}
        </Text>
      ) : null}
      {footer ? <View style={styles.footer}>{footer}</View> : null}
    </View>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        style={({ pressed }) => [
          styles.card,
          {
            backgroundColor: resolvedBg,
            borderRadius,
            opacity: pressed ? 0.9 : 1,
          },
          style,
        ]}
      >
        {inner}
      </Pressable>
    );
  }

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: resolvedBg, borderRadius },
        style,
      ]}
    >
      {inner}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: "hidden",
  },
  icon: {
    marginBottom: 12,
  },
  description: {
    marginTop: 8,
  },
  footer: {
    marginTop: 16,
  },
});
