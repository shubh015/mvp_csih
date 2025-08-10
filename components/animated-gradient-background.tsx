"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface AnimatedGradientBackgroundProps {
  className?: string
}

export default function AnimatedGradientBackground({ className = "" }: AnimatedGradientBackgroundProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <motion.div
      className={`absolute inset-0 opacity-30 pointer-events-none ${className}`}
      animate={{
        background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(250, 204, 21, 0.15), rgba(20, 83, 45, 0.05))`,
      }}
      transition={{ duration: 1.5 }}
    />
  )
}
