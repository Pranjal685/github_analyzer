import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function extractUsername(input: string): string | null {
    if (!input || typeof input !== "string") return null;

    let clean = input.trim();

    // Remove trailing slash
    if (clean.endsWith("/")) {
        clean = clean.slice(0, -1);
    }

    // Handle full URLs
    if (clean.includes("github.com/")) {
        const parts = clean.split("github.com/");
        const potentialUsername = parts[parts.length - 1];
        if (potentialUsername) {
            clean = potentialUsername;
        }
    }

    // Basic username validation (alphanumeric + hyphens, 1-39 chars)
    // GitHub usernames cannot start or end with a hyphen
    // https://github.com/shinnn/github-username-regex
    const usernameRegex = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;

    if (usernameRegex.test(clean)) {
        return clean;
    }

    return null;
}
