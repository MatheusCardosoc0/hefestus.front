import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../Buttons';
import { BasicInput } from '.';
import { PenLine, UserPlus, Wifi } from 'lucide-react';
import toast from 'react-hot-toast';

interface AdvancedSelectProps {
    options: any[];
    label: string;
    setValue: Function;
    id?: string;
    customStyle?: string;
    keyState: string
    watch?: Function
    trigger?: boolean
    openModalApiConnectionPost?: () => void;
    openModalApiConnectionPut?: () => void;
    openModalApiConnectionGetList?: () => void;
    secondaryOptions?: any[]
    currentValue?: any
}

const AdvancedSelect: React.FC<AdvancedSelectProps> = ({
    label,
    options,
    setValue,
    id,
    customStyle,
    keyState,
    watch,
    openModalApiConnectionPost,
    openModalApiConnectionPut,
    openModalApiConnectionGetList,
    secondaryOptions,
    trigger,
    currentValue
}) => {
    const [inputValue, setInputValue] = useState('');
    const [filteredOptions, setFilteredOptions] = useState<Array<string>>([]);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [isMouseOverOptions, setIsMouseOverOptions] = useState(false);
    const [isChangeOptions, setIsChangeOptions] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (currentValue) setInputValue(currentValue.name)
    }, [currentValue])

    useEffect(() => {
        if (inputValue !== '') {
            if (!trigger) {
                const lowerCaseInputValue = inputValue.toLowerCase();
                const filtered = options
                    .filter(option => option.name.toLowerCase().includes(lowerCaseInputValue))
                    .slice(0, 5);
                setFilteredOptions(filtered);
            }
            if (trigger && secondaryOptions) {
                const lowerCaseInputValue = inputValue.toLowerCase();
                const filtered = secondaryOptions
                    .filter(option => option.name.toLowerCase().includes(lowerCaseInputValue))
                    .slice(0, 5);
                setFilteredOptions(filtered);
            }
        } else {
            if (!trigger) {
                setFilteredOptions(options.slice(0, 5));
            }
            if (trigger && secondaryOptions) {
                setFilteredOptions(secondaryOptions.slice(0, 5))
            }
        }
    }, [inputValue, options, trigger, secondaryOptions]);

    const handleOptionClick = (option: any) => {
        if (watch) {
            const currentValue = watch(keyState);

            const checkItemNotRepeat = currentValue.some((item: any) => item.id === option.id)

            if (checkItemNotRepeat) {
                toast("Item já adicionado ao grupo")
                return
            }

            const newValue = Array.isArray(currentValue) ? [...currentValue, option] : [option];

            setValue(keyState, newValue);
        } else {
            setValue(keyState, option);
        }
        setInputValue(option.name);
        setIsDropdownVisible(false);
    };

    const handleBlur = (event: any) => {
        if (!isMouseOverOptions && containerRef.current && !containerRef.current.contains(event.relatedTarget)) {
            setIsDropdownVisible(false);
        }
    };

    return (
        <div className="flex gap-1 items-end" ref={containerRef}>
            <div className='relative'
                onFocus={() => setIsDropdownVisible(true)}
                onBlur={handleBlur}
            >
                <BasicInput
                    label={label}
                    type='text'
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    id={id}
                    customStyle={customStyle}
                />
                {isDropdownVisible && (
                    <ul
                        onMouseEnter={() => setIsMouseOverOptions(true)}
                        onMouseLeave={() => setIsMouseOverOptions(false)}
                        className="absolute top-[120%] rounded-lg Fade drop-shadow-[0px_0px_1px_black] w-full font-medium z-20 overflow-hidden">
                        {filteredOptions.map((option: any) => (
                            <li
                                key={option.id}
                                onClick={() => handleOptionClick(option)}
                                className='bg-neutral-100 p-2 even:bg-neutral-300 hover:bg-neutral-500 cursor-pointer flex gap-2'
                            >
                                <span
                                    className='w-[46px] overflow-hidden'
                                >
                                    {option.id}
                                </span>
                                <span>
                                    {option.name}
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            {(openModalApiConnectionPut && !trigger) && (
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
        </div>
    );
};

export default AdvancedSelect;
