import { useState } from 'react';
import { X, ChevronDown, Mail, Phone } from 'lucide-react';
import { NAV_ITEMS, SOCIAL_LINKS, type SocialLink } from './navData';
import { FacebookIcon, TwitterIcon, LinkedinIcon, YoutubeIcon } from './SocialIcons';
import Image from 'next/image';
import { images } from '@/public/images';

const ICONS: Record<SocialLink['icon'], React.ComponentType<{ size?: number; className?: string }>> = {
  facebook: FacebookIcon,
  twitter: TwitterIcon,
  linkedin: LinkedinIcon,
  youtube: YoutubeIcon,
};

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggleItem = (label: string) => {
    setOpenItem((current) => (current === label ? null : label));
  };

  return (
    <div
      className={`fixed inset-0 z-50 bg-white transition-opacity duration-300 md:hidden ${
        open ? 'visible opacity-100' : 'invisible opacity-0'
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation menu"
    >
      <div className="flex h-full flex-col overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <span className="flex items-center gap-2 text-xl font-bold text-gray-900">
            <span className="flex h-16 w-12 items-center justify-center rounded text-white">
              <Image src={images.logo} alt="" className='h-16' height={400} width={100} />
            </span>
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-9 w-9 items-center justify-center rounded-full text-gray-600 transition-colors hover:bg-gray-100 hover:text-red-600"
          >
            <X size={22} />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-5 py-4">
          <ul className="divide-y divide-gray-100">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                {item.dropdown ? (
                  <>
                    <button
                      type="button"
                      onClick={() => toggleItem(item.label)}
                      className="flex w-full items-center justify-between py-3.5 text-left text-base font-medium text-gray-800"
                      aria-expanded={openItem === item.label}
                    >
                      {item.label}
                      <ChevronDown
                        size={18}
                        className={`text-gray-500 transition-transform duration-200 ${
                          openItem === item.label ? 'rotate-180 text-red-600' : ''
                        }`}
                      />
                    </button>
                    <div
                      className={`grid overflow-hidden transition-all duration-300 ${
                        openItem === item.label ? 'grid-rows-[1fr] pb-3 opacity-100' : 'grid-rows-[0fr] opacity-0'
                      }`}
                      style={{ gridTemplateRows: openItem === item.label ? '1fr' : '0fr' }}
                    >
                      <ul className="min-h-0 space-y-1 pl-4">
                        {item.dropdown.map((sub) => (
                          <li key={sub.label}>
                            <a
                              href={sub.href}
                              className="block rounded-md py-2 text-sm text-gray-600 transition-colors hover:bg-gray-50 hover:text-red-600"
                            >
                              {sub.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  <a
                    href={item.href}
                    className="block py-3.5 text-base font-medium text-gray-800 transition-colors hover:text-red-600"
                  >
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer: contact + socials */}
        <div className="space-y-4 border-t border-gray-100 px-5 py-5">
          <a href="#" className="flex items-center justify-center gap-2 rounded-md bg-red-600 px-5 py-3 text-sm font-semibold text-white">
            CONTACT US
          </a>
          <div className="flex flex-col gap-2 text-sm text-gray-600">
            <a href="mailto:info@example.com" className="flex items-center gap-2">
              <Mail size={14} className="text-red-600" /> info@example.com
            </a>
            <a href="tel:+208-666-0112" className="flex items-center gap-2">
              <Phone size={14} className="text-red-600" /> +208-666-0112
            </a>
          </div>
          <div className="flex items-center gap-4 pt-1">
            {SOCIAL_LINKS.map((social) => {
              const Icon = ICONS[social.icon];
              return (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-red-600 hover:text-white"
                >
                  <Icon size={14} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
