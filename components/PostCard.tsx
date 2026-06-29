"use client";

import ReactionChips from "@/components/ReactionChips";
import { CATEGORY_COLORS, type Post, type StampKey } from "@/lib/posts";

interface PostCardProps {
  post: Post;
  userReacts: StampKey[];
  onToggleReact: (stampKey: StampKey) => void;
}

export default function PostCard({
  post,
  userReacts,
  onToggleReact,
}: PostCardProps) {
  const categoryStyle =
    CATEGORY_COLORS[post.category] ?? CATEGORY_COLORS["恋の悩み"];

  return (
    <article className="border-b border-log-border px-4 py-3 transition-colors hover:bg-log-hover">
      <div className="min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="flex min-w-0 flex-wrap items-center gap-x-1 text-[15px] leading-5">
            <span className="truncate font-bold text-text-main">{post.name}</span>
            <span className="text-text-sub">·</span>
            <span className="shrink-0 text-text-sub">{post.time}</span>
          </div>
          <span
            className="shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium"
            style={{
              backgroundColor: categoryStyle.bg,
              color: categoryStyle.tx,
            }}
          >
            #{post.category}
          </span>
        </div>

        <p className="mt-1 whitespace-pre-wrap text-[15px] leading-relaxed text-text-main">
          {post.text}
        </p>

        <ReactionChips
          reacts={post.reacts}
          userReacts={userReacts}
          onToggle={onToggleReact}
        />
      </div>
    </article>
  );
}
