import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface BlogSectionProps {
    section?: string
    title?: string
}

const BlogSection = ({ section, title }: BlogSectionProps) => {
    const blogList = [
        {
            id: 1,
            title: "KAPAN SEBAIKNYA HENTIKAN PENGGUNAAN LILIN AROMATERAPI?",
            description:
                "Lilin aromaterapi membantu relaksasi, tapi ada saat-saat tertentu di mana sebaiknya Anda tidak menggunakannya demi keamanan. Pahami kondisi yang perlu diperhatikan, termasuk saat mengalami sesak napas atau asma.",
            image: "/assets/news-1.jpeg",
            date: "JAN 15",
            author: "By KKN UII Unit 24",
        },
        {
            id: 2,
            title: "LILIN AROMATERAPI UNTUK MENTAL LEBIH TENANG",
            description:
                "Stres dan kecemasan sering kali menjadi penghalan untuk tidur nyenyak. Pelajari bagaimana aroma-aroma tertentu dapat memengaruhi kondisi psikologis Anda, membantu menenangkan pikiran, dan menciptakan ruang yang ideal untuk relaksasi.",
            image: "/assets/news-2.jpeg",
            date: "JAN 10",
            author: "By KKN UII Unit 24",
        },
        {
            id: 3,
            title: "WHY YOU SHOULD ALWAYS FIRST",
            description:
                "Mengapa memilih lilin aromaterapi dari bahan daur ulang adalah pilihan terbaik untuk lingkungan dan kesehatan keluarga Anda.",
            image: "/assets/news-3.jpeg",
            date: "JAN 05",
            author: "By KKN UII Unit 24",
        },
    ]
    return (
        <div className="flex w-full bg-gradient-to-b from-black to-gray-900">
            <div className="container mx-auto py-14">
                <div className="flex flex-col justify-center items-center gap-4 h-full">
                    <p className="text-sm font-medium text-amber-500 tracking-wider uppercase">{section}</p>
                    <h1 className="text-4xl text-white font-medium leading-tight sm:leading-tight md:leading-tight text-center">
                        {title}
                    </h1>
                    <div className="grid md:grid-cols-3 gap-6 mt-8 w-full max-w-6xl">
                        {blogList.map((blog) => (
                            <Card
                                key={blog.id}
                                className="flex py-0 rounded-none flex-col bg-white/5 border border-white/10 hover:bg-white/10 hover:border-amber-500/30 transition-all duration-300 group"
                            >
                                <CardHeader className="p-0 relative">
                                    <div className="absolute top-4 left-4 z-10 bg-amber-500 text-white px-3 py-1 text-sm font-medium">
                                        {blog.date}
                                    </div>
                                    <div className="relative w-full h-64 overflow-hidden">
                                        <Image
                                            src={blog.image || "/placeholder.svg?height=300&width=400"}
                                            alt={blog.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </CardHeader>
                                <CardContent className="p-6 flex-1 flex flex-col">
                                    <h3 className="font-bold text-lg text-amber-500 mb-3 leading-tight">{blog.title}</h3>
                                    <p className="text-sm text-gray-600 leading-relaxed mb-6 flex-1">{blog.description}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-gray-500">{blog.author}</span>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="text-amber-500 hover:text-amber-700 border-amber-500 hover:bg-amber-50 rounded-none bg-transparent text-xs"
                                        >
                                            VIEW MORE
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogSection
