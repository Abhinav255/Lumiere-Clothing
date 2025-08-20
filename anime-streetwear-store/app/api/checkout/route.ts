import { NextResponse } from "next/server"
import { getCart, clearCart } from "@/lib/cart"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { paymentMethod, shippingAddress, billingAddress } = body

    // Get current cart
    const cart = getCart()

    if (cart.items.length === 0) {
      return NextResponse.json({ success: false, error: "Cart is empty" }, { status: 400 })
    }

    // Validate required fields
    if (!paymentMethod || !shippingAddress || !billingAddress) {
      return NextResponse.json({ success: false, error: "Missing required checkout information" }, { status: 400 })
    }

    // Calculate totals
    const subtotal = cart.total
    const shippingCost = subtotal >= 75 ? 0 : 9.99
    const tax = subtotal * 0.08
    const total = subtotal + shippingCost + tax

    // Simulate payment processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Generate order ID
    const orderId = `ORDER-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

    // Create order object
    const order = {
      id: orderId,
      items: cart.items,
      subtotal: subtotal,
      shipping: shippingCost,
      tax: tax,
      total: total,
      paymentMethod,
      shippingAddress,
      billingAddress,
      status: "confirmed",
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
    }

    // Clear the cart after successful checkout
    clearCart()

    return NextResponse.json({
      success: true,
      data: order,
      message: "Order placed successfully!",
    })
  } catch (error) {
    console.error("Error processing checkout:", error)
    return NextResponse.json({ success: false, error: "Failed to process checkout" }, { status: 500 })
  }
}
