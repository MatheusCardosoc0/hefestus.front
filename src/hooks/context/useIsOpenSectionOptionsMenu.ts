import { create } from "zustand";

interface useIsOpenSectionOptionsMenu {
    isOpen: boolean
    setIsOpen: (value: boolean) => void
}

export const useIsOpenSectionOptionsMenu = create<useIsOpenSectionOptionsMenu>(set => ({
    isOpen: false,
    setIsOpen: (value: boolean) => set({ isOpen: value })
}))