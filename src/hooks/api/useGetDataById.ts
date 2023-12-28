import { useState, useEffect } from 'react';
import { api } from '../../libs/api';

interface UseGetDataByIdProps {
    id: string
    urlApi: string
    setData?: (value: any) => void
    activate: boolean
}

const useGetDataById = ({ id, urlApi, setData, activate }: UseGetDataByIdProps) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [promiseData, setPromiseData] = useState(null)

    useEffect(() => {
        if (id && activate) {
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
    }, [id, activate]);
    return { loading, error, promiseData };
};

export default useGetDataById;