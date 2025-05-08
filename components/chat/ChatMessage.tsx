import { cn } from '@/lib/utils';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  content: string;
  isUser: boolean;
}

export default function ChatMessage({ content, isUser }: ChatMessageProps) {
  return (
    <div className={cn(
      "flex items-start gap-3",
      isUser ? "justify-end" : "justify-start"
    )}>
      {!isUser && (
        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
          <Bot size={18} className="text-primary" />
        </div>
      )}
      
      <div className={cn(
        "max-w-[80%] px-4 py-2 rounded-lg",
        isUser 
          ? "bg-primary text-primary-foreground rounded-tr-none" 
          : "bg-secondary text-secondary-foreground rounded-tl-none"
      )}>
        <p className="text-sm">{content}</p>
      </div>
      
      {isUser && (
        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
          <User size={18} className="text-primary-foreground" />
        </div>
      )}
    </div>
  );
}