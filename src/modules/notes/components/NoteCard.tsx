import { useMemo } from "react";
import { Pressable, StyleSheet, Text } from "react-native";

import type { Theme } from "@/shared/types";
import type { Note } from "../types";

type NoteCardProps = {
    note: Note;
    theme: Theme;
    onPress: () => void;
};

export default function NoteCard({ note, theme, onPress }: NoteCardProps) {
    const styles = useMemo(() => createStyles(theme), [theme]);

    return (
        <Pressable style={styles.card} onPress={onPress}>
            <Text style={styles.title} numberOfLines={1}>
                {note.title || "Untitled"}
            </Text>
            <Text style={styles.content} numberOfLines={4}>
                {note.content}
            </Text>
        </Pressable>
    );
}

function createStyles(theme: Theme) {
    return StyleSheet.create({
        card: {
            flex: 1,
            backgroundColor: theme.card,
            padding: 14,
            borderRadius: 16,
            gap: 10,
            minHeight: 140,
            overflow: "hidden",
        },
        title: {
            color: theme.text,

            fontSize: 20,
            fontWeight: "600",
        },
        content: {
            color: theme.secondaryText,

            fontSize: 15,
            lineHeight: 22,
        },
    });
}
