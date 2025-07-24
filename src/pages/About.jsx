import React from 'react';
import { Play, Home, CheckCircle2, Trophy, Users, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function About() {
    const stats = [
    { icon: <Trophy className="w-6 h-6 text-primary" />, value: "50+", label: "Years of Excellence" },
    { icon: <Users className="w-6 h-6 text-primary" />, value: "5M+", label: "Satisfied Customers" },
    { icon: <Globe className="w-6 h-6 text-primary" />, value: "200+", label: "Locations" },
    { icon: <CheckCircle2 className="w-6 h-6 text-primary" />, value: "99%", label: "Delivery Success" },
  ];
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 -skew-y-6 transform origin-top-left" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="w-full lg:w-1/2 space-y-6">
              <h1 className="text-4xl font-bold tracking-tight">
                Connecting Morocco,{" "}
                <span className="text-primary">Delivering Trust</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Since 1892, Barid Al-Maghrib has been at the forefront of postal and logistics services in Morocco, 
                connecting people and businesses across the nation and beyond.
              </p>
              <div className="flex gap-4">
                <Button size="lg">
                  Learn More
                </Button>
                <Button variant="outline" size="lg">
                  Contact Us
                </Button>
              </div>
            </div>
            <div className="relative w-full lg:w-1/2 aspect-video">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent rounded-lg" />
              <img 
                className="rounded-lg shadow-xl object-cover w-full h-full" 
                src="https://images.pexels.com/photos/5025643/pexels-photo-5025643.jpeg" 
                alt="Barid Al Maghrib Operations"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-all duration-300">
                <div className="flex justify-center mb-4">{stat.icon}</div>
                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="relative w-full lg:w-1/2 aspect-video group">
              <img 
                className="rounded-lg shadow-xl object-cover w-full h-full" 
                src="https://images.pexels.com/photos/4246120/pexels-photo-4246120.jpeg" 
                alt="Barid Al Maghrib"
              />
              <a 
                href="https://www.youtube.com/watch?v=ewYRibcqEwc" 
                className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition duration-300 rounded-lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="p-4 rounded-full bg-primary/90 group-hover:bg-primary transition-colors">
                  <Play className="w-8 h-8 text-white" />
                </div>
              </a>
            </div>
            <div className="w-full lg:w-1/2 space-y-6">
              <h2 className="text-3xl font-bold">Our Story</h2>
              <p className="text-muted-foreground">
                Barid Al Maghrib is Morocco's leading logistics and courier company, dedicated to delivering packages 
                safely and efficiently across national and international borders. With decades of experience and a 
                commitment to excellence, we take pride in providing reliable shipping solutions that meet the diverse 
                needs of businesses and individuals alike.
              </p>
              <p className="text-muted-foreground">
                Our mission is to redefine logistics services standards by delivering unparalleled customer satisfaction. 
                We continuously innovate and improve our services to exceed expectations through cutting-edge solutions, 
                timely deliveries, and exceptional customer support.
              </p>
              <div className="pt-4">
                <Button variant="outline" className="group">
                  Discover Our Legacy
                  <svg
                    className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
