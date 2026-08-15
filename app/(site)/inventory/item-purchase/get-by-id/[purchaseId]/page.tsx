"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
    ShoppingCart,
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
    getPurchaseByIdAsync,
    deletePurchaseAsync,
    approvePurchaseAsync,
    rejectPurchaseAsync,
    markPurchasePaidAsync,
} from "@/modules/inventory/purchase/api";
import {
    IItemPurchaseResponseDto,
    ItemTransactionStatus,
    getPurchaseStatusStyle,
} from "@/modules/inventory/purchase/interfaces";
import MidModal from "@/components/Modals/MidModal";

const GetPurchaseById = () => {
    const params = useParams();
    const router = useRouter();
    const purchaseId = params?.purchaseId as string;

    const [isLoading, setIsLoading] = useState(false);
    const [purchase, setPurchase] = useState<IItemPurchaseResponseDto | null>(null);

    const [deleteModal, setDeleteModal] = useState(false);
    const [approveModal, setApproveModal] = useState(false);
    const [rejectModal, setRejectModal] = useState(false);
    const [paidModal, setPaidModal] = useState(false);

    const [isDeleting, setIsDeleting] = useState(false);
    const [isActioning, setIsActioning] = useState(false);
    const [actionBy, setActionBy] = useState("");

    const fetchPurchase = async () => {
        try {
            setIsLoading(true);
            const response = await getPurchaseByIdAsync(purchaseId);
            if (response.success) {
                setPurchase(response.data);
                console.log("Fetched purchase:", response.data);
            } else {
                toast.error(response.message);
            }
        } catch {
            toast.error("Failed to load purchase.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!purchaseId) return;
        fetchPurchase();
    }, [purchaseId]);

    const handleDelete = async () => {
        try {
            setIsDeleting(true);
            const res = await deletePurchaseAsync(purchaseId);
            if (res.success) {
                toast.success("Purchase deleted successfully!");
                router.push("/inventory/item-purchase/view-all");
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
            const res = await approvePurchaseAsync(purchaseId, actionBy);
            if (res.success) {
                toast.success(res.message || "Purchase approved and stock updated!");
                setPurchase(res.data);
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
            const res = await rejectPurchaseAsync(purchaseId, actionBy);
            if (res.success) {
                toast.success(res.message || "Purchase rejected!");
                setPurchase(res.data);
                setRejectModal(false);
                console.log("Updated purchase after rejection:", res.data);
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
            const res = await markPurchasePaidAsync(purchaseId, actionBy);
            if (res.success) {
                toast.success(res.message || "Purchase marked as paid!");
                setPurchase(res.data);
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

    if (!purchase) {
        return (
            <Container className="flex justify-center items-center min-h-[70vh]">
                <p className="text-xl text-red-500 font-semibold">Purchase not found</p>
            </Container>
        );
    }

    const details = [
        { label: "Item", value: purchase.itemName, icon: ShoppingCart },
        { label: "Quantity", value: purchase.quantity, icon: Hash },
        { label: "Unit Price", value: `Rs. ${purchase.unitPrice.toLocaleString()}`, icon: Wallet },
        { label: "Purchase Date", value: new Date(purchase.purchaseDate).toDateString(), icon: Calendar },
        { label: "Payment Mode", value: purchase.paymentMode, icon: CreditCard },
        { label: "Supplier Name", value: purchase.supplierName, icon: Truck },
        { label: "Invoice Number", value: purchase.invoiceNumber, icon: FileText },
        { label: "Vehicle ID", value: purchase.vehicleId, icon: Truck },
        { label: "Notes", value: purchase.notes, icon: FileText },
        { label: "Created At", value: new Date(purchase.createdAt).toDateString(), icon: Calendar },
        { label: "Added By", value: purchase.addedBy, icon: User },
        { label: "Approved By", value: purchase.approvedBy, icon: User },
    ];

    return (
        <Container className="py-8">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200">

                    <div className="bg-linear-to-r mb-4 from-red-500 via-dark-color rounded-t-xl to-red-900 p-3 md:p-5">
                        <div className="flex  md:flex-row md:items-center justify-between gap-5">
                            <div className="flex items-center gap-4">

                                <div className="bg-white/20 backdrop-blur-md p-5 rounded-3xl w-fit">
                                    <ShoppingCart className="w-7 h-7 text-white" />
                                </div>
                                <div className="">
                                    <p className="text-white text-2xl font-bold">
                                        Purchase Details
                                    </p>
                                    <p className="text-white text-sm">
                                        {purchase.itemPurchaseId}
                                    </p>
                                </div>

                            </div>
                            <div className="flex items-center gap-4">
                                <div className="bg-white/20 text-white shadow-lg border border-white/20 rounded-2xl px-6 py-4">

                                    {purchase.status}
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="p-6 bg-gray-100 md:p-10">

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-3 p-4 mb-6 bg-white rounded-3xl shadow-md border border-slate-200">
                            {purchase.status === ItemTransactionStatus.Pending && (
                                <button
                                    onClick={() => { setApproveModal(true); setActionBy(""); }}
                                    className="flex items-center gap-2 bg-red-100 hover:bg-red-700 text-red-600 hover:text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow-md transition-colors"
                                >
                                    <CheckCircle className="w-5 h-5" />
                                    Approve
                                </button>
                            )}

                            {(purchase.status === ItemTransactionStatus.Pending ||
                                purchase.status === ItemTransactionStatus.Approved) && (
                                    <button
                                        onClick={() => { setRejectModal(true); setActionBy(""); }}
                                        className="flex items-center gap-2 bg-red-100 hover:bg-red-700 text-red-600 hover:text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow-md transition-colors"
                                    >
                                        <XCircle className="w-5 h-5" />
                                        Reject
                                    </button>
                                )}

                            {purchase.status === ItemTransactionStatus.Approved && (
                                <button
                                    onClick={() => { setPaidModal(true); setActionBy(""); }}
                                    className="flex items-center gap-2 bg-red-100 hover:bg-red-700 text-red-600 hover:text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow-md transition-colors"
                                >
                                    <CreditCard className="w-5 h-5" />
                                    Mark Paid
                                </button>
                            )}

                            <Link
                                href={`/inventory/item-purchase/update-item/${purchase.itemPurchaseId}`}
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

                        {/* Details Grid */}
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
                                                <h3 className="text-md font-semibold text-slate-800 mt-1 wrap-break-word">
                                                    {d.value || "-"}
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Footer Banner */}
                        <div className="mt-10 rounded-3xl bg-linear-to-r from-red-600 to-red-900 p-8 shadow-xl">
                            <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                                <div>
                                    <h2 className="text-3xl uppercase font-bold text-white">{purchase.itemName}</h2>
                                    <p className="text-red-100 mt-2 text-lg">
                                        {purchase.quantity} unit(s) — {purchase.paymentMode}
                                    </p>
                                </div>
                                <div className="bg-white/20 backdrop-blur-lg px-8 py-5 rounded-2xl border border-white/20">
                                    <p className="text-red-100 text-sm">Total Amount</p>
                                    <h3 className="text-2xl font-bold text-white">
                                        Rs. {purchase.totalAmount.toLocaleString()}
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <MidModal
                isOpen={deleteModal}
                title="Delete Purchase"
                description="Are you sure you want to delete this purchase record? If it was already approved, the stock added will be reversed."
                itemName={`${purchase.itemName} — Rs. ${purchase.totalAmount.toLocaleString()}`}
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
                            <h2 className="text-xl font-bold text-slate-800">Approve Purchase</h2>
                        </div>
                        <p className="text-sm text-slate-500 mb-4">
                            Approving will add <span className="font-semibold text-slate-700">{purchase.quantity} {purchase.itemName}</span> to stock.
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
                            <h2 className="text-xl font-bold text-slate-800">Reject Purchase</h2>
                        </div>
                        <p className="text-sm text-slate-500 mb-4">
                            You are rejecting: <span className="font-semibold text-slate-700">{purchase.itemName} — Rs. {purchase.totalAmount.toLocaleString()}</span>
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
                            Confirm the supplier has been paid for: <span className="font-semibold text-slate-700">{purchase.itemName} — Rs. {purchase.totalAmount.toLocaleString()}</span>
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

export default GetPurchaseById;
