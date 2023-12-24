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
    LabelId,
    LabelName,
    setValueFunction,
    setValueObject
}) => {
    return (
        <>
            <FilterForTable
                dataList={dataList}
                setFilteredDataList={setFilteredDataList}
                LabelId={LabelId}
                LabelName={LabelName}
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
        </>
    )
}

export default Table