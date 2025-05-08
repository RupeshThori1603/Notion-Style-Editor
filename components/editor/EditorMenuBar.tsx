'use client';

import { type Editor } from '@tiptap/react';
import { 
  Bold, 
  Italic, 
  Strikethrough, 
  Heading1, 
  Heading2, 
  Heading3,
  List, 
  ListOrdered, 
  ChevronDown 
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface EditorMenuBarProps {
  editor: Editor | null;
}

export default function EditorMenuBar({ editor }: EditorMenuBarProps) {
  if (!editor) return null;

  const menuItems = [
    {
      icon: <Bold size={18} />,
      title: 'Bold',
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: () => editor.isActive('bold'),
    },
    {
      icon: <Italic size={18} />,
      title: 'Italic',
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: () => editor.isActive('italic'),
    },
    {
      icon: <Strikethrough size={18} />,
      title: 'Strike',
      action: () => editor.chain().focus().toggleStrike().run(),
      isActive: () => editor.isActive('strike'),
    },
    {
      icon: <Heading1 size={18} />,
      title: 'Heading 1',
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: () => editor.isActive('heading', { level: 1 }),
    },
    {
      icon: <Heading2 size={18} />,
      title: 'Heading 2',
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: () => editor.isActive('heading', { level: 2 }),
    },
    {
      icon: <Heading3 size={18} />,
      title: 'Heading 3',
      action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: () => editor.isActive('heading', { level: 3 }),
    },
    {
      icon: <List size={18} />,
      title: 'Bullet List',
      action: () => editor.chain().focus().toggleBulletList().run(),
      isActive: () => editor.isActive('bulletList'),
    },
    {
      icon: <ListOrdered size={18} />,
      title: 'Ordered List',
      action: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: () => editor.isActive('orderedList'),
    },
  ];

  return (
    <div className="flex items-center p-2 border border-border rounded-md bg-card mb-4 overflow-x-auto">
      {menuItems.map((item, index) => (
        <button
          key={index}
          onClick={item.action}
          className={cn(
            "p-2 rounded-md hover:bg-secondary transition-colors",
            item.isActive() && "bg-secondary text-primary"
          )}
          title={item.title}
          type="button"
        >
          {item.icon}
        </button>
      ))}
    </div>
  );
}