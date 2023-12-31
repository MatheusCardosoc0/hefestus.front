import { useEffect, useState } from 'react';
import { api } from '../../libs/api';
import toast from 'react-hot-toast';

interface UseGetDataListProps {
    setDataFilter?: (data: any) => void,
    setData: (data: any) => void,
    url: string,
    kitten?: any
    stateKey?: string
}

export const useGetDataList = ({
    setDataFilter,
    setData,
    kitten,
    url,
    stateKey,
}: UseGetDataListProps) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {

            setLoading(true);

            try {
                const response = await api.get(url);
                let data = response.data;

                if (stateKey) {
                    setData((prevState: any) => ({ ...prevState, [stateKey]: data }));
                    if (setDataFilter) setDataFilter((prevState: any) => ({ ...prevState, [stateKey]: response.data }));
                }

                if (!stateKey) {
                    setData(response.data);
                    if (setDataFilter) setDataFilter(response.data);
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
