import { useRouter } from 'next/navigation';

export type Column = {
    label: string
    field: string
}

type Row = {
    name: string
    id: number
}

export interface BasicTableProps {
    columns: Column[]
    filteredData: any[]
    setValueFunction?: any
    setValueObject?: any
    navigateTo?: string
    isLoading: boolean
}

const BasicTable: React.FC<BasicTableProps> = ({
    columns = [],
    filteredData,
    setValueFunction,
    setValueObject,
    isLoading,
    navigateTo = 'change'
}) => {

    const router = useRouter()

    const formatCellValue = (value: any) => {
        if (typeof value === 'boolean') {
            return value ? 'Sim' : 'Não';
        }
        if (Array.isArray(value) && value.length > 0) {
            return value[0].name;
        }
        if (typeof value === 'object' && value !== null) {
            return value.name;
        }

        return value;
    };

    // if (loading) {
    //     return (
    //         <>
    //             <Skeleton
    //                 variant='rectangular'
    //                 height={40}
    //                 idth={"90%"}
    //                 animation="pulse"
    //                 style={{
    //                     marginTop: '40px'
    //                 }}
    //             />
    //             <Skeleton
    //                 variant='rectangular'
    //                 height={200}
    //                 width={"90%"}
    //                 animation="pulse"
    //             />
    //         </>
    //     )
    // }

    function handleSetFunction(row: Row) {
        if (setValueFunction) {
            setValueFunction(row.id, row.name || row.id)
        }
        else if (setValueObject) {
            setValueFunction({ ...row })
        } else {
            const path = window.location.pathname
            router.push(`${path}/${navigateTo}/${row.id}`)
        }
    }

    return (
        <div
            className='
            overflow-auto
            max-h-[50vh]
            max-w-[98%]
            CustomScroll
            drop-shadow-[0px_0px_2px_#0000007f]
          '
        >
            <table
                className='
                w-full
                border-collapse
                font-bold
                text-lg
              '
            >
                <thead
                    className='
                        rounded-full
                        overflow-hidden
                  '
                >
                    <tr>
                        {columns.map((column, index) => (
                            <th key={index}
                                className='
                                bg-black
                                text-white
                                px-2
                                py-2
                                text-left
                                whitespace-nowrap
                              '
                            >
                                <div
                                    className='
                                    flex
                                    justify-between
                                    w-full
                                    gap-8
                                  '
                                >
                                    <span>
                                        {column.label}
                                    </span>
                                    <span>
                                        |
                                    </span>
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((row: any, rowIndex) => (
                        <tr
                            key={rowIndex}
                            onClick={() => handleSetFunction(row)}
                            className='bg-white even:bg-neutral-200 drop-shadow-[1px_1px_1px_black] cursor-pointer hover:bg-cyan-400'
                        >
                            {columns.map((column, colIndex) => (
                                <td key={colIndex}
                                    className='
                                        px-2
                                        py-2
                                        text-left
                                        whitespace-nowrap
                                        border-y-4
                                        border-white
                                    '
                                >
                                    <div
                                        className='
                                                    flex
                                                    justify-between
                                                    w-full
                                                    gap-8
                                                '
                                    >

                                        {formatCellValue(row[column.field])}
                                        <span>
                                            |
                                        </span>
                                    </div>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default BasicTable;