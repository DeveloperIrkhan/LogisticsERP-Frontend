interface InputProps {
  value: string | number | Date;
  onChange: (value: string | number | Date) => void;
  placeholder?: string;
  type?: string;
  className?: string;
  label?: string;
  id?: string;
  Icon?: React.ElementType;
}

const CustomInput = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  type,
  className,
  Icon,
  ...props
}: InputProps) => {
  return (
    <div className="flex items-center gap-6 px-4 py-4 bg-gray-color hover:bg-gray-300 rounded-2xl group transition-all duration-300">
      <div className="bg-red-100 text-red-600 p-4 rounded-full group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
        {Icon && <Icon className="w-5 h-5" />}
      </div>
      <div className="flex-1 gap-y-4">
        <label className="text-md font-medium text-slate-500 group-hover:text-red-500 duration-400">
          {label}
        </label>
        <input
          {...props}
          id={id}
          type={type}
          value={value}
          className={`${className}`}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default CustomInput;
