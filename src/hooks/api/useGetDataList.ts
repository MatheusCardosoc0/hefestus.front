import { useEffect, useState } from 'react';
import { api } from '../../libs/api';
import toast from 'react-hot-toast';

interface UseGetDataListProps {
    setDataFilter?: (data: any) => void,
    setData: (data: any) => void,
    url: string,
    kitten?: any
}

export const useGetDataList = ({
    setDataFilter,
    setData,
    kitten,
    url }: UseGetDataListProps
) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {

            setLoading(true);

            try {
                const response = await api.get(url);
                setData(response.data);
                if (setDataFilter) {
                    setDataFilter(response.data);
                }
            } catch (error: any) {
                toast.error("Não foi possível pegar os dados da API");
                console.error('Error:', error);
                setError(error)
            }

            setLoading(false);

        };

        fetchData();
    }, [url, kitten]);

    return { error, loading }
};
