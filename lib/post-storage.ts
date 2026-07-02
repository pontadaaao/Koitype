import type { StampKey } from "@/lib/posts";

const USER_REACTS_KEY = "tokimeki-log-user-reacts";

export type UserReactsMap = Record<number, StampKey[]>;

function loadMap(): UserReactsMap {
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
      map[id] = stamps.filter((s): s is StampKey => typeof s === "string");
    }
    return map;
  } catch {
    return {};
  }
}

function saveMap(map: UserReactsMap): void {
  localStorage.setItem(USER_REACTS_KEY, JSON.stringify(map));
}

export function loadUserReacts(): UserReactsMap {
  return loadMap();
}

export function saveUserReacts(map: UserReactsMap): void {
  saveMap(map);
}

export function getUserReactsForPost(postId: number): StampKey[] {
  return loadMap()[postId] ?? [];
}
