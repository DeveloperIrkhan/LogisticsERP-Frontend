"use client"
import Container from '@/components/Container'
import CustomButton from '@/components/CustomButton'
import CustomInput from '@/components/CustomInput'
import HeaderBand from '@/components/HeaderBand'
import Spinner from '@/components/Spinner'
import TextArea from '@/components/TextArea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { getItemByIdAsync, updateItemAsync } from '@/modules/inventory/items/api'
import { ItemCategory, ItemResponseDto, ItemUnit, ItemUpdateDto, } from '@/modules/inventory/items/types'
import { Boxes, FileText, Layers, Package, Save, Warehouse } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { BsStack } from 'react-icons/bs'
import { toast } from 'react-toastify'

const Page = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [items, setItems] = useState<ItemResponseDto | null>(null)
    const [item, setItem] = useState<ItemUpdateDto>({
        itemName: "",
        currentStock: undefined,
        itemCategory: undefined,
        itemUnit: undefined,
        reorderLevel: undefined,
        description: "",
        isActive: true,
    });
    const [isFetching, setIsFetching] = useState(false);


    const params = useParams();
    const router = useRouter();
    const itemId = params?.itemId as string;

    useEffect(() => {
        if (!itemId) return
        setIsFetching(true)
        const fetchbyId = async () => {
            try {
                const response = await getItemByIdAsync(itemId)
                if (!response.success) {
                    toast.error(response.message)
                }
                toast.success(response.message)
                const i = response.data;
                setItem({
                    itemName: i.itemName,
                    currentStock: i.currentStock,
                    itemCategory: i.itemCategory,
                    itemUnit: i.itemUnit,
                    reorderLevel: i.reorderLevel ?? undefined,
                    description: i.description ?? "",
                    isActive: i.isActive,
                })
                setItems(response.data)
            }
            catch (error) {
                console.error("Error fetching item record:", error);
            }
            finally {
                setIsFetching(false)
            }
        }

        fetchbyId()


    }, [itemId])
    const isFormInvalid = () => {
        return (
            (item?.itemName ?? "").trim() === "" ||
            (item?.reorderLevel ?? 0) >= (items?.currentStock ?? 0)
        );
    };
    const handleChange = <K extends keyof ItemUpdateDto>(name: K, value: any) => {
        setItem((prev) => {
            if (name == "reorderLevel") {
                return { ...prev, [name]: value == "" ? undefined : Number(value) }
            }
            if (name == "currentStock") {
                return { ...prev, [name]: value == "" ? undefined : Number(value) }
            }
            return { ...prev, [name]: value }
        })
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsLoading(true)

            const response = await updateItemAsync(itemId, item)
            if (response.success) {
                toast.success(response.message || "item Updated successfully!")
            }
            else {
                toast.error(response.message || "Fail to update the item")
            }

        } catch (error) {
            console.log(error)
            toast.error("something went wrong.")
        }
        finally {
            setIsLoading(false)
        }
    }




    if (isFetching) {
        return (<Container>
            <Spinner />
        </Container>);

    }
    if (!item) {
        return (
            <Container className="flex justify-center items-center min-h-[70vh]">
                <p className="text-xl text-red-500 font-semibold">
                    Item record not found
                </p>
            </Container>
        );
    }
    return (
        <Container className="py-8">
            <form onSubmit={handleSubmit} className="max-w-7xl mx-auto">
                <div className="bg-white p-3 rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
                    <HeaderBand
                        title="Item Updatee"
                        subtitle={"Please Enter the Correct information"}
                        icon={<Package className="w-6 h-6 md:[w-10 h-10] text-white" />}
                    />


                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <CustomInput
                            label="Item Name *"
                            Icon={FileText}
                            type="text"
                            className="custom-input w-full"
                            placeholder="e.g Engine Oil 5L"
                            value={item.itemName ?? ""}
                            onChange={(v) => handleChange("itemName", v)}
                        />

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
                                    onValueChange={(v) => handleChange("itemCategory", v as ItemCategory)}
                                >
                                    <SelectTrigger className="w-full bg-white">
                                        <SelectValue placeholder="Select Category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.values(ItemCategory).map((cat) => (
                                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

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
                                            <SelectItem key={u} value={u}>{u}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <CustomInput
                            label="Reorder Level (optional)"
                            Icon={Warehouse}
                            type="number"
                            className="custom-input w-full"
                            placeholder="Alert when stock falls to/below this"
                            value={item.reorderLevel ?? 0}
                            onChange={(v) => handleChange("reorderLevel", v)}
                        />
                        <CustomInput
                            label="Current Stock"
                            Icon={BsStack}
                            type="number"
                            className="custom-input w-full"
                            placeholder="Alert when stock falls to/below this"
                            value={item.currentStock ?? 0}
                            onChange={(v) => handleChange("currentStock", v)}
                        />

                        <div className="flex items-center gap-6 px-4 py-4 bg-gray-color hover:bg-gray-300 rounded-2xl group transition-all duration-300">
                            <div className="bg-red-100 text-red-600 p-4 rounded-full group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                                <FileText className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                                <label className="text-md font-medium text-slate-500 group-hover:text-red-500 block mb-1">
                                    Status
                                </label>
                                <Select
                                    value={item.isActive ? "active" : "inactive"}
                                    onValueChange={(v) => handleChange("isActive", v === "active")}
                                >
                                    <SelectTrigger className="w-full bg-white">
                                        <SelectValue placeholder="Select Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="inactive">Inactive</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                    </div>
                    <div className="flex my-4">
                        <TextArea
                            label="Description (optional)"
                            Icon={FileText}
                            type="text"
                            className="custom-input w-full"
                            placeholder="Any additional details..."
                            value={item.description ?? ""}
                            onChange={(v) => handleChange("description", v)}
                        />
                    </div>


                    <div className="uppercase rounded-2xl border border-slate-200 bg-linear-to-br from-white to-slate-100 p-6 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                        <div className="flex border justify-end gap-3">
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
                                buttonText={isLoading ? "Updating..." : "Update Item"}
                            />
                        </div>
                    </div>
                </div>
            </form>

        </Container>
    )
}

export default Page
