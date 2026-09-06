"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-accent/10 rounded-bl-full -z-10" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-primary/5 rounded-tr-full -z-10" />

      <div className="container max-w-7xl px-4 mx-auto">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="inline-block mb-2">
              <motion.div
                className="bg-accent/20 text-primary font-medium px-4 py-1 rounded-full roboto-text"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                About Us
              </motion.div>
            </div>

            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6 dm-serif-text leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Pioneering Water Management Solutions
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <p className="text-gray-600 mb-6 roboto-text text-lg">
                Molecor is a leading company specialized in the development of
                state-of-the-art technology for the manufacture of Molecular
                Oriented PVC (PVC-O) pipes for water conveyance.
              </p>
              <p className="text-gray-600 mb-8 roboto-text text-lg">
                We combine innovation, commitment to sustainability, and
                technological excellence to provide reliable and efficient
                solutions for water management around the world.
              </p>
            </motion.div>

            <motion.div
              className="space-y-4 mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
            >
              {[
                "Patented technology for PVC-O pipe manufacturing",
                "Highest quality standards and international certifications",
                "Commitment to sustainability and environmental protection",
                "Global presence with projects in over 30 countries",
              ].map((item, index) => (
                <motion.div
                  className="flex items-start gap-3 group"
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 5 }}
                >
                  <div className="bg-accent/20 rounded-full p-1 group-hover:bg-accent transition-colors duration-300">
                    <CheckCircle className="h-5 w-5 text-primary group-hover:text-primary-dark transition-colors duration-300" />
                  </div>
                  <p className="text-gray-700 roboto-text">{item}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
              viewport={{ once: true }}
            >
              <Button
                className="bg-primary hover:bg-primary-dark text-white group transition-all duration-300 shadow-lg hover:shadow-xl"
                size="lg"
              >
                Learn More About Us
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Image Column */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Decorative elements */}
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-accent/20 rounded-lg -z-10" />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-lg -z-10" />

            <div className="relative rounded-lg overflow-hidden shadow-2xl">
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 to-transparent z-10" />

              <Image
                src="https://i.ibb.co/1GgSjbsM/quienes-somos.jpg"
                alt="About Molecor"
                width={800}
                height={600}
                className="w-full h-full object-cover"
              />

              {/* Stats overlay */}
              <motion.div
                className="absolute bottom-0 right-0 bg-white/90 backdrop-blur-sm p-4 md:p-6 rounded-tl-lg shadow-lg z-20"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="flex gap-6">
                  <div className="text-center">
                    <p className="text-3xl md:text-4xl font-bold text-primary dm-serif-text">
                      30+
                    </p>
                    <p className="text-sm text-gray-600 roboto-text">
                      Countries
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl md:text-4xl font-bold text-primary dm-serif-text">
                      15+
                    </p>
                    <p className="text-sm text-gray-600 roboto-text">
                      Years Experience
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
