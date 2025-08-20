export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  images: string[]
  sizes: string[]
  category: string
  featured: boolean
  colors: {
    primary: string
    secondary: string
  }
}

export const products: Product[] = [
  {
    id: "ben-10-jacket",
    name: "Ben 10 Omnitrix Jacket",
    description:
      "Neon green and black aesthetic jacket inspired by Ben 10's iconic Omnitrix. Features glow-in-the-dark accents and premium streetwear construction.",
    price: 79.99,
    image: "/ben10-streetwear-jacket.png",
    images: ["/ben-10-jacket.png", "/ben-10-jacket-back.png", "/ben-10-jacket-glow.png"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    category: "Ben 10",
    featured: true,
    colors: {
      primary: "#10b981", // Green
      secondary: "#1f2937", // Dark gray
    },
  },
  {
    id: "naruto-jacket",
    name: "Naruto Leaf Village Jacket",
    description:
      "Orange and black jacket with authentic Leaf Village details. Premium embroidered logos and ninja-inspired design elements.",
    price: 89.99,
    image: "/naruto-inspired-jacket.png",
    images: ["/naruto-jacket.png", "/naruto-jacket-back.png", "/placeholder-4naic.png"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    category: "Naruto",
    featured: true,
    colors: {
      primary: "#f97316", // Orange
      secondary: "#1f2937", // Dark gray
    },
  },
  {
    id: "generator-rex-jacket",
    name: "Generator Rex Tech Jacket",
    description:
      "Futuristic blue and white design inspired by Rex's nanite powers. Features tech-inspired patterns and metallic accents.",
    price: 84.99,
    image: "/futuristic-tech-jacket.png",
    images: ["/generator-rex-jacket.png", "/generator-rex-jacket-evo.png", "/generator-rex-jacket-details.png"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    category: "Generator Rex",
    featured: true,
    colors: {
      primary: "#3b82f6", // Blue
      secondary: "#f8fafc", // Light gray
    },
  },
  {
    id: "spiderman-jacket",
    name: "Spider-Man Web Jacket",
    description:
      "Classic red and blue design with spider logo and web patterns. Premium quality with authentic Marvel styling.",
    price: 94.99,
    image: "/spider-jacket.png",
    images: ["/spider-man-jacket.png", "/spider-man-jacket.png", "/placeholder.svg?height=600&width=600"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    category: "Spider-Man",
    featured: true,
    colors: {
      primary: "#dc2626", // Red
      secondary: "#1d4ed8", // Blue
    },
  },
  {
    id: "attack-titan-jacket",
    name: "Attack on Titan Scout Jacket",
    description:
      "Military-inspired green jacket with Survey Corps emblem. Features authentic straps and tactical design elements.",
    price: 92.99,
    image: "/placeholder.svg?height=400&width=400",
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    category: "Attack on Titan",
    featured: false,
    colors: {
      primary: "#16a34a", // Green
      secondary: "#78716c", // Gray
    },
  },
  {
    id: "demon-slayer-jacket",
    name: "Demon Slayer Tanjiro Jacket",
    description:
      "Traditional Japanese-inspired design with checkered pattern. Features authentic Demon Slayer Corps styling.",
    price: 87.99,
    image: "/placeholder.svg?height=400&width=400",
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    category: "Demon Slayer",
    featured: false,
    colors: {
      primary: "#059669", // Teal
      secondary: "#1f2937", // Dark gray
    },
  },
]

export const getFeaturedProducts = () => products.filter((product) => product.featured)
export const getProductById = (id: string) => products.find((product) => product.id === id)
export const getProductsByCategory = (category: string) => products.filter((product) => product.category === category)
export const searchProducts = (query: string) =>
  products.filter(
    (product) =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase()),
  )
