import { MaterialDesignIcons } from "@react-native-vector-icons/material-design-icons";
import { NativeTabs } from "expo-router/native-tabs";

import type { TabItem } from "@/app/(tabs)/_layout";
import { type AppColorScheme, useAppTheme } from "@/theme";

export interface IosNativeTabsProps {
  colors?: AppColorScheme;
  tabs: readonly TabItem[];
}

export function IosNativeTabs({ colors, tabs }: IosNativeTabsProps) {
  const theme = useAppTheme();
  const resolvedColors = colors ?? theme.colors;

  return (
    <NativeTabs
      backgroundColor={resolvedColors.surfaceContainerLow}
      iconColor={{
        default: resolvedColors.onSurfaceVariant,
        selected: resolvedColors.primary,
      }}
      labelStyle={{
        default: { color: resolvedColors.onSurfaceVariant },
        selected: { color: resolvedColors.primary },
      }}
    >
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
