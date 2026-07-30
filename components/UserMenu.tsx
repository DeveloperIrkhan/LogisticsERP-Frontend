"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { LogIn, LogOut, User, KeyRound, ShieldCheck } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const UserMenu = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (!isAuthenticated || !user) {
        return (
            <Link
                href="/auth/login"
                className="flex items-center gap-2 bg-red-600 hover:bg-red-900 text-white px-6 py-3 rounded-full font-bold text-sm transition-colors duration-300"
            >
                <LogIn className="w-4 h-4" />
                Login
            </Link>
        );
    }

    return (
        <div className="relative" ref={ref}>
            <button
                onClick={() => setOpen((v) => !v)}
                className="flex items-center gap-3 bg-white/10 hover:bg-white/20 text-white px-4 py-2.5 rounded-full transition-colors duration-300"
            >
                <div className="bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold uppercase">
                    {user.fullName?.charAt(0) || user.userName?.charAt(0)}
                </div>
                <div className="text-left hidden lg:block">
                    <p className="text-sm font-semibold leading-tight">{user.fullName}</p>
                    <p className="text-xs text-white/60 leading-tight">{user.roleName}</p>
                </div>
            </button>

            {open && (
                <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50">
                    <div className="px-4 py-3 border-b border-slate-100">
                        <p className="text-sm font-semibold text-slate-800">{user.fullName}</p>
                        <p className="text-xs text-slate-500 truncate">{user.email}</p>
                    </div>

                    <Link
                        href="/auth/profile"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                    >
                        <User className="w-4 h-4" /> My Profile
                    </Link>

                    <Link
                        href="/auth/change-password"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                    >
                        <KeyRound className="w-4 h-4" /> Change Password
                    </Link>

                    {user.roleName === "Admin" && (
                        <>
                            <Link
                                href="/dashboard/users/pending-approvals"
                                onClick={() => setOpen(false)}
                                className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                            >
                                <ShieldCheck className="w-4 h-4" /> Pending Approvals
                            </Link>
                            <Link
                                href="/dashboard/users/view-all"
                                onClick={() => setOpen(false)}
                                className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                            >
                                <ShieldCheck className="w-4 h-4" /> All Users
                            </Link>
                            <Link
                                href="/dashboard/roles/view-all"
                                onClick={() => setOpen(false)}
                                className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                            >
                                <ShieldCheck className="w-4 h-4" /> Manage Roles
                            </Link>
                        </>
                    )}

                    <button
                        onClick={() => {
                            setOpen(false);
                            logout();
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors border-t border-slate-100"
                    >
                        <LogOut className="w-4 h-4" /> Logout
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserMenu;
