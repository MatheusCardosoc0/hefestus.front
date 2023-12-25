import { useState, useEffect } from 'react';
import { api } from '../../libs/api';

interface UseGetDataByIdProps {
    id: string
    urlApi: string
    setData: (value: any) => void
}

const useGetDataById = ({ id, urlApi, setData }: UseGetDataByIdProps) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id) {
            const getData = async () => {
                setLoading(true);
                setError(null);
                try {
                    const response = await api.get(`${urlApi}${id}`);
                    setData(response.data);
                } catch (error: any) {
                    setError(error);
                } finally {
                    setLoading(false);
                }
            };

            getData();
        }
    }, [id]);
    return { loading, error };
};

export default useGetDataById;