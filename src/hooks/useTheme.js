"use client";

import { useTheme as useNextTheme } from "next-themes";
import { useEffect, useState } from "react";

export function useTheme() {
  const { theme, setTheme, systemTheme } = useNextTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme === "system" ? systemTheme : theme;

  return {
    theme,
    setTheme,
    currentTheme,
    mounted,
    isDark: currentTheme === "dark",
    isLight: currentTheme === "light",
    isSystem: theme === "system",
  };
}

export function useThemeColors() {
  const { currentTheme } = useTheme();

  const colors = {
    light: {
      primary: "oklch(0.35 0.08 195)",
      secondary: "oklch(0.75 0.15 120)",
      background: "oklch(1 0 0)",
      foreground: "oklch(0.35 0 0)",
    },
    dark: {
      primary: "oklch(0.65 0.12 195)",
      secondary: "oklch(0.65 0.15 120)",
      background: "oklch(0.08 0.01 195)",
      foreground: "oklch(0.95 0.01 195)",
    },
  };

  return colors[currentTheme] || colors.light;
}
