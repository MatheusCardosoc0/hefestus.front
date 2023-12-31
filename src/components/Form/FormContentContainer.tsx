interface FormContentContainerProps {
    children: React.ReactNode
}

const FormContentContainer: React.FC<FormContentContainerProps> = ({
    children
}) => {
    return (
        <div
            className="flex w-full justify-center gap-8"
        >
            {children}
        </div>
    )
}

export default FormContentContainer