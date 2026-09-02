"use client";

import { createContext, useContext } from "react";
import { getUiText, UiText } from "./i18n-text";
import { Locale } from "./types";

export const LanguageContext = createContext<Locale>("vi");

export function useLang(): Locale {
  return useContext(LanguageContext);
}

export { getUiText };
export type { UiText };

export function useT(): UiText {
  return getUiText(useLang());
}
