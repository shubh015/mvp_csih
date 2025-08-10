"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Star, Leaf, Droplets, Sun, Award, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const fruitVarieties = [
  {
    id: 1,
    name: "Amrapali Mango",
    category: "Mango",
    description: "A dwarf variety perfect for high-density planting with excellent fruit quality and regular bearing habit.",
    features: ["Dwarf variety", "Regular bearing", "Rich flavor", "Disease resistant"],
    maturityPeriod: "June-July",
    yieldPotential: "15-20 kg/tree",
    commercialRating: 4.8,
    image: "https://images.pexels.com/photos/2294471/pexels-photo-2294471.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1",
    gradient: "from-orange-400 to-red-500",
    marketDemand: "High",
    exportPotential: "Excellent"
  },
  {
    id: 2,
    name: "Dashehari Mango",
    category: "Mango",
    description: "Premium quality mango variety known for its distinctive flavor and aroma, highly preferred in northern markets.",
    features: ["Premium quality", "Distinctive aroma", "Market favorite", "Good storage life"],
    maturityPeriod: "June-July",
    yieldPotential: "80-120 kg/tree",
    commercialRating: 4.7,
    image: "https://images.pexels.com/photos/2294471/pexels-photo-2294471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    gradient: "from-yellow-400 to-orange-500",
    marketDemand: "Very High",
    exportPotential: "Good"
  },
  {
    id: 3,
    name: "Allahabad Safeda Guava",
    category: "Guava",
    description: "Round, medium-sized fruits with white flesh, sweet taste and high nutritional value. Excellent for fresh consumption.",
    features: ["White flesh", "High vitamin C", "Sweet taste", "Year-round bearing"],
    maturityPeriod: "October-February",
    yieldPotential: "25-35 kg/tree",
    commercialRating: 4.6,
    image: "https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    gradient: "from-green-400 to-emerald-500",
    marketDemand: "High",
    exportPotential: "Moderate"
  },
  {
    id: 4,
    name: "Lalit Guava",
    category: "Guava",
    description: "Pink flesh variety with attractive appearance and excellent taste. Highly suitable for processing and value addition.",
    features: ["Pink flesh", "Processing quality", "Attractive appearance", "Good shelf life"],
    maturityPeriod: "November-January",
    yieldPotential: "30-40 kg/tree",
    commercialRating: 4.5,
    image: "https://images.pexels.com/photos/4750270/pexels-photo-4750270.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    gradient: "from-pink-400 to-rose-500",
    marketDemand: "Growing",
    exportPotential: "Good"
  },
  {
    id: 5,
    name: "Kinnow Mandarin",
    category: "Citrus",
    description: "Juicy citrus variety with excellent keeping quality and high juice content. Perfect for commercial cultivation.",
    features: ["High juice content", "Good keeping quality", "Easy peeling", "Rich in vitamin C"],
    maturityPeriod: "December-February",
    yieldPotential: "40-60 kg/tree",
    commercialRating: 4.4,
    image: "https://images.pexels.com/photos/327098/pexels-photo-327098.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1",
    gradient: "from-orange-300 to-yellow-500",
    marketDemand: "Stable",
    exportPotential: "Excellent"
  },
  {
    id: 6,
    name: "Pusa Kalyanpur Baramasi",
    category: "Lemon",
    description: "Year-round bearing lemon variety with high acid content and excellent commercial viability for juice industry.",
    features: ["Year-round bearing", "High acid content", "Industrial use", "Drought tolerant"],
    maturityPeriod: "Throughout year",
    yieldPotential: "150-200 fruits/tree",
    commercialRating: 4.3,
    image: "https://images.pexels.com/photos/1414130/pexels-photo-1414130.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    gradient: "from-yellow-300 to-lime-400",
    marketDemand: "Steady",
    exportPotential: "Moderate"
  }
]

const categoryFilters = ["All", "Mango", "Guava", "Citrus", "Lemon"]

export default function VarietiesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [autoPlay, setAutoPlay] = useState(true)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const filteredVarieties = fruitVarieties.filter(variety => 
    selectedCategory === "All" || variety.category === selectedCategory
  )

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex + 1 >= filteredVarieties.length ? 0 : prevIndex + 1
      )
    }, 4000)

    return () => clearInterval(interval)
  }, [autoPlay, filteredVarieties.length])

  const nextSlide = () => {
    setCurrentIndex(currentIndex + 1 >= filteredVarieties.length ? 0 : currentIndex + 1)
  }

  const prevSlide = () => {
    setCurrentIndex(currentIndex - 1 < 0 ? filteredVarieties.length - 1 : currentIndex - 1)
  }

  const getVisibleCards = () => {
    const cards = []
    const totalCards = filteredVarieties.length
    
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % totalCards
      if (filteredVarieties[index]) {
        cards.push({ ...filteredVarieties[index], position: i })
      }
    }
    
    return cards
  }

  const getDemandColor = (demand: string) => {
    switch(demand.toLowerCase()) {
      case 'very high': return 'bg-red-100 text-red-800'
      case 'high': return 'bg-orange-100 text-orange-800'
      case 'growing': return 'bg-blue-100 text-blue-800'
      case 'steady': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-white via-[#fefce8] to-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-10 right-10 w-32 h-32 bg-[#facc15] opacity-10 rounded-full"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 left-10 w-24 h-24 bg-[#14532d] opacity-10 rounded-full"
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, -180, -360]
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center bg-[#14532d]/10 rounded-full px-6 py-2 mb-4"
          >
            <Leaf className="text-[#14532d] mr-2" size={20} />
            <span className="text-sm font-semibold text-[#14532d] uppercase tracking-wider">
              Premium Varieties
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold text-[#14532d] mb-6"
          >
            Varieties for Commercialization
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-gray-700 leading-relaxed"
          >
            Explore our scientifically developed fruit varieties with exceptional commercial potential, 
            designed for modern agricultural practices and market demands.
          </motion.p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categoryFilters.map((category, index) => (
            <motion.button
              key={category}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.6 + (index * 0.1) }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSelectedCategory(category)
                setCurrentIndex(0)
              }}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-[#14532d] text-white shadow-lg shadow-[#14532d]/25'
                  : 'bg-white text-[#14532d] border-2 border-[#14532d]/20 hover:border-[#14532d] hover:bg-[#14532d]/5'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Carousel Container */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="relative"
          onMouseEnter={() => setAutoPlay(false)}
          onMouseLeave={() => setAutoPlay(true)}
        >
          {/* Navigation Buttons */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-4 z-20">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevSlide}
              className="bg-white shadow-xl rounded-full p-3 text-[#14532d] hover:bg-[#14532d] hover:text-white transition-all duration-300"
            >
              <ChevronLeft size={24} />
            </motion.button>
          </div>
          
          <div className="absolute top-1/2 -translate-y-1/2 -right-4 z-20">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextSlide}
              className="bg-white shadow-xl rounded-full p-3 text-[#14532d] hover:bg-[#14532d] hover:text-white transition-all duration-300"
            >
              <ChevronRight size={24} />
            </motion.button>
          </div>

          {/* Cards Container */}
          <div className="flex justify-center items-center min-h-[600px] px-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${selectedCategory}-${currentIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="flex gap-6 justify-center items-center w-full"
              >
                {getVisibleCards().map((variety, index) => (
                  <motion.div
                    key={`${variety.id}-${index}`}
                    initial={{ opacity: 0, y: 50, scale: 0.8 }}
                    animate={{ 
                      opacity: index === 1 ? 1 : 0.7,
                      y: 0,
                      scale: index === 1 ? 1 : 0.85,
                      zIndex: index === 1 ? 10 : 5
                    }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`w-full max-w-sm ${index !== 1 ? 'hidden lg:block' : ''}`}
                  >
                    <Card className="overflow-hidden border-none shadow-2xl hover:shadow-3xl transition-all duration-500 group bg-white">
                      {/* Image Section with Gradient Overlay */}
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={variety.image}
                          alt={variety.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-tr ${variety.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-500`} />
                        
                        {/* Floating Badges */}
                        <div className="absolute top-4 left-4 flex gap-2">
                          <Badge className="bg-white/90 text-[#14532d] font-semibold">
                            {variety.category}
                          </Badge>
                          <Badge className={`font-semibold ${getDemandColor(variety.marketDemand)}`}>
                            {variety.marketDemand} Demand
                          </Badge>
                        </div>

                        {/* Rating */}
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                          <Star className="text-[#facc15] fill-current" size={16} />
                          <span className="text-sm font-bold text-[#14532d]">
                            {variety.commercialRating}
                          </span>
                        </div>

                        {/* Export Potential Badge */}
                        <div className="absolute bottom-4 right-4">
                          <Badge className="bg-[#14532d]/90 text-white font-medium">
                            <Award size={12} className="mr-1" />
                            {variety.exportPotential} Export
                          </Badge>
                        </div>
                      </div>

                      {/* Content Section */}
                      <CardContent className="p-6">
                        <div className="mb-4">
                          <h3 className="text-2xl font-bold text-[#14532d] mb-2 group-hover:text-[#16a34a] transition-colors">
                            {variety.name}
                          </h3>
                          <p className="text-gray-600 leading-relaxed">
                            {variety.description}
                          </p>
                        </div>

                        {/* Key Stats */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="text-center p-3 bg-[#fefce8] rounded-lg">
                            <div className="flex items-center justify-center mb-1">
                              <Sun className="text-[#facc15]" size={18} />
                            </div>
                            <div className="text-xs text-gray-600 mb-1">Maturity</div>
                            <div className="text-sm font-semibold text-[#14532d]">
                              {variety.maturityPeriod}
                            </div>
                          </div>
                          
                          <div className="text-center p-3 bg-[#f0fdf4] rounded-lg">
                            <div className="flex items-center justify-center mb-1">
                              <TrendingUp className="text-[#16a34a]" size={18} />
                            </div>
                            <div className="text-xs text-gray-600 mb-1">Yield</div>
                            <div className="text-sm font-semibold text-[#14532d]">
                              {variety.yieldPotential}
                            </div>
                          </div>
                        </div>

                        {/* Features */}
                        <div className="mb-6">
                          <h4 className="text-sm font-semibold text-[#14532d] mb-3">Key Features</h4>
                          <div className="flex flex-wrap gap-2">
                            {variety.features.map((feature, idx) => (
                              <span
                                key={idx}
                                className="text-xs bg-[#14532d]/10 text-[#14532d] px-2 py-1 rounded-full font-medium"
                              >
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                          <Button className="flex-1 bg-[#14532d] hover:bg-[#0f3d21] text-white transition-all duration-300 group/btn">
                            <span>Learn More</span>
                            <motion.div
                              className="ml-2"
                              whileHover={{ x: 3 }}
                              transition={{ type: "spring", stiffness: 400 }}
                            >
                              →
                            </motion.div>
                          </Button>
                          
                          <Button 
                            variant="outline" 
                            className="border-[#14532d] text-[#14532d] hover:bg-[#14532d] hover:text-white"
                          >
                            <Droplets size={16} />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Indicators */}
          <div className="flex justify-center mt-8 gap-2">
            {filteredVarieties.map((_, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-[#14532d] scale-125' 
                    : 'bg-[#14532d]/30 hover:bg-[#14532d]/60'
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-16"
        >
          <Button 
            size="lg"
            className="bg-gradient-to-r from-[#14532d] to-[#16a34a] hover:from-[#0f3d21] hover:to-[#15803d] text-white px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            <Award className="mr-2" size={20} />
            Explore Commercial Opportunities
          </Button>
        </motion.div>
      </div>
    </section>
  )
}