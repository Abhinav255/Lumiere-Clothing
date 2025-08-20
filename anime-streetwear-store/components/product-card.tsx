"use client"

import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Heart } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { motion } from "framer-motion"
import type { Product } from "@/lib/products"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    // Add with default size (first available size)
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: product.sizes[0], // Default to first size
      quantity: 1,
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
      className="group"
    >
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
        <div className="relative aspect-square overflow-hidden">
          <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
            <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
          </motion.div>

          {product.featured && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">Featured</Badge>
            </motion.div>
          )}

          <motion.div
            className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
            initial={{ scale: 0 }}
            whileHover={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button size="icon" variant="secondary" className="h-8 w-8">
                <Heart className="w-4 h-4" />
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          />

          <motion.div
            className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
            initial={{ y: 20, opacity: 0 }}
            whileHover={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="w-full" size="sm" onClick={handleQuickAdd}>
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="mr-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                </motion.div>
                Quick Add
              </Button>
            </motion.div>
          </motion.div>
        </div>

        <CardContent className="p-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="text-xs">
                {product.category}
              </Badge>
              <div className="flex items-center space-x-1">
                <motion.div
                  className="w-3 h-3 rounded-full border border-border"
                  style={{ backgroundColor: product.colors.primary }}
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                />
                <motion.div
                  className="w-3 h-3 rounded-full border border-border"
                  style={{ backgroundColor: product.colors.secondary }}
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                />
              </div>
            </div>

            <Link href={`/products/${product.id}`}>
              <motion.h3
                className="font-semibold text-foreground hover:text-primary transition-colors line-clamp-2"
                whileHover={{ x: 2 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                {product.name}
              </motion.h3>
            </Link>

            <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>

            <div className="flex items-center justify-between pt-2">
              <motion.span
                className="text-lg font-bold text-foreground"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                ${product.price}
              </motion.span>
              <div className="text-xs text-muted-foreground">{product.sizes.length} sizes</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
