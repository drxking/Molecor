"use client";

import { motion } from "framer-motion";
import { Lock, RefreshCw, Settings, PieChart } from "lucide-react";
import Image from "next/image";

const features = [
  {
    icon: <Lock className="w-12 h-12 text-white" />,
    title: "Safety and reliability",
    description:
      "The technology developed by Molecor meets the requirements of various international standards.",
  },
  {
    icon: <RefreshCw className="w-12 h-12 text-white" />,
    title: "Flexibility and compatibility",
    description:
      "The system is designed to work in-line with the extruder or in batches; small batches can be produced if necessary.",
  },
  {
    icon: <Settings className="w-12 h-12 text-white" />,
    title: "Efficiency and productivity",
    description:
      "Development of an industrially viable, efficient, sustainable technology that is compatible with conventional PVC pipe installations.",
  },
  {
    icon: <PieChart className="w-12 h-12 text-white" />,
    title: "Savings and profitability",
    description:
      "Manufacture of PVC-O pipes and fittings with the highest degree of orientation, Class 500, achieving exceptional physical and mechanical properties.",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function FeaturesSection() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://i.ibb.co/BHh9fbL2/fondo-caracteristicas-maquina.jpg"
          alt="Manufacturing facility background"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-primary/80 mix-blend-multiply" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 dm-serif-text">
            Features of the technology
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto roboto-text">
            Breaking technological barriers
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={item}
              className="flex flex-col items-center text-center"
            >
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                className="relative w-24 h-24 rounded-full bg-primary border-2 border-accent flex items-center justify-center mb-6 shadow-lg"
              >
                {feature.icon}
                <div className="absolute inset-0 rounded-full border-2 border-accent/50 animate-ping opacity-75" />
              </motion.div>
              <h3 className="text-2xl font-bold text-white mb-3 dm-serif-text">
                {feature.title}
              </h3>
              <p className="text-white/80 roboto-text">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
