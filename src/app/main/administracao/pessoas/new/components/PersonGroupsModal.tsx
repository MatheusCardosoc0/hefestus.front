"use client"

import { TextFiled } from "@/components/Inputs";
import Modal from "@/components/Modal";
import useSubmitDataPostOrPut from "@/hooks/api/useSubmitDataPostOrPut";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, MouseEventHandler, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const personGroupSchema = z.object({
    name: z.string().nonempty({ message: "O nome no grupo de pessoas não pode estar vazio" }),
});

type PersonGroupForm = z.infer<typeof personGroupSchema>

interface PersonGroupsModalProps {
    setOpenModal: Dispatch<SetStateAction<boolean>>
}

const PersonGroupsModal: React.FC<PersonGroupsModalProps> = ({
    setOpenModal
}) => {

    const {
        handleSubmit,
        formState: { errors, isLoading },
        register
    } = useForm<PersonGroupForm>({
        resolver: zodResolver(personGroupSchema)
    })

    const { submitData } = useSubmitDataPostOrPut({
        urlApi: '/api/personGroup',
        setOpenModal: setOpenModal
    })

    const onSubmit = (data: PersonGroupForm) => {
        submitData({
            data
        })
    }

    return (
        <Modal
            setOpenModal={setOpenModal}
            handleSubmit={handleSubmit(onSubmit)}
            title="Criar novo grupo de pessoas"
        >
            <TextFiled
                id="name"
                label="Nome do Grupo"
                register={register}
                error={errors.name?.message}
                disabled={isLoading}
            />
        </Modal>
    )
}

export default PersonGroupsModal