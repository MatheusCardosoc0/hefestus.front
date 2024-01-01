import { Trash2 } from "lucide-react"
import { Button } from "../Buttons"

type ElementForGroupProps = {
    id: number | undefined
    name: string
}

interface FormGroupContainerProps {
    group: any[]
    setValueGroup: Function
    stateKey: string
}

const FormGroupContainer: React.FC<FormGroupContainerProps> = ({
    group,
    setValueGroup,
    stateKey
}) => {
    const removeGroup = (element: any) => {
        const newPersonGroup = group.filter(item => item.id !== element.id);
        setValueGroup(stateKey, newPersonGroup);
    };


    return (
        <div
            className="w-[220px] bg-white px-4 py-2 rounded-xl drop-shadow-[0px_0px_1px_#000000] flex flex-col gap-2"
        >
            <h4 className=" text-black font-bold p-1 text-center border-b-2 pb-2 border-black text-xl">
                Grupos
            </h4>
            <ul
                className="flex flex-col gap-1"
            >
                {group.length > 0 && group.map(item => (
                    <li key={item.id}
                        className=" even:text-neutral-800 font-bold text-black flex gap-2 items-center"
                    >
                        <span
                            className="text-sm text-center p-1 w-[40px]"
                        >
                            {item.id}
                        </span>
                        <span
                            className="w-[162px] overflow-hidden"
                        >
                            {item.name}
                        </span>
                        <Button
                            onClick={() => removeGroup(item)}
                            variantColor="black"
                            customStyle=" rounded-full p-1 max-w-[32px]"
                        >
                            <Trash2 size={20} />
                        </Button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default FormGroupContainer