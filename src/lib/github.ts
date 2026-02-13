import { Octokit } from "@octokit/rest";
import type { GitHubProfileData, GitHubRepo, GitHubUser } from "./types";

// ============================================
// GitHub Data Fetcher
// ============================================

const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
});

/**
 * Fetches the raw README.md content for a given repository.
 * Returns null if no README exists or an error occurs.
 */
async function fetchReadmeContent(
    owner: string,
    repo: string
): Promise<string | null> {
    try {
        const { data } = await octokit.repos.getReadme({
            owner,
            repo,
            mediaType: { format: "raw" },
        });
        // When using raw format, data is returned as a string
        return data as unknown as string;
    } catch (error) {
        // Cast error to check status safely
        const err = error as { status?: number; message?: string };
        if (err.status === 404) {
            // Repo has no README, ignore properly
            return null;
        }
        // Log other errors (rate limits, 500s) as warnings
        console.warn(`[GitHub] Failed to fetch README for ${owner}/${repo}:`, err.message || String(error));
        return null;
    }
}

/**
 * Fetches comprehensive GitHub profile data for a given username.
 *
 * Pipeline:
 * 1. Fetch user profile info
 * 2. Fetch top 6 repos (sorted by most recently updated)
 * 3. For each repo, fetch the README.md content
 * 4. Return consolidated GitHubProfileData object
 */
export async function fetchGitHubData(
    username: string
): Promise<GitHubProfileData> {
    // --- Step 1: Fetch User Profile ---
    const { data: rawUser } = await octokit.users.getByUsername({
        username,
    });

    const user: GitHubUser = {
        login: rawUser.login,
        name: rawUser.name ?? null,
        bio: rawUser.bio ?? null,
        avatar_url: rawUser.avatar_url,
        html_url: rawUser.html_url,
        company: rawUser.company ?? null,
        location: rawUser.location ?? null,
        blog: rawUser.blog ?? null,
        twitter_username: rawUser.twitter_username ?? null,
        followers: rawUser.followers,
        following: rawUser.following,
        public_repos: rawUser.public_repos,
        public_gists: rawUser.public_gists,
        created_at: rawUser.created_at,
        updated_at: rawUser.updated_at,
    };

    // --- Step 2: Fetch Top 6 Repositories (sorted by updated_at) ---
    const { data: rawRepos } = await octokit.repos.listForUser({
        username,
        sort: "updated",
        direction: "desc",
        per_page: 6,
        type: "owner", // Only repos they own, not forks they haven't modified
    });

    // --- Step 3: Fetch README for each repo (in parallel) ---
    const repos: GitHubRepo[] = await Promise.all(
        rawRepos.map(async (repo) => {
            const readmeContent = await fetchReadmeContent(username, repo.name);

            return {
                name: repo.name,
                full_name: repo.full_name,
                html_url: repo.html_url,
                description: repo.description ?? null,
                language: repo.language ?? null,
                stargazers_count: repo.stargazers_count ?? 0,
                forks_count: repo.forks_count ?? 0,
                watchers_count: repo.watchers_count ?? 0,
                open_issues_count: repo.open_issues_count ?? 0,
                topics: repo.topics ?? [],
                created_at: repo.created_at ?? "",
                updated_at: repo.updated_at ?? "",
                pushed_at: repo.pushed_at ?? "",
                homepage: repo.homepage ?? null,
                fork: repo.fork ?? false,
                has_wiki: repo.has_wiki ?? false,
                has_pages: repo.has_pages ?? false,
                license: repo.license
                    ? { name: repo.license.name ?? "", spdx_id: repo.license.spdx_id ?? "" }
                    : null,
                readme_content: readmeContent,
            } satisfies GitHubRepo;
        })
    );

    // --- Step 4: Return consolidated data ---
    return {
        user,
        repos,
        fetchedAt: new Date().toISOString(),
    };
}
