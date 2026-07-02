"use client";

import { useState } from "react";
import PostComposer from "@/components/PostComposer";
import { insertPost } from "@/lib/supabase-posts";
import type { Post } from "@/lib/posts";

interface LogPostButtonProps {
  className?: string;
  onPosted?: () => void;
}

export default function LogPostButton({ className, onPosted }: LogPostButtonProps) {
  const [open, setOpen] = useState(false);
  const [composerKey, setComposerKey] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (data: Omit<Post, "id" | "createdAt" | "reacts">) => {
    setSubmitting(true);
    setSubmitError(null);
    try {
      await insertPost(data);
      setOpen(false);
      setComposerKey((key) => key + 1);
      onPosted?.();
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "投稿に失敗しました");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        disabled={submitting}
        className={
          className ??
          "block w-full rounded-full bg-accent px-5 py-2.5 text-center text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
        }
      >
        {open ? "閉じる" : "投稿をする"}
      </button>

      {open && (
        <div className="mt-3 -mx-4 border-t border-log-border">
          {submitError && (
            <p className="px-4 pt-3 text-sm text-red-500">{submitError}</p>
          )}
          <PostComposer key={composerKey} onSubmit={handleSubmit} submitting={submitting} />
        </div>
      )}
    </div>
  );
}
