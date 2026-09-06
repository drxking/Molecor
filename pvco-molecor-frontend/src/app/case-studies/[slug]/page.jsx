"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"

export default function CaseStudyDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [study, setStudy] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchCaseStudy() {
      if (!params.slug) return

      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"
        console.log(`Fetching case study from: ${apiUrl}/case-studies/${params.slug}/`)

        const res = await fetch(`${apiUrl}/case-studies/${params.slug}/`)

        if (res.status === 404) {
          console.log(`Case study not found for slug: ${params.slug}`)
          router.push("/404")
          return
        }

        if (!res.ok) {
          throw new Error(`Failed to fetch case study (Status: ${res.status})`)
        }

        const data = await res.json()
        console.log(`Case study data received:`, data)
        setStudy(data)
      } catch (error) {
        console.error(`Fetch error for slug ${params.slug}:`, error)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchCaseStudy()
  }, [params.slug, router])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold">Loading case study...</h2>
        </div>
      </div>
    )
  }

  if (error || !study) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold">Error Loading Case Study</h2>
          <p className="mt-4">Sorry, we couldn't load the case study. Please try again later.</p>
          <Link href="/case-studies" className="mt-6 inline-block text-blue-600 hover:underline">
            ← Back to Case Studies
          </Link>
        </div>
      </div>
    )
  }

  const featuredImage = study.images?.find((img) => img.is_featured) || study.images?.[0]
  const otherImages = study.images?.filter((img) => !img.is_featured) || []

  // Get image URL from either image_url or image property
  const getImageUrl = (imageObj) => {
    if (!imageObj) return null
    return imageObj.image_url || imageObj.image || null
  }

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Link href="/case-studies" className="text-blue-600 hover:underline flex items-center">
              ← Back to Case Studies
            </Link>
          </div>

          <article className="bg-white rounded-lg shadow-md overflow-hidden">
            {featuredImage && getImageUrl(featuredImage) && (
              <div className="h-64 md:h-80 overflow-hidden relative">
                <img
                  src={getImageUrl(featuredImage) || "/placeholder.svg"}
                  alt={featuredImage.caption || study.title}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
            )}

            <div className="p-6 md:p-8 border-b">
              <div className="flex flex-wrap gap-2 mb-4">
                {study.category_display && (
                  <span className="inline-block px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
                    {study.category_display}
                  </span>
                )}
                {study.water_application_display && (
                  <span className="inline-block px-3 py-1 text-sm font-medium bg-gray-100 text-gray-800 rounded-full">
                    {study.water_application_display}
                  </span>
                )}
                {study.year && (
                  <span className="inline-block px-3 py-1 text-sm font-medium bg-gray-100 text-gray-800 rounded-full">
                    {study.year}
                  </span>
                )}
              </div>

              <h1 className="text-3xl font-bold mb-2">{study.title}</h1>

              {(study.location || study.region) && (
                <p className="text-gray-600 mb-4">
                  <svg className="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  {study.location || study.region}
                </p>
              )}
            </div>

            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Project Details</h3>
                  <ul className="space-y-2">
                    {study.constructor && (
                      <li>
                        <span className="font-medium">Constructor:</span> {study.constructor}
                      </li>
                    )}
                    {study.promoter && (
                      <li>
                        <span className="font-medium">Promoter:</span> {study.promoter}
                      </li>
                    )}
                    {study.total_length && (
                      <li>
                        <span className="font-medium">Total Length:</span> {study.total_length} m
                      </li>
                    )}
                    {study.value && (
                      <li>
                        <span className="font-medium">Project Value:</span> {study.value}
                      </li>
                    )}
                    {study.completion_date && (
                      <li>
                        <span className="font-medium">Completion Date:</span>{" "}
                        {new Date(study.completion_date).toLocaleDateString()}
                      </li>
                    )}
                  </ul>
                </div>

                {study.specifications && study.specifications.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Specifications</h3>
                    <ul className="space-y-2">
                      {study.specifications.map((spec, index) => (
                        <li key={index}>
                          <span className="font-medium">{spec.key}:</span> {spec.value}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="prose max-w-none mb-8">
                {study.content.split("\n\n").map((paragraph, i) => (
                  <p key={i} className="mb-4 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>

              {otherImages.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4">Project Gallery</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {otherImages.map((image, index) => {
                      const imgUrl = getImageUrl(image)
                      if (!imgUrl) return null

                      return (
                        <div key={image.id || index} className="rounded-lg overflow-hidden">
                          <img
                            src={imgUrl || "/placeholder.svg"}
                            alt={image.caption || `${study.title} project image`}
                            className="w-full h-48 object-cover"
                            loading="lazy"
                          />
                          {image.caption && <p className="text-sm text-gray-600 mt-2">{image.caption}</p>}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {study.testimonial && (
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <blockquote className="text-lg italic text-gray-700 mb-4">"{study.testimonial}"</blockquote>
                  {study.testimonial_author && (
                    <p className="font-medium text-gray-800">— {study.testimonial_author}</p>
                  )}
                </div>
              )}
            </div>
          </article>
        </div>
      </div>
    </div>
  )
}
