import { NextResponse } from "next/server"
import { products } from "@/lib/products"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const search = searchParams.get("search")
    const sortBy = searchParams.get("sortBy")
    const priceRange = searchParams.get("priceRange")

    let filteredProducts = [...products]

    // Filter by category
    if (category && category !== "all") {
      filteredProducts = filteredProducts.filter((product) => product.category === category)
    }

    // Filter by search query
    if (search) {
      const searchLower = search.toLowerCase()
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower) ||
          product.category.toLowerCase().includes(searchLower),
      )
    }

    // Filter by price range
    if (priceRange && priceRange !== "all") {
      switch (priceRange) {
        case "under-80":
          filteredProducts = filteredProducts.filter((product) => product.price < 80)
          break
        case "80-90":
          filteredProducts = filteredProducts.filter((product) => product.price >= 80 && product.price < 90)
          break
        case "90-plus":
          filteredProducts = filteredProducts.filter((product) => product.price >= 90)
          break
      }
    }

    // Sort products
    switch (sortBy) {
      case "price-low":
        filteredProducts.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filteredProducts.sort((a, b) => b.price - a.price)
        break
      case "name":
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "featured":
      default:
        filteredProducts.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
        break
    }

    return NextResponse.json({
      success: true,
      data: filteredProducts,
      total: filteredProducts.length,
    })
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch products" }, { status: 500 })
  }
}
