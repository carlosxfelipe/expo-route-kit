import React from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useAppTheme } from "@/theme";

import { AppIcon } from "./app-icon";

export interface AppBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  showDragHandle?: boolean;
  children: React.ReactNode;
}

export function AppBottomSheet({
  visible,
  onClose,
  title,
  showDragHandle = true,
  children,
}: AppBottomSheetProps) {
  const { colors, typography } = useAppTheme();
  const insets = useSafeAreaInsets();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.overlay}
      >
        <Pressable
          style={[styles.backdrop, { backgroundColor: "rgba(0, 0, 0, 0.45)" }]}
          onPress={onClose}
          accessibilityLabel="Close sheet"
        />
        <View
          style={[
            styles.sheet,
            {
              backgroundColor: colors.surfaceContainerLow,
              paddingBottom: Math.max(insets.bottom, 16) + 8,
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
                  accessibilityLabel="Close"
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
        </View>
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
