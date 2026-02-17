import type { GenderedText } from "@/types";

/**
 * Returns the appropriate label/speech string for the selected voice gender.
 * If the value is a plain string, it is returned as-is (neutral).
 */
export function getGenderedText(value: GenderedText, isFemale: boolean): string {
  if (typeof value === "string") return value;
  return isFemale ? value.f : value.m;
}
