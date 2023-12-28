"use client"

import { Select, TextFiled } from "@/components/Inputs";
import Modal from "@/components/Modal";
import useSubmitDataPostOrPut from "@/hooks/api/useSubmitDataPostOrPut";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, MouseEventHandler, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { BreakLineInput } from "../page";
import { UFBRStates } from "@/constants/others/UFBRStates";

export const citySchema = z.object({
    id: z.number().optional(),
    name: z.string().nonempty({ message: "O nome da cidade não pode estar vazio" }),
    ibgeNumber: z.number().min(0, { message: "O número do IBGE não pode estar vazio" }),
    state: z.string().nonempty({ message: "O estado não pode estar vazio" }),
});

export type CityForm = z.infer<typeof citySchema>

interface CityModalProps {
    setOpenModal: Dispatch<SetStateAction<boolean>>
    dispatchKitten: Dispatch<SetStateAction<boolean>>
    cityId: number
}

const CityModal: React.FC<CityModalProps> = ({
    setOpenModal,
    dispatchKitten,
    cityId
}) => {

    const {
        handleSubmit,
        formState: { errors, isLoading },
        register,
        setValue
    } = useForm<CityForm>({
        resolver: zodResolver(citySchema)
    })

    const { submitData } = useSubmitDataPostOrPut({
        urlApi: '/api/city/',
        setOpenModal: setOpenModal,
        dispatchKitten: dispatchKitten,
        id: cityId
    })

    const onSubmit = (data: CityForm) => {
        submitData({
            data
        })
    }

    return (
        <Modal
            setOpenModal={setOpenModal}
            handleSubmit={handleSubmit(onSubmit)}
            title="Cadastrar nova cidade"
        >
            <TextFiled
                id="name"
                label="Nome da cidade"
                register={register}
                error={errors.name?.message}
                disabled={isLoading}
            />
            <BreakLineInput>
                <TextFiled
                    id="ibgeNumber"
                    label="Número do ibge"
                    register={register}
                    error={errors.name?.message}
                    disabled={isLoading}
                />
                <Select
                    id="state"
                    label="UF do estado"
                    onChange={e => setValue('state', e.target.value)}
                    disabled={isLoading}
                >
                    {UFBRStates.map((item, i) => (
                        <option
                            key={i}
                            value={item}
                        >
                            {item}
                        </option>
                    ))}
                </Select>
            </BreakLineInput>
        </Modal>
    )
}

export default CityModal