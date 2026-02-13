import type { GitHubProfileData } from "./types";

// ============================================
// Data Sanitizer — Strip useless fields before LLM
// ============================================
// Reduces token usage by 70-80% by keeping only
// the fields the AI prompt actually references.

const MAX_README_LENGTH = 2000;

/**
 * Regex patterns for content we want to strip from READMEs.
 * These add tokens but zero analytical value.
 */
const README_CLEANUP_PATTERNS: [RegExp, string][] = [
    // Base64 images: ![alt](data:image/...)
    [/!\[[^\]]*\]\(data:image\/[^)]+\)/g, ""],
    // SVG blocks
    [/<svg[\s\S]*?<\/svg>/gi, "[svg-removed]"],
    // Badge images: [![badge](https://img.shields.io/...)]
    [/\[!\[[^\]]*\]\(https?:\/\/img\.shields\.io[^)]*\)\]\([^)]*\)/g, ""],
    [/!\[[^\]]*\]\(https?:\/\/img\.shields\.io[^)]*\)/g, ""],
    // Other badge services
    [/!\[[^\]]*\]\(https?:\/\/(?:badges|badge)\.[^)]*\)/g, ""],
    // HTML comments
    [/<!--[\s\S]*?-->/g, ""],
    // Consecutive blank lines → single blank
    [/\n{3,}/g, "\n\n"],
];

function cleanReadme(raw: string): string {
    let cleaned = raw;
    for (const [pattern, replacement] of README_CLEANUP_PATTERNS) {
        cleaned = cleaned.replace(pattern, replacement);
    }
    // Truncate to limit
    if (cleaned.length > MAX_README_LENGTH) {
        cleaned = cleaned.slice(0, MAX_README_LENGTH) + "\n...[truncated]";
    }
    return cleaned.trim();
}

/**
 * Minimal profile shape sent to the LLM.
 * Only the fields referenced in the system prompt.
 */
export interface SanitizedProfile {
    user: {
        login: string;
        name: string | null;
        bio: string | null;
        company: string | null;
        blog: string | null;
        location: string | null;
        followers: number;
        following: number;
        public_repos: number;
        created_at: string;
    };
    repos: {
        name: string;
        description: string | null;
        language: string | null;
        stars: number;
        forks: number;
        topics: string[];
        homepage: string | null;
        license: string | null;
        fork: boolean;
        pushed_at: string;
        updated_at: string;
        has_readme: boolean;
        readme_excerpt: string | null;
    }[];
}

/**
 * Strips all unnecessary data from the GitHub profile before
 * sending it to the LLM. Reduces payload by ~70-80%.
 */
export function sanitizeProfileForAI(
    profileData: GitHubProfileData
): SanitizedProfile {
    return {
        user: {
            login: profileData.user.login,
            name: profileData.user.name,
            bio: profileData.user.bio,
            company: profileData.user.company,
            blog: profileData.user.blog,
            location: profileData.user.location,
            followers: profileData.user.followers,
            following: profileData.user.following,
            public_repos: profileData.user.public_repos,
            created_at: profileData.user.created_at,
        },
        repos: profileData.repos.map((repo) => ({
            name: repo.name,
            description: repo.description,
            language: repo.language,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            topics: repo.topics,
            homepage: repo.homepage,
            license: repo.license?.spdx_id || null,
            fork: repo.fork,
            pushed_at: repo.pushed_at,
            updated_at: repo.updated_at,
            has_readme: !!repo.readme_content,
            readme_excerpt: repo.readme_content
                ? cleanReadme(repo.readme_content)
                : null,
        })),
    };
}
