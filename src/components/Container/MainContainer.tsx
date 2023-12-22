"use client"

import { useIsOpenSectionOptionsMenu } from "@/hooks/context/useIsOpenSectionOptionsMenu"
import { ReactNode } from "react"

const MainContainer = ({ children }: { children: ReactNode }) => {

    const { setIsOpen } = useIsOpenSectionOptionsMenu()

    return (
        <main
            onClick={() => setIsOpen(false)}
            className="
                    bg-white
                    w-full
                    min-h-screen
                "
        >
            {children}
        </main>
    )
}

export default MainContainer