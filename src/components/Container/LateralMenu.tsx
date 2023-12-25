/* eslint-disable @next/next/no-img-element */
"use client"

import { CheckAuthToken } from "@/hooks/api/CheckAuthToken"
import { useCurrentUser } from "@/hooks/context/useCurrentUser"
import { Button } from "../Buttons"
import { useCallback, useEffect, useState } from "react"
import MenuOptions from "./MenuOptions"
import { MenuOptionsProps, Option } from "@/@types/MenuOptions"
import { usuarioOptions } from "@/constants/usuarioOptions"
import { administracaoOptions } from "@/constants/administracaoOptions"
import { useIsOpenSectionOptionsMenu } from "@/hooks/context/useIsOpenSectionOptionsMenu"
import { SectionsOptions } from "@/constants/SectionsOptions"
import { StarIcon, BarChart3 } from 'lucide-react'
import Link from "next/link"

const LateralMenu = () => {

    const { user } = useCurrentUser()

    const [menuItems, setMenuItems] = useState<MenuOptionsProps>({} as MenuOptionsProps)

    // CheckAuthToken(false)

    const { isOpen, setIsOpen } = useIsOpenSectionOptionsMenu()

    const handleChangeSection = (
        options: Option[],
        title: string
    ) => {
        setMenuItems({
            ItemsForSection: options,
            TitleSection: title
        })
        setIsOpen(true)
    }

    useEffect(() => {
        if (isOpen == false) {
            setMenuItems({
                TitleSection: '',
                ItemsForSection: []
            })
        }
    }, [isOpen])

    return (
        <div
            className="
                w-[24%]
                md:w-[18%]
                lg:w-[12%]
                xl:w-[10%]
                bg-black
                p-2
                h-full
                min-h-[98vh]
                flex
                flex-col
                items-center
                rounded-xl
                mr-2
                mt-2
          "
        >
            <div
                className="
                  text-white
                  flex
                  flex-col
                  items-center
                  gap-12
              "
            >
                <div
                    className="
                    relative
                    text-center
                  "
                >
                    <img
                        className="w-[100px] h-[100px] bg-white rounded-full border-2 border-white cursor-pointer hover:scale-110 mb-2"
                        src={user.UrlImage ?? ''}
                        alt=""
                        onClick={() => user.userName != null && handleChangeSection(usuarioOptions, "Usuário")}
                    />
                    <span>{user.userName}</span>

                    {isOpen && (
                        <MenuOptions
                            TitleSection={menuItems.TitleSection}
                            ItemsForSection={menuItems.ItemsForSection}
                            setIsOpen={setIsOpen}
                        />
                    )}
                </div>

                <div className="w-full flex flex-col items-center" >
                    <button
                        className="w-[90%] bg-black text-white border border-white font-bold p-2 flex gap-2 rounded-md hover:text-yellow-400 hover:border-yellow-400"
                    >
                        <StarIcon />
                        Favoritos
                    </button>
                    <Link
                        href={"/main/dashboard"}
                        className="w-[90%] bg-black text-white border border-white font-bold p-2 flex gap-2 rounded-md hover:text-yellow-400 hover:border-yellow-400 mt-2"
                    >
                        <BarChart3 />
                        Dashboard
                    </Link>
                </div>
                <ul
                    className="text-white flex flex-col gap-2"
                >
                    {SectionsOptions.map(item => (
                        <li
                            key={item.title}
                            onClick={() => handleChangeSection(item.optionsList, item.title)}
                            className={`
                              rounded-xl
                              font-bold
                              text-black
                              text-sm
                              p-2
                              text-center
                              cursor-pointer
                              hover:bg-neutral-400
                              ${menuItems.TitleSection == item.title ? 'bg-neutral-400' : 'bg-white'}
                            `}
                        >
                            {item.title}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default LateralMenu