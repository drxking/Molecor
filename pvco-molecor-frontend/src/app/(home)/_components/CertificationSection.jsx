"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, Award, Shield, CheckCircle2 } from "lucide-react";
import { useState } from "react";

// Certification data
const certifications = [
  {
    id: 1,
    image: "https://i.ibb.co/8DRM0zZQ/AENOR-GESTION-CALIDAD.png",
    alt: "AENOR ISO 9001 Certification",
    code: "ER-1644/2008",
    description: "Quality Management",
    standard: "ISO 9001",
    icon: <Shield className="h-5 w-5 text-primary" />,
  },
  {
    id: 2,
    image: "https://i.ibb.co/7N2hJynh/AENOR-GESTION-AMBIENTAL.png",
    alt: "AENOR ISO 14001 Certification",
    code: "GA-2014/0250",
    description: "Environmental Management",
    standard: "ISO 14001",
    icon: <CheckCircle2 className="h-5 w-5 text-green-600" />,
  },
  {
    id: 3,
    image: "https://i.ibb.co/RTH6wkc1/aenor-gestion-calidad.png",
    alt: "AENOR ISO 9001 Certification",
    code: "ER-0440/1996",
    description: "Quality Management",
    standard: "ISO 9001",
    icon: <Shield className="h-5 w-5 text-primary" />,
  },
  {
    id: 4,
    image: "https://i.ibb.co/C5B80Ng7/certificado-gestion-ambiental.png",
    alt: "AENOR ISO 14001 Certification",
    code: "GA-2001/0255",
    description: "Environmental Management",
    standard: "ISO 14001",
    icon: <CheckCircle2 className="h-5 w-5 text-green-600" />,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function CertificationsSection() {
  const [hoveredCert, setHoveredCert] = useState(null);

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-gray-50 -z-10" />
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-bl-full -z-10" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-accent/10 rounded-tr-full -z-10" />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-2">
            <div className="bg-primary/10 text-primary font-medium px-4 py-1 rounded-full roboto-text">
              Certifications
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4 dm-serif-text">
            Some of our certifications
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto roboto-text">
            Our commitment to quality and environmental responsibility is backed
            by internationally recognized certifications.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-16"
        >
          {certifications.map((cert) => (
            <motion.div
              key={cert.id}
              variants={item}
              whileHover={{
                y: -8,
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              onMouseEnter={() => setHoveredCert(cert.id)}
              onMouseLeave={() => setHoveredCert(null)}
              className="bg-white cursor-pointer rounded-lg p-6 shadow-md transition-all duration-300 flex flex-col items-center relative overflow-hidden group"
            >
              {/* Animated background on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 transform transition-transform duration-500 ease-out ${
                  hoveredCert === cert.id ? "scale-100" : "scale-0"
                }`}
              />

              {/* Top accent line */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 ${
                  cert.standard === "ISO 9001" ? "bg-primary" : "bg-green-500"
                }`}
              />

              <div className="relative h-28 w-full mb-4 flex items-center justify-center">
                <div className="bg-white p-2 rounded-lg shadow-md">
                  <Image
                    src={cert.image}
                    alt={cert.alt}
                    width={100}
                    height={100}
                    className="object-contain"
                  />
                </div>
              </div>

              <div className="flex items-center justify-center mb-2 space-x-2">
                {cert.icon}
                <p className="font-bold text-gray-800 dm-serif-text">
                  {cert.standard}
                </p>
              </div>

              <p className="font-medium text-primary text-center roboto-text">
                {cert.description}
              </p>
              <p className="text-sm text-gray-500 mt-1 text-center roboto-text">
                {cert.code}
              </p>

              {/* Animated badge */}
              <motion.div
                className="absolute top-3 right-3 bg-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ rotate: -20, scale: 0.8 }}
                animate={
                  hoveredCert === cert.id
                    ? { rotate: 0, scale: 1 }
                    : { rotate: -20, scale: 0.8 }
                }
                transition={{ duration: 0.3 }}
              >
                <Award className="h-4 w-4 text-accent" />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="bg-white rounded-lg shadow-xl overflow-hidden"
        >
          <div className="p-5 bg-gradient-to-r from-primary to-primary-dark text-white">
            <div className="flex items-center">
              <MapPin className="h-6 w-6 mr-3" />
              <h3 className="text-xl font-semibold dm-serif-text">
                Molecor Tecnología S.L.
              </h3>
            </div>
            <p className="text-sm mt-1 ml-9 roboto-text">
              Carretera M-206, Km 18.200, 28330 San Martín de la Vega, Madrid,
              Spain
            </p>
          </div>

          <div className="h-[400px] w-full relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3041.1751120352193!2d-3.5683908!3d40.3287939!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd422a49c8d4e0e9%3A0xac5dd5550c01a1e3!2sMolecor!5e0!3m2!1sen!2sus!4v1651234567890!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Molecor Location"
              className="absolute inset-0"
            ></iframe>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
