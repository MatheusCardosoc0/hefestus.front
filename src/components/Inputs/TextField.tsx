import { HTMLInputTypeAttribute, InputHTMLAttributes, useEffect, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { UseFormRegister } from 'react-hook-form';
import toast from 'react-hot-toast';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
    register: UseFormRegister<any>;
    type?: HTMLInputTypeAttribute;
    disabled?: boolean;
    id: string;
    isUppercase?: boolean;
    customStyle?: string
}

const TextField: React.FC<TextFieldProps> = ({
    error,
    label,
    register,
    type = 'text',
    disabled,
    id,
    isUppercase,
    customStyle
}) => {
    const [typeTextField, setTypeTextField] = useState(type);
    const [isFocused, setIsFocused] = useState(false);

    const toggleVisibility = () => {
        setTypeTextField(prev => prev === 'password' ? 'text' : 'password');
    };

    useEffect(() => {
        if (error) toast.error(error)
    }, [error])

    return (
        <div className="flex flex-col w-full h-[60px]">
            <label htmlFor={id} className={`text-sm font-bold
            ${isFocused && 'text-blue-500'}
            ${error && 'text-red-500'}
            `}>
                {label}
            </label>
            <div className="relative">
                <input
                    id={id}
                    {...register(id)}
                    disabled={disabled}
                    type={typeTextField}
                    autoComplete="off"
                    className={`w-full p-2 border-2 border-neutral-500
                    ${error ? 'border-red-500' : 'border-gray-300'}
                    ${isUppercase && 'uppercase'}
                    rounded-md focus:outline-none focus:border-blue-500
                    ${customStyle}
                    `}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />
                {type === 'password' && (
                    <span
                        onClick={toggleVisibility}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer">
                        {typeTextField === 'password' ? <EyeOff /> : <Eye />}
                    </span>
                )}
            </div>
            {error && (
                <span className="text-xs text-red-500">{error}</span>
            )}
        </div>
    );
};

export default TextField;
