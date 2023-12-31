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
import { Button } from "@/components/Buttons";
import useDeleteData from "@/hooks/api/useDeleteData";

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

    const { submitData, loading } = useSubmitDataPostOrPut({
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

    const DeleteCity = useDeleteData({
        id: cityId,
        urlApi: '/api/city/'
    })


    async function handleDeleteCity() {
        await DeleteCity()

        setCityState((prevState: any) => ({
            ...prevState,
            isOpenModal: false,
            kitten: !prevState.kitten
        }));
    }

    return (
        <>
            <Modal.BlurEffect closeModalFunction={() => setCityState((prevState: any) => ({ ...prevState, isOpenModal: false }))} />

            <Modal.Root>
                <Modal.Title>{cityId ? 'Alterar cidade' : 'Cadastrar nova cidade'}</Modal.Title>
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

                    <Form.Footer>
                        <Form.DefaultActions
                            id={cityId}
                            removeFunction={() => handleDeleteCity()}
                            loading={loading}
                        />
                    </Form.Footer>
                </Form.Root>
            </Modal.Root>
        </>
    )
}

export default CityModal