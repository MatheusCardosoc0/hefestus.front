import { ReactNode } from "react"

interface FormTitleProps {
    children: ReactNode
}

const FormTitle: React.FC<FormTitleProps> = ({
    children
}) => {
    return (
        <h3
            className="text-xl"
        >
            {children}
        </h3>
    )
}

export default FormTitle