import Link from "next/link";

export type QuizContentType = {
  name: string;
  tagline?: string;
  description?: string;
  points?: string[];
  notes?: { label: string; text: string }[];
  tags?: string[];
};

export type QuizFaqItem = { q: string; a: string };

export type QuizRelatedLink = { href: string; label: string };

export interface QuizContentProps {
  title: string;
  aboutHeading: string;
  intro: string[];
  typesHeading: string;
  types: QuizContentType[];
  faq: QuizFaqItem[];
  related?: QuizRelatedLink[];
  accentColor?: string;
}

/**
 * Server-rendered editorial section shown below the interactive quiz.
 * Its purpose is to give crawlers (and users) substantial, unique body text
 * — an intro, the full list of result types, and an FAQ — that would
 * otherwise only appear after a user answers the quiz inside a client
 * component. Also emits FAQPage structured data.
 */
export default function QuizContent({
  title,
  aboutHeading,
  intro,
  typesHeading,
  types,
  faq,
  related,
  accentColor = "#F067A6",
}: QuizContentProps) {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <section className="bg-base px-4 pb-14 pt-2" aria-label={`${title}の詳しい解説`}>
      {faq.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <div className="mx-auto max-w-2xl space-y-10">
        {/* About */}
        <div>
          <h2 className="font-heading text-lg font-bold text-text-main sm:text-xl">
            {aboutHeading}
          </h2>
          <div className="mt-3 space-y-3">
            {intro.map((p, i) => (
              <p key={i} className="text-sm leading-relaxed text-text-sub">
                {p}
              </p>
            ))}
          </div>
        </div>

        {/* Result types */}
        {types.length > 0 && (
          <div>
            <h2 className="font-heading text-lg font-bold text-text-main sm:text-xl">
              {typesHeading}
            </h2>
            <div className="mt-4 space-y-4">
              {types.map((type, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-pink-light bg-base p-5 shadow-sm"
                >
                  <h3
                    className="font-heading text-base font-bold sm:text-lg"
                    style={{ color: accentColor }}
                  >
                    {type.name}
                  </h3>
                  {type.tagline && (
                    <p className="mt-1 text-sm font-medium text-text-main">
                      {type.tagline}
                    </p>
                  )}
                  {type.tags && type.tags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {type.tags.map((tag, j) => (
                        <span
                          key={j}
                          className="rounded-full border border-pink-light bg-pink-pale px-2.5 py-0.5 text-xs text-tag-text"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  {type.description && (
                    <p className="mt-2.5 text-sm leading-relaxed text-text-sub">
                      {type.description}
                    </p>
                  )}
                  {type.points && type.points.length > 0 && (
                    <ul className="mt-2.5 space-y-1.5">
                      {type.points.map((point, j) => (
                        <li
                          key={j}
                          className="flex gap-2 text-sm leading-relaxed text-text-sub"
                        >
                          <span aria-hidden style={{ color: accentColor }}>
                            ♡
                          </span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {type.notes &&
                    type.notes.map((note, j) => (
                      <p
                        key={j}
                        className="mt-2.5 text-sm leading-relaxed text-text-sub"
                      >
                        <span className="font-bold text-text-main">
                          {note.label}：
                        </span>
                        {note.text}
                      </p>
                    ))}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FAQ */}
        {faq.length > 0 && (
          <div>
            <h2 className="font-heading text-lg font-bold text-text-main sm:text-xl">
              よくある質問
            </h2>
            <div className="mt-4 space-y-3">
              {faq.map((item, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-pink-light bg-base p-5 shadow-sm"
                >
                  <p className="font-bold text-text-main">Q. {item.q}</p>
                  <p className="mt-2 text-sm leading-relaxed text-text-sub">
                    A. {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related links */}
        {related && related.length > 0 && (
          <div>
            <h2 className="font-heading text-lg font-bold text-text-main sm:text-xl">
              関連ページ
            </h2>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {related.map((link, i) => (
                <Link
                  key={i}
                  href={link.href}
                  className="rounded-full border border-pink-light bg-pink-pale px-4 py-2 text-sm font-medium text-accent transition-colors hover:bg-pink-light"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
