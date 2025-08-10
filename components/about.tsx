"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import AnimatedCounter from "./animated-counter"
import ParallaxSection from "./parallax-section"

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section id="about" className="py-20 md:py-32 bg-[#fefce8]/50 relative overflow-hidden">
      {/* Decorative Background */}
      <ParallaxSection baseVelocity={-0.1} className="absolute top-0 right-0 w-1/3 h-full opacity-10">
        <Image src="/images/abstract-pattern.png" alt="Decorative Pattern" fill className="object-cover" />
      </ParallaxSection>

      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-6"
          >
            <motion.div variants={itemVariants}>
              <h2 className="text-sm font-semibold text-[#14532d] uppercase tracking-wider mb-2">About ICAR</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-[#14532d] mb-6">
                Pioneering Agricultural Research in India
              </h3>
            </motion.div>

            <motion.p variants={itemVariants} className="text-gray-700 leading-relaxed">
              The Indian Council of Agricultural Research (ICAR) is an autonomous organization under the Department of
              Agricultural Research and Education (DARE), Ministry of Agriculture and Farmers Welfare, Government of
              India.
            </motion.p>

            <motion.p variants={itemVariants} className="text-gray-700 leading-relaxed">
              Established in 1929, ICAR is the apex body for coordinating, guiding, and managing research and education
              in agriculture in the entire country. With 113 institutes and 73 agricultural universities spread across
              the country, ICAR is one of the largest national agricultural systems in the world.
            </motion.p>

            <motion.div variants={itemVariants} className="pt-4">
              <Button
                className="bg-[#14532d] hover:bg-[#0f3d21] text-white relative overflow-hidden group"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <motion.span className="absolute inset-0 bg-[#facc15]/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                <span className="relative z-10">Learn More About ICAR</span>
              </Button>
            </motion.div>
          </motion.div>

          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 50, rotateY: 15 }}
              animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : { opacity: 0, y: 50, rotateY: 15 }}
              transition={{
                duration: 0.8,
                delay: 0.4,
                type: "spring",
                stiffness: 100,
              }}
              className="bg-white rounded-2xl shadow-xl p-8 relative z-10"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden rounded-lg mb-8"
              >
                <Image
                  src="/images/unnamed.png"
                  alt="ICAR Scientists"
                  width={600}
                  height={400}
                  className="w-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </motion.div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <motion.div
                  className="p-4 rounded-lg bg-[#fefce8]"
                  whileHover={{
                    y: -5,
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <AnimatedCounter end={113} delay={0.1} />
                  <p className="text-sm text-gray-600 mt-1">Institutes</p>
                </motion.div>

                <motion.div
                  className="p-4 rounded-lg bg-[#fefce8]"
                  whileHover={{
                    y: -5,
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <AnimatedCounter end={100} suffix="+" delay={0.3} />
                  <p className="text-sm text-gray-600 mt-1">Innovations</p>
                </motion.div>

                <motion.div
                  className="p-4 rounded-lg bg-[#fefce8]"
                  whileHover={{
                    y: -5,
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <AnimatedCounter end={5000} suffix="+" delay={0.5} />
                  <p className="text-sm text-gray-600 mt-1">Scientists</p>
                </motion.div>
              </div>
            </motion.div>

            {/* Animated Decorative Elements */}
            <motion.div
              className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#facc15] rounded-full opacity-20 blur-2xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
            <motion.div
              className="absolute -top-10 -right-10 w-40 h-40 bg-[#14532d] rounded-full opacity-20 blur-2xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.25, 0.2],
              }}
              transition={{
                duration: 10,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
