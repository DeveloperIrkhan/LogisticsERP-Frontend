import { ChevronDown } from 'lucide-react';
import { NAV_ITEMS } from './navData';

export default function NavLinksStyle1() {
  return (
    <ul className="flex items-center gap-7">
      {NAV_ITEMS.map((item) => (
        <li key={item.label} className="group relative">
          <a
            href={item.href}
            className="flex items-center gap-1 py-7 text-[15px] font-bold text-gray-800 transition-colors hover:text-red-600"
          >
            {item.label}
            {item.dropdown && (
              <ChevronDown
                size={14}
                className="mt-0.5 transition-transform duration-200 group-hover:rotate-180"
              />
            )}
          </a>

          {item.dropdown && (
            <div
              className="invisible absolute left-0 top-full z-30 w-56 translate-y-2 rounded-md bg-white py-2 opacity-0 shadow-xl ring-1 ring-black/5 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100"
            >
              <ul>
                {item.dropdown.map((sub) => (
                  <li key={sub.label}>
                    <a
                      href={sub.href}
                      className="block px-5 py-2.5 text-sm text-gray-700 transition-colors hover:bg-gray-50 hover:text-red-600"
                    >
                      {sub.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
