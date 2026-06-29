"use client";

import { useState } from "react";
import {
  CATEGORY_COLORS,
  POST_CATEGORIES,
  resolvePostName,
  type Post,
  type PostCategory,
} from "@/lib/posts";

interface PostComposerProps {
  onSubmit: (post: Omit<Post, "id" | "time" | "reacts">) => void;
  submitLabel?: string;
}

export default function PostComposer({
  onSubmit,
  submitLabel = "投稿する",
}: PostComposerProps) {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [category, setCategory] = useState<PostCategory>("恋の悩み");

  const canSubmit = text.trim().length > 0 && category.length > 0;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!canSubmit) return;

    onSubmit({
      name: resolvePostName(name),
      text: text.trim(),
      category,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-base px-4 py-4"
    >
      <div className="space-y-3">
        <div>
          <label
            htmlFor="post-name"
            className="mb-1.5 block text-xs font-medium text-text-sub"
          >
            名前
            <span className="ml-1 font-normal text-log-hint">（任意）</span>
          </label>
          <input
            id="post-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="未入力の場合は「匿名さん」"
            maxLength={30}
            className="w-full rounded-xl border border-log-border bg-base px-3 py-2.5 text-[15px] text-text-main outline-none transition-colors placeholder:text-log-hint focus:border-accent/50"
          />
        </div>

        <div>
          <label
            htmlFor="post-text"
            className="mb-1.5 block text-xs font-medium text-text-sub"
          >
            投稿内容
            <span className="ml-1 text-accent">*</span>
          </label>
          <textarea
            id="post-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="いまの恋バナを書いてみよう"
            rows={4}
            maxLength={500}
            required
            className="w-full resize-none rounded-xl border border-log-border bg-base px-3 py-2.5 text-[15px] leading-relaxed text-text-main outline-none transition-colors placeholder:text-log-hint focus:border-accent/50"
          />
        </div>

        <div>
          <p
            id="post-category-label"
            className="mb-2 block text-xs font-medium text-text-sub"
          >
            カテゴリー
            <span className="ml-1 text-accent">*</span>
          </p>
          <div
            className="flex flex-wrap gap-2"
            role="radiogroup"
            aria-labelledby="post-category-label"
          >
            {POST_CATEGORIES.map((item) => {
              const selected = category === item;
              const colors = CATEGORY_COLORS[item];
              return (
                <button
                  key={item}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => setCategory(item)}
                  className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-all active:scale-95 ${
                    selected
                      ? "shadow-sm ring-1 ring-accent/30"
                      : "border border-log-border bg-base text-text-sub hover:border-accent/30"
                  }`}
                  style={
                    selected
                      ? {
                          backgroundColor: colors.bg,
                          color: colors.tx,
                        }
                      : undefined
                  }
                >
                  #{item}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex justify-end pt-1">
          <button
            type="submit"
            disabled={!canSubmit}
            className="rounded-full bg-accent px-5 py-2 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {submitLabel}
          </button>
        </div>
      </div>
    </form>
  );
}
