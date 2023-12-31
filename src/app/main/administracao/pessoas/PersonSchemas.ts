import { z } from "zod";

export const citySchema = z.object({
    id: z.number().optional(),
    name: z.string().nonempty({ message: "O nome da cidade não pode estar vazio" }),
    ibgeNumber: z.string().optional().refine((val) => {
        if (val === undefined) return true;

        return !Number.isNaN(parseInt(val, 10));
    }, {
        message: "Expected number, received a string"
    }),
    state: z.string().nonempty({ message: "O estado não pode estar vazio" }),
});


export const personGroupSchema = z.object({
    id: z.number().optional(),
    name: z.string().nonempty({ message: "O nome no grupo de pessoas não pode estar vazio" }),
});


export const personSchema = z.object({
    name: z.string().nonempty({ message: "O nome não pode estar vazio" }),
    email: z.string().email({ message: "Formato de e-mail inválido" }),
    phone: z.string().nonempty({ message: "O telefone não pode estar vazio" }),
    age: z.string().optional().refine((val) => {
        if (val === undefined) return true;

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

export type FormPersonData = z.infer<typeof personSchema>
