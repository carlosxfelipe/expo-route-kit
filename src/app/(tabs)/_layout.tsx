import { Tabs } from "expo-router/js-tabs";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppIcon, type AppIconName } from "@/components/core";
import { testIds } from "@/constants/test-ids";
import { useAppTheme } from "@/theme";

function TabBarIcon({
  focused,
  activeIcon,
  inactiveIcon,
}: {
  focused: boolean;
  activeIcon: AppIconName;
  inactiveIcon: AppIconName;
}) {
  const { colors } = useAppTheme();

  return (
    <View
      style={[
        styles.pill,
        {
          backgroundColor: focused ? colors.secondaryContainer : "transparent",
        },
      ]}
    >
      <AppIcon
        name={focused ? activeIcon : inactiveIcon}
        size={22}
        color={focused ? colors.onSecondaryContainer : colors.onSurfaceVariant}
      />
    </View>
  );
}

export default function MainShellLayout() {
  const { colors } = useAppTheme();
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.onSurface,
        tabBarInactiveTintColor: colors.onSurfaceVariant,
        tabBarLabelStyle: styles.label,
        tabBarStyle: {
          backgroundColor: colors.surfaceContainerLow,
          borderTopColor: colors.outlineVariant,
          borderTopWidth: 1,
          height: 64 + insets.bottom,
          paddingTop: 8,
          paddingBottom: Math.max(insets.bottom, 8),
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarButtonTestID: testIds.tabs.home,
          tabBarAccessibilityLabel: "Home",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              activeIcon="home"
              inactiveIcon="home-outline"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarButtonTestID: testIds.tabs.explore,
          tabBarAccessibilityLabel: "Explore",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              activeIcon="compass"
              inactiveIcon="compass-outline"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarButtonTestID: testIds.tabs.profile,
          tabBarAccessibilityLabel: "Profile",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              activeIcon="account"
              inactiveIcon="account-outline"
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  pill: {
    width: 56,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    marginTop: 2,
  },
});
