import { useState } from "react";
import { Search, Menu, ArrowRight } from "lucide-react";
import TopBar from "./TopBar";
import Logo from "./Logo";
import NavLinksStyle1 from "./NavLinksStyle1";
import NavLinksStyle2 from "./NavLinksStyle2";
import MobileMenu from "./MobileMenu";

export type DropdownStyle = "plain" | "divided";

interface NavbarProps {
  /** Which dropdown visual style to use on desktop. Defaults to "plain". */
  dropdownStyle?: DropdownStyle;
}

const NavbarComponent = ({ dropdownStyle = "plain" }: NavbarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const NavLinks =
    dropdownStyle === "divided" ? NavLinksStyle2 : NavLinksStyle1;

  return (
    <header className="w-full font-sans">
      <TopBar />

      <div className="border-b border-gray-100 bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between pr-4 md:pr-6 lg:pr-8">
          <Logo />

          {/* Desktop nav */}
          <nav className="hidden lg:block">
            <NavLinks />
          </nav>

          {/* Right side: search + CTA (desktop), hamburger (mobile) */}
          <div className="flex items-center gap-5">
            <a
              href="#"
              className="hidden items-center gap-2 rounded-sm bg-red-600 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-red-700 lg:flex"
            >
              CONTACT US
              <ArrowRight size={15} />
            </a>

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="flex items-center justify-center p-2 text-gray-800 lg:hidden"
            >
              <Menu size={26} />
            </button>
          </div>
        </div>
      </div>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
};


export default NavbarComponent