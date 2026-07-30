"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
    Tag,
    Calendar,
    FileText,
    Hash,
    Truck,
    User,
    Wallet,
    Edit,
    Trash,
    CheckCircle,
    XCircle,
    CreditCard,
} from "lucide-react";
import Spinner from "@/components/Spinner";
import Container from "@/components/Container";
import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import Link from "next/link";
import { toast } from "react-toastify";
import {
    getSaleByIdAsync,
    deleteSaleAsync,
    approveSaleAsync,
    rejectSaleAsync,
    markSalePaidAsync,
} from "@/modules/itemSales/api";
import {
    IItemSaleResponseDto,
    ItemTransactionStatus,
    getSaleStatusStyle,
} from "@/modules/itemSales/interfaces";
import MidModal from "@/components/Modals/MidModal";

const GetSaleById = () => {
    const params = useParams();
    const router = useRouter();
    const saleId = params?.saleId as string;

    const [isLoading, setIsLoading] = useState(false);
    const [sale, setSale] = useState<IItemSaleResponseDto | null>(null);

    const [deleteModal, setDeleteModal] = useState(false);
    const [approveModal, setApproveModal] = useState(false);
    const [rejectModal, setRejectModal] = useState(false);
    const [paidModal, setPaidModal] = useState(false);

    const [isDeleting, setIsDeleting] = useState(false);
    const [isActioning, setIsActioning] = useState(false);
    const [actionBy, setActionBy] = useState("");

    const fetchSale = async () => {
        try {
            setIsLoading(true);
            const response = await getSaleByIdAsync(saleId);
            if (response.success) {
                setSale(response.data);
            } else {
                toast.error(response.message);
            }
        } catch {
            toast.error("Failed to load sale.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!saleId) return;
        fetchSale();
    }, [saleId]);

    const handleDelete = async () => {
        try {
            setIsDeleting(true);
            const res = await deleteSaleAsync(saleId);
            if (res.success) {
                toast.success("Sale deleted successfully!");
                router.push("/item-sale/view-all");
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
        if (!actionBy.trim()) return toast.error("Please enter your name.");
        try {
            setIsActioning(true);
            const res = await approveSaleAsync(saleId, actionBy);
            if (res.success) {
                toast.success(res.message || "Sale approved and stock updated!");
                setSale(res.data);
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
        if (!actionBy.trim()) return toast.error("Please enter your name.");
        try {
            setIsActioning(true);
            const res = await rejectSaleAsync(saleId, actionBy);
            if (res.success) {
                toast.success(res.message || "Sale rejected!");
                setSale(res.data);
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

    const handleMarkPaid = async () => {
        if (!actionBy.trim()) return toast.error("Please enter your name.");
        try {
            setIsActioning(true);
            const res = await markSalePaidAsync(saleId, actionBy);
            if (res.success) {
                toast.success(res.message || "Sale marked as paid!");
                setSale(res.data);
                setPaidModal(false);
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

    if (!sale) {
        return (
            <Container className="flex justify-center items-center min-h-[70vh]">
                <p className="text-xl text-red-500 font-semibold">Sale not found</p>
            </Container>
        );
    }

    const details = [
        { label: "Item", value: sale.itemName, icon: Tag },
        { label: "Quantity", value: sale.quantity, icon: Hash },
        { label: "Unit Price", value: `Rs. ${sale.unitPrice.toLocaleString()}`, icon: Wallet },
        { label: "Sale Date", value: new Date(sale.saleDate).toDateString(), icon: Calendar },
        { label: "Payment Mode", value: sale.paymentMode, icon: CreditCard },
        { label: "Buyer Name", value: sale.buyerName, icon: User },
        { label: "Invoice Number", value: sale.invoiceNumber, icon: FileText },
        { label: "Vehicle ID", value: sale.vehicleId, icon: Truck },
        { label: "Added By", value: sale.addedBy, icon: User },
        { label: "Approved By", value: sale.approvedBy, icon: User },
        { label: "Notes", value: sale.notes, icon: FileText },
        { label: "Created At", value: new Date(sale.createdAt).toDateString(), icon: Calendar },
    ];

    return (
        <Container className="py-8">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200">

                    <div className="bg-linear-to-r from-red-600 via-red-700 to-red-900 p-8 md:p-10">
                        <div className="flex flex-col md:flex-row md:items-center gap-5">
                            <div className="bg-white/20 backdrop-blur-md p-5 rounded-3xl w-fit">
                                <Tag className="w-12 h-12 text-white" />
                            </div>
                            <div className="flex-1">
                                <h1 className="text-4xl font-extrabold text-white tracking-wide">
                                    Sale Details
                                </h1>
                                <p className="text-red-100 mt-2 text-sm break-all">{sale.itemSaleId}</p>
                            </div>
                            <span className={`text-sm font-bold px-4 py-2 rounded-xl border ${getSaleStatusStyle(sale.status)}`}>
                                {sale.status}
                            </span>
                        </div>
                    </div>

                    <div className="p-6 bg-gray-100 md:p-10">

                        <div className="flex flex-wrap gap-3 p-4 mb-6 bg-white rounded-3xl shadow-md border border-slate-200">
                            {sale.status === ItemTransactionStatus.Pending && (
                                <button
                                    onClick={() => { setApproveModal(true); setActionBy(""); }}
                                    className="flex items-center gap-2 bg-red-100 hover:bg-red-700 text-red-600 hover:text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow-md transition-colors"
                                >
                                    <CheckCircle className="w-5 h-5" />
                                    Approve
                                </button>
                            )}

                            {(sale.status === ItemTransactionStatus.Pending ||
                                sale.status === ItemTransactionStatus.Approved) && (
                                    <button
                                        onClick={() => { setRejectModal(true); setActionBy(""); }}
                                        className="flex items-center gap-2 bg-red-100 hover:bg-red-700 text-red-600 hover:text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow-md transition-colors"
                                    >
                                        <XCircle className="w-5 h-5" />
                                        Reject
                                    </button>
                                )}

                            {sale.status === ItemTransactionStatus.Approved && (
                                <button
                                    onClick={() => { setPaidModal(true); setActionBy(""); }}
                                    className="flex items-center gap-2 bg-red-100 hover:bg-red-700 text-red-600 hover:text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow-md transition-colors"
                                >
                                    <CreditCard className="w-5 h-5" />
                                    Mark Paid
                                </button>
                            )}

                            <Link
                                href={`/item-sale/update/${sale.itemSaleId}`}
                                className="flex items-center gap-2 bg-red-100 hover:bg-red-700 text-red-600 hover:text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow-md transition-all"
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

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {details.map((d, index) => {
                                const Icon = d.icon;
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
                                                <p className="text-sm text-slate-500 font-medium">{d.label}</p>
                                                <h3 className="text-lg font-bold text-slate-800 mt-1 wrap-break-word">
                                                    {d.value || "-"}
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-10 rounded-3xl bg-linear-to-r from-red-600 to-red-900 p-8 shadow-xl">
                            <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                                <div>
                                    <h2 className="text-3xl uppercase font-bold text-white">{sale.itemName}</h2>
                                    <p className="text-red-100 mt-2 text-lg">
                                        {sale.quantity} unit(s) — {sale.paymentMode}
                                    </p>
                                </div>
                                <div className="bg-white/20 backdrop-blur-lg px-8 py-5 rounded-2xl border border-white/20">
                                    <p className="text-red-100 text-sm">Total Amount</p>
                                    <h3 className="text-2xl font-bold text-white">
                                        Rs. {sale.totalAmount.toLocaleString()}
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <MidModal
                isOpen={deleteModal}
                title="Delete Sale"
                description="Are you sure you want to delete this sale record? If it was already approved, the stock deducted will be restored."
                itemName={`${sale.itemName} — Rs. ${sale.totalAmount.toLocaleString()}`}
                isDeleting={isDeleting}
                onConfirm={handleDelete}
                onClose={() => setDeleteModal(false)}
            />

            {approveModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div onClick={(e) => e.stopPropagation()} className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 p-8">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="bg-green-100 text-green-600 p-3 rounded-2xl">
                                <CheckCircle className="w-6 h-6" />
                            </div>
                            <h2 className="text-xl font-bold text-slate-800">Approve Sale</h2>
                        </div>
                        <p className="text-sm text-slate-500 mb-4">
                            Approving will deduct <span className="font-semibold text-slate-700">{sale.quantity} {sale.itemName}</span> from stock.
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

            {rejectModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div onClick={(e) => e.stopPropagation()} className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 p-8">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="bg-orange-100 text-orange-600 p-3 rounded-2xl">
                                <XCircle className="w-6 h-6" />
                            </div>
                            <h2 className="text-xl font-bold text-slate-800">Reject Sale</h2>
                        </div>
                        <p className="text-sm text-slate-500 mb-4">
                            You are rejecting: <span className="font-semibold text-slate-700">{sale.itemName} — Rs. {sale.totalAmount.toLocaleString()}</span>
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

            {paidModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div onClick={(e) => e.stopPropagation()} className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 p-8">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="bg-blue-100 text-blue-600 p-3 rounded-2xl">
                                <CreditCard className="w-6 h-6" />
                            </div>
                            <h2 className="text-xl font-bold text-slate-800">Mark as Paid</h2>
                        </div>
                        <p className="text-sm text-slate-500 mb-4">
                            Confirm payment has been received for: <span className="font-semibold text-slate-700">{sale.itemName} — Rs. {sale.totalAmount.toLocaleString()}</span>
                        </p>
                        <CustomInput
                            label="Marked By *"
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
                                onClickFunction={() => setPaidModal(false)}
                            />
                            <CustomButton
                                buttonText={isActioning ? "Saving..." : "Mark Paid"}
                                buttonColor="bg-blue-600"
                                buttonHoverColor="bg-blue-700"
                                className="flex-1 text-white py-2.5 rounded-full"
                                onClickFunction={handleMarkPaid}
                                disabled={isActioning}
                            />
                        </div>
                    </div>
                </div>
            )}
        </Container>
    );
};

export default GetSaleById;
