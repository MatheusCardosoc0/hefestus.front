import { HTMLInputTypeAttribute, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { UseFormRegister } from 'react-hook-form';

interface InputProps {
    label: string;
    error?: string;
    register: UseFormRegister<any>;
    type?: HTMLInputTypeAttribute;
    disabled?: boolean;
    id: string;
    isUppercase?: boolean;
}

const Input: React.FC<InputProps> = ({
    error,
    label,
    register,
    type = 'text',
    disabled,
    id,
    isUppercase
}) => {
    const [typeInput, setTypeInput] = useState(type);
    const [isFocused, setIsFocused] = useState(false);

    const toggleVisibility = () => {
        setTypeInput(prev => prev === 'password' ? 'text' : 'password');
    };

    return (
        <div className="flex flex-col w-full h-[60px]">
            <label htmlFor={id} className={`text-sm font-bold text-gray-700 
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
                    type={typeInput}
                    autoComplete="off"
                    className={`w-full p-2 border 
                    ${error ? 'border-red-500' : 'border-gray-300'}
                    ${isUppercase && 'uppercase'}
                    rounded-md focus:outline-none focus:border-blue-500`}
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
            {error && (
                <span className="text-xs text-red-500">{error}</span>
            )}
        </div>
    );
};

export default Input;
