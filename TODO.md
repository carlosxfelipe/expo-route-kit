# TODO — Expo Route Kit (React Native Template)

Template React Native (Expo Router) espelhado no `flutter_route_kit`, com tema Material 3 `deep_purple`, sistema de autenticação, 3 telas principais + login e todos os componentes core.

---

## 1. Tema & Sistema de Cores (`deep_purple`)
- [x] Criar `src/theme/deep-purple-theme.ts` com tokens Material 3 (`deep_purple`: `#6750A4` / `#D0BCFF`, containers, surfaces, outline, typography, spacing, borderRadius) para Light e Dark mode
- [x] Criar `src/theme/theme-mode.tsx` com `ThemeMode` (`light` | `dark` | `system`), `AppThemeProvider`, `useThemeMode()` e `useAppTheme()`
- [x] Criar barrel `src/theme/index.ts`

## 2. Autenticação & Roteamento (`expo-router`)
- [x] Criar `src/auth/auth-session.tsx` com `REQUIRE_AUTH`, `AuthProvider`, `useAuthSession()` (`isAuthenticated`, `signIn`, `signOut`)
- [x] Criar barrel `src/auth/index.ts`
- [x] Configurar `src/app/_layout.tsx` com `AuthProvider`, `AppThemeProvider`, `SnackbarProvider`, `Stack.Protected` para guarda `/login` <-> `(tabs)`, `StatusBar` reativa e listener de ciclo de vida (`AppState`)
- [x] Configurar `src/app/(tabs)/_layout.tsx` (`MainShellLayout`) com bottom navigation bar Material 3 (Home, Explore, Profile) usando `@react-native-vector-icons/material-design-icons`

## 3. Componentes Core (`src/components/core/`)
- [x] `AppIcon` (`app-icon.tsx`) — wrapper tipado para `@react-native-vector-icons/material-design-icons`
- [x] `AppButton` (`app-button.tsx`) — variantes `filled`, `tonal`, `outlined`, `text`, `leftIcon`, `rightIcon`, `isDisabled`, `isLoading`, `fullWidth`, `height`, `borderRadius`
- [x] `AppTextField` (`app-text-field.tsx`) — `label`, `hintText`, `prefixIcon`, `suffixIcon`, `obscureText`, `enableVisibilityToggle`, `errorText`, estados de foco/erro/desabilitado
- [x] `AppHeader` (`app-header.tsx`) — `title`, `leading`, `rightIcon`, `rightIconBadgeCount`, `rightIconBadgeMaxCount`, `showRightIconBadge`, `actions`, `centerTitle`, `backgroundColor`
- [x] `AppSearchHeader` (`app-search-header.tsx`) — barra de busca Material 3, botão limpar, suporte a ações/badge à direita
- [x] `AppListCard` (`app-list-card.tsx`) — card com borda `outlineVariant`, `icon`/`leading`, `title`, `subtitle`, `trailing`/`showChevron`, `onPress`
- [x] `AppBannerCard` (`app-banner-card.tsx`) — card destaque com `title`, `description`, `icon`, cores customizáveis, `onPress`, `footer`
- [x] `AppEmptyState` (`app-empty-state.tsx`) — ícone circular, `title`, `description`, ação opcional (`AppButton` tonal)
- [x] `AppBottomSheet` (`app-bottom-sheet.tsx`) — modal bottom sheet com drag handle, `title`, botão fechar e suporte a teclado (`KeyboardAvoidingView`)
- [x] `AppAvatar` (`app-avatar.tsx`) — iniciais a partir de `name`, imagem opcional, fallback de ícone, `radius`, `showOnlineBadge`
- [x] `AppSegmentedSwitcher` (`app-segmented-switcher.tsx`) — seletor segmentado genérico `<T>` com ícone + label
- [x] `ThemeSwitcher` (`theme-switcher.tsx`) — seletor Light / Dark / System conectado ao `useThemeMode()`
- [x] `AppSnackbar` (`app-snackbar.tsx`) — feedback estilo `SnackBar` (`SnackbarProvider` + `useSnackbar()`)
- [x] `PlaceholderScreen` (`placeholder-screen.tsx`) — tela placeholder reutilizável (usada em Profile)
- [x] Criar barrel `src/components/core/index.ts`

## 4. Telas (`src/app/`)
- [x] **LoginScreen** (`src/app/login.tsx`) — cabeçalho "Welcome back", validação de email e senha, toggle de visibilidade, confirmação ao descartar credenciais não salvas, botões Sign in / Create account
- [x] **HomeScreen** (`src/app/(tabs)/index.tsx`) — `AppHeader` com badge de notificações (`3`) + snackbar, `AppBannerCard` de boas-vindas, Quick Navigation (`Explore`, `Profile`, `Logout` com bottom sheet de confirmação) e Preferences (`Appearance` com bottom sheet + `ThemeSwitcher`)
- [x] **ExploreScreen** (`src/app/(tabs)/explore.tsx`) — showcase interativo de todos os componentes core (`AppButton`, `AppSearchHeader`, `AppListCard` + `Switch`, `AppBannerCard`, `AppEmptyState`, `AppTextField`, `AppBottomSheet`, `AppAvatar`, `AppSegmentedSwitcher`)
- [x] **ProfileScreen** (`src/app/(tabs)/profile.tsx`) — usa `PlaceholderScreen` ("Profile", "Account screen. Manage user details and preferences here.")

## 5. Limpeza & Verificação
- [x] Remover arquivos não utilizados do boilerplate inicial de `expo-route-kit`
- [x] Atualizar `TODO.md` marcando todas as etapas concluídas
- [x] Validar tipagem com `npx tsc --noEmit` sem erros
- [x] Validar bundle web com `npx expo export --platform web` sem erros
