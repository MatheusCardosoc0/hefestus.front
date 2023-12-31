import React, { useState, useEffect } from 'react';
import { Button } from '../Buttons';
import { BasicInput } from '.';

interface SelectProps {
    options: any[];
    label: string;
    setValue: Function;
    id?: string;
    customStyle?: string;
    openModalApiConnectionPost?: () => void;
    openModalApiConnectionPut?: () => void;
    openModalApiConnectionGetList?: () => void;
}

const Select: React.FC<SelectProps> = ({
    label,
    options,
    setValue,
    id,
    customStyle,
    openModalApiConnectionPost,
    openModalApiConnectionPut,
    openModalApiConnectionGetList
}) => {
    const [inputValue, setInputValue] = useState('');
    const [filteredOptions, setFilteredOptions] = useState<Array<string>>([]);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    useEffect(() => {
        if (inputValue !== '') {
            const lowerCaseInputValue = inputValue.toLowerCase();
            const filtered = options
                .filter(option => option.name.toLowerCase().includes(lowerCaseInputValue))
                .slice(0, 5);
            setFilteredOptions(filtered);
        } else {
            setFilteredOptions(options.slice(0, 5));
        }
    }, [inputValue, options]);

    const handleOptionClick = (option: any) => {
        setInputValue(option.name);
        setValue(option);
        setIsDropdownVisible(false); // Esconde a lista suspensa após a seleção
    };

    return (
        <div className="flex flex-col w-full">
            <div className="flex gap-1">
                <div className='relative'
                    onFocus={() => setIsDropdownVisible(true)}
                    onBlur={() => setIsDropdownVisible(false)}
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
                        <ul className="absolute top-[120%] rounded-lg Fade drop-shadow-[0px_0px_1px_black] w-full font-medium">
                            {filteredOptions.map((option: any) => (
                                <li
                                    key={option.id}
                                    onClick={() => handleOptionClick(option)}
                                    className='bg-neutral-100 p-2 even:bg-neutral-300 hover:bg-neutral-500 cursor-pointer'
                                >
                                    {option.name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                {/* Botões e outras partes do componente... */}
            </div>
        </div>
    );
};

export default Select;
