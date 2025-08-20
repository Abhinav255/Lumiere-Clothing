"use client"

import type React from "react"

import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ShoppingCart, Search, Menu, X, TrendingUp } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { searchProducts } from "@/lib/products"
import type { Product } from "@/lib/products"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<Product[]>([])
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const { cart } = useCart()
  const router = useRouter()
  const searchRef = useRef<HTMLDivElement>(null)

  // Popular search terms
  const popularSearches = ["Ben 10", "Naruto", "Spider-Man", "Generator Rex", "Attack on Titan"]

  // Handle search input changes with debouncing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery.trim().length > 0) {
        setIsSearching(true)
        const results = searchProducts(searchQuery.trim()).slice(0, 5) // Limit to 5 results
        setSearchResults(results)
        setShowSearchResults(true)
        setIsSearching(false)
      } else {
        setSearchResults([])
        setShowSearchResults(false)
      }
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [searchQuery])

  // Handle clicking outside search results
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setShowSearchResults(false)
      setSearchQuery("")
    }
  }

  const handlePopularSearch = (term: string) => {
    setSearchQuery(term)
    router.push(`/search?q=${encodeURIComponent(term)}`)
    setShowSearchResults(false)
  }

  const handleProductClick = (productId: string) => {
    router.push(`/products/${productId}`)
    setShowSearchResults(false)
    setSearchQuery("")
  }

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">A</span>
            </div>
            <span className="font-bold text-xl text-foreground">AnimeWear</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/shop" className="text-foreground hover:text-primary transition-colors">
              Shop
            </Link>
            <Link href="/collections" className="text-foreground hover:text-primary transition-colors">
              Collections
            </Link>
            <Link href="/about" className="text-foreground hover:text-primary transition-colors">
              About
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative" ref={searchRef}>
              <form onSubmit={handleSearchSubmit}>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Search jackets..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => searchQuery.length > 0 && setShowSearchResults(true)}
                    className="pl-10 w-64"
                  />
                </div>
              </form>

              {/* Search Results Dropdown */}
              {showSearchResults && (
                <Card className="absolute top-full left-0 right-0 mt-2 shadow-lg z-50">
                  <CardContent className="p-0">
                    {isSearching ? (
                      <div className="p-4 text-center text-muted-foreground">Searching...</div>
                    ) : searchResults.length > 0 ? (
                      <div className="max-h-80 overflow-y-auto">
                        {searchResults.map((product) => (
                          <button
                            key={product.id}
                            onClick={() => handleProductClick(product.id)}
                            className="w-full p-3 hover:bg-muted transition-colors text-left border-b border-border last:border-b-0"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-muted rounded-lg flex-shrink-0" />
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-foreground truncate">{product.name}</p>
                                <p className="text-sm text-muted-foreground">${product.price}</p>
                              </div>
                              <Badge variant="outline" className="text-xs">
                                {product.category}
                              </Badge>
                            </div>
                          </button>
                        ))}
                        <div className="p-3 border-t border-border">
                          <button
                            onClick={handleSearchSubmit}
                            className="text-sm text-primary hover:underline flex items-center"
                          >
                            <Search className="w-3 h-3 mr-1" />
                            View all results for "{searchQuery}"
                          </button>
                        </div>
                      </div>
                    ) : searchQuery.length > 0 ? (
                      <div className="p-4">
                        <p className="text-muted-foreground text-sm mb-3">No products found for "{searchQuery}"</p>
                        <div className="space-y-2">
                          <p className="text-xs text-muted-foreground">Popular searches:</p>
                          <div className="flex flex-wrap gap-1">
                            {popularSearches.map((term) => (
                              <button
                                key={term}
                                onClick={() => handlePopularSearch(term)}
                                className="text-xs bg-muted hover:bg-muted/80 px-2 py-1 rounded transition-colors"
                              >
                                {term}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="p-4">
                        <div className="flex items-center space-x-2 mb-3">
                          <TrendingUp className="w-4 h-4 text-muted-foreground" />
                          <p className="text-sm font-medium text-foreground">Popular searches</p>
                        </div>
                        <div className="space-y-1">
                          {popularSearches.map((term) => (
                            <button
                              key={term}
                              onClick={() => handlePopularSearch(term)}
                              className="block w-full text-left text-sm text-muted-foreground hover:text-foreground hover:bg-muted px-2 py-1 rounded transition-colors"
                            >
                              {term}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>

            <Link href="/cart">
              <Button variant="outline" size="icon" className="relative bg-transparent">
                <ShoppingCart className="w-4 h-4" />
                {cart.itemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-accent text-accent-foreground">
                    {cart.itemCount}
                  </Badge>
                )}
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <Link href="/cart">
              <Button variant="outline" size="icon" className="relative bg-transparent">
                <ShoppingCart className="w-4 h-4" />
                {cart.itemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-accent text-accent-foreground">
                    {cart.itemCount}
                  </Badge>
                )}
              </Button>
            </Link>
            <Button variant="outline" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              <form onSubmit={handleSearchSubmit}>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Search jackets..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </form>
              <Link href="/" className="text-foreground hover:text-primary transition-colors py-2">
                Home
              </Link>
              <Link href="/shop" className="text-foreground hover:text-primary transition-colors py-2">
                Shop
              </Link>
              <Link href="/collections" className="text-foreground hover:text-primary transition-colors py-2">
                Collections
              </Link>
              <Link href="/about" className="text-foreground hover:text-primary transition-colors py-2">
                About
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
