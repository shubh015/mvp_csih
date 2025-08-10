"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView, useAnimation } from "framer-motion"

interface AnimatedCounterProps {
  end: number
  duration?: number
  delay?: number
  suffix?: string
  className?: string
}

export default function AnimatedCounter({
  end,
  duration = 2,
  delay = 0,
  suffix = "",
  className = "text-3xl font-bold text-[#14532d]",
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")

      let startTime: number
      let animationFrame: number

      const countUp = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
        setCount(Math.floor(progress * end))

        if (progress < 1) {
          animationFrame = requestAnimationFrame(countUp)
        }
      }

      // Add a small delay before starting the animation
      setTimeout(() => {
        animationFrame = requestAnimationFrame(countUp)
      }, delay * 1000)

      return () => {
        if (animationFrame) {
          cancelAnimationFrame(animationFrame)
        }
      }
    }
  }, [isInView, end, duration, delay, controls])

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 10 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            delay: delay,
          },
        },
      }}
    >
      <span className={className}>
        {count}
        {suffix}
      </span>
    </motion.div>
  )
}
