interface FormFooterProps {
    children: React.ReactNode
}

const FormFooter: React.FC<FormFooterProps> = ({
    children
}) => {
    return (
        <footer
            className="w-full flex-gap-2 items-start"
        >
            {children}
        </footer>
    )
}

export default FormFooter