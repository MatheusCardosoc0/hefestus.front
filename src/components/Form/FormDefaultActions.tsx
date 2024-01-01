import { Loader2 } from "lucide-react"
import { Button } from "../Buttons"

interface FormDefaultActionsProps {
    id: any
    loading: boolean
    removeFunction: () => void
}

const FormDefaultActions: React.FC<FormDefaultActionsProps> = ({
    id,
    loading,
    removeFunction
}) => {
    return (
        <>
            <Button customStyle="max-w-[160px] rounded-md text-lg py-1" variantColor="green" type="submit">
                {loading && (
                    <Loader2 className="animate-spin" />
                )}
                {id ? 'Alterar' : 'Cadastrar'}
            </Button>
            {id > 0 && (
                <Button type="button" variantColor="red" customStyle="max-w-[160px] rounded-md text-lg py-1"
                    onClick={removeFunction}
                >
                    Remover
                </Button>
            )}
        </>
    )
}

export default FormDefaultActions