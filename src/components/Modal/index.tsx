"use client"

import { Dispatch, MouseEventHandler, ReactNode, SetStateAction } from "react"
import { Button } from "../Buttons"



interface ModalProps {
    children: ReactNode,
    handleSubmit: (value: any) => void
    title: string
    setOpenModal: Dispatch<SetStateAction<boolean>>
}

const Modal: React.FC<ModalProps> = ({
    children,
    handleSubmit,
    title,
    setOpenModal
}) => {

    return (
        <>
            <div
                onClick={() => setOpenModal(false)}
                className="
                  fixed
                  w-full
                  h-full
                  bg-[#00000074]
                  top-1/2
                  left-1/2
                  -translate-x-1/2
                  -translate-y-1/2
                  cursor-pointer
                "
            />
            <div
                className="
                    fixed
                    top-1/2
                    left-1/2
                    -translate-x-1/2
                    -translate-y-1/2
                    w-[70%]
                    max-w-[520px]
                    max-h-[520px]
                    drop-shadow-[0px_0px_3px_#5b5b5b]
                    rounded-md
                    bg-white
                    p-2
                "
            >
                <form
                    onSubmit={handleSubmit}
                    className="
                    flex
                    flex-col
                    gap-4
                    "
                >
                    <h2
                        className="text-2xl"
                    >
                        {title}
                    </h2>
                    {children}
                    <Button
                        variantColor="green"
                        type="submit"
                        customStyle="max-w-[300px] mt-4"
                    >
                        Cadastrar
                    </Button>
                </form>
            </div>
        </>
    )
}

export default Modal