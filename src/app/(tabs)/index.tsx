import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { useAuthSession } from "@/auth";
import {
  AppBannerCard,
  AppBottomSheet,
  AppButton,
  AppHeader,
  type AppIconName,
  AppListCard,
  ThemePresetSwitcher,
  ThemeSwitcher,
  useSnackbar,
} from "@/components/core";
import { testIds, viewTestProps } from "@/constants/test-ids";
import {
  THEME_MODE_LABELS,
  THEME_PRESET_LABELS,
  useAppTheme,
  useThemeMode,
} from "@/theme";

interface ShortcutItem {
  icon: AppIconName;
  title: string;
  subtitle: string;
  route: "/explore" | "/profile";
  testID: string;
}

const SHORTCUTS: readonly ShortcutItem[] = [
  {
    icon: "compass-outline",
    title: "Explore",
    subtitle: "Browse features and sections",
    route: "/explore",
    testID: testIds.home.exploreCard,
  },
  {
    icon: "account-outline",
    title: "Profile",
    subtitle: "Account and preferences",
    route: "/profile",
    testID: testIds.home.profileCard,
  },
];

export default function HomeScreen() {
  const { colors, typography } = useAppTheme();
  const { themeMode, themePreset } = useThemeMode();
  const { signOut } = useAuthSession();
  const { showSnackbar } = useSnackbar();
  const router = useRouter();

  const [logoutSheetVisible, setLogoutSheetVisible] = useState(false);
  const [appearanceSheetVisible, setAppearanceSheetVisible] = useState(false);

  return (
    <View
      {...viewTestProps(testIds.home.screen)}
      style={[styles.screen, { backgroundColor: colors.surface }]}
    >
      <AppHeader
        title="Home"
        rightIcon="bell-outline"
        rightIconTooltip="Notifications"
        rightIconBadgeCount={3}
        onRightIconPress={() => showSnackbar("3 new notifications")}
        testID={testIds.home.header}
        rightIconTestID={testIds.home.notificationsButton}
      />
      <ScrollView
        {...viewTestProps(testIds.home.scroll)}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <AppBannerCard
          title="Welcome to Expo Route Kit"
          description="Starter template configured with expo-router and a persistent bottom navigation shell."
          testID={testIds.home.welcomeBanner}
        />

        <Text style={[typography.titleMedium, styles.sectionTitle]}>
          Quick Navigation
        </Text>
        {SHORTCUTS.map((item) => (
          <AppListCard
            key={item.route}
            icon={item.icon}
            title={item.title}
            subtitle={item.subtitle}
            onPress={() => router.navigate(item.route)}
            testID={item.testID}
          />
        ))}
        <AppListCard
          icon="logout"
          title="Logout"
          subtitle="Sign out of your account"
          showChevron={false}
          onPress={() => setLogoutSheetVisible(true)}
          testID={testIds.home.logoutCard}
        />

        <Text style={[typography.titleMedium, styles.sectionTitle]}>
          Preferences
        </Text>
        <AppListCard
          icon="cog-outline"
          title="Appearance"
          subtitle={`Theme: ${THEME_MODE_LABELS[themeMode]} · ${THEME_PRESET_LABELS[themePreset]}`}
          onPress={() => setAppearanceSheetVisible(true)}
          testID={testIds.home.appearanceCard}
        />
      </ScrollView>

      <AppBottomSheet
        visible={appearanceSheetVisible}
        onClose={() => setAppearanceSheetVisible(false)}
        title="Appearance"
        testID={testIds.home.appearanceSheet}
      >
        <Text style={[typography.titleMedium, styles.sheetLabel]}>
          App theme
        </Text>
        <ThemeSwitcher testID={testIds.home.themeModeSwitcher} />
        <Text style={[typography.titleMedium, styles.sheetPresetLabel]}>
          Color palette
        </Text>
        <ThemePresetSwitcher testID={testIds.home.themePresetSwitcher} />
      </AppBottomSheet>

      <AppBottomSheet
        visible={logoutSheetVisible}
        onClose={() => setLogoutSheetVisible(false)}
        title="Logout"
        testID={testIds.home.logoutSheet}
      >
        <Text
          style={[
            typography.bodyMedium,
            styles.logoutMessage,
            { color: colors.onSurfaceVariant },
          ]}
        >
          Are you sure you want to sign out of your account?
        </Text>
        <View style={styles.sheetActions}>
          <View style={styles.actionItem}>
            <AppButton
              label="Cancel"
              variant="outlined"
              fullWidth
              onPress={() => setLogoutSheetVisible(false)}
              testID={testIds.home.logoutCancelButton}
            />
          </View>
          <View style={styles.actionItem}>
            <AppButton
              label="Logout"
              leftIcon="logout"
              fullWidth
              onPress={() => {
                setLogoutSheetVisible(false);
                signOut();
              }}
              testID={testIds.home.logoutConfirmButton}
            />
          </View>
        </View>
      </AppBottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 24,
  },
  sectionTitle: {
    marginTop: 20,
    marginBottom: 8,
  },
  sheetLabel: {
    marginBottom: 12,
  },
  sheetPresetLabel: {
    marginTop: 18,
    marginBottom: 12,
  },
  logoutMessage: {
    marginBottom: 20,
  },
  sheetActions: {
    flexDirection: "row",
    gap: 12,
  },
  actionItem: {
    flex: 1,
  },
});
