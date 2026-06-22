"use client"
import { AlertTriangle, X } from 'lucide-react';
import React, { useEffect } from 'react'
import CustomButton from '../CustomButton';

interface IModel {
    isOpen: boolean,
    className?: string;
    title?: string;
    description?: string;
    itemName?: string;
    isDeleting?: boolean;
    onConfirm: () => void;
    onClose: () => void;
}
const MidModal = ({
    isOpen,
    title = "Delete Item",
    description = "Are you sure you want to delete this item? This action cannot be undone.",
    itemName,
    isDeleting = false,
    onConfirm,
    onClose,
}: IModel) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && !isDeleting) onClose();
        };
        if (isOpen) document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, isDeleting, onClose]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            onClick={() => !isDeleting && onClose()}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    disabled={isDeleting}
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 disabled:opacity-40 transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="p-8 flex flex-col items-center text-center">
                    {/* Icon */}
                    <div className="bg-red-100 text-red-600 p-4 rounded-full mb-5">
                        <AlertTriangle className="w-8 h-8" />
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-bold text-slate-800">{title}</h2>

                    {/* Description */}
                    <p className="text-sm text-slate-500 mt-2">
                        {description}
                    </p>

                    {/* Item name highlight */}
                    {itemName && (
                        <div className="mt-4 w-full bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                            <p className="text-sm font-semibold text-red-700 truncate">
                                {itemName}
                            </p>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-3 mt-7 w-full">
                        <CustomButton
                            buttonText="Cancel"
                            buttonColor="bg-slate-200"
                            buttonHoverColor="bg-slate-300"
                            className="flex-1 text-slate-700! py-2.5 rounded-full"
                            onClickFunction={onClose}
                            disabled={isDeleting}
                        />
                        <CustomButton
                            buttonText={isDeleting ? "Deleting..." : "Delete"}
                            buttonColor="bg-red-600"
                            buttonHoverColor="bg-red-900"
                            className="flex-1 text-white py-2.5 rounded-full"
                            onClickFunction={onConfirm}
                            disabled={isDeleting}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MidModal
