import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  AppBannerCard,
  AppHeader,
  type AppIconName,
  AppListCard,
  useSnackbar,
} from "@/components/core";
import { testIds, viewTestProps } from "@/constants/test-ids";
import { useAppTheme } from "@/theme";

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
  const { showSnackbar } = useSnackbar();
  const router = useRouter();
  const insets = useSafeAreaInsets();

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
        contentContainerStyle={[
          styles.content,
          { paddingBottom: 24 + insets.bottom },
        ]}
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
      </ScrollView>
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
});
