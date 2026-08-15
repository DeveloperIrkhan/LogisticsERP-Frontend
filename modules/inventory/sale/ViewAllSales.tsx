"use client";
import Spinner from "@/components/Spinner";
import { useEffect, useState } from "react";
import { Tag, ArrowRight, Plus, Calendar, User, Wallet } from "lucide-react";
import { toast } from "react-toastify";
import Link from "next/link";
import {
    IItemSaleResponseDto,
    ItemTransactionStatus,
    getSaleStatusStyle,
} from "./interfaces";
import { getAllSalesAsync } from "./api";

const statusTabs: (ItemTransactionStatus | "All")[] = [
    "All",
    ItemTransactionStatus.Pending,
    ItemTransactionStatus.Approved,
    ItemTransactionStatus.Paid,
    ItemTransactionStatus.Rejected,
];

const ViewAllSales = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [sales, setSales] = useState<IItemSaleResponseDto[]>([]);
    const [filter, setFilter] = useState<ItemTransactionStatus | "All">("All");
    useEffect(() => {
        const fetchSales = async () => {
            try {
                console.log("response");
                setIsLoading(true);
                const response = await getAllSalesAsync();
                console.log("response", response);
                if (response.success) {
                    setSales(response.data);
                } else {
                    toast.error(response.message);
                }
            } catch {
                console.error("Error fetching sales");
            } finally {
                setIsLoading(false);
            }
        };
        fetchSales();
    }, []);

    if (isLoading) return <Spinner />;

    const filtered =
        filter === "All" ? sales : sales.filter((s) => s.status === filter);

    const totalAmount = sales.reduce((sum, s) => sum + s.totalAmount, 0);

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-color via-red-200 to-gray-color p-6">
            <div className="max-w-7xl mx-auto">

                
                <div className="bg-linear-to-r mb-4 from-red-500 via-dark-color rounded-t-xl to-red-900 p-3 md:p-5">
                    <div className="flex  md:flex-row md:items-center justify-between gap-5">
                        <div>
                            <h1 className="text-xl text-white font-extrabold">Item Sales</h1>
                            <p className="mt-2 text-white text-lg">
                                Track used oil, scrap parts, and other items sold
                            </p>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="bg-white/20 shadow-lg border border-white/20 rounded-2xl px-6 py-4">
                                <p className="text-white text-sm">Total Record(s)</p>
                                <h2 className="text-3xl font-bold text-white">
                                   {sales.length}
                                </h2>
                            </div>
                            <div className="bg-white/20 shadow-lg border border-white/20 rounded-2xl px-6 py-4">
                                <p className="text-white text-sm">Total Amount</p>
                                <h2 className="text-3xl font-bold text-white">
                                    Rs. {totalAmount.toLocaleString()}
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filter Tabs + Add Button */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <div className="flex flex-wrap gap-2">
                        {statusTabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setFilter(tab)}
                                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${filter === tab
                                    ? "bg-red-600 text-white shadow-md"
                                    : "bg-white text-slate-600 border border-slate-200 hover:border-red-300"
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <Link
                        href="/inventory/item-sale/create"
                        className="flex items-center gap-2 bg-linear-to-r from-red-500 to-red-800 hover:from-red-600 hover:to-red-900 text-white px-5 py-3 rounded-xl font-semibold shadow-lg transition-all"
                    >
                        <Plus className="w-5 h-5" />
                        Record Sale
                    </Link>
                </div>

                {/* Empty State */}
                {filtered.length === 0 && (
                    <div className="bg-white rounded-3xl shadow-lg p-16 text-center border border-slate-200">
                        <div className="bg-red-100 text-red-600 w-24 h-24 rounded-full flex items-center justify-center mx-auto">
                            <Tag className="w-12 h-12" />
                        </div>
                        <h2 className="text-3xl font-bold text-slate-800 mt-6">
                            No Sales Found
                        </h2>
                        <p className="text-slate-500 mt-3 text-lg">
                            {filter === "All"
                                ? "No sale records yet."
                                : `No sales with status "${filter}".`}
                        </p>
                    </div>
                )}

                {/* Sale Grid */}
                {filtered.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                        {filtered.map((s) => (
                            <div
                                key={s.itemSaleId}
                                className="group relative overflow-hidden rounded-xl bg-white border border-slate-200 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
                            >
                                <div className="bg-linear-to-r p-2 from-red-400 to-red-900 group-hover:from-red-900 group-hover:to-red-400 transition-colors duration-400">
                                    <div className="flex w-full items-center justify-between px-4">
                                        <span
                                            className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${getSaleStatusStyle(s.status)}`}
                                        >
                                            {s.status}
                                        </span>
                                        <span className="text-white text-xs">{s.paymentMode}</span>
                                    </div>
                                </div>

                                <div className="absolute top-0 right-0 w-40 h-40 bg-red-100 rounded-full blur-3xl opacity-40"></div>

                                <div className="relative p-6">
                                    <h2 className="text-xl font-bold text-slate-800">
                                        {s.itemName}
                                    </h2>
                                    <p className="text-sm text-slate-500 mt-1">
                                        {s.quantity} unit(s) @ Rs. {s.unitPrice.toLocaleString()}
                                    </p>

                                    <div className="mt-5 space-y-3">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-slate-400" />
                                            <p className="text-sm text-slate-600">
                                                {new Date(s.saleDate).toLocaleDateString()}
                                            </p>
                                        </div>
                                        {s.buyerName && (
                                            <div className="flex items-center gap-2">
                                                <User className="w-4 h-4 text-slate-400" />
                                                <p className="text-sm text-slate-600">{s.buyerName}</p>
                                            </div>
                                        )}
                                        <div className="flex items-center gap-2">
                                            <Wallet className="w-4 h-4 text-slate-400" />
                                            <p className="text-sm font-semibold text-red-600">
                                                Rs. {s.totalAmount.toLocaleString()}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-6 flex justify-between items-center">
                                        <Link
                                            href={`/inventory/item-sale/get-by-id/${s.itemSaleId}`}
                                            className="group/button flex items-center gap-2 bg-linear-to-r from-red-400 to-red-900 hover:from-red-600 hover:to-red-900 text-white px-4 py-2 font-medium rounded-md shadow-lg transition-all duration-600"
                                        >
                                            View Details
                                            <ArrowRight className="w-4 h-4 group-hover/button:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ViewAllSales;
