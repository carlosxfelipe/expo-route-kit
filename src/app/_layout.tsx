import { Stack, ThemeProvider } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { AppState, type AppStateStatus } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { AuthProvider, REQUIRE_AUTH, useAuthSession } from "@/auth";
import { SnackbarProvider } from "@/components/core";
import { AppThemeProvider, toNavigationTheme, useAppTheme } from "@/theme";

SplashScreen.preventAutoHideAsync();

function onAppResumed() {
  // Hook to refresh session or sync data when returning to foreground.
}

function onAppPaused() {
  // Hook to pause timers or persist transient state in background.
}

function RootNavigator() {
  const theme = useAppTheme();
  const { isAuthenticated } = useAuthSession();

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      (nextState: AppStateStatus) => {
        if (nextState === "active") {
          onAppResumed();
        } else if (nextState === "background") {
          onAppPaused();
        }
      },
    );

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <ThemeProvider value={toNavigationTheme(theme)}>
      <StatusBar style={theme.isDark ? "light" : "dark"} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Protected guard={!REQUIRE_AUTH || isAuthenticated}>
          <Stack.Screen name="(tabs)" />
        </Stack.Protected>
        <Stack.Protected guard={REQUIRE_AUTH && !isAuthenticated}>
          <Stack.Screen name="login" />
        </Stack.Protected>
      </Stack>
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <AppThemeProvider>
          <SnackbarProvider>
            <RootNavigator />
          </SnackbarProvider>
        </AppThemeProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
