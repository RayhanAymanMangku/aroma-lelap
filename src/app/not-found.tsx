import Link from 'next/link'
import React from 'react'

const NotFound = () => {
  return (
    // Tambahkan flex dan properti alignment di sini
    <div className="container min-h-screen mx-auto flex items-center justify-center">
        {/* div ini sekarang bisa lebih sederhana */}
        <div className="flex flex-col gap-4 items-center text-center">
            <h1 className='text-3xl font-medium text-amber-500'>404 - Halaman tidak ditemukan</h1>
            <Link href="/" className="text-gray-600 hover:text-amber-500 transition-colors">
              Kembali ke Beranda
            </Link>
        </div>
    </div>
  )
}

export default NotFound