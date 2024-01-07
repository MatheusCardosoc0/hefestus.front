"use client"

import { ApiError } from '@/@types/ApiError';
import { api } from '@/libs/api';
import { useRouter } from 'next/navigation';
import { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import toast from 'react-hot-toast';

interface UseSubmitDataPostOrPutProps {
    urlApi: string
    urlReturn?: string
    id?: number
}

interface SubmitDataProps {
    data: Object
    event?: FormEvent
    messageSuccess?: string
    messageError?: string
    messageSuccessChange?: string
}

const useSubmitDataPostOrPut = ({ urlApi, urlReturn, id }: UseSubmitDataPostOrPutProps) => {
    const [loading, setLoading] = useState(false)

    const router = useRouter();

    async function submitData({
        data,
        event,
        messageError = 'Não foi possivel fazer o registro',
        messageSuccess = "Registrado com sucesso",
        messageSuccessChange = "Alterado com sucesso"
    }: SubmitDataProps) {
        if (event) {
            event.preventDefault()
        }
        setLoading(true)
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
            if (urlReturn) { router.push(urlReturn); }
        } catch (error: any) {
            const apiError = error as ApiError;
            if (apiError.response && apiError.response.data && apiError.response.data.errors) {
                // Extrair mensagens de erro de validação
                const validationErrors = apiError.response.data.errors;
                const errorMessages = Object.keys(validationErrors).map(key => `${key}: ${validationErrors[key].join(', ')}`);
                const combinedErrorMessage = errorMessages.join('\n');
                toast.error(combinedErrorMessage);
            } else if (apiError.response && apiError.response.data) {
                // Erro genérico do servidor
                const apiErrorMessage = apiError.response.data.message || 'Erro desconhecido ao processar a solicitação';
                toast.error(apiErrorMessage);
            } else {
                // Erro de rede ou desconhecido
                toast.error(messageError);
            }
            console.log(error);
        }
        setLoading(false)
    }

    return { submitData, loading };
};

export default useSubmitDataPostOrPut;