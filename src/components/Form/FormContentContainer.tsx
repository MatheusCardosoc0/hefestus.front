interface FormContentContainerProps {
    children: React.ReactNode
}

const FormContentContainer: React.FC<FormContentContainerProps> = ({
    children
}) => {
    return (
        <div
            className="flex w-full"
        >
            {children}
        </div>
    )
}

export default FormContentContainer