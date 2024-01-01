import { useRouter } from 'next/navigation';
import { api } from '../../libs/api';
import toast from 'react-hot-toast';
import { ApiError } from '@/@types/ApiError';

interface UseDeleteDataParams {
    urlApi: string
    id: any
    urlReturn?: string
}

const useDeleteData = ({ urlApi, id, urlReturn }: UseDeleteDataParams) => {
    const navigate = useRouter();

    const deleteData = async () => {
        try {
            await api.delete(`${urlApi}${id}`);
            toast.success('Removido');
            if (urlReturn) navigate.push(urlReturn);
        } catch (error) {
            const apiError = error as ApiError
            if (apiError.response) {
                const apiErrorMessage = apiError.response.data || 'Erro desconhecido ao processar a solicitação';
                toast.error(apiErrorMessage);
            } else {
                toast.error("Erro ao tentar remover");
            }
            console.log(error);
        }
    };

    return deleteData;
};

export default useDeleteData;