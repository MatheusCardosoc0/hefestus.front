import { useState, useEffect } from 'react';
import { api } from '../../libs/api';

interface UseGetDataByIdProps {
    id: string
    urlApi: string
    setData?: (value: any) => void
}

const useGetDataById = ({ id, urlApi, setData }: UseGetDataByIdProps) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [promiseData, setPromiseData] = useState(null)

    useEffect(() => {
        if (id) {
            const getData = async () => {
                setLoading(true);
                setError(null);
                try {
                    const response = await api.get(`${urlApi}${id}`);
                    if (setData) setData(response.data);
                    else { setPromiseData(response.data) }
                } catch (error: any) {
                    setError(error);
                } finally {
                    setLoading(false);
                }
            };

            getData();
        }
    }, [id]);
    return { loading, error, promiseData };
};

export default useGetDataById;