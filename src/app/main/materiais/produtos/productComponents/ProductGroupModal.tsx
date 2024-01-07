"use client"

import { TextFiled } from "@/components/Inputs";
import useSubmitDataPostOrPut from "@/hooks/api/useSubmitDataPostOrPut";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Modal } from "@/components/Modal";
import { Form } from "@/components/Form";
import { Loader2 } from "lucide-react";
import useGetDataById from "@/hooks/api/useGetDataById";
import { Button } from "@/components/Buttons";
import useDeleteData from "@/hooks/api/useDeleteData";
import { productGroupSchema } from "../ProductSchemas";

export type ProductGroupForm = z.infer<typeof productGroupSchema>

interface ProductGroupsModalProps {
    setProductGroupState: Dispatch<any>
    productGroupId: number
}

const ProductGroupsModal: React.FC<ProductGroupsModalProps> = ({
    setProductGroupState,
    productGroupId
}) => {

    const {
        handleSubmit,
        formState: { errors, isLoading },
        register,
        setValue
    } = useForm<ProductGroupForm>({
        resolver: zodResolver(productGroupSchema)
    })

    const { submitData, loading } = useSubmitDataPostOrPut({
        urlApi: '/api/productGroups/',
        id: productGroupId
    })

    useGetDataById({
        id: productGroupId,
        urlApi: '/api/productGroups/',
        setData: (data) => {
            if (data) {
                Object.keys(data).forEach((key: any) => {
                    setValue(key, data[key], { shouldValidate: true });
                });
            }
        },
        activate: !!productGroupId
    });

    const onSubmit = async (data: ProductGroupForm) => {
        await submitData({
            data
        })

        setProductGroupState((prevState: any) => ({
            ...prevState,
            kitten: !prevState.kitten,
            isOpenModal: false
        }));

    }

    const DeleteProductGroup = useDeleteData({
        id: productGroupId,
        urlApi: '/api/productGroups/'
    })

    async function handleDeleteProductGroup() {
        await DeleteProductGroup()

        setProductGroupState((prevState: any) => ({
            ...prevState,
            isOpenModal: false,
            kitten: !prevState.kitten
        }));
    }

    return (
        <>
            <Modal.BlurEffect closeModalFunction={() => setProductGroupState((prevState: any) => ({ ...prevState, isOpenModal: false }))} />

            <Modal.Root>
                <Modal.Title>{productGroupId ? 'Alterar grupo de pessoas' : 'Criar novo grupo de pessoas'}</Modal.Title>
                <Form.Root
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Form.ContentContainer>
                        <TextFiled
                            id="name"
                            label="Nome do Grupo"
                            register={register}
                            error={errors.name?.message}
                            disabled={isLoading}
                        />
                    </Form.ContentContainer>

                    <Form.Footer>
                        <Form.DefaultActions
                            id={productGroupId}
                            loading={loading}
                            removeFunction={() => handleDeleteProductGroup()}
                        />
                    </Form.Footer>
                </Form.Root>
            </Modal.Root>
        </>
    )
}

export default ProductGroupsModal