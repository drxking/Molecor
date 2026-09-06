"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import HeroSlider from "./_components/Heroslider"
import HighlightsSection from "./_components/Highlights"
import FeaturesSection from "./_components/Feature"
import AboutSection from "./_components/About"
import WhoSection from "./_components/Who"
import CertificationsSection from "./_components/CertificationSection"
import CaseStudyCard from "@/components/CaseStudyCard"

export default function Home() {
  const [news, setNews] = useState([])
  const [caseStudies, setCaseStudies] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentNewsSlide, setCurrentNewsSlide] = useState(0)

  useEffect(() => {
    async function fetchData() {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api"
        // Fetch news
        const newsRes = await fetch(`${apiUrl}/news/`)
        const newsData = await newsRes.json()

        // Fetch case studies
        const caseStudiesRes = await fetch(`${apiUrl}/case-studies/`)
        const caseStudiesData = await caseStudiesRes.json()

        console.log("Case studies data:", caseStudiesData)

        setNews(newsData)
        setCaseStudies(caseStudiesData)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Determine news type (Event or News)
  const getNewsType = (item) => {
    // This is a placeholder logic - adjust based on your actual data structure
    if (item.title?.toLowerCase().includes("event") || item.content?.toLowerCase().includes("event")) {
      return "Event"
    }
    return "News"
  }

  const nextNewsSlide = () => {
    if (news.length <= 3) return
    setCurrentNewsSlide((prev) => (prev + 3 >= news.length ? 0 : prev + 3))
  }

  const prevNewsSlide = () => {
    if (news.length <= 3) return
    setCurrentNewsSlide((prev) => (prev - 3 < 0 ? Math.max(0, news.length - 3) : prev - 3))
  }

  return (
    <div>
      <HeroSlider />
      <HighlightsSection />
      <FeaturesSection />

      {/* ===== NEWS SECTION ===== */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-4xl font-bold text-center text-[#2b6ca3] mx-auto">News</h2>
            <Link href="/news" className="bg-gray-800 text-white px-4 py-2 rounded text-sm">
              more
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center">
              <div className="animate-pulse">Loading news...</div>
            </div>
          ) : news.length > 0 ? (
            <div className="relative">
              {news.length > 3 && (
                <button
                  onClick={prevNewsSlide}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow-md"
                  aria-label="Previous slide"
                >
                  <ChevronLeft size={24} className="text-[#2b6ca3]" />
                </button>
              )}

              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentNewsSlide * (100 / 3)}%)` }}
                >
                  {news.map((item, index) => {
                    const newsType = getNewsType(item)

                    return (
                      <div key={item.id} className="w-full md:w-1/3 flex-shrink-0 px-4">
                        <div className="border border-gray-200 h-full flex flex-col">
                          <div className="relative">
                            <div className="absolute top-2 left-2 bg-[#2b6ca3] text-white text-xs px-2 py-1 rounded">
                              {newsType}
                            </div>
                            <img
                              src={item.image || "/placeholder.svg?height=200&width=400"}
                              alt={item.title}
                              className="w-full h-48 object-cover"
                            />
                          </div>
                          <div className="p-4 flex flex-col flex-grow">
                            <h2 className="text-xl font-bold text-[#2b6ca3] mb-2">{item.title}</h2>
                            <p className="text-sm text-gray-600 mb-4 flex-grow">
                              {item.summary?.substring(0, 120) || item.content?.substring(0, 120) || ""}
                              {(item.summary?.length > 120 || item.content?.length > 120) && "..."}
                            </p>
                            <Link
                              href={`/news/${item.id}`}
                              className="bg-[#2b6ca3] text-white text-center py-2 px-4 rounded self-start hover:bg-[#1d4e78] transition-colors"
                            >
                              Read more
                            </Link>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {news.length > 3 && (
                <button
                  onClick={nextNewsSlide}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow-md"
                  aria-label="Next slide"
                >
                  <ChevronRight size={24} className="text-[#2b6ca3]" />
                </button>
              )}
            </div>
          ) : (
            <p className="text-center text-gray-500">No news available.</p>
          )}
        </div>
      </section>

      <AboutSection />
      <WhoSection />

      {/* ===== CASE STUDIES SECTION ===== */}
      <section className="py-16 bg-[#e8f0f7]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#2b6ca3] mb-12">Case Studies</h2>

          {caseStudies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {caseStudies.slice(0, 6).map((study) => (
                <CaseStudyCard key={study.id} study={study} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No case studies available</p>
            </div>
          )}

          <div className="text-center mt-8">
            <Link
              href="/case-studies"
              className="inline-block px-6 py-2 bg-[#2b6ca3] text-white rounded-md hover:bg-[#1d4e78] transition-colors"
            >
              View All Case Studies
            </Link>
          </div>
        </div>
      </section>

      <CertificationsSection />
    </div>
  )
}
