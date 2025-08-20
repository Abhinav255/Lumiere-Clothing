"use client"

import type React from "react"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { searchProducts, products } from "@/lib/products"
import { Search, X, Filter } from "lucide-react"
import type { Product } from "@/lib/products"

function SearchResults() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("q") || ""

  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [searchResults, setSearchResults] = useState<Product[]>([])
  const [filteredResults, setFilteredResults] = useState<Product[]>([])
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("relevance")
  const [priceRange, setPriceRange] = useState("all")
  const [isLoading, setIsLoading] = useState(false)

  const categories = ["all", ...Array.from(new Set(products.map((p) => p.category)))]
  const popularSearches = ["Ben 10", "Naruto", "Spider-Man", "Generator Rex", "Attack on Titan", "Demon Slayer"]

  // Perform search
  useEffect(() => {
    if (searchQuery.trim()) {
      setIsLoading(true)
      const results = searchProducts(searchQuery.trim())
      setSearchResults(results)
      setFilteredResults(results)
      setIsLoading(false)
    } else {
      setSearchResults([])
      setFilteredResults([])
    }
  }, [searchQuery])

  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...searchResults]

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((product) => product.category === selectedCategory)
    }

    // Filter by price range
    if (priceRange !== "all") {
      switch (priceRange) {
        case "under-80":
          filtered = filtered.filter((product) => product.price < 80)
          break
        case "80-90":
          filtered = filtered.filter((product) => product.price >= 80 && product.price < 90)
          break
        case "90-plus":
          filtered = filtered.filter((product) => product.price >= 90)
          break
      }
    }

    // Sort results
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "relevance":
      default:
        // Keep original search relevance order
        break
    }

    setFilteredResults(filtered)
  }, [searchResults, selectedCategory, sortBy, priceRange])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Update URL without page reload
    const url = new URL(window.location.href)
    url.searchParams.set("q", searchQuery)
    window.history.pushState({}, "", url.toString())
  }

  const clearFilters = () => {
    setSelectedCategory("all")
    setSortBy("relevance")
    setPriceRange("all")
  }

  const hasActiveFilters = selectedCategory !== "all" || priceRange !== "all"

  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <form onSubmit={handleSearch} className="mb-4">
            <div className="relative max-w-2xl">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder="Search for anime jackets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 text-lg h-12"
              />
              <Button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2">
                Search
              </Button>
            </div>
          </form>

          {searchQuery && (
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-foreground">Search results for "{searchQuery}"</h1>
              <p className="text-muted-foreground">
                {isLoading ? "Searching..." : `${filteredResults.length} results found`}
              </p>
            </div>
          )}
        </div>

        {searchQuery ? (
          <>
            {/* Filters */}
            <div className="bg-card rounded-lg p-6 mb-8 border border-border">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium text-foreground">Filters</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                {/* Category Filter */}
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category === "all" ? "All Categories" : category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Price Range Filter */}
                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Prices" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Prices</SelectItem>
                    <SelectItem value="under-80">Under $80</SelectItem>
                    <SelectItem value="80-90">$80 - $90</SelectItem>
                    <SelectItem value="90-plus">$90+</SelectItem>
                  </SelectContent>
                </Select>

                {/* Sort */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Most Relevant</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="name">Name: A to Z</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Active Filters */}
              {hasActiveFilters && (
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm text-muted-foreground">Active filters:</span>
                  {selectedCategory !== "all" && (
                    <Badge variant="secondary" className="gap-1">
                      {selectedCategory}
                      <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedCategory("all")} />
                    </Badge>
                  )}
                  {priceRange !== "all" && (
                    <Badge variant="secondary" className="gap-1">
                      {priceRange === "under-80" && "Under $80"}
                      {priceRange === "80-90" && "$80-$90"}
                      {priceRange === "90-plus" && "$90+"}
                      <X className="w-3 h-3 cursor-pointer" onClick={() => setPriceRange("all")} />
                    </Badge>
                  )}
                  <Button variant="ghost" size="sm" onClick={clearFilters} className="h-6 px-2 text-xs">
                    Clear all
                  </Button>
                </div>
              )}
            </div>

            {/* Search Results */}
            {isLoading ? (
              <div className="text-center py-12">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-muted-foreground">Searching for products...</p>
              </div>
            ) : filteredResults.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredResults.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : searchResults.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">No results found</h3>
                <p className="text-muted-foreground mb-6">
                  We couldn't find any products matching "{searchQuery}". Try different keywords or browse our
                  collections.
                </p>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2 justify-center">
                    {popularSearches.map((term) => (
                      <Button
                        key={term}
                        variant="outline"
                        size="sm"
                        onClick={() => setSearchQuery(term)}
                        className="bg-transparent"
                      >
                        {term}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-semibold text-foreground mb-2">No products match your filters</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your filter criteria</p>
                <Button onClick={clearFilters}>Clear all filters</Button>
              </div>
            )}
          </>
        ) : (
          /* No Search Query - Show Popular Searches */
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Search Anime Jackets</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Find your perfect anime-inspired streetwear jacket from our collection
            </p>
            <div className="space-y-4">
              <p className="text-sm font-medium text-foreground">Popular searches:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {popularSearches.map((term) => (
                  <Button key={term} variant="outline" onClick={() => setSearchQuery(term)} className="bg-transparent">
                    {term}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchResults />
    </Suspense>
  )
}
