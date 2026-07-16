interface IHeaderBand {
    title: string,
    icon?: React.ReactNode,
    subtitle: string
}
const HeaderBand = ({ title, icon, subtitle }: IHeaderBand) => {
    return (
        <div className="bg-linear-to-r from-red-500 via-dark-color to-red-900 p-3 md:p-5">
            <div className="flex flex-col md:flex-row md:items-center gap-5">
                <div className="bg-white/20 backdrop-blur-md p-5 rounded-3xl w-fit">
                    {icon && <span>
                        {icon}
                    </span>
                    }
                </div>

                <div>
                    <h1 className="text-lg md:text-xl font-extrabold text-white tracking-wide">
                        {title}
                    </h1>

                    <p className="text-red-100 mt-2 text-sm break-all">
                        {subtitle}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default HeaderBand
