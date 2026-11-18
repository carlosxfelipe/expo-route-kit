import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { testProps, viewTestProps } from "@/constants/test-ids";
import { useAppTheme } from "@/theme";

import { AppHeader } from "./app-header";

export interface PlaceholderScreenProps {
  title: string;
  description: string;
  testID?: string;
  headerTestID?: string;
  titleTestID?: string;
  descriptionTestID?: string;
}

export function PlaceholderScreen({
  title,
  description,
  testID,
  headerTestID,
  titleTestID,
  descriptionTestID,
}: PlaceholderScreenProps) {
  const { colors, typography } = useAppTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      {...viewTestProps(testID)}
      style={[styles.container, { backgroundColor: colors.surface }]}
    >
      <AppHeader title={title} testID={headerTestID} />
      <View style={[styles.body, { paddingBottom: 24 + insets.bottom }]}>
        <Text
          {...testProps(titleTestID, title)}
          style={[
            typography.headlineSmall,
            styles.title,
            { color: colors.onSurface },
          ]}
        >
          {title}
        </Text>
        <Text
          {...testProps(descriptionTestID, description)}
          style={[
            typography.bodyMedium,
            styles.description,
            { color: colors.onSurfaceVariant },
          ]}
        >
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
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  title: {
    textAlign: "center",
  },
  description: {
    marginTop: 8,
    textAlign: "center",
  },
});
