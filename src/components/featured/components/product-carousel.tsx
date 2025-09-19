"use client"

import Image from "next/image"
import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { ProductType } from "../dashboard/types/Product";

interface ProductCarouselProps {
  products: ProductType[];
}

export default function ProductCarousel({ products }: ProductCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0)


  const slides = [];
  for (let i = 0; i < products.length; i += 3) {
    slides.push(products.slice(i, i + 3));
  }

 const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }, [slides.length]) // Dependensi: fungsi ini dibuat ulang hanya jika jumlah slide berubah

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(timer)
  }, [nextSlide])

  return (
    <div className="container mx-auto px-4 py-14">
      <div className="relative">
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-200 group backdrop-blur-sm"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 text-gray-800 group-hover:scale-110 transition-transform" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-200 group backdrop-blur-sm"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 text-gray-800 group-hover:scale-110 transition-transform" />
        </button>

        <div className="overflow-hidden rounded-none">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${currentSlide * 100}%)`,
            }}
          >
            {products.map((product) => (
              <div key={product.id} className="w-full flex-shrink-0">
                <div className="grid grid-cols-1 md:grid-cols-3 h-96">
                  {products.map((item) => (
                    <div key={item.id} className="relative group overflow-hidden ">
                      <Image
                        src={item.imageUrl || ""}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300" />

                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h3 className="text-2xl md:text-xl font-bold mb-2 text-balance">{item.name}</h3>
                        <p className="text-sm opacity-90 mb-3 tracking-wide">{item.flavour}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-semibold">Rp. {item.price}</span>
                          <span className="text-sm opacity-80">Stock: {item.stock}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-8 space-x-3">
          {products.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? "bg-gray-800 scale-125" : "bg-gray-400 hover:bg-gray-600 hover:scale-110"
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
