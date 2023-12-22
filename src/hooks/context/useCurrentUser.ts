import { create } from "zustand";

type UserProps = {
    userName: string | null,
    UrlImage: string | null
}

interface useCurrentUserProps {
    user: UserProps
    setUser: (value: UserProps) => void
}

export const useCurrentUser = create<useCurrentUserProps>(set => ({
    user: {} as UserProps,
    setUser: (value: UserProps) => set({ user: value })
}))