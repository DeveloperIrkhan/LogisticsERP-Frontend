import { ChevronDown } from 'lucide-react';
import { NAV_ITEMS } from './navData';

export default function NavLinksStyle2() {
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
            <div className="invisible absolute left-0 top-full z-30 w-60 translate-y-2 overflow-hidden rounded-md bg-white opacity-0 shadow-xl ring-1 ring-black/5 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              <ul className="divide-y divide-gray-100">
                {item.dropdown.map((sub) => (
                  <li key={sub.label}>
                    <a
                      href={sub.href}
                      className="group/item relative flex items-center border-l-2 border-transparent px-5 py-3 text-sm text-gray-700 transition-all duration-150 hover:border-red-600 hover:bg-gray-50 hover:pl-6 hover:text-red-600"
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
