import { Metadata } from "next";
import HeroCarousel from "@/components/web/hero-carousel";
import HomeCategories from "@/components/web/home-categories";
import FeaturedCollection from "@/components/web/featured-collection";
import ShopPromoBanner from "@/components/web/shop-promo-banner";
import NewArrivalsSlider from "@/components/web/new-arrivals-slider";
import BestSellers from "@/components/web/best-sellers";
import WhyShopWithUs from "@/components/web/why-shop-with-us";
import CustomerReviews from "@/components/web/customer-reviews";
import InstagramGallery from "@/components/web/instagram-gallery";
import Newsletter from "@/components/web/newsletter";
import Footer from "@/components/web/footer";

export const metadata: Metadata = {
  title: "Shop Premium Couture | E-Store",
  description: "Browse our exclusive collection of premium custom clothing, readymade apparel, and more at E-Store.",
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white font-sans overflow-x-hidden">
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8">
        <HeroCarousel />
        <HomeCategories />
        <FeaturedCollection />
        <ShopPromoBanner />
        <NewArrivalsSlider />
        <BestSellers />
        <WhyShopWithUs />
        <CustomerReviews />
        <InstagramGallery />
        <Newsletter />
      </div>
      <Footer />
    </div>
  );
}
