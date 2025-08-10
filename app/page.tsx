"use client"

import { useState } from "react"
import Hero from "@/components/hero"
import About from "@/components/about"
import ResearchHighlights from "@/components/research-highlights"
import InstitutesDirectory from "@/components/institutes-directory"
import NewsEvents from "@/components/news-events"
import Footer from "@/components/footer"
import Header from "@/components/header"
import ScrollIndicator from "@/components/scroll-indicator"
import ResearchProjectsPage from "@/components/ResearchProjectsPage"
import NewsPage from "@/components/NewsPage"
// Import your NewsEventsPage component here
// import NewsEventsPage from "@/components/NewsEventsPage"

type ViewType = 'home' | 'research' | 'news'

export default function Home() {
  const [currentView, setCurrentView] = useState<ViewType>('home')

  const handleShowResearchProjects = () => {
    setCurrentView('research')
  }

  const handleShowNewsEvents = () => {
    setCurrentView('news')
  }

  const handleBackToHome = () => {
    setCurrentView('home')
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case 'research':
        return <ResearchProjectsPage onBackToHome={handleBackToHome} />
      
      case 'news':
        // Replace this with your actual NewsEventsPage component
        return <NewsPage onBackToHome={handleBackToHome} />
        
      
      default:
        return (
          <>
            <Hero />
            <About />
            <ResearchHighlights onViewAllProjects={handleShowResearchProjects} />
            <InstitutesDirectory />
            <NewsEvents onNewAllProjects ={handleShowNewsEvents} />
          </>
        )
    }
  }

  return (
    <div className="min-h-screen bg-[#fafaf9]">
      <ScrollIndicator />
      <Header />
      <main>
        {renderCurrentView()}
      </main>
      <Footer />
    </div>
  )
}