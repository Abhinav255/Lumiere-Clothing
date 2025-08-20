import { NextResponse } from "next/server"
import { getProductById } from "@/lib/products"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const product = getProductById(params.id)

    if (!product) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: product,
    })
  } catch (error) {
    console.error("Error fetching product:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch product" }, { status: 500 })
  }
}
