"use client"
import Container from '@/components/Container'
import HeaderBand from '@/components/HeaderBand'
import MidModal from '@/components/Modals/MidModal'
import Spinner from '@/components/Spinner'
import { deleteItemAsync, getItemByIdAsync } from '@/modules/inventory/items/api'
import { ItemCategory, ItemResponseDto, ItemUnit, } from '@/modules/inventory/items/types'
import { Calendar, Edit, Key, Package, Trash } from 'lucide-react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { BiCategory } from 'react-icons/bi'
import { FaThermometerEmpty } from 'react-icons/fa'
import { GrStatusGood } from 'react-icons/gr'
import { HiMiniCircleStack } from 'react-icons/hi2'
import { MdDetails } from 'react-icons/md'
import { TbRulerMeasure } from 'react-icons/tb'
import { toast } from 'react-toastify'

const Page = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [item, setItem] = useState<ItemResponseDto | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const params = useParams();
    const router = useRouter();
    const itemId = params?.itemId as string;

    useEffect(() => {
        if (!itemId) return
        setIsLoading(true)
        const fetchbyId = async () => {
            try {
                const response = await getItemByIdAsync(itemId)
                if (!response.success) {
                    toast.error(response.message)
                }
                toast.success(response.message)
                setItem(response.data)
            }
            catch (error) {
                console.error("Error fetching item record:", error);
            }
            finally {
                setIsLoading(false)
            }
        }

        fetchbyId()


    }, [itemId])



    const customStyle =
        "flex w-full absolute -top-12 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition";


    const handleDelete = async () => {
        try {
            setIsDeleting(true);
            const response = await deleteItemAsync(itemId);

            if (response.success) {
                toast.success(response.message || "Fuel record deleted successfully!");
                router.push("/inventory/item/view-items");
            } else {
                toast.error(response.message || "Failed to delete fuel record.");
            }
        } catch (error) {
            console.error("Error deleting fuel record:", error);
            toast.error("Something went wrong while deleting the fuel record.");
        } finally {
            setIsDeleting(false);
            setIsModalOpen(false);
        }
    };


    const details = [
        {
            label: "Id",
            icon: Key,
            value: item?.itemId ?? "_"
        },
        {
            label: "Name",
            icon: Package,
            value: item?.itemName ?? "_"
        },
        {
            label: "Current Stock",
            icon: HiMiniCircleStack,
            value: item?.currentStock ?? 0
        },
        {
            label: "Reorder Level",
            icon: FaThermometerEmpty,
            value: item?.reorderLevel ?? 0
        },
        {
            label: "Item Category",
            icon: BiCategory,
            value: item?.itemCategory ?? "_"
        },
        {
            label: "Status",
            icon: GrStatusGood,
            value: item?.isActive ? "Active" : "Inactive"

        },
        {
            label: "Unit",
            icon: TbRulerMeasure,
            value: item?.itemUnit ?? "_"
        },
        {
            label: "Added At",
            icon: Calendar,
            value: item?.createdAt
                ? new Date(item.createdAt).toLocaleDateString()
                : "-"

        },
    ]

    if (isLoading) {
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
            <div className="max-w-7xl mx-auto">
                <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
                    {/* Header */}
                    <HeaderBand
                        title="Item Details"
                        subtitle={`Details of ${item.itemId}`}
                        icon={<Package className="w-6 h-6 md:[w-10 h-10] text-white" />}
                    />


                    <div className="p-6 md:p-10">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {details.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <div className='group flex items-center gap-2 p-2 md:p-3 bg-red-50 shadow-xl rounded-xl border border-red-50 hover:bg-red-100 hoverEffect hover:cursor-pointer  hover:border-red-600' key={item.label}>
                                        <div className="bg-red-100  group-hover:cursor-pointer text-red-600 p-2 rounded-full group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                                            <Icon className="w-6 h-6" />
                                        </div>

                                        <div className="flex-1">
                                            <p className="text-sm text-slate-500 font-medium">
                                                {item.label}
                                            </p>
                                            <h3 className="text-sm font-bold line-clamp-1 text-slate-800 mt-1 wrap-break-word">
                                                {item.value as number}
                                            </h3>
                                        </div>
                                    </div>
                                )
                            })}

                        </div>
                        <div className="border border-red-50 hover:bg-red-100 hoverEffect hover:cursor-pointer  hover:border-red-600 flex group bg-red-50 gap-4 shadow-2xl p-4 my-4 rounded-xl">
                            <div className="bg-red-100 text-red-600 p-4 rounded-full group-hover:cursor-pointer
                             group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                                <MdDetails className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm text-slate-500 font-medium">
                                    Description
                                </p>
                                <h3 className="text-sm font-bold text-slate-800 mt-1 wrap-break-word">
                                    {item?.description}
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className="uppercase rounded-2xl border border-slate-200 bg-linear-to-br from-white to-slate-100 p-6 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                        <div className="flex items-center justify-center gap-4">
                            <div className="relative flex group">
                                <Link
                                    href={`/inventory/item/update-item-by-id/${item.itemId}`}
                                    className="bg-red-100 text-red-600 p-4 rounded-2xl hover:bg-red-600 hover:text-white transition-all duration-300"
                                >
                                    <Edit className="w-6 h-6" />
                                </Link>
                                <span className={customStyle}>Edit Item</span>
                            </div>
                            <div className="flex group relative">
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="bg-red-100 text-red-600 p-4 rounded-2xl hover:bg-red-600 hover:text-white transition-all duration-300"
                                >
                                    <Trash className="w-6 h-6" />
                                </button>
                                <span className={customStyle}>Delete Item</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <MidModal
                isOpen={isModalOpen}
                title="Delete Item Entry"
                description={`Are you sure you want to delete this   ${item.itemId} Item record? 
                This action cannot be undone.`}
                itemName={`${item.itemName}`}
                isDeleting={isDeleting}
                onConfirm={handleDelete}
                onClose={() => setIsModalOpen(false)}
            />
        </Container>
    )
}

export default Page
