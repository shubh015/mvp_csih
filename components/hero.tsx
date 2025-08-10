"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { ChevronDown } from "lucide-react"

export default function Hero() {
  const fullText1 = "Advancing agrotechniques for tropical and subtropical cultivation of crop for a Sustainable Future."

  const [text, setText] = useState("")
  const index = useRef(0)
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 300])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  useEffect(() => {
  let i = 0
  let currentText = ""

  const interval = setInterval(() => {
    currentText += fullText1.charAt(i)
    setText(currentText)
    i++

    if (i >= fullText1.length) {
      clearInterval(interval)
    }
  }, 100)

  return () => clearInterval(interval)
}, [])

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section ref={containerRef} className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div className="absolute inset-0 z-0" style={{ y, opacity }}>
        <Image src="/images/mango-orchard-hero.jpeg" alt="CISH Mango Orchard" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]" />
      </motion.div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <motion.h1
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.span
              initial={{ opacity: 0, filter: "blur(8px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              Central Institute for Subtropical Horticulture
            </motion.span>
          </motion.h1>

          <div className="h-16 md:h-20">
            <p className="text-xl md:text-2xl lg:text-3xl text-white font-light">
              {text}
              <span className="animate-pulse">|</span>
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="mt-12"
          >
            <motion.button
              onClick={scrollToAbout}
              className="inline-flex items-center justify-center text-white hover:text-mango transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="mr-2">Discover More</span>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 1.5,
                  ease: "easeInOut",
                }}
              >
                <ChevronDown size={20} />
              </motion.div>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/30 to-transparent" />
    </section>
  )
}
