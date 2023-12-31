import { AppColors, Colors } from "@/constants/theme/AppColors"


interface FormActionsProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    ButtonColor?: Colors
}

const FormAction: React.FC<FormActionsProps> = ({
    children,
    className,
    ButtonColor = 'success',
    onClick,
    ...rest
}) => {

    const colorButton = AppColors[ButtonColor]

    return (
        <button
            {...rest}
            className={`
            text-lg max-w-[320px] px-4 py-1 text-white flex justify-center items-center mt-8 gap-2
            ${colorButton}
            ${className}
        `}
        >
            {children}
        </button>
    )
}

export default FormAction