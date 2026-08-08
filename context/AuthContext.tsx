"use client";
import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import { useRouter } from "next/navigation";
import { setOnAuthFailure } from "@/lib/axios";

import {
    loginAsync,
    logoutAsync,
    refreshTokenAsync,
    registerAsync,
} from "@/modules/auth/api";
import { ApiResponse, IAuthResponseDto, ILoginDto, IRegisterDto, IUserAuthDto } from "@/modules/auth/types";
import { tokenStore } from "@/lib/tokenStore";

interface AuthContextValue {
    user: IUserAuthDto | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (dto: ILoginDto) => Promise<ApiResponse<IAuthResponseDto>>;
    register: (dto: FormData) => Promise<ApiResponse<unknown>>;
    logout: () => Promise<void>;
    hasRole: (...roles: string[]) => boolean;
    markPasswordChanged: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const [user, setUser] = useState<IUserAuthDto | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const clearSession = useCallback(() => {
        tokenStore.clearAll();
        setUser(null);
    }, []);

    // Silent refresh on first load using the persisted refresh token.
    useEffect(() => {
        // show cached user immediately so the UI doesn't flash "logged out"
        const cached = tokenStore.getCachedUser<IUserAuthDto>();
        if (cached) setUser(cached);

        const rehydrate = async () => {
            const refreshToken = tokenStore.getRefreshToken();
            if (!refreshToken) {
                setIsLoading(false);
                return;
            }

            try {
                const res = await refreshTokenAsync(refreshToken);
                console.log(res)
                if (res.success) {
                    tokenStore.setAccessToken(res.data.accessToken);
                    tokenStore.setRefreshToken(res.data.refreshToken);
                    tokenStore.setCachedUser(res.data.user);
                    setUser(res.data.user);
                } else {
                    clearSession();
                }
            } catch {
                clearSession();
            } finally {
                setIsLoading(false);
            }
        };

        rehydrate();
        // register a global 401/refresh-failure handler for the axios interceptor
        setOnAuthFailure(() => {
            clearSession();
            router.push("/auth/login");
        });
        return () => setOnAuthFailure(null);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const login = async (dto: ILoginDto) => {
        const res = await loginAsync(dto);
        if (res.success) {
            tokenStore.setAccessToken(res.data.accessToken);
            tokenStore.setRefreshToken(res.data.refreshToken);
            tokenStore.setCachedUser(res.data.user);
            setUser(res.data.user);
        }
        return res;
    };

    const register = async (dto: FormData) => {
        return registerAsync(dto);
    };

    const logout = async () => {
        const refreshToken = tokenStore.getRefreshToken();
        try {
            if (refreshToken) await logoutAsync(refreshToken);
        } catch {
            // even if the API call fails, clear the local session
        }
        clearSession();
        router.push("/auth/login");
    };

    const hasRole = (...roles: string[]) => {
        if (!user) return false;
        return roles.includes(user.roleName);
    };
const markPasswordChanged = () => {
    setUser((prev) => {
        if (!prev) return prev;
        const updated = { ...prev, mustChangePassword: false };
        tokenStore.setCachedUser(updated);
        return updated;
    });
};

    return (
        <AuthContext.Provider
            value={{ user, isLoading, isAuthenticated: !!user, login, register, logout, hasRole, markPasswordChanged }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
    return ctx;
};
