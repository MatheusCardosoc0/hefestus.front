import { useRouter } from 'next/navigation';
import { api } from '../../libs/api';
import toast from 'react-hot-toast';

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
            console.log(error);
        }
    };

    return deleteData;
};

export default useDeleteData;