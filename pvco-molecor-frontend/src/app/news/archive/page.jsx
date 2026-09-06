"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export default function NewsArchivePage() {
  const [newsItems, setNewsItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchNews() {
      try {
        setLoading(true)
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api"
        const response = await fetch(`${apiUrl}/news/`, {
          cache: "no-store",
        })

        if (!response.ok) {
          throw new Error(`Failed to fetch news: ${response.status}`)
        }

        const data = await response.json()
        setNewsItems(data)
      } catch (error) {
        console.error("Failed to fetch news list:", error)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  // Determine news type (Event or News)
  const getNewsType = (item) => {
    // This is a placeholder logic - adjust based on your actual data structure
    if (item.title?.toLowerCase().includes("event") || item.content?.toLowerCase().includes("event")) {
      return "Event"
    }
    return "News"
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-center text-[#2b6ca3] mb-12">News Archive</h1>
          <div className="flex justify-center">
            <div className="animate-pulse">Loading news...</div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-center text-[#2b6ca3] mb-12">News Archive</h1>
          <div className="text-center text-red-500">
            <p>Error loading news: {error}</p>
          </div>
        </div>
      </div>
    )
  }

  // Group news by year
  const groupedByYear = newsItems.reduce((acc, item) => {
    const year = item.published_date ? new Date(item.published_date).getFullYear() : "Undated"
    if (!acc[year]) {
      acc[year] = []
    }
    acc[year].push(item)
    return acc
  }, {})

  // Sort years in descending order
  const sortedYears = Object.keys(groupedByYear).sort((a, b) => b - a)

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Link href="/news" className="text-[#2b6ca3] hover:underline">
            ← Back to News
          </Link>
        </div>

        <h1 className="text-4xl font-bold text-center text-[#2b6ca3] mb-12">News Archive</h1>

        {sortedYears.map((year) => (
          <div key={year} className="mb-12">
            <h2 className="text-2xl font-bold text-[#2b6ca3] mb-6 border-b pb-2">{year}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {groupedByYear[year].map((item) => (
                <Link key={item.id} href={`/news/${item.id}`} className="block group">
                  <div className="border border-gray-200 hover:border-[#2b6ca3] transition-colors h-full">
                    <div className="relative">
                      <div className="absolute top-2 left-2 bg-[#2b6ca3] text-white text-xs px-2 py-1 rounded">
                        {getNewsType(item)}
                      </div>
                      <img
                        src={item.image || "/placeholder.svg?height=200&width=400"}
                        alt={item.title}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-[#2b6ca3] group-hover:underline">{item.title}</h3>
                      {item.published_date && (
                        <p className="text-sm text-gray-500 mt-1">
                          {new Date(item.published_date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      )}
                      <p className="text-sm text-gray-600 mt-2">
                        {item.summary?.substring(0, 100) || item.content?.substring(0, 100) || ""}
                        {(item.summary?.length > 100 || item.content?.length > 100) && "..."}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
