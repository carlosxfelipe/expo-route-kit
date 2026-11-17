import { Image, type ImageSource } from 'expo-image';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { useAppTheme } from '@/theme';

import { AppIcon } from './app-icon';

export interface AppAvatarProps {
  name?: string;
  image?: ImageSource | string | number;
  radius?: number;
  showOnlineBadge?: boolean;
  backgroundColor?: string;
  foregroundColor?: string;
  style?: StyleProp<ViewStyle>;
}

function extractInitials(rawName?: string): string {
  if (!rawName) return '';
  const parts = rawName
    .trim()
    .split(/\s+/)
    .filter((part) => part.length > 0);
  if (parts.length === 0) return '';
  if (parts.length === 1) {
    return parts[0].slice(0, 1).toUpperCase();
  }
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export function AppAvatar({
  name,
  image,
  radius = 24,
  showOnlineBadge = false,
  backgroundColor,
  foregroundColor,
  style,
}: AppAvatarProps) {
  const { colors } = useAppTheme();
  const initials = extractInitials(name);
  const bgColor = backgroundColor ?? colors.primaryContainer;
  const fgColor = foregroundColor ?? colors.onPrimaryContainer;
  const size = radius * 2;
  const badgeSize = radius * 0.52;

  return (
    <View style={[{ width: size, height: size }, style]}>
      <View
        style={[
          styles.circle,
          {
            width: size,
            height: size,
            borderRadius: radius,
            backgroundColor: bgColor,
          },
        ]}>
        {image ? (
          <Image
            source={image}
            style={{ width: size, height: size, borderRadius: radius }}
            contentFit="cover"
          />
        ) : initials.length > 0 ? (
          <Text
            style={{
              fontSize: radius * 0.72,
              fontWeight: '600',
              color: fgColor,
            }}>
            {initials}
          </Text>
        ) : (
          <AppIcon name="account-outline" size={radius} color={fgColor} />
        )}
      </View>
      {showOnlineBadge ? (
        <View
          style={[
            styles.badge,
            {
              width: badgeSize,
              height: badgeSize,
              borderRadius: badgeSize / 2,
              backgroundColor: colors.online,
              borderColor: colors.surface,
            },
          ]}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  badge: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    borderWidth: 2,
  },
});
