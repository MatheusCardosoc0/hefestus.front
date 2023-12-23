"use client"

import { useIsOpenSectionOptionsMenu } from "@/hooks/context/useIsOpenSectionOptionsMenu"
import { ReactNode, useState } from "react"
import { Button } from "../Buttons"
import { usePathname } from "next/navigation"
import { extractNameFromUrl } from "@/functions/extractNameFromUrl"

const MainContainer = ({ children }: { children: ReactNode }) => {

    const { setIsOpen } = useIsOpenSectionOptionsMenu()
    const [isOpenOptionsAdvancedMenu, setIsOpenOptionsAdvancedMenu] = useState(false)

    const url = usePathname()



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
                    onClick={() => setIsOpenOptionsAdvancedMenu(prev => !prev)}
                    variantColor="white"
                    customStyle="text-sm max-w-[100px] rounded-lg"
                >
                    Opções
                </Button>

                {isOpenOptionsAdvancedMenu && (
                    <ul
                        className="
                        w-[140px]
                        absolute
                        top-16
                        right-1
                        bg-black
                        rounded-lg
                        p-1
                        Fade
                      "
                    >
                        <Button
                            variantColor="blue"
                            customStyle="text-xs"
                        >
                            Habilitar tela dupla
                        </Button>
                    </ul>
                )}
            </header>
            <div className="p-2">
                {children}
            </div>
        </main>
    )
}

export default MainContainer