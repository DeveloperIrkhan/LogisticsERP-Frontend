const SectionHeader = ({
    title,
    subtitle,
    icon,
}: {
    title: string;
    subtitle?: string;
    icon: React.ReactNode;
}) => (
    <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-red-100 text-red-600 rounded-lg">{icon}</div>
        <div>
            <h2 className="text-lg font-bold text-gray-800">{title}</h2>
            {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
        </div>
    </div>
);


export default SectionHeader