import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useAppTheme } from "@/theme";

import type { AppIconName } from "./app-icon";
import { HeaderActions } from "./header-actions";

export interface AppHeaderProps {
  title: string;
  leading?: React.ReactNode;
  rightIcon?: AppIconName;
  onRightIconPress?: () => void;
  rightIconTooltip?: string;
  rightIconBadgeCount?: number;
  rightIconBadgeMaxCount?: number;
  showRightIconBadge?: boolean;
  actions?: React.ReactNode;
  centerTitle?: boolean;
  backgroundColor?: string;
}

export function AppHeader({
  title,
  leading,
  rightIcon,
  onRightIconPress,
  rightIconTooltip,
  rightIconBadgeCount,
  rightIconBadgeMaxCount = 9,
  showRightIconBadge = false,
  actions,
  centerTitle = false,
  backgroundColor,
}: AppHeaderProps) {
  const { colors, typography } = useAppTheme();
  const insets = useSafeAreaInsets();
  const resolvedBg = backgroundColor ?? colors.surface;

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          backgroundColor: resolvedBg,
        },
      ]}
    >
      <View style={styles.toolbar}>
        {leading ? <View style={styles.leading}>{leading}</View> : null}
        <View
          style={[
            styles.titleContainer,
            centerTitle ? styles.titleCentered : undefined,
          ]}
        >
          <Text
            numberOfLines={1}
            style={[typography.titleLarge, { color: colors.onSurface }]}
          >
            {title}
          </Text>
        </View>
        <HeaderActions
          actions={actions}
          rightIcon={rightIcon}
          onRightIconPress={onRightIconPress}
          rightIconTooltip={rightIconTooltip}
          rightIconBadgeCount={rightIconBadgeCount}
          rightIconBadgeMaxCount={rightIconBadgeMaxCount}
          showRightIconBadge={showRightIconBadge}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  toolbar: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  leading: {
    marginRight: 12,
  },
  titleContainer: {
    flex: 1,
    justifyContent: "center",
  },
  titleCentered: {
    alignItems: "center",
  },
});
