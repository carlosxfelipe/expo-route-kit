/**
 * Centralized registry of testIDs for Maestro E2E automated testing.
 *
 * Naming convention (values):
 * - tab_*      -> Navigation tabs / bottom bar buttons
 * - screen_*   -> Screen root views or major containers
 * - header_*   -> Top header bars
 * - scroll_*   -> Scrollable containers (ScrollView, FlatList)
 * - sheet_*    -> Bottom sheets / modal overlays
 * - card_*     -> Informational / banner cards
 * - btn_*      -> Buttons and clickable items
 * - switch_*   -> Toggle switches
 * - switcher_* -> Segmented switchers
 * - txt_*      -> Text labels, titles and headers
 * - input_*    -> Text inputs and form fields
 * - search_*   -> Search headers / inputs
 * - icon_*     -> Icons (non-clickable or status indicators)
 * - avatar_*   -> Avatar components
 * - empty_*    -> Empty state containers
 * - snackbar_* -> Snackbar notifications
 *
 * Derived sub-IDs emitted automatically by core components when `testID` is set:
 * - AppHeader:             `${testID}_title`
 * - AppSearchHeader:       `${testID}_wrapper`, `${testID}_clear`
 * - AppTextField:          `${testID}_wrapper`, `${testID}_container`,
 *                          `${testID}_toggle_visibility`, `${testID}_error`
 * - AppBottomSheet:        `${testID}_title`, `${testID}_close`, `${testID}_backdrop`
 * - AppEmptyState:         `${testID}_title`, `${testID}_description`
 * - AppSegmentedSwitcher:  `${testID}_${option.value.toLowerCase()}`
 */
export const testIds = {
  // Navigation & Tabs
  tabs: {
    home: "tab_home",
    explore: "tab_explore",
    profile: "tab_profile",
  },

  // Login Screen
  login: {
    screen: "screen_login",
    scroll: "scroll_login",
    title: "txt_login_title",
    subtitle: "txt_login_subtitle",
    emailInput: "input_login_email",
    passwordInput: "input_login_password",
    signInButton: "btn_login_sign_in",
    createAccountButton: "btn_login_create_account",
  },

  // Home Screen
  home: {
    screen: "screen_home",
    header: "header_home",
    notificationsButton: "btn_home_notifications",
    scroll: "scroll_home",
    welcomeBanner: "card_home_welcome",
    exploreCard: "btn_home_explore",
    profileCard: "btn_home_profile",
    logoutCard: "btn_home_logout",
    appearanceCard: "btn_home_appearance",
    appearanceSheet: "sheet_home_appearance",
    themeModeSwitcher: "switcher_theme_mode",
    themePresetSwitcher: "switcher_theme_preset",
    logoutSheet: "sheet_home_logout",
    logoutCancelButton: "btn_logout_cancel",
    logoutConfirmButton: "btn_logout_confirm",
  },

  // Explore Screen
  explore: {
    screen: "screen_explore",
    header: "header_explore",
    scroll: "scroll_explore",
    filledButton: "btn_explore_filled",
    tonalButton: "btn_explore_tonal",
    outlinedButton: "btn_explore_outlined",
    textButton: "btn_explore_text",
    leftIconButton: "btn_explore_left_icon",
    rightIconButton: "btn_explore_right_icon",
    disabledButton: "btn_explore_disabled",
    loadingButton: "btn_explore_loading",
    fullWidthButton: "btn_explore_full_width",
    searchHeader: "search_explore",
    searchQueryText: "txt_explore_search_query",
    themeCard: "btn_explore_list_card",
    notificationsCard: "btn_explore_notifications_card",
    notificationsSwitch: "switch_explore_notifications",
    featuredBanner: "card_explore_featured",
    bannerActionButton: "btn_explore_banner_action",
    emptyState: "empty_explore",
    emptyStateActionButton: "btn_explore_empty_action",
    usernameInput: "input_explore_username",
    passwordInput: "input_explore_password",
    openBottomSheetButton: "btn_explore_open_sheet",
    quickActionsSheet: "sheet_explore_quick_actions",
    sheetShareCard: "btn_explore_sheet_share",
    sheetBookmarkCard: "btn_explore_sheet_bookmark",
    carlosAvatar: "avatar_explore_carlos",
    adaAvatar: "avatar_explore_ada",
    anonymousAvatar: "avatar_explore_anonymous",
    viewSwitcher: "switcher_explore_view",
    selectedViewText: "txt_explore_selected_view",
    layoutSwitcher: "switcher_explore_layout",
    selectedLayoutText: "txt_explore_selected_layout",
  },

  // Profile Screen
  profile: {
    screen: "screen_profile",
    header: "header_profile",
    title: "txt_profile_title",
    description: "txt_profile_description",
  },

  // Global Snackbar
  snackbar: {
    container: "snackbar_container",
    text: "txt_snackbar_message",
  },
} as const;

/**
 * Helper for interactive/text elements (Pressable, TextInput, Text, Switch)
 * so Maestro can locate them on iOS (accessibilityIdentifier/label) and
 * Android (resource-id/content-desc) without view flattening.
 */
export function testProps(id?: string, accessibilityLabel?: string) {
  if (!id) {
    return accessibilityLabel ? { accessibilityLabel } : {};
  }
  return {
    testID: id,
    accessibilityLabel: accessibilityLabel ?? id,
    collapsable: false,
  };
}

/**
 * Helper for non-interactive leaf Views (e.g., AppAvatar) that have no
 * clickable children and should appear as a single accessible element on iOS.
 */
export function leafTestProps(id?: string, accessibilityLabel?: string) {
  if (!id) {
    return accessibilityLabel ? { accessibilityLabel, accessible: true } : {};
  }
  return {
    testID: id,
    accessibilityLabel: accessibilityLabel ?? id,
    accessible: true,
    collapsable: false,
  };
}

/**
 * Helper for container Views (screens, cards, sheets) to prevent Android view
 * flattening without marking the container as a single accessible leaf (which
 * would hide child testIDs on iOS XCUITest/Maestro).
 */
export function viewTestProps(id?: string) {
  if (!id) {
    return {};
  }
  return {
    testID: id,
    collapsable: false,
  };
}
