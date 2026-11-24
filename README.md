# Expo Route Kit

> **⚠️ THIS PROJECT IS CURRENTLY UNDER DEVELOPMENT.**

Web preview: [https://expo-route-kit.netlify.app/](https://expo-route-kit.netlify.app/)

Note: The web version would require dedicated adjustments to be treated as a standalone web product. The main focus of this template is mobile (Android and iOS), so the web build is intended only as a quick workaround and live preview of the project.

This project is a starter kit template configured for cross-platform development (iOS, Android, and Web) using Expo.

## How to use this template in a new project

1. **Create a new Expo project:**

   ```bash
   npx create-expo-app@latest my-app
   ```

2. **Install the icon library:**
   Since the icon component in this template uses the modular `@react-native-vector-icons` library, install the dependency in your new project:

   ```bash
   npx expo install @react-native-vector-icons/material-design-icons
   ```

3. **Set up the folder structure:**
   - Delete the default `src` folder generated in your new project.
   - Copy the `src` folder from this template (`expo-route-kit`) and paste it into the root of your new project.

   **Tip:** To do this automatically via terminal without downloading manually, run the following command in the root of your new project:

   ```bash
   rm -rf src && npx --yes degit carlosxfelipe/expo-route-kit/src src --force
   ```

## How to run the project

To start the project, run:

```bash
npm run android
npm run ios
npm run web
```

## Tab Bar Customization (Native Tabs vs JS Tabs)

This template includes native tab bars on mobile by default (`IosNativeTabs` with liquid glass on iOS and `AndroidNativeTabs` with Material 3 on Android), while Web uses the traditional Expo Router `Tabs` (`expo-router/js-tabs`) fallback.
If you prefer not to use native tabs on iOS or Android and want the JS `Tabs` fallback instead, open `src/app/(tabs)/_layout.tsx` and remove the corresponding platform block:

```tsx
if (Platform.OS === "ios") {
  return <IosNativeTabs colors={colors} tabs={TABS} />;
}

if (Platform.OS === "android") {
  return <AndroidNativeTabs colors={colors} tabs={TABS} />;
}
```

Tab definitions (`TABS` in `src/app/(tabs)/_layout.tsx`) are shared across `IosNativeTabs`, `AndroidNativeTabs`, and `Tabs`.

## Foldable Support (iPhone Duo)

Initial support for **iPhone Duo** has been added by applying horizontal safe area insets (`insets.left` and `insets.right`) across headers and scrollable screens so content and header actions stay clear of side cutouts.

For the best experience on **iPhone Duo**, keep **`IosNativeTabs`** enabled on iOS (the default behavior in `src/app/(tabs)/_layout.tsx`), as the native tab bar automatically adapts to the device's layout.

## Android 3-Button Navigation Support

By default, this template does not bundle `expo-navigation-bar` because not every project targets Android's classic 3-button navigation bar. If you want the 3-button navigation bar icons and background to adapt cleanly to the app's Light/Dark theme, follow these steps:

1. **Install `expo-navigation-bar`:**

   ```bash
   npx expo install expo-navigation-bar
   ```

2. **Add the config plugin in `app.json`:**
   Add `"expo-navigation-bar"` with `"enforceContrast": false` to the `expo.plugins` array so Android does not force a default contrast scrim over the navigation bar:

   ```json
   [
     "expo-navigation-bar",
     {
       "enforceContrast": false
     }
   ]
   ```

3. **Render `NavigationBar` in `src/app/_layout.tsx`:**
   Import `NavigationBar` from `expo-navigation-bar` and render it inside `RootNavigator` alongside `StatusBar` so its button style follows the active theme:

   ```tsx
   import { NavigationBar } from "expo-navigation-bar";
   ```

   ```tsx
   <StatusBar style={theme.isDark ? "light" : "dark"} />
   <NavigationBar style={theme.isDark ? "light" : "dark"} />
   ```

4. **Rebuild the native Android app:**
   Since the `app.json` plugin updates native Android configuration, trigger a new native Android build for the `enforceContrast` setting to take effect.

## Authentication Flow

Route protection is handled with `Stack.Protected` in `src/app/_layout.tsx` and controlled by the `REQUIRE_AUTH` flag in `src/auth/auth-session.tsx`:

```ts
// Set to false to disable the login flow and start directly on the main tabs.
export const REQUIRE_AUTH = true;
```

- `REQUIRE_AUTH = true` (default) — starts on `/login` (`src/app/login.tsx`) and redirects to the main tabs after signing in.
- `REQUIRE_AUTH = false` — skips the login screen and opens directly on the main tabs (`Home`, `Explore`, `Profile`).

## Themes (Light / Dark & Color Presets)

The template supports **Light**, **Dark**, and **System** appearance modes (`ThemeMode`) along with two Material 3 theme presets:

- **`custom_blue`** (`src/theme/custom-blue-theme.ts`) — default preset with neutral pure white/black surfaces.
- **`deep_purple`** (`src/theme/deep-purple-theme.ts`) — standard Material 3 deep purple palette.

**Where to switch:**

- **Default preset in code:** update `DEFAULT_THEME_PRESET` in `src/theme/theme-mode.tsx` (`"custom_blue"` or `"deep_purple"`).
- **At runtime (UI):** tap **Appearance** on the **Profile** screen to toggle both appearance mode (`ThemeSwitcher`) and color palette (`ThemePresetSwitcher`), or call `setThemeMode` / `setThemePreset` from `useThemeMode()`.

## Core Components & Screens

- **Screens (`src/app/`):** `login.tsx`, `(tabs)/index.tsx` (Home), `(tabs)/explore.tsx` (interactive component showcase), and `(tabs)/profile.tsx` (Profile).
- **Core UI (`src/components/core/`):** `AppButton`, `AppTextField`, `AppHeader`, `AppSearchHeader`, `AppListCard`, `AppBannerCard`, `AppEmptyState`, `AppBottomSheet`, `AppAvatar`, `AppSegmentedSwitcher`, `ThemeSwitcher`, `ThemePresetSwitcher`, `SnackbarProvider` / `useSnackbar`, `PlaceholderScreen`, and `AppIcon`.

## E2E Testing with Maestro

All screens, tabs (`IosNativeTabs` on iOS, `AndroidNativeTabs` on Android, and `Tabs` on Web), inputs, buttons, switches, and bottom sheets are wired for **Maestro** automated testing:

- **Centralized registry:** `testIds` in `src/constants/test-ids.ts` (e.g., `testIds.login.emailInput`, `testIds.tabs.explore`, `testIds.profile.signOutConfirmButton`).
- **Cross-platform helpers:** `testProps`, `leafTestProps`, and `viewTestProps` in `src/constants/test-ids.ts` handle `collapsable={false}` (preventing Android view flattening) and iOS accessibility separation (so nested controls like `Switch` inside `AppListCard` remain independently targetable).
- **Running the Android smoke flow with [Pyestro](https://github.com/carlosxfelipe/pyestro):** Pyestro is a Maestro-compatible YAML flow runner for Android via ADB.

  1. Install it globally (requires [`uv`](https://docs.astral.sh/uv/)):

     ```bash
     uv tool install git+https://github.com/carlosxfelipe/pyestro.git
     ```

  2. With the app installed on an Android device or emulator, run the sample smoke flow in `.maestro/smoke.yaml`:

     ```bash
     pyestro test .maestro/smoke.yaml
     ```

## Web Support

Since targeting the web is not the primary focus of most React Native projects, this template prioritizes mobile (iOS and Android). Even so, a few targeted adjustments are included to keep the React Native Web experience smooth:

- **Autofill handling (`src/components/core/web-autofill.ts` & `AppTextField`):** prevents browser autofill from overriding theme colors or overlapping floating labels.
- **Hover & cursor states (`AppButton`):** adds subtle hover feedback and appropriate pointer/disabled cursors on desktop browsers.
- **JS Tabs fallback (`src/app/(tabs)/_layout.tsx`):** renders the standard Expo Router `Tabs` layout on Web alongside Android.

## Recommended scripts

Add the following scripts to the `package.json` of your new project:

```json
"scripts": {
  "start": "expo start",
  "reset-project": "node ./scripts/reset-project.js",
  "android": "expo start --android",
  "android:native": "expo run:android",
  "ios": "expo start --ios",
  "ios:native": "expo run:ios",
  "web": "expo start --web",
  "lint": "expo lint",
  "build:android": "npx expo prebuild --platform android && cd android && ./gradlew assembleRelease && cd .. && mkdir -p apk && cp android/app/build/outputs/apk/release/app-release.apk \"apk/$npm_package_name-v$npm_package_version.apk\""
}
```

- **`android` / `ios`** — starts the Expo server targeting the platform without recompiling (ideal for Expo Go).
- **`android:native` / `ios:native`** — builds and runs the app natively (`expo run`).
- **`build:android`** — builds the release APK and copies it to the `apk/` folder with the name and version from `package.json`.

## License

This project is licensed under the [MIT License](LICENSE).

Copyright (c) 2026 **Carlos Felipe Araújo**.
