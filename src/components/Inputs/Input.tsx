import { HTMLInputTypeAttribute, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface BasicInputProps {
    label: string;
    onChange: (value: any) => void
    type?: HTMLInputTypeAttribute;
    value?: string | number
    disabled?: boolean;
    id: any
    customStyle?: string
}

const BasicInput: React.FC<BasicInputProps> = ({
    label,
    type = 'text',
    disabled,
    onChange,
    value,
    id,
    customStyle
}) => {
    const [typeInput, setTypeInput] = useState(type);
    const [isFocused, setIsFocused] = useState(false);

    const toggleVisibility = () => {
        setTypeInput(prev => prev === 'password' ? 'text' : 'password');
    };

    return (
        <div className="flex flex-col w-full h-[60px]">
            <label htmlFor={id} className={`text-sm font-bold
            ${isFocused && 'text-blue-500'}
            `}>
                {label}
            </label>
            <div className="relative">
                <input
                    id={id}
                    onChange={onChange}
                    value={value}
                    disabled={disabled}
                    type={typeInput}
                    autoComplete="true"
                    className={`w-full p-2 border-2 border-neutral-400 
                    rounded-md focus:outline-none focus:border-blue-500 ${customStyle}`}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />
                {type === 'password' && (
                    <span
                        onClick={toggleVisibility}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer">
                        {typeInput === 'password' ? <EyeOff /> : <Eye />}
                    </span>
                )}
            </div>
        </div>
    );
};

export default BasicInput;
