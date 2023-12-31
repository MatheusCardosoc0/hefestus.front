interface ModalTitleProps {
    children: React.ReactNode
}

const ModalTitle: React.FC<ModalTitleProps> = ({
    children
}) => {
    return (
        <h2
            className="text-2xl"
        >
            {children}
        </h2>
    )
}

export default ModalTitle