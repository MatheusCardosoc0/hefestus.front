import { ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    text: string,
    customStyle?: string
}

const Button: React.FC<ButtonProps> = ({
    text,
    customStyle,
    ...props
}) => {
    return (
        <button
            {...props}
            type='submit'
            className={`
            p-2
            bg-blue-400
            text-white
            font-bold
            text-md
            hover:bg-blue-500
            w-full
            ${customStyle}
          `}
        >
            {text}
        </button>
    )
}

export default Button