'use client';

import { useState, useRef, useEffect } from 'react';
import { useNotesStore } from '@/lib/store/notes';
import { Send } from 'lucide-react';
import ChatMessage from './ChatMessage';

interface AiChatInterfaceProps {
  noteId: string;
}

export default function AiChatInterface({ noteId }: AiChatInterfaceProps) {
  const { chatHistory, addMessage } = useNotesStore();
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const messages = chatHistory[noteId] || [];

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    addMessage(noteId, message, true);
    setMessage('');
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-card shadow-lg rounded-t-xl border border-border transition-all duration-300 ease-in-out z-20 mx-4">
      <div className="p-4 border-b border-border">
        <h3 className="font-medium">Note Assistant</h3>
      </div>
      
      <div className="h-[300px] overflow-y-auto p-4 flex flex-col gap-4">
        {messages.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            <p>Ask me anything about your note...</p>
          </div>
        ) : (
          messages.map((msg) => (
            <ChatMessage
              key={msg.id}
              content={msg.content}
              isUser={msg.isUser}
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSubmit} className="p-4 border-t border-border flex gap-2">
        <input
          ref={inputRef}
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 rounded-md bg-background border border-input focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          type="submit"
          disabled={!message.trim()}
          className="p-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
}