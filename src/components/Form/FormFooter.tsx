interface FormFooterProps {
    children: React.ReactNode
    className?: string
}

const FormFooter: React.FC<FormFooterProps> = ({
    children,
    className
}) => {
    return (
        <footer
            className={`w-full flex gap-2 items-center ${className}`}
        >
            {children}
        </footer>
    )
}

export default FormFooter