import { Platform } from "react-native";

const STYLE_ELEMENT_ID = "app-web-autofill-style";

const AUTOFILL_CSS = `
@keyframes app-autofill-start {
  from {}
  to {}
}
input[data-app-input="true"]:-webkit-autofill,
input[data-app-input="true"]:-webkit-autofill:hover,
input[data-app-input="true"]:-webkit-autofill:focus,
textarea[data-app-input="true"]:-webkit-autofill,
textarea[data-app-input="true"]:-webkit-autofill:hover,
textarea[data-app-input="true"]:-webkit-autofill:focus {
  animation-name: app-autofill-start;
  -webkit-box-shadow: 0 0 0 1000px var(--app-autofill-bg) inset !important;
  box-shadow: 0 0 0 1000px var(--app-autofill-bg) inset !important;
  -webkit-text-fill-color: var(--app-autofill-fg) !important;
  caret-color: var(--app-autofill-fg) !important;
  transition: background-color 999999s ease-in-out 0s;
}
`;

export function ensureWebAutofillStyle() {
  if (Platform.OS !== "web" || typeof document === "undefined") {
    return;
  }
  if (document.getElementById(STYLE_ELEMENT_ID)) {
    return;
  }
  const styleEl = document.createElement("style");
  styleEl.id = STYLE_ELEMENT_ID;
  styleEl.textContent = AUTOFILL_CSS;
  document.head.appendChild(styleEl);
}

export function getWebInputProps(
  backgroundColor: string,
  textColor: string,
  onAutofill?: () => void,
) {
  if (Platform.OS !== "web") {
    return {
      props: {} as Record<string, unknown>,
      style: undefined as Record<string, string> | undefined,
    };
  }

  return {
    props: {
      dataSet: { appInput: "true" },
      ...(onAutofill
        ? {
            onAnimationStart: (event: {
              animationName?: string;
              nativeEvent?: { animationName?: string };
            }) => {
              const name =
                event.animationName ?? event.nativeEvent?.animationName;
              if (name === "app-autofill-start") {
                onAutofill();
              }
            },
          }
        : {}),
    } as Record<string, unknown>,
    style: {
      "--app-autofill-bg": backgroundColor,
      "--app-autofill-fg": textColor,
    },
  };
}
