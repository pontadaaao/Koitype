"use client";

import { useEffect, useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import LogPostButton from "@/components/LogPostButton";
import PostCard from "@/components/PostCard";
import {
  loadPosts,
  loadUserReacts,
  togglePostReaction,
} from "@/lib/post-storage";
import { CATEGORY_COLORS, initialPosts, type Post, type PostCategory, type StampKey } from "@/lib/posts";

const FILTER_CATEGORIES: PostCategory[] = [
  "恋人",
  "片想い",
  "失恋",
  "恋の悩み",
];

interface LogTimelineProps {
  embedded?: boolean;
}

export default function LogTimeline({ embedded = false }: LogTimelineProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [userReacts, setUserReacts] = useState<
    Partial<Record<number, StampKey[]>>
  >({});
  const [activeFilter, setActiveFilter] = useState<PostCategory | null>(null);

  const refreshPosts = () => {
    setPosts(loadPosts());
    setUserReacts(loadUserReacts());
  };

  useEffect(() => {
    refreshPosts();
  }, []);

  useEffect(() => {
    window.addEventListener("focus", refreshPosts);
    return () => window.removeEventListener("focus", refreshPosts);
  }, []);

  const handleToggleReact = (postId: number, stampKey: StampKey) => {
    const { posts: nextPosts, userReacts: nextUserReacts } = togglePostReaction(
      postId,
      stampKey
    );
    setPosts(nextPosts);
    setUserReacts(nextUserReacts);
  };

  const filteredPosts = activeFilter
    ? posts.filter((post) => post.category === activeFilter)
    : posts;

  const timeline = (
    <>
      <div className="border-b border-log-border px-4 py-3">
        <div className="mb-3 text-center">
          <p className="mb-1 font-cormorant text-sm italic tracking-widest text-accent/70">Love Log</p>
          <h1 className="font-heading text-2xl font-bold text-accent sm:text-3xl">恋ログ</h1>
          <p className="mt-2 text-xs text-text-main">誰にも言えない恋も、嬉しかった恋も。匿名でシェアしよう</p>
        </div>
        <LogPostButton onPosted={refreshPosts} />
        <div className="mt-3 flex flex-wrap gap-2">
          {FILTER_CATEGORIES.map((cat) => {
            const selected = activeFilter === cat;
            const colors = CATEGORY_COLORS[cat];
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveFilter(selected ? null : cat)}
                className="shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-all active:scale-95"
                style={
                  selected
                    ? { backgroundColor: colors.tx, color: "#ffffff", border: `1.5px solid ${colors.tx}` }
                    : { backgroundColor: "#ffffff", color: "#e75480", border: "1.5px solid #e75480" }
                }
              >
                #{cat}
              </button>
            );
          })}
        </div>
      </div>
      {filteredPosts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          userReacts={userReacts[post.id] ?? []}
          onToggleReact={(stampKey) => handleToggleReact(post.id, stampKey)}
        />
      ))}
    </>
  );

  if (embedded) {
    return (
      <section className="overflow-hidden rounded-2xl border border-log-border">
        {timeline}
      </section>
    );
  }

  return (
    <div className="min-h-screen bg-base">
      <SiteHeader showBack={false} />
      <main className="mx-auto max-w-[600px] border-x border-log-border">
        {timeline}
      </main>
      <SiteFooter />
    </div>
  );
}
