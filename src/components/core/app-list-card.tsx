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

export interface AppListCardProps {
  title: string;
  subtitle?: string;
  icon?: AppIconName;
  iconColor?: string;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  showChevron?: boolean;
  onPress?: () => void;
  borderRadius?: number;
  style?: StyleProp<ViewStyle>;
}

export function AppListCard({
  title,
  subtitle,
  icon,
  iconColor,
  leading,
  trailing,
  showChevron = true,
  onPress,
  borderRadius = 12,
  style,
}: AppListCardProps) {
  const { colors, typography } = useAppTheme();

  const effectiveLeading =
    leading ??
    (icon ? (
      <AppIcon name={icon} size={22} color={iconColor ?? colors.primary} />
    ) : null);

  const effectiveTrailing =
    trailing ??
    (showChevron ? (
      <AppIcon name="chevron-right" size={22} color={colors.onSurfaceVariant} />
    ) : null);

  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      accessibilityRole={onPress ? "button" : undefined}
      style={({ pressed }) => [
        styles.card,
        {
          borderRadius,
          borderColor: colors.outlineVariant,
          backgroundColor:
            pressed && onPress
              ? colors.surfaceContainerHigh
              : colors.surfaceContainerLow,
        },
        style,
      ]}
    >
      {effectiveLeading ? (
        <View style={styles.leading}>{effectiveLeading}</View>
      ) : null}
      <View style={styles.content}>
        <Text
          style={[
            typography.bodyLarge,
            styles.title,
            { color: colors.onSurface },
          ]}
        >
          {title}
        </Text>
        {subtitle ? (
          <Text
            style={[typography.bodyMedium, { color: colors.onSurfaceVariant }]}
          >
            {subtitle}
          </Text>
        ) : null}
      </View>
      {effectiveTrailing ? (
        <View style={styles.trailing}>{effectiveTrailing}</View>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 8,
  },
  leading: {
    marginRight: 16,
  },
  content: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontWeight: "500",
  },
  trailing: {
    marginLeft: 12,
  },
});
