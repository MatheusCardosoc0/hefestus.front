import { useState, useEffect } from 'react';
import { api } from '../../libs/api';
import toast from 'react-hot-toast';
import { ApiError } from '@/@types/ApiError';

interface UseGetDataByIdProps {
    id: string | number;
    urlApi: string;
    setData: (value: any) => void;
    activate: boolean;
    stateKey?: string;
}

const useGetDataById = ({
    id,
    urlApi,
    setData,
    activate,
    stateKey
}: UseGetDataByIdProps) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id && activate) {
            const getData = async () => {
                setLoading(true);
                try {
                    const response = await api.get(`${urlApi}${id}`);
                    let data = response.data

                    if (stateKey) {
                        setData((prevState: any) => ({ ...prevState, [stateKey]: data }));
                    }

                    if (!stateKey) {
                        setData(response.data);
                    }

                    console.log(data)
                } catch (error: any) {
                    const apiError = error as ApiError
                    if (apiError.response) {
                        const apiErrorMessage = apiError.response.data || 'Erro desconhecido ao processar a solicitação';
                        toast.error(apiErrorMessage);
                    } else {
                        toast.error("Erro ao tentar remover");
                    }
                    console.log(error);
                } finally {
                    setLoading(false);
                }
            };

            getData();
        }
    }, [id, activate]);
    return { loading };
};

export default useGetDataById;