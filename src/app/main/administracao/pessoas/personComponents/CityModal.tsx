"use client"

import { Select, TextFiled } from "@/components/Inputs";
import useSubmitDataPostOrPut from "@/hooks/api/useSubmitDataPostOrPut";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, MouseEventHandler, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { UFBRStates } from "@/constants/others/UFBRStates";
import { Form } from "@/components/Form";
import { citySchema } from "../PersonSchemas";
import { Modal } from "@/components/Modal";
import useGetDataById from "@/hooks/api/useGetDataById";

export type CityForm = z.infer<typeof citySchema>

interface CityModalProps {
    setCityState: Dispatch<any>
    cityId: number
}

const CityModal: React.FC<CityModalProps> = ({
    setCityState,
    cityId
}) => {

    const {
        handleSubmit,
        formState: { errors, isLoading },
        register,
        setValue,
        watch
    } = useForm<CityForm>({
        resolver: zodResolver(citySchema)
    })

    const state = watch('state')

    const { submitData } = useSubmitDataPostOrPut({
        urlApi: '/api/city/',
        id: cityId
    })

    const onSubmit = async (data: CityForm) => {
        await submitData({
            data
        })

        setCityState((prevState: any) => ({
            ...prevState,
            isOpenModal: false,
            kitten: !prevState.kitten
        }));

    }

    useGetDataById({
        id: cityId,
        urlApi: '/api/city/',
        setData: (data) => {
            if (data) {
                Object.keys(data).forEach((key: any) => {
                    setValue(key, data[key], { shouldValidate: true });
                });
            }
        },
        activate: !!cityId
    });

    console.log(errors)

    return (
        <>
            <Modal.BlurEffect closeModalFunction={() => setCityState((prevState: any) => ({ ...prevState, isOpenModal: false }))} />

            <Modal.Root>
                <Modal.Title>Cadastrar nova cidade</Modal.Title>
                <Form.Root
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Form.ContentField>
                        <TextFiled
                            id="name"
                            label="Nome da cidade"
                            register={register}
                            error={errors.name?.message}
                            disabled={isLoading}
                        />
                        <Form.BreakLine>
                            <TextFiled
                                id="ibgeNumber"
                                label="Número do ibge"
                                type="number"
                                register={register}
                                error={errors.name?.message}
                                disabled={isLoading}
                            />
                            <Select
                                id="state"
                                label="UF do estado"
                                onChange={e => setValue('state', e.target.value)}
                                value={state}
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
                        </Form.BreakLine>
                    </Form.ContentField>

                    <Form.Action ButtonColor="success" className="mt-4" >
                        {cityId ? "Alterar" : "Cadastrar"}
                    </Form.Action>
                </Form.Root>
            </Modal.Root>
        </>
    )
}

export default CityModal