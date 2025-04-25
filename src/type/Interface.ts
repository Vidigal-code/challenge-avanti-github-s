export type Language = 'en' | 'pt' | 'es'; // Supported languages

export interface GitHubUserData {
    login: string;
    name: string | null;
    avatar_url: string;
    bio: string | null;
    followers: number;
    following: number;
    public_repos: number;
    html_url: string;
}
