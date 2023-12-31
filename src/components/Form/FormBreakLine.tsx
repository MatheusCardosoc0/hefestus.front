interface FormBreakLineProps {
    children: React.ReactNode
}

const FormBreakLine: React.FC<FormBreakLineProps> = ({
    children
}) => {
    return (
        <div className="flex gap-2 max-w-[620px]" >
            {children}
        </div>
    )
}

export default FormBreakLine