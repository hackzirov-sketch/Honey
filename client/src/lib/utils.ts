import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { API_BASE_URL } from "@/config/api.config";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const DEFAULT_AVATAR = "/default-avatar.png";

export function resolveAvatar(src?: string | null): string {
  if (!src) return DEFAULT_AVATAR;
  if (src.startsWith("http") || src.startsWith("data:") || src.startsWith("blob:")) return src;
  if (src.startsWith("/default-avatar")) return src;
  return `${API_BASE_URL}${src}`;
}
