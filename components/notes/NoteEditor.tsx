'use client';

import { useState, useEffect, useCallback } from 'react';
import { useNotesStore, getActiveNote, Note } from '@/lib/store/notes';
import TiptapEditor from '@/components/editor/TiptapEditor';
import AiChatButton from '@/components/chat/AiChatButton';
import AiChatInterface from '@/components/chat/AiChatInterface';

export default function NoteEditor() {
  const { updateNote, activeNoteId, isChatOpen } = useNotesStore();
  const [activeNote, setActiveNote] = useState<Note | null>(null);
  const [title, setTitle] = useState('');

  // Update local state when the active note changes
  useEffect(() => {
    const note = getActiveNote();
    setActiveNote(note);
    setTitle(note?.title || 'Untitled');
  }, [activeNoteId]);

  // Debounced title update
  const handleTitleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    
    if (activeNoteId) {
      updateNote(activeNoteId, { title: newTitle });
    }
  }, [activeNoteId, updateNote]);

  // Handle content update from the editor
  const handleContentChange = useCallback((content: string) => {
    if (activeNoteId) {
      updateNote(activeNoteId, { content });
    }
  }, [activeNoteId, updateNote]);

  if (!activeNote) return null;

  return (
    <div className="h-full flex flex-col relative">
      <div className="px-8 py-4 border-b border-border">
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          className="text-2xl font-bold w-full bg-transparent outline-none"
          placeholder="Untitled"
        />
      </div>
      
      <div className="flex-1 overflow-y-auto px-8 py-4">
        <TiptapEditor 
          initialContent={activeNote.content}
          onChange={handleContentChange}
        />
      </div>
      
      {/* AI Chat UI */}
      <AiChatButton noteId={activeNote.id} />
      
      {activeNoteId && isChatOpen[activeNoteId] && (
        <AiChatInterface noteId={activeNote.id} />
      )}
    </div>
  );
}