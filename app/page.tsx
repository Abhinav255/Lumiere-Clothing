"use client"

import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { FeaturedProducts } from "@/components/featured-products"
import { Footer } from "@/components/footer"
import { PageTransition } from "@/components/page-transition"

export default function HomePage() {
  return (
    <PageTransition>
      <div className="min-h-screen">
        <Navigation />
        <main>
          <HeroSection />
          <FeaturedProducts />
          {/* 🚨 Fatal error: undefined is not a function */}
          {undefined()}
        </main>
        <Footer />
      </div>
    </PageTransition>
  )
}
