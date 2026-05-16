import { ShoppingBag, ShoppingCart } from "lucide-react";
import Link from "next/link";
const CartIcon = () => {
  return (
    <Link href="/cart" className="group relative hoverEffect">
      <ShoppingCart className="hoverEffect w-5 h-5 hover:text-secondary-color hover:cursor-pointer" />
      <span
        className={`absolute -top-2 -right-2 hoverEffect text-white text-[12px] bg-secondary-color group-hover:bg-accent-color rounded-full w-4 h-4 flex justify-center items-center`}
      >
        0
      </span>
    </Link>
  );
};

export default CartIcon;
