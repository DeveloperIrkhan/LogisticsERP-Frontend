"use client";
import Spinner from "@/components/Spinner";
import { useEffect, useState } from "react";
import {
    Package,
    Plus,
} from "lucide-react";
import { toast } from "react-toastify";
import Link from "next/link";

import { getAllItemsAsync } from "./api";
import { ItemResponseDto } from "./types";
import ItemCard from "./ItemCard";
const ViewAllItems = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [items, setItems] = useState<ItemResponseDto[]>([]);
    const [filter, setFilter] = useState<"All" | "Active" | "LowStock">("All");

    useEffect(() => {
        const fetchItems = async () => {
            try {
                setIsLoading(true);
                const response = await getAllItemsAsync();
                if (response.success) {
                    setItems(response.data);
                } else {
                    toast.error(response.message);
                }
            } catch {
                console.error("Error fetching items");
            } finally {
                setIsLoading(false);
            }
        };
        fetchItems();
    }, []);

    if (isLoading) return <Spinner />;

    const isLowStock = (item: ItemResponseDto) =>
        item.reorderLevel != null && item.currentStock <= item.reorderLevel;

    const filtered = items.filter((i) => {
        if (filter === "Active") return i.isActive;
        if (filter === "LowStock") return isLowStock(i);
        return true;
    });

    const counts = {
        all: items.length,
        active: items.filter((i) => i.isActive).length,
        lowStock: items.filter((i) => isLowStock(i)).length,
    };

    const filterButtons = [
        { label: "All", value: "All", count: counts.all, color: "bg-slate-600" },
        { label: "Active", value: "Active", count: counts.active, color: "bg-green-500" },
        { label: "Low Stock", value: "LowStock", count: counts.lowStock, color: "bg-red-500" },
    ];

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-color via-red-200 to-gray-color p-6">
            <div className="max-w-7xl mx-auto">

                {/* Header Banner */}
                <div className="mb-10 px-4 py-7 rounded-t-2xl bg-linear-to-r from-red-400 to-red-900">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-5">
                        <div>
                            <h1 className="text-xl text-white font-extrabold">Item Catalog</h1>
                            <p className="mt-2 text-white text-lg">
                                Spare parts, lubricants, and other stocked items
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="bg-white/20 shadow-lg border border-white/20 rounded-2xl px-6 py-4">
                                <p className="text-white text-sm">Total Items</p>
                                <h2 className="text-3xl font-bold text-white">
                                    {items.length}
                                </h2>
                            </div>
                            <div className="bg-white/20 shadow-lg border border-white/20 rounded-2xl px-6 py-4">
                                <p className="text-white text-sm">Low Stock</p>
                                <h2 className="text-3xl font-bold text-white">
                                    {counts.lowStock}
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filter Tabs + Add Button */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <div className="flex flex-wrap gap-2">
                        {filterButtons.map((btn) => (
                            <button
                                key={btn.value}
                                onClick={() => setFilter(btn.value as "All" | "Active" | "LowStock")}
                                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${filter === btn.value
                                    ? `${btn.color} text-white shadow-md`
                                    : "bg-white text-slate-600 border border-slate-200 hover:border-red-300"
                                    }`}
                            >
                                {btn.label}
                                <span
                                    className={`text-xs px-1.5 py-0.5 rounded-full ${filter === btn.value
                                        ? "bg-white/25 text-white"
                                        : "bg-slate-100 text-slate-500"
                                        }`}
                                >
                                    {btn.count}
                                </span>
                            </button>
                        ))}
                    </div>

                    <Link
                        href="/inventory/item/add-item"
                        className="flex items-center gap-2 bg-linear-to-r from-red-500 to-red-800 hover:from-red-600 hover:to-red-900 text-white px-5 py-3 rounded-xl font-semibold shadow-lg transition-all"
                    >
                        <Plus className="w-5 h-5" />
                        Add Item
                    </Link>
                </div>

                {/* Empty State */}
                {filtered.length === 0 && (
                    <div className="bg-white rounded-3xl shadow-lg p-16 text-center border border-slate-200">
                        <div className="bg-red-100 text-red-600 w-24 h-24 rounded-full flex items-center justify-center mx-auto">
                            <Package className="w-12 h-12" />
                        </div>
                        <h2 className="text-3xl font-bold text-slate-800 mt-6">
                            No Items Found
                        </h2>
                        <p className="text-slate-500 mt-3 text-lg">
                            {filter === "All"
                                ? "No items have been added to the catalog yet."
                                : `No items match "${filter}".`}
                        </p>
                    </div>
                )}

                {/* Item Grid */}
                {filtered.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                        {filtered.map((item) => {
                            return <ItemCard key={item.itemId} Item={item} />

                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ViewAllItems;
