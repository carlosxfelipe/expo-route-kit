import { type RefObject, useEffect } from "react";
import { Platform } from "react-native";

const STYLE_ELEMENT_ID = "app-web-autofill-style";

const AUTOFILL_CSS = `
@keyframes app-autofill-start {
  from {}
  to {}
}
@keyframes app-autofill-cancel {
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
  animation-duration: 1ms;
  -webkit-box-shadow: 0 0 0 1000px var(--app-autofill-bg) inset !important;
  box-shadow: 0 0 0 1000px var(--app-autofill-bg) inset !important;
  -webkit-text-fill-color: var(--app-autofill-fg) !important;
  caret-color: var(--app-autofill-fg) !important;
  transition: background-color 999999s ease-in-out 0s;
}
input[data-app-input="true"]:not(:-webkit-autofill),
textarea[data-app-input="true"]:not(:-webkit-autofill) {
  animation-name: app-autofill-cancel;
  animation-duration: 1ms;
}
`;

function isElementAutofilled(el: Element): boolean {
  try {
    return el.matches(":-webkit-autofill") || el.matches(":autofill");
  } catch {
    try {
      return el.matches(":-webkit-autofill");
    } catch {
      return false;
    }
  }
}

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

/**
 * React Native Web's TextInput does not forward DOM `onAnimationStart` props,
 * so we listen for the CSS autofill keyframe directly on the underlying DOM node.
 */
export function useWebAutofillDetection(
  inputRef: RefObject<unknown>,
  onAutofillChange: (autofilled: boolean) => void,
) {
  useEffect(() => {
    if (Platform.OS !== "web") {
      return;
    }

    const node = inputRef.current as Element | null;
    if (!node || typeof node.addEventListener !== "function") {
      return;
    }

    if (isElementAutofilled(node)) {
      onAutofillChange(true);
    }

    const handleAnimationStart = (event: Event) => {
      const animationName = (event as AnimationEvent).animationName;
      if (animationName === "app-autofill-start") {
        onAutofillChange(true);
      } else if (animationName === "app-autofill-cancel") {
        onAutofillChange(false);
      }
    };

    node.addEventListener("animationstart", handleAnimationStart);
    return () => {
      node.removeEventListener("animationstart", handleAnimationStart);
    };
  }, [inputRef, onAutofillChange]);
}

export function getWebInputProps(backgroundColor: string, textColor: string) {
  if (Platform.OS !== "web") {
    return {
      props: {} as Record<string, unknown>,
      style: undefined as Record<string, string> | undefined,
    };
  }

  return {
    props: {
      dataSet: { appInput: "true" },
    } as Record<string, unknown>,
    style: {
      "--app-autofill-bg": backgroundColor,
      "--app-autofill-fg": textColor,
    },
  };
}
