"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Calendar, Clock, ArrowRight, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from "next/navigation"

const newsItems = [
  {
    id: 1,
    title: "ICAR Develops New crop Variety",
    date: "May 15, 2025",
    category: "Research",
    excerpt:
      "Scientists at ICAR have developed a new crop variety that can withstand prolonged drought conditions while maintaining yield.",
    image: "/images/unnamed7.jpg",
  },
  {
    id: 2,
    title: "National Conference on Climate-Smart Agriculture Announced",
    date: "June 10, 2025",
    category: "Events",
    excerpt:
      "ICAR will host a national conference on climate-smart agricultural practices to address challenges posed by climate change.",
    image: "/images/mango2.jpg",
  },
  {
    id: 3,
    title: "ICAR Signs MoU with International Research Organizations",
    date: "April 28, 2025",
    category: "Collaboration",
    excerpt:
      "ICAR has signed memorandums of understanding with leading international agricultural research organizations to enhance collaboration.",
    image: "/images/mango3.jpg",
  },
]

const upcomingEvents = [
  {
    id: 1,
    title: "National Workshop on Precision Agriculture",
    date: "June 15-17, 2025",
    location: "IARI, New Delhi",
    time: "9:00 AM - 5:00 PM",
    image: "/images/unnamed5.jpg",
  },
  {
    id: 2,
    title: "Training Program on Organic Crop Farming Techniques",
    date: "July 5-10, 2025",
    location: "IISR, Lucknow",
    time: "10:00 AM - 4:00 PM",
    image: "/images/unnamed6.jpg",
  },
  {
    id: 3,
    title: "International Conference on Agricultural Biotechnology",
    date: "August 20-22, 2025",
    location: "NBPGR, New Delhi",
    time: "9:00 AM - 6:00 PM",
    image: "/images/unnamed8.jpg",
  },
]

interface newsProps {
  onNewAllProjects?: () => void;
}

export default function NewsEvents({onNewAllProjects}: newsProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [activeTab, setActiveTab] = useState("news")
  const router = useRouter()

  const handleNews = () => {
    if (onNewAllProjects) {
      onNewAllProjects();
    } else {
      // Fallback to router navigation if no callback provided
      router.push('/news-projects');
    }
  };

  return (
    <section id="news" className="py-20 md:py-32 bg-white relative overflow-hidden">
      {/* Animated Background */}
      <motion.div
        className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#fefce8] opacity-50 rounded-bl-full"
        animate={{ rotate: [0, 5, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-[#14532d] opacity-5 rounded-tr-full"
        animate={{ rotate: [0, -5, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 25, repeat: Infinity, repeatType: "reverse" }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.h2 className="text-sm font-semibold text-[#14532d] uppercase tracking-wider mb-2">
            News & Events
          </motion.h2>
          <motion.h3 className="text-3xl md:text-4xl font-bold text-[#14532d] mb-6">
            Stay Updated with ICAR
          </motion.h3>
          <motion.p className="text-gray-700">
            Discover the latest news, announcements, and upcoming events from ICAR and its institutes across India.
          </motion.p>
        </motion.div>

        {/* Tabs */}
        <Tabs defaultValue="news" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
            <TabsTrigger value="news" className="text-sm relative">
              Latest News
              {activeTab === "news" && (
                <motion.div
                  className="absolute -bottom-[1px] left-0 right-0 h-[2px] bg-[#14532d]"
                  layoutId="activeTab"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </TabsTrigger>
            <TabsTrigger value="events" className="text-sm relative">
              Upcoming Events
              {activeTab === "events" && (
                <motion.div
                  className="absolute -bottom-[1px] left-0 right-0 h-[2px] bg-[#14532d]"
                  layoutId="activeTab"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </TabsTrigger>
          </TabsList>

          {/* News Grid (3 Cards) */}
          <AnimatePresence mode="wait">
            <TabsContent value="news">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {newsItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    whileHover={{ y: -10 }}
                  >
                    <Card className="overflow-hidden h-full border-none shadow-md hover:shadow-lg transition-all group">
                      <div className="relative w-full aspect-[4/3] overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-3 left-3 bg-[#14532d] text-white text-xs font-medium px-2 py-1 rounded">
                          {item.category}
                        </div>
                      </div>
                      <CardContent className="p-5">
                        <div className="flex items-center text-xs text-gray-500 mb-2">
                          <Calendar size={14} className="mr-1" />
                          <span>{item.date}</span>
                        </div>
                        <h4 className="text-lg font-semibold text-[#14532d] mb-2 line-clamp-2">
                          {item.title}
                        </h4>
                        <p className="text-sm text-gray-600 mb-4 line-clamp-3">{item.excerpt}</p>
                        <Button variant="ghost" className="p-0 h-auto text-[#14532d] hover:text-[#facc15]">
                          <span>Read more</span>
                          <motion.div whileHover={{ x: 5 }} className="ml-2">
                            <ArrowRight size={16} />
                          </motion.div>
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>

              <div className="mt-12 text-center">
                <Button className="bg-[#14532d] hover:bg-[#0f3d21] text-white"  onClick={handleNews}>
                  View All News
                </Button>
              </div>
            </TabsContent>

            {/* Events Grid (3 Cards) */}
            <TabsContent value="events">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {upcomingEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    whileHover={{ y: -10 }}
                  >
                    <Card className="overflow-hidden h-full border-none shadow-md hover:shadow-lg transition-all group">
                      <div className="relative w-full aspect-[4/3] overflow-hidden">
                        <Image
                          src={event.image}
                          alt={event.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <CardContent className="p-5">
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                          <div className="flex items-center">
                            <Calendar size={14} className="mr-1 text-[#14532d]" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock size={14} className="mr-1 text-[#14532d]" />
                            <span>{event.time}</span>
                          </div>
                        </div>
                        <h4 className="text-lg font-semibold text-[#14532d] mb-2">{event.title}</h4>
                        <div className="flex items-center text-sm text-gray-600 mb-4">
                          <MapPin size={16} className="mr-1 text-[#14532d]" />
                          <span>{event.location}</span>
                        </div>
                        <Button className="w-full bg-[#14532d] hover:bg-[#0f3d21] text-white">
                          Register Now
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>

              <div className="mt-12 text-center">
                <Button className="bg-[#14532d] hover:bg-[#0f3d21] text-white">
                  View All Events
                </Button>
              </div>
            </TabsContent>
          </AnimatePresence>
        </Tabs>
      </div>
    </section>
  )
}
