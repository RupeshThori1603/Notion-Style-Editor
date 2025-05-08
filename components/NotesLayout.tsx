'use client';

import { useEffect } from 'react';
import { useNotesStore } from '@/lib/store/notes';
import NotesSidebar from '@/components/notes/NotesSidebar';
import NoteEditor from '@/components/notes/NoteEditor';
import EmptyState from '@/components/notes/EmptyState';

export default function NotesLayout() {
  const { notes, activeNoteId, addNote } = useNotesStore();

  // Create a default note if there are no notes
  useEffect(() => {
    if (notes.length === 0) {
      addNote();
    }
  }, [notes.length, addNote]);

  return (
    <div className="flex h-full">
      <NotesSidebar />
      <div className="flex-1 overflow-hidden">
        {activeNoteId ? (
          <NoteEditor />
        ) : (
          <EmptyState onCreateNote={addNote} />
        )}
      </div>
    </div>
  );
}