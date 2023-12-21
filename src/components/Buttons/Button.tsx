import { ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    text: string,
    customStyle?: string,
    variantColor?: 'blue' | 'yellow' | 'red' | 'green' | 'white'
}

const Button: React.FC<ButtonProps> = ({
    text,
    customStyle,
    variantColor = 'blue',
    ...props
}) => {
    return (
        <button
            {...props}
            type='submit'
            className={`
                p-2     
                font-bold
                text-md
                w-full
                ${customStyle}
                ${variantColor === 'blue' && 'bg-sky-400 text-white hover:bg-sky-500'}
                ${variantColor === 'yellow' && 'bg-yellow-400 text-white hover:bg-yellow-500'}
                ${variantColor === 'red' && 'bg-red-400 text-white hover:bg-red-500'}
                ${variantColor === 'green' && 'bg-green-400 text-white hover:bg-green-500'}
          `}
        >
            {text}
        </button>
    )
}

export default Button