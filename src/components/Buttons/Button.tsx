import { ButtonHTMLAttributes, ReactNode } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode
    customStyle?: string,
    variantColor?: 'blue' | 'yellow' | 'red' | 'green' | 'white'
}

const Button: React.FC<ButtonProps> = ({
    children,
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
                w-full
                ${customStyle}
                ${variantColor === 'blue' && 'bg-sky-500 text-white hover:bg-sky-700'}
                ${variantColor === 'white' && 'bg-white text-black hover:bg-neutral-400'}
                ${variantColor === 'yellow' && 'bg-yellow-400 text-white hover:bg-yellow-500'}
                ${variantColor === 'red' && 'bg-red-400 text-white hover:bg-red-500'}
                ${variantColor === 'green' && 'bg-green-500 text-white hover:bg-green-600'}
          `}
        >
            {children}
        </button>
    )
}

export default Button