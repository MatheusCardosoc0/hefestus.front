"use client"

import { Button } from "@/components/Buttons";
import { ImageUpload, Input, Select } from "@/components/Inputs";
import TextField from "@/components/Inputs/TextField";
import Modal from "@/components/Modal";
import { UFBRStates } from "@/constants/others/UFBRStates";
import useGetDataById from "@/hooks/api/useGetDataById";
import { useGetDataList } from "@/hooks/api/useGetDataList";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod"
import PersonGroupsModal, { PersonGroupForm, personGroupSchema } from "./components/PersonGroupsModal";
import { handleSetObjectForSelectValue } from "@/functions/handleSetObjectForSelectValue";
import CityModal, { citySchema } from "./components/CityModal";
import useSubmitDataPostOrPut from "@/hooks/api/useSubmitDataPostOrPut";


const personSchema = z.object({
    name: z.string().nonempty({ message: "O nome não pode estar vazio" }),
    email: z.string().email({ message: "Formato de e-mail inválido" }),
    phone: z.string().nonempty({ message: "O telefone não pode estar vazio" }),
    age: z.string().optional().refine((val) => {
        // Se o valor for undefined, a validação é considerada bem-sucedida, pois o campo é opcional
        if (val === undefined) return true;

        // Caso contrário, verifique se o valor é um número
        return !Number.isNaN(parseInt(val, 10));
    }, {
        message: "Expected number, received a string"
    }),
    cpf: z.string().nonempty({ message: "O CPF não pode estar vazio" }),
    address: z.string().nonempty({ message: "O endereço não pode estar vazio" }),
    birthDate: z.string().optional(),
    ibge: z.string().optional(),
    razao: z.string().optional(),
    inscricaoEstadual: z.string(),
    cep: z.string().nonempty({ message: "O CEP não pode estar vazio" }),
    urlImage: z.string().optional(),
    isBlocked: z.boolean().optional(),
    maritalStatus: z.string().optional(),
    habilities: z.string().optional(),
    description: z.string().optional(),
    personGroup: z.array(personGroupSchema).nonempty("Deve ser informado ao menos um grupo"),
    cityId: z.number().min(0, { message: "O ID da cidade não pode ser negativo" }).optional(),
    city: citySchema,
});

type FormPersonData = z.infer<typeof personSchema>
type City = z.infer<typeof citySchema>

export const BreakLineInput = ({ children }: { children: ReactNode }) => (
    <div className="flex gap-2 max-w-[620px]" >
        {children}
    </div>
)

function NovaPessoa() {

    const {
        handleSubmit,
        formState: { errors },
        register,
        watch,
        setValue
    } = useForm<FormPersonData>({
        defaultValues: {
            isBlocked: false,
            age: '0',
            personGroup: []
        },
        resolver: zodResolver(personSchema)
    })



    const [state, setState] = useState('GO')
    const [cities, setCities] = useState([])
    const [personGroupsList, setPersonGroupsList] = useState([])
    const [isOpenModalPersonGroups, setIsOpenModalPersonGroups] = useState(false)
    const [isOpenModalCity, setIsOpenModalCity] = useState(false)
    const [currentId, setCurrentId] = useState(0)
    const [kittenPostPersonGroups, setKittenPersonGroups] = useState(false)
    const [kittenCity, setKittenCity] = useState(false)
    const [citiesIBGEList, setCitiesIBGEList] = useState([])
    const [triggerCity, setTriggerCity] = useState(false)

    const urlImage = watch('urlImage')

    const personGroup = watch('personGroup')
    const city = watch('city')

    const { } = useGetDataById({
        id: state || 'GO',
        urlApi: '/api/fetchCityDataIBGE/fetchData/',
        setData: setCitiesIBGEList,
        activate: triggerCity
    })

    const { } = useGetDataList({
        setData: setCities,
        url: '/api/city',
        kitten: kittenCity
    })

    console.log(citiesIBGEList)

    useEffect(() => {
        setState(city?.state)
        console.log(city)
    }, [city])


    const { } = useGetDataList({
        setData: setPersonGroupsList,
        url: '/api/personGroup',
        kitten: kittenPostPersonGroups
    })

    function HandleOpenModalPersonGroups(type: 'post' | 'put') {
        if (type == 'post') {
            setCurrentId(0)
            setIsOpenModalPersonGroups(true)
        }
        if (type == 'put' && personGroup[0].id) {
            setCurrentId(personGroup[0].id)
            setIsOpenModalPersonGroups(true)
        }
    }

    function HandleOpenModalCity(type: 'post' | 'put') {
        if (type == 'post') {
            setCurrentId(0)
            setIsOpenModalCity(true)
        }
        if (type == 'put' && city.id) {
            setCurrentId(city.id)
            setIsOpenModalCity(true)
        }
    }

    const { submitData } = useSubmitDataPostOrPut({
        urlApi: '/api/person',
        urlReturn: '/main/administracao/pessoas'
    })

    function onSubmit(data: FormPersonData) {
        console.log(data)
        submitData({
            data
        })
    }

    const removeLastPersonGroup = () => {
        const newPersonGroup = personGroup.slice(0, -1);
        setValue("personGroup", newPersonGroup as unknown as [{ name: string, id?: number }, ...{ name: string, id?: number }[]]);
    };

    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex justify-between"
            >
                <div className="flex flex-col gap-2" >
                    <BreakLineInput>
                        <TextField
                            id="name"
                            label="Nome*"
                            register={register}
                            error={errors.name?.message}
                        />
                        <TextField
                            id="email"
                            label="E-mail*"
                            register={register}
                            error={errors.email?.message}
                        />
                    </BreakLineInput>
                    <BreakLineInput>
                        <TextField
                            id="cep"
                            label="CEP*"
                            register={register}
                            error={errors.cep?.message}
                        />
                        <TextField
                            id="phone"
                            label="Telefone*"
                            register={register}
                            error={errors.phone?.message}
                        />
                    </BreakLineInput>

                    <BreakLineInput>
                        <TextField
                            id="habilities"
                            label="Habilidades"
                            register={register}
                            error={errors.habilities?.message}
                        />
                        <TextField
                            id="cpf"
                            label="CPF\CNPJ*"
                            register={register}
                            error={errors.cpf?.message}
                        />
                        <TextField
                            id="address"
                            label="Endereço*"
                            register={register}
                            error={errors.address?.message}
                        />
                    </BreakLineInput>

                    <BreakLineInput>
                        <Select
                            label="Cidade*"
                            onChange={e => handleSetObjectForSelectValue(e, setValue, watch, triggerCity ? citiesIBGEList : cities, 'city')}
                            openModalApiConnectionPost={() => HandleOpenModalCity('post')}
                            openModalApiConnectionPut={() => HandleOpenModalCity('put')}
                            openModalApiConnectionGetList={() => setTriggerCity(prev => !prev)}
                        >
                            <option
                                value={''}
                            >
                                Nenhum
                            </option>
                            {triggerCity ? (
                                citiesIBGEList.map((item: any) => (
                                    <option
                                        key={item.ibgeNumber}
                                        value={item.ibgeNumber}
                                    >
                                        {item.name}
                                    </option>
                                ))
                            ) : (
                                cities.map((item: any) => (
                                    <option
                                        key={item.id}
                                        value={item.id}
                                    >
                                        {item.name}
                                    </option>
                                ))
                            )}
                        </Select>
                        <Select
                            label="Grupo*"
                            onChange={e => handleSetObjectForSelectValue(e, setValue, watch, personGroupsList, 'personGroup', true)}
                            openModalApiConnectionPost={() => HandleOpenModalPersonGroups('post')}
                            openModalApiConnectionPut={() => HandleOpenModalPersonGroups('put')}
                            openModalApiConnectionGetDeleteStackArray={() => removeLastPersonGroup()}
                        >
                            <option
                                value={''}
                            >
                                Nenhum
                            </option>
                            {personGroupsList.map((item: any) => (
                                <option
                                    key={item.id}
                                    value={item.id}
                                >
                                    {item.name}
                                </option>
                            ))}
                        </Select>
                    </BreakLineInput>
                    <Select
                        label="Estado*"
                        customStyle="max-w-[200px]"
                        onChange={e => setState(e.target.value)}
                        value={state}
                    >
                        {UFBRStates.map((name, id) => (
                            <option
                                key={id}
                                value={name}
                            >
                                {name}
                            </option>
                        ))}
                    </Select>

                    <Button
                        variantColor="green"
                        customStyle="max-w-[200px] mt-20"
                        type="submit"
                    >
                        Cadastrar
                    </Button>
                </div>
                <div
                    className="w-full max-w-[120px] drop-shadow-[0px_0px_2px_#000000ae]"
                >
                    <h4 className="bg-black text-center text-white font-bold p-1" >
                        Grupos
                    </h4>
                    <ul
                        className="flex flex-col"
                    >
                        {personGroup.length > 0 && personGroup.map(item => (
                            <ul key={item.id}
                                className="bg-neutral-600 even:bg-neutral-800 text-white flex gap-2 border-b border-[#0000007e]"
                            >
                                <span
                                    className="bg-neutral-100 p-1 w-[20%] text-black"
                                >
                                    {item.id}
                                </span>
                                <span>
                                    {item.name}
                                </span>
                            </ul>
                        ))}
                    </ul>
                </div>
                <div className="flex flex-col gap-2" >
                    <BreakLineInput>
                        <TextField
                            id="razao"
                            label="Razão"
                            register={register}
                            error={errors.razao?.message}
                        />
                        <TextField
                            id="ibge"
                            label="IBGE"
                            register={register}
                            error={errors.ibge?.message}
                        />
                    </BreakLineInput>
                    <BreakLineInput>
                        <TextField
                            id="age"
                            label="Idade"
                            type="number"
                            register={register}
                            error={errors.age?.message}
                        />
                        <TextField
                            id="inscricaoEstadual"
                            label="Inscrição Estadual"
                            register={register}
                            error={errors.inscricaoEstadual?.message}
                        />
                    </BreakLineInput>
                    <BreakLineInput>
                        <TextField
                            id="birthDate"
                            label="Data de Nascimento"
                            register={register}
                            error={errors.birthDate?.message}
                        />
                        <TextField
                            id="maritalStatus"
                            label="Estado Civil"
                            register={register}
                            error={errors.maritalStatus?.message}
                        />
                    </BreakLineInput>
                    <BreakLineInput>
                        <TextField
                            id="description"
                            label="Descrição"
                            register={register}
                            error={errors.description?.message}
                        />
                        <ImageUpload
                            onChange={value => setValue("urlImage", value)}
                            value={urlImage ? urlImage : ''}
                        />
                    </BreakLineInput>
                </div>
            </form>
            {isOpenModalPersonGroups && (
                <PersonGroupsModal
                    setOpenModal={setIsOpenModalPersonGroups}
                    dispatchKitten={setKittenPersonGroups}
                    personGroupId={currentId}
                />
            )}
            {isOpenModalCity && (
                <CityModal
                    setOpenModal={setIsOpenModalCity}
                    dispatchKitten={setKittenCity}
                    cityId={currentId}
                />
            )}
        </>
    )
}

export default NovaPessoa