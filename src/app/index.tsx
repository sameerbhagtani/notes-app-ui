import { StatusBar } from "expo-status-bar";
import { useMemo } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import NoteDetailsScreen from "@/modules/notes/screens/NoteDetailsScreen";
import NotesListScreen from "@/modules/notes/screens/NotesListScreen";

import useNotes from "@/modules/notes/hooks/useNotes";
import useTheme from "@/shared/hooks/useTheme";

import type { Theme } from "@/shared/types";

export default function Index() {
    const {
        notes,
        selectedNote,
        setSelectedNote,
        createNote,
        saveNote,
        deleteNote,
    } = useNotes();

    const { theme, isDark, themeMode, toggleTheme } = useTheme();

    const styles = useMemo(() => createStyles(theme), [theme]);

    return (
        <View style={styles.root}>
            <StatusBar style={isDark ? "light" : "dark"} />

            <SafeAreaView style={styles.safeView}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.keyboardAvoidingView}
                >
                    {selectedNote ? (
                        <NoteDetailsScreen
                            note={selectedNote}
                            onBack={() => setSelectedNote(null)}
                            onSaveNote={saveNote}
                            onDeleteNote={deleteNote}
                            theme={theme}
                        />
                    ) : (
                        <NotesListScreen
                            notes={notes}
                            onSelectNote={setSelectedNote}
                            onCreateNote={createNote}
                            theme={theme}
                            isDark={isDark}
                            onToggleTheme={toggleTheme}
                        />
                    )}
                </KeyboardAvoidingView>
            </SafeAreaView>
        </View>
    );
}

function createStyles(theme: Theme) {
    return StyleSheet.create({
        root: {
            flex: 1,
            backgroundColor: theme.background,
            paddingHorizontal: 16,
            paddingVertical: 20,
        },
        safeView: {
            flex: 1,
        },
        keyboardAvoidingView: {
            flex: 1,
        },
    });
}
