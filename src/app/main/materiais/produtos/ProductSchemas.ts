import { z } from 'zod';

export const productGroupSchema = z.object({
    id: z.number().optional(),
    name: z.string().nonempty({ message: "O nome do grupo de pessoas não pode estar vazio" })
});

export const productFamilySchema = z.object({
    id: z.number().optional(),
    name: z.string().nonempty({ message: "O nome da familia de pessoas não pode estar vazio" })
});

export const productSubGroupSchema = z.object({
    id: z.number().optional(),
    name: z.string().nonempty({ message: "O nome do sub grupo de pessoas não pode estar vazio" })
});

export const productSchema = z.object({
    name: z.string()
        .min(1, { message: "O nome do produto não pode estar vazio." })
        .max(50, { message: "O nome do produto não pode exceder 100 caracteres." }),
    description: z.string()
        .max(200, { message: "A descrição não pode exceder 500 caracteres." }),
    priceSale: z.number()
        .min(0, { message: "O preço de venda não pode ser negativo." }),
    priceTotal: z.number()
        .min(0, { message: "O preço total não pode ser negativo." }),
    productGroup: productGroupSchema,
    productFamily: productFamilySchema,
    productSubgroup: productSubGroupSchema
});

export type FormProductData = z.infer<typeof productSchema>