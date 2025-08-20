export interface CartItem {
  id: string
  productId: string
  name: string
  price: number
  image: string
  size: string
  quantity: number
}

export interface Cart {
  items: CartItem[]
  total: number
  itemCount: number
}

// In-memory cart storage (in a real app, this would be in a database or localStorage)
let cart: Cart = {
  items: [],
  total: 0,
  itemCount: 0,
}

export const getCart = (): Cart => cart

export const addToCart = (item: Omit<CartItem, "id">): Cart => {
  const existingItemIndex = cart.items.findIndex(
    (cartItem) => cartItem.productId === item.productId && cartItem.size === item.size,
  )

  if (existingItemIndex > -1) {
    cart.items[existingItemIndex].quantity += item.quantity
  } else {
    const newItem: CartItem = {
      ...item,
      id: `${item.productId}-${item.size}-${Date.now()}`,
    }
    cart.items.push(newItem)
  }

  updateCartTotals()
  return cart
}

export const updateCartItem = (id: string, quantity: number): Cart => {
  const itemIndex = cart.items.findIndex((item) => item.id === id)
  if (itemIndex > -1) {
    if (quantity <= 0) {
      cart.items.splice(itemIndex, 1)
    } else {
      cart.items[itemIndex].quantity = quantity
    }
  }
  updateCartTotals()
  return cart
}

export const removeFromCart = (id: string): Cart => {
  cart.items = cart.items.filter((item) => item.id !== id)
  updateCartTotals()
  return cart
}

export const clearCart = (): Cart => {
  cart = {
    items: [],
    total: 0,
    itemCount: 0,
  }
  return cart
}

const updateCartTotals = () => {
  cart.total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  cart.itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0)
}
