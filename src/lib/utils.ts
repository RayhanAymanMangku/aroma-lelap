import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import localFont from "next/font/local"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatRupiah = (value: string) => {
  const numberString = value.replace(/[^,\d]/g, "").toString();
  const formatted = numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return formatted;
};

export const heliosfont = localFont({
  src: [
    {
      path: '../../public/fonts/heliosext.woff',
      weight: '500',
      style: 'normal',
    },
  ],
  variable: '--font-monument'
})
