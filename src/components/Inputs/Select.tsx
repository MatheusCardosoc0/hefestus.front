import { RefreshCcw, UserPlus } from 'lucide-react';
import { MouseEventHandler, ReactNode, SelectHTMLAttributes, useState } from 'react';
import { Button } from '../Buttons';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    onChange: (value: any) => void
    disabled?: boolean;
    id?: string
    children: ReactNode
    customStyle?: string
    openModalApiConnection?: () => void
}

const Select: React.FC<SelectProps> = ({
    label,
    disabled,
    onChange,
    id,
    children,
    customStyle,
    openModalApiConnection,
    ...props
}) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className="flex flex-col w-full h-[60px]">
            <label htmlFor={id} className={`text-sm font-bold
            ${isFocused && 'text-blue-500'}
            `}>
                {label}
            </label>
            <div className="relative flex gap-1">
                <select
                    id={id}
                    onChange={onChange}
                    disabled={disabled}
                    {...props}
                    autoComplete="true"
                    className={`w-full p-2 border-2 border-neutral-400 
                    rounded-md focus:outline-none focus:border-blue-500 ${customStyle}`}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                >
                    {children}
                </select>
                {openModalApiConnection && (
                    <div
                        className='
                        flex
                        gap-1
                      '
                    >
                        <Button
                            variantColor='blue'
                            customStyle='rounded-lg'
                            type='button'
                        >
                            <RefreshCcw />
                        </Button>
                        <Button
                            variantColor='green'
                            customStyle='rounded-lg'
                            onClick={openModalApiConnection}
                            type='button'
                        >
                            <UserPlus />
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Select;
