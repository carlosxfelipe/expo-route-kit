import type { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { testProps, viewTestProps } from "@/constants/test-ids";
import { useAppTheme } from "@/theme";

import type { AppIconName } from "./app-icon";
import { HeaderActions, type HeaderActionsProps } from "./header-actions";

export interface AppHeaderProps {
  title: string;
  leading?: ReactNode;
  rightIcon?: AppIconName;
  onRightIconPress?: () => void;
  rightIconTooltip?: string;
  rightIconBadgeCount?: number;
  rightIconBadgeMaxCount?: number;
  showRightIconBadge?: boolean;
  actions?: ReactNode;
  centerTitle?: boolean;
  backgroundColor?: string;
  testID?: string;
  rightIconTestID?: string;
}

function HeaderLeading({ leading }: { leading?: ReactNode }) {
  if (!leading) return null;
  return <View style={styles.leading}>{leading}</View>;
}

function HeaderTitle({
  title,
  centerTitle,
  testID,
}: {
  title: string;
  centerTitle: boolean;
  testID?: string;
}) {
  const { colors, typography } = useAppTheme();

  return (
    <View
      pointerEvents={centerTitle ? "none" : undefined}
      style={centerTitle ? styles.centeredTitleOverlay : styles.titleContainer}
    >
      <Text
        numberOfLines={1}
        {...testProps(testID ? `${testID}_title` : undefined, title)}
        style={[
          typography.titleLarge,
          centerTitle ? styles.centeredTitleText : undefined,
          { color: colors.onSurface },
        ]}
      >
        {title}
      </Text>
    </View>
  );
}

function HeaderRight(props: HeaderActionsProps) {
  return (
    <View style={styles.rightSlot}>
      <HeaderActions {...props} />
    </View>
  );
}

export function AppHeader({
  title,
  leading,
  rightIcon,
  onRightIconPress,
  rightIconTooltip,
  rightIconBadgeCount,
  rightIconBadgeMaxCount = 9,
  showRightIconBadge = false,
  actions,
  centerTitle = true,
  backgroundColor,
  testID,
  rightIconTestID,
}: AppHeaderProps) {
  const { colors } = useAppTheme();
  const insets = useSafeAreaInsets();
  const resolvedBg = backgroundColor ?? colors.surface;

  return (
    <View
      {...viewTestProps(testID)}
      style={[
        styles.container,
        { paddingTop: insets.top, backgroundColor: resolvedBg },
      ]}
    >
      <View style={styles.toolbar}>
        <HeaderLeading leading={leading} />
        <HeaderTitle title={title} centerTitle={centerTitle} testID={testID} />
        <HeaderRight
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
  container: {
    width: "100%",
  },
  toolbar: {
    position: "relative",
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  leading: {
    marginRight: 12,
    zIndex: 1,
  },
  titleContainer: {
    flex: 1,
    justifyContent: "center",
  },
  centeredTitleOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 64,
    right: 64,
    alignItems: "center",
    justifyContent: "center",
  },
  centeredTitleText: {
    textAlign: "center",
  },
  rightSlot: {
    marginLeft: "auto",
    zIndex: 1,
  },
});
