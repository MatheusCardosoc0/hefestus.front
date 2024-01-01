"use client"

import { AdvancedSelect, ImageUpload, Select } from "@/components/Inputs";
import { UFBRStates } from "@/constants/others/UFBRStates";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import PersonGroupsModal from "./PersonGroupsModal";
import CityModal from "./CityModal";

import { Form } from "@/components/Form";
import { FormPersonData, personSchema } from "../PersonSchemas";
import usePersonFunctions from "./usePersonFunctions";
import { useState } from "react";
import { Button } from "@/components/Buttons";
import SecondaryInputFields from "./SecondaryInputFields";
import PrimaryInputFields from "./PrimaryInputFields";
import useSubmitDataPostOrPut from "@/hooks/api/useSubmitDataPostOrPut";
import useDeleteData from "@/hooks/api/useDeleteData";
import useGetDataById from "@/hooks/api/useGetDataById";

interface PersonFormProps {
    personId?: any
}

const PersonForm: React.FC<PersonFormProps> = ({
    personId
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
            age: 0,
            personGroups: []
        },
        resolver: zodResolver(personSchema)
    })

    const urlImage = watch('urlImage')

    const personGroup = watch('personGroups')
    const city = watch('city')

    const [currentPersonSection, setCurrentPersonSection] = useState<'principais' | 'secundários'>('principais')


    const {
        HandleOpenModalCity,
        HandleOpenModalPersonGroups,
        cityState,
        personGroupState,
        setCityState,
        setPersonGroupState,
        currentIdCityOrPersonGroup
    } = usePersonFunctions({
        city,
        personGroup,
        setValue
    })

    const { submitData, loading } = useSubmitDataPostOrPut({
        urlApi: '/api/person/',
        urlReturn: '/main/administracao/pessoas',
        id: personId
    })

    async function onSubmit(data: FormPersonData) {
        console.log(data)
        await submitData({
            data
        })
    }

    const DeletePerson = useDeleteData({
        id: personId,
        urlApi: '/api/person/'
    })

    useGetDataById({
        id: personId,
        urlApi: '/api/person/',
        setData: (data) => {
            if (data) {
                Object.keys(data).forEach((key: any) => {
                    setValue(key, data[key], { shouldValidate: true });
                });
            }
        },
        activate: !!personId
    });

    console.log(errors)

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
                                <PrimaryInputFields
                                    errors={errors}
                                    register={register}
                                />

                                <Form.BreakLine>
                                    <AdvancedSelect
                                        label="Cidade*"
                                        options={cityState.cities}
                                        setValue={setValue}
                                        keyState="city"
                                        openModalApiConnectionPost={() => HandleOpenModalCity('post')}
                                        openModalApiConnectionPut={() => HandleOpenModalCity('put')}
                                        openModalApiConnectionGetList={() => setCityState(prevState => ({ ...prevState, triggerCity: !prevState.triggerCity }))}
                                        trigger={cityState.triggerCity}
                                        secondaryOptions={cityState.citiesIBGEList}
                                        currentValue={city}
                                    />
                                    <AdvancedSelect
                                        label="Grupo*"
                                        options={personGroupState.personGroupsList}
                                        setValue={setValue}
                                        keyState="personGroup"
                                        watch={watch}
                                        openModalApiConnectionPost={() => HandleOpenModalPersonGroups('post')}
                                        openModalApiConnectionPut={() => HandleOpenModalPersonGroups('put')}
                                    />
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
                            <SecondaryInputFields
                                errors={errors}
                                register={register}
                            />
                            <ImageUpload
                                onChange={value => setValue("urlImage", value)}
                                value={urlImage ? urlImage : ''}
                            />
                        </Form.ContentField>
                    )}
                </Form.ContentContainer>

                <Form.Footer>
                    <Form.DefaultActions
                        id={personId}
                        loading={loading}
                        removeFunction={() => DeletePerson()}
                    />
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