"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import {
  Calendar,
  Clock,
  User,
  Eye,
  Share2,
  BookmarkPlus,
  ArrowRight,
  Search,
  Filter,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const featuredNews = {
  id: 1,
  title:
    "CISH Scientists Develop Revolutionary Drought-Resistant Mango Variety",
  excerpt:
    "Breakthrough research at Central Institute for Subtropical Horticulture leads to development of new mango variety that can survive extreme drought conditions while maintaining exceptional fruit quality and yield.",
  content:
    "In a groundbreaking achievement, scientists at the Central Institute for Subtropical Horticulture have successfully developed a new mango variety...",
  author: "Dr. Rajesh Kumar",
  date: "August 8, 2025",
  readTime: "5 min read",
  views: "2.3K",
  category: "Research Breakthrough",
  image: "/images/mango2.jpg",
  featured: true,
};

const allNews = [
  {
    id: 2,
    title:
      "International Conference on Subtropical Horticulture Concludes Successfully",
    excerpt:
      "The three-day international conference brought together leading researchers from around the world to discuss latest developments in subtropical fruit cultivation.",
    author: "Dr. Priya Singh",
    date: "August 7, 2025",
    readTime: "3 min read",
    views: "1.8K",
    category: "Events",
    image: "/images/unnamed5.jpg",
  },
  {
    id: 3,
    title: "New Organic Certification Program Launched for Guava Growers",
    excerpt:
      "CISH introduces comprehensive organic certification program to help guava farmers transition to sustainable farming practices and access premium markets.",
    author: "Dr. Amit Sharma",
    date: "August 6, 2025",
    readTime: "4 min read",
    views: "1.5K",
    category: "Sustainability",
    image: "/images/mango3.jpg",
  },
  {
    id: 4,
    title: "Record-Breaking Citrus Yield Achieved Through Smart Irrigation",
    excerpt:
      "Implementation of IoT-based smart irrigation systems results in 40% increase in citrus fruit yield while reducing water consumption by 25%.",
    author: "Dr. Neha Gupta",
    date: "August 5, 2025",
    readTime: "6 min read",
    views: "2.1K",
    category: "Technology",
    image: "/images/unnamed8.jpg",
  },
  {
    id: 5,
    title: "CISH Partners with Leading Universities for Climate Research",
    excerpt:
      "New collaboration aims to develop climate-resilient horticultural practices and varieties suitable for changing environmental conditions.",
    author: "Dr. Sunita Yadav",
    date: "August 4, 2025",
    readTime: "4 min read",
    views: "1.2K",
    category: "Collaboration",
    image: "/images/sugarcane-farm.jpg",
  },
  {
    id: 6,
    title: "Training Program Benefits 500+ Farmers Across Uttar Pradesh",
    excerpt:
      "Comprehensive training program on modern horticultural practices successfully trains over 500 farmers, leading to significant yield improvements.",
    author: "Dr. Ravi Patel",
    date: "August 3, 2025",
    readTime: "3 min read",
    views: "980",
    category: "Training",
    image: "/images/new_sugar.jpg",
  },
  {
    id: 7,
    title: "Breakthrough in Post-Harvest Technology Reduces Fruit Losses",
    excerpt:
      "New preservation technique developed by CISH scientists extends fruit shelf life by 60%, significantly reducing post-harvest losses.",
    author: "Dr. Kavita Joshi",
    date: "August 2, 2025",
    readTime: "5 min read",
    views: "1.7K",
    category: "Research",
    image: "/images/new_sugar_1.jpg",
  },
  {
    id: 8,
    title: "Digital Platform Connects Farmers Directly with Consumers",
    excerpt:
      "CISH launches innovative digital marketplace enabling direct connection between subtropical fruit farmers and urban consumers.",
    author: "Dr. Manoj Tiwari",
    date: "August 1, 2025",
    readTime: "4 min read",
    views: "1.4K",
    category: "Innovation",
    image: "/images/new_sugar_2.jpg",
  },
];

const categories = [
  "All",
  "Research Breakthrough",
  "Events",
  "Sustainability",
  "Technology",
  "Collaboration",
  "Training",
  "Research",
  "Innovation",
];

const trendingTopics = [
  "Climate-Resilient Varieties",
  "Smart Irrigation",
  "Organic Farming",
  "Post-Harvest Technology",
  "Farmer Training",
];

interface ResearchBackProps {
  onBackToHome?: () => void;
}

export default function NewsPage({ onBackToHome }: ResearchBackProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const filteredNews = allNews.filter((article) => {
    const matchesCategory =
      selectedCategory === "All" || article.category === selectedCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.author.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const getCategoryColor = (category: string) => {
    const colors = {
      "Research Breakthrough": "bg-green-100 text-green-800",
      Events: "bg-blue-100 text-blue-800",
      Sustainability: "bg-emerald-100 text-emerald-800",
      Technology: "bg-purple-100 text-purple-800",
      Collaboration: "bg-orange-100 text-orange-800",
      Training: "bg-indigo-100 text-indigo-800",
      Research: "bg-teal-100 text-teal-800",
      Innovation: "bg-pink-100 text-pink-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#fefce8] to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#14532d] to-[#16a34a]">
        <motion.div
          className="absolute inset-0 bg-[url('/images/abstract-pattern.png')] opacity-10"
          animate={{ x: [0, -100, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />

        <div className="container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto text-white"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Latest News & Updates
            </h1>
            <p className="text-xl md:text-2xl text-green-100 mb-8">
              Central Institute for Subtropical Horticulture
            </p>
            <p className="text-lg text-green-200 max-w-2xl mx-auto">
              Stay informed with the latest developments, breakthroughs, and
              announcements from the world of subtropical horticulture research.
            </p>
            
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Featured Article */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <Card className="overflow-hidden border-none shadow-2xl hover:shadow-3xl transition-all duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
              <div className="relative aspect-[4/3] lg:aspect-auto">
                <Image
                  src={featuredNews.image}
                  alt={featuredNews.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-[#facc15] text-[#14532d] font-bold">
                    FEATURED
                  </Badge>
                </div>
              </div>

              <CardContent className="p-8 flex flex-col justify-center">
                <Badge
                  className={`${getCategoryColor(
                    featuredNews.category
                  )} mb-4 w-fit`}
                >
                  {featuredNews.category}
                </Badge>

                <h2 className="text-2xl md:text-3xl font-bold text-[#14532d] mb-4 leading-tight">
                  {featuredNews.title}
                </h2>

                <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                  {featuredNews.excerpt}
                </p>

                <div className="flex items-center justify-between mb-6 text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <User size={16} className="mr-1" />
                      <span>{featuredNews.author}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-1" />
                      <span>{featuredNews.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock size={16} className="mr-1" />
                      <span>{featuredNews.readTime}</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Eye size={16} className="mr-1" />
                    <span>{featuredNews.views}</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button className="bg-[#14532d] hover:bg-[#0f3d21] text-white flex-1">
                    Read Full Article
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-[#14532d] text-[#14532d]"
                  >
                    <Share2 size={16} />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-[#14532d] text-[#14532d]"
                  >
                    <BookmarkPlus size={16} />
                  </Button>
                </div>
              </CardContent>
            </div>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="xl:col-span-3">
            {/* Search and Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-6 mb-8"
            >
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative flex-1 max-w-md">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <Input
                    type="text"
                    placeholder="Search articles..."
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
                  Categories
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
                  {filteredNews.length}
                </span>{" "}
                articles
              </p>
            </motion.div>

            {/* News Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
            >
              {filteredNews.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="overflow-hidden h-full border-none shadow-lg hover:shadow-xl transition-all duration-300 group">
                    <div className="relative w-full aspect-[16/10] overflow-hidden">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <div className="absolute top-4 left-4">
                        <Badge
                          className={`${getCategoryColor(
                            article.category
                          )} font-medium`}
                        >
                          {article.category}
                        </Badge>
                      </div>

                      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex gap-2">
                          <Button
                            size="icon"
                            variant="secondary"
                            className="h-8 w-8"
                          >
                            <Share2 size={14} />
                          </Button>
                          <Button
                            size="icon"
                            variant="secondary"
                            className="h-8 w-8"
                          >
                            <BookmarkPlus size={14} />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-[#14532d] mb-3 line-clamp-2 group-hover:text-[#16a34a] transition-colors">
                        {article.title}
                      </h3>

                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {article.excerpt}
                      </p>

                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center">
                            <User size={14} className="mr-1" />
                            <span>{article.author}</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar size={14} className="mr-1" />
                            <span>{article.date}</span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <div className="flex items-center">
                            <Clock size={14} className="mr-1" />
                            <span>{article.readTime}</span>
                          </div>
                          <div className="flex items-center">
                            <Eye size={14} className="mr-1" />
                            <span>{article.views}</span>
                          </div>
                        </div>
                      </div>

                      <Button
                        variant="ghost"
                        className="p-0 h-auto text-[#14532d] hover:text-[#facc15] hover:bg-transparent group/btn"
                      >
                        <span>Read Article</span>
                        <motion.div
                          className="inline-block ml-2"
                          whileHover={{ x: 5 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 10,
                          }}
                        >
                          <ArrowRight size={16} />
                        </motion.div>
                      </Button>
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
              className="text-center"
            >
              <Button
                className="bg-[#14532d] hover:bg-[#0f3d21] text-white px-8 py-3"
                size="lg"
              >
                Load More Articles
              </Button>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="xl:col-span-1">
            <div className="space-y-6">
              {/* Trending Topics */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <div className="flex items-center mb-4">
                  <TrendingUp className="text-[#14532d] mr-2" size={20} />
                  <h3 className="text-lg font-bold text-[#14532d]">
                    Trending Topics
                  </h3>
                </div>

                <div className="space-y-2">
                  {trendingTopics.map((topic, index) => (
                    <motion.div
                      key={topic}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="flex items-center p-2 rounded-lg hover:bg-[#fefce8] cursor-pointer transition-colors"
                    >
                      <div className="w-2 h-2 bg-[#facc15] rounded-full mr-3" />
                      <span className="text-gray-700 hover:text-[#14532d] transition-colors">
                        {topic}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Newsletter Signup */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-gradient-to-br from-[#14532d] to-[#16a34a] rounded-2xl shadow-lg p-6 text-white"
              >
                <h3 className="text-lg font-bold mb-3">Stay Updated</h3>
                <p className="text-green-100 text-sm mb-4">
                  Subscribe to our newsletter for the latest research updates
                  and news.
                </p>

                <div className="space-y-3">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="bg-white/20 border-white/30 text-white placeholder-white/70 focus:border-white"
                  />
                  <Button className="w-full bg-[#facc15] hover:bg-[#eab308] text-[#14532d] font-semibold">
                    Subscribe
                  </Button>
                </div>
              </motion.div>

              {/* Quick Links */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h3 className="text-lg font-bold text-[#14532d] mb-4">
                  Quick Links
                </h3>

                <div className="space-y-2">
                  {[
                    "Research Publications",
                    "Annual Reports",
                    "Media Kit",
                    "Press Releases",
                    "Photo Gallery",
                  ].map((link, index) => (
                    <motion.a
                      key={link}
                      href="#"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="block p-2 text-gray-700 hover:text-[#14532d] hover:bg-[#fefce8] rounded-lg transition-all"
                    >
                      {link}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
