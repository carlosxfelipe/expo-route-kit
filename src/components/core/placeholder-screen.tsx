import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useAppTheme } from '@/theme';

import { AppHeader } from './app-header';

export interface PlaceholderScreenProps {
  title: string;
  description: string;
}

export function PlaceholderScreen({
  title,
  description,
}: PlaceholderScreenProps) {
  const { colors, typography } = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <AppHeader title={title} />
      <View style={styles.body}>
        <Text
          style={[
            typography.headlineSmall,
            styles.title,
            { color: colors.onSurface },
          ]}>
          {title}
        </Text>
        <Text
          style={[
            typography.bodyMedium,
            styles.description,
            { color: colors.onSurfaceVariant },
          ]}>
          {description}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    textAlign: 'center',
  },
  description: {
    marginTop: 8,
    textAlign: 'center',
  },
});
