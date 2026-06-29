export const STAMPS = [
  { key: "分かる", label: "共感", img: "/stamps/wakaru.png" },
  { key: "泣いた", label: "泣く", img: "/stamps/naita.png" },
  { key: "推せる", label: "きゅん", img: "/stamps/oseru.png" },
  { key: "応援", label: "応援", img: "/stamps/ouen.png" },
] as const;

export type StampKey = (typeof STAMPS)[number]["key"];

export function getStampLabel(key: StampKey): string {
  return STAMPS.find((stamp) => stamp.key === key)?.label ?? key;
}

export type PostCategory =
  | "恋人"
  | "片想い"
  | "失恋"
  | "恋の悩み";

export const POST_CATEGORIES: PostCategory[] = [
  "恋人",
  "片想い",
  "失恋",
  "恋の悩み",
];

export const ANONYMOUS_NAME = "匿名さん";

export function resolvePostName(name: string): string {
  const trimmed = name.trim();
  return trimmed.length > 0 ? trimmed : ANONYMOUS_NAME;
}

export const CATEGORY_COLORS: Record<PostCategory, { bg: string; tx: string }> =
  {
    恋人: { bg: "#fff0f5", tx: "#FF6B9D" },
    片想い: { bg: "#f3eefe", tx: "#9B6FD4" },
    失恋: { bg: "#e8f2ff", tx: "#4A9EE8" },
    恋の悩み: { bg: "#fff1ee", tx: "#FF7A5C" },
  };

export type Post = {
  id: number;
  category: PostCategory;
  name: string;
  time: string;
  text: string;
  reacts: Partial<Record<StampKey, number>>;
};

export const initialPosts: Post[] = [
  {
    id: 1,
    category: "片想い",
    name: "あんず",
    time: "5分",
    text: "3年片思いの先輩、卒業前にやっと告白した。「ありがとう、でもごめん」って。\nでも不思議とスッキリしてる。言えてよかった。",
    reacts: { 分かる: 34, 推せる: 128, 泣いた: 56 },
  },
  {
    id: 2,
    category: "恋人",
    name: "匿名さん",
    time: "32分",
    text: "ずっと仲良かった友達と、お互い好きだったって判明した瞬間。\n「実は前から好きだった」って言われて泣きそうになった。焦らなくてよかった。",
    reacts: { 推せる: 201, 応援: 88 },
  },
  {
    id: 3,
    category: "失恋",
    name: "匿名さん",
    time: "2時間",
    text: "3年付き合った彼と、価値観の違いで別れることに。\n泣いたけど嫌いになったわけじゃない。今はただ前を向きたい。同じ経験した人いますか？",
    reacts: { 分かる: 312, 泣いた: 189, 応援: 97 },
  },
  {
    id: 4,
    category: "恋の悩み",
    name: "こはく",
    time: "4時間",
    text: "東京と福岡の遠距離を2年続けて、ついにプロポーズされました。\n会えない時間が長かった分、信頼関係が深まった気がする。遠距離中の人、応援してます！",
    reacts: { 推せる: 233, 応援: 102, 泣いた: 45 },
  },
];

export function getStampByKey(key: StampKey) {
  return STAMPS.find((s) => s.key === key)!;
}
