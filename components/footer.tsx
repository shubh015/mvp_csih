"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Subscribed with email:", email);
    setIsSubmitted(true);
    setTimeout(() => {
      setEmail("");
      setIsSubmitted(false);
    }, 3000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const socialVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.3 + i * 0.1,
        type: "spring",
        stiffness: 200,
        damping: 10,
      },
    }),
  };

  return (
    <footer
      id="contact"
      className="bg-leaf-dark text-white relative overflow-hidden"
    >
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-5">
        <Image
          src="/images/abstract-pattern.png"
          alt="Decorative Pattern"
          fill
          className="object-cover"
        />
      </div>

      {/* Animated Particles */}
      <motion.div
        className="absolute top-20 left-20 w-4 h-4 rounded-full bg-mango/20"
        animate={{
          y: [0, -50, 0],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute bottom-40 right-40 w-6 h-6 rounded-full bg-mango/10"
        animate={{
          y: [0, -70, 0],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute top-60 right-1/4 w-3 h-3 rounded-full bg-mango/15"
        animate={{
          y: [0, -40, 0],
          opacity: [0.15, 0.4, 0.15],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-16"
        >
          <motion.div variants={itemVariants} className="space-y-4">
            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="rounded-full p-1">
                <Image
                  src="/images/icar-removebg-preview.png"
                  alt="CISH Logo"
                  width={110}
                  height={100}
                  className="object-contain"
                />
              </div>

              <span className="font-bold text-xl">ICAR-CISH</span>
            </motion.div>
            <p className="text-gray-300 text-sm">
              The Central Institute for Subtropical Horticulture (CISH) was started as Central Mango Research Station on September 4, 1972 under the aegis of the Indian Institute of Horticulture Research.
            </p>
            <div className="flex space-x-4 pt-2">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={socialVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.2, rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.3 }}
                >
                  <Link
                    href="#"
                    className="text-white hover:text-mango transition-colors"
                  >
                    <Icon size={20} />
                    <span className="sr-only">Social Media</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                "About Us",
                "Research",
                "Publications",
                "Careers",
                "Tenders",
                "RTI",
                "Contact Us",
              ].map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i, duration: 0.5 }}
                >
                  <Link
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors flex items-center group"
                  >
                    <motion.div
                      className="mr-2"
                      whileHover={{ x: 5 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      }}
                    >
                      <ArrowRight size={14} />
                    </motion.div>
                    <span>{item}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="font-semibold text-lg mb-4">Contact Information</h3>
            <ul className="space-y-4">
              <motion.li
                className="flex items-start"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                <MapPin size={18} className="mr-2 mt-1 text-mango" />
                <span className="text-gray-300 text-sm">
                  Central Institute for Sub-tropical Horticulture Rahmankhera,
                  P.O. Kakori, Lucknow – 227 017, Uttar Pradesh, India
                </span>
              </motion.li>
              <motion.li
                className="flex items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <Phone size={18} className="mr-2 text-mango" />
                <span className="text-gray-300">+91-522-2841022</span>
              </motion.li>
              <motion.li
                className="flex items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <Mail size={18} className="mr-2 text-mango" />
                <span className="text-gray-300">director.cish@icar.gov.in</span>
              </motion.li>
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="font-semibold text-lg mb-4">Newsletter</h3>
            <p className="text-gray-300 text-sm mb-4">
              Subscribe to our newsletter to receive updates on the latest
              research, events, and agricultural innovations.
            </p>
            <form onSubmit={handleSubmit} className="space-y-2">
              <div className="relative">
                <AnimatePresence>
                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-leaf border border-mango/30 text-white p-2 rounded-md text-sm"
                    >
                      Thank you for subscribing!
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <Input
                        type="email"
                        placeholder="Your email address"
                        className="bg-leaf border-leaf text-white placeholder:text-gray-400 pr-12"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <Button
                        type="submit"
                        size="sm"
                        className="absolute right-1 top-1 h-8 bg-mango hover:bg-mango-dark text-white"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ArrowRight size={16} />
                        <span className="sr-only">Subscribe</span>
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </motion.div>
        </motion.div>

        <motion.div
          className="border-t border-leaf py-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-300">
              &copy; {new Date().getFullYear()} Central Institute of Horticulture Research. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                href="#"
                className="text-sm text-gray-300 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-sm text-gray-300 hover:text-white transition-colors"
              >
                Terms of Use
              </Link>
              <Link
                href="#"
                className="text-sm text-gray-300 hover:text-white transition-colors"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
