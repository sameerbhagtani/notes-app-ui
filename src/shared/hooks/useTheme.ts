import { useState } from "react";
import { useColorScheme } from "react-native";

import { COLORS } from "@/shared/constants";

import type { ThemeMode } from "@/shared/types";

export default function useTheme() {
    const systemScheme = useColorScheme();
    const [themeMode, setThemeMode] = useState<ThemeMode>("system");

    const isDark =
        themeMode === "system" ? systemScheme === "dark" : themeMode === "dark";

    const theme = isDark ? COLORS.dark : COLORS.light;

    function toggleTheme() {
        setThemeMode((prev) => {
            if (prev === "system") {
                return systemScheme === "dark" ? "light" : "dark";
            }

            return prev === "dark" ? "light" : "dark";
        });
    }

    return {
        theme,
        isDark,
        themeMode,
        toggleTheme,
    };
}
