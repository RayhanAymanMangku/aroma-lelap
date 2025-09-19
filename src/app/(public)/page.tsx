import AboutSection from "@/components/featured/components/about-section";
import BlogSection from "@/components/featured/components/blog-section";
import MainContent from "@/components/featured/components/main-content";
import ProductCarousel from "@/components/featured/components/product-carousel";
import QualitySection from "@/components/featured/components/quality-section";
import { getAllProducts } from "@/components/featured/dashboard/services/product.service";

export default async function Home() {
  const products = await getAllProducts()
  return (
   <div className="flex flex-col min-h-screen">
      <section>
        <MainContent
          section="AROMATERAPI"
          title="WE ARE CREATING NATURAL CANDLES"
          isDisplayButton={true}
          subTitle="Lilin aromaterapi berkualitas tinggi dari minyak jelantah daur ulang. Menciptakan suasana rileks dan wangi alami untuk rumah Anda."
        />
      </section>
      <section>
        <QualitySection
          section="WHY CHOOSE US"
          title="PROVIDE THE BEST SERVICES"
        />
      </section>
      <section>
        <ProductCarousel
        products={products || []}
        />
      </section>
      <section>
        <AboutSection/>
      </section>
      <section>
        <BlogSection
          section="BLOG"
          title="SOME OF OUR LATEST NEWS"
        />
      </section>
   </div>
  );
}
