import { Button } from "@/components/ui/button"
import Image from "next/image"

const AboutSection = () => {
  return (
    <section className="container mx-auto px-4 py-16 lg:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        <div className="flex justify-center lg:justify-start order-2 lg:order-1">
          <div className="relative w-full max-w-md lg:max-w-lg">
            <Image
              src="/assets/candle.jpeg"
              alt="About Aroma Lelap - Premium aromatherapy candles"
              width={500}
              height={500}
              className="w-full h-auto object-cover rounded-none shadow-lg"
              priority
            />
          </div>
        </div>

        <div className="flex flex-col gap-6 order-1 lg:order-2">
          <div className="space-y-4">
            <p className="text-sm font-medium text-amber-500 tracking-wider uppercase">About Us</p>
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-light text-gray-900 leading-tight">AROMALELAP</h2>
          </div>

          <div className="space-y-6">
            <p className="text-gray-700 leading-relaxed text-base lg:text-lg text-justify text-wrap">
              Kami di AROMALELAP berkomitmen untuk meningkatkan kualitas tidur Anda melalui pengalaman aromaterapi yang
              menenangkan. Kami percaya bahwa istirahat yang baik dimulai dari suasana yang tenang dan harmonis.
            </p>
            <p className="text-gray-700 text-justify text-wrap leading-relaxed text-base lg:text-lg">
              Dengan inovasi, kami mengubah minyak jelantah bekas menjadi lilin aromaterapi premium. Setiap lilin
              diracik khusus untuk membantu Anda rileks, meredakan stres, dan mempersiapkan diri untuk tidur nyenyak.
              Dengan memilih AROMALELAP, Anda tidak hanya berinvestasi pada kualitas istirahat Anda, tetapi juga
              berkontribusi pada planet yang lebih bersih.
            </p>

            <div className="pt-4">
              <Button
                variant="outline"
                size="lg"
                className="border-2 text-xs border-gray-900 rounded-none text-gray-900 hover:bg-gray-900 hover:text-white transition-colors duration-300 px-8 py-3 font-medium tracking-wide bg-transparent"
              >
                READ MORE
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
