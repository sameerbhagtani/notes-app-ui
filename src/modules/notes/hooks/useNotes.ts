import { useState } from "react";

import { INITIAL_NOTES } from "../data";

import type { Note } from "../types";

export default function useNotes() {
    const [notes, setNotes] = useState<Note[]>(INITIAL_NOTES);
    const [selectedNote, setSelectedNote] = useState<Note | null>(null);

    function deleteNote(id: Note["id"]) {
        setNotes((prevNotes) => prevNotes.filter((n) => n.id !== id));
        setSelectedNote(null);
    }

    function createNote() {
        const newNote: Note = {
            id: Date.now().toString(),
            title: "New Note",
            content: "",
            createdAt: new Date().toISOString(),
        };

        setNotes((prevNotes) => [...prevNotes, newNote]);
        setSelectedNote(newNote);
    }

    function saveNote(updatedNote: Note) {
        setNotes((prevNotes) =>
            prevNotes.map((note) =>
                note.id === updatedNote.id ? updatedNote : note,
            ),
        );
        setSelectedNote(null);
    }

    return {
        notes,
        selectedNote,
        setSelectedNote,
        createNote,
        saveNote,
        deleteNote,
    };
}
