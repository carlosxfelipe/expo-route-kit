import { type ReactNode, useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import {
  initialWindowMetrics,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { testProps, viewTestProps } from "@/constants/test-ids";
import { useAppTheme } from "@/theme";

import { AppIcon } from "./app-icon";

export interface AppBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  showDragHandle?: boolean;
  children: ReactNode;
  testID?: string;
}

export function AppBottomSheet({
  visible,
  onClose,
  title,
  showDragHandle = true,
  children,
  testID,
}: AppBottomSheetProps) {
  const { colors, typography } = useAppTheme();
  const insets = useSafeAreaInsets();
  // Modal renders above the tab bar, so use the window's bottom inset instead of
  // the screen's inset (which includes the floating iOS NativeTabs bar height).
  const bottomInset = initialWindowMetrics?.insets.bottom ?? insets.bottom;
  const { height: windowHeight } = useWindowDimensions();
  const offscreenY = Math.max(windowHeight, 500);

  const [rendered, setRendered] = useState(visible);
  const backdropOpacity = useRef(new Animated.Value(visible ? 1 : 0)).current;
  const sheetTranslateY = useRef(
    new Animated.Value(visible ? 0 : offscreenY),
  ).current;
  const isOpenRef = useRef(visible);
  const activeAnimationRef = useRef<Animated.CompositeAnimation | null>(null);

  useEffect(() => {
    if (visible && !rendered) {
      setRendered(true);
      return;
    }

    if (visible && rendered && !isOpenRef.current) {
      isOpenRef.current = true;
      activeAnimationRef.current?.stop();
      backdropOpacity.setValue(0);
      sheetTranslateY.setValue(offscreenY);

      const anim = Animated.parallel([
        Animated.timing(backdropOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(sheetTranslateY, {
          toValue: 0,
          duration: 240,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]);
      activeAnimationRef.current = anim;
      anim.start();
      return;
    }

    if (!visible && rendered && isOpenRef.current) {
      isOpenRef.current = false;
      activeAnimationRef.current?.stop();

      const anim = Animated.parallel([
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: 180,
          useNativeDriver: true,
        }),
        Animated.timing(sheetTranslateY, {
          toValue: offscreenY,
          duration: 200,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true,
        }),
      ]);
      activeAnimationRef.current = anim;
      anim.start(({ finished }) => {
        if (finished) {
          setRendered(false);
        }
      });
    }
  }, [visible, rendered, offscreenY, backdropOpacity, sheetTranslateY]);

  useEffect(() => {
    return () => {
      activeAnimationRef.current?.stop();
    };
  }, []);

  if (!rendered) {
    return null;
  }

  return (
    <Modal
      visible={rendered}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.overlay}
      >
        <Animated.View
          style={[
            styles.backdrop,
            {
              backgroundColor: "rgba(0, 0, 0, 0.45)",
              opacity: backdropOpacity,
            },
          ]}
        >
          <Pressable
            style={styles.backdropPressable}
            onPress={onClose}
            {...testProps(
              testID ? `${testID}_backdrop` : undefined,
              "Close sheet",
            )}
          />
        </Animated.View>

        <Animated.View
          {...viewTestProps(testID)}
          style={[
            styles.sheet,
            {
              backgroundColor: colors.surfaceContainerLow,
              paddingBottom: Math.max(bottomInset, 16) + 8,
              transform: [{ translateY: sheetTranslateY }],
            },
          ]}
        >
          {showDragHandle ? (
            <View style={styles.handleWrapper}>
              <View
                style={[
                  styles.dragHandle,
                  { backgroundColor: colors.outlineVariant },
                ]}
              />
            </View>
          ) : null}
          <ScrollView
            bounces={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.body}
          >
            {title ? (
              <View style={styles.headerRow}>
                <Text
                  {...testProps(testID ? `${testID}_title` : undefined, title)}
                  style={[
                    typography.titleLarge,
                    styles.title,
                    { color: colors.onSurface },
                  ]}
                >
                  {title}
                </Text>
                <Pressable
                  onPress={onClose}
                  hitSlop={8}
                  accessibilityRole="button"
                  {...testProps(
                    testID ? `${testID}_close` : undefined,
                    "Close",
                  )}
                  style={({ pressed }) => [
                    styles.closeButton,
                    pressed && {
                      backgroundColor: colors.surfaceContainerHighest,
                    },
                  ]}
                >
                  <AppIcon name="close" size={22} color={colors.onSurface} />
                </Pressable>
              </View>
            ) : null}
            {children}
          </ScrollView>
        </Animated.View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  backdrop: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  backdropPressable: {
    flex: 1,
  },
  sheet: {
    width: "100%",
    maxWidth: 560,
    alignSelf: "center",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: "85%",
    overflow: "hidden",
  },
  handleWrapper: {
    alignItems: "center",
    paddingTop: 12,
    paddingBottom: 6,
  },
  dragHandle: {
    width: 32,
    height: 4,
    borderRadius: 2,
  },
  body: {
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 16,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    flex: 1,
    fontWeight: "600",
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
});
