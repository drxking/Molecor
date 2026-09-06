// "use client";

// import { motion } from "framer-motion";
// import { Clock, LineChart, BarChart3, Globe } from "lucide-react";
// import Image from "next/image";

// const highlights = [
//   {
//     icon: <Clock className="w-10 h-10 text-white" />,
//     title: "Durability",
//     description:
//       "With a lifespan of over 100 years, PVC-O pipes and fittings are the most durable solution for transporting pressurized water.",
//   },
//   {
//     icon: <LineChart className="w-10 h-10 text-white" />,
//     title: "Versatility and efficiency",
//     description:
//       "TOM® and ecoFITTOM® can be used in a wide variety of applications thanks to their wide range of diameters and pressures. They are also lightweight and easy to install.",
//   },
//   {
//     icon: <BarChart3 className="w-10 h-10 text-white" />,
//     title: "Practical advantages",
//     description:
//       "These PVC-O pipes and fittings provide the highest installation performance in meters/hour compared to other solutions, resulting in significant installation savings.",
//   },
//   {
//     icon: <Globe className="w-10 h-10 text-white" />,
//     title: "Recyclable and sustainable",
//     description:
//       "They are 100% recyclable products and have the lowest environmental impact, contributing to the planet's sustainable development.",
//   },
// ];

// const container = {
//   hidden: { opacity: 0 },
//   show: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.15,
//     },
//   },
// };

// const item = {
//   hidden: { opacity: 0, y: 30 },
//   show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
// };

// export default function HighlightsSection() {
//   return (
//     <section className="relative py-24 overflow-hidden">
//       {/* Background Image with Overlay */}
//       <div className="absolute inset-0 z-0">
//         <Image
//           src="https://i.ibb.co/TxJyS7Fz/fondo-destacamos.jpg"
//           alt="PVC pipes background"
//           fill
//           className="object-cover"
//           sizes="100vw"
//         />
//         <div className="absolute inset-0 bg-white/90" />
//       </div>

//       <div className="container relative z-10 mx-auto px-4 sm:px-6">
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           viewport={{ once: true, margin: "-100px" }}
//           className="text-center mb-16"
//         >
//           <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-4 dm-serif-text">
//             We highlight
//           </h2>
//           <p className="text-xl text-gray-700 max-w-3xl mx-auto roboto-text">
//             <span className="text-primary font-medium">
//               Continuous innovation
//             </span>{" "}
//             and{" "}
//             <span className="text-primary font-medium">quality assurance</span>.
//             The latest technology for pipe manufacturing.
//           </p>
//         </motion.div>

//         <motion.div
//           variants={container}
//           initial="hidden"
//           whileInView="show"
//           viewport={{ once: true, margin: "-100px" }}
//           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
//         >
//           {highlights.map((highlight, index) => (
//             <motion.div
//               key={index}
//               variants={item}
//               whileHover={{
//                 y: -10,
//                 boxShadow:
//                   "0 20px 25px -5px rgba(0, 90, 135, 0.1), 0 10px 10px -5px rgba(0, 90, 135, 0.04)",
//               }}
//               className="bg-white rounded-lg p-6 transition-all duration-300 shadow-lg hover:shadow-xl"
//             >
//               <div className="bg-primary rounded-lg w-16 h-16 flex items-center justify-center mb-6 mx-auto">
//                 {highlight.icon}
//               </div>
//               <h3 className="text-xl font-bold text-primary mb-3 text-center dm-serif-text">
//                 {highlight.title}
//               </h3>
//               <p className="text-gray-600 text-center roboto-text">
//                 {highlight.description}
//               </p>
//             </motion.div>
//           ))}
//         </motion.div>
//       </div>
//     </section>
//   );
// }

"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Clock, LineChart, BarChart3, Globe } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

const highlights = [
  {
    icon: (
      <Clock className="w-10 h-10 group-hover:text-primary text-white transition-colors duration-300" />
    ),
    title: "Durability",
    description:
      "With a lifespan of over 100 years, PVC-O pipes and fittings are the most durable solution for transporting pressurized water.",
  },
  {
    icon: (
      <LineChart className="w-10 h-10 group-hover:text-primary text-white transition-colors duration-300" />
    ),
    title: "Versatility and efficiency",
    description:
      "TOM® and ecoFITTOM® can be used in a wide variety of applications thanks to their wide range of diameters and pressures. They are also lightweight and easy to install.",
  },
  {
    icon: (
      <BarChart3 className="w-10 h-10 group-hover:text-primary text-white transition-colors duration-300" />
    ),
    title: "Practical advantages",
    description:
      "These PVC-O pipes and fittings provide the highest installation performance in meters/hour compared to other solutions, resulting in significant installation savings.",
  },
  {
    icon: (
      <Globe className="w-10 h-10 group-hover:text-primary text-white transition-colors duration-300" />
    ),
    title: "Recyclable and sustainable",
    description:
      "They are 100% recyclable products and have the lowest environmental impact, contributing to the planet's sustainable development.",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function HighlightsSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax effect - move background slower than scroll
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section ref={sectionRef} className="relative py-24 overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <motion.div className="absolute inset-0 z-0" style={{ y: backgroundY }}>
        <Image
          src="https://i.ibb.co/TxJyS7Fz/fondo-destacamos.jpg"
          alt="PVC pipes background"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-white/90" />
      </motion.div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-4 dm-serif-text">
            We highlight
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto roboto-text">
            <span className="text-primary font-medium">
              Continuous innovation
            </span>{" "}
            and{" "}
            <span className="text-primary font-medium">quality assurance</span>.
            The latest technology for pipe manufacturing.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {highlights.map((highlight, index) => (
            <motion.div
              key={index}
              variants={item}
              className="group bg-white rounded-lg p-6 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-3 cursor-pointer relative overflow-hidden"
            >
              {/* Background color overlay that comes from top */}
              <div className="absolute inset-x-0 top-0 h-0 bg-primary group-hover:h-full transition-all duration-500 ease-out -z-10" />

              <div className="bg-primary group-hover:bg-white rounded-lg w-16 h-16 flex items-center justify-center mb-6 mx-auto transition-all duration-300">
                {highlight.icon}
              </div>
              <h3 className="text-xl font-bold text-primary group-hover:text-white mb-3 text-center dm-serif-text transition-colors duration-300">
                {highlight.title}
              </h3>
              <p className="text-gray-600 group-hover:text-white/90 text-center roboto-text transition-colors duration-300">
                {highlight.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
