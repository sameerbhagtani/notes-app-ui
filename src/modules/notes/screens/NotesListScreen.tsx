import { MaterialIcons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";

import FloatingButton from "../components/FloatingButton";
import NoteCard from "../components/NoteCard";
import ThemeToggle from "../components/ThemeToggle";

import useResponsive from "@/shared/hooks/useResponsive";

import type { Theme } from "@/shared/types";
import type { Note } from "../types";

type NotesListScreenProps = {
    notes: Note[];
    onSelectNote: (note: Note) => void;
    onCreateNote: () => void;
    theme: Theme;
    isDark: boolean;
    onToggleTheme: () => void;
};

export default function NotesListScreen({
    notes,
    onSelectNote,
    onCreateNote,
    theme,
    isDark,
    onToggleTheme,
}: NotesListScreenProps) {
    const { isTablet } = useResponsive();

    const styles = useMemo(() => createStyles(theme), [theme]);

    const [searchQuery, setSearchQuery] = useState("");

    const filteredNotes = notes.filter((note) => {
        const query = searchQuery.toLowerCase();

        if (!query) return true;

        return (
            note.title.toLowerCase().includes(query) ||
            note.content.toLowerCase().includes(query)
        );
    });

    return (
        <View style={styles.screen}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.title}>Notes</Text>
                    <Text style={styles.subtitle}>{notes.length} notes</Text>
                </View>
                <ThemeToggle
                    theme={theme}
                    isDark={isDark}
                    onToggleTheme={onToggleTheme}
                />
            </View>

            <TextInput
                placeholder="Search your notes"
                placeholderTextColor={theme.secondaryText}
                style={styles.input}
                value={searchQuery}
                onChangeText={setSearchQuery}
            />

            {filteredNotes.length === 0 ? (
                <View style={styles.notFound}>
                    <MaterialIcons
                        name="search-off"
                        size={128}
                        color={theme.text}
                    />
                    <Text style={styles.notFoundText}>No matching notes</Text>
                </View>
            ) : (
                <FlatList
                    data={filteredNotes}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <NoteCard
                            note={item}
                            theme={theme}
                            onPress={() => onSelectNote(item)}
                        />
                    )}
                    key={isTablet ? "tablet" : "phone"}
                    numColumns={isTablet ? 3 : 2}
                    contentContainerStyle={{
                        gap: 20,
                    }}
                    columnWrapperStyle={{
                        gap: 20,
                    }}
                />
            )}

            <FloatingButton
                theme={theme}
                onPress={onCreateNote}
                iconName="plus"
                bgColor={theme.accent}
            />
        </View>
    );
}

function createStyles(theme: Theme) {
    return StyleSheet.create({
        screen: {
            gap: 20,
            flex: 1,
        },
        header: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        },
        title: {
            fontSize: 32,
            fontWeight: "700",
            color: theme.text,
        },
        subtitle: { color: theme.secondaryText, fontSize: 14 },
        input: {
            backgroundColor: theme.card,
            borderRadius: 20,
            paddingHorizontal: 20,
            fontSize: 16,
            color: theme.text,
        },
        notFound: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
        },
        notFoundText: {
            color: theme.text,
            fontSize: 16,
        },
    });
}
