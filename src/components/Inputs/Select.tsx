import { ReactNode, useState } from 'react';

interface SelectProps {
    label: string;
    onChange: (value: any) => void
    disabled?: boolean;
    id?: string
    children: ReactNode
    customStyle?: string
    value?: any
}

const Select: React.FC<SelectProps> = ({
    label,
    disabled,
    onChange,
    id,
    children,
    customStyle,
    value
}) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className="flex flex-col w-full h-[60px]">
            <label htmlFor={id} className={`text-sm font-bold
            ${isFocused && 'text-blue-500'}
            `}>
                {label}
            </label>
            <div className="relative">
                <select
                    id={id}
                    onChange={onChange}
                    disabled={disabled}
                    value={value}
                    autoComplete="true"
                    className={`w-full p-2 border-2 border-neutral-400 
                    rounded-md focus:outline-none focus:border-blue-500 ${customStyle}`}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                >
                    {children}
                </select>
            </div>
        </div>
    );
};

export default Select;