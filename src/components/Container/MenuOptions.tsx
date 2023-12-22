import { MenuOptionsProps, Option } from "@/@types/MenuOptions";
import { useRouter } from "next/navigation";

type MenuOptionsPropsWithIsOpen = MenuOptionsProps & { setIsOpen: (value: boolean) => void }

const MenuOptions: React.FC<MenuOptionsPropsWithIsOpen> = ({
    ItemsForSection,
    TitleSection,
    setIsOpen
}) => {
    const router = useRouter();

    const handleClick = (item: Option) => {
        if (item.href) {
            router.push(item.href);
        } else if (item.function) {
            item.function();
        }
        setIsOpen(false)
    };

    return (
        <ul className="w-[140px] bg-transparent absolute right-[130%] top-0 Fade drop-shadow-[1px_1px_2px_#0000006f]">

            <h3
                className="
                    text-center
                    py-2
                    mb-4
                    bg-black
                    rounded-full
                    text-white
                    border-2
                    font-bold
                "
            >
                {TitleSection}
            </h3>

            {ItemsForSection.map((item) => (
                <li
                    key={item.title}
                    onClick={() => handleClick(item)}
                    className="
                        bg-gradient-to-t
                        bg-black         
                        p-2 
                        text-start
                        cursor-pointer
                        hover:bg-neutral-600
                        mt-[1px]
                    "
                >
                    {item.title}
                </li>
            ))}
        </ul>
    );
};

export default MenuOptions;
