"use client"

import { useEffect, useState } from "react"

export default function NewsPage() {
  const [newsItems, setNewsItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [expandedItems, setExpandedItems] = useState({})

  useEffect(() => {
    async function fetchNews() {
      try {
        setLoading(true)
        const response = await fetch("http://127.0.0.1:8000/api/news/", {
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

  const toggleExpand = (id) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Latest News</h1>
        <p className="text-center text-gray-600">Loading news...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Latest News</h1>
        <p className="text-center text-gray-600">Error loading news. Please try again later.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Latest News</h1>

      {newsItems.length === 0 ? (
        <p className="text-center text-gray-600">No news available.</p>
      ) : (
        newsItems.map((item) => (
          <div key={item.id} className="mb-10 border-b pb-6">
            <h2 className="text-2xl font-semibold mb-2">{item.title}</h2>

            {item.published_date && (
              <p className="text-gray-500 mb-2 text-sm">
                {new Date(item.published_date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            )}

            {item.image && (
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.title}
                className="w-full h-64 object-cover mb-4 rounded-lg"
                loading="lazy"
              />
            )}

            <div className="prose max-w-none">
              {expandedItems[item.id] ? (
                <>
                  {item.content ? (
                    <div dangerouslySetInnerHTML={{ __html: item.content }} />
                  ) : (
                    <p>{item.summary || "No content available."}</p>
                  )}
                  <button
                    onClick={() => toggleExpand(item.id)}
                    className="mt-2 text-blue-600 hover:underline font-medium cursor-pointer"
                  >
                    Show Less ↑
                  </button>
                </>
              ) : (
                <>
                  <p className="text-gray-700">{item.summary?.substring(0, 150) || "No summary available."}...</p>
                  <button
                    onClick={() => toggleExpand(item.id)}
                    className="mt-2 text-blue-600 hover:underline font-medium cursor-pointer"
                  >
                    Read More ↓
                  </button>
                </>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  )
}
