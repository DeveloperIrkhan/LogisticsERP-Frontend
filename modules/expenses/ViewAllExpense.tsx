"use client";
import Spinner from "@/components/Spinner";
import { useEffect, useState } from "react";
import {
    DollarSign,
    Calendar,
    Receipt,
    ArrowRight,
    Plus,
    FileText,
} from "lucide-react";
import { toast } from "react-toastify";
import Link from "next/link";
import {
    IExpenseResponseDto,
    ExpenseStatus,
    getExpenseStatusStyle,
    getExpenseCategoryStyle,
} from "./interfaces";
import { getAllExpensesAsync } from "./api";

const ViewAllExpense = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [expenses, setExpenses] = useState<IExpenseResponseDto[]>([]);
    const [filter, setFilter] = useState<ExpenseStatus | "All">("All");

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                setIsLoading(true);
                const response = await getAllExpensesAsync();
                if (response.success) {
                    setExpenses(response.data);
                    toast.success(response.message);
                } else {
                    toast.error(response.message);
                }
            } catch {
                console.error("Error fetching expenses");
            } finally {
                setIsLoading(false);
            }
        };
        fetchExpenses();
    }, []);

    if (isLoading) return <Spinner />;

    const filtered =
        filter === "All"
            ? expenses
            : expenses.filter((e) => e.expenseStatus === filter);

    const totalAmount = filtered.reduce((sum, e) => sum + e.amount, 0);

    const counts = {
        all: expenses.length,
        pending: expenses.filter((e) => e.expenseStatus === ExpenseStatus.Pending).length,
        approved: expenses.filter((e) => e.expenseStatus === ExpenseStatus.Approved).length,
        paid: expenses.filter((e) => e.expenseStatus === ExpenseStatus.Paid).length,
        rejected: expenses.filter((e) => e.expenseStatus === ExpenseStatus.Rejected).length,
    };

    const filterButtons = [
        { label: "All", value: "All", count: counts.all, color: "bg-slate-600" },
        { label: "Pending", value: ExpenseStatus.Pending, count: counts.pending, color: "bg-yellow-500" },
        { label: "Approved", value: ExpenseStatus.Approved, count: counts.approved, color: "bg-green-500" },
        { label: "Paid", value: ExpenseStatus.Paid, count: counts.paid, color: "bg-blue-500" },
        { label: "Rejected", value: ExpenseStatus.Rejected, count: counts.rejected, color: "bg-red-500" },
    ];

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-color via-red-200 to-gray-color p-6">
            <div className="max-w-7xl mx-auto">

                {/* Header Banner */}
                <div className="mb-10 px-4 py-7 rounded-t-2xl bg-linear-to-r from-red-400 to-red-900">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-5">
                        <div>
                            <h1 className="text-3xl text-white font-extrabold">Expenses</h1>
                            <p className="mt-2 text-white text-lg">
                                Track and manage all fleet expenses
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="bg-white/20 shadow-lg border border-white/20 rounded-2xl px-6 py-4">
                                <p className="text-white text-sm">Total Records</p>
                                <h2 className="text-3xl font-bold text-white">
                                    {expenses.length}
                                </h2>
                            </div>
                            <div className="bg-white/20 shadow-lg border border-white/20 rounded-2xl px-6 py-4">
                                <p className="text-white text-sm">Filtered Total</p>
                                <h2 className="text-3xl font-bold text-white">
                                    PKR {totalAmount.toLocaleString()}
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
                                onClick={() => setFilter(btn.value as ExpenseStatus | "All")}
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
                        href="/expense/create-expense"
                        className="flex items-center gap-2 bg-linear-to-r from-red-500 to-red-800 hover:from-red-600 hover:to-red-900 text-white px-5 py-3 rounded-xl font-semibold shadow-lg transition-all"
                    >
                        <Plus className="w-5 h-5" />
                        Add Expense
                    </Link>
                </div>

                {/* Empty State */}
                {filtered.length === 0 && (
                    <div className="bg-white rounded-3xl shadow-lg p-16 text-center border border-slate-200">
                        <div className="bg-red-100 text-red-600 w-24 h-24 rounded-full flex items-center justify-center mx-auto">
                            <DollarSign className="w-12 h-12" />
                        </div>
                        <h2 className="text-3xl font-bold text-slate-800 mt-6">
                            No Expenses Found
                        </h2>
                        <p className="text-slate-500 mt-3 text-lg">
                            {filter === "All"
                                ? "No expenses have been recorded yet."
                                : `No expenses with status "${filter}".`}
                        </p>
                    </div>
                )}

                {/* Expense Grid */}
                {filtered.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                        {filtered.map((expense) => {
                            const expenseDate = new Date(expense.expenseDate).toDateString();

                            return (
                                <div
                                    key={expense.expenseId}
                                    className="group relative overflow-hidden rounded-xl bg-white border border-slate-200 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
                                >
                                    <div className="bg-linear-to-r p-2 from-red-400 to-red-900 group-hover:from-red-900 group-hover:to-red-400 transition-colors duration-400">
                                        <div className="flex w-full items-center justify-between px-4">
                                            <span
                                                className={`text-xs font-semibold px-2.5 py-1 rounded-md ${getExpenseCategoryStyle(expense.expenseCategory)}`}
                                            >
                                                {expense.expenseCategory}
                                            </span>
                                            <span
                                                className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${getExpenseStatusStyle(expense.expenseStatus)}`}
                                            >
                                                {expense.expenseStatus}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="absolute top-0 right-0 w-40 h-40 bg-red-100 rounded-full blur-3xl opacity-40"></div>

                                    <div className="relative p-6">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h2 className="text-xl font-bold text-slate-800">
                                                    {expense.expenseName}
                                                </h2>
                                                <p className="text-sm text-slate-500 mt-1">
                                                    Payment Mode: {expense.paymentMode}
                                                </p>
                                            </div>
                                            <div className="bg-red-100 text-red-600 p-4 rounded-2xl">
                                                <div>
                                                    <p className="text-xs text-slate-500">Amount</p>
                                                    <p className="text-lg font-bold text-red-600">
                                                        PKR {expense.amount.toLocaleString()}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-5 space-y-3">
                                            <div className="flex justify-between">
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="w-4 h-4 text-slate-400" />
                                                    <div>
                                                        <p className="text-xs text-slate-500">Date</p>
                                                        <p className="text-sm font-semibold text-slate-700">
                                                            {expenseDate}
                                                        </p>
                                                    </div>
                                                </div>
                                                {expense.receiptNumber && (
                                                    <div className="flex items-center gap-2">
                                                        <Receipt className="w-4 h-4 text-slate-400" />
                                                        <div>
                                                            <p className="text-xs text-slate-500">Receipt</p>
                                                            <p className="text-sm font-semibold text-slate-700">
                                                                {expense.receiptNumber}
                                                            </p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            {expense.notes && (
                                                <div className="flex items-center gap-2">
                                                    <FileText className="w-4 h-4 text-slate-400" />
                                                    <p className="text-sm text-slate-500 truncate">
                                                        {expense.notes}
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        <div className="mt-6 flex justify-between items-center">
                                            <Link
                                                href={`/expense/get-expense-by-id/${expense.expenseId}`}
                                                className="group/button flex items-center gap-2 bg-linear-to-r from-red-400 to-red-900 hover:from-red-600 hover:to-red-900 text-white px-4 py-2 font-medium rounded-md shadow-lg transition-all duration-600"
                                            >
                                                View Details
                                                <ArrowRight className="w-4 h-4 group-hover/button:translate-x-1 transition-transform" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ViewAllExpense;