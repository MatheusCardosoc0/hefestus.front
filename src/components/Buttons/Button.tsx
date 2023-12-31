import { ButtonHTMLAttributes, ReactNode } from "react"

interface ButtonProps {
    children: ReactNode
    customStyle?: string,
    variantColor?: 'blue' | 'yellow' | 'red' | 'green' | 'white' | 'orange' | 'black'
    type?: "submit" | "reset" | "button"
    onClick?: () => void
}

const Button: React.FC<ButtonProps> = ({
    children,
    customStyle,
    variantColor = 'blue',
    type = 'button',
    onClick
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`
                p-2     
                font-bold
                flex
                items-center
                justify-center
                gap-2
                max-w-[200px]
                ${customStyle}
                ${variantColor === 'blue' && 'bg-blue-500 text-white hover:bg-blue-700'}
                ${variantColor === 'orange' && 'bg-orange-500 text-white hover:bg-orange-700'}
                ${variantColor === 'white' && 'bg-white text-black hover:bg-neutral-400'}
                ${variantColor === 'yellow' && 'bg-yellow-400 text-white hover:bg-yellow-500'}
                ${variantColor === 'red' && 'bg-red-400 text-white hover:bg-red-500'}
                ${variantColor === 'green' && 'bg-green-500 text-white hover:bg-green-600'}
                ${variantColor === 'black' && 'bg-black text-white hover:bg-neutral-700'}
          `}
        >
            {children}
        </button>
    )
}

export default Button