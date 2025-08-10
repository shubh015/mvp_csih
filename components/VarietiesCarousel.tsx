"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Star, Leaf, Droplets, Sun, Award, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const mangoVarieties = [
  {
    id: 1,
    name: "Amrapali",
    variety: "Dwarf Variety",
    description: "A dwarf hybrid variety developed by IARI, New Delhi. Perfect for high-density planting with excellent fruit quality, regular bearing habit, and resistance to diseases. Ideal for commercial orchards with limited space.",
    features: ["Dwarf habit", "Regular bearing", "Rich flavor", "Disease resistant", "High density planting"],
    maturityPeriod: "June-July",
    yieldPotential: "15-20 kg/tree",
    commercialRating: 4.8,
    image: "https://images.pexels.com/photos/19333425/pexels-photo-19333425.jpeg",
    gradient: "from-orange-400 to-red-500",
    marketDemand: "High",
    exportPotential: "Excellent",
    fruitWeight: "150-200g",
    pulpContent: "75-80%"
  },
  {
    id: 2,
    name: "Dashehari",
    variety: "Premium Quality",
    description: "Traditional premium quality mango variety from Uttar Pradesh, known for its distinctive flavor, aroma, and juicy pulp. Highly preferred in northern Indian markets and commands premium prices.",
    features: ["Premium quality", "Distinctive aroma", "Juicy pulp", "Market favorite", "Good storage life"],
    maturityPeriod: "June-July",
    yieldPotential: "80-120 kg/tree",
    commercialRating: 4.7,
    image: "https://images.pexels.com/photos/30741640/pexels-photo-30741640.jpeg",
    gradient: "from-yellow-400 to-orange-500",
    marketDemand: "Very High",
    exportPotential: "Good",
    fruitWeight: "100-150g",
    pulpContent: "70-75%"
  },
  {
    id: 3,
    name: "Langra",
    variety: "Traditional",
    description: "One of the most popular traditional varieties from Uttar Pradesh. Known for its excellent taste, fiber-less pulp, and good keeping quality. Highly suitable for both domestic and export markets.",
    features: ["Fiber-less pulp", "Excellent taste", "Good keeping quality", "Traditional favorite", "Export suitable"],
    maturityPeriod: "July-August",
    yieldPotential: "60-80 kg/tree",
    commercialRating: 4.6,
    image: "https://images.pexels.com/photos/30893227/pexels-photo-30893227.jpeg",
    gradient: "from-green-400 to-yellow-500",
    marketDemand: "High",
    exportPotential: "Excellent",
    fruitWeight: "200-250g",
    pulpContent: "78-82%"
  },
  {
    id: 4,
    name: "Chausa",
    variety: "Late Season",
    description: "Premium late season variety with excellent flavor and aroma. Large sized fruits with attractive appearance and good shelf life. Highly valued in both domestic and international markets.",
    features: ["Large fruit size", "Late season", "Excellent flavor", "Good shelf life", "Premium quality"],
    maturityPeriod: "July-August",
    yieldPotential: "70-100 kg/tree",
    commercialRating: 4.5,
    image: "https://images.pexels.com/photos/8446853/pexels-photo-8446853.jpeg",
    gradient: "from-yellow-300 to-orange-400",
    marketDemand: "Growing",
    exportPotential: "Good",
    fruitWeight: "250-350g",
    pulpContent: "72-76%"
  },
  {
    id: 5,
    name: "Mallika",
    variety: "Hybrid",
    description: "High-quality hybrid variety developed by IARI, combining the best traits of Neelum and Dashehari. Regular bearer with excellent fruit quality and good resistance to diseases and pests.",
    features: ["Hybrid vigor", "Regular bearing", "Disease resistant", "Excellent quality", "Good shipper"],
    maturityPeriod: "June-July",
    yieldPotential: "40-60 kg/tree",
    commercialRating: 4.4,
    image: "https://images.pexels.com/photos/2667738/pexels-photo-2667738.jpeg",
    gradient: "from-orange-300 to-red-400",
    marketDemand: "Stable",
    exportPotential: "Excellent",
    fruitWeight: "180-220g",
    pulpContent: "74-78%"
  }
]

const varietyFilters = ["All Varieties", "Dwarf Variety", "Premium Quality", "Traditional", "Late Season", "Hybrid"]

export default function VarietiesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedVariety, setSelectedVariety] = useState("All Varieties")
  const [autoPlay, setAutoPlay] = useState(true)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const filteredVarieties = mangoVarieties.filter(variety => 
    selectedVariety === "All Varieties" || variety.variety === selectedVariety
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
            Premium Mango Varieties
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-gray-700 leading-relaxed"
          >
            Discover our scientifically developed mango varieties with exceptional commercial potential, 
            perfect for modern orchard management and premium market segments.
          </motion.p>
        </motion.div>

        {/* Variety Type Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {varietyFilters.map((variety, index) => (
            <motion.button
              key={variety}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.6 + (index * 0.1) }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSelectedVariety(variety)
                setCurrentIndex(0)
              }}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedVariety === variety
                  ? 'bg-[#14532d] text-white shadow-lg shadow-[#14532d]/25'
                  : 'bg-white text-[#14532d] border-2 border-[#14532d]/20 hover:border-[#14532d] hover:bg-[#14532d]/5'
              }`}
            >
              {variety}
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
                key={`${selectedVariety}-${currentIndex}`}
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
                            {variety.variety}
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
                            <div className="text-xs text-gray-600 mb-1">Fruit Weight</div>
                            <div className="text-sm font-semibold text-[#14532d]">
                              {variety.fruitWeight}
                            </div>
                          </div>
                          
                          <div className="text-center p-3 bg-[#f0fdf4] rounded-lg">
                            <div className="flex items-center justify-center mb-1">
                              <TrendingUp className="text-[#16a34a]" size={18} />
                            </div>
                            <div className="text-xs text-gray-600 mb-1">Pulp Content</div>
                            <div className="text-sm font-semibold text-[#14532d]">
                              {variety.pulpContent}
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
            Explore Mango Cultivation Guide
          </Button>
        </motion.div>
      </div>
    </section>
  )
}