"use client";

import type { ReactNode } from "react";
import AppIcon from "@/components/AppIcon";

export type BirthdayInput = {
  year: number | "";
  month: number | "";
  day: number | "";
};

interface BirthdayFormProps {
  self: BirthdayInput;
  partner: BirthdayInput;
  onSelfChange: (value: BirthdayInput) => void;
  onPartnerChange: (value: BirthdayInput) => void;
  onSubmit: () => void;
}

const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 61 }, (_, i) => currentYear - i);
const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);

function daysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

function isComplete(input: BirthdayInput): boolean {
  return (
    input.year !== "" &&
    input.month !== "" &&
    input.day !== "" &&
    input.day <= daysInMonth(Number(input.year), Number(input.month))
  );
}

function HeartIcon({ color, size = 18 }: { color: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="inline-block align-[-2px]"
    >
      <path
        fill={color}
        d="M12 20.35l-1.1-1C7.4 15.36 5 12.78 5 10.2 5 7.66 6.9 6 9 6c1.24 0 2.43.58 3 1.5.57-.92 1.76-1.5 3-1.5 2.1 0 4 1.66 4 4.2 0 2.58-2.4 5.16-5.9 9.15l-1.1 1z"
      />
    </svg>
  );
}

function BirthdayCard({
  title,
  icon,
  accentClass,
  value,
  onChange,
}: {
  title: string;
  icon: ReactNode;
  accentClass: string;
  value: BirthdayInput;
  onChange: (value: BirthdayInput) => void;
}) {
  const maxDay =
    value.year !== "" && value.month !== ""
      ? daysInMonth(Number(value.year), Number(value.month))
      : 31;
  const days = Array.from({ length: maxDay }, (_, i) => i + 1);

  const update = (patch: Partial<BirthdayInput>) => {
    const next = { ...value, ...patch };
    if (
      next.year !== "" &&
      next.month !== "" &&
      next.day !== "" &&
      Number(next.day) > daysInMonth(Number(next.year), Number(next.month))
    ) {
      next.day = daysInMonth(Number(next.year), Number(next.month));
    }
    onChange(next);
  };

  const selectClass =
    "w-full rounded-xl border border-pink-light bg-base px-2 py-2.5 text-sm text-text-main outline-none transition-colors focus:border-accent/50";

  return (
    <div className={`card p-4 ${accentClass}`}>
      <p className="mb-3 flex items-center justify-center gap-1 text-sm font-bold text-text-main">
        {icon}
        {title}
      </p>
      <div className="space-y-2">
        <label className="block">
          <span className="mb-1 block text-xs text-log-hint">年</span>
          <select
            className={selectClass}
            value={value.year}
            onChange={(e) =>
              update({
                year: e.target.value ? Number(e.target.value) : "",
              })
            }
          >
            <option value="">--</option>
            {YEARS.map((y) => (
              <option key={y} value={y}>
                {y}年
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1 block text-xs text-log-hint">月</span>
          <select
            className={selectClass}
            value={value.month}
            onChange={(e) =>
              update({
                month: e.target.value ? Number(e.target.value) : "",
              })
            }
          >
            <option value="">--</option>
            {MONTHS.map((m) => (
              <option key={m} value={m}>
                {m}月
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1 block text-xs text-log-hint">日</span>
          <select
            className={selectClass}
            value={value.day}
            onChange={(e) =>
              update({ day: e.target.value ? Number(e.target.value) : "" })
            }
          >
            <option value="">--</option>
            {days.map((d) => (
              <option key={d} value={d}>
                {d}日
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}

export default function BirthdayForm({
  self,
  partner,
  onSelfChange,
  onPartnerChange,
  onSubmit,
}: BirthdayFormProps) {
  const canSubmit = isComplete(self) && isComplete(partner);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (canSubmit) onSubmit();
      }}
    >
      <div className="grid grid-cols-2 gap-3">
        <BirthdayCard
          title="あなた"
          icon={<HeartIcon color="#F067A6" />}
          accentClass="border-pink-light"
          value={self}
          onChange={onSelfChange}
        />
        <BirthdayCard
          title="お相手"
          icon={<HeartIcon color="#4a90d9" />}
          accentClass="border-pink-light"
          value={partner}
          onChange={onPartnerChange}
        />
      </div>
      <button
        type="submit"
        disabled={!canSubmit}
        className="btn-primary mt-5 inline-flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <AppIcon name="heart-filled" size={18} className="text-white" />
        相性を占う
      </button>
    </form>
  );
}
