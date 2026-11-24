import { Tabs } from "expo-router/js-tabs";
import { Platform, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppIcon, type AppIconName } from "@/components/core";
import { testIds } from "@/constants/test-ids";
import { AndroidNativeTabs, IosNativeTabs } from "@/layouts/native-tabs";
import { useAppTheme } from "@/theme";

export interface TabItem {
  name: string;
  title: string;
  testID?: string;
  accessibilityLabel?: string;
  activeIcon: AppIconName;
  inactiveIcon: AppIconName;
}

const TABS: readonly TabItem[] = [
  {
    name: "index",
    title: "Home",
    testID: testIds.tabs.home,
    accessibilityLabel: "Home",
    activeIcon: "home",
    inactiveIcon: "home-outline",
  },
  {
    name: "explore",
    title: "Explore",
    testID: testIds.tabs.explore,
    accessibilityLabel: "Explore",
    activeIcon: "compass",
    inactiveIcon: "compass-outline",
  },
  {
    name: "profile",
    title: "Profile",
    testID: testIds.tabs.profile,
    accessibilityLabel: "Profile",
    activeIcon: "account",
    inactiveIcon: "account-outline",
  },
];

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

  // If you don't want the native tab bars, comment out these blocks to use the JS Tabs fallback.
  if (Platform.OS === "ios") {
    return <IosNativeTabs colors={colors} tabs={TABS} />;
  }

  if (Platform.OS === "android") {
    return <AndroidNativeTabs colors={colors} tabs={TABS} />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarLabelPosition: "below-icon",
        tabBarActiveTintColor: colors.onSurface,
        tabBarInactiveTintColor: colors.onSurfaceVariant,
        tabBarLabelStyle: styles.label,
        tabBarIconStyle: styles.icon,
        tabBarStyle: {
          backgroundColor: colors.surfaceContainerLow,
          borderTopColor: colors.outlineVariant,
          borderTopWidth: 1,
          height: 72 + insets.bottom,
          paddingTop: 4,
          paddingBottom: insets.bottom,
        },
      }}
    >
      {TABS.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarButtonTestID: tab.testID,
            tabBarAccessibilityLabel: tab.accessibilityLabel ?? tab.title,
            tabBarIcon: ({ focused }) => (
              <TabBarIcon
                focused={focused}
                activeIcon={tab.activeIcon}
                inactiveIcon={tab.inactiveIcon}
              />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 56,
    height: 30,
  },
  pill: {
    width: 56,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "600",
    marginTop: 4,
  },
});
