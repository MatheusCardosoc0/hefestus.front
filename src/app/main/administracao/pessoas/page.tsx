"use client"

import Table from "@/components/Table";
import { useGetDataList } from "@/hooks/api/useGetDataList"
import { useState } from "react";

function Pessoas() {

    const [allPersons, setAllPersons] = useState([]);
    const [filteredPersons, setFilteredPersons] = useState([]);
    const [loading, setLoading] = useState(false)


    useGetDataList(setFilteredPersons, setAllPersons, 'api/person', setLoading)

    return (
        <Table
            dataList={allPersons}
            setFilteredDataList={setFilteredPersons}
            filteredData={filteredPersons}
            isLoading={loading}
            columns={[
                { label: "Código", field: "id" },
                { label: "Nome", field: "name" },
                { label: "Email", field: "email" },
                { label: "Telefone", field: "phone" },
                { label: "Idade", field: "age" },
                { label: "CPF", field: "cpf" },
                { label: "Endereço", field: "address" },
                { label: "Data de Nascimento", field: "birthDate" },
                { label: "IBGE", field: "ibge" },
                { label: "Razão", field: "razao" },
                { label: "Inscrição Estadual", field: "inscricaoEstadual" },
                { label: "CEP", field: "cep" },
                { label: "Grupo", field: "personGroups" },
                { label: "Cidade", field: "city" }
            ]}
        />
    )
}

export default Pessoas