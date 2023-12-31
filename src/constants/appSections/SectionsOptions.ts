import { Option } from "@/@types/MenuOptions"
import { administracaoOptions } from "./administracaoOptions"
import { materiaisOptions } from "./materiaisOptions"
import { vendasOptions } from "./vendasOptions"
import { financeiroOptions } from "./financeiroOptions"

interface SectionsOptionsProps {
    title: string
    optionsList: Option[]
}

export const SectionsOptions: SectionsOptionsProps[] = [
    { title: 'Administração', optionsList: administracaoOptions },
    { title: 'Materiais', optionsList: materiaisOptions },
    { title: 'Vendas', optionsList: vendasOptions },
    { title: 'Financeiro', optionsList: financeiroOptions }
]