import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { testProps } from "@/constants/test-ids";
import { useAppTheme } from "@/theme";

import { AppIcon, type AppIconName } from "./app-icon";

export interface HeaderActionsProps {
  actions?: React.ReactNode;
  rightIcon?: AppIconName;
  onRightIconPress?: () => void;
  rightIconTooltip?: string;
  rightIconBadgeCount?: number;
  rightIconBadgeMaxCount?: number;
  showRightIconBadge?: boolean;
  rightIconTestID?: string;
}

export function HeaderActions({
  actions,
  rightIcon,
  onRightIconPress,
  rightIconTooltip,
  rightIconBadgeCount,
  rightIconBadgeMaxCount = 9,
  showRightIconBadge = false,
  rightIconTestID,
}: HeaderActionsProps) {
  const { colors } = useAppTheme();

  if (!actions && !rightIcon) {
    return null;
  }

  const hasCountBadge =
    rightIconBadgeCount !== undefined && rightIconBadgeCount > 0;
  const badgeLabel = hasCountBadge
    ? rightIconBadgeCount > rightIconBadgeMaxCount
      ? `${rightIconBadgeMaxCount}+`
      : `${rightIconBadgeCount}`
    : null;

  return (
    <View style={styles.container}>
      {actions}
      {rightIcon ? (
        <Pressable
          onPress={onRightIconPress}
          accessibilityRole="button"
          hitSlop={8}
          {...testProps(rightIconTestID, rightIconTooltip ?? rightIcon)}
          style={({ pressed }) => [
            styles.iconButton,
            pressed && { backgroundColor: colors.surfaceContainerHighest },
          ]}
        >
          <View style={styles.iconWrapper}>
            <AppIcon name={rightIcon} size={24} color={colors.onSurface} />
            {badgeLabel !== null ? (
              <View
                style={[styles.countBadge, { backgroundColor: colors.error }]}
              >
                <Text
                  style={[styles.countBadgeText, { color: colors.onError }]}
                  numberOfLines={1}
                >
                  {badgeLabel}
                </Text>
              </View>
            ) : showRightIconBadge ? (
              <View
                style={[styles.dotBadge, { backgroundColor: colors.error }]}
              />
            ) : null}
          </View>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrapper: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  countBadge: {
    position: "absolute",
    top: -6,
    right: -8,
    minWidth: 16,
    height: 16,
    paddingHorizontal: 4,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  countBadgeText: {
    fontSize: 10,
    fontWeight: "700",
    lineHeight: 12,
  },
  dotBadge: {
    position: "absolute",
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
