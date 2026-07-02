"use client";

import { useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";

interface FormData {
  name: string;
  email: string;
  subject: string;
  content: string;
  honeypot: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  content?: string;
}

const fieldClass =
  "w-full border bg-white px-5 py-3 text-sm text-text-main outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20 placeholder:text-text-sub/40";

export default function ContactForm() {
  const { t } = useLanguage();
  const ct = t.contact;

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    content: "",
    honeypot: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState(false);

  const validate = (): boolean => {
    const next: FormErrors = {};
    if (!formData.name.trim()) next.name = ct.errorName;
    if (!formData.email.trim()) {
      next.email = ct.errorEmail;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      next.email = ct.errorEmailInvalid;
    }
    if (!formData.subject.trim()) next.subject = ct.errorSubject;
    if (!formData.content.trim()) next.content = ct.errorContent;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setServerError(false);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          content: formData.content,
          honeypot: formData.honeypot,
        }),
      });
      if (!res.ok) throw new Error("failed");
      setSubmitted(true);
    } catch {
      setServerError(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border-2 border-pink-strong bg-gradient-to-br from-pink-pale to-base px-8 py-12 text-center shadow-sm">
        <div className="mb-3 text-3xl">&#x1F497;</div>
        <p className="text-lg font-medium text-accent">{ct.successTitle}</p>
        <p className="mt-2 text-sm text-text-sub">{ct.successBody}</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border-2 border-pink-light bg-base px-8 py-8 shadow-sm">
      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        {/* honeypot: hidden from real users, bots will fill it */}
        <div aria-hidden="true" className="absolute -left-[9999px]">
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={formData.honeypot}
            onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-accent">
            {ct.name}
            <span className="ml-1 text-xs text-red-400">{ct.required}</span>
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={`${fieldClass} rounded-full border-pink-light ${errors.name ? "border-red-300" : ""}`}
          />
          {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-accent">
            {ct.email}
            <span className="ml-1 text-xs text-red-400">{ct.required}</span>
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={`${fieldClass} rounded-full border-pink-light ${errors.email ? "border-red-300" : ""}`}
          />
          {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-accent">
            {ct.subject}
            <span className="ml-1 text-xs text-red-400">{ct.required}</span>
          </label>
          <input
            type="text"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            className={`${fieldClass} rounded-full border-pink-light ${errors.subject ? "border-red-300" : ""}`}
          />
          {errors.subject && <p className="mt-1 text-xs text-red-400">{errors.subject}</p>}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-accent">
            {ct.content}
            <span className="ml-1 text-xs text-red-400">{ct.required}</span>
          </label>
          <textarea
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            rows={8}
            className={`${fieldClass} resize-none rounded-2xl border-pink-light ${errors.content ? "border-red-300" : ""}`}
          />
          {errors.content && <p className="mt-1 text-xs text-red-400">{errors.content}</p>}
        </div>

        {serverError && (
          <p className="text-center text-sm text-red-400">{ct.errorAlert}</p>
        )}

        <div className="flex justify-center pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="rounded-full bg-accent px-20 py-3 text-sm font-medium text-white shadow-md transition-all hover:opacity-90 hover:shadow-pink-strong/40 disabled:opacity-60"
          >
            {submitting ? ct.submitting : ct.submit}
          </button>
        </div>
      </form>
    </div>
  );
}
