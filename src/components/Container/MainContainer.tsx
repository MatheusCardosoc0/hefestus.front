"use client"

import { useIsOpenSectionOptionsMenu } from "@/hooks/context/useIsOpenSectionOptionsMenu"
import { ReactNode, useState } from "react"
import { Button } from "../Buttons"
import { usePathname, useRouter } from "next/navigation"
import { extractNameFromUrl } from "@/functions/extractNameFromUrl"
import { ClipboardList, UserPlus } from "lucide-react"

const MainContainer = ({ children }: { children: ReactNode }) => {

    const { setIsOpen } = useIsOpenSectionOptionsMenu()
    const [isOpenOptionsNavigationMenu, setIsOpenOptionsNavigationMenu] = useState(false)

    const url = usePathname()

    const router = useRouter()

    function RedirectOption(option?: 'configuration' | 'new' | 'change') {
        const url = new URL(window.location.href);
        let pathSegments = url.pathname.split('/').filter(segment => segment);

        const isLastSegmentNumber = !isNaN(Number(pathSegments[pathSegments.length - 1]));

        if (!option) {
            if (isLastSegmentNumber) {
                pathSegments = pathSegments.slice(0, -2);
            } else if (['new', 'configuration'].includes(pathSegments[pathSegments.length - 1])) {
                pathSegments.pop();
            }
        } else {
            if (isLastSegmentNumber || ['new', 'configuration'].includes(pathSegments[pathSegments.length - 1])) {
                pathSegments = pathSegments.slice(0, -2);
            }
            pathSegments.push(option);
        }

        const newPath = '/' + pathSegments.join('/');
        router.push(newPath);
    }




    return (
        <main
            onClick={() => setIsOpen(false)}
            className="
                bg-white
                min-h-screen
                flex
                flex-col
                p-2
                lg:w-[90%]
                md:w-[80%]
                w-[74%]
            "
        >
            <header
                className="
                    bg-black
                    rounded-xl
                    w-full
                    text-2xl
                    font-bold
                    text-white
                    p-2
                    flex
                    justify-between
                    relative
                "
            >
                <h2>
                    {extractNameFromUrl(url)}
                </h2>
                <Button
                    onClick={() => setIsOpenOptionsNavigationMenu(prev => !prev)}
                    variantColor="white"
                    customStyle="text-sm max-w-[100px] rounded-lg"
                >
                    Opções
                </Button>

                {isOpenOptionsNavigationMenu && (
                    <ul
                        className="
                        w-[168px]
                        absolute
                        top-16
                        right-1
                        bg-black
                        rounded-lg
                        p-1
                        Fade
                        z-10
                        gap-1
                        flex
                        flex-col
                      "
                    >
                        {(url.includes("new") || url.includes("change")) && (
                            <Button
                                variantColor="blue"
                                customStyle="text-base"
                                onClick={() => RedirectOption()}
                            >
                                <ClipboardList />
                                Pesquisar
                            </Button>
                        )}
                        {!url.includes("new") && (
                            <Button
                                variantColor="green"
                                customStyle="text-base"
                                onClick={() => RedirectOption('new')}
                            >
                                <UserPlus />
                                Cadastrar
                            </Button>
                        )}
                    </ul>
                )}
            </header>
            <div className="p-2 pt-5">
                {children}
            </div>
        </main>
    )
}

export default MainContainer