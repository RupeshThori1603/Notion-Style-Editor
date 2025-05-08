'use client';

import { useNotesStore } from '@/lib/store/notes';
import { MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AiChatButtonProps {
  noteId: string;
}

export default function AiChatButton({ noteId }: AiChatButtonProps) {
  const { toggleChat, isChatOpen } = useNotesStore();
  const isOpen = isChatOpen[noteId];

  return (
    <button
      onClick={() => toggleChat(noteId)}
      className={cn(
        "absolute bottom-8 right-8 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 z-10",
        isOpen 
          ? "bg-primary text-primary-foreground rotate-90 scale-110" 
          : "bg-primary text-primary-foreground hover:scale-110"
      )}
      aria-label={isOpen ? "Close AI chat" : "Open AI chat"}
    >
      <MessageSquare size={22} />
    </button>
  );
}