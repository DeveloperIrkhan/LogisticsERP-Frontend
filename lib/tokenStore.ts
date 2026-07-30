const REFRESH_TOKEN_KEY = "prcs_refresh_token";
const USER_CACHE_KEY = "prcs_cached_user";

let accessToken: string | null = null;

export const tokenStore = {
  getAccessToken: (): string | null => accessToken,
  setAccessToken: (token: string | null) => {
    accessToken = token;
  },

  getRefreshToken: (): string | null => {
    // if (typeof window === "undefined") return null;
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },
  setRefreshToken: (token: string | null) => {
    if (typeof window === "undefined") return;
    if (token) localStorage.setItem(REFRESH_TOKEN_KEY, token);
    else localStorage.removeItem(REFRESH_TOKEN_KEY);
  },

  getCachedUser: <T,>(): T | null => {
    // if (typeof window === "undefined") return null;
    const raw = localStorage.getItem(USER_CACHE_KEY);
    return raw ? (JSON.parse(raw) as T) : null;
  },
  setCachedUser: (user: unknown | null) => {
    if (typeof window === "undefined") return;
    if (user) localStorage.setItem(USER_CACHE_KEY, JSON.stringify(user));
    else localStorage.removeItem(USER_CACHE_KEY);
  },

  clearAll: () => {
    accessToken = null;
    if (typeof window === "undefined") return;
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_CACHE_KEY);
  },
};
