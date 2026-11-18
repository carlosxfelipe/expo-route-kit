import { MaterialDesignIcons } from "@react-native-vector-icons/material-design-icons";
import { NativeTabs } from "expo-router/native-tabs";

import { testIds } from "@/constants/test-ids";
import { type AppColorScheme, useAppTheme } from "@/theme";

export interface IosNativeTabsProps {
  colors?: AppColorScheme;
}

export function IosNativeTabs({ colors }: IosNativeTabsProps) {
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
      <NativeTabs.Trigger
        name="index"
        testID={testIds.tabs.home}
        accessibilityLabel="Home"
      >
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={{
            default: (
              <NativeTabs.Trigger.VectorIcon
                family={MaterialDesignIcons}
                name="home-outline"
              />
            ),
            selected: (
              <NativeTabs.Trigger.VectorIcon
                family={MaterialDesignIcons}
                name="home"
              />
            ),
          }}
          renderingMode="template"
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger
        name="explore"
        testID={testIds.tabs.explore}
        accessibilityLabel="Explore"
      >
        <NativeTabs.Trigger.Label>Explore</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={{
            default: (
              <NativeTabs.Trigger.VectorIcon
                family={MaterialDesignIcons}
                name="compass-outline"
              />
            ),
            selected: (
              <NativeTabs.Trigger.VectorIcon
                family={MaterialDesignIcons}
                name="compass"
              />
            ),
          }}
          renderingMode="template"
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger
        name="profile"
        testID={testIds.tabs.profile}
        accessibilityLabel="Profile"
      >
        <NativeTabs.Trigger.Label>Profile</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={{
            default: (
              <NativeTabs.Trigger.VectorIcon
                family={MaterialDesignIcons}
                name="account-outline"
              />
            ),
            selected: (
              <NativeTabs.Trigger.VectorIcon
                family={MaterialDesignIcons}
                name="account"
              />
            ),
          }}
          renderingMode="template"
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
