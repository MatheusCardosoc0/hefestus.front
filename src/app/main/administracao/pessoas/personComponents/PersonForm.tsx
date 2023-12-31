"use client"

import { ImageUpload, Input, Select } from "@/components/Inputs";
import TextField from "@/components/Inputs/TextField";
import { UFBRStates } from "@/constants/others/UFBRStates";
import useGetDataById from "@/hooks/api/useGetDataById";
import { useGetDataList } from "@/hooks/api/useGetDataList";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod"
import PersonGroupsModal from "./PersonGroupsModal";
import { handleSetObjectForSelectValue } from "@/functions/handleSetObjectForSelectValue";
import CityModal from "./CityModal";
import useSubmitDataPostOrPut from "@/hooks/api/useSubmitDataPostOrPut";

import { Form } from "@/components/Form";
import { FormPersonData, personSchema } from "../PersonSchemas";
import usePersonFunctions from "./usePersonFunctions";

interface PersonFormProps {
    id?: number | string
}

const PersonForm: React.FC<PersonFormProps> = ({
    id
}) => {

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

    const urlImage = watch('urlImage')

    const personGroup = watch('personGroup')
    const city = watch('city')


    const {
        HandleOpenModalCity,
        HandleOpenModalPersonGroups,
        cityState,
        onSubmit,
        personGroupState,
        removeLastPersonGroup,
        setCityState,
        setPersonGroupState,
        currentIdCityOrPersonGroup
    } = usePersonFunctions({
        city,
        personGroup,
        setValue
    })

    return (
        <>
            <Form.Root
                onSubmit={handleSubmit(onSubmit)}
                className="flex justify-between"
            >
                <Form.ContentContainer>
                    <Form.ContentField>
                        <Form.BreakLine>
                            <TextField
                                id="name"
                                label="Nome*"
                                register={register}
                                error={errors.name?.message} />
                            <TextField
                                id="email"
                                label="E-mail*"
                                register={register}
                                error={errors.email?.message} />
                        </Form.BreakLine>
                        <Form.BreakLine>
                            <TextField
                                id="cep"
                                label="CEP*"
                                register={register}
                                error={errors.cep?.message} />
                            <TextField
                                id="phone"
                                label="Telefone*"
                                register={register}
                                error={errors.phone?.message} />
                        </Form.BreakLine>

                        <Form.BreakLine>
                            <TextField
                                id="habilities"
                                label="Habilidades"
                                register={register}
                                error={errors.habilities?.message} />
                            <TextField
                                id="cpf"
                                label="CPF\CNPJ*"
                                register={register}
                                error={errors.cpf?.message} />
                            <TextField
                                id="address"
                                label="Endereço*"
                                register={register}
                                error={errors.address?.message} />
                        </Form.BreakLine>

                        <Form.BreakLine>
                            <Select
                                label="Cidade*"
                                onChange={e => handleSetObjectForSelectValue(e, setValue, watch, cityState.triggerCity ? cityState.citiesIBGEList : cityState.cities, 'city')}
                                openModalApiConnectionPost={() => HandleOpenModalCity('post')}
                                openModalApiConnectionPut={() => HandleOpenModalCity('put')}
                                openModalApiConnectionGetList={() => setCityState(prevState => ({ ...prevState, triggerCity: !prevState.triggerCity }))}
                            >
                                <option
                                    value={''}
                                >
                                    Nenhum
                                </option>
                                {cityState.triggerCity ? (
                                    cityState.citiesIBGEList.map((item: any) => (
                                        <option
                                            key={item.ibgeNumber}
                                            value={item.ibgeNumber}
                                        >
                                            {item.name}
                                        </option>
                                    ))
                                ) : (
                                    cityState.cities.map((item: any) => (
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
                                onChange={e => handleSetObjectForSelectValue(e, setValue, watch, personGroupState.personGroupsList, 'personGroup', true)}
                                openModalApiConnectionPost={() => HandleOpenModalPersonGroups('post')}
                                openModalApiConnectionPut={() => HandleOpenModalPersonGroups('put')}
                                openModalApiConnectionGetDeleteStackArray={() => removeLastPersonGroup()}
                            >
                                <option
                                    value={''}
                                >
                                    Nenhum
                                </option>
                                {personGroupState.personGroupsList.map((item: any) => (
                                    <option
                                        key={item.id}
                                        value={item.id}
                                    >
                                        {item.name}
                                    </option>
                                ))}
                            </Select>
                        </Form.BreakLine>
                        <Select
                            label="Estado*"
                            customStyle="max-w-[200px]"
                            onChange={e => setCityState(prevState => ({ ...prevState, brStates: e.target.value }))}
                            value={cityState.brStates}
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
                    </Form.ContentField>
                    <Form.ContentField>
                        <div
                            className="w-full max-w-[120px] drop-shadow-[0px_0px_2px_#000000ae]"
                        >
                            <h4 className="bg-black text-center text-white font-bold p-1">
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
                    </Form.ContentField>
                    <Form.ContentField>

                        <Form.BreakLine>
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
                        </Form.BreakLine>
                        <Form.BreakLine>
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
                        </Form.BreakLine>
                        <Form.BreakLine>
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
                        </Form.BreakLine>
                        <Form.BreakLine>
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
                        </Form.BreakLine>

                    </Form.ContentField>
                </Form.ContentContainer>

                <Form.Footer>
                    <Form.Action>Cadastrar</Form.Action>
                </Form.Footer>
            </Form.Root>
            {personGroupState.isOpenModal && (
                <PersonGroupsModal
                    setPersonGroupState={setPersonGroupState}
                    personGroupId={currentIdCityOrPersonGroup}
                />
            )}
            {cityState.isOpenModal && (
                <CityModal
                    setCityState={setCityState}
                    cityId={currentIdCityOrPersonGroup}
                />
            )}
        </>
    )
}

export default PersonForm