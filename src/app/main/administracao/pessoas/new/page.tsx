"use client"

import { Button } from "@/components/Buttons";
import { ImageUpload, Input, Select } from "@/components/Inputs";
import TextField from "@/components/Inputs/TextField";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod"

const personGroupSchema = z.object({
    name: z.string().nonempty({ message: "O nome no grupo de pessoas não pode estar vazio" }),
});

const citySchema = z.object({
    name: z.string().nonempty({ message: "O nome da cidade não pode estar vazio" }),
    ibgeNumber: z.string().nonempty({ message: "O número do IBGE não pode estar vazio" }),
    state: z.string().nonempty({ message: "O estado não pode estar vazio" }),
});

const personSchema = z.object({
    name: z.string().nonempty({ message: "O nome não pode estar vazio" }),
    email: z.string().email({ message: "Formato de e-mail inválido" }),
    phone: z.string().nonempty({ message: "O telefone não pode estar vazio" }),
    age: z.number().min(0, { message: "A idade não pode ser negativa" }),
    cpf: z.string().nonempty({ message: "O CPF não pode estar vazio" }),
    address: z.string().nonempty({ message: "O endereço não pode estar vazio" }),
    birthDate: z.string().nonempty({ message: "A data de nascimento não pode estar vazia" }), // ou z.date() se estiver usando objetos Date
    ibge: z.string().nonempty({ message: "O IBGE não pode estar vazio" }),
    razao: z.string().nonempty({ message: "A razão não pode estar vazia" }),
    inscricaoEstadual: z.string().nonempty({ message: "A inscrição estadual não pode estar vazia" }),
    cep: z.string().nonempty({ message: "O CEP não pode estar vazio" }),
    urlImage: z.string().url({ message: "Formato de URL inválido para a imagem" }),
    isBlocked: z.boolean(),
    maritalStatus: z.string().nonempty({ message: "O estado civil não pode estar vazio" }),
    habilities: z.string().nonempty({ message: "As habilidades não podem estar vazias" }),
    description: z.string().nonempty({ message: "A descrição não pode estar vazia" }),
    personGroup: z.array(personGroupSchema),
    cityId: z.number().min(0, { message: "O ID da cidade não pode ser negativo" }),
    city: citySchema,
});

type FormPersonData = z.infer<typeof personSchema>

const BreakLineInput = ({ children }: { children: ReactNode }) => (
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
        resolver: zodResolver(personSchema)
    })

    const [state, setState] = useState('')

    const urlImage = watch('urlImage')

    return (
        <form
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
                    >

                    </Select>
                    <Select
                        label="Grupo*"
                    ></Select>
                </BreakLineInput>
                <Select
                    label="Estado*"
                    customStyle="max-w-[200px]"
                >

                </Select>

                <Button
                    variantColor="green"
                    customStyle="max-w-[200px] mt-20"
                    type="submit"
                >
                    Cadastrar
                </Button>
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
                        value={urlImage}
                    />
                </BreakLineInput>
            </div>
        </form>
    )
}

export default NovaPessoa