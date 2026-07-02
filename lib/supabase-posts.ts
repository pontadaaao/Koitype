import { supabase } from "@/lib/supabase";
import {
  initialPosts,
  resolvePostName,
  type Post,
  type PostCategory,
  type StampKey,
} from "@/lib/posts";

type DbPost = {
  id: number;
  category: string;
  name: string;
  text: string;
  reacts: Partial<Record<StampKey, number>>;
  created_at: string;
};

function dbToPost(row: DbPost): Post {
  return {
    id: row.id,
    category: row.category as PostCategory,
    name: row.name,
    text: row.text,
    reacts: row.reacts ?? {},
    createdAt: row.created_at,
  };
}

export async function fetchPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from("log_posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data || data.length === 0) return initialPosts;
  return (data as DbPost[]).map(dbToPost);
}

export async function insertPost(
  input: Omit<Post, "id" | "createdAt" | "reacts">
): Promise<Post> {
  const { data, error } = await supabase
    .from("log_posts")
    .insert({
      category: input.category,
      name: resolvePostName(input.name),
      text: input.text,
      reacts: {},
    })
    .select()
    .single();

  if (error || !data) {
    if (error) {
      const e = error as unknown as Record<string, unknown>;
      console.error("Supabase INSERT error:", {
        message: error.message,
        details: e.details ?? null,
        hint: e.hint ?? null,
        code: e.code ?? null,
      });
    }
    throw new Error(error?.message ?? "Insert failed");
  }
  return dbToPost(data as DbPost);
}

export async function updatePostReacts(
  postId: number,
  reacts: Partial<Record<StampKey, number>>
): Promise<void> {
  const { error } = await supabase
    .from("log_posts")
    .update({ reacts })
    .eq("id", postId);

  if (error) throw new Error(error.message);
}
