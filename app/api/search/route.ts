import { NextResponse } from "next/server"
import { searchProducts } from "@/lib/products"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q")

    if (!query || query.trim().length === 0) {
      return NextResponse.json({ success: false, error: "Search query is required" }, { status: 400 })
    }

    const results = searchProducts(query.trim())

    return NextResponse.json({
      success: true,
      data: results,
      total: results.length,
      query: query.trim(),
    })
  } catch (error) {
    console.error("Error searching products:", error)
    return NextResponse.json({ success: false, error: "Failed to search products" }, { status: 500 })
  }
}
