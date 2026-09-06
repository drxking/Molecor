"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function CaseStudiesPage() {
  const [caseStudies, setCaseStudies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const router = useRouter()

  useEffect(() => {
    async function fetchCaseStudies() {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"
        const res = await fetch(`${apiUrl}/case-studies/`)

        if (!res.ok) throw new Error(`Failed to fetch case studies (Status: ${res.status})`)

        const data = await res.json()
        console.log("Case studies from API:", data)
        setCaseStudies(data)
      } catch (error) {
        console.error("Fetch error:", error)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchCaseStudies()
  }, [])

  const handleCaseStudyClick = (slug) => {
    router.push(`/case-studies/${slug}`)
  }

  if (loading) {
    return (
      <div className="bg-[#e8f0f7] py-12 min-h-screen">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center text-[#2b6ca3] mb-12">Case studies</h1>
          <div className="flex justify-center">
            <div className="animate-pulse">Loading case studies...</div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-[#e8f0f7] py-12 min-h-screen">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center text-[#2b6ca3] mb-12">Case studies</h1>
          <div className="text-center text-red-500">
            <p>Error loading case studies: {error}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#e8f0f7] py-12 min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-[#2b6ca3] mb-12">Case studies</h1>

        {caseStudies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((study) => {
              // Get image URL from either image_url or image property or first image in images array
              let imageUrl = "/placeholder.svg?height=300&width=400"

              if (study.images && study.images.length > 0) {
                const imageField = study.images[0].image_url || study.images[0].image
                if (imageField) {
                  imageUrl = imageField
                }
              }

              return (
                <div
                  key={study.id}
                  className="cursor-pointer transition-transform hover:scale-105"
                  onClick={() => handleCaseStudyClick(study.slug || study.id)}
                >
                  <div className="bg-white p-1 border border-gray-200 shadow-sm">
                    <div className="h-64 overflow-hidden">
                      <img
                        src={imageUrl || "/placeholder.svg"}
                        alt={study.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="mt-3 text-center px-4">
                    <h3 className="text-[#2b6ca3] font-medium text-lg leading-tight">{study.title}</h3>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No case studies available</p>
          </div>
        )}
      </div>
    </div>
  )
}
