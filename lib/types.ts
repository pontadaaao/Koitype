import type { IconKey } from "@/lib/icon-keys";

export type Category = "恋愛タイプ診断" | "相性診断";

export type DiagnosisTag = "恋愛タイプ" | "闇系" | "ネタ系" | "モテ系" | "心理テスト" | "キャラ系";

export type HomeFilter = "すべて" | Category | "恋ログ";

export interface Question {
  id: number;
  text: string;
  choices: string[];
}

export interface DiagnosisResult {
  id: string;
  icon: IconKey;
  name: string;
  tags: string[];
  desc: string;
  detail?: string;
  detailTitle?: string;
  advice?: string;
  adviceTitle?: string;
  color?: string;
  resultLabel?: string;
  parameters?: Array<{ label: string; value: number }>;
  aru?: string[];
  compat?: Array<{ name: string; desc: string; score: string }>;
  manual?: Array<{ title: string; desc: string }>;
  prescription?: string;
}

export interface Diagnosis {
  id: string;
  title: string;
  description: string;
  category: Category;
  icon: IconKey;
  questionCount: number;
  durationMinutes: number;
  popular?: boolean;
  showOnTop?: boolean;
  tag?: DiagnosisTag;
  href?: string;
  thumbnail?: string;
  questions: Question[];
  results: DiagnosisResult[];
}

export interface DogCatQuestion {
  text: string;
  choices: string[];
  dog: number[];
  note: string[];
}

export interface DogCatTrait {
  label: string;
  value: string;
}

export interface DogCatCompat {
  icon: IconKey;
  strong: string;
  text: string;
}

export interface DogCatParameter {
  label: string;
  score: number;
}

export interface DogCatResult {
  id: string;
  icon: IconKey;
  name: string;
  subtitle: string;
  catch: string;
  tags: string[];
  parameters: DogCatParameter[];
  traits: DogCatTrait[];
  compat: DogCatCompat[];
  advice: string;
}

export interface DogCatScore {
  result: DogCatResult;
  dogPct: number;
  catPct: number;
  totalDogPoints: number;
  maxDogPoints: number;
}

export interface DogCatAnswer {
  questionIndex: number;
  choiceIndex: number;
}
