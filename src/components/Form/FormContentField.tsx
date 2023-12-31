interface FormContentFieldProps {
    children: React.ReactNode
}

const FormContentField: React.FC<FormContentFieldProps> = ({
    children
}) => {
    return (
        <div
            className="flex flex-1 flex-col gap-4"
        >
            {children}
        </div>
    )
}

export default FormContentField