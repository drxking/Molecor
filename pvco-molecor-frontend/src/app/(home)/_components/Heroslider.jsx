"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const slides = [
  {
    id: 1,
    title: "Innovative PVC-O Pipe Solutions",
    subtitle: "More Efficient. More Sustainable.",
    description:
      "Discover our range of PVC-O pipes and fittings that set new standards for quality and durability in water management systems.",
    background: "from-primary/90 to-primary",
    buttonText: "Explore Products",
    buttonLink: "/products",
    image: "https://i.ibb.co/SDtgm64J/garancia-50-a-os.jpg",
    imageAlt: "PVC-O pipes installation",
  },
  {
    id: 2,
    title: "World-Leading Technology",
    subtitle: "Molecor's Innovative Manufacturing Process",
    description:
      "Our patented technology for PVC-O pipe manufacturing delivers unparalleled quality and performance.",
    background: "from-primary to-primary-dark",
    buttonText: "Discover Our Technology",
    buttonLink: "/technology",
    image: "https://i.ibb.co/CDvcN7Z/Sanecor.jpg",
    imageAlt: "Molecor manufacturing technology",
  },
  {
    id: 3,
    title: "Sustainable Water Management",
    subtitle: "Environmental Responsibility",
    description:
      "Join us in our commitment to responsible water management solutions that protect our planet's most precious resource.",
    background: "from-primary-dark via-primary to-primary/80",
    buttonText: "Learn About Sustainability",
    buttonLink: "/sustainability",
    image: "https://i.ibb.co/Jw0WX1SX/Sostenibilidad-Molecor-EN-2.jpg",
    imageAlt: "Sustainable water management system",
  },
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      goToNextSlide();
    }, 7000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  const goToNextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToPrevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <div className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000",
            currentSlide === index ? "opacity-100 z-10" : "opacity-0 z-0"
          )}
        >
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <Image
              src={slide.image || "/placeholder.svg"}
              alt={slide.imageAlt}
              fill
              priority={index === 0}
              className="object-cover"
              sizes="100vw"
              onError={(e) => {
                const target = e.target;
                target.src = `/placeholder.svg?height=700&width=1920&text=${encodeURIComponent(
                  slide.title
                )}`;
              }}
            />
            <div
              className={cn(
                "absolute inset-0 bg-gradient-to-r opacity-85",
                slide.background
              )}
            />
          </div>

          {/* Content */}
          <div className="relative z-10 h-full flex items-center">
            <div className="container mx-auto px-4 md:px-6">
              <div className="max-w-3xl text-white p-6 md:p-10 bg-black/20 backdrop-blur-sm rounded-lg">
                {slide.subtitle && (
                  <p className="text-lg md:text-xl mb-2 font-light roboto-text text-accent">
                    {slide.subtitle}
                  </p>
                )}
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 dm-serif-text">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl mb-6 opacity-90 roboto-text">
                  {slide.description}
                </p>
                <Link href={slide.buttonLink}>
                  <Button
                    size="lg"
                    className="bg-accent text-primary hover:bg-white hover:text-primary-dark transition-all duration-300 roboto-text font-medium shadow-lg"
                  >
                    {slide.buttonText}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/20 hover:bg-accent/90 text-white hover:text-primary rounded-full p-3 transition-all duration-300 backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={goToNextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/20 hover:bg-accent/90 text-white hover:text-primary rounded-full p-3 transition-all duration-300 backdrop-blur-sm"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={cn(
              "w-3 h-3 rounded-full transition-all duration-300",
              currentSlide === index
                ? "bg-accent scale-125 w-10"
                : "bg-white/50 hover:bg-white/70"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
