// ============================================
// In-Memory Sliding Window Rate Limiter
// ============================================
// No external dependencies. Tracks request timestamps per IP
// and enforces a maximum number of requests per time window.

interface RateLimitEntry {
    timestamps: number[];
}

const store = new Map<string, RateLimitEntry>();

// --- CONFIG ---
const MAX_REQUESTS = 10;       // Max requests per window
const WINDOW_MS = 60 * 1000;   // 1 minute window
const CLEANUP_INTERVAL = 5 * 60 * 1000; // Clean stale entries every 5 min

// Periodic cleanup to prevent memory leaks
setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of store.entries()) {
        // Remove entries with no recent activity
        if (entry.timestamps.length === 0 || entry.timestamps[entry.timestamps.length - 1] < now - WINDOW_MS * 2) {
            store.delete(key);
        }
    }
}, CLEANUP_INTERVAL);

export interface RateLimitResult {
    allowed: boolean;
    remaining: number;
    retryAfterMs: number | null;
}

/**
 * Check if a request from the given identifier (IP or key) is allowed.
 * Uses a sliding window algorithm.
 */
export function checkRateLimit(identifier: string): RateLimitResult {
    const now = Date.now();
    const windowStart = now - WINDOW_MS;

    let entry = store.get(identifier);
    if (!entry) {
        entry = { timestamps: [] };
        store.set(identifier, entry);
    }

    // Remove timestamps outside the current window
    entry.timestamps = entry.timestamps.filter((t) => t > windowStart);

    if (entry.timestamps.length >= MAX_REQUESTS) {
        // Rate limited — calculate when the oldest request in the window expires
        const oldestInWindow = entry.timestamps[0];
        const retryAfterMs = oldestInWindow + WINDOW_MS - now;

        return {
            allowed: false,
            remaining: 0,
            retryAfterMs: Math.max(0, retryAfterMs),
        };
    }

    // Allowed — record this request
    entry.timestamps.push(now);

    return {
        allowed: true,
        remaining: MAX_REQUESTS - entry.timestamps.length,
        retryAfterMs: null,
    };
}
