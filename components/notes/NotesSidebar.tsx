'use client';

import { PlusCircle, FileText, Trash } from 'lucide-react';
import { useNotesStore } from '@/lib/store/notes';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

export default function NotesSidebar() {
  const { notes, activeNoteId, addNote, setActiveNote, deleteNote } = useNotesStore();

  return (
    <div className="w-64 h-full border-r border-border bg-card flex flex-col">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h1 className="font-semibold text-lg">Notes</h1>
        <button 
          onClick={addNote}
          className="p-1 rounded-md hover:bg-secondary transition-colors"
          title="Create new note"
        >
          <PlusCircle size={20} />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {notes.length === 0 ? (
          <div className="p-4 text-sm text-muted-foreground italic">
            No notes yet. Create one to get started.
          </div>
        ) : (
          <ul className="py-2">
            {notes.map((note) => (
              <li 
                key={note.id}
                className={cn(
                  "flex items-start gap-2 px-4 py-3 cursor-pointer hover:bg-secondary/50 transition-colors",
                  activeNoteId === note.id && "bg-secondary"
                )}
                onClick={() => setActiveNote(note.id)}
              >
                <FileText size={16} className="mt-1 shrink-0 text-muted-foreground" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{note.title || 'Untitled'}</p>
                  <p className="text-xs text-muted-foreground truncate mt-1">
                    {formatDistanceToNow(new Date(note.updatedAt), { addSuffix: true })}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNote(note.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 p-1 rounded-md hover:bg-destructive/10 hover:text-destructive transition-colors"
                  title="Delete note"
                >
                  <Trash size={14} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}