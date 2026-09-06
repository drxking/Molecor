"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown, Phone } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const menuItems = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Company",
    path: "/company",
    submenu: [
      { label: "About Us", path: "/about" },
      { label: "History", path: "/history" },
      { label: "Quality", path: "/quality" },
    ],
  },
  {
    label: "Products",
    path: "/products",
    submenu: [
      { label: "PVC-O Pipes", path: "/products/pvc-o-pipes" },
      { label: "PVC-O Fittings", path: "/products/pvc-o-fittings" },
    ],
  },
  {
    label: "News",
    path: "/news", // Direct link to news page
  },
  {
    label: "Case Studies", // New case studies link
    path: "/case-studies",
  },
  {
    label: "Contact",
    path: "/contact",
  },
]

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openSubmenu, setOpenSubmenu] = useState(null)
  const [logoError, setLogoError] = useState(false)
  const [mobileLogoError, setMobileLogoError] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const toggleSubmenu = (label) => {
    if (openSubmenu === label) {
      setOpenSubmenu(null)
    } else {
      setOpenSubmenu(label)
    }
  }

  return (
    <header
      className={cn(
        "sticky top-0 left-0 right-0 z-40 transition-all duration-300",
        isScrolled ? "bg-white shadow-lg py-2" : "bg-[#2b6ca3] py-3 md:py-4",
      )}
    >
      <div className="container max-w-7xl mx-auto px-2">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            {logoError ? (
              <div className="h-8 md:h-10 lg:h-12 bg-gray-200 flex items-center justify-center px-4 text-gray-500">
                Molecor
              </div>
            ) : (
              <img
                src="/logo_molecor.png"
                alt="Molecor Logo"
                className={cn(
                  "h-8 md:h-10 lg:h-12 transition-all duration-300",
                  isScrolled ? "" : "brightness-0 invert",
                )}
                onError={() => setLogoError(true)}
              />
            )}
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6">
            {menuItems.map((item) => (
              <div key={item.label} className="relative group">
                {item.submenu ? (
                  <button
                    className={cn(
                      "flex items-center px-2 py-2 dm-serif-text",
                      "font-medium transition-colors duration-200",
                      isScrolled ? "text-[#2b6ca3] hover:text-[#1d4e78]" : "text-white hover:text-white/80",
                    )}
                    onClick={() => toggleSubmenu(item.label)}
                  >
                    {item.label}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                ) : (
                  <Link
                    href={item.path}
                    className={cn(
                      "px-2 py-2 dm-serif-text",
                      "font-medium transition-colors duration-200",
                      isScrolled ? "text-[#2b6ca3] hover:text-[#1d4e78]" : "text-white hover:text-white/80",
                    )}
                  >
                    {item.label}
                  </Link>
                )}

                {item.submenu && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-white shadow-lg rounded-md overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border-t-2 border-[#2b6ca3] z-50">
                    {item.submenu.map((subitem) => (
                      <Link
                        key={subitem.label}
                        href={subitem.path}
                        className="block px-4 py-3 text-[#2b6ca3] hover:bg-[#2b6ca3] hover:text-white transition-colors duration-200 roboto-text"
                      >
                        {subitem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <Button
              variant={isScrolled ? "default" : "secondary"}
              className={cn(
                "roboto-text font-medium bg-white text-[#2b6ca3] hover:bg-gray-100 hover:text-[#1d4e78] focus:ring-2 focus:ring-white focus:ring-offset-2 transition-all",
              )}
            >
              Get a Quote
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className={cn(
              "lg:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white",
              isScrolled ? "text-[#2b6ca3]" : "text-white",
            )}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden overflow-y-auto",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#2b6ca3]/10">
          <Link href="/" className="flex items-center">
            {mobileLogoError ? (
              <div className="h-8 bg-gray-200 flex items-center justify-center px-4 text-gray-500">Molecor</div>
            ) : (
              <img
                src="/logo_molecor.png"
                alt="Molecor Logo"
                className="h-8"
                onError={() => setMobileLogoError(true)}
              />
            )}
          </Link>
          <button onClick={() => setMobileMenuOpen(false)}>
            <X size={24} className="text-[#2b6ca3]" />
          </button>
        </div>
        <nav className="px-6 py-4">
          {menuItems.map((item) => (
            <div key={item.label} className="py-2">
              {item.submenu ? (
                <>
                  <button
                    className="flex items-center justify-between w-full text-[#2b6ca3] hover:text-[#1d4e78] py-2 dm-serif-text"
                    onClick={() => toggleSubmenu(item.label)}
                  >
                    <span className="font-medium">{item.label}</span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform duration-200",
                        openSubmenu === item.label ? "rotate-180" : "",
                      )}
                    />
                  </button>
                  {openSubmenu === item.label && (
                    <div className="pl-4 mt-1 border-l-2 border-[#2b6ca3]">
                      {item.submenu.map((subitem) => (
                        <Link
                          key={subitem.label}
                          href={subitem.path}
                          className="block py-2 text-[#1d4e78] hover:text-[#2b6ca3] roboto-text"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {subitem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.path}
                  className="block text-[#2b6ca3] hover:text-[#1d4e78] py-2 font-medium dm-serif-text"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
          <div className="mt-6 space-y-4">
            <div className="flex items-center space-x-3 text-[#1d4e78] roboto-text">
              <Phone size={16} />
              <span>+1 (800) 123-4567</span>
            </div>
            <Button
              className="w-full bg-[#2b6ca3] text-white hover:bg-[#1d4e78] roboto-text font-medium transition-all focus:ring-2 focus:ring-[#2b6ca3] focus:ring-offset-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Get a Quote
            </Button>
          </div>
        </nav>
      </div>

      {/* Overlay for mobile menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setMobileMenuOpen(false)} />
      )}
    </header>
  )
}

export default Header

