"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function NewsDetail() {
  const params = useParams()
  const id = params.id

  const [newsItem, setNewsItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchNewsItem() {
      try {
        setLoading(true)
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api"
        const response = await fetch(`${apiUrl}/news/${id}/`, {
          cache: "no-store",
        })

        if (!response.ok) {
          throw new Error(`Failed to fetch news: ${response.status}`)
        }

        const data = await response.json()
        setNewsItem(data)
      } catch (error) {
        console.error("Error fetching news:", error)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchNewsItem()
    }
  }, [id])

  // Determine news type (Event or News)
  const getNewsType = (item) => {
    if (!item) return "News"
    // This is a placeholder logic - adjust based on your actual data structure
    if (item.title?.toLowerCase().includes("event") || item.content?.toLowerCase().includes("event")) {
      return "Event"
    }
    return "News"
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl text-center">
        <h2 className="text-2xl font-bold">Loading...</h2>
      </div>
    )
  }

  if (error || !newsItem) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl text-center">
        <h2 className="text-2xl font-bold">Error Loading News</h2>
        <p className="mt-4">Sorry, we couldn't load the news article. Please try again later.</p>
      </div>
    )
  }

  return (
    <div className="bg-white py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-6">
          <Link href="/news" className="text-[#2b6ca3] hover:underline flex items-center">
            ← Back to News
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="relative">
            <div className="absolute top-4 left-4 bg-[#2b6ca3] text-white text-sm px-3 py-1 rounded">
              {getNewsType(newsItem)}
            </div>
            {newsItem.image && (
              <img
                src={newsItem.image || "/placeholder.svg"}
                alt={newsItem.title}
                className="w-full h-64 md:h-80 object-cover"
                loading="eager"
              />
            )}
          </div>

          <div className="p-6">
            <h1 className="text-3xl font-bold text-[#2b6ca3] mb-4">{newsItem.title}</h1>

            {newsItem.published_date && (
              <p className="text-gray-500 mb-6">
                {new Date(newsItem.published_date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            )}

            <div className="prose max-w-none">
              {newsItem.summary && <p className="text-lg mb-6 font-medium">{newsItem.summary}</p>}

              {newsItem.content && <div dangerouslySetInnerHTML={{ __html: newsItem.content }} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
