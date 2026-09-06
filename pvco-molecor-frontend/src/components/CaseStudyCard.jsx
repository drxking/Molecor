"use client"

import Link from "next/link"
import { useState } from "react"

export default function CaseStudyCard({ study }) {
  const [imageError, setImageError] = useState(false)

  // Check if study has all required properties
  if (!study) {
    console.error("Invalid case study data:", study)
    return null
  }

  // Use slug if available, otherwise use ID (as fallback)
  const linkPath = study.slug ? `/case-studies/${study.slug}` : `/case-studies/${study.id}`

  // Process image URL - handle image_url property
  let imageUrl = "/placeholder.svg?height=300&width=400"

  if (study.images && study.images.length > 0) {
    // Check if image_url exists (from your API) or image (from previous code)
    const imageField = study.images[0].image_url || study.images[0].image

    if (imageField && !imageError) {
      imageUrl = imageField
    }
  }

  return (
    <Link href={linkPath}>
      <div className="cursor-pointer transition-transform hover:scale-105">
        <div className="bg-white p-1 border border-gray-200 shadow-sm">
          <div className="h-64 overflow-hidden">
            <img
              src={imageUrl || "/placeholder.svg"}
              alt={study.title}
              className="w-full h-full object-cover"
              loading="lazy"
              onError={() => setImageError(true)}
            />
          </div>
        </div>
        <div className="mt-3 text-center px-4">
          <h3 className="text-[#2b6ca3] font-medium text-lg leading-tight">{study.title}</h3>
        </div>
      </div>
    </Link>
  )
}
