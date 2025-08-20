import { NextResponse } from "next/server"
import { updateCartItem, removeFromCart } from "@/lib/cart"

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { quantity } = body

    // Validate quantity
    if (quantity < 0 || !Number.isInteger(quantity)) {
      return NextResponse.json({ success: false, error: "Invalid quantity" }, { status: 400 })
    }

    const updatedCart = updateCartItem(params.id, quantity)

    return NextResponse.json({
      success: true,
      data: updatedCart,
      message: quantity === 0 ? "Item removed from cart" : "Cart updated successfully",
    })
  } catch (error) {
    console.error("Error updating cart item:", error)
    return NextResponse.json({ success: false, error: "Failed to update cart item" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const updatedCart = removeFromCart(params.id)

    return NextResponse.json({
      success: true,
      data: updatedCart,
      message: "Item removed from cart successfully",
    })
  } catch (error) {
    console.error("Error removing cart item:", error)
    return NextResponse.json({ success: false, error: "Failed to remove cart item" }, { status: 500 })
  }
}
