"use client";

import { useState } from "react";
import PostComposer from "@/components/PostComposer";
import { addPost } from "@/lib/post-storage";
import type { Post } from "@/lib/posts";

interface LogPostButtonProps {
  className?: string;
  onPosted?: () => void;
}

export default function LogPostButton({ className, onPosted }: LogPostButtonProps) {
  const [open, setOpen] = useState(false);
  const [composerKey, setComposerKey] = useState(0);

  const handleSubmit = (data: Omit<Post, "id" | "time" | "reacts">) => {
    addPost(data);
    setOpen(false);
    setComposerKey((key) => key + 1);
    onPosted?.();
  };

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className={
          className ??
          "block w-full rounded-full bg-accent px-5 py-2.5 text-center text-sm font-bold text-white transition-opacity hover:opacity-90"
        }
      >
        {open ? "閉じる" : "投稿をする"}
      </button>

      {open && (
        <div className="mt-3 -mx-4 border-t border-log-border">
          <PostComposer key={composerKey} onSubmit={handleSubmit} />
        </div>
      )}
    </div>
  );
}
