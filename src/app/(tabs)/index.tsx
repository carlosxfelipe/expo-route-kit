import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { useAuthSession } from '@/auth';
import {
  AppBannerCard,
  AppBottomSheet,
  AppButton,
  AppHeader,
  type AppIconName,
  AppListCard,
  ThemeSwitcher,
  useSnackbar,
} from '@/components/core';
import { THEME_MODE_LABELS, useAppTheme, useThemeMode } from '@/theme';

interface ShortcutItem {
  icon: AppIconName;
  title: string;
  subtitle: string;
  route: '/explore' | '/profile';
}

const SHORTCUTS: readonly ShortcutItem[] = [
  {
    icon: 'compass-outline',
    title: 'Explore',
    subtitle: 'Browse features and sections',
    route: '/explore',
  },
  {
    icon: 'account-outline',
    title: 'Profile',
    subtitle: 'Account and preferences',
    route: '/profile',
  },
];

export default function HomeScreen() {
  const { colors, typography } = useAppTheme();
  const { themeMode } = useThemeMode();
  const { signOut } = useAuthSession();
  const { showSnackbar } = useSnackbar();
  const router = useRouter();

  const [logoutSheetVisible, setLogoutSheetVisible] = useState(false);
  const [appearanceSheetVisible, setAppearanceSheetVisible] = useState(false);

  return (
    <View style={[styles.screen, { backgroundColor: colors.surface }]}>
      <AppHeader
        title="Home"
        rightIcon="bell-outline"
        rightIconTooltip="Notifications"
        rightIconBadgeCount={3}
        onRightIconPress={() => showSnackbar('3 new notifications')}
      />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <AppBannerCard
          title="Welcome to Expo Route Kit"
          description="Starter template configured with expo-router and a persistent bottom navigation shell."
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
          />
        ))}
        <AppListCard
          icon="logout"
          title="Logout"
          subtitle="Sign out of your account"
          showChevron={false}
          onPress={() => setLogoutSheetVisible(true)}
        />

        <Text style={[typography.titleMedium, styles.sectionTitle]}>
          Preferences
        </Text>
        <AppListCard
          icon="cog-outline"
          title="Appearance"
          subtitle={`Theme: ${THEME_MODE_LABELS[themeMode]}`}
          onPress={() => setAppearanceSheetVisible(true)}
        />
      </ScrollView>

      <AppBottomSheet
        visible={appearanceSheetVisible}
        onClose={() => setAppearanceSheetVisible(false)}
        title="Appearance">
        <Text style={[typography.titleMedium, styles.sheetLabel]}>App theme</Text>
        <ThemeSwitcher />
      </AppBottomSheet>

      <AppBottomSheet
        visible={logoutSheetVisible}
        onClose={() => setLogoutSheetVisible(false)}
        title="Logout">
        <Text
          style={[
            typography.bodyMedium,
            styles.logoutMessage,
            { color: colors.onSurfaceVariant },
          ]}>
          Are you sure you want to sign out of your account?
        </Text>
        <View style={styles.sheetActions}>
          <View style={styles.actionItem}>
            <AppButton
              label="Cancel"
              variant="outlined"
              fullWidth
              onPress={() => setLogoutSheetVisible(false)}
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
  logoutMessage: {
    marginBottom: 20,
  },
  sheetActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionItem: {
    flex: 1,
  },
});
