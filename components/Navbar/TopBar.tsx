import { Mail, Phone } from 'lucide-react';
import { SOCIAL_LINKS, type SocialLink } from './navData';
import { FacebookIcon, TwitterIcon, LinkedinIcon, YoutubeIcon } from './SocialIcons';

const ICONS: Record<SocialLink['icon'], React.ComponentType<{ size?: number; className?: string }>> = {
  facebook: FacebookIcon,
  twitter: TwitterIcon,
  linkedin: LinkedinIcon,
  youtube: YoutubeIcon,
};

export default function TopBar() {
  return (
    <div className="hidden bg-default-color/50 text-gray-300 md:block">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2.5 text-sm">
        <div className="flex items-center gap-6">
          <a
            href="mailto:info@example.com"
            className="flex items-center gap-2 transition-colors hover:text-white"
          >
            <Mail size={14} className="text-red-600" />
            info@example.com
          </a>
          <a
            href="tel:+208-666-0112"
            className="flex items-center gap-2 transition-colors hover:text-white"
          >
            <Phone size={14} className="text-red-600" />
            +208-666-0112
          </a>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-gray-400">Follow Us:</span>
          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map((social) => {
              const Icon = ICONS[social.icon];
              return (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="text-gray-300 transition-colors hover:text-red-600"
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
