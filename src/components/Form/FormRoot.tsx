import { FormEventHandler, ReactNode } from "react"

interface FormRootProps {
    children: ReactNode
    onSubmit: FormEventHandler<HTMLFormElement>,
    className?: string
}

const FormRoot: React.FC<FormRootProps> = ({
    children,
    onSubmit,
    className
}) => {
    return (
        <form
            className={`
              flex
              flex-col
              ${className}
            `}
            onSubmit={onSubmit}
        >
            {children}
        </form>
    )
}

export default FormRoot