"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import BirthdayForm, { type BirthdayInput } from "@/components/BirthdayForm";
import ResultView from "@/components/ResultView";
import {
  buildResultSearchParams,
  calcCompatibility,
  parseBirthdaysFromParams,
  type CompatibilityResult,
} from "@/lib/compatibility";
import { siteUrl } from "@/lib/site";

type Screen = "form" | "result";

interface CompatibilitySectionProps {
  embedded?: boolean;
}

const emptyBirthday = (): BirthdayInput => ({
  year: "",
  month: "",
  day: "",
});

export default function CompatibilitySection({
  embedded = false,
}: CompatibilitySectionProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [screen, setScreen] = useState<Screen>("form");
  const [self, setSelf] = useState<BirthdayInput>(emptyBirthday());
  const [partner, setPartner] = useState<BirthdayInput>(emptyBirthday());
  const [result, setResult] = useState<CompatibilityResult | null>(null);

  const shouldAutoStart = !embedded && searchParams.get("start") === "1";

  const restoreFromUrl = useCallback(() => {
    const birthdays = parseBirthdaysFromParams(searchParams);
    if (!birthdays) return;

    const computed = calcCompatibility(birthdays.a, birthdays.b);
    setSelf({
      year: birthdays.a.year,
      month: birthdays.a.month,
      day: birthdays.a.day,
    });
    setPartner({
      year: birthdays.b.year,
      month: birthdays.b.month,
      day: birthdays.b.day,
    });
    setResult(computed);
    setScreen("result");
  }, [searchParams]);

  useEffect(() => {
    if (!embedded) {
      restoreFromUrl();
    }
  }, [embedded, restoreFromUrl]);

  const handleSubmit = () => {
    if (
      self.year === "" ||
      self.month === "" ||
      self.day === "" ||
      partner.year === "" ||
      partner.month === "" ||
      partner.day === ""
    ) {
      return;
    }

    const a = {
      year: Number(self.year),
      month: Number(self.month),
      day: Number(self.day),
    };
    const b = {
      year: Number(partner.year),
      month: Number(partner.month),
      day: Number(partner.day),
    };

    const computed = calcCompatibility(a, b);
    setResult(computed);
    setScreen("result");

    if (!embedded) {
      const params = buildResultSearchParams(a, b, computed);
      router.replace(`/compatibility?${params.toString()}`, { scroll: false });
    }
  };

  const handleRetry = () => {
    setScreen("form");
    setResult(null);
    setSelf(emptyBirthday());
    setPartner(emptyBirthday());

    if (!embedded) {
      router.replace(
        shouldAutoStart ? "/compatibility?start=1" : "/compatibility",
        { scroll: false }
      );
    }
  };

  const shareUrl =
    result &&
    self.year !== "" &&
    self.month !== "" &&
    self.day !== "" &&
    partner.year !== "" &&
    partner.month !== "" &&
    partner.day !== ""
      ? siteUrl(
          `/compatibility?${buildResultSearchParams(
            {
              year: Number(self.year),
              month: Number(self.month),
              day: Number(self.day),
            },
            {
              year: Number(partner.year),
              month: Number(partner.month),
              day: Number(partner.day),
            },
            result
          ).toString()}`
        )
      : siteUrl("/compatibility");

  return (
    <>
      {screen === "form" && (
        <>
          {!shouldAutoStart && (
            <div className="mb-6 overflow-hidden rounded-2xl border border-pink-light">
              <Image
                src="/compatibility-hero.png"
                alt="誕生日でわかる ふたりの相性診断"
                width={1024}
                height={576}
                className="h-auto w-full"
                priority={embedded}
              />
            </div>
          )}

          <BirthdayForm
            self={self}
            partner={partner}
            onSelfChange={setSelf}
            onPartnerChange={setPartner}
            onSubmit={handleSubmit}
          />
        </>
      )}

      {screen === "result" && result && (
        <ResultView result={result} shareUrl={shareUrl} onRetry={handleRetry} />
      )}
    </>
  );
}
