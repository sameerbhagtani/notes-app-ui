import type { Theme } from "./types";

export const COLORS: {
    light: Theme;
    dark: Theme;
} = {
    light: {
        background: "#ffffff",
        card: "#f5f7fb",
        text: "#111827",
        secondaryText: "#6b7280",
        accent: "#3269ff",
        danger: "#ef4444",
    },
    dark: {
        background: "#0e121a",
        card: "#171c25",
        text: "#f3f4f6",
        secondaryText: "#9ca3af",
        accent: "#3269ff",
        danger: "#ef4444",
    },
};
