import { Form } from "@/components/Form"
import TextField from "@/components/Inputs/TextField"
import { UseFormRegister } from "react-hook-form"

interface SecondaryInputFieldsProps {
    register: UseFormRegister<any>
    errors: any
}

const SecondaryInputFields: React.FC<SecondaryInputFieldsProps> = ({
    errors,
    register
}) => {
    return (
        <>
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
                    id="inscricaoEstadual"
                    label="Inscrição Estadual"
                    register={register}
                    error={errors.inscricaoEstadual?.message}
                />
                <TextField
                    id="description"
                    label="Descrição"
                    register={register}
                    error={errors.description?.message}
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
                <TextField
                    id="age"
                    label="Idade"
                    type="number"
                    register={register}
                    error={errors.age?.message}
                />

            </Form.BreakLine>
        </>
    )
}

export default SecondaryInputFields