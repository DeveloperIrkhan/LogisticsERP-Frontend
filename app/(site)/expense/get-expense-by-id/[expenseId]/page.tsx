"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
    DollarSign,
    Calendar,
    FileText,
    Receipt,
    Truck,
    User,
    Edit,
    Trash,
    CheckCircle,
    XCircle,
} from "lucide-react";
import Spinner from "@/components/Spinner";
import Container from "@/components/Container";
import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import Link from "next/link";
import { toast } from "react-toastify";
import {
    getExpenseByIdAsync,
    deleteExpenseAsync,
    approveExpenseAsync,
    rejectExpenseAsync,
} from "@/modules/expenses/api";
import {
    IExpenseResponseDto,
    ExpenseStatus,
    getExpenseStatusStyle,
    getExpenseCategoryStyle,
} from "@/modules/expenses/interfaces";
import MidModal from "@/components/Modals/MidModal";

const GetExpenseById = () => {
    const params = useParams();
    const router = useRouter();
    const expenseId = params?.expenseId as string;

    const [isLoading, setIsLoading] = useState(false);
    const [expense, setExpense] = useState<IExpenseResponseDto | null>(null);

    // Modal states
    const [deleteModal, setDeleteModal] = useState(false);
    const [approveModal, setApproveModal] = useState(false);
    const [rejectModal, setRejectModal] = useState(false);

    // Action states
    const [isDeleting, setIsDeleting] = useState(false);
    const [isActioning, setIsActioning] = useState(false);
    const [actionBy, setActionBy] = useState("");

    const customStyle =
        "absolute -top-12 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap";

    const fetchExpense = async () => {
        try {
            setIsLoading(true);
            const response = await getExpenseByIdAsync(expenseId);
            if (response.success) {
                setExpense(response.data);
            } else {
                toast.error(response.message);
            }
        } catch {
            toast.error("Failed to load expense.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!expenseId) return;
        fetchExpense();
    }, [expenseId]);

    // ── Actions ──────────────────────────────────────────────
    const handleDelete = async () => {
        try {
            setIsDeleting(true);
            const res = await deleteExpenseAsync(expenseId);
            if (res.success) {
                toast.success("Expense deleted successfully!");
                router.push("/expense/view-all");
            } else {
                toast.error(res.message);
            }
        } catch {
            toast.error("Something went wrong.");
        } finally {
            setIsDeleting(false);
            setDeleteModal(false);
        }
    };

    const handleApprove = async () => {
        if (!actionBy.trim()) {
            toast.error("Please enter your name.");
            return;
        }
        try {
            setIsActioning(true);
            const res = await approveExpenseAsync(expenseId, actionBy);
            if (res.success) {
                toast.success(res.message || "Expense approved!");
                setExpense(res.data);
                setApproveModal(false);
                setActionBy("");
            } else {
                toast.error(res.message);
            }
        } catch {
            toast.error("Something went wrong.");
        } finally {
            setIsActioning(false);
        }
    };

    const handleReject = async () => {
        if (!actionBy.trim()) {
            toast.error("Please enter your name.");
            return;
        }
        try {
            setIsActioning(true);
            const res = await rejectExpenseAsync(expenseId, actionBy);
            if (res.success) {
                toast.success(res.message || "Expense rejected!");
                setExpense(res.data);
                setRejectModal(false);
                setActionBy("");
            } else {
                toast.error(res.message);
            }
        } catch {
            toast.error("Something went wrong.");
        } finally {
            setIsActioning(false);
        }
    };

    if (isLoading) {
        return (
            <Container className="flex justify-center items-center min-h-[70vh]">
                <Spinner />
            </Container>
        );
    }

    if (!expense) {
        return (
            <Container className="flex justify-center items-center min-h-[70vh]">
                <p className="text-xl text-red-500 font-semibold">
                    Expense not found
                </p>
            </Container>
        );
    }

    const details = [
        {
            label: "Expense Name",
            value: expense.expenseName,
            icon: FileText,
        },
        {
            label: "Amount",
            value: `PKR ${expense.amount.toLocaleString()}`,
            icon: DollarSign,
        },
        {
            label: "Expense Date",
            value: new Date(expense.expenseDate).toDateString(),
            icon: Calendar,
        },
        {
            label: "Category",
            value: expense.expenseCategory,
            icon: FileText,
        },
        {
            label: "Payment Mode",
            value: expense.paymentMode,
            icon: DollarSign,
        },
        {
            label: "Status",
            value: expense.expenseStatus,
            icon: FileText,
        },
        {
            label: "User ID",
            value: expense.userId,
            icon: User,
        },
        {
            label: "Vehicle ID",
            value: expense.vehicleId,
            icon: Truck,
        },
        {
            label: "Receipt Number",
            value: expense.receiptNumber,
            icon: Receipt,
        },
        {
            label: "Approved By",
            value: expense.approvedBy,
            icon: User,
        },
        {
            label: "Notes",
            value: expense.notes,
            icon: FileText,
        },
        {
            label: "Created At",
            value: new Date(expense.createdAt).toDateString(),
            icon: Calendar,
        },
    ];

    return (
        <Container className="py-8">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200">

                    {/* Header */}
                    <div className="bg-linear-to-r from-red-600 via-red-700 to-red-900 p-8 md:p-10">
                        <div className="flex flex-col md:flex-row md:items-center gap-5">
                            <div className="bg-white/20 backdrop-blur-md p-5 rounded-3xl w-fit">
                                <DollarSign className="w-12 h-12 text-white" />
                            </div>
                            <div className="flex-1">
                                <h1 className="text-4xl font-extrabold text-white tracking-wide">
                                    Expense Details
                                </h1>
                                <p className="text-red-100 mt-2 text-sm break-all">
                                    {expense.expenseId}
                                </p>
                            </div>
                            <div className="flex gap-3">
                                <span
                                    className={`text-sm font-bold px-4 py-2 rounded-xl ${getExpenseCategoryStyle(expense.expenseCategory)}`}
                                >
                                    {expense.expenseCategory}
                                </span>
                                <span
                                    className={`text-sm font-bold px-4 py-2 rounded-xl border ${getExpenseStatusStyle(expense.expenseStatus)}`}
                                >
                                    {expense.expenseStatus}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 bg-gray-100 md:p-10">

                        {/* ── Action Buttons ──────────────────────────── */}
                        <div className="flex flex-wrap gap-3 p-4 mb-6 bg-white rounded-3xl shadow-md border border-slate-200">

                            {/* Approve — only when Pending */}
                            {expense.expenseStatus === ExpenseStatus.Pending && (
                                <button
                                    onClick={() => { setApproveModal(true); setActionBy(""); }}
                                    className="flex items-center gap-2 bg-red-100 hover:bg-red-700 text-red-600 hover:text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow-md transition-colors"
                                >
                                    <CheckCircle className="w-5 h-5" />
                                    Approve
                                </button>
                            )}

                            {/* Reject — when Pending or Approved */}
                            {(expense.expenseStatus === ExpenseStatus.Pending ||
                                expense.expenseStatus === ExpenseStatus.Approved) && (
                                    <button
                                        onClick={() => { setRejectModal(true); setActionBy(""); }}
                                        className="flex items-center gap-2  bg-red-100 hover:bg-red-700 text-red-600 hover:text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow-md transition-colors"
                                    >
                                        <XCircle className="w-5 h-5" />
                                        Reject
                                    </button>
                                )}

                            <Link
                                href={`/expense/update-expanse/${expense.expenseId}`}
                                className="flex items-center gap-2  bg-red-100 hover:bg-red-700 text-red-600 hover:text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow-md transition-all"
                            >
                                <Edit className="w-5 h-5" />
                                Edit
                            </Link>

                            <button
                                onClick={() => setDeleteModal(true)}
                                className="flex items-center gap-2 bg-red-100 hover:bg-red-600 text-red-600 hover:text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow-md transition-all"
                            >
                                <Trash className="w-5 h-5" />
                                Delete
                            </button>
                        </div>

                        {/* ── Details Grid ─────────────────────────────── */}
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {details.map((item, index) => {
                                const Icon = item.icon;
                                return (
                                    <div
                                        key={index}
                                        className="group uppercase relative overflow-hidden rounded-2xl border border-slate-200 bg-linear-to-br from-gray-color to-slate-100 p-6 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                                    >
                                        <div className="absolute top-0 right-0 w-24 h-24 bg-gray-color rounded-full blur-3xl opacity-40"></div>
                                        <div className="relative flex gap-4">
                                            <div className="bg-red-100 text-red-600 p-4 rounded-2xl group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                                                <Icon className="w-6 h-6" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm text-slate-500 font-medium">
                                                    {item.label}
                                                </p>
                                                <h3 className="text-lg font-bold text-slate-800 mt-1 wrap-break-word">
                                                    {item.value || "-"}
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* ── Footer Banner ─────────────────────────────── */}
                        <div className="mt-10 rounded-3xl bg-linear-to-r from-red-600 to-red-900 p-8 shadow-xl">
                            <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                                <div>
                                    <h2 className="text-3xl uppercase font-bold text-white">
                                        {expense.expenseName}
                                    </h2>
                                    <p className="text-red-100 mt-2 text-lg">
                                        {expense.expenseCategory} — {expense.paymentMode}
                                    </p>
                                </div>
                                <div className="bg-white/20 backdrop-blur-lg px-8 py-5 rounded-2xl border border-white/20">
                                    <p className="text-red-100 text-sm">Total Amount</p>
                                    <h3 className="text-2xl font-bold text-white">
                                        PKR {expense.amount.toLocaleString()}
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Delete Modal ──────────────────────────────────── */}
            <MidModal
                isOpen={deleteModal}
                title="Delete Expense"
                description="Are you sure you want to delete this expense? This action cannot be undone."
                itemName={`${expense.expenseName} — PKR ${expense.amount.toLocaleString()}`}
                isDeleting={isDeleting}
                onConfirm={handleDelete}
                onClose={() => setDeleteModal(false)}
            />

            {/* ── Approve Modal ─────────────────────────────────── */}
            {approveModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 p-8"
                    >
                        <div className="flex items-center gap-3 mb-5">
                            <div className="bg-green-100 text-green-600 p-3 rounded-2xl">
                                <CheckCircle className="w-6 h-6" />
                            </div>
                            <h2 className="text-xl font-bold text-slate-800">
                                Approve Expense
                            </h2>
                        </div>
                        <p className="text-sm text-slate-500 mb-4">
                            You are approving:{" "}
                            <span className="font-semibold text-slate-700">
                                {expense.expenseName} — PKR {expense.amount.toLocaleString()}
                            </span>
                        </p>
                        <CustomInput
                            label="Approved By *"
                            Icon={User}
                            type="text"
                            className="custom-input w-full"
                            placeholder="Enter your name"
                            value={actionBy}
                            onChange={(v) => setActionBy(v)}
                        />
                        <div className="flex gap-3 mt-6">
                            <CustomButton
                                buttonText="Cancel"
                                buttonColor="bg-slate-200"
                                buttonHoverColor="bg-slate-300"
                                className="flex-1 text-slate-700 py-2.5 rounded-full"
                                onClickFunction={() => setApproveModal(false)}
                            />
                            <CustomButton
                                buttonText={isActioning ? "Approving..." : "Approve"}
                                buttonColor="bg-green-600"
                                buttonHoverColor="bg-green-700"
                                className="flex-1 text-white py-2.5 rounded-full"
                                onClickFunction={handleApprove}
                                disabled={isActioning}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* ── Reject Modal ──────────────────────────────────── */}
            {rejectModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 p-8"
                    >
                        <div className="flex items-center gap-3 mb-5">
                            <div className="bg-orange-100 text-orange-600 p-3 rounded-2xl">
                                <XCircle className="w-6 h-6" />
                            </div>
                            <h2 className="text-xl font-bold text-slate-800">
                                Reject Expense
                            </h2>
                        </div>
                        <p className="text-sm text-slate-500 mb-4">
                            You are rejecting:{" "}
                            <span className="font-semibold text-slate-700">
                                {expense.expenseName} — PKR {expense.amount.toLocaleString()}
                            </span>
                        </p>
                        <CustomInput
                            label="Rejected By *"
                            Icon={User}
                            type="text"
                            className="custom-input w-full"
                            placeholder="Enter your name"
                            value={actionBy}
                            onChange={(v) => setActionBy(v)}
                        />
                        <div className="flex gap-3 mt-6">
                            <CustomButton
                                buttonText="Cancel"
                                buttonColor="bg-slate-200"
                                buttonHoverColor="bg-slate-300"
                                className="flex-1 text-slate-700 py-2.5 rounded-full"
                                onClickFunction={() => setRejectModal(false)}
                            />
                            <CustomButton
                                buttonText={isActioning ? "Rejecting..." : "Reject"}
                                buttonColor="bg-orange-500"
                                buttonHoverColor="bg-orange-600"
                                className="flex-1 text-white py-2.5 rounded-full"
                                onClickFunction={handleReject}
                                disabled={isActioning}
                            />
                        </div>
                    </div>
                </div>
            )}
        </Container>
    );
};

export default GetExpenseById;