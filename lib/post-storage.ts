import {
  initialPosts,
  POST_CATEGORIES,
  resolvePostName,
  type Post,
  type PostCategory,
  type StampKey,
} from "@/lib/posts";

const STORAGE_KEY = "tokimeki-log-posts";
const USER_REACTS_KEY = "tokimeki-log-user-reacts";

type UserReactsMap = Record<number, StampKey[]>;

const LEGACY_CATEGORY_MAP: Record<string, PostCategory> = {
  片思い: "片想い",
  両思い: "恋人",
  両想い: "恋人",
  カップル: "恋人",
  復縁: "恋の悩み",
  出会い: "恋の悩み",
  浮気: "恋の悩み",
  遠距離: "恋の悩み",
  惚気: "恋人",
  "その他": "恋の悩み",
};

function getNextId(posts: Post[]): number {
  return posts.reduce((max, post) => Math.max(max, post.id), 0) + 1;
}

function normalizeCategory(category: unknown): PostCategory {
  if (typeof category !== "string") return "恋の悩み";
  if (POST_CATEGORIES.includes(category as PostCategory)) {
    return category as PostCategory;
  }
  return LEGACY_CATEGORY_MAP[category] ?? "恋の悩み";
}

function normalizePost(raw: unknown): Post | null {
  if (!raw || typeof raw !== "object") return null;

  const record = raw as Partial<Post>;
  if (
    typeof record.id !== "number" ||
    typeof record.name !== "string" ||
    typeof record.text !== "string"
  ) {
    return null;
  }

  return {
    id: record.id,
    name: record.name,
    text: record.text,
    time: typeof record.time === "string" ? record.time : "たった今",
    category: normalizeCategory(record.category),
    reacts:
      record.reacts && typeof record.reacts === "object" ? record.reacts : {},
  };
}

export function loadPosts(): Post[] {
  if (typeof window === "undefined") return initialPosts;

  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return initialPosts;

  try {
    const parsed = JSON.parse(stored) as unknown[];
    if (!Array.isArray(parsed)) return initialPosts;

    const normalized = parsed
      .map(normalizePost)
      .filter((post): post is Post => post !== null);

    return normalized.length > 0 ? normalized : initialPosts;
  } catch {
    return initialPosts;
  }
}

export function savePosts(posts: Post[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

export function addPost(
  data: Omit<Post, "id" | "time" | "reacts">
): Post {
  const posts = loadPosts();
  const newPost: Post = {
    id: getNextId(posts),
    ...data,
    name: resolvePostName(data.name),
    time: "たった今",
    reacts: {},
  };
  savePosts([newPost, ...posts]);
  return newPost;
}

function loadUserReactsMap(): UserReactsMap {
  if (typeof window === "undefined") return {};

  const stored = localStorage.getItem(USER_REACTS_KEY);
  if (!stored) return {};

  try {
    const parsed = JSON.parse(stored) as Record<string, unknown>;
    const map: UserReactsMap = {};

    for (const [postId, stamps] of Object.entries(parsed)) {
      if (!Array.isArray(stamps)) continue;
      const id = Number(postId);
      if (!Number.isFinite(id)) continue;
      map[id] = stamps.filter(
        (stamp): stamp is StampKey => typeof stamp === "string"
      );
    }

    return map;
  } catch {
    return {};
  }
}

function saveUserReactsMap(map: UserReactsMap): void {
  localStorage.setItem(USER_REACTS_KEY, JSON.stringify(map));
}

export function loadUserReacts(): UserReactsMap {
  return loadUserReactsMap();
}

export function getUserReactsForPost(postId: number): StampKey[] {
  return loadUserReactsMap()[postId] ?? [];
}

export function togglePostReaction(
  postId: number,
  stampKey: StampKey
): { posts: Post[]; userReacts: UserReactsMap } {
  const posts = loadPosts();
  const userReacts = loadUserReactsMap();
  const postIndex = posts.findIndex((post) => post.id === postId);
  if (postIndex === -1) {
    return { posts, userReacts };
  }

  const post = posts[postIndex];
  const postUserReacts = userReacts[postId] ?? [];
  const alreadyReacted = postUserReacts.includes(stampKey);
  const currentCount = post.reacts[stampKey] ?? 0;
  const nextReacts = { ...post.reacts };

  if (alreadyReacted) {
    nextReacts[stampKey] = Math.max(0, currentCount - 1);
    if (nextReacts[stampKey] === 0) {
      delete nextReacts[stampKey];
    }
    const remaining = postUserReacts.filter((key) => key !== stampKey);
    if (remaining.length > 0) {
      userReacts[postId] = remaining;
    } else {
      delete userReacts[postId];
    }
  } else {
    nextReacts[stampKey] = currentCount + 1;
    userReacts[postId] = [...postUserReacts, stampKey];
  }

  const nextPosts = [...posts];
  nextPosts[postIndex] = { ...post, reacts: nextReacts };
  savePosts(nextPosts);
  saveUserReactsMap(userReacts);

  return { posts: nextPosts, userReacts };
}
