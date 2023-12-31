export type Colors = 'error' | 'success' | 'warn' | 'info' | 'violet'

type AppColorsProps = {
    error: string
    success: string
    warn: string
    info: string
    violet: string
}

export const AppColors: AppColorsProps = {
    error: 'bg-red-500',
    info: 'bg-sky-500',
    success: 'bg-gradient-to-t from-green-400 to-green-700',
    violet: 'bg-violet-500',
    warn: 'bg-yellow-500'
}

