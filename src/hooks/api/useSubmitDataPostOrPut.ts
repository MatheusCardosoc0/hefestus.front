"use client"

import { ApiError } from '@/@types/ApiError';
import { api } from '@/libs/api';
import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';
import toast from 'react-hot-toast';

interface UseSubmitDataPostOrPutProps {
    urlApi: string
    urlReturn: string
    id?: number
}

interface HandleSubmitProps {
    data: Object
    event?: FormEvent
    messageSuccess?: string
    messageError?: string
    messageSuccessChange?: string
}

const useSubmitDataPostOrPut = ({ urlApi, urlReturn, id }: UseSubmitDataPostOrPutProps) => {

    const router = useRouter();

    async function handleSubmit({
        data,
        event,
        messageError = 'Não foi possivel fazer o registro',
        messageSuccess = "Registrado com sucesso",
        messageSuccessChange = "Alterado com sucesso"
    }: HandleSubmitProps) {
        if (event) {
            event.preventDefault()
        }
        try {
            let response
            if (id) {
                response = await api.put(`${urlApi}${id}`, data);
                toast.success(messageSuccessChange)
            } else {
                response = await api.post(urlApi, data);

                if (response.data && response.data.token) {
                    localStorage.setItem('authToken', response.data.token)
                }
                toast.success(messageSuccess)
                console.log(response.data.token)
            }

            router.push(urlReturn);
        } catch (error: any) {
            const apiError = error as ApiError
            if (apiError.response) {
                const apiErrorMessage = apiError.response.data || 'Erro desconhecido ao processar a solicitação';
                toast.error(apiErrorMessage);
            } else {
                toast.error(messageError);
            }
            console.log(error);
        }
    }

    return handleSubmit;
};

export default useSubmitDataPostOrPut;