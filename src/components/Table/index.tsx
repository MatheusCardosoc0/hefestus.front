import FilterForTable, { FilterForTableProps } from "./FilterForTable"
import { BasicTableProps } from "./BasicTable"
import BasicTable from "./BasicTable"

type TableProps = FilterForTableProps & BasicTableProps

const Table: React.FC<TableProps> = ({
    columns,
    filteredData,
    dataList,
    isLoading,
    navigateTo,
    setFilteredDataList,
    setValueFunction,
    setValueObject
}) => {
    return (
        <div
            className="
                flex
                flex-col
                gap-12
            "
        >
            <FilterForTable
                dataList={dataList}
                setFilteredDataList={setFilteredDataList}
                columns={columns}
            />
            <BasicTable
                filteredData={filteredData}
                navigateTo={navigateTo}
                isLoading={isLoading}
                columns={columns}
                setValueFunction={setValueFunction}
                setValueObject={setValueObject}
            />
        </div>
    )
}

export default Table