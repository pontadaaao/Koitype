"use client";

import type { Question } from "@/lib/types";
import { useLanguage } from "@/components/LanguageProvider";

const CHOICE_LABELS = ["A", "B", "C", "D"];

interface QuestionStepProps {
  question: Question | { text: string; choices: string[] };
  questionNumber: number;
  onSelect: (choiceIndex: number) => void;
  isVisible: boolean;
  onBack?: () => void;
  showBack?: boolean;
}

export default function QuestionStep({
  question,
  questionNumber,
  onSelect,
  isVisible,
  onBack,
  showBack = false,
}: QuestionStepProps) {
  const { t } = useLanguage();

  return (
    <div
      className={`transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="mb-6 flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-sm font-bold text-white">
          {questionNumber}
        </span>
        <span className="text-sm font-medium text-text-sub">
          {t.diagnosis.question} {questionNumber}
        </span>
      </div>
      <h2 className="font-heading mb-6 text-xl font-bold leading-relaxed text-text-main">
        {question.text}
      </h2>
      <div className="flex flex-col gap-3">
        {question.choices.map((choice, index) => (
          <button
            key={index}
            type="button"
            onClick={() => onSelect(index)}
            className="flex items-center gap-4 rounded-2xl border border-pink-light bg-base p-4 text-left shadow-sm transition-all hover:border-accent/50 hover:shadow-md active:scale-[0.98]"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-pink-light bg-base text-xs font-bold text-tag-text">
              {CHOICE_LABELS[index]}
            </span>
            <span className="text-sm leading-relaxed text-text-main">
              {choice}
            </span>
          </button>
        ))}
      </div>
      {showBack && onBack && (
        <button type="button" onClick={onBack} className="btn-secondary mt-6">
          {t.diagnosis.back}
        </button>
      )}
    </div>
  );
}
