import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useAuthSession } from "@/auth";
import {
  AppAvatar,
  AppBottomSheet,
  AppButton,
  AppHeader,
  AppListCard,
  AppSwitch,
  ThemePresetSwitcher,
  ThemeSwitcher,
  useSnackbar,
} from "@/components/core";
import { testIds, testProps, viewTestProps } from "@/constants/test-ids";
import {
  THEME_MODE_LABELS,
  THEME_PRESET_LABELS,
  useAppTheme,
  useThemeMode,
} from "@/theme";

export default function ProfileScreen() {
  const { colors, typography } = useAppTheme();
  const { themeMode, themePreset } = useThemeMode();
  const { signOut } = useAuthSession();
  const { showSnackbar } = useSnackbar();
  const insets = useSafeAreaInsets();

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [appearanceSheetVisible, setAppearanceSheetVisible] = useState(false);
  const [signOutSheetVisible, setSignOutSheetVisible] = useState(false);

  return (
    <View
      {...viewTestProps(testIds.profile.screen)}
      style={[styles.screen, { backgroundColor: colors.surface }]}
    >
      <AppHeader title="Profile" testID={testIds.profile.header} />

      <ScrollView
        {...viewTestProps(testIds.profile.scroll)}
        contentContainerStyle={[
          styles.content,
          {
            paddingLeft: 16 + insets.left,
            paddingRight: 16 + insets.right,
            paddingBottom: 24 + insets.bottom,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            styles.profileCard,
            {
              backgroundColor: colors.surfaceContainerLow,
              borderColor: colors.outlineVariant,
            },
          ]}
        >
          <AppAvatar
            name="User Profile"
            radius={36}
            showOnlineBadge
            testID={testIds.profile.avatar}
            accessibilityLabel="User avatar"
          />
          <View style={styles.profileInfo}>
            <Text
              {...testProps(testIds.profile.title)}
              style={[typography.titleLarge, { color: colors.onSurface }]}
            >
              User Profile
            </Text>
            <Text
              {...testProps(testIds.profile.description)}
              style={[
                typography.bodyMedium,
                { color: colors.onSurfaceVariant },
              ]}
            >
              user@example.com
            </Text>
          </View>
        </View>

        <Text
          style={[
            typography.titleMedium,
            styles.sectionTitle,
            { color: colors.onSurface },
          ]}
        >
          Account
        </Text>
        <AppListCard
          icon="account-edit-outline"
          title="Edit Profile"
          subtitle="Update your name and personal info"
          onPress={() => showSnackbar("Edit profile coming soon")}
          testID={testIds.profile.editProfileCard}
        />
        <AppListCard
          icon="bell-outline"
          title="Notifications"
          subtitle={notificationsEnabled ? "Enabled" : "Disabled"}
          showChevron={false}
          testID={testIds.profile.notificationsCard}
          trailing={
            <AppSwitch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              testID={testIds.profile.notificationsSwitch}
              accessibilityLabel="Notifications"
            />
          }
          onPress={() => setNotificationsEnabled((prev) => !prev)}
        />
        <AppListCard
          icon="shield-lock-outline"
          title="Privacy & Security"
          subtitle="Password and session settings"
          onPress={() => showSnackbar("Privacy & Security coming soon")}
          testID={testIds.profile.privacyCard}
        />

        <Text
          style={[
            typography.titleMedium,
            styles.sectionTitle,
            { color: colors.onSurface },
          ]}
        >
          Preferences
        </Text>
        <AppListCard
          icon="cog-outline"
          title="Appearance"
          subtitle={`Theme: ${THEME_MODE_LABELS[themeMode]} · ${THEME_PRESET_LABELS[themePreset]}`}
          onPress={() => setAppearanceSheetVisible(true)}
          testID={testIds.profile.appearanceCard}
        />

        <View style={styles.actions}>
          <AppButton
            label="Sign out"
            variant="outlined"
            leftIcon="logout"
            fullWidth
            onPress={() => setSignOutSheetVisible(true)}
            testID={testIds.profile.signOutButton}
          />
        </View>
      </ScrollView>

      <AppBottomSheet
        visible={appearanceSheetVisible}
        onClose={() => setAppearanceSheetVisible(false)}
        title="Appearance"
        testID={testIds.profile.appearanceSheet}
      >
        <Text style={[typography.titleMedium, styles.sheetLabel]}>
          App theme
        </Text>
        <ThemeSwitcher testID={testIds.profile.themeModeSwitcher} />
        <Text style={[typography.titleMedium, styles.sheetPresetLabel]}>
          Color palette
        </Text>
        <ThemePresetSwitcher testID={testIds.profile.themePresetSwitcher} />
      </AppBottomSheet>

      <AppBottomSheet
        visible={signOutSheetVisible}
        onClose={() => setSignOutSheetVisible(false)}
        title="Sign out"
        testID={testIds.profile.signOutSheet}
      >
        <Text
          style={[
            typography.bodyMedium,
            styles.signOutMessage,
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
              onPress={() => setSignOutSheetVisible(false)}
              testID={testIds.profile.signOutCancelButton}
            />
          </View>
          <View style={styles.actionItem}>
            <AppButton
              label="Sign out"
              leftIcon="logout"
              fullWidth
              onPress={() => {
                setSignOutSheetVisible(false);
                signOut();
              }}
              testID={testIds.profile.signOutConfirmButton}
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
    paddingHorizontal: 16,
    paddingTop: 12,
    gap: 10,
  },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  profileInfo: {
    flex: 1,
    gap: 4,
  },
  sectionTitle: {
    marginTop: 8,
  },
  actions: {
    marginTop: 12,
  },
  sheetLabel: {
    marginBottom: 12,
  },
  sheetPresetLabel: {
    marginTop: 18,
    marginBottom: 12,
  },
  signOutMessage: {
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
