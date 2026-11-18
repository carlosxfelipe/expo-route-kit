# Expo Route Kit

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

## Tab Bar Customization (iOS)

This template includes by default a native tab bar with a translucent (liquid glass) effect exclusive to iOS.
If you prefer not to use this native effect and want the traditional Expo Router fallback (the same one that runs on Android), open `src/app/(tabs)/_layout.tsx` and delete the following code block:

```tsx
if (Platform.OS === "ios") {
  return <IosNativeTabs colors={colors} />;
}
```

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
