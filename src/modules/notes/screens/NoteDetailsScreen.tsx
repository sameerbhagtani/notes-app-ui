import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import {
    ImageBackground,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

import FloatingButton from "../components/FloatingButton";

import type { Theme } from "@/shared/types";
import type { Note } from "../types";

type NoteDetailsScreenProps = {
    note: Note;
    onBack: () => void;
    onSaveNote: (updatedNote: Note) => void;
    onDeleteNote: (id: Note["id"]) => void;
    theme: Theme;
};

export default function NoteDetailsScreen({
    note,
    onBack,
    onSaveNote,
    onDeleteNote,
    theme,
}: NoteDetailsScreenProps) {
    const styles = useMemo(() => createStyles(theme), [theme]);

    const [title, setTitle] = useState(note.title);
    const [content, setContent] = useState(note.content);

    const [titleSelection, setTitleSelection] = useState<
        { start: number } | undefined
    >({
        start: 0,
    });
    const [contentSelection, setContentSelection] = useState<
        { start: number } | undefined
    >({
        start: 0,
    });

    const formattedDate = new Date(note.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });

    return (
        <View style={styles.screen}>
            <ImageBackground
                source={require("@/assets/images/notes-bg.jpg")}
                style={styles.header}
                resizeMode="cover"
            >
                <Pressable onPress={onBack} style={styles.iconButton}>
                    <Ionicons
                        name="chevron-back"
                        size={24}
                        color={theme.text}
                    />
                </Pressable>

                <Pressable
                    onPress={() => onSaveNote({ ...note, title, content })}
                    style={styles.iconButton}
                >
                    <Ionicons name="checkmark" size={24} color={theme.text} />
                </Pressable>
            </ImageBackground>

            <View style={styles.titleSection}>
                <TextInput
                    value={title}
                    onChangeText={setTitle}
                    placeholder="Note title"
                    placeholderTextColor={theme.secondaryText}
                    style={styles.titleInput}
                    selection={titleSelection}
                    onFocus={() => {
                        setTitleSelection(undefined);
                    }}
                />

                <Text style={styles.date}>{formattedDate}</Text>
            </View>

            <TextInput
                value={content}
                onChangeText={setContent}
                placeholder="Start writing..."
                placeholderTextColor={theme.secondaryText}
                style={styles.contentInput}
                multiline
                textAlignVertical="top"
                selection={contentSelection}
                onFocus={() => {
                    setContentSelection(undefined);
                }}
            />

            <FloatingButton
                theme={theme}
                onPress={() => onDeleteNote(note.id)}
                iconName="trash"
                bgColor={theme.danger}
            />
        </View>
    );
}

function createStyles(theme: Theme) {
    return StyleSheet.create({
        screen: {
            flex: 1,
            gap: 20,
        },
        header: {
            minHeight: 100,

            paddingHorizontal: 20,

            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",

            borderRadius: 20,

            overflow: "hidden",
        },
        iconButton: {
            width: 44,
            height: 44,

            borderRadius: 999,
            backgroundColor: theme.card,

            alignItems: "center",
            justifyContent: "center",
        },
        titleSection: {
            gap: 6,
        },
        titleInput: {
            color: theme.text,

            fontSize: 30,
            fontWeight: "700",
        },
        date: {
            color: theme.secondaryText,
            fontSize: 14,
        },
        contentInput: {
            flex: 1,

            color: theme.text,

            fontSize: 18,
            lineHeight: 28,
        },
    });
}
