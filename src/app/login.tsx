import { useNavigation, usePreventRemove } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuthSession } from "@/auth";
import {
  AppButton,
  AppIcon,
  AppTextField,
  useSnackbar,
} from "@/components/core";
import { testIds, testProps, viewTestProps } from "@/constants/test-ids";
import { useAppTheme } from "@/theme";

function LoginHeader() {
  const { colors, typography } = useAppTheme();

  return (
    <View style={styles.header}>
      <View
        style={[styles.logoBox, { backgroundColor: colors.primaryContainer }]}
      >
        <AppIcon name="routes" size={26} color={colors.onPrimaryContainer} />
      </View>
      <Text
        {...testProps(testIds.login.title, "Welcome back")}
        style={[typography.headlineMedium, styles.welcomeTitle]}
      >
        Welcome back
      </Text>
      <Text
        {...testProps(
          testIds.login.subtitle,
          "Sign in to continue to Expo Route Kit.",
        )}
        style={[
          typography.bodyLarge,
          styles.welcomeSubtitle,
          { color: colors.onSurfaceVariant },
        ]}
      >
        Sign in to continue to Expo Route Kit.
      </Text>
    </View>
  );
}

export default function LoginScreen() {
  const { colors } = useAppTheme();
  const { signIn } = useAuthSession();
  const { showSnackbar } = useSnackbar();
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState<string | undefined>();
  const [passwordError, setPasswordError] = useState<string | undefined>();

  const hasUnsavedInput = email.length > 0 || password.length > 0;

  usePreventRemove(hasUnsavedInput, ({ data }) => {
    const discard = () => {
      setEmail("");
      setPassword("");
      setEmailError(undefined);
      setPasswordError(undefined);
      navigation.dispatch(data.action);
    };

    if (Platform.OS === "web") {
      if (
        typeof window !== "undefined" &&
        window.confirm(
          "Discard credentials?\nYou have unsaved input. Do you want to clear the form?",
        )
      ) {
        discard();
      }
      return;
    }

    Alert.alert(
      "Discard credentials?",
      "You have unsaved input. Do you want to clear the form?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Discard", style: "destructive", onPress: discard },
      ],
    );
  });

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (emailError && value.trim().length > 0) {
      setEmailError(undefined);
    }
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (passwordError && value.length > 0) {
      setPasswordError(undefined);
    }
  };

  const handleSubmit = () => {
    let valid = true;
    if (email.trim().length === 0) {
      setEmailError("Please enter your email");
      valid = false;
    } else {
      setEmailError(undefined);
    }

    if (password.length === 0) {
      setPasswordError("Please enter your password");
      valid = false;
    } else {
      setPasswordError(undefined);
    }

    if (!valid) return;
    signIn();
  };

  return (
    <SafeAreaView
      {...viewTestProps(testIds.login.screen)}
      style={[styles.safeArea, { backgroundColor: colors.surface }]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.flex}
      >
        <ScrollView
          {...viewTestProps(testIds.login.scroll)}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.formCard}>
            <LoginHeader />
            <View style={styles.spacer32} />
            <AppTextField
              value={email}
              onChangeText={handleEmailChange}
              label="Email"
              prefixIcon="email-outline"
              keyboardType="email-address"
              returnKeyType="next"
              autoComplete="email"
              autoCapitalize="none"
              errorText={emailError}
              testID={testIds.login.emailInput}
            />
            <View style={styles.spacer16} />
            <AppTextField
              value={password}
              onChangeText={handlePasswordChange}
              label="Password"
              prefixIcon="lock-outline"
              obscureText
              enableVisibilityToggle
              returnKeyType="done"
              autoComplete="password"
              errorText={passwordError}
              onSubmitEditing={handleSubmit}
              testID={testIds.login.passwordInput}
            />
            <View style={styles.spacer24} />
            <AppButton
              label="Sign in"
              rightIcon="arrow-right"
              fullWidth
              height={52}
              onPress={handleSubmit}
              testID={testIds.login.signInButton}
            />
            <View style={styles.spacer12} />
            <AppButton
              label="Create account"
              variant="text"
              fullWidth
              onPress={() => showSnackbar("Create account flow not configured")}
              testID={testIds.login.createAccountButton}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  formCard: {
    width: "100%",
    maxWidth: 400,
  },
  header: {
    alignItems: "flex-start",
  },
  logoBox: {
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  welcomeTitle: {
    marginTop: 24,
  },
  welcomeSubtitle: {
    marginTop: 6,
  },
  spacer12: {
    height: 12,
  },
  spacer16: {
    height: 16,
  },
  spacer24: {
    height: 24,
  },
  spacer32: {
    height: 32,
  },
});
