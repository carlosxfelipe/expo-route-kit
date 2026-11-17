import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  type KeyboardTypeOptions,
  type ReturnKeyTypeOptions,
  type StyleProp,
  type TextInputProps,
  type ViewStyle,
} from "react-native";

import { testProps, viewTestProps } from "@/constants/test-ids";
import { useAppTheme } from "@/theme";

import { AppIcon, type AppIconName } from "./app-icon";

export interface AppTextFieldProps {
  value?: string;
  onChangeText?: (text: string) => void;
  label: string;
  hintText?: string;
  prefixIcon?: AppIconName;
  suffixIcon?: React.ReactNode;
  obscureText?: boolean;
  enableVisibilityToggle?: boolean;
  keyboardType?: KeyboardTypeOptions;
  returnKeyType?: ReturnKeyTypeOptions;
  autoComplete?: TextInputProps["autoComplete"];
  autoCapitalize?: TextInputProps["autoCapitalize"];
  errorText?: string;
  onSubmitEditing?: () => void;
  enabled?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  borderRadius?: number;
  labelBackgroundColor?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  accessibilityLabel?: string;
}

export function AppTextField({
  value,
  onChangeText,
  label,
  hintText,
  prefixIcon,
  suffixIcon,
  obscureText = false,
  enableVisibilityToggle = false,
  keyboardType,
  returnKeyType,
  autoComplete,
  autoCapitalize,
  errorText,
  onSubmitEditing,
  enabled = true,
  multiline = false,
  numberOfLines = 1,
  borderRadius = 14,
  labelBackgroundColor,
  style,
  testID,
  accessibilityLabel,
}: AppTextFieldProps) {
  const { colors, typography } = useAppTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [isObscured, setIsObscured] = useState(obscureText);
  const [internalText, setInternalText] = useState(value ?? "");

  useEffect(() => {
    setIsObscured(obscureText);
  }, [obscureText]);

  useEffect(() => {
    if (value !== undefined) {
      setInternalText(value);
    }
  }, [value]);

  const currentValue = value ?? internalText;
  const isMultiline = multiline && !isObscured;
  const hasValue = currentValue.length > 0;
  const isFloated = isFocused || hasValue;
  const hasError = Boolean(errorText);

  const floatAnim = useRef(new Animated.Value(isFloated ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(floatAnim, {
      toValue: isFloated ? 1 : 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  }, [floatAnim, isFloated]);

  const borderColor = hasError
    ? colors.error
    : isFocused
      ? colors.primary
      : colors.outlineVariant;
  const borderWidth = isFocused || hasError ? 1.5 : 1;

  const restingLeft = prefixIcon ? 40 : 10;
  const floatedLeft = 10;

  const animatedLabelTop = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [16, -9],
  });
  const animatedLabelLeft = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [restingLeft, floatedLeft],
  });
  const animatedLabelFontSize = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [16, 12],
  });

  const labelColor = hasError
    ? colors.error
    : isFocused
      ? colors.primary
      : colors.onSurfaceVariant;

  const handleChangeText = (next: string) => {
    if (value === undefined) {
      setInternalText(next);
    }
    onChangeText?.(next);
  };

  const effectiveSuffix =
    suffixIcon ??
    (enableVisibilityToggle ? (
      <Pressable
        onPress={() => setIsObscured((prev) => !prev)}
        hitSlop={8}
        accessibilityRole="button"
        {...testProps(
          testID ? `${testID}_toggle_visibility` : undefined,
          isObscured ? "Show password" : "Hide password",
        )}
        style={styles.toggleButton}
      >
        <AppIcon
          name={isObscured ? "eye-outline" : "eye-off-outline"}
          size={20}
          color={colors.onSurfaceVariant}
        />
      </Pressable>
    ) : null);

  return (
    <View
      {...viewTestProps(testID ? `${testID}_wrapper` : undefined)}
      style={[styles.wrapper, style]}
    >
      <View
        {...viewTestProps(testID ? `${testID}_container` : undefined)}
        style={[
          styles.inputContainer,
          {
            borderRadius,
            borderColor,
            borderWidth,
            backgroundColor: colors.surfaceContainerLow,
            opacity: enabled ? 1 : 0.6,
          },
        ]}
      >
        <Animated.View
          pointerEvents="none"
          style={[
            styles.floatingLabelWrapper,
            {
              top: animatedLabelTop,
              left: animatedLabelLeft,
            },
          ]}
        >
          <Animated.View
            style={[
              styles.borderCutout,
              {
                opacity: floatAnim,
                backgroundColor: labelBackgroundColor ?? colors.surface,
              },
            ]}
          />
          <Animated.Text
            numberOfLines={1}
            style={[
              styles.floatingLabelText,
              {
                fontFamily: typography.bodyLarge.fontFamily,
                fontSize: animatedLabelFontSize,
                fontWeight: isFloated ? "500" : "400",
                color: labelColor,
              },
            ]}
          >
            {label}
          </Animated.Text>
        </Animated.View>

        {prefixIcon ? (
          <View style={styles.prefix}>
            <AppIcon
              name={prefixIcon}
              size={20}
              color={
                hasError
                  ? colors.error
                  : isFocused
                    ? colors.primary
                    : colors.onSurfaceVariant
              }
            />
          </View>
        ) : null}
        <TextInput
          value={currentValue}
          onChangeText={handleChangeText}
          placeholder={isFocused && hintText ? hintText : undefined}
          placeholderTextColor={colors.onSurfaceVariant}
          secureTextEntry={isObscured}
          editable={enabled}
          multiline={isMultiline}
          numberOfLines={isMultiline ? numberOfLines : 1}
          keyboardType={keyboardType}
          returnKeyType={returnKeyType}
          autoComplete={autoComplete}
          autoCapitalize={autoCapitalize ?? (obscureText ? "none" : undefined)}
          onSubmitEditing={onSubmitEditing}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          selectionColor={colors.primary}
          {...testProps(testID, accessibilityLabel ?? label)}
          style={[
            typography.bodyLarge,
            styles.input,
            { color: colors.onSurface },
            isMultiline ? styles.multilineInput : styles.singleLineInput,
          ]}
        />
        {effectiveSuffix ? (
          <View style={styles.suffix}>{effectiveSuffix}</View>
        ) : null}
      </View>
      {hasError ? (
        <Text
          {...testProps(testID ? `${testID}_error` : undefined, errorText)}
          style={[
            typography.bodySmall,
            styles.errorText,
            { color: colors.error },
          ]}
        >
          {errorText}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
  },
  inputContainer: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    minHeight: 52,
    paddingHorizontal: 14,
    overflow: "visible",
  },
  floatingLabelWrapper: {
    position: "absolute",
    paddingHorizontal: 4,
    zIndex: 2,
  },
  borderCutout: {
    position: "absolute",
    top: 7,
    left: 0,
    right: 0,
    height: 5,
  },
  floatingLabelText: {
    lineHeight: 18,
  },
  prefix: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    outlineStyle: "none" as never,
  },
  singleLineInput: {
    height: 50,
    lineHeight: undefined,
    paddingVertical: 0,
    textAlignVertical: "center",
    includeFontPadding: false,
  },
  multilineInput: {
    minHeight: 96,
    paddingVertical: 12,
    textAlignVertical: "top",
  },
  suffix: {
    marginLeft: 8,
  },
  toggleButton: {
    padding: 4,
  },
  errorText: {
    marginTop: 4,
    marginLeft: 4,
  },
});
