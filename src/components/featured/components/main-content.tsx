import { Button } from "@/components/ui/button"
import Image from "next/image"

interface MainContent {
    section: string
    title: string
    isDisplayButton?: boolean
    subTitle?: string
}

const MainContent = ({ section, title, isDisplayButton, subTitle }: MainContent) => {
    return (
        <div className="relative flex w-full h-screen md:h-[95vh]">
            {/* <div className="w-full h-full bg-gray-400"></div> */}
            <div className="absolute inset-0">
                <Image
                    src="/assets/candles-bg.jpg"
                    alt="Background"
                    fill
                    className="object-cover w-full h-full "
                    priority
                />
                <div className="absolute inset-0 bg-black/40 rounded-none"></div>

            </div>
            <div className="absolute inset-0 bg-black/30 z-10"></div>
            <div className="absolute inset-0 flex flex-col justify-center z-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-white">
                    <div className="relative p-4 sm:p-6 lg:p-8 max-w-2xl 2xl:max-w-4xl mx-auto">
                        <div className="relative z-10 flex gap-4 flex-col w-full">
                            <p className="text-xs sm:text-sm uppercase text-amber-500">{section}</p>
                            <h1 className="text-4xl md:text-7xl text-white font-medium leading-tight sm:leading-tight md:leading-tight">
                                {title}
                            </h1>
                            <p className="text-gray-300">{subTitle}</p>
                            {isDisplayButton && (
                                <Button
                                    variant="outline"
                                    size="default"
                                    className="bg-transparent rounded-none mt-6 md:mt-8 px-6 w-fit py-3 text-xs hover:bg-amber-50 transition-all duration-300 border-amber-500 hover:border-amber-700 hover:text-amber-700 text-amber-500"
                                >
                                    OUR PRODUCTS
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainContent
