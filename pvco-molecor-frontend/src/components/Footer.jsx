"use client"

import Link from "next/link"
import { Facebook, Twitter, Linkedin, Youtube, Instagram, Mail, Phone, MapPin, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"

export default function Footer() {
  const [logoError, setLogoError] = useState(false)

  return (
    <footer className="relative">
      <div className="bg-[#2b6ca3] text-white py-8">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Logo and Description */}
            <div>
              {logoError ? (
                <div className="h-12 mb-6 bg-[#1d4e78] flex items-center justify-center px-4 text-white">Molecor</div>
              ) : (
                <img
                  src="/logo_molecor.png"
                  alt="Molecor Logo"
                  className="h-12 mb-6 brightness-0 invert"
                  onError={() => setLogoError(true)}
                />
              )}
              <p className="max-w-md mb-6 text-white/90 roboto-text leading-relaxed">
                Molecor is a leading company specialized in the development of state-of-the-art technology for the
                manufacture of Molecular Oriented PVC (PVC-O) pipes for water conveyance.
              </p>
              <div className="flex space-x-4">
                {[Facebook, Twitter, Linkedin, Youtube, Instagram].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-white transition-colors bg-white/10 p-2 rounded-full"
                    aria-label={Icon.name}
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-xl mb-6 playfair-text text-white">Quick Links</h3>
              <ul className="space-y-3 text-white/90">
                {[
                  { label: "Home", href: "/" },
                  { label: "About Us", href: "/about" },
                  { label: "Products", href: "/products" },
                  { label: "News", href: "/news" },
                  { label: "Case Studies", href: "/case-studies" },
                  { label: "Contact", href: "/contact" },
                ].map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="hover:text-white/70 transition-colors flex items-center group roboto-text"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Product Links */}
            <div>
              <h3 className="font-semibold text-xl mb-6 playfair-text text-white">Products</h3>
              <ul className="space-y-3 text-white/90">
                {[
                  { label: "PVC-O Pipes", href: "/products/pvc-o-pipes" },
                  {
                    label: "PVC-O Fittings",
                    href: "/products/pvc-o-fittings",
                  },
                  {
                    label: "Molecor Technology",
                    href: "/products/technology",
                  },
                  { label: "Downloads", href: "/downloads" },
                  { label: "Quality", href: "/quality" },
                ].map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="hover:text-white/70 transition-colors flex items-center group roboto-text"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact & Newsletter */}
            <div>
              <h3 className="font-semibold text-xl mb-6 playfair-text text-white">Get In Touch</h3>
              <div className="space-y-4 roboto-text text-white/90">
                <div className="flex items-start space-x-3">
                  <MapPin className="text-white mt-1" size={18} />
                  <p>123 Business Avenue, Industrial Park, New York, NY 10001</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="text-white" size={18} />
                  <p>+1 (800) 123-4567</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="text-white" size={18} />
                  <p>info@molecor.com</p>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-medium mb-3 dm-serif-text text-white">Subscribe to Newsletter</h4>
                <div className="flex">
                  <Input
                    type="email"
                    placeholder="Your email"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-r-none focus-visible:ring-white"
                  />
                  <Button variant="default" size="icon" className="bg-white hover:bg-white/90 rounded-l-none">
                    <Send size={18} className="text-[#2b6ca3]" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <Separator className="bg-white/20 my-8" />

          <div className="flex flex-col md:flex-row justify-between items-center text-white/70 text-sm roboto-text">
            <p>© {new Date().getFullYear()} Molecor. All rights reserved.</p>
            <p>
              Designed & Developed by{" "}
              <a
                href="https://your-portfolio.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:underline"
              >
                P
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
