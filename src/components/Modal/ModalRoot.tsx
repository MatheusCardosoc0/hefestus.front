interface ModalRootProps {
    children: React.ReactNode
}

const ModalRoot: React.FC<ModalRootProps> = ({
    children
}) => {
    return (
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
                flex
                flex-col
                gap-3
                z-20
            "
        >
            {children}
        </div>
    )
}

export default ModalRoot