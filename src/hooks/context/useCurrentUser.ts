import { create } from "zustand";

type UserProps = {
    userName: string,
    UrlImage: string
}

interface useCurrentUserProps {
    user: UserProps
    setUser: (value: UserProps) => void
}

export const useCurrentUser = create<useCurrentUserProps>(set => ({
    user: {} as UserProps,
    setUser: (value: UserProps) => set({ user: value })
}))