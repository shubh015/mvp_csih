"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = ["About", "Research", "Institutes", "News", "Contact"]

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    closed: { opacity: 0, x: -10 },
    open: { opacity: 1, x: 0 },
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm py-2" : "bg-transparent py-4",
      )}
    >
    <div className="container mx-auto px-4 flex items-center justify-between">
  <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
    <Link href="/" className="flex items-center gap-2">
      <div className="rounded-full">
        <Image
          src="/images/icar-removebg-preview.png"
          alt="CISH Logo"
          width={110}
          height={100}
          className="object-contain"
        />
      </div>
      
    </Link>
  </motion.div>

  {/* Rest of the code remains unchanged */}


        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.5 }}
            >
              <Link
                href={`#${item.toLowerCase()}`}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-mango relative group",
                  isScrolled ? "text-leaf-dark" : "text-white",
                )}
              >
                {item}
                <motion.span
                  className="absolute left-0 right-0 bottom-0 h-0.5 bg-mango transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"
                  whileHover={{ scaleX: 1 }}
                />
              </Link>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            <Button
              className="bg-leaf-dark hover:bg-leaf text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Publications
            </Button>
          </motion.div>
        </nav>

        {/* Mobile Menu Button */}
        <motion.button
          className={cn("md:hidden", isScrolled ? "text-leaf-dark" : "text-white")}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <AnimatePresence mode="wait">
            {isMenuOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={24} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu size={24} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md overflow-hidden"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <nav className="flex flex-col gap-1 p-4">
              {navItems.map((item) => (
                <motion.div key={item} variants={itemVariants}>
                  <Link
                    href={`#${item.toLowerCase()}`}
                    className="text-leaf-dark font-medium py-2 hover:bg-[#fefce8] px-4 rounded-md block transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
              <motion.div variants={itemVariants} className="mt-2">
                <Button
                  className="bg-leaf-dark hover:bg-leaf text-white w-full"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Publications
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
