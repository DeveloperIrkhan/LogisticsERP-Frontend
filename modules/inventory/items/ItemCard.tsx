import React from 'react'
import { ItemCategory, ItemResponseDto } from './types'
import { AlertTriangle, ArrowRight, Building, Calendar, DollarSign, ShieldCheck } from 'lucide-react'
import { RiTempColdLine } from "react-icons/ri";
import Link from 'next/link'
import { BiDetail } from 'react-icons/bi'

type IItem = {
    Item: ItemResponseDto
}

const ItemCard = ({ Item }: IItem) => {
    const isLowStock = (item: ItemResponseDto) =>
        item.reorderLevel != null && item.currentStock <= item.reorderLevel;
    const lowStock = isLowStock(Item);

    const getStockStyle = (isLowStock: boolean) =>
        isLowStock
            ? "bg-red-100 text-red-700 border-red-200 border-2 border-red-200 "
            : "bg-white";
    const getItemCategoryStyle = (category: ItemCategory) => {
        switch (category) {
            case ItemCategory.SpareParts:
                return "bg-blue-100 text-blue-700";
            case ItemCategory.LubricantOil:
                return "bg-yellow-100 text-yellow-700";
            case ItemCategory.Tyres:
                return "bg-slate-200 text-slate-700";
            case ItemCategory.Battery:
                return "bg-purple-100 text-purple-700";
            case ItemCategory.Tools:
                return "bg-indigo-100 text-indigo-700";
            case ItemCategory.Consumables:
                return "bg-green-100 text-green-700";
            case ItemCategory.Filters:
                return "bg-orange-100 text-orange-700";
            case ItemCategory.Electricals:
                return "bg-pink-100 text-pink-700";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };
    return (
        <div
            key={Item.itemId}
            className={`shadow-xl rounded-2xl border border-stone-200 p-5 transition-shadow hover:shadow-md
                ${getStockStyle(lowStock)}`}>
            <div className="flex items-start justify-between">
                <h2 className="font-mono text-lg font-semibold text-slate-800">
                    {Item.itemName}
                </h2>
                <p className="text-xl text-slate-500 mt-0.5">
                    {Item.currentStock.toString()}
                </p>
            </div>

            <div className="flex justify-end items-center w-full mt-3">
                <span className="bg-stone-100 text-xs gap-4 text-slate-600 font-medium px-2.5 py-1 uppercase rounded-md">
                    {Item.isActive ? "Active" : "Inactive"}
                </span>
            </div>

            <div className="mt-2 pt-4 border-t border-stone-200 space-y-2">

                <div className="flex w-full items-center justify-between px-4">
                    <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-md 
                            ${getItemCategoryStyle(Item.itemCategory)}`}
                    >
                        {Item.itemCategory}
                    </span>
                    {lowStock && (
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-md border bg-red-100 text-red-700 border-red-200 flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" />
                            Low Stock
                        </span>
                    )}

                </div>

                <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-xs text-slate-800">
                        <RiTempColdLine className="w-3.5 h-3.5" />
                        Item Unit
                    </span>
                    <span className="font-mono text-sm font-semibold text-slate-500">
                        {Item.itemUnit}
                    </span>
                </div>

                <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-xs text-slate-800">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Reorder Level
                    </span>
                    <span className="font-mono text-sm font-semibold text-slate-500">
                        {Item.reorderLevel?.toString()}
                    </span>
                </div>

                <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-xs text-slate-800">
                        <Calendar className="w-3.5 h-3.5" />
                        Registration Expiry
                    </span>
                    <span className="font-mono text-sm font-semibold text-slate-500">
                        {Item.createdAt ? new Date(Item.createdAt).toDateString() : "-"}
                    </span>
                </div>
            </div>
            <div className="flex mt-4 items-start justify-start flex-col">
                <span className="flex items-center gap-2 text-xs text-slate-800">
                    <BiDetail className="w-3.5 h-3.5" />
                    Description
                </span>
                <span className="font-mono line-clamp-2 text-sm ml-5 text-slate-800">
                    {Item.description}
                </span>
            </div>
            {/* Footer */}
            <div className="mt-4 pt-4 border-t border-stone-200 flex justify-end items-center">
                <Link
                    href={`/inventory/item/get-item-by-id/${Item.itemId}`}
                    className="group/button flex items-center gap-1.5 text-xs font-bold text-red-700 hover:text-red-800"
                >
                    view details
                    <ArrowRight className="w-3.5 h-3.5 group-hover/button:translate-x-0.5 transition-transform" />
                </Link>
            </div>
        </div>
    )
}

export default ItemCard
