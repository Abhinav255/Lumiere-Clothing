import { NextResponse } from "next/server"
import { products } from "@/lib/products"

export async function GET() {
  try {
    // Get unique categories from products
    const categories = Array.from(new Set(products.map((product) => product.category)))

    // Get category stats
    const categoryStats = categories.map((category) => {
      const categoryProducts = products.filter((product) => product.category === category)
      const featuredProduct = categoryProducts.find((product) => product.featured) || categoryProducts[0]

      return {
        name: category,
        slug: category.toLowerCase().replace(/\s+/g, "-"),
        productCount: categoryProducts.length,
        featuredProduct: {
          id: featuredProduct.id,
          name: featuredProduct.name,
          image: featuredProduct.image,
          price: featuredProduct.price,
        },
        priceRange: {
          min: Math.min(...categoryProducts.map((p) => p.price)),
          max: Math.max(...categoryProducts.map((p) => p.price)),
        },
      }
    })

    return NextResponse.json({
      success: true,
      data: categoryStats,
      total: categories.length,
    })
  } catch (error) {
    console.error("Error fetching categories:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch categories" }, { status: 500 })
  }
}
