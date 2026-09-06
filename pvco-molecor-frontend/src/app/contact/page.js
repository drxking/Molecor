"use client"

import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { Button } from "@/components/ui/button";

const ContactPage = () => {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="bg-[#2b6ca3] text-white py-20 lg:py-24">
                <div className="container px-4 md:px-6 mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold dm-serif-text mb-6">Contact Us</h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto roboto-text">
                        Get in touch with us for inquiries about our PVC-O pipes and fittings.
                    </p>
                </div>
            </section>

            <section className="py-16 lg:py-24">
                <div className="container px-4 md:px-6 mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
                        {/* Contact Information */}
                        <div className="space-y-12">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6 dm-serif-text">Get in Touch</h2>
                                <div className="space-y-6">
                                    <div className="flex items-start space-x-4">
                                        <div className="bg-blue-50 p-3 rounded-lg">
                                            <Phone className="h-6 w-6 text-[#2b6ca3]" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                                            <p className="text-gray-600">+977-9801204836</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4">
                                        <div className="bg-blue-50 p-3 rounded-lg">
                                            <Mail className="h-6 w-6 text-[#2b6ca3]" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                                            <p className="text-gray-600">Corrfit@hilltake.com.np</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4">
                                        <div className="bg-blue-50 p-3 rounded-lg">
                                            <MapPin className="h-6 w-6 text-[#2b6ca3]" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-1">Location</h3>
                                            <p className="text-gray-600">Kathmandu, Nepal</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Map Placeholder */}
                            <div className="bg-gray-100 h-64 rounded-xl flex items-center justify-center text-gray-400">
                                Google Map Placeholder
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 dm-serif-text">Send us a Message</h2>
                            <form className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">First Name</label>
                                        <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2b6ca3] focus:border-transparent outline-none transition-all" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Last Name</label>
                                        <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2b6ca3] focus:border-transparent outline-none transition-all" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Email</label>
                                    <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2b6ca3] focus:border-transparent outline-none transition-all" />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Message</label>
                                    <textarea rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2b6ca3] focus:border-transparent outline-none transition-all"></textarea>
                                </div>

                                <Button className="w-full bg-[#2b6ca3] hover:bg-[#1d4e78] text-white font-medium py-3 rounded-md transition-all">
                                    Send Message
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContactPage;
