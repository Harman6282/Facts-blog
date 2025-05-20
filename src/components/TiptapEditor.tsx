'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect } from 'react';

type Props = {
  content: string;
  onChange: (value: string) => void;
};

export default function TiptapEditor({ content, onChange }: Props) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  return (
    <div className="border border-black p-2 min-h-[200px] rounded">
      <EditorContent editor={editor} />
    </div>
  );
}
