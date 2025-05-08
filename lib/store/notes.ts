import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface NotesState {
  notes: Note[];
  activeNoteId: string | null;
  chatHistory: Record<string, ChatMessage[]>;
  isChatOpen: Record<string, boolean>;
  
  // Actions
  setActiveNote: (id: string) => void;
  addNote: () => void;
  updateNote: (id: string, data: Partial<Omit<Note, 'id' | 'createdAt'>>) => void;
  deleteNote: (id: string) => void;
  
  // Chat actions
  toggleChat: (noteId: string) => void;
  addMessage: (noteId: string, content: string, isUser: boolean) => void;
}

// Mock AI response function
const getAIResponse = (message: string): string => {
  const responses = [
    "I've analyzed your note and found some interesting patterns.",
    "That's a great point. Have you considered looking at it from another angle?",
    "I can help you develop this idea further. What specific aspect would you like to explore?",
    "Based on what you've written, you might want to check out these related resources.",
    "I've summarized the key points from your note for quick reference.",
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
};

export const useNotesStore = create<NotesState>()(
  persist(
    (set, get) => ({
      notes: [],
      activeNoteId: null,
      chatHistory: {},
      isChatOpen: {},
      
      setActiveNote: (id) => set({ activeNoteId: id }),
      
      addNote: () => {
        const id = Date.now().toString();
        const newNote: Note = {
          id,
          title: 'Untitled',
          content: JSON.stringify({
            type: 'doc',
            content: [{ type: 'paragraph', content: [{ type: 'text', text: '' }] }]
          }),
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        
        set((state) => ({
          notes: [newNote, ...state.notes],
          activeNoteId: id,
          chatHistory: { ...state.chatHistory, [id]: [] },
          isChatOpen: { ...state.isChatOpen, [id]: false },
        }));
      },
      
      updateNote: (id, data) => set((state) => ({
        notes: state.notes.map((note) => 
          note.id === id
            ? { ...note, ...data, updatedAt: new Date() }
            : note
        ),
      })),
      
      deleteNote: (id) => set((state) => {
        // Get the next note to activate after deletion
        const activeIndex = state.notes.findIndex(note => note.id === id);
        const nextActiveNote = 
          state.notes[activeIndex + 1] || 
          state.notes[activeIndex - 1] ||
          null;
        
        // Create new state without the deleted note
        const newChatHistory = { ...state.chatHistory };
        delete newChatHistory[id];
        
        const newIsChatOpen = { ...state.isChatOpen };
        delete newIsChatOpen[id];
        
        return {
          notes: state.notes.filter(note => note.id !== id),
          activeNoteId: nextActiveNote ? nextActiveNote.id : null,
          chatHistory: newChatHistory,
          isChatOpen: newIsChatOpen,
        };
      }),
      
      toggleChat: (noteId) => set((state) => ({
        isChatOpen: {
          ...state.isChatOpen,
          [noteId]: !state.isChatOpen[noteId],
        }
      })),
      
      addMessage: (noteId, content, isUser) => set((state) => {
        const messages = state.chatHistory[noteId] || [];
        const newMessage = {
          id: Date.now().toString(),
          content,
          isUser,
          timestamp: new Date(),
        };
        
        // If it's a user message, simulate an AI response after a delay
        if (isUser) {
          setTimeout(() => {
            get().addMessage(noteId, getAIResponse(content), false);
          }, 1000);
        }
        
        return {
          chatHistory: {
            ...state.chatHistory,
            [noteId]: [...messages, newMessage],
          }
        };
      }),
    }),
    {
      name: 'notes-storage',
    }
  )
);

// Helper functions
export const getActiveNote = (): Note | null => {
  const { notes, activeNoteId } = useNotesStore.getState();
  return notes.find(note => note.id === activeNoteId) || null;
};