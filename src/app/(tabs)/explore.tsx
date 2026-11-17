import React, { useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, Switch, Text, View } from "react-native";

import {
  AppAvatar,
  AppBannerCard,
  AppBottomSheet,
  AppButton,
  AppEmptyState,
  AppHeader,
  AppListCard,
  AppSearchHeader,
  AppSegmentedSwitcher,
  AppTextField,
  type SegmentedSwitcherOption,
  useSnackbar,
} from "@/components/core";
import { useAppTheme } from "@/theme";

const VIEW_OPTIONS: readonly SegmentedSwitcherOption<
  "Day" | "Week" | "Month"
>[] = [
  { value: "Day", label: "Day", icon: "calendar-today-outline" },
  { value: "Week", label: "Week", icon: "view-week-outline" },
  { value: "Month", label: "Month", icon: "calendar-month-outline" },
];

const LAYOUT_OPTIONS: readonly SegmentedSwitcherOption<"List" | "Grid">[] = [
  { value: "List", label: "List", icon: "view-list-outline" },
  { value: "Grid", label: "Grid", icon: "view-grid-outline" },
];

function SectionTitle({ title }: { title: string }) {
  const { typography } = useAppTheme();
  return (
    <Text style={[typography.titleMedium, styles.sectionTitle]}>{title}</Text>
  );
}

export default function ExploreScreen() {
  const { colors, typography } = useAppTheme();
  const { showSnackbar } = useSnackbar();

  const [isLoading, setIsLoading] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [sheetVisible, setSheetVisible] = useState(false);
  const [selectedView, setSelectedView] = useState<"Day" | "Week" | "Month">(
    "Day",
  );
  const [selectedLayout, setSelectedLayout] = useState<"List" | "Grid">("List");

  const loadingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (loadingTimerRef.current) {
        clearTimeout(loadingTimerRef.current);
      }
    };
  }, []);

  const simulateLoading = () => {
    if (isLoading) return;
    setIsLoading(true);
    loadingTimerRef.current = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <View style={[styles.screen, { backgroundColor: colors.surface }]}>
      <AppHeader title="Explore" />
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <SectionTitle title="AppButton Variants" />
        <View style={styles.wrapRow}>
          <AppButton label="Filled" onPress={() => {}} />
          <AppButton label="Tonal" variant="tonal" onPress={() => {}} />
          <AppButton label="Outlined" variant="outlined" onPress={() => {}} />
          <AppButton label="Text" variant="text" onPress={() => {}} />
        </View>

        <View style={styles.sectionGap} />
        <SectionTitle title="Icons & States" />
        <View style={styles.wrapRow}>
          <AppButton label="Left Icon" leftIcon="plus" onPress={() => {}} />
          <AppButton
            label="Right Icon"
            variant="outlined"
            rightIcon="arrow-right"
            onPress={() => {}}
          />
          <AppButton label="Disabled" isDisabled onPress={() => {}} />
          <AppButton
            label="Tap to Load"
            variant="tonal"
            isLoading={isLoading}
            onPress={simulateLoading}
          />
        </View>
        <View style={styles.itemGap12} />
        <AppButton
          label="Full Width Button"
          leftIcon="check-circle-outline"
          fullWidth
          onPress={() => {}}
        />

        <View style={styles.sectionGap} />
        <SectionTitle title="AppSearchHeader" />
        <View
          style={[
            styles.searchContainer,
            { borderColor: colors.outlineVariant },
          ]}
        >
          <AppSearchHeader
            value={searchQuery}
            hintText="Try searching..."
            onChanged={setSearchQuery}
          />
        </View>
        {searchQuery.length > 0 ? (
          <Text
            style={[
              typography.bodySmall,
              styles.helperText,
              { color: colors.onSurfaceVariant },
            ]}
          >
            {`Query: "${searchQuery}"`}
          </Text>
        ) : null}

        <View style={styles.sectionGap} />
        <SectionTitle title="AppListCard" />
        <AppListCard
          icon="palette-outline"
          title="Theme & Appearance"
          subtitle="Default card with icon and chevron"
          onPress={() => showSnackbar("AppListCard tapped")}
        />
        <AppListCard
          icon="bell-ring-outline"
          title="Push Notifications"
          subtitle="Custom trailing widget"
          showChevron={false}
          trailing={
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{
                false: colors.surfaceContainerHighest,
                true: colors.primaryContainer,
              }}
              thumbColor={
                notificationsEnabled ? colors.primary : colors.outline
              }
            />
          }
          onPress={() => setNotificationsEnabled((prev) => !prev)}
        />

        <View style={styles.sectionGap} />
        <SectionTitle title="AppBannerCard" />
        <AppBannerCard
          icon="creation-outline"
          title="Featured Banner"
          description="Supports custom icon, colors, tap handler and an optional footer action."
          backgroundColor={colors.secondaryContainer}
          foregroundColor={colors.onSecondaryContainer}
          footer={
            <AppButton
              label="Learn more"
              variant="outlined"
              rightIcon="arrow-right"
              onPress={() => showSnackbar("AppBannerCard action")}
            />
          }
        />

        <View style={styles.sectionGap} />
        <SectionTitle title="AppEmptyState" />
        <AppEmptyState
          icon="inbox-outline"
          title="No items yet"
          description="Use AppEmptyState for empty lists, search results, or offline views."
          actionLabel="Create item"
          actionIcon="plus"
          onActionPress={() => showSnackbar("AppEmptyState action")}
        />

        <View style={styles.sectionGap} />
        <SectionTitle title="AppTextField" />
        <AppTextField
          value={username}
          onChangeText={setUsername}
          label="Username"
          hintText="Enter your handle"
          prefixIcon="at"
          autoCapitalize="none"
        />
        <View style={styles.itemGap12} />
        <AppTextField
          value={password}
          onChangeText={setPassword}
          label="Password"
          prefixIcon="lock-outline"
          obscureText
          enableVisibilityToggle
        />

        <View style={styles.sectionGap} />
        <SectionTitle title="AppBottomSheet" />
        <AppButton
          label="Open bottom sheet"
          leftIcon="tray-arrow-up"
          variant="outlined"
          fullWidth
          onPress={() => setSheetVisible(true)}
        />

        <View style={styles.sectionGap} />
        <SectionTitle title="AppAvatar" />
        <View style={styles.avatarRow}>
          <AppAvatar name="Carlos Araujo" radius={24} showOnlineBadge />
          <AppAvatar name="Ada Lovelace" radius={24} />
          <AppAvatar radius={20} showOnlineBadge />
        </View>

        <View style={styles.sectionGap} />
        <SectionTitle title="AppSegmentedSwitcher" />
        <AppSegmentedSwitcher
          options={VIEW_OPTIONS}
          selected={selectedView}
          onChanged={setSelectedView}
        />
        <Text
          style={[
            typography.bodySmall,
            styles.helperText,
            { color: colors.onSurfaceVariant },
          ]}
        >
          {`Selected view: ${selectedView}`}
        </Text>

        <View style={styles.itemGap16} />
        <AppSegmentedSwitcher
          options={LAYOUT_OPTIONS}
          selected={selectedLayout}
          onChanged={setSelectedLayout}
        />
        <Text
          style={[
            typography.bodySmall,
            styles.helperText,
            { color: colors.onSurfaceVariant },
          ]}
        >
          {`Selected layout: ${selectedLayout}`}
        </Text>
      </ScrollView>

      <AppBottomSheet
        visible={sheetVisible}
        onClose={() => setSheetVisible(false)}
        title="Quick Actions"
      >
        <AppListCard
          icon="share-variant-outline"
          title="Share link"
          subtitle="Copy route URL to clipboard"
          onPress={() => setSheetVisible(false)}
        />
        <AppListCard
          icon="bookmark-outline"
          title="Save preset"
          subtitle="Store current configuration"
          onPress={() => setSheetVisible(false)}
        />
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
    paddingBottom: 28,
  },
  sectionTitle: {
    marginBottom: 12,
  },
  sectionGap: {
    height: 24,
  },
  itemGap12: {
    height: 12,
  },
  itemGap16: {
    height: 16,
  },
  wrapRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  searchContainer: {
    borderWidth: 1,
    borderRadius: 12,
    overflow: "hidden",
  },
  helperText: {
    marginTop: 8,
  },
  avatarRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
});
