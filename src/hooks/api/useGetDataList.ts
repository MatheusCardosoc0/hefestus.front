import { useEffect } from 'react';
import { api } from '../../libs/api';
import toast from 'react-hot-toast';

export const useGetDataList = (
    setDataFilter: (data: any) => void,
    setData: (data: any) => void,
    url: string,
    setIsLoading: (isLoading: boolean) => void
): void => {

    useEffect(() => {
        const fetchData = async () => {
            if (setIsLoading) {
                setIsLoading(true);
            }
            try {
                const response = await api.get(url);
                setData(response.data);
                setDataFilter(response.data);
            } catch (error) {
                toast.error("Não foi possível pegar os dados da API");
                console.error('Error:', error);
            }
            if (setIsLoading) {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [setData, setDataFilter, url]);
};
