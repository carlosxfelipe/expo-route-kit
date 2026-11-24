import { MaterialDesignIcons } from "@react-native-vector-icons/material-design-icons";
import { NativeTabs, type NativeTabsProps } from "expo-router/native-tabs";

import type { TabItem } from "@/app/(tabs)/_layout";
import { type AppColorScheme, useAppTheme } from "@/theme";

export interface NativeTabsLayoutProps {
  colors?: AppColorScheme;
  tabs: readonly TabItem[];
}

function NativeTabsShell({
  tabs,
  ...props
}: NativeTabsProps & { tabs: readonly TabItem[] }) {
  return (
    <NativeTabs {...props}>
      {tabs.map((tab) => (
        <NativeTabs.Trigger
          key={tab.name}
          name={tab.name}
          testID={tab.testID}
          accessibilityLabel={tab.accessibilityLabel ?? tab.title}
        >
          <NativeTabs.Trigger.Label>{tab.title}</NativeTabs.Trigger.Label>
          <NativeTabs.Trigger.Icon
            src={{
              default: (
                <NativeTabs.Trigger.VectorIcon
                  family={MaterialDesignIcons}
                  name={tab.inactiveIcon}
                />
              ),
              selected: (
                <NativeTabs.Trigger.VectorIcon
                  family={MaterialDesignIcons}
                  name={tab.activeIcon}
                />
              ),
            }}
            renderingMode="template"
          />
        </NativeTabs.Trigger>
      ))}
    </NativeTabs>
  );
}

export function IosNativeTabs({ colors, tabs }: NativeTabsLayoutProps) {
  const theme = useAppTheme();
  const resolvedColors = colors ?? theme.colors;

  return (
    <NativeTabsShell
      tabs={tabs}
      backgroundColor={resolvedColors.surfaceContainerLow}
      iconColor={{
        default: resolvedColors.onSurfaceVariant,
        selected: resolvedColors.primary,
      }}
      labelStyle={{
        default: { color: resolvedColors.onSurfaceVariant },
        selected: { color: resolvedColors.primary },
      }}
    />
  );
}

export function AndroidNativeTabs({ colors, tabs }: NativeTabsLayoutProps) {
  const theme = useAppTheme();
  const resolvedColors = colors ?? theme.colors;

  return (
    <NativeTabsShell
      tabs={tabs}
      backgroundColor={resolvedColors.surfaceContainerLow}
      indicatorColor={resolvedColors.secondaryContainer}
      rippleColor={resolvedColors.surfaceContainerHighest}
      labelVisibilityMode="labeled"
      iconColor={{
        default: resolvedColors.onSurfaceVariant,
        selected: resolvedColors.onSecondaryContainer,
      }}
      labelStyle={{
        default: { color: resolvedColors.onSurfaceVariant },
        selected: { color: resolvedColors.onSurface },
      }}
    />
  );
}
