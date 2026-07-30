import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { tokenStore } from "./tokenStore";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "https://localhost:7104/api";

const api = axios.create({
  baseURL: BASE_URL ?? "https://localhost:7104/api",
  headers: {
    "Content-Type": "application/json",
  },
});
const rawApi = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// ── Request interceptor: attach the access token ────────────────
api.interceptors.request.use((config) => {
  const token = tokenStore.getAccessToken();
  if (token) {
    config.headers = config.headers ?? [];
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ── Response interceptor: on 401, refresh once and retry ────────
let isRefreshing = false;
let pendingQueue: Array<{
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null) => {
  pendingQueue.forEach(({ resolve, reject }) => {
    if (token) resolve(token);
    else reject(error);
  });
  pendingQueue = [];
};

// Called by AuthContext on logout / hard failure to clear session state everywhere.
let onAuthFailure: (() => void) | null = null;
export const setOnAuthFailure = (fn: (() => void) | null) => {
  onAuthFailure = fn;
};

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    const isAuthEndpoint =
      originalRequest?.url?.includes("/Auth/login") ||
      originalRequest?.url?.includes("/Auth/register") ||
      originalRequest?.url?.includes("/Auth/refresh-token");

    if (
      error.response?.status !== 401 ||
      isAuthEndpoint ||
      originalRequest?._retry
    ) {
      return Promise.reject(error);
    }

    const refreshToken = tokenStore.getRefreshToken();
    if (!refreshToken) {
      onAuthFailure?.();
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    if (isRefreshing) {
      // queue up behind the in-flight refresh call
      return new Promise((resolve, reject) => {
        pendingQueue.push({
          resolve: (token: string) => {
            originalRequest.headers = originalRequest.headers ?? {};
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(api(originalRequest));
          },
          reject,
        });
      });
    }

    isRefreshing = true;
    try {
      const { data } = await rawApi.post("/Auth/refresh-token", {
        refreshToken,
      });
      const newAccessToken = data?.data?.accessToken as string;
      const newRefreshToken = data?.data?.refreshToken as string;

      tokenStore.setAccessToken(newAccessToken);
      tokenStore.setRefreshToken(newRefreshToken);

      processQueue(null, newAccessToken);

      originalRequest.headers = originalRequest.headers ?? {};
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return api(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError, null);
      tokenStore.clearAll();
      onAuthFailure?.();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);

export default api;
