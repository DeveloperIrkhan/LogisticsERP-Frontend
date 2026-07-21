import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { IconType } from "react-icons";

export interface QuickLinkItem {
    label: string;
    href: string;
    icon: IconType;
    color: string;
}

interface QuickLinksProps {
    title?: string;
    links: QuickLinkItem[];
    className?: string;
}

const QuickLinks = ({
    title = "Quick Actions",
    links,
    className = "",
}: QuickLinksProps) => {
    
    return (
        <div className={className}>
            <h2 className="text-lg font-semibold mb-4">{title}</h2>

            <div className="flex flex-col md:flex-row gap-3 items-center justify-around">
                {links.map((item, index) => {
                    const Icon = item.icon;

                    return (
                        <Link
                            key={index}
                            href={item.href}
                            className={`group flex items-center justify-between rounded-2xl 
                border border-slate-100 p-4 shadow-sm transition-all 
                duration-300 hover:shadow-md hover:text-white ${item.color} 
               `}
                        >
                            <div className="flex items-center gap-4">
                                <Icon className="text-2xl" size={20} />

                                <span className="text-sm">{item.label}</span>
                            </div>

                            <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default QuickLinks;