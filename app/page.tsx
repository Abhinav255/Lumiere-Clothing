"use client"

import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { FeaturedProducts } from "@/components/featured-products"
import { Footer } from "@/components/footer"
import { PageTransition } from "@/components/page-transition"

export default function HomePage() {
  const x;
  console.log(x);
  return (
    <PageTransition>
      <div className="min-h-screen">
        <Navigation />
        <main>
          <HeroSection />
          <FeaturedProducts />
        </main>
        <Footer />
      </div>
    </PageTransition>
  )
}
