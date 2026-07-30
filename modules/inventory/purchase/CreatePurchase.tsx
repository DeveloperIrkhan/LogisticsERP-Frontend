"use client";
import {
    Calendar,
    FileText,
    Hash,
    Package,
    Save,
    ShoppingCart,
    Truck,
    User,
    Wallet,
} from "lucide-react";
import Container from "@/components/Container";
import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { IItemPurchaseCreateDto, PaymentMode } from "./interfaces";
import { createPurchaseAsync } from "./api";
import { IVehicleResponse } from "@/modules/vehicle/types";
import { getVehiclesAsync } from "@/modules/vehicle/api";
import { IItemSaleResponseDto } from "../sale/interfaces";
import { getActiveItemsAsync } from "../items/api";
import { ItemResponseDto } from "../items/types";

const emptyPurchase = (): IItemPurchaseCreateDto => ({
    itemId: "",
    quantity: 0,
    unitPrice: 0,
    purchaseDate: new Date(),
    supplierName: "",
    invoiceNumber: "",
    paymentMode: PaymentMode.Cash,
    vehicleId: null,
    addedBy: "",
    notes: "",
});

const CreatePurchase = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [purchase, setPurchase] = useState<IItemPurchaseCreateDto>(
        emptyPurchase(),
    );
    const [items, setItems] = useState<ItemResponseDto[]>([]);
    const [vehicles, setVehicles] = useState<IVehicleResponse[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [itemsRes, vehiclesRes] = await Promise.all([
                    getActiveItemsAsync(),
                    getVehiclesAsync(),
                ]);
                if (itemsRes.success) setItems(itemsRes.data);
                if (vehiclesRes.success) setVehicles(vehiclesRes.data);
            } catch {
                console.error("Error fetching items/vehicles");
            }
        };
        fetchData();
    }, []);

    const isFormInvalid = () =>
        purchase.itemId === "" || purchase.quantity <= 0 || purchase.unitPrice < 0;

    const handleChange = <K extends keyof IItemPurchaseCreateDto>(
        name: K,
        value: any,
    ) => {
        setPurchase((prev) => {
            if (name === "quantity" || name === "unitPrice") {
                return { ...prev, [name]: value === "" ? 0 : Number(value) };
            }
            if (name === "purchaseDate") {
                return { ...prev, [name]: new Date(value) };
            }
            return { ...prev, [name]: value };
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const payload = {
                ...purchase,
                vehicleId: purchase.vehicleId || null,
                addedBy: purchase.addedBy?.trim() ? purchase.addedBy.trim() : null,
            };
            const response = await createPurchaseAsync(payload);
            if (response.success) {
                toast.success(response.message || "Purchase recorded successfully!");
                setPurchase(emptyPurchase());
            } else {
                toast.error(response.message || "Failed to record purchase.");
            }
        } catch {
            toast.error("Something went wrong.");
        } finally {
            setIsLoading(false);
        }
    };

    const total = (purchase.quantity || 0) * (purchase.unitPrice || 0);

    return (
        <Container className="py-8">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
                    <div className="bg-linear-to-r from-red-500 via-dark-color to-red-900 p-8 md:p-10">
                        <div className="flex flex-col md:flex-row md:items-center gap-5">
                            <div className="bg-white/20 backdrop-blur-md p-5 rounded-3xl w-fit">
                                <ShoppingCart className="w-12 h-12 text-white" />
                            </div>
                            <div>
                                <h1 className="text-lg md:text-3xl font-extrabold text-white tracking-wide">
                                    Record a Purchase
                                </h1>
                                <p className="text-red-100 mt-2 text-sm">
                                    Buying spare parts, lubricants, or other supplies for a vehicle or the warehouse.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 md:p-10">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                <div className="flex items-center gap-6 px-4 py-4 bg-gray-color hover:bg-gray-300 rounded-2xl group transition-all duration-300">
                                    <div className="bg-red-100 text-red-600 p-4 rounded-full group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                                        <Package className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1">
                                        <label className="text-md font-medium text-slate-500 group-hover:text-red-500 block mb-1">
                                            Item *
                                        </label>
                                        <Select
                                            value={purchase.itemId}
                                            onValueChange={(v) => handleChange("itemId", v)}
                                        >
                                            <SelectTrigger className="w-full bg-white">
                                                <SelectValue placeholder="Select Item" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {items.map((i) => (
                                                    <SelectItem key={i.itemId} value={i.itemId}>
                                                        {i.itemName} ({i.currentStock as number} {i.itemUnit} in stock)
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6 px-4 py-4 bg-gray-color hover:bg-gray-300 rounded-2xl group transition-all duration-300">
                                    <div className="bg-red-100 text-red-600 p-4 rounded-full group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                                        <Truck className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1">
                                        <label className="text-md font-medium text-slate-500 group-hover:text-red-500 block mb-1">
                                            Vehicle (optional)
                                        </label>
                                        <Select
                                            value={purchase.vehicleId ?? "none"}
                                            onValueChange={(v) =>
                                                handleChange("vehicleId", v === "none" ? null : v)
                                            }
                                        >
                                            <SelectTrigger className="w-full bg-white">
                                                <SelectValue placeholder="Not linked to a vehicle" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="none">Not linked to a vehicle</SelectItem>
                                                {vehicles.map((v) => (
                                                    <SelectItem key={v.vehicleId} value={v.vehicleId}>
                                                        {v.number} - {v.modelName}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <CustomInput
                                    label="Quantity *"
                                    Icon={Hash}
                                    type="number"
                                    className="custom-input w-full"
                                    placeholder="e.g 5"
                                    value={purchase.quantity}
                                    onChange={(v) => handleChange("quantity", v)}
                                />

                                <CustomInput
                                    label="Unit Price (Rs) *"
                                    Icon={Wallet}
                                    type="number"
                                    className="custom-input w-full"
                                    placeholder="e.g 1200"
                                    value={purchase.unitPrice}
                                    onChange={(v) => handleChange("unitPrice", v)}
                                />

                                <CustomInput
                                    label="Purchase Date *"
                                    Icon={Calendar}
                                    type="date"
                                    className="custom-input w-full"
                                    value={purchase.purchaseDate.toISOString().split("T")[0]}
                                    onChange={(v) => handleChange("purchaseDate", v)}
                                />

                                <div className="flex items-center gap-6 px-4 py-4 bg-gray-color hover:bg-gray-300 rounded-2xl group transition-all duration-300">
                                    <div className="bg-red-100 text-red-600 p-4 rounded-full group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                                        <Wallet className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1">
                                        <label className="text-md font-medium text-slate-500 group-hover:text-red-500 block mb-1">
                                            Payment Mode *
                                        </label>
                                        <Select
                                            value={purchase.paymentMode}
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

                                <CustomInput
                                    label="Supplier Name"
                                    Icon={User}
                                    type="text"
                                    className="custom-input w-full"
                                    placeholder="e.g Al-Khair Auto Parts"
                                    value={purchase.supplierName ?? ""}
                                    onChange={(v) => handleChange("supplierName", v)}
                                />

                                <CustomInput
                                    label="Invoice Number"
                                    Icon={FileText}
                                    type="text"
                                    className="custom-input w-full"
                                    placeholder="e.g INV-2026-0451"
                                    value={purchase.invoiceNumber ?? ""}
                                    onChange={(v) => handleChange("invoiceNumber", v)}
                                />

                                <CustomInput
                                    label="Added By"
                                    Icon={User}
                                    type="text"
                                    className="custom-input w-full"
                                    placeholder="Your name / user id"
                                    value={purchase.addedBy ?? ""}
                                    onChange={(v) => handleChange("addedBy", v)}
                                />

                                <CustomInput
                                    label="Notes (optional)"
                                    Icon={FileText}
                                    type="text"
                                    className="custom-input w-full"
                                    placeholder="Any additional details..."
                                    value={purchase.notes ?? ""}
                                    onChange={(v) => handleChange("notes", v)}
                                />
                            </div>

                            <div className="flex justify-between items-center bg-gray-color rounded-2xl px-6 py-4 mt-2">
                                <span className="text-slate-500 font-medium">Total Amount</span>
                                <span className="text-2xl font-bold text-red-600">
                                    Rs. {total.toLocaleString()}
                                </span>
                            </div>

                            <div className="flex justify-end">
                                <CustomButton
                                    buttonColor="bg-red-500"
                                    buttonHoverColor="bg-red-900"
                                    type="submit"
                                    disabled={isFormInvalid() || isLoading}
                                    icon={<Save />}
                                    className="w-1/2 md:w-1/6 text-white py-2 rounded-full transition"
                                    buttonText={isLoading ? "Saving..." : "Save Purchase"}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default CreatePurchase;
