"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Search, MapPin, Phone, Mail, ExternalLink } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const institutes = [
  {
    id: 1,
    name: "Central Institute for Subtropical Horticulture",
    shortName: "CISH",
    location: "Lucknow, Uttar Pradesh",
    region: "North",
    type: "Crop Research",
    image: "/images/Gemini_Generated_Image_rv48odrv48odrv48.jpeg",
    description:
      "The Central Institute for Subtropical Horticulture (CISH) was started as Central Mango Research Station on September 4, 1972 under the aegis of the Indian Institute of Horticulture Research.",
    contact: {
      address: "Central Institute for Sub-tropical Horticulture Rahmankhera, P.O. Kakori, Lucknow – 227 017, Uttar Pradesh, India",
      phone: "+91-522 248 0726",
      email: "director.cish@icar.gov.in",
      website: "https://cish.org.in",
    },
  },
  {
    id: 2,
    name: "Indian Agricultural Research Institute",
    shortName: "IARI",
    location: "New Delhi",
    region: "North",
    type: "Education",
    image: "/images/unnamed10.jpg",
    description:
      "Premier national institute for agricultural research, education, and extension. Known as Pusa Institute.",
    contact: {
      address: "Pusa Campus, New Delhi - 110012",
      phone: "+91-11-25843375",
      email: "director.iari@icar.gov.in",
      website: "https://www.iari.res.in",
    },
  },
  {
    id: 3,
    name: "Central Marine Fisheries Research Institute",
    shortName: "CMFRI",
    location: "Kochi, Kerala",
    region: "South",
    type: "Fisheries",
    image: "/images/unnamed11.jpg",
    description:
      "Conducts research and training in marine fisheries to increase marine fish production and sustainability.",
    contact: {
      address: "Ernakulam North P.O., Kochi - 682018, Kerala",
      phone: "+91-484-2394867",
      email: "director.cmfri@icar.gov.in",
      website: "https://www.cmfri.org.in",
    },
  },
 
]

export default function InstitutesDirectory() {
  const [searchTerm, setSearchTerm] = useState("")
  const [regionFilter, setRegionFilter] = useState("")
  const [typeFilter, setTypeFilter] = useState("")
  const [selectedInstitute, setSelectedInstitute] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const filteredInstitutes = institutes.filter((institute) => {
    const matchesSearch =
      institute.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      institute.shortName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      institute.location.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesRegion = regionFilter === "" || institute.region === regionFilter
    const matchesType = typeFilter === "" || institute.type === typeFilter

    return matchesSearch && matchesRegion && matchesType
  })

  const openInstituteDetails = (institute) => {
    setSelectedInstitute(institute)
    setIsDialogOpen(true)
  }

  return (
    <section id="institutes" className="py-20 md:py-32 bg-[#fafaf9] relative overflow-hidden">
      {/* Animated Decorative Background */}
      <motion.div
        className="absolute bottom-0 right-0 w-64 h-64 bg-[#facc15] rounded-full opacity-10 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 20, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute top-0 left-0 w-64 h-64 bg-[#14532d] rounded-full opacity-10 blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -20, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 18,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-sm font-semibold text-[#14532d] uppercase tracking-wider mb-2">Institutes Directory</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-[#14532d] mb-6">Our Network of Research Excellence</h3>
          <p className="text-gray-700">
            Explore ICAR's nationwide network of research institutes dedicated to advancing agricultural science and
            technology.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-xl shadow-md p-6 mb-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Search institutes..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={regionFilter} onValueChange={setRegionFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                <SelectItem value="North">North</SelectItem>
                <SelectItem value="South">South</SelectItem>
                <SelectItem value="East">East</SelectItem>
                <SelectItem value="West">West</SelectItem>
                <SelectItem value="Central">Central</SelectItem>
                <SelectItem value="Northeast">Northeast</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Crop Research">Crop Research</SelectItem>
                <SelectItem value="Animal Science">Animal Science</SelectItem>
                <SelectItem value="Fisheries">Fisheries</SelectItem>
                <SelectItem value="Education">Education</SelectItem>
                <SelectItem value="Natural Resource Management">Natural Resource Management</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        <AnimatePresence>
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInstitutes.map((institute, index) => (
              <motion.div
                key={institute.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{
                  duration: 0.4,
                  delay: 0.05 * index,
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                }}
                whileHover={{ y: -8 }}
              >
                <Card className="overflow-hidden h-full border border-gray-100 hover:border-[#14532d]/20 transition-all duration-300 hover:shadow-lg group">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={institute.image || "/placeholder.svg"}
                      alt={institute.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <motion.div
                      className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium text-[#14532d]"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + 0.05 * index }}
                    >
                      {institute.type}
                    </motion.div>
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg text-[#14532d] group-hover:text-[#14532d]">
                          {institute.shortName}
                        </CardTitle>
                        <CardDescription className="text-sm line-clamp-1">{institute.name}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <MapPin size={14} className="mr-1" />
                      <span>{institute.location}</span>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">{institute.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="outline"
                      className="w-full border-[#14532d] text-[#14532d] hover:bg-[#14532d] hover:text-white"
                      onClick={() => openInstituteDetails(institute)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredInstitutes.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12"
          >
            <p className="text-gray-500">No institutes found matching your criteria.</p>
          </motion.div>
        )}

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          {selectedInstitute && (
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle className="text-2xl text-[#14532d]">{selectedInstitute.name}</DialogTitle>
                <DialogDescription className="text-gray-500">{selectedInstitute.location}</DialogDescription>
              </DialogHeader>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <motion.div
                  className="relative h-64 rounded-lg overflow-hidden"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={selectedInstitute.image || "/placeholder.svg"}
                    alt={selectedInstitute.name}
                    fill
                    className="object-cover"
                  />
                </motion.div>
                <div>
                  <h4 className="font-medium text-[#14532d] mb-2">About</h4>
                  <p className="text-gray-600 mb-4">{selectedInstitute.description}</p>

                  <h4 className="font-medium text-[#14532d] mb-2">Contact Information</h4>
                  <motion.div
                    className="space-y-2 text-sm"
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.1,
                        },
                      },
                    }}
                  >
                    <motion.div
                      className="flex items-start"
                      variants={{
                        hidden: { opacity: 0, x: -10 },
                        visible: { opacity: 1, x: 0 },
                      }}
                    >
                      <MapPin size={16} className="mr-2 mt-1 text-[#14532d]" />
                      <span className="text-gray-600">{selectedInstitute.contact.address}</span>
                    </motion.div>
                    <motion.div
                      className="flex items-center"
                      variants={{
                        hidden: { opacity: 0, x: -10 },
                        visible: { opacity: 1, x: 0 },
                      }}
                    >
                      <Phone size={16} className="mr-2 text-[#14532d]" />
                      <span className="text-gray-600">{selectedInstitute.contact.phone}</span>
                    </motion.div>
                    <motion.div
                      className="flex items-center"
                      variants={{
                        hidden: { opacity: 0, x: -10 },
                        visible: { opacity: 1, x: 0 },
                      }}
                    >
                      <Mail size={16} className="mr-2 text-[#14532d]" />
                      <span className="text-gray-600">{selectedInstitute.contact.email}</span>
                    </motion.div>
                    <motion.div
                      className="flex items-center"
                      variants={{
                        hidden: { opacity: 0, x: -10 },
                        visible: { opacity: 1, x: 0 },
                      }}
                    >
                      <ExternalLink size={16} className="mr-2 text-[#14532d]" />
                      <a
                        href={selectedInstitute.contact.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#14532d] hover:underline"
                      >
                        Visit Website
                      </a>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
              <div className="mt-4 flex justify-end">
                <Button
                  className="bg-[#14532d] hover:bg-[#0f3d21] text-white"
                  onClick={() => window.open(selectedInstitute.contact.website, "_blank")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Visit Official Website
                </Button>
              </div>
            </DialogContent>
          )}
        </Dialog>
      </div>
    </section>
  )
}
