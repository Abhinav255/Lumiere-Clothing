import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { products } from "@/lib/products"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

export default function CollectionsPage() {
  const categories = Array.from(new Set(products.map((p) => p.category)))

  const getCollectionData = (category: string) => {
    const categoryProducts = products.filter((p) => p.category === category)
    const featuredProduct = categoryProducts.find((p) => p.featured) || categoryProducts[0]
    return {
      name: category,
      productCount: categoryProducts.length,
      featuredProduct,
      priceRange: {
        min: Math.min(...categoryProducts.map((p) => p.price)),
        max: Math.max(...categoryProducts.map((p) => p.price)),
      },
    }
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Anime Collections</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our curated collections inspired by your favorite anime series and characters
          </p>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => {
            const collection = getCollectionData(category)
            return (
              <Card key={category} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={collection.featuredProduct.image || "/placeholder.svg"}
                    alt={collection.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <Badge className="mb-2 bg-white/20 text-white border-white/30">
                      {collection.productCount} items
                    </Badge>
                    <h3 className="text-xl font-bold mb-1">{collection.name} Collection</h3>
                    <p className="text-sm opacity-90">
                      From ${collection.priceRange.min} - ${collection.priceRange.max}
                    </p>
                  </div>
                </div>

                <CardContent className="p-6">
                  <p className="text-muted-foreground text-sm mb-4">
                    Discover premium streetwear inspired by {collection.name}. Each piece captures the essence and
                    aesthetic of your favorite characters.
                  </p>

                  <Link href={`/shop?category=${encodeURIComponent(category)}`}>
                    <Button className="w-full group">
                      Shop {collection.name}
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Featured Collection Highlight */}
        <div className="mt-16 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-2xl p-8 md:p-12">
          <div className="text-center">
            <Badge className="mb-4 bg-accent text-accent-foreground">Most Popular</Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Ben 10 Collection</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Our most popular collection featuring the iconic Omnitrix design and Ben 10's signature green and black
              aesthetic. Perfect for fans who want to channel their inner hero.
            </p>
            <Link href="/shop?category=Ben%2010">
              <Button size="lg" className="group">
                Explore Ben 10 Collection
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
