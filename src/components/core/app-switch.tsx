import { useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  Platform,
  Pressable,
  StyleSheet,
  Switch,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import { testProps } from "@/constants/test-ids";
import { useAppTheme } from "@/theme";

export interface AppSwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  accessibilityLabel?: string;
}

export function AppSwitch({
  value,
  onValueChange,
  disabled = false,
  style,
  testID,
  accessibilityLabel,
}: AppSwitchProps) {
  const { colors } = useAppTheme();
  const progress = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: value ? 1 : 0,
      duration: 160,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [progress, value]);

  if (Platform.OS === "ios") {
    return (
      <Switch
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        trackColor={{
          false: colors.surfaceContainerHighest,
          true: colors.primary,
        }}
        style={style}
        {...testProps(testID, accessibilityLabel)}
      />
    );
  }

  const trackBackgroundColor = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.surfaceContainerHighest, colors.primary],
  });

  const trackBorderColor = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.outline, colors.primary],
  });

  const thumbBackgroundColor = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.outline, colors.onPrimary],
  });

  const thumbTranslateX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 22],
  });

  const thumbScale = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [16 / 24, 1],
  });

  return (
    <Pressable
      onPress={() => onValueChange(!value)}
      disabled={disabled}
      hitSlop={6}
      accessibilityRole="switch"
      accessibilityState={{ checked: value, disabled }}
      {...testProps(testID, accessibilityLabel)}
      style={[disabled && styles.disabled, style]}
    >
      <Animated.View
        style={[
          styles.track,
          {
            backgroundColor: trackBackgroundColor,
            borderColor: trackBorderColor,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.thumb,
            {
              backgroundColor: thumbBackgroundColor,
              transform: [
                { translateX: thumbTranslateX },
                { scale: thumbScale },
              ],
            },
          ]}
        />
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  track: {
    width: 52,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    justifyContent: "center",
    paddingHorizontal: 0,
  },
  thumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  disabled: {
    opacity: 0.45,
  },
});
