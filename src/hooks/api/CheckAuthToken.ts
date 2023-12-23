"use client"

import { api } from "@/libs/api"
import { useCurrentUser } from "../context/useCurrentUser"
import { ApiError } from "@/@types/ApiError"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export const CheckAuthToken = (isLogin: boolean) => {
    const token = localStorage.getItem("authToken")
    const router = useRouter()

    const { setUser, user } = useCurrentUser()

    const Verification = async () => {
        try {
            const response = await api.get(`/api/auth/${token}`)
            setUser(user.userName == null && response.data)
            console.log(response.data)
            if (isLogin) { router.push('/main/dashboard') }
        } catch (error) {
            const apiError = error as ApiError
            if (apiError.response) {
                const apiErrorMessage = apiError.response.data || 'Erro desconhecido ao processar a solicitação';
                toast.error(apiErrorMessage)
            } else {
                const messageError = apiError.message || "Erro de rede";
                toast.error(messageError);
            }
            localStorage.removeItem("authToken")
            router.push('/')
            console.error(apiError);
        }
    }

    useEffect(() => { Verification() }, [])
}