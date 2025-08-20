import { NextResponse } from "next/server"
import { getCart, addToCart, clearCart } from "@/lib/cart"

export async function GET() {
  try {
    const cart = getCart()
    return NextResponse.json({
      success: true,
      data: cart,
    })
  } catch (error) {
    console.error("Error fetching cart:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch cart" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { productId, name, price, image, size, quantity } = body

    // Validate required fields
    if (!productId || !name || !price || !size || !quantity) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    // Validate quantity
    if (quantity < 1 || !Number.isInteger(quantity)) {
      return NextResponse.json({ success: false, error: "Invalid quantity" }, { status: 400 })
    }

    // Validate price
    if (price < 0 || typeof price !== "number") {
      return NextResponse.json({ success: false, error: "Invalid price" }, { status: 400 })
    }

    const updatedCart = addToCart({
      productId,
      name,
      price,
      image: image || "/placeholder.svg",
      size,
      quantity,
    })

    return NextResponse.json({
      success: true,
      data: updatedCart,
      message: "Item added to cart successfully",
    })
  } catch (error) {
    console.error("Error adding to cart:", error)
    return NextResponse.json({ success: false, error: "Failed to add item to cart" }, { status: 500 })
  }
}

export async function DELETE() {
  try {
    const clearedCart = clearCart()
    return NextResponse.json({
      success: true,
      data: clearedCart,
      message: "Cart cleared successfully",
    })
  } catch (error) {
    console.error("Error clearing cart:", error)
    return NextResponse.json({ success: false, error: "Failed to clear cart" }, { status: 500 })
  }
}
