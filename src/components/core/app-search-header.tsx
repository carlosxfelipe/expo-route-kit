import { type ReactNode, useEffect, useState } from "react";
import {
  Pressable,
  StyleSheet,
  TextInput,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { testProps, viewTestProps } from "@/constants/test-ids";
import { useAppTheme } from "@/theme";

import { AppIcon, type AppIconName } from "./app-icon";
import { HeaderActions } from "./header-actions";
import { ensureWebAutofillStyle, getWebInputProps } from "./web-autofill";

export interface AppSearchHeaderProps {
  value?: string;
  hintText?: string;
  onChanged?: (value: string) => void;
  onSubmitted?: (value: string) => void;
  onClear?: () => void;
  autofocus?: boolean;
  leading?: ReactNode;
  rightIcon?: AppIconName;
  onRightIconPress?: () => void;
  rightIconTooltip?: string;
  rightIconBadgeCount?: number;
  rightIconBadgeMaxCount?: number;
  showRightIconBadge?: boolean;
  actions?: ReactNode;
  safeAreaTop?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  rightIconTestID?: string;
}

export function AppSearchHeader({
  value,
  hintText = "Search...",
  onChanged,
  onSubmitted,
  onClear,
  autofocus = false,
  leading,
  rightIcon,
  onRightIconPress,
  rightIconTooltip,
  rightIconBadgeCount,
  rightIconBadgeMaxCount = 9,
  showRightIconBadge = false,
  actions,
  safeAreaTop = false,
  style,
  testID,
  rightIconTestID,
}: AppSearchHeaderProps) {
  const { colors, typography } = useAppTheme();
  const insets = useSafeAreaInsets();
  const [internalValue, setInternalValue] = useState("");

  useEffect(() => {
    ensureWebAutofillStyle();
  }, []);

  const webInput = getWebInputProps(
    colors.surfaceContainerHigh,
    colors.onSurface,
  );

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const handleChangeText = (next: string) => {
    if (!isControlled) {
      setInternalValue(next);
    }
    onChanged?.(next);
  };

  const handleClear = () => {
    if (!isControlled) {
      setInternalValue("");
    }
    onChanged?.("");
    onClear?.();
  };

  return (
    <View
      {...viewTestProps(testID ? `${testID}_wrapper` : undefined)}
      style={[
        styles.wrapper,
        {
          paddingTop: safeAreaTop ? insets.top : 0,
          paddingLeft: safeAreaTop ? insets.left : 0,
          paddingRight: safeAreaTop ? insets.right : 0,
          backgroundColor: colors.surface,
        },
        style,
      ]}
    >
      <View style={styles.toolbar}>
        {leading ? <View style={styles.leading}>{leading}</View> : null}
        <View
          style={[
            styles.searchBar,
            { backgroundColor: colors.surfaceContainerHigh },
          ]}
        >
          <AppIcon name="magnify" size={20} color={colors.onSurfaceVariant} />
          <TextInput
            value={currentValue}
            onChangeText={handleChangeText}
            onSubmitEditing={() => onSubmitted?.(currentValue)}
            placeholder={hintText}
            placeholderTextColor={colors.onSurfaceVariant}
            autoFocus={autofocus}
            returnKeyType="search"
            selectionColor={colors.primary}
            {...webInput.props}
            {...testProps(testID, hintText)}
            style={[
              typography.bodyLarge,
              styles.input,
              { color: colors.onSurface },
              webInput.style as never,
            ]}
          />
          {currentValue.length > 0 ? (
            <Pressable
              onPress={handleClear}
              hitSlop={8}
              accessibilityRole="button"
              {...testProps(testID ? `${testID}_clear` : undefined, "Clear")}
              style={styles.clearButton}
            >
              <AppIcon name="close" size={18} color={colors.onSurfaceVariant} />
            </Pressable>
          ) : null}
        </View>
        <HeaderActions
          actions={actions}
          rightIcon={rightIcon}
          onRightIconPress={onRightIconPress}
          rightIconTooltip={rightIconTooltip}
          rightIconBadgeCount={rightIconBadgeCount}
          rightIconBadgeMaxCount={rightIconBadgeMaxCount}
          showRightIconBadge={showRightIconBadge}
          rightIconTestID={rightIconTestID}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
  },
  toolbar: {
    height: 64,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    gap: 8,
  },
  leading: {
    marginRight: 4,
  },
  searchBar: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    gap: 10,
  },
  input: {
    flex: 1,
    minWidth: 0,
    height: 48,
    lineHeight: undefined,
    paddingVertical: 0,
    textAlignVertical: "center",
    includeFontPadding: false,
    outlineStyle: "none" as never,
  },
  clearButton: {
    padding: 4,
  },
});
