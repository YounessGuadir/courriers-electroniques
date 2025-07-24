
import React, { useState } from 'react';
import { useUserContext } from '../Context/UserContext';
import { useTheme } from "@/components/theme-provider";
import { 
  Package, 
  Clock, 
  MapPin, 
  FileText, 
  User,
  Bell,
  Settings,
  ChevronRight,
  Menu,
  X
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { ThemeToggle } from "@/components/theme-toggle";
import { motion } from "framer-motion";

export default function FacteurDashbord() {
  const { user } = useUserContext();
  // const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const recentPackages = [
    { id: "PKG001", status: "En transit", date: "2024-03-15", destination: "Casablanca" },
    { id: "PKG002", status: "Livré", date: "2024-03-14", destination: "Rabat" },
    { id: "PKG003", status: "En préparation", date: "2024-03-13", destination: "Marrakech" },
    { id: "PKG004", status: "En transit", date: "2024-03-12", destination: "Fès" },
  ];

  const getInitials = (name) => {
    return name
      // .split(' ')
      // .map(part => part[0])
      // .join('')
      // .toUpperCase();
  };

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'Livré':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'En transit':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'En préparation':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 dark:bg-background">
      {/* Mobile Header with menu toggle */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-background border-b border-border p-4 flex items-center justify-between">
        <Button variant="ghost" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <Menu className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold">Tableau de bord</h1>
       
      </div>

      <div className="flex min-h-screen pt-16 lg:pt-0">
        {/* Sidebar */}
        <aside 
          className={`
            fixed inset-y-0 left-0 lg:relative lg:flex z-40 w-72 flex-col 
            transition-transform transform bg-background border-r border-border
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}
        >
          {/* Mobile sidebar header */}
          <div className="lg:hidden p-4 border-b border-border flex items-center justify-between">
            <h2 className="font-semibold">Barid Al-Maghrib</h2>
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          {/* User profile */}
          <div className="p-6 flex flex-col items-center text-center">
            <Avatar className="w-24 h-24 mb-4">
              <AvatarFallback className="">
                 <User className="w-10 h-10 text-primary" />
                {/* {getInitials(user.nom)} */}
              </AvatarFallback>
            </Avatar>
            <h2 className="font-semibold text-xl">{user.name}</h2>
            <p className="text-sm text-muted-foreground">{user.email}</p>
            <div className="mt-4 flex gap-2">
              {/* <ThemeToggle /> */}
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-1 p-4 flex-grow">
            {[
              { icon: <Package className="w-4 h-4" />, label: "Vue d'ensemble", id: "overview" },
              { icon: <Clock className="w-4 h-4" />, label: "Historique", id: "history" },
              { icon: <Bell className="w-4 h-4" />, label: "Notifications", id: "notifications" },
              { icon: <Settings className="w-4 h-4" />, label: "Paramètres", id: "settings" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all hover:bg-muted ${
                  activeTab === item.id
                    ? "bg-primary text-primary-foreground"
                    : ""
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Sidebar footer */}
          <div className="p-4 border-t border-border">
            <Button variant="outline" className="w-full justify-start gap-2">
              <User className="w-4 h-4" />
              Profil
            </Button>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 lg:hidden z-30"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          <header className="mb-8">
            <h1 className="text-3xl font-bold">Tableau de bord</h1>
            <p className="text-muted-foreground">Bienvenue, {user.nom}</p>
          </header>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              { 
                icon: <Package className="w-6 h-6" />,
                label: "Courrier actifs",
                value: "7",
                color: "text-blue-500 dark:text-blue-400"
              },
              {
                icon: <Clock className="w-6 h-6" />,
                label: "En transit",
                value: "3",
                color: "text-amber-500 dark:text-amber-400"
              },
              {
                icon: <MapPin className="w-6 h-6" />,
                label: "Livrés aujourd'hui",
                value: "4",
                color: "text-green-500 dark:text-green-400"
              }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className={`shrink-0 w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center ${stat.color}`}>
                      {stat.icon}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                      <p className="text-3xl font-bold">{stat.value}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Recent Packages */}
          <Card className="mb-8">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xl">Colis récents</CardTitle>
              <Button variant="ghost" size="sm" className="text-sm">
                Voir tout
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentPackages.map((pkg, index) => (
                  <motion.div
                    key={pkg.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-4 mb-2 sm:mb-0">
                      <div className="shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{pkg.id}</p>
                        <p className="text-sm text-muted-foreground">
                          {pkg.destination}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end sm:gap-6 mt-2 sm:mt-0">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(pkg.status)}`}>
                        {pkg.status}
                      </span>
                      <p className="text-sm text-muted-foreground">{formatDate(pkg.date)}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Account Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Informations du compte</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
                  <div>
                    <p className="text-muted-foreground mb-1">ID Facteur</p>
                    <p className="font-medium text-lg">{user.id}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Nom complet</p>
                    <p className="font-medium text-lg">{user.name}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Email</p>
                    <p className="font-medium text-lg">{user.email}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Date d'inscription</p>
                    <p className="font-medium text-lg">{formatDate(user.created_at)}</p>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-border">
                  <Button variant="outline" className="mr-2">
                    Modifier le profil
                  </Button>
                  <Button variant="secondary">
                    Changer le mot de passe
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
