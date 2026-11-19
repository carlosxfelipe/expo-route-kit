import {
  ActivityIndicator,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import { testProps } from "@/constants/test-ids";
import { useAppTheme } from "@/theme";

import { AppIcon, type AppIconName } from "./app-icon";

export type AppButtonVariant = "filled" | "tonal" | "outlined" | "text";

function getWebCursor(blocked: boolean): ViewStyle["cursor"] {
  if (Platform.OS !== "web") return undefined;
  return blocked ? "not-allowed" : "pointer";
}

function getButtonOpacity({
  isDisabled,
  isPressed,
  isHovered,
  isTransparentVariant,
}: {
  isDisabled: boolean;
  isPressed: boolean;
  isHovered: boolean;
  isTransparentVariant: boolean;
}): number {
  if (isDisabled) return 0.5;
  if (isPressed) return 0.82;
  if (isHovered && !isTransparentVariant) return 0.9;
  return 1;
}

export interface AppButtonProps {
  label: string;
  onPress?: () => void;
  variant?: AppButtonVariant;
  leftIcon?: AppIconName;
  rightIcon?: AppIconName;
  isDisabled?: boolean;
  isLoading?: boolean;
  fullWidth?: boolean;
  height?: number;
  borderRadius?: number;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  accessibilityLabel?: string;
}

export function AppButton({
  label,
  onPress,
  variant = "filled",
  leftIcon,
  rightIcon,
  isDisabled = false,
  isLoading = false,
  fullWidth = false,
  height = 48,
  borderRadius = 14,
  style,
  testID,
  accessibilityLabel,
}: AppButtonProps) {
  const { colors, typography } = useAppTheme();
  const blocked = isDisabled || isLoading;
  const isTransparentVariant = variant === "outlined" || variant === "text";
  const webCursor = getWebCursor(blocked);

  const { backgroundColor, foregroundColor, borderColor } = (() => {
    if (isDisabled) {
      return {
        backgroundColor:
          variant === "filled" || variant === "tonal"
            ? colors.surfaceContainerHighest
            : "transparent",
        foregroundColor: colors.onSurfaceVariant,
        borderColor:
          variant === "outlined" ? colors.outlineVariant : "transparent",
      };
    }

    switch (variant) {
      case "filled":
        return {
          backgroundColor: colors.primary,
          foregroundColor: colors.onPrimary,
          borderColor: "transparent",
        };
      case "tonal":
        return {
          backgroundColor: colors.secondaryContainer,
          foregroundColor: colors.onSecondaryContainer,
          borderColor: "transparent",
        };
      case "outlined":
        return {
          backgroundColor: "transparent",
          foregroundColor: colors.primary,
          borderColor: colors.outlineVariant,
        };
      case "text":
        return {
          backgroundColor: "transparent",
          foregroundColor: colors.primary,
          borderColor: "transparent",
        };
    }
  })();

  return (
    <Pressable
      onPress={blocked ? undefined : onPress}
      disabled={blocked}
      accessibilityRole="button"
      accessibilityState={{ disabled: blocked, busy: isLoading }}
      {...testProps(testID, accessibilityLabel ?? label)}
      style={(state) => {
        const hovered = Boolean((state as { hovered?: boolean }).hovered);
        const isHovered = hovered && !blocked;
        const isPressed = state.pressed && !blocked;

        return [
          styles.base,
          {
            minHeight: height,
            borderRadius,
            backgroundColor:
              isHovered && isTransparentVariant
                ? colors.surfaceContainer
                : backgroundColor,
            borderColor,
            borderWidth: variant === "outlined" ? 1 : 0,
            alignSelf: fullWidth ? "stretch" : "flex-start",
            opacity: getButtonOpacity({
              isDisabled,
              isPressed,
              isHovered,
              isTransparentVariant,
            }),
            cursor: webCursor,
          },
          style,
        ];
      }}
    >
      <View style={styles.contentWrapper}>
        <View
          style={[
            styles.contentRow,
            isLoading ? styles.hiddenContent : undefined,
          ]}
        >
          {leftIcon ? (
            <AppIcon name={leftIcon} size={18} color={foregroundColor} />
          ) : null}
          <Text
            numberOfLines={1}
            style={[typography.labelLarge, { color: foregroundColor }]}
          >
            {label}
          </Text>
          {rightIcon ? (
            <AppIcon name={rightIcon} size={18} color={foregroundColor} />
          ) : null}
        </View>
        {isLoading ? (
          <View style={styles.loaderOverlay}>
            <ActivityIndicator size="small" color={foregroundColor} />
          </View>
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  contentWrapper: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  contentRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  hiddenContent: {
    opacity: 0,
  },
  loaderOverlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});
