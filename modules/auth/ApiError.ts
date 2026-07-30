import { AxiosError } from "axios";

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

/**
 * Axios throws for any non-2xx response. Our backend still sends a proper
 * ApiResponse body ({ success: false, message: "..." }) on 400/401/404 etc —
 * this pulls that body back out so callers can just check `res.success`
 * instead of needing a try/catch around every API call.
 */
export function extractApiResponse<T>(
  error: unknown,
  fallbackMessage = "Something went wrong. Please try again.",
): ApiResponse<T> {
  const axiosError = error as AxiosError<ApiResponse<T>>;

  const data = axiosError?.response?.data;
  if (data && typeof data === "object" && "message" in data) {
    return {
      success: false,
      message: (data as ApiResponse<T>).message || fallbackMessage,
      data: (data as ApiResponse<T>).data ?? (null as unknown as T),
    };
  }

  // No response at all (network error, CORS, server down, etc.)
  return { success: false, message: fallbackMessage, data: null as unknown as T };
}