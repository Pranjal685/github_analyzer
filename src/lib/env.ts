// ============================================
// Environment Variable Validation
// ============================================
// Validates required env vars at import time.
// If any are missing, logs a clear warning.

interface EnvConfig {
    GITHUB_TOKEN: string;
    OPENROUTER_API_KEY: string;
    AI_MODEL: string;
}

function getEnvVar(name: string, fallback?: string): string {
    const value = process.env[name];
    if (!value && !fallback) {
        console.error(
            `⚠️  Missing environment variable: ${name}. Add it to your .env.local file.`
        );
        return "";
    }
    return value || fallback || "";
}

/**
 * Validated environment configuration.
 * Import this instead of accessing process.env directly.
 */
export const env: EnvConfig = {
    GITHUB_TOKEN: getEnvVar("GITHUB_TOKEN"),
    OPENROUTER_API_KEY: getEnvVar("OPENROUTER_API_KEY"),
    AI_MODEL: getEnvVar("AI_MODEL", "openai/gpt-3.5-turbo"),
};

/**
 * Check if all required env vars are set.
 * Returns an array of missing variable names.
 */
export function validateEnv(): string[] {
    const missing: string[] = [];
    if (!env.GITHUB_TOKEN) missing.push("GITHUB_TOKEN");
    if (!env.OPENROUTER_API_KEY) missing.push("OPENROUTER_API_KEY");
    return missing;
}
