"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { COLUMN_CATEGORIES, type ColumnFormValues, type ColumnStatus } from "@/lib/column-types";
import { diagnoses } from "@/lib/diagnoses";

interface ColumnFormProps {
  initialValues?: Partial<ColumnFormValues>;
  columnId?: string;
  mode: "new" | "edit";
}

const EMPTY: ColumnFormValues = {
  title: "",
  slug: "",
  category: "その他",
  tags: "",
  eyecatch_url: "",
  content: "",
  status: "draft",
  seo_title: "",
  seo_description: "",
  related_diagnosis: "",
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function ColumnForm({ initialValues, columnId, mode }: ColumnFormProps) {
  const router = useRouter();
  const [values, setValues] = useState<ColumnFormValues>({
    ...EMPTY,
    ...initialValues,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function set<K extends keyof ColumnFormValues>(key: K, value: ColumnFormValues[K]) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  function onTitleChange(title: string) {
    set("title", title);
    if (mode === "new" && !values.slug) {
      set("slug", slugify(title));
    }
  }

  async function handleSubmit(e: React.FormEvent, status?: ColumnStatus) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const payload: ColumnFormValues = {
      ...values,
      ...(status ? { status } : {}),
    };

    const url = mode === "new" ? "/api/admin/columns" : `/api/admin/columns/${columnId}`;
    const method = mode === "new" ? "POST" : "PUT";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error ?? "保存に失敗しました");
      return;
    }

    if (mode === "new") {
      router.push(`/admin/columns/edit/${data.column.id}`);
    } else {
      setSuccess("保存しました");
      if (status) set("status", status);
      setTimeout(() => setSuccess(""), 3000);
    }
  }

  const inputClass =
    "w-full rounded-xl border border-pink-light bg-base px-4 py-3 text-sm text-text-main outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent";
  const labelClass = "block text-sm font-medium text-text-main";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* エラー・成功 */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}
      {success && (
        <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          {success}
        </div>
      )}

      {/* タイトル */}
      <div>
        <label className={labelClass}>
          タイトル <span className="text-accent">*</span>
        </label>
        <input
          type="text"
          value={values.title}
          onChange={(e) => onTitleChange(e.target.value)}
          required
          className={`${inputClass} mt-1.5`}
          placeholder="例：片思い中の彼に送るべきLINEとは"
        />
      </div>

      {/* スラッグ */}
      <div>
        <label className={labelClass}>
          スラッグ（URL）<span className="text-accent">*</span>
        </label>
        <div className="mt-1.5 flex items-center gap-2">
          <span className="shrink-0 text-xs text-text-sub">/columns/</span>
          <input
            type="text"
            value={values.slug}
            onChange={(e) => set("slug", e.target.value)}
            required
            pattern="[a-z0-9-]+"
            className={inputClass}
            placeholder="kataomoi-line"
          />
        </div>
        <p className="mt-1 text-xs text-text-sub">半角英数字とハイフン（-）のみ使用できます</p>
      </div>

      {/* カテゴリ */}
      <div>
        <label className={labelClass}>カテゴリ</label>
        <select
          value={values.category}
          onChange={(e) => set("category", e.target.value as typeof values.category)}
          className={`${inputClass} mt-1.5`}
        >
          {COLUMN_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* アイキャッチURL */}
      <div>
        <label className={labelClass}>アイキャッチ画像URL</label>
        <input
          type="url"
          value={values.eyecatch_url}
          onChange={(e) => set("eyecatch_url", e.target.value)}
          className={`${inputClass} mt-1.5`}
          placeholder="https://..."
        />
        {values.eyecatch_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={values.eyecatch_url}
            alt="preview"
            className="mt-2 h-32 w-full rounded-xl object-cover"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
        )}
      </div>

      {/* 本文 */}
      <div>
        <label className={labelClass}>
          本文（HTML）<span className="text-accent">*</span>
        </label>
        <textarea
          value={values.content}
          onChange={(e) => set("content", e.target.value)}
          required
          rows={18}
          className={`${inputClass} mt-1.5 font-mono text-xs leading-relaxed`}
          placeholder="<p>本文をHTMLで書いてください</p>&#10;<h2>見出し</h2>&#10;<p>段落テキスト</p>"
        />
        <p className="mt-1 text-xs text-text-sub">
          h2・h3・p・ul・ol・li・blockquote・strong・a タグが使えます
        </p>
      </div>

      {/* SEO */}
      <div className="space-y-4 rounded-2xl border border-pink-light p-5">
        <p className="font-heading text-sm font-bold text-text-main">SEO設定</p>
        <div>
          <label className={labelClass}>SEOタイトル</label>
          <input
            type="text"
            value={values.seo_title}
            onChange={(e) => set("seo_title", e.target.value)}
            className={`${inputClass} mt-1.5`}
            placeholder="空欄の場合はタイトルを使用"
          />
        </div>
        <div>
          <label className={labelClass}>SEO説明文</label>
          <textarea
            value={values.seo_description}
            onChange={(e) => set("seo_description", e.target.value)}
            rows={2}
            className={`${inputClass} mt-1.5`}
            placeholder="120〜160文字程度の説明文"
          />
        </div>
      </div>

      {/* 関連診断 */}
      <div>
        <label className={labelClass}>関連する診断</label>
        <select
          value={values.related_diagnosis}
          onChange={(e) => set("related_diagnosis", e.target.value)}
          className={`${inputClass} mt-1.5`}
        >
          <option value="">なし</option>
          {diagnoses.map((d) => (
            <option key={d.id} value={d.id}>
              {d.title}
            </option>
          ))}
        </select>
        <p className="mt-1 text-xs text-text-sub">記事下に「おすすめの診断」として表示されます</p>
      </div>

      {/* 保存ボタン */}
      <div className="sticky bottom-0 -mx-4 border-t border-pink-light bg-base/95 px-4 py-4 backdrop-blur-sm sm:-mx-0 sm:rounded-2xl sm:border sm:px-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-2">
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                values.status === "published"
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {values.status === "published" ? "公開中" : "下書き"}
            </span>
          </div>
          <div className="flex gap-3">
            {values.status === "published" ? (
              <button
                type="button"
                disabled={loading}
                onClick={(e) => handleSubmit(e as unknown as React.FormEvent, "draft")}
                className="btn-secondary !w-auto px-4 py-2.5 text-sm"
              >
                下書きに戻す
              </button>
            ) : (
              <button
                type="button"
                disabled={loading}
                onClick={(e) => handleSubmit(e as unknown as React.FormEvent, "published")}
                className="btn-secondary !w-auto px-4 py-2.5 text-sm"
              >
                公開する
              </button>
            )}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary !w-auto px-6 py-2.5 text-sm"
            >
              {loading ? "保存中..." : mode === "new" ? "下書き保存" : "上書き保存"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
