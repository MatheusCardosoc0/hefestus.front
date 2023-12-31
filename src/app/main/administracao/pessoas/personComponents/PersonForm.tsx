"use client"

import { ImageUpload, Select } from "@/components/Inputs";
import TextField from "@/components/Inputs/TextField";
import { UFBRStates } from "@/constants/others/UFBRStates";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import PersonGroupsModal from "./PersonGroupsModal";
import { handleSetObjectForSelectValue } from "@/functions/handleSetObjectForSelectValue";
import CityModal from "./CityModal";

import { Form } from "@/components/Form";
import { FormPersonData, personSchema } from "../PersonSchemas";
import usePersonFunctions from "./usePersonFunctions";
import { useState } from "react";
import { Button } from "@/components/Buttons";

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

    const [currentPersonSection, setCurrentPersonSection] = useState<'principais' | 'secundários'>('principais')


    const {
        HandleOpenModalCity,
        HandleOpenModalPersonGroups,
        cityState,
        onSubmit,
        personGroupState,
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
            >
                <Form.NavbarSections
                    sections={[
                        { title: 'Dados principais', value: 'principais' },
                        { title: 'Dados secundários', value: 'secundários' }
                    ]}
                    setData={setCurrentPersonSection}
                    data={currentPersonSection}
                />
                <Form.ContentContainer>
                    {currentPersonSection == 'principais' && (
                        <>
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
                                    {/* <Select
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
                                    </Select> */}
                                </Form.BreakLine>
                                {/* <Select
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
                                </Select> */}
                                <Select
                                    label="Estados"
                                    options={personGroupState.personGroupsList}
                                    setValue={setCityState}

                                />
                            </Form.ContentField>
                            <Form.ContentField>
                                <Form.GroupContainer
                                    setValueGroup={setValue}
                                    stateKey="personGroup"
                                    group={personGroup}
                                />
                            </Form.ContentField>
                        </>
                    )}
                    {currentPersonSection == 'secundários' && (
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
                    )}
                </Form.ContentContainer>

                <Form.Footer className="" >
                    <Button customStyle="w-[200px] rounded-md" variantColor="green" type="submit">Cadastrar</Button>
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