import { useState } from 'react';
import { Input } from '../Inputs';
import { Button } from '../Buttons';
import { Search } from 'lucide-react';
import { Column } from './BasicTable';

export interface FilterForTableProps {
    dataList: any[]
    setFilteredDataList: (value: any) => void
    LabelId?: string
    LabelName?: string
    columns: Column[]
}

const FilterForTable: React.FC<FilterForTableProps> = ({
    dataList,
    setFilteredDataList,
    LabelId = 'Código:',
    LabelName = 'Nome:',
    columns
}) => {
    const [isSearchTermId, setIsSearchTermId] = useState('')
    const [isSearchTermName, setIsSearchTermName] = useState('')
    const [currentLabelName, setCurrentLabelName] = useState<string>(LabelName)

    const filterData = () => {
        const currentField: any = columns.find(column => column.label === currentLabelName)?.field;

        const filter = dataList.filter(data => {
            const isNumeric = typeof data[currentField] === 'number';

            const isObject = typeof data[currentField] === 'object' && data[currentField] !== null;

            const isArrayObject = Array.isArray(data[currentField]) && data[currentField].length > 0

            if (isSearchTermName === '') {
                return true;
            }

            let fieldValue;

            if (isObject && data[currentField].hasOwnProperty('name')) {
                fieldValue = String(data[currentField].name).toLowerCase();
            } else if (isNumeric) {
                fieldValue = data[currentField];
            } else if (isArrayObject) {
                fieldValue = String(data[currentField][0].name).toLowerCase()
            } else {
                fieldValue = String(data[currentField]).toLowerCase();
            }

            let searchTerm = isNumeric ? Number(isSearchTermName) : isSearchTermName.toLowerCase();

            if (isNumeric) {
                return fieldValue === searchTerm;
            }

            return fieldValue.includes(searchTerm);
        });

        setFilteredDataList(filter);
    };


    return (
        <div
            className='
            flex
            flex-col
            w-full
            max-w-[480px]
          '
        >
            <div
                className='
              flex
              items-end
              gap-2
            '
            >
                <Input
                    id="Id"
                    label={LabelId}
                    onChange={e => setIsSearchTermId(e.target.value)}
                    value={isSearchTermId}
                />

                <select
                    onChange={e => setCurrentLabelName(e.target.value)}
                >
                    {columns.map(item => (
                        <option
                            key={item.label}
                            value={item.label}
                        >
                            {item.label}
                        </option>
                    ))}
                </select>
            </div>
            <div
                className='
                flex
                items-end
                gap-2
              '
            >
                <Input
                    label={currentLabelName}
                    id='Name'
                    onChange={e => setIsSearchTermName(e.target.value)}
                    value={isSearchTermName}
                />
                <Button
                    variantColor='blue'
                    onClick={() => filterData()}
                    customStyle='text-xl rounded-md'
                >
                    <Search
                        size={32}
                    />
                    Buscar
                </Button>
            </div>
        </div>
    )
}

export default FilterForTable;