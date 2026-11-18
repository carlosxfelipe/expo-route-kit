import type { ReactNode } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import { testProps, viewTestProps } from "@/constants/test-ids";
import { useAppTheme } from "@/theme";

import { AppIcon, type AppIconName } from "./app-icon";

export interface AppBannerCardProps {
  title: string;
  description?: string;
  icon?: AppIconName;
  backgroundColor?: string;
  foregroundColor?: string;
  padding?: number;
  borderRadius?: number;
  onPress?: () => void;
  footer?: ReactNode;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  accessibilityLabel?: string;
}

export function AppBannerCard({
  title,
  description,
  icon,
  backgroundColor,
  foregroundColor,
  padding = 20,
  borderRadius = 12,
  onPress,
  footer,
  style,
  testID,
  accessibilityLabel,
}: AppBannerCardProps) {
  const { colors, typography } = useAppTheme();
  const resolvedBg = backgroundColor ?? colors.primaryContainer;
  const resolvedFg = foregroundColor ?? colors.onPrimaryContainer;

  const body = (
    <>
      {icon ? (
        <AppIcon name={icon} size={24} color={resolvedFg} style={styles.icon} />
      ) : null}
      <Text style={[typography.titleLarge, { color: resolvedFg }]}>
        {title}
      </Text>
      {description ? (
        <Text
          style={[
            typography.bodyMedium,
            styles.description,
            { color: resolvedFg },
          ]}
        >
          {description}
        </Text>
      ) : null}
    </>
  );

  // When both onPress and footer are provided, keep footer outside Pressable
  // so footer buttons remain independently accessible on iOS/Maestro.
  if (onPress && footer) {
    return (
      <View
        {...viewTestProps(testID ? `${testID}_container` : undefined)}
        style={[
          styles.card,
          { backgroundColor: resolvedBg, borderRadius, padding },
          style,
        ]}
      >
        <Pressable
          onPress={onPress}
          accessibilityRole="button"
          {...testProps(testID, accessibilityLabel ?? title)}
          style={({ pressed }) => (pressed ? styles.pressed : undefined)}
        >
          {body}
        </Pressable>
        <View style={styles.footer}>{footer}</View>
      </View>
    );
  }

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        {...testProps(testID, accessibilityLabel ?? title)}
        style={({ pressed }) => [
          styles.card,
          {
            backgroundColor: resolvedBg,
            borderRadius,
            padding,
            opacity: pressed ? 0.9 : 1,
          },
          style,
        ]}
      >
        {body}
      </Pressable>
    );
  }

  return (
    <View
      {...viewTestProps(testID)}
      style={[
        styles.card,
        { backgroundColor: resolvedBg, borderRadius, padding },
        style,
      ]}
    >
      {body}
      {footer ? <View style={styles.footer}>{footer}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: "hidden",
  },
  pressed: {
    opacity: 0.9,
  },
  icon: {
    marginBottom: 12,
  },
  description: {
    marginTop: 8,
  },
  footer: {
    marginTop: 16,
  },
});
