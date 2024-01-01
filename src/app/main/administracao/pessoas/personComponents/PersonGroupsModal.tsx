"use client"

import { TextFiled } from "@/components/Inputs";
import useSubmitDataPostOrPut from "@/hooks/api/useSubmitDataPostOrPut";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { personGroupSchema } from "../PersonSchemas";
import { Modal } from "@/components/Modal";
import { Form } from "@/components/Form";
import { Loader2 } from "lucide-react";
import useGetDataById from "@/hooks/api/useGetDataById";
import { Button } from "@/components/Buttons";
import useDeleteData from "@/hooks/api/useDeleteData";

export type PersonGroupForm = z.infer<typeof personGroupSchema>

interface PersonGroupsModalProps {
    setPersonGroupState: Dispatch<any>
    personGroupId: number
}

const PersonGroupsModal: React.FC<PersonGroupsModalProps> = ({
    setPersonGroupState,
    personGroupId
}) => {

    const {
        handleSubmit,
        formState: { errors, isLoading },
        register,
        setValue
    } = useForm<PersonGroupForm>({
        resolver: zodResolver(personGroupSchema)
    })

    const { submitData, loading } = useSubmitDataPostOrPut({
        urlApi: '/api/personGroup/',
        id: personGroupId
    })

    useGetDataById({
        id: personGroupId,
        urlApi: '/api/personGroup/',
        setData: (data) => {
            if (data) {
                Object.keys(data).forEach((key: any) => {
                    setValue(key, data[key], { shouldValidate: true });
                });
            }
        },
        activate: !!personGroupId
    });

    const onSubmit = async (data: PersonGroupForm) => {
        await submitData({
            data
        })

        setPersonGroupState((prevState: any) => ({
            ...prevState,
            kitten: !prevState.kitten,
            isOpenModal: false
        }));

    }

    const DeletePersonGroup = useDeleteData({
        id: personGroupId,
        urlApi: '/api/personGroup/'
    })

    async function handleDeletePersonGroup() {
        await DeletePersonGroup()

        setPersonGroupState((prevState: any) => ({
            ...prevState,
            isOpenModal: false,
            kitten: !prevState.kitten
        }));
    }

    return (
        <>
            <Modal.BlurEffect closeModalFunction={() => setPersonGroupState((prevState: any) => ({ ...prevState, isOpenModal: false }))} />

            <Modal.Root>
                <Modal.Title>{personGroupId ? 'Alterar grupo de pessoas' : 'Criar novo grupo de pessoas'}</Modal.Title>
                <Form.Root
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <TextFiled
                        id="name"
                        label="Nome do Grupo"
                        register={register}
                        error={errors.name?.message}
                        disabled={isLoading}
                    />

                    <Form.Footer>
                        <Form.DefaultActions
                            id={personGroupId}
                            loading={loading}
                            removeFunction={() => handleDeletePersonGroup()}
                        />
                    </Form.Footer>
                </Form.Root>
            </Modal.Root>
        </>
    )
}

export default PersonGroupsModal