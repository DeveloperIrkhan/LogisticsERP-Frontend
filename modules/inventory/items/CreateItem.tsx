"use client";
import {
    Boxes,
    FileText,
    Layers,
    Package,
    Save,
    Warehouse,
} from "lucide-react";
import Container from "@/components/Container";
import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { toast } from "react-toastify";
import { useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ItemCategory, ItemCreateDto, ItemUnit } from "./types";
import { CreateItemAsync } from "./api";
import HeaderBand from "@/components/HeaderBand";


const emptyItem = (): ItemCreateDto => ({
    itemName: "",
    itemCategory: ItemCategory.SpareParts,
    itemUnit: ItemUnit.Piece,
    reorderLevel: undefined,
    description: "",
    openingStock: 0,
});

const CreateItem = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [item, setItem] = useState<ItemCreateDto>(emptyItem());

    const isFormInvalid = () => item.itemName.trim() === "";

    const handleChange = <K extends keyof ItemCreateDto>(
        name: K,
        value: any,
    ) => {
        setItem((prev) => {
            if (name === "openingStock") {
                return { ...prev, [name]: value === "" ? 0 : Number(value) };
            }
            if (name === "reorderLevel") {
                return { ...prev, [name]: value === "" ? undefined : Number(value) };
            }
            return { ...prev, [name]: value };
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const response = await CreateItemAsync(item);
            if (response.success) {
                toast.success(response.message || "Item added to catalog successfully!");
                setItem(emptyItem());
            } else {
                toast.error(response.message || "Failed to create item.");
            }
        } catch {
            toast.error("Something went wrong.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container className="py-8">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
                    {/* Header */}
                    <HeaderBand title="Add New Item to Inventory"
                        subtitle="Record fuel consumption for a vehicle."
                        icon={<Package className="w-7 h-7 md:w-10 md:h-10 text-white" />}
                    />
                    

                    <div className="p-6 md:p-10">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                                <CustomInput
                                    label="Item Name *"
                                    Icon={FileText}
                                    type="text"
                                    className="custom-input w-full"
                                    placeholder="e.g Engine Oil 5L"
                                    value={item.itemName}
                                    onChange={(v) => handleChange("itemName", v)}
                                />

                                {/* Category */}
                                <div className="flex items-center gap-6 px-4 py-4 bg-gray-color hover:bg-gray-300 rounded-2xl group transition-all duration-300">
                                    <div className="bg-red-100 text-red-600 p-4 rounded-full group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                                        <Layers className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1">
                                        <label className="text-md font-medium text-slate-500 group-hover:text-red-500 block mb-1">
                                            Category *
                                        </label>
                                        <Select
                                            value={item.itemCategory}
                                            onValueChange={(v) =>
                                                handleChange("itemCategory", v as ItemCategory)
                                            }
                                        >
                                            <SelectTrigger className="w-full bg-white">
                                                <SelectValue placeholder="Select Category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {Object.values(ItemCategory).map((cat) => (
                                                    <SelectItem key={cat} value={cat}>
                                                        {cat}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                {/* Unit */}
                                <div className="flex items-center gap-6 px-4 py-4 bg-gray-color hover:bg-gray-300 rounded-2xl group transition-all duration-300">
                                    <div className="bg-red-100 text-red-600 p-4 rounded-full group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                                        <Boxes className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1">
                                        <label className="text-md font-medium text-slate-500 group-hover:text-red-500 block mb-1">
                                            Unit *
                                        </label>
                                        <Select
                                            value={item.itemUnit}
                                            onValueChange={(v) => handleChange("itemUnit", v as ItemUnit)}
                                        >
                                            <SelectTrigger className="w-full bg-white">
                                                <SelectValue placeholder="Select Unit" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {Object.values(ItemUnit).map((u) => (
                                                    <SelectItem key={u} value={u}>
                                                        {u}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <CustomInput
                                    label="Opening Stock"
                                    Icon={Warehouse}
                                    type="number"
                                    className="custom-input w-full"
                                    placeholder="e.g 10"
                                    value={item.openingStock}
                                    onChange={(v) => handleChange("openingStock", v)}
                                />

                                <CustomInput
                                    label="Reorder Level (optional)"
                                    Icon={Warehouse}
                                    type="number"
                                    className="custom-input w-full"
                                    placeholder="Alert when stock falls to/below this"
                                    value={item.reorderLevel ?? ""}
                                    onChange={(v) => handleChange("reorderLevel", v)}
                                />

                                <CustomInput
                                    label="Description (optional)"
                                    Icon={FileText}
                                    type="text"
                                    className="custom-input w-full"
                                    placeholder="Any additional details..."
                                    value={item.description ?? ""}
                                    onChange={(v) => handleChange("description", v)}
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
                                    buttonText={isLoading ? "Saving..." : "Save Item"}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default CreateItem;
