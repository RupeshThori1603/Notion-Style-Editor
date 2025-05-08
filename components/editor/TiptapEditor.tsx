'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import EditorMenuBar from './EditorMenuBar';

interface TiptapEditorProps {
  initialContent: string;
  onChange: (content: string) => void;
}

export default function TiptapEditor({ initialContent, onChange }: TiptapEditorProps) {
  // Parse the initial content if it's a string
  const parsedContent = initialContent ? 
    JSON.parse(initialContent) : 
    {
      type: 'doc',
      content: [{ type: 'paragraph' }]
    };
  
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Placeholder.configure({
        placeholder: 'Start writing...',
      }),
    ],
    content: parsedContent,
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      onChange(JSON.stringify(json));
    },
  });

  return (
    <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none">
      <EditorMenuBar editor={editor} />
      <EditorContent editor={editor} className="min-h-[300px] mt-4 focus:outline-none" />
    </div>
  );
}