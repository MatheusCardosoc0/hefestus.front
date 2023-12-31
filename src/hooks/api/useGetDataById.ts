import { useState, useEffect } from 'react';
import { api } from '../../libs/api';

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
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id && activate) {
            const getData = async () => {
                setLoading(true);
                setError(null);
                try {
                    const response = await api.get(`${urlApi}${id}`);

                    if (stateKey) {
                        setData((prevState: any) => ({ ...prevState, [stateKey]: response.data }));
                    }

                    if (!stateKey) {
                        setData(response.data);
                    }
                } catch (error: any) {
                    setError(error);
                } finally {
                    setLoading(false);
                }
            };

            getData();
        }
    }, [id, activate]);
    return { loading, error };
};

export default useGetDataById;