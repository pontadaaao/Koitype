"use client";

import Link from "next/link";

type ContentItem =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "pLink"; before: string; linkText: string; after: string }
  | {
      type: "intLink";
      before: string;
      linkText: string;
      href: string;
      after: string;
    }
  | {
      type: "extLink";
      before: string;
      linkText: string;
      href: string;
      after: string;
    };

type Section = {
  heading: string;
  items: ContentItem[];
};

type Props = {
  title: string;
  updated: string;
  intro: string;
  sections: Section[];
};

export default function LegalPageContent({ title, updated, intro, sections }: Props) {
  return (
    <main className="pp">
      <h1 className="pp__title">{title}</h1>
      <p className="pp__updated">{updated}</p>
      <p>{intro}</p>
      {sections.map((section) => (
        <section key={section.heading}>
          <h2 className="pp__h2">{section.heading}</h2>
          {section.items.map((item, i) => {
            if (item.type === "ul") {
              return (
                <ul key={i}>
                  {item.items.map((li) => (
                    <li key={li}>{li}</li>
                  ))}
                </ul>
              );
            }
            if (item.type === "pLink") {
              return (
                <p key={i}>
                  {item.before}
                  <Link href="/contact">{item.linkText}</Link>
                  {item.after}
                </p>
              );
            }
            if (item.type === "intLink") {
              return (
                <p key={i}>
                  {item.before}
                  <Link href={item.href}>{item.linkText}</Link>
                  {item.after}
                </p>
              );
            }
            if (item.type === "extLink") {
              return (
                <p key={i}>
                  {item.before}
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.linkText}
                  </a>
                  {item.after}
                </p>
              );
            }
            return <p key={i}>{item.text}</p>;
          })}
        </section>
      ))}
    </main>
  );
}
