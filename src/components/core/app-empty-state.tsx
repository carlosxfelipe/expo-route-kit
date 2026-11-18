import {
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import { testProps, viewTestProps } from "@/constants/test-ids";
import { useAppTheme } from "@/theme";

import { AppButton } from "./app-button";
import { AppIcon, type AppIconName } from "./app-icon";

export interface AppEmptyStateProps {
  icon: AppIconName;
  title: string;
  description?: string;
  actionLabel?: string;
  actionIcon?: AppIconName;
  onActionPress?: () => void;
  iconColor?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  actionTestID?: string;
}

export function AppEmptyState({
  icon,
  title,
  description,
  actionLabel,
  actionIcon,
  onActionPress,
  iconColor,
  style,
  testID,
  actionTestID,
}: AppEmptyStateProps) {
  const { colors, typography } = useAppTheme();

  return (
    <View {...viewTestProps(testID)} style={[styles.container, style]}>
      <View
        style={[
          styles.iconCircle,
          { backgroundColor: colors.surfaceContainerHighest },
        ]}
      >
        <AppIcon name={icon} size={30} color={iconColor ?? colors.primary} />
      </View>
      <Text
        {...testProps(testID ? `${testID}_title` : undefined, title)}
        style={[
          typography.titleMedium,
          styles.title,
          { color: colors.onSurface },
        ]}
      >
        {title}
      </Text>
      {description ? (
        <Text
          {...testProps(
            testID ? `${testID}_description` : undefined,
            description,
          )}
          style={[
            typography.bodyMedium,
            styles.description,
            { color: colors.onSurfaceVariant },
          ]}
        >
          {description}
        </Text>
      ) : null}
      {actionLabel && onActionPress ? (
        <View style={styles.actionWrapper}>
          <AppButton
            label={actionLabel}
            leftIcon={actionIcon}
            variant="tonal"
            onPress={onActionPress}
            testID={actionTestID}
          />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    marginTop: 16,
    textAlign: "center",
  },
  description: {
    marginTop: 6,
    textAlign: "center",
  },
  actionWrapper: {
    marginTop: 20,
  },
});
