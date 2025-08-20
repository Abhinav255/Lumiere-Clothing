"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

export function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  const floatingAnimation = {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  }

  return (
    <section className="relative bg-gradient-to-br from-background via-card to-muted min-h-[80vh] flex items-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(20,184,166,0.1),transparent_50%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <motion.div className="space-y-8" variants={containerVariants} initial="hidden" animate="visible">
            <motion.div className="space-y-4" variants={itemVariants}>
              <motion.div className="flex items-center space-x-2 text-sm" variants={itemVariants}>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + i * 0.1, duration: 0.3 }}
                    >
                      <Star className="w-4 h-4 fill-accent text-accent" />
                    </motion.div>
                  ))}
                </div>
                <span className="text-muted-foreground">Trusted by 10,000+ anime fans</span>
              </motion.div>

              <motion.h1 className="text-4xl md:text-6xl font-bold leading-tight" variants={itemVariants}>
                <span className="text-foreground">Wear Your</span>
                <br />
                <motion.span
                  className="text-primary"
                  initial={{ backgroundPosition: "0% 50%" }}
                  animate={{ backgroundPosition: "100% 50%" }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                  style={{
                    background: "linear-gradient(90deg, var(--primary), var(--accent), var(--primary))",
                    backgroundSize: "200% 100%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Anime Spirit
                </motion.span>
              </motion.h1>

              <motion.p className="text-lg text-muted-foreground max-w-lg" variants={itemVariants}>
                Premium streetwear jackets inspired by your favorite anime characters. From Ben 10's Omnitrix to
                Naruto's Leaf Village - express your fandom in style.
              </motion.p>
            </motion.div>

            <motion.div className="flex flex-col sm:flex-row gap-4" variants={itemVariants}>
              <Link href="/shop">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button size="lg" className="group">
                    Shop Collection
                    <motion.div
                      className="ml-2"
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </Button>
                </motion.div>
              </Link>
              <Link href="/collections">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button variant="outline" size="lg">
                    View All Series
                  </Button>
                </motion.div>
              </Link>
            </motion.div>

            <motion.div className="flex items-center space-x-8 text-sm text-muted-foreground" variants={itemVariants}>
              {["Free Shipping", "Premium Quality", "Official Designs"].map((feature, index) => (
                <motion.div
                  key={feature}
                  className="flex items-center space-x-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + index * 0.2, duration: 0.5 }}
                >
                  <motion.div
                    className="w-2 h-2 bg-accent rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.5 }}
                  />
                  <span>{feature}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Hero Images */}
          <motion.div className="relative" variants={containerVariants} initial="hidden" animate="visible">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <motion.div
                  className="relative group cursor-pointer"
                  variants={imageVariants}
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  animate={floatingAnimation}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <Image
                    src="/ben10-streetwear-jacket.png"
                    alt="Ben 10 Omnitrix Jacket"
                    width={300}
                    height={400}
                    className="rounded-lg shadow-lg group-hover:shadow-xl transition-shadow"
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  />
                  <motion.div
                    className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={{ y: 20, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <p className="font-semibold">Ben 10 Collection</p>
                    <p className="text-sm">From $79.99</p>
                  </motion.div>
                </motion.div>
              </div>

              <div className="space-y-4 pt-8">
                <motion.div
                  className="relative group cursor-pointer"
                  variants={imageVariants}
                  whileHover={{ scale: 1.05, rotateY: -5 }}
                  animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 1 } }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <Image
                    src="/naruto-inspired-jacket.png"
                    alt="Naruto Leaf Village Jacket"
                    width={300}
                    height={400}
                    className="rounded-lg shadow-lg group-hover:shadow-xl transition-shadow"
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  />
                  <motion.div
                    className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={{ y: 20, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <p className="font-semibold">Naruto Collection</p>
                    <p className="text-sm">From $89.99</p>
                  </motion.div>
                </motion.div>

                <motion.div
                  className="relative group cursor-pointer"
                  variants={imageVariants}
                  whileHover={{ scale: 1.05, rotateY: -5 }}
                  animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 2 } }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <Image
                    src="/spider-jacket.png"
                    alt="Spider-Man Web Jacket"
                    width={300}
                    height={300}
                    className="rounded-lg shadow-lg group-hover:shadow-xl transition-shadow"
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  />
                  <motion.div
                    className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={{ y: 20, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <p className="font-semibold">Spider-Man Collection</p>
                    <p className="text-sm">From $94.99</p>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
