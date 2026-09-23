import type { LoveTestResultDetail, LoveTestResultDetails } from "./types";
import { part1 } from "./part1";
import { part2 } from "./part2";
import { part3 } from "./part3";
import { part4 } from "./part4";
import { part5 } from "./part5";
import { part6 } from "./part6";
import { part7 } from "./part7";
import { part8 } from "./part8";

export type { LoveTestResultDetail, LoveTestResultDetails };

const allDetails: Record<string, LoveTestResultDetails> = {
  ...part1,
  ...part2,
  ...part3,
  ...part4,
  ...part5,
  ...part6,
  ...part7,
  ...part8,
};

/** テストの全結果（A〜D）の深掘り解説。無ければ空オブジェクト。 */
export function getLoveTestResultDetails(slug: string): LoveTestResultDetails {
  return allDetails[slug] ?? {};
}
