import { Dispatch, useEffect, useState } from "react";
import { PersonGroupForm } from "./PersonGroupsModal";
import useGetDataById from "@/hooks/api/useGetDataById";
import { useGetDataList } from "@/hooks/api/useGetDataList";
import { CityForm } from "./CityModal";
import { FormPersonData, personSchema } from "../PersonSchemas";
import useSubmitDataPostOrPut from "@/hooks/api/useSubmitDataPostOrPut";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface UsePersonFunctionsProps {
    city: CityForm,
    personGroup: PersonGroupForm[]
    setValue: Function
}

export default function usePersonFunctions({
    city,
    personGroup,
    setValue
}: UsePersonFunctionsProps) {

    const [cityState, setCityState] = useState({
        cities: [],
        brStates: 'GO',
        citiesIBGEList: [],
        triggerCity: false,
        kitten: false,
        isOpenModal: false
    })
    const [personGroupState, setPersonGroupState] = useState({
        personGroupsList: [] as PersonGroupForm[],
        isOpenModal: false,
        kitten: false
    })

    const [currentIdCityOrPersonGroup, setCurrentIdCityOrPersonGroup] = useState(0)

    function HandleOpenModalPersonGroups(type: 'post' | 'put') {
        if (type == 'post') {
            setCurrentIdCityOrPersonGroup(0)
            setPersonGroupState((prevState: any) => ({ ...prevState, isOpenModal: true }))
        }
        if (type == 'put' && personGroup.length > 0) {
            const lastElementId = personGroup[personGroup.length - 1].id;
            setCurrentIdCityOrPersonGroup(lastElementId || 1)
            setPersonGroupState((prevState: any) => ({ ...prevState, isOpenModal: true }))
        }
    }

    function HandleOpenModalCity(type: 'post' | 'put') {
        if (type == 'post') {
            setCurrentIdCityOrPersonGroup(0)
            setCityState((prevState: any) => ({ ...prevState, isOpenModal: true }))
        }
        if (type == 'put' && city.id) {
            setCurrentIdCityOrPersonGroup(city.id)
            setCityState((prevState: any) => ({ ...prevState, isOpenModal: true }))
        }
    }

    const { } = useGetDataById({
        id: cityState.brStates || 'GO',
        urlApi: '/api/fetchCityDataIBGE/fetchData/',
        setData: setCityState,
        activate: cityState.triggerCity,
        stateKey: 'citiesIBGEList'
    })

    const { } = useGetDataList({
        setData: setCityState,
        url: '/api/city',
        stateKey: 'cities',
        kitten: cityState.kitten
    });

    useEffect(() => {
        if (city) {
            setCityState((prevCityState: any) => ({ ...prevCityState, brStates: city.state }));
        }
    }, [city])


    const { } = useGetDataList({
        setData: setPersonGroupState,
        url: '/api/personGroup',
        stateKey: 'personGroupsList',
        kitten: personGroupState.kitten
    })




    return {

        HandleOpenModalCity,
        HandleOpenModalPersonGroups,
        cityState,
        personGroupState,
        setCityState,
        setPersonGroupState,
        currentIdCityOrPersonGroup
    }

}
