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

export interface SegmentedSwitcherOption<T extends string> {
  value: T;
  label: string;
  icon: AppIconName;
  testID?: string;
}

export interface AppSegmentedSwitcherProps<T extends string> {
  options: readonly SegmentedSwitcherOption<T>[];
  selected: T;
  onChanged: (value: T) => void;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

export function AppSegmentedSwitcher<T extends string>({
  options,
  selected,
  onChanged,
  style,
  testID,
}: AppSegmentedSwitcherProps<T>) {
  const { colors, typography } = useAppTheme();

  return (
    <View
      accessibilityRole="radiogroup"
      {...viewTestProps(testID)}
      style={[
        styles.container,
        {
          borderColor: colors.outline,
        },
        style,
      ]}
    >
      {options.map((option, index) => {
        const isSelected = option.value === selected;
        const textColor = isSelected
          ? colors.onSecondaryContainer
          : colors.onSurface;
        const showDivider = index > 0;
        const optionTestID =
          option.testID ??
          (testID ? `${testID}_${option.value.toLowerCase()}` : undefined);

        return (
          <Pressable
            key={option.value}
            onPress={() => onChanged(option.value)}
            accessibilityRole="radio"
            accessibilityState={{ selected: isSelected }}
            {...testProps(optionTestID, option.label)}
            style={({ pressed }) => [
              styles.segment,
              showDivider && {
                borderLeftWidth: 1,
                borderLeftColor: colors.outline,
              },
              {
                backgroundColor: isSelected
                  ? colors.secondaryContainer
                  : pressed
                    ? colors.surfaceContainerHigh
                    : "transparent",
              },
            ]}
          >
            <AppIcon name={option.icon} size={18} color={textColor} />
            <Text
              numberOfLines={1}
              style={[typography.labelLarge, { color: textColor }]}
            >
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 999,
    overflow: "hidden",
    minHeight: 42,
  },
  segment: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
});
