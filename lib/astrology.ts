export type Element = "火" | "地" | "風" | "水";

export type Sign = { name: string; element: Element };

const SIGN_TABLE: {
  name: string;
  element: Element;
  from: [number, number];
  to: [number, number];
}[] = [
  { name: "山羊座", element: "地", from: [12, 22], to: [1, 19] },
  { name: "水瓶座", element: "風", from: [1, 20], to: [2, 18] },
  { name: "魚座", element: "水", from: [2, 19], to: [3, 20] },
  { name: "牡羊座", element: "火", from: [3, 21], to: [4, 19] },
  { name: "牡牛座", element: "地", from: [4, 20], to: [5, 20] },
  { name: "双子座", element: "風", from: [5, 21], to: [6, 21] },
  { name: "蟹座", element: "水", from: [6, 22], to: [7, 22] },
  { name: "獅子座", element: "火", from: [7, 23], to: [8, 22] },
  { name: "乙女座", element: "地", from: [8, 23], to: [9, 22] },
  { name: "天秤座", element: "風", from: [9, 23], to: [10, 23] },
  { name: "蠍座", element: "水", from: [10, 24], to: [11, 22] },
  { name: "射手座", element: "火", from: [11, 23], to: [12, 21] },
];

export function getSign(month: number, day: number): Sign {
  for (const s of SIGN_TABLE) {
    if (s.from[0] === 12) {
      if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
        return { name: s.name, element: s.element };
      }
    } else if (month === s.from[0] && day >= s.from[1]) {
      return { name: s.name, element: s.element };
    } else if (month === s.to[0] && day <= s.to[1]) {
      return { name: s.name, element: s.element };
    }
  }
  return { name: SIGN_TABLE[0].name, element: SIGN_TABLE[0].element };
}

export function getSignByName(name: string): Sign | undefined {
  const found = SIGN_TABLE.find((s) => s.name === name);
  if (!found) return undefined;
  return { name: found.name, element: found.element };
}
