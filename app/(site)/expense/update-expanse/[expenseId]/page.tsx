"use client";
import {
    Calendar,
    DollarSign,
    FileText,
    Receipt,
    Save,
    User,
} from "lucide-react";
import Container from "@/components/Container";
import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import Spinner from "@/components/Spinner";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {
    IExpenseUpdateDto,
    ExpenseCategory,
    PaymentMode,
    ExpenseStatus,
} from "@/modules/expenses/interfaces";
import { getExpenseByIdAsync, updateExpenseAsync } from "@/modules/expenses/api";

const UpdateExpense = () => {
    const params = useParams();
    const router = useRouter();
    const expenseId = params?.expenseId as string;

    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(false);

    const [expense, setExpense] = useState<IExpenseUpdateDto>({
        expenseName: "",
        amount: undefined,
        expenseDate: undefined,
        expenseCategory: undefined,
        paymentMode: undefined,
        expenseStatus: undefined,
        receiptNumber: "",
        notes: "",
        approvedBy: "",
    });

    // ── Fetch existing expense ──────────────────────────────
    useEffect(() => {
        if (!expenseId) return;

        const fetchExpense = async () => {
            try {
                setIsFetching(true);
                const response = await getExpenseByIdAsync(expenseId);

                if (response.success) {
                    const e = response.data;
                    setExpense({
                        expenseName: e.expenseName,
                        amount: e.amount,
                        expenseDate: new Date(e.expenseDate),
                        expenseCategory: e.expenseCategory,
                        paymentMode: e.paymentMode,
                        expenseStatus: e.expenseStatus,
                        receiptNumber: e.receiptNumber ?? "",
                        notes: e.notes ?? "",
                        approvedBy: e.approvedBy ?? "",
                    });
                } else {
                    toast.error(response.message);
                }
            } catch {
                toast.error("Failed to load expense.");
            } finally {
                setIsFetching(false);
            }
        };

        fetchExpense();
    }, [expenseId]);

    const isFormInvalid = () =>
        expense.expenseName === "" || (expense.amount ?? 0) <= 0;

    const handleChange = <K extends keyof IExpenseUpdateDto>(
        name: K,
        value: any,
    ) => {
        setExpense((prev) => {
            if (name === "expenseDate") {
                return { ...prev, [name]: value ? new Date(value) : undefined };
            }
            if (name === "amount") {
                return { ...prev, [name]: value === "" ? undefined : Number(value) };
            }
            return { ...prev, [name]: value };
        });
    };

    const formatDate = (date?: Date) => {
        if (!date) return "";
        return new Date(date).toISOString().split("T")[0];
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const response = await updateExpenseAsync(expenseId, expense);

            if (response.success) {
                toast.success(response.message || "Expense updated successfully!");
                router.push(
                    `/expense/get-expense-by-id/${expenseId}`,
                );
            } else {
                toast.error(response.message || "Failed to update expense.");
            }
        } catch {
            toast.error("Something went wrong.");
        } finally {
            setIsLoading(false);
        }
    };

    if (isFetching) return <Spinner />;

    return (
        <Container className="py-8">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
                    <div className="bg-linear-to-r from-red-500 via-dark-color to-red-900 p-8 md:p-10">
                        <div className="flex flex-col md:flex-row md:items-center gap-5">
                            <div className="bg-white/20 backdrop-blur-md p-5 rounded-3xl w-fit">
                                <DollarSign className="w-12 h-12 text-white" />
                            </div>
                            <div>
                                <h1 className="text-lg md:text-3xl font-extrabold text-white tracking-wide">
                                    Update Expense
                                </h1>
                                <p className="text-red-100 mt-2 text-sm">
                                    Update only the fields you want to change.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 md:p-10">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                <CustomInput
                                    label="Expense Name *"
                                    Icon={FileText}
                                    type="text"
                                    className="custom-input w-full"
                                    placeholder="e.g Engine Oil Purchase"
                                    value={expense.expenseName ?? ""}
                                    onChange={(v) => handleChange("expenseName", v)}
                                />

                                <CustomInput
                                    label="Amount (PKR) *"
                                    Icon={DollarSign}
                                    type="number"
                                    className="custom-input w-full"
                                    value={expense.amount ?? ""}
                                    onChange={(v) => handleChange("amount", v)}
                                />

                                <CustomInput
                                    label="Expense Date"
                                    Icon={Calendar}
                                    type="date"
                                    className="custom-input w-full"
                                    value={formatDate(expense.expenseDate)}
                                    onChange={(v) => handleChange("expenseDate", v)}
                                />

                                {/* Category */}
                                <div className="flex items-center gap-6 px-4 py-4 bg-gray-color hover:bg-gray-300 rounded-2xl group transition-all duration-300">
                                    <div className="bg-red-100 text-red-600 p-4 rounded-full group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                                        <FileText className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1">
                                        <label className="text-md font-medium text-slate-500 group-hover:text-red-500 block mb-1">
                                            Category
                                        </label>
                                        <Select
                                            value={expense.expenseCategory}
                                            onValueChange={(v) =>
                                                handleChange("expenseCategory", v as ExpenseCategory)
                                            }
                                        >
                                            <SelectTrigger className="w-full bg-white">
                                                <SelectValue placeholder="Select Category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {Object.values(ExpenseCategory).map((cat) => (
                                                    <SelectItem key={cat} value={cat}>
                                                        {cat}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                {/* Payment Mode */}
                                <div className="flex items-center gap-6 px-4 py-4 bg-gray-color hover:bg-gray-300 rounded-2xl group transition-all duration-300">
                                    <div className="bg-red-100 text-red-600 p-4 rounded-full group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                                        <DollarSign className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1">
                                        <label className="text-md font-medium text-slate-500 group-hover:text-red-500 block mb-1">
                                            Payment Mode
                                        </label>
                                        <Select
                                            value={expense.paymentMode}
                                            onValueChange={(v) =>
                                                handleChange("paymentMode", v as PaymentMode)
                                            }
                                        >
                                            <SelectTrigger className="w-full bg-white">
                                                <SelectValue placeholder="Select Payment Mode" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {Object.values(PaymentMode).map((mode) => (
                                                    <SelectItem key={mode} value={mode}>
                                                        {mode}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                {/* Status */}
                                <div className="flex items-center gap-6 px-4 py-4 bg-gray-color hover:bg-gray-300 rounded-2xl group transition-all duration-300">
                                    <div className="bg-red-100 text-red-600 p-4 rounded-full group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                                        <FileText className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1">
                                        <label className="text-md font-medium text-slate-500 group-hover:text-red-500 block mb-1">
                                            Status
                                        </label>
                                        <Select
                                            value={expense.expenseStatus}
                                            onValueChange={(v) =>
                                                handleChange("expenseStatus", v as ExpenseStatus)
                                            }
                                        >
                                            <SelectTrigger className="w-full bg-white">
                                                <SelectValue placeholder="Select Status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {Object.values(ExpenseStatus).map((s) => (
                                                    <SelectItem key={s} value={s}>
                                                        {s}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <CustomInput
                                    label="Receipt Number (optional)"
                                    Icon={Receipt}
                                    type="text"
                                    className="custom-input w-full"
                                    value={expense.receiptNumber ?? ""}
                                    onChange={(v) => handleChange("receiptNumber", v)}
                                />

                                <CustomInput
                                    label="Approved By (optional)"
                                    Icon={User}
                                    type="text"
                                    className="custom-input w-full"
                                    placeholder="Enter approver name"
                                    value={expense.approvedBy ?? ""}
                                    onChange={(v) => handleChange("approvedBy", v)}
                                />

                                <CustomInput
                                    label="Notes (optional)"
                                    Icon={FileText}
                                    type="text"
                                    className="custom-input w-full"
                                    value={expense.notes ?? ""}
                                    onChange={(v) => handleChange("notes", v)}
                                />
                            </div>

                            <div className="flex justify-end gap-3">
                                <CustomButton
                                    buttonColor="bg-slate-400"
                                    buttonHoverColor="bg-slate-600"
                                    type="button"
                                    onClickFunction={() => router.back()}
                                    className="w-1/2 md:w-1/6 text-white py-2 rounded-full transition"
                                    buttonText="Cancel"
                                />
                                <CustomButton
                                    buttonColor="bg-red-500"
                                    buttonHoverColor="bg-red-900"
                                    type="submit"
                                    disabled={isFormInvalid() || isLoading}
                                    icon={<Save />}
                                    className="w-1/2 md:w-1/6 text-white py-2 rounded-full transition"
                                    buttonText={isLoading ? "Updating..." : "Update Expense"}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default UpdateExpense;