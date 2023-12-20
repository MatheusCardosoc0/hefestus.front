/* eslint-disable @next/next/no-img-element */
"use client"

import { CheckAuthToken } from "@/hooks/api/CheckAuthToken"
import { useCurrentUser } from "@/hooks/context/useCurrentUser"
import { Button } from "../Buttons"

const LateralMenu = () => {

    const { user } = useCurrentUser()

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
          "
        >
            <div
                className="
                  text-white
                  flex
                  flex-col
                  items-center
                  gap-2
              "
            >
                <img
                    className="w-[88px] h-[88px] bg-white rounded-full border-2 border-white"
                    src={user.UrlImage ?? ''}
                    alt=""
                />

                <Button
                    text="Agenda"
                    type="button"
                    customStyle="rounded-lg"
                />
                <Button
                    text="Calculadora"
                    type="button"
                    customStyle="rounded-lg"
                />
            </div>
        </div>
    )
}

export default LateralMenu