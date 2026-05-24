import { customAlphabet } from "nanoid";

export const generateId = (): string => {
  const nanoId = customAlphabet("abcdefghijklmnopqrstuvwxyz", 10);
  return nanoId();
}