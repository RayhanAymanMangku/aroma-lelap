"use client"
import Link from "next/link"
import { navList } from "../featured/lib/constants"

export default function Footer() {
  return (
    <footer className="flex w-full bg-gradient-to-t from-black to-gray-900 text-white">
      <div className="container mx-auto w-full px-4 py-10">
        {/* --- PERUBAHAN UTAMA: Ubah ke Flexbox untuk alignment --- */}
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          {/* Bagian Kiri: Logo */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <h1 className="text-2xl font-semibold text-amber-500">
                Aroma Lelap<span className="text-white">.</span>
              </h1>
            </Link>
          </div>

          {/* Bagian Kanan: Quick Links */}
          <div>
            <h3 className={`mb-4 text-sm font-semibold tracking-wider text-amber-500`}>Quick Links</h3>
            <ul className="space-y-3 grid grid-cols-2 space-x-6">
              {navList.map((item) => {
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-gray-300 hover:text-amber-400 transition-colors duration-200"
                    >
                      {item.name}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="mt-8 border-t border-white/10 pt-8">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            {/* Ikon Sosial Media */}
            <div className="flex space-x-6">
              <Link
                href="https://www.instagram.com/mekanuma/?hl=en"
                className="text-gray-400 hover:text-amber-400 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="https://www.tiktok.com/@mekanuma"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-amber-400 transition-colors"
              >
                <span className="sr-only">Tiktok</span>
                {/* Menggunakan ikon generik jika ikon TikTok tidak tersedia */}
              </Link>
            </div>
            
            {/* Teks Copyright */}
            <div className="text-center text-sm text-gray-500 md:text-right">
              {/* --- PERBAIKAN KECIL: Menyesuaikan nama brand --- */}
              <span>© {new Date().getFullYear()} Aroma Lelap. All rights reserved.</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}