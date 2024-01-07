"use client"

import { Form } from "@/components/Form"
import { FormProductData, productSchema } from "../ProductSchemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { AdvancedSelect, TextFiled } from "@/components/Inputs"
import useSubmitDataPostOrPut from "@/hooks/api/useSubmitDataPostOrPut"
import useDeleteData from "@/hooks/api/useDeleteData"
import { useState } from "react"
import ProductGroupsModal from "./ProductGroupModal"
import { useGetDataList } from "@/hooks/api/useGetDataList"

interface ProductFormProps {
    productId?: number
}

const ProductForm: React.FC<ProductFormProps> = ({
    productId
}) => {

    const {
        handleSubmit,
        formState: { errors },
        register,
        watch,
        setValue
    } = useForm<FormProductData>({

        resolver: zodResolver(productSchema)
    })

    const DeleteProduct = useDeleteData({
        id: productId,
        urlApi: '/api/product/',
        urlReturn: '/main/materiais/produtos'
    })

    const { submitData, loading } = useSubmitDataPostOrPut({
        urlApi: '/api/product/',
        urlReturn: '/main/materiais/produtos',
        id: productId
    })

    async function onSubmit(data: FormProductData) {
        console.log(data)
        await submitData({
            data
        })
    }

    const [productGroupState, setProductGroupState] = useState({
        isOpenModal: false,
        productGroup: [],
        kitten: false
    })

    const [currentId, setCurrentId] = useState(0)

    const { } = useGetDataList({
        setData: setProductGroupState,
        url: '/api/productGroups',
        kitten: productGroupState.kitten,
        stateKey: 'productGroup'
    })

    const productGroup = watch("productGroup")

    function HandleOpenModalProductGroup(type: 'post' | 'put') {
        if (type == 'post') {
            setCurrentId(0)
            setProductGroupState((prevState: any) => ({ ...prevState, isOpenModal: true }))
        }
        if (type == 'put' && productGroup.id) {
            setCurrentId(productGroup.id)
            setProductGroupState((prevState: any) => ({ ...prevState, isOpenModal: true }))
        }
    }

    return (
        <>
            <Form.Root
                onSubmit={handleSubmit(onSubmit)}
            >
                <Form.ContentContainer>
                    <Form.ContentField>
                        <Form.BreakLine>
                            <TextFiled
                                id="name"
                                register={register}
                                error={errors.name?.message}
                                label="Nome"
                            />
                            <TextFiled
                                id="description"
                                register={register}
                                error={errors.description?.message}
                                label="Descrição"
                            />
                        </Form.BreakLine>
                        <Form.BreakLine>
                            <TextFiled
                                id="priceSale"
                                type="number"
                                register={register}
                                error={errors.priceSale?.message}
                                label="Preço de venda"
                            />
                            <TextFiled
                                id="priceTotal"
                                type="number"
                                register={register}
                                error={errors.priceTotal?.message}
                                label="Preço total"
                            />
                        </Form.BreakLine>
                    </Form.ContentField>
                    <Form.ContentField>
                        <Form.BreakLine>
                            <AdvancedSelect
                                label="Grupo*"
                                options={productGroupState.productGroup}
                                setValue={setValue}
                                keyState="productGroup"
                                openModalApiConnectionPost={() => HandleOpenModalProductGroup('post')}
                            // openModalApiConnectionPut={() => HandleOpenModalCity('put')}
                            />
                        </Form.BreakLine>
                    </Form.ContentField>
                </Form.ContentContainer>
                <Form.Footer>
                    <Form.DefaultActions
                        id={productId}
                        loading={loading}
                        removeFunction={() => DeleteProduct()}
                    />
                </Form.Footer>
            </Form.Root>
            {productGroupState.isOpenModal && (
                <ProductGroupsModal
                    productGroupId={currentId}
                    setProductGroupState={setProductGroupState}
                />
            )}
        </>
    )
}

export default ProductForm