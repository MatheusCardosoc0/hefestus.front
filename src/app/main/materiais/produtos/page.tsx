"use client"

import Table from '@/components/Table';
import { useGetDataList } from '@/hooks/api/useGetDataList';
import React, { useState } from 'react'

const Products = () => {
    const [allProducts, setAllProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    const { loading } = useGetDataList({
        setData: setAllProducts,
        setDataFilter: setFilteredProducts,
        url: 'api/product'
    })
    return (
        <Table
            dataList={allProducts}
            setFilteredDataList={setFilteredProducts}
            filteredData={filteredProducts}
            isLoading={loading}
            columns={[
                { label: "Código", field: "id" },
                { label: "Nome", field: "name" },
                { label: "Preço de venda", field: "priceSale" },
                { label: "Custo", field: "priceTotal" },
                { label: "Familia", field: "family" },
                { label: "Grupo", field: "group" },
                { label: "Sub Grupo", field: "subgroup" }
            ]}
        />
    )
}

export default Products