/* eslint-disable @next/next/no-img-element */
"use client"

import { CheckAuthToken } from "@/hooks/api/CheckAuthToken"
import { useCurrentUser } from "@/hooks/context/useCurrentUser"
import { Button } from "../Buttons"
import { useState } from "react"
import MenuOptions from "./MenuOptions"
import { MenuOptionsProps } from "@/@types/MenuOptions"
import { OptionsUsuario } from "@/constants/usuario"

const LateralMenu = () => {

    const { user } = useCurrentUser()

    const [menuItems, setMenuItems] = useState<MenuOptionsProps>({} as MenuOptionsProps)

    CheckAuthToken()

    return (
        <div
            className="
                w-[140px]
                bg-black
                p-2
                h-[98%]
                flex
                flex-col
                items-center
                rounded-xl
                absolute
                right-1
                top-1/2
                -translate-y-1/2
                py-8
          "
        >
            <div
                className="
                  text-white
                  flex
                  flex-col
                  items-center
                  gap-8
              "
            >
                <div
                    className="
                    relative
                  "
                >
                    <img
                        className="w-[100px] h-[100px] bg-white rounded-full border-2 border-white cursor-pointer hover:scale-110"
                        src={user.UrlImage ?? ''}
                        alt=""
                        onClick={() => setMenuItems({
                            isOpen: true,
                            ItemsForSection: OptionsUsuario,
                            TitleSection: user.userName
                        })}
                    />

                    {menuItems.isOpen && (
                        <MenuOptions
                            TitleSection={menuItems.TitleSection}
                            ItemsForSection={menuItems.ItemsForSection}
                            isOpen={menuItems.isOpen}
                        />
                    )}
                </div>

                <div>
                    <Button
                        text="Agenda"
                        type="button"
                        customStyle="rounded-lg"
                    />
                    <Button
                        text="Calculadora"
                        type="button"
                        customStyle="rounded-lg mt-2"
                    />
                </div>
            </div>
        </div>
    )
}

export default LateralMenu