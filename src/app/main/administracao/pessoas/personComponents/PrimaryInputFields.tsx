import { Form } from "@/components/Form"
import TextField from "@/components/Inputs/TextField"
import { UseFormRegister } from "react-hook-form"

interface PrimaryInputFieldsProps {
    register: UseFormRegister<any>
    errors: any
}

const PrimaryInputFields: React.FC<PrimaryInputFieldsProps> = ({
    errors,
    register
}) => {
    return (
        <>
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
        </>
    )
}

export default PrimaryInputFields