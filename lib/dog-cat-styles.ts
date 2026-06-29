export function getTypeAccent(resultId: string) {
  if (resultId === "dog" || resultId === "dogcat") {
    return {
      ring: "ring-dog/25",
      label: "text-dog",
      icon: "text-dog" as const,
      badge: "bg-dog-light text-dog border border-dog/20",
      heroBlob: "bg-dog-light/70",
      gradient: "from-dog-light to-pink-pale",
    };
  }
  if (resultId === "cat" || resultId === "catdog") {
    return {
      ring: "ring-cat/25",
      label: "text-cat",
      icon: "text-cat" as const,
      badge: "bg-cat-light text-cat border border-cat/20",
      heroBlob: "bg-cat-light/70",
      gradient: "from-cat-light to-pink-pale",
    };
  }
  return {
    ring: "ring-accent/25",
    label: "text-accent",
    icon: "text-accent" as const,
    badge: "bg-pink-pale text-accent border border-pink-light",
    heroBlob: "bg-pink-light/50",
    gradient: "from-pink-pale to-pink-light/30",
  };
}

export const TRAIT_CARD_STYLES = [
  "bg-pink-pale border-pink-light",
  "bg-dog-light/80 border-dog/15",
  "bg-cat-light/80 border-cat/15",
  "bg-sub-bg border-pink-light",
] as const;
