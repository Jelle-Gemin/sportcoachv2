import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: (string | boolean | null | undefined | unknown)[]) {
    return twMerge(clsx(inputs))
}
