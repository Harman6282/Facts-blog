"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { Button } from "@/components/ui/button"; // use your own styled buttons
import { Bold, Heading2, Italic, List } from "lucide-react";

export default function TipTapEditor({
  content,
  onChange,
}: {
  content: string;
  onChange: (html: string) => void;
}) {
  const editor = useEditor({
    extensions: [StarterKit, Image, Link.configure({ openOnClick: false })],
    content,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "bg-black text-white" : ""}
        >
          <Bold />
        </Button>
        <Button
          variant="outline"
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "bg-black text-white" : ""}
        >
          <Italic />
        </Button>
        <Button
          variant="outline"
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "bg-black text-white" : ""}
        >
          <List />
        </Button>
        <Button
          variant="outline"
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive("heading", { level: 2 })
              ? "bg-black text-white"
              : ""
          }
        >
          <Heading2 />
        </Button>
      </div>

      <div className="border border-black p-2 rounded min-h-[150px]">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
