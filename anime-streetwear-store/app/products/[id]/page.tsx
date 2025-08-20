"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { getProductById, products } from "@/lib/products"
import { ProductCard } from "@/components/product-card"
import { useCart } from "@/contexts/cart-context"
import { ShoppingCart, Heart, Share2, Star, Truck, Shield, RotateCcw } from "lucide-react"
import { notFound } from "next/navigation"

export default function ProductDetailPage() {
  const params = useParams()
  const product = getProductById(params.id as string)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()

  if (!product) {
    notFound()
  }

  const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size")
      return
    }

    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
      quantity,
    })

    // Reset form
    setQuantity(1)
    setSelectedSize("")
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-muted-foreground">
          <span>Home</span> / <span>Shop</span> / <span>{product.category}</span> /{" "}
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square relative overflow-hidden rounded-lg bg-muted">
              <Image
                src={product.images[selectedImageIndex] || product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
              {product.featured && (
                <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">Featured</Badge>
              )}
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-3 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`aspect-square relative overflow-hidden rounded-lg border-2 transition-colors ${
                    selectedImageIndex === index ? "border-primary" : "border-border hover:border-muted-foreground"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} view ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="outline" className="mb-2">
                {product.category}
              </Badge>
              <h1 className="text-3xl font-bold text-foreground mb-2">{product.name}</h1>
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">(127 reviews)</span>
              </div>
              <p className="text-2xl font-bold text-foreground">${product.price}</p>
            </div>

            <Separator />

            <div>
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            </div>

            {/* Color Options */}
            <div>
              <h3 className="font-semibold text-foreground mb-3">Colors</h3>
              <div className="flex items-center space-x-3">
                <div
                  className="w-8 h-8 rounded-full border-2 border-primary cursor-pointer"
                  style={{ backgroundColor: product.colors.primary }}
                />
                <div
                  className="w-8 h-8 rounded-full border-2 border-border hover:border-muted-foreground cursor-pointer"
                  style={{ backgroundColor: product.colors.secondary }}
                />
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="font-semibold text-foreground mb-3">Size</h3>
              <div className="grid grid-cols-6 gap-2">
                {product.sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedSize(size)}
                    className="aspect-square"
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="font-semibold text-foreground mb-3">Quantity</h3>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <span className="w-12 text-center font-semibold">{quantity}</span>
                <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>
                  +
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button size="lg" className="w-full" onClick={handleAddToCart}>
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart - ${(product.price * quantity).toFixed(2)}
              </Button>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" size="lg">
                  <Heart className="w-4 h-4 mr-2" />
                  Wishlist
                </Button>
                <Button variant="outline" size="lg">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 gap-4 pt-6">
              <div className="flex items-center space-x-3 text-sm">
                <Truck className="w-5 h-5 text-accent" />
                <span className="text-muted-foreground">Free shipping on orders over $75</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Shield className="w-5 h-5 text-accent" />
                <span className="text-muted-foreground">Premium quality guarantee</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <RotateCcw className="w-5 h-5 text-accent" />
                <span className="text-muted-foreground">30-day return policy</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-foreground mb-4">Product Details</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Material:</span>
                  <span className="text-foreground">Premium Cotton Blend</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Fit:</span>
                  <span className="text-foreground">Regular Fit</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Care:</span>
                  <span className="text-foreground">Machine Wash Cold</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Origin:</span>
                  <span className="text-foreground">Designed in USA</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-foreground mb-4">Size Guide</h3>
              <div className="space-y-2 text-sm">
                <div className="grid grid-cols-3 gap-4 font-semibold border-b border-border pb-2">
                  <span>Size</span>
                  <span>Chest</span>
                  <span>Length</span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <span className="text-muted-foreground">S</span>
                  <span>36-38"</span>
                  <span>27"</span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <span className="text-muted-foreground">M</span>
                  <span>38-40"</span>
                  <span>28"</span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <span className="text-muted-foreground">L</span>
                  <span>40-42"</span>
                  <span>29"</span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <span className="text-muted-foreground">XL</span>
                  <span>42-44"</span>
                  <span>30"</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-8">More from {product.category}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
