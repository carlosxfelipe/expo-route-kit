import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { testIds, testProps, viewTestProps } from "@/constants/test-ids";
import { useAppTheme } from "@/theme";

interface SnackbarContextValue {
  showSnackbar: (message: string, durationMs?: number) => void;
  hideSnackbar: () => void;
}

const SnackbarContext = createContext<SnackbarContextValue | null>(null);

export function SnackbarProvider({ children }: { children: ReactNode }) {
  const { colors, typography } = useAppTheme();
  const insets = useSafeAreaInsets();
  const [message, setMessage] = useState<string | null>(null);
  const opacity = useRef(new Animated.Value(0)).current;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const hideSnackbar = useCallback(() => {
    clearTimer();
    Animated.timing(opacity, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        setMessage(null);
      }
    });
  }, [clearTimer, opacity]);

  const showSnackbar = useCallback(
    (nextMessage: string, durationMs = 2600) => {
      clearTimer();
      setMessage(nextMessage);
      opacity.setValue(0);
      Animated.timing(opacity, {
        toValue: 1,
        duration: 180,
        useNativeDriver: true,
      }).start();

      timerRef.current = setTimeout(() => {
        hideSnackbar();
      }, durationMs);
    },
    [clearTimer, hideSnackbar, opacity],
  );

  useEffect(() => {
    return () => clearTimer();
  }, [clearTimer]);

  const value = useMemo<SnackbarContextValue>(
    () => ({ showSnackbar, hideSnackbar }),
    [showSnackbar, hideSnackbar],
  );

  return (
    <SnackbarContext.Provider value={value}>
      <View style={styles.root}>
        {children}
        {message !== null ? (
          <Animated.View
            pointerEvents="box-none"
            {...viewTestProps(testIds.snackbar.container)}
            style={[
              styles.container,
              {
                bottom: Math.max(insets.bottom, 16) + 72,
                opacity,
              },
            ]}
          >
            <Pressable
              onPress={hideSnackbar}
              style={[
                styles.snack,
                {
                  backgroundColor: colors.inverseSurface,
                  shadowColor: colors.shadow,
                },
              ]}
            >
              <Text
                {...testProps(testIds.snackbar.text, message)}
                style={[
                  typography.bodyMedium,
                  { color: colors.onInverseSurface },
                ]}
              >
                {message}
              </Text>
            </Pressable>
          </Animated.View>
        ) : null}
      </View>
    </SnackbarContext.Provider>
  );
}

export function useSnackbar(): SnackbarContextValue {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    position: "absolute",
    left: 16,
    right: 16,
    alignItems: "center",
    zIndex: 1000,
  },
  snack: {
    width: "100%",
    maxWidth: 520,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
});
