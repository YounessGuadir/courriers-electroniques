import React, { useEffect, useState } from 'react'
import { Outlet} from 'react-router-dom'

import { ModeToggle } from '../components/mode-toggle'
import { Link } from 'react-router-dom';

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PhoneCall, ChevronDown, Facebook, InstagramIcon, Twitter } from 'lucide-react';
import { LOGIN_ROUTE } from '../router';
// import { MobileNav } from "@/components/mobile-nav";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Package,
  MapPin,
  Instagram,
  Clock,
  Search,
  TrendingUp,
  Mail,
  Truck,
  Building2,
  ArrowRight,
  Phone,
  Menu,
  Globe,
  User
} from "lucide-react";

// import Image from 'next/image';
export default function Layout() {
    const [scrolled, setScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const navItems = [
    {
      label: "Services",
      href: "#",
      isDropdown: true,
      dropdownItems: [
        { label: "Courrier", href: "#courrier" },
        { label: "Colis", href: "#colis" },
        { label: "Services financiers", href: "#finances" },
        { label: "Services numériques", href: "#numeriques" },
      ],
    },
    {
      label: "Entreprises",
      href: "#",
      isDropdown: true,
      dropdownItems: [
        { label: "Solutions Business", href: "#business" },
        { label: "Logistique", href: "#logistique" },
        { label: "Marketing Direct", href: "#marketing" },
      ],
    },
    { label: "À propos", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
 

  return (
    <div>
       <div>
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled || ''
          ? "bg-background/95 backdrop-blur-md border-b shadow-sm supports-[backdrop-filter]:bg-background/60"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <a
              href="/"
              className="group flex items-center gap-2 transition-all duration-300 hover:opacity-90"
            >
              <Mail 
                className="h-6 w-6 text-[#0056A4] dark:text-blue-400 transition-transform duration-300 group-hover:scale-110" 
                aria-hidden="true" 
              />
              <span className="font-bold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#0056A4] to-[#0077CC] dark:from-blue-400 dark:to-blue-500">
                Barid Al-Maghrib
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) =>
              item.isDropdown ? (
                <DropdownMenu key={index}>
                  <DropdownMenuTrigger 
                    asChild
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <button className={cn(
                      "flex items-center gap-1 text-sm font-medium transition-all duration-200",
                      hoveredIndex === index ? "text-primary" : "text-foreground/80 hover:text-primary"
                    )}>
                      {item.label}
                      <ChevronDown className={cn(
                        "h-4 w-4 transition-transform duration-200",
                        hoveredIndex === index && "transform rotate-180"
                      )} />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center" className="w-48">
                    {item.dropdownItems?.map((dropdownItem, dropdownIndex) => (
                      <DropdownMenuItem 
                        key={dropdownIndex} 
                        className="transition-colors duration-200 hover:bg-primary/10 focus:bg-primary/10"
                      >
                        <a href={dropdownItem.href} className="w-full">
                          {dropdownItem.label}
                        </a>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link 
                  key={index} 
                  to={item.href}
                  className="relative text-sm font-medium text-foreground/80 transition-colors duration-200 hover:text-primary after:absolute after:left-0 after:bottom-[-4px] after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
                >
                  {item.label}
                </Link>
              )
            )}
          </div>

          {/* Right side - Auth and Theme */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-3">
              <ModeToggle />
              <Link to={LOGIN_ROUTE}>
               <Button
                variant=""
                size="sm"
                className="group flex items-center gap-2 font-medium transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
              >
                <User className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                <span className="relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-current after:transition-all after:duration-300 group-hover:after:w-full">
                  Se connecter
                </span>
              </Button>
              </Link>
             
            </div>

            {/* Mobile Navigation */}
            {/* <MobileNav navItems={navItems} /> */}
          </div>
        </div>
      </div>
    </nav>

<hr />
        </div>

        <div>
            <Outlet/>
        </div>
        <hr />
<footer className="bg-primary-foreground/5 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <Package className="h-6 w-6 mr-2" />
              <span className="font-bold text-xl">Barid Express</span>
            </div>
            <p className="text-muted-foreground mb-4">
              Votre partenaire de confiance pour tous vos besoins d'envoi et de livraison au Maroc et dans le monde entier.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors">
                <InstagramIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              {["Nos services", "Tarifs", "Suivre un colis", "Bureaux", "Recrutement", "À propos"].map(item => (
                <li key={item}>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 shrink-0 mt-0.5" />
                <span className="text-muted-foreground">
                  123 Avenue Mohammed V, Rabat 10000, Maroc
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0" />
                <span className="text-muted-foreground">+212 5XX-XXXXX</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0" />
                <span className="text-muted-foreground">contact@baridexpress.ma</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Newsletter</h3>
            <p className="text-muted-foreground mb-4">
              Inscrivez-vous pour recevoir nos dernières offres et actualités
            </p>
            <div className="space-y-3">
              <input
                type="email"
                placeholder="Votre email"
                className="w-full p-2 rounded-md border border-input bg-background"
              />
              <Button className="w-full">S'inscrire</Button>
            </div>
          </div>
        </div>

        <div className="border-t pt-8 text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} Barid Express. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
    </div>
  )
}
