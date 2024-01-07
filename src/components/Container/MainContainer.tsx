"use client"

import { useIsOpenSectionOptionsMenu } from "@/hooks/context/useIsOpenSectionOptionsMenu"
import { ReactNode } from "react"
import { Button } from "../Buttons"
import { usePathname, useRouter } from "next/navigation"
import { extractNameFromUrl } from "@/functions/extractNameFromUrl"
import { ClipboardList, UserPlus } from "lucide-react"

const MainContainer = ({ children }: { children: ReactNode }) => {

    const { setIsOpen } = useIsOpenSectionOptionsMenu()

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
                    py-1
                    px-2
                    flex
                    justify-between
                    relative
                    items-center
                "
            >
                <h2>
                    {extractNameFromUrl(url)}
                </h2>
                {!url.includes("dashboard") && (
                    <ul
                        className="
                            flex
                            top-16
                            right-1
                            bg-black
                            rounded-lg
                            p-1
                            Fade
                            z-10
                            gap-3
                        "
                    >
                        {(url.includes("new") || url.includes("change")) && (
                            <Button
                                variantColor="blue"
                                customStyle="rounded-full"
                                onClick={() => RedirectOption()}
                                title="Buscar"
                            >
                                <ClipboardList size={28} />
                            </Button>
                        )}
                        {!url.includes("new") && (
                            <Button
                                variantColor="green"
                                customStyle="rounded-full"
                                onClick={() => RedirectOption('new')}
                                title="Cadastrar"
                            >
                                <UserPlus size={28} />
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