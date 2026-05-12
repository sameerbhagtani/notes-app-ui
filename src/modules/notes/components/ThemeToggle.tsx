import { Ionicons } from "@expo/vector-icons";
import { useMemo } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import type { Theme } from "@/shared/types";

type ThemeToggleProps = {
    theme: Theme;
    isDark: boolean;
    onToggleTheme: () => void;
};

export default function ThemeToggle({
    theme,
    isDark,
    onToggleTheme,
}: ThemeToggleProps) {
    const styles = useMemo(() => createStyles(theme, isDark), [theme, isDark]);

    return (
        <Pressable onPress={onToggleTheme} style={styles.container}>
            <View style={styles.thumb}>
                <Ionicons
                    name={isDark ? "moon" : "sunny"}
                    size={14}
                    color={theme.background}
                />
            </View>
        </Pressable>
    );
}

function createStyles(theme: Theme, isDark: boolean) {
    return StyleSheet.create({
        container: {
            width: 52,
            height: 32,
            borderRadius: 999,
            padding: 4,
            justifyContent: "center",
            alignItems: isDark ? "flex-end" : "flex-start",
            backgroundColor: theme.card,
        },

        thumb: {
            width: 24,
            height: 24,
            borderRadius: 999,
            backgroundColor: theme.text,
            alignItems: "center",
            justifyContent: "center",
        },
    });
}
