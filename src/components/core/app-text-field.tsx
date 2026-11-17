import React, { useEffect, useState } from "react";
import {
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
  style?: StyleProp<ViewStyle>;
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
  style,
}: AppTextFieldProps) {
  const { colors, typography } = useAppTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [isObscured, setIsObscured] = useState(obscureText);

  useEffect(() => {
    setIsObscured(obscureText);
  }, [obscureText]);

  const isMultiline = multiline && !isObscured;
  const hasError = Boolean(errorText);
  const borderColor = hasError
    ? colors.error
    : isFocused
      ? colors.primary
      : colors.outlineVariant;
  const borderWidth = isFocused || hasError ? 1.5 : 1;

  const effectiveSuffix =
    suffixIcon ??
    (enableVisibilityToggle ? (
      <Pressable
        onPress={() => setIsObscured((prev) => !prev)}
        hitSlop={8}
        accessibilityRole="button"
        accessibilityLabel={isObscured ? "Show password" : "Hide password"}
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
    <View style={[styles.wrapper, style]}>
      <Text
        style={[
          typography.labelMedium,
          styles.label,
          {
            color: hasError
              ? colors.error
              : isFocused
                ? colors.primary
                : colors.onSurfaceVariant,
          },
        ]}
      >
        {label}
      </Text>
      <View
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
          value={value}
          onChangeText={onChangeText}
          placeholder={hintText ?? label}
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
  label: {
    marginBottom: 6,
    marginLeft: 2,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 52,
    paddingHorizontal: 14,
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
