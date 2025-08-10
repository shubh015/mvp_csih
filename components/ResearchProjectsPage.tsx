"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Search,
  Filter,
  Calendar,
  Users,
  MapPin,
  ArrowRight,
  ExternalLink,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { on } from "events";

const researchProjects = [
  {
    id: 1,
    title: "Development of Climate-Resilient Mango Varieties",
    description:
      "Research focused on developing mango varieties that can withstand extreme weather conditions while maintaining fruit quality and yield.",
    category: "Fruit Development",
    status: "Ongoing",
    duration: "2023-2026",
    budget: "₹2.5 Crores",
    team: "Dr. Rajesh Kumar, Dr. Priya Singh",
    location: "CISH Lucknow",
    progress: 65,
    image: "/images/mango2.jpg",
    tags: ["Climate Change", "Breeding", "Sustainability"],
  },
  {
    id: 2,
    title: "Integrated Pest Management in Citrus Orchards",
    description:
      "Comprehensive study on sustainable pest control methods for citrus fruits using biological and organic approaches.",
    category: "Pest Management",
    status: "Completed",
    duration: "2022-2024",
    budget: "₹1.8 Crores",
    team: "Dr. Amit Sharma, Dr. Neha Gupta",
    location: "CISH Lucknow",
    progress: 100,
    image: "/images/unnamed5.jpg",
    tags: ["IPM", "Organic", "Citrus"],
  },
  {
    id: 3,
    title: "Post-Harvest Technology for Guava Preservation",
    description:
      "Innovative techniques for extending shelf life of guava fruits and reducing post-harvest losses through advanced preservation methods.",
    category: "Post-Harvest",
    status: "Ongoing",
    duration: "2024-2027",
    budget: "₹3.2 Crores",
    team: "Dr. Sunita Yadav, Dr. Ravi Patel",
    location: "CISH Lucknow",
    progress: 35,
    image: "/images/unnamed8.jpg",
    tags: ["Technology", "Preservation", "Value Addition"],
  },
  {
    id: 4,
    title: "Nutritional Enhancement of Subtropical Fruits",
    description:
      "Research on biofortification techniques to enhance nutritional content of subtropical fruits for better human health outcomes.",
    category: "Nutrition",
    status: "Ongoing",
    duration: "2023-2025",
    budget: "₹2.0 Crores",
    team: "Dr. Kavita Joshi, Dr. Manoj Tiwari",
    location: "CISH Lucknow",
    progress: 55,
    image: "/images/mango3.jpg",
    tags: ["Biofortification", "Nutrition", "Health"],
  },
  {
    id: 5,
    title: "Water-Efficient Irrigation Systems for Horticultural Crops",
    description:
      "Development and implementation of smart irrigation technologies to optimize water usage in subtropical fruit cultivation.",
    category: "Water Management",
    status: "Ongoing",
    duration: "2024-2026",
    budget: "₹2.8 Crores",
    team: "Dr. Anil Kumar, Dr. Pooja Mishra",
    location: "CISH Lucknow",
    progress: 25,
    image: "/images/sugarcane-farm.jpg",
    tags: ["Smart Irrigation", "Water Conservation", "Technology"],
  },
  {
    id: 6,
    title: "Organic Fertilizer Development from Agricultural Waste",
    description:
      "Converting agricultural waste into high-quality organic fertilizers for sustainable horticultural practices.",
    category: "Sustainability",
    status: "Planning",
    duration: "2025-2028",
    budget: "₹1.5 Crores",
    team: "Dr. Sanjay Verma, Dr. Meera Jain",
    location: "CISH Lucknow",
    progress: 10,
    image: "/images/new_sugar.jpg",
    tags: ["Organic", "Waste Management", "Circular Economy"],
  },
];

const categories = [
  "All",
  "Fruit Development",
  "Pest Management",
  "Post-Harvest",
  "Nutrition",
  "Water Management",
  "Sustainability",
];
const statusFilters = ["All", "Ongoing", "Completed", "Planning"];

interface ResearchBackProps {
  onBackToHome?: () => void;
}
export default function ResearchProjectsPage({
  onBackToHome,
}: ResearchBackProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const filteredProjects = researchProjects.filter((project) => {
    const matchesCategory =
      selectedCategory === "All" || project.category === selectedCategory;
    const matchesStatus =
      selectedStatus === "All" || project.status === selectedStatus;
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );

    return matchesCategory && matchesStatus && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ongoing":
        return "bg-blue-100 text-blue-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Planning":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#fefce8] to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-[#14532d] text-white">
        <motion.div
          className="absolute inset-0 bg-[url('/images/abstract-pattern.png')] opacity-10"
          animate={{ x: [0, 100, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />

        <div className="container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Research Projects
            </h1>
            <p className="text-xl md:text-2xl text-green-100 mb-8">
              Central Institute for Subtropical Horticulture
            </p>
            <p className="text-lg text-green-200 max-w-2xl mx-auto">
              Pioneering research initiatives in subtropical horticulture,
              focusing on sustainable agriculture, crop improvement, and
              innovative farming technologies.
            </p>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
      </div>

      {/* Search and Filters */}
      <div className="container mx-auto px-4 py-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <Input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-gray-300 focus:border-[#14532d]"
              />
            </div>

           
        <div className="flex gap-2">

            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="border-[#14532d] text-[#14532d] hover:bg-[#14532d] hover:text-white"
            >
              <Filter size={16} className="mr-2" />
              Filters
            </Button>
             <Button
              variant="outline"
              onClick={onBackToHome}
              className="border-[#14532d] text-[#14532d] hover:bg-[#14532d] hover:text-white"
            >
              Back to Home
            </Button>
                    </div>

          </div>

          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 pt-6 border-t border-gray-200"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <Button
                        key={category}
                        variant={
                          selectedCategory === category ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => setSelectedCategory(category)}
                        className={
                          selectedCategory === category
                            ? "bg-[#14532d] hover:bg-[#0f3d21]"
                            : "border-[#14532d] text-[#14532d] hover:bg-[#14532d] hover:text-white"
                        }
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {statusFilters.map((status) => (
                      <Button
                        key={status}
                        variant={
                          selectedStatus === status ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => setSelectedStatus(status)}
                        className={
                          selectedStatus === status
                            ? "bg-[#14532d] hover:bg-[#0f3d21]"
                            : "border-[#14532d] text-[#14532d] hover:bg-[#14532d] hover:text-white"
                        }
                      >
                        {status}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6"
        >
          <p className="text-gray-600">
            Showing{" "}
            <span className="font-semibold text-[#14532d]">
              {filteredProjects.length}
            </span>{" "}
            research projects
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ y: -5 }}
            >
              <Card className="overflow-hidden h-full border-none shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="relative w-full aspect-[16/10] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#14532d] to-[#16a34a] opacity-90" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white p-4">
                      <h3 className="text-lg font-bold mb-2">
                        {project.category}
                      </h3>
                      <div className="w-16 h-1 bg-[#facc15] mx-auto" />
                    </div>
                  </div>

                  <div className="absolute top-4 right-4">
                    <Badge
                      className={`${getStatusColor(
                        project.status
                      )} font-medium`}
                    >
                      {project.status}
                    </Badge>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2">
                      <div className="flex justify-between items-center text-white text-sm mb-1">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <div className="w-full bg-white/30 rounded-full h-2">
                        <div
                          className="bg-[#facc15] h-2 rounded-full transition-all duration-500"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  <h4 className="text-xl font-bold text-[#14532d] mb-3 line-clamp-2">
                    {project.title}
                  </h4>

                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar size={16} className="mr-2 text-[#14532d]" />
                      <span>{project.duration}</span>
                    </div>

                    <div className="flex items-center text-sm text-gray-600">
                      <Users size={16} className="mr-2 text-[#14532d]" />
                      <span>{project.team}</span>
                    </div>

                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin size={16} className="mr-2 text-[#14532d]" />
                      <span>{project.location}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-[#fefce8] text-[#14532d] border border-[#facc15]/20"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Button
                      className="flex-1 bg-[#14532d] hover:bg-[#0f3d21] text-white"
                      size="sm"
                    >
                      View Details
                      <ArrowRight size={14} className="ml-2" />
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      className="border-[#14532d] text-[#14532d] hover:bg-[#14532d] hover:text-white"
                    >
                      <Download size={14} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Load More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <Button
            className="bg-[#14532d] hover:bg-[#0f3d21] text-white px-8 py-3"
            size="lg"
          >
            Load More Projects
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
