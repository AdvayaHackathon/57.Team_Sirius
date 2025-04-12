"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface Banner {
  id: number
  title: string
  image_url: string
  link: string | null
  section: string
}

interface ImageSliderProps {
  section: string
  className?: string
  autoplay?: boolean
  interval?: number
}

export function ImageSlider({ section, className, autoplay = true, interval = 5000 }: ImageSliderProps) {
  const [banners, setBanners] = useState<Banner[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBanners = async () => {
      const supabase = getSupabaseBrowserClient()
      const { data, error } = await supabase
        .from("banner_images")
        .select("*")
        .eq("section", section)
        .eq("is_active", true)
        .order("display_order")

      if (error) {
        console.error("Error fetching banners:", error)
        return
      }

      setBanners(data || [])
      setLoading(false)
    }

    fetchBanners()
  }, [section])

  useEffect(() => {
    if (!autoplay || banners.length <= 1) return

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length)
    }, interval)

    return () => clearInterval(timer)
  }, [autoplay, banners.length, interval])

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? banners.length - 1 : prevIndex - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length)
  }

  if (loading) {
    return <div className={cn("w-full h-64 bg-muted animate-pulse rounded-lg", className)} />
  }

  if (banners.length === 0) {
    return (
      <div className={cn("w-full h-64 bg-muted flex items-center justify-center rounded-lg", className)}>
        <p className="text-muted-foreground">No banners available</p>
      </div>
    )
  }

  return (
    <div className={cn("relative w-full overflow-hidden rounded-lg", className)}>
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {banners.map((banner) => (
          <div key={banner.id} className="w-full flex-shrink-0">
            {banner.link ? (
              <Link href={banner.link} className="block w-full h-full">
                <Image
                  src={banner.image_url || "/placeholder.svg?height=400&width=800"}
                  alt={banner.title}
                  width={800}
                  height={400}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-white font-semibold">{banner.title}</h3>
                </div>
              </Link>
            ) : (
              <>
                <Image
                  src={banner.image_url || "/placeholder.svg?height=400&width=800"}
                  alt={banner.title}
                  width={800}
                  height={400}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-white font-semibold">{banner.title}</h3>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {banners.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 text-white hover:bg-black/50 rounded-full"
            onClick={goToPrevious}
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 text-white hover:bg-black/50 rounded-full"
            onClick={goToNext}
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {banners.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "w-2 h-2 rounded-full transition-all",
                  index === currentIndex ? "bg-white scale-125" : "bg-white/50",
                )}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
