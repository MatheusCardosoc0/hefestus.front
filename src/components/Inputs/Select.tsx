import { Eraser, PenLine, RefreshCcw, UserPlus, Wifi } from 'lucide-react';
import { MouseEventHandler, ReactNode, SelectHTMLAttributes, useState } from 'react';
import { Button } from '../Buttons';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    onChange: (value: any) => void
    disabled?: boolean;
    id?: string
    children: ReactNode
    customStyle?: string
    openModalApiConnectionPost?: () => void
    openModalApiConnectionPut?: () => void
    openModalApiConnectionGetList?: () => void
    openModalApiConnectionGetDeleteStackArray?: () => void
}

const Select: React.FC<SelectProps> = ({
    label,
    disabled,
    onChange,
    id,
    children,
    customStyle,
    openModalApiConnectionPost,
    openModalApiConnectionPut,
    openModalApiConnectionGetList,
    openModalApiConnectionGetDeleteStackArray,
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
                <div
                    className='
                        flex
                        gap-1
                      '
                >
                    {openModalApiConnectionPut && (
                        <Button
                            type='button'
                            variantColor='orange'
                            customStyle='rounded-lg max-w-[36px]'
                            onClick={openModalApiConnectionPut}
                        >
                            <PenLine />
                        </Button>
                    )}
                    {openModalApiConnectionPost && (
                        <Button
                            type='button'
                            variantColor='green'
                            customStyle='rounded-lg max-w-[36px]'
                            onClick={openModalApiConnectionPost}
                        >
                            <UserPlus />
                        </Button>
                    )}
                    {openModalApiConnectionGetList && (
                        <Button
                            type='button'
                            variantColor='blue'
                            customStyle='rounded-lg max-w-[36px]'
                            onClick={openModalApiConnectionGetList}
                        >
                            <Wifi />
                        </Button>
                    )}
                    {openModalApiConnectionGetDeleteStackArray && (
                        <Button
                            type='button'
                            variantColor='red'
                            customStyle='rounded-lg max-w-[36px]'
                            onClick={openModalApiConnectionGetDeleteStackArray}
                        >
                            <Eraser />
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Select;
