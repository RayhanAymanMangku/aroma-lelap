import { Card } from "@/components/ui/card"

interface QualitySectionProps {
  section?: string
  title?: string
}

const QualitySection = ({ section, title }: QualitySectionProps) => {
  const servicesList = [
    {
      id: 1,
      title: "Premium Quality",
      description:
        "Lilin aromaterapi berkualitas premium menggunakan bahan terbaik untuk pengalaman aromaterapi yang optimal.",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" />
        </svg>
      ),
    },
    {
      id: 2,
      title: "Eco-Friendly",
      description:
        "Proses pembuatan menggunakan minyak jelantah daur ulang, ramah lingkungan dan berkelanjutan untuk masa depan.",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2V13L20.5 20.5C21.1 19.9 21.6 19.2 22 18.5C19.5 16 18.5 12.2 19 8.5C16.9 9.8 14.4 10.3 12 10V2ZM11 2V10C8.6 10.3 6.1 9.8 4 8.5C4.5 12.2 3.5 16 1 18.5C1.4 19.2 1.9 19.9 2.5 20.5L11 13V2Z" />
        </svg>
      ),
    },
    {
      id: 3,
      title: "Custom Design",
      description:
        "Desain lilin dapat disesuaikan dengan kebutuhan dan selera Anda untuk menciptakan suasana yang diinginkan.",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9.4 16.6L4.8 12L3.4 13.4L9.4 19.4L20.6 8.2L19.2 6.8L9.4 16.6ZM12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z" />
        </svg>
      ),
    },
    {
      id: 4,
      title: "Consultation",
      description:
        "Konsultasi aromaterapi dengan tim berpengalaman untuk membantu Anda memilih aroma yang tepat sesuai kebutuhan.",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 3C6.5 3 2 6.6 2 11C2 13.2 3.2 15.2 5 16.5V21L7.3 19.3C8.5 19.8 9.7 20 11 20H12C17.5 20 22 16.4 22 12S17.5 4 12 4V3M8 13C7.4 13 7 12.6 7 12S7.4 11 8 11 9 11.4 9 12 8.6 13 8 13M12 13C11.4 13 11 12.6 11 12S11.4 11 12 11 13 11.4 13 12 12.6 13 12 13M16 13C15.4 13 15 12.6 15 12S15.4 11 16 11 17 11.4 17 12 16.6 13 16 13Z" />
        </svg>
      ),
    },
  ]

  return (
    <div className="flex w-full bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4 py-16 lg:py-20">
        <div className="flex flex-col justify-center items-center gap-6 h-full">
          <p className="text-xs font-semibold text-amber-500 tracking-[0.2em] uppercase mb-2">{section}</p>
          <h1 className="text-3xl lg:text-4xl xl:text-5xl font-light text-white leading-tight text-center max-w-4xl text-balance">
            {title}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mt-12 w-full max-w-7xl">
            {servicesList.map((service) => (
              <Card
                key={service.id}
                className="flex flex-col items-center p-6 lg:p-8 rounded-none bg-white/5 border border-white/10 hover:bg-white/10 hover:border-amber-500/30 transition-all duration-300 group"
              >
                <div className="text-amber-500 mb-4 group-hover:text-amber-400 transition-colors duration-300">
                  {service.icon}
                </div>
                <h3 className="font-semibold uppercase text-amber-500 mb-3 text-sm tracking-wider text-center">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-300 text-center leading-relaxed">{service.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default QualitySection
