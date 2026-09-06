"use client"

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Check, ArrowRight, Activity, ShieldCheck, Droplets, Zap } from 'lucide-react';
import { Button } from "@/components/ui/button";

const features = [
    {
        title: "Unbeatable Impact Resistance",
        description: "PVC-O pipes are virtually unbreakable, maintaining performance even at -40°C. They resist impacts during installation and handling.",
        icon: <ShieldCheck className="h-6 w-6 text-white" />,
    },
    {
        title: "Higher Hydraulic Capacity",
        description: "Offering between 15% and 40% more hydraulic capacity than pipes of other materials with the same external diameter.",
        icon: <Droplets className="h-6 w-6 text-white" />,
    },
    {
        title: "Maximum Flexibility",
        description: "Capable of bearing significant deformation without breakage, returning to original shape after impact or crushing.",
        icon: <Activity className="h-6 w-6 text-white" />,
    },
    {
        title: "Propagation of Cracks",
        description: "The layered structure prevents crack propagation, ensuring long-term reliability and safety.",
        icon: <Zap className="h-6 w-6 text-white" />,
    }
];

const applications = [
    "Potable water supply",
    "Irrigation systems",
    "Industrial applications",
    "Sewage networks",
    "Fire extinguishing networks",
    "Reclaimed water"
];

const PvcoPipesPage = () => {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative py-20 lg:py-32 overflow-hidden bg-[#2b6ca3] text-white">
                <div className="absolute inset-0 bg-black/20 z-10" />
                <div className="container relative z-20 px-4 md:px-6 mx-auto">
                    <div className="max-w-3xl space-y-6">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold dm-serif-text leading-tight">
                            TOM® PVC-O Pipes
                        </h1>
                        <p className="text-xl md:text-2xl text-blue-100 max-w-2xl roboto-text">
                            The pinnacle of advanced piping technology. Engineered to endure up to 25 Bars of pressure.
                        </p>
                        <div className="flex flex-wrap gap-4 pt-4">
                            <Button className="bg-white text-[#2b6ca3] hover:bg-blue-50 font-semibold text-lg px-8 py-6">
                                Download Catalog
                            </Button>
                            <Button variant="outline" className="border-white text-white hover:bg-white/10 font-semibold text-lg px-8 py-6">
                                Contact Sales
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-16 lg:py-24">
                <div className="container px-4 md:px-6 mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dm-serif-text">
                                Excellence in high-pressure water piping
                            </h2>
                            <div className="space-y-4 text-gray-600 roboto-text text-lg leading-relaxed">
                                <p>
                                    TOM® PVC-O pipes are the most advanced solution for the conveyance of water at high pressure.
                                    Developed by Molecor, they offer unmatched durability and efficiency.
                                </p>
                                <p>
                                    Salient Features:
                                </p>
                                <ul className="space-y-2 pl-4">
                                    <li className="flex items-start">
                                        <Check className="h-5 w-5 text-[#2b6ca3] mr-2 mt-1 shrink-0" />
                                        <span>Larger internal diameters increase flow rates and reduce pumping costs.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <Check className="h-5 w-5 text-[#2b6ca3] mr-2 mt-1 shrink-0" />
                                        <span>Higher cyclic fatigue resistance for force main applications.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <Check className="h-5 w-5 text-[#2b6ca3] mr-2 mt-1 shrink-0" />
                                        <span>Up to 50% lighter than HDPE and 90% lighter than Ductile Iron pipes.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <Check className="h-5 w-5 text-[#2b6ca3] mr-2 mt-1 shrink-0" />
                                        <span>Smoother Surface – Higher Manning’s Coefficient.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                            {/* Placeholder for Product Image - User should replace or we generate one */}
                            <div className="absolute inset-0 bg-gray-200 flex items-center justify-center text-gray-400">
                                Product Image Placeholder
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-16 lg:py-24 bg-gray-50">
                <div className="container px-4 md:px-6 mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 dm-serif-text">
                            Why PVCO is the best choice?
                        </h2>
                        <p className="text-lg text-gray-600">
                            Superior mechanical properties making it the most efficient and sustainable solution.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
                                <div className="h-12 w-12 bg-[#2b6ca3] rounded-lg flex items-center justify-center mb-6">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 dm-serif-text">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Applications */}
            <section className="py-16 lg:py-24">
                <div className="container px-4 md:px-6 mx-auto">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1">
                            {/* Another Placeholder */}
                            <div className="h-[400px] w-full bg-gray-200 rounded-xl flex items-center justify-center text-gray-400">
                                Application Image Placeholder
                            </div>
                        </div>
                        <div className="order-1 lg:order-2 space-y-8">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dm-serif-text">Applications</h2>
                            <p className="text-lg text-gray-600">
                                TOM® PVC-O pipes are versatile and suitable for a wide range of applications, providing reliability and efficiency in every scenario.
                            </p>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {applications.map((app, idx) => (
                                    <div key={idx} className="flex items-center p-4 bg-gray-50 rounded-lg">
                                        <ArrowRight className="h-5 w-5 text-[#2b6ca3] mr-3" />
                                        <span className="font-medium text-gray-900">{app}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Technical Specs / Range */}
            <section className="py-16 lg:py-24 bg-[#2b6ca3] text-white">
                <div className="container px-4 md:px-6 mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-8 dm-serif-text">Available Range</h2>
                    <p className="text-xl max-w-2xl mx-auto mb-12 text-blue-100">
                        We manufacture TOM® PVC-O Pipes in a wide range of diameters and pressures to suit every project requirement.
                    </p>
                    <div className="inline-flex flex-col md:flex-row gap-8 md:gap-16 justify-center items-center bg-white/10 p-8 rounded-2xl backdrop-blur-sm">
                        <div className="text-center">
                            <div className="text-4xl md:text-5xl font-bold mb-2">DN 90 - 1200</div>
                            <div className="text-blue-200">Diameter (mm)</div>
                        </div>
                        <div className="hidden md:block w-px h-16 bg-white/20"></div>
                        <div className="text-center">
                            <div className="text-4xl md:text-5xl font-bold mb-2">12.5 - 25</div>
                            <div className="text-blue-200">Pressure (bar)</div>
                        </div>
                        <div className="hidden md:block w-px h-16 bg-white/20"></div>
                        <div className="text-center">
                            <div className="text-4xl md:text-5xl font-bold mb-2">5.95</div>
                            <div className="text-blue-200">Standard Length (m)</div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default PvcoPipesPage;
