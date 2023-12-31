type SectionsProps = {
    title: string
    value: string | boolean
}

interface FormNavbarSectionsProps {
    sections: SectionsProps[],
    setData: Function,
    data: string | boolean
}

const FormNavbarSections: React.FC<FormNavbarSectionsProps> = ({
    sections,
    setData,
    data
}) => {

    function handleSectSection(section: SectionsProps) {
        setData(section.value);
    }

    return (
        <div
            className="w-full flex justify-start gap-4"
        >
            {sections.map(section => (
                <button
                    key={section.title}
                    type="button"
                    onClick={() => handleSectSection(section)}
                    className={`text-sm text-white drop-shadow-[1px_1px_2px_#00000072] px-2 py-1 rounded-sm ${data == section.value ? 'bg-blue-500' : 'bg-black'}`}
                >
                    {section.title}
                </button>
            ))}
        </div>
    )
}

export default FormNavbarSections