"use client";
import {
    Calendar,
    FileText,
    Hash,
    Tag,
    Save,
    User,
    Wallet,
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

import { IItemSaleUpdateDto, PaymentMode } from "@/modules/itemSales/interfaces";
import { getSaleByIdAsync, updateSaleAsync } from "@/modules/itemSales/api";

const UpdateSale = () => {
    const params = useParams();
    const router = useRouter();
    const saleId = params?.saleId as string;

    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const [status, setStatus] = useState<string>("");

    const [sale, setSale] = useState<IItemSaleUpdateDto>({
        quantity: undefined,
        unitPrice: undefined,
        saleDate: undefined,
        buyerName: "",
        invoiceNumber: "",
        paymentMode: undefined,
        vehicleId: undefined,
        notes: "",
    });

    useEffect(() => {
        if (!saleId) return;

        const fetchSale = async () => {
            try {
                setIsFetching(true);
                const response = await getSaleByIdAsync(saleId);
                if (response.success) {
                    const s = response.data;
                    setStatus(s.status);
                    setSale({
                        quantity: s.quantity,
                        unitPrice: s.unitPrice,
                        saleDate: new Date(s.saleDate),
                        buyerName: s.buyerName ?? "",
                        invoiceNumber: s.invoiceNumber ?? "",
                        paymentMode: s.paymentMode,
                        vehicleId: s.vehicleId,
                        notes: s.notes ?? "",
                    });
                } else {
                    toast.error(response.message);
                }
            } catch {
                toast.error("Failed to load sale.");
            } finally {
                setIsFetching(false);
            }
        };

        fetchSale();
    }, [saleId]);

    const isFormInvalid = () => (sale.quantity ?? 0) <= 0;
    const isPending = status === "Pending";

    const handleChange = <K extends keyof IItemSaleUpdateDto>(name: K, value: any) => {
        setSale((prev) => {
            if (name === "saleDate") {
                return { ...prev, [name]: value ? new Date(value) : undefined };
            }
            if (name === "quantity" || name === "unitPrice") {
                return { ...prev, [name]: value === "" ? undefined : Number(value) };
            }
            return { ...prev, [name]: value };
        });
    };

    const formatDate = (date?: Date) => (date ? new Date(date).toISOString().split("T")[0] : "");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const response = await updateSaleAsync(saleId, sale);
            if (response.success) {
                toast.success(response.message || "Sale updated successfully!");
                router.push(`/item-sale/get-by-id/${saleId}`);
            } else {
                toast.error(response.message || "Failed to update sale.");
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
                                <Tag className="w-12 h-12 text-white" />
                            </div>
                            <div>
                                <h1 className="text-lg md:text-3xl font-extrabold text-white tracking-wide">
                                    Update Sale
                                </h1>
                                <p className="text-red-100 mt-2 text-sm">
                                    {isPending
                                        ? "Update only the fields you want to change."
                                        : "Quantity/price can no longer be edited once approved. Other details can still be updated."}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 md:p-10">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                <CustomInput
                                    label="Quantity *"
                                    Icon={Hash}
                                    type="number"
                                    className="custom-input w-full"
                                    value={sale.quantity ?? ""}
                                    onChange={(v) => handleChange("quantity", v)}
                                    disabled={!isPending}
                                />

                                <CustomInput
                                    label="Unit Price (Rs) *"
                                    Icon={Wallet}
                                    type="number"
                                    className="custom-input w-full"
                                    value={sale.unitPrice ?? ""}
                                    onChange={(v) => handleChange("unitPrice", v)}
                                    disabled={!isPending}
                                />

                                <CustomInput
                                    label="Sale Date"
                                    Icon={Calendar}
                                    type="date"
                                    className="custom-input w-full"
                                    value={formatDate(sale.saleDate)}
                                    onChange={(v) => handleChange("saleDate", v)}
                                />

                                <div className="flex items-center gap-6 px-4 py-4 bg-gray-color hover:bg-gray-300 rounded-2xl group transition-all duration-300">
                                    <div className="bg-red-100 text-red-600 p-4 rounded-full group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                                        <Wallet className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1">
                                        <label className="text-md font-medium text-slate-500 group-hover:text-red-500 block mb-1">
                                            Payment Mode
                                        </label>
                                        <Select
                                            value={sale.paymentMode}
                                            onValueChange={(v) => handleChange("paymentMode", v as PaymentMode)}
                                        >
                                            <SelectTrigger className="w-full bg-white">
                                                <SelectValue placeholder="Select Payment Mode" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {Object.values(PaymentMode).map((mode) => (
                                                    <SelectItem key={mode} value={mode}>{mode}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <CustomInput
                                    label="Buyer Name"
                                    Icon={User}
                                    type="text"
                                    className="custom-input w-full"
                                    value={sale.buyerName ?? ""}
                                    onChange={(v) => handleChange("buyerName", v)}
                                />

                                <CustomInput
                                    label="Invoice Number"
                                    Icon={FileText}
                                    type="text"
                                    className="custom-input w-full"
                                    value={sale.invoiceNumber ?? ""}
                                    onChange={(v) => handleChange("invoiceNumber", v)}
                                />

                                <CustomInput
                                    label="Notes"
                                    Icon={FileText}
                                    type="text"
                                    className="custom-input w-full"
                                    value={sale.notes ?? ""}
                                    onChange={(v) => handleChange("notes", v)}
                                />
                            </div>

                            <div className="flex justify-end">
                                <CustomButton
                                    buttonColor="bg-red-500"
                                    buttonHoverColor="bg-red-900"
                                    type="submit"
                                    disabled={isFormInvalid() || isLoading}
                                    icon={<Save />}
                                    className="w-1/2 md:w-1/6 text-white py-2 rounded-full transition"
                                    buttonText={isLoading ? "Saving..." : "Save Changes"}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default UpdateSale;
