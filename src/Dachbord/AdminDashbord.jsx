
import React from 'react'
import { useUserContext } from '../Context/UserContext'
import { useState } from "react";
import { 
  Package, 
  Clock, 
  MapPin, 
  FileText, 
  User,
  Bell,
  Settings,
  ChevronRight,
  TrendingUp,
  Calendar,
  CheckCircle2
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";


export default function AdminDashboard() {
  const { user } = useUserContext();
  const [activeTab, setActiveTab] = useState("overview");

  const recentPackages = [
    { id: "PKG001", status: "En transit", date: "2024-03-15", destination: "Casablanca", statusColor: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400" },
    { id: "PKG002", status: "Livré", date: "2024-03-14", destination: "Rabat", statusColor: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400" },
    { id: "PKG003", status: "En préparation", date: "2024-03-13", destination: "Marrakech", statusColor: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" ,
        stiffness: 100
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <motion.div 
        className="container mx-auto px-4 py-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Tableau de bord
              </h1>
              <p className="text-muted-foreground mt-1">Bienvenue, {user.name}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {new Date().toLocaleDateString('fr-FR', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
             
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <Card className="p-6 shadow-lg">
              <div className="flex flex-col items-center text-center mb-6">
                <motion.div 
                  className="w-20 h-20 rounded-full bg-primary flex items-center justify-center mb-4 shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <User className="w-10 h-10 text-primary-foreground" />
                </motion.div>
                <h2 className="font-semibold text-xl text-foreground">{user.name}</h2>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                <div className="mt-2 px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-full font-medium">
                  Administrateur
                </div>
              </div>

              <nav className="space-y-2">
                {[
                  { icon: <Package className="w-4 h-4" />, label: "Vue d'ensemble", id: "overview" },
                  { icon: <Clock className="w-4 h-4" />, label: "Historique", id: "history" },
                  { icon: <Bell className="w-4 h-4" />, label: "Notifications", id: "notifications" },
                  { icon: <Settings className="w-4 h-4" />, label: "Paramètres", id: "settings" },
                ].map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-200 ${
                      activeTab === item.id
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "hover:bg-accent hover:text-accent-foreground text-foreground"
                    }`}
                    whileHover={{ x: activeTab === item.id ? 0 : 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {item.icon}
                    <span className="font-medium">{item.label}</span>
                  </motion.button>
                ))}
              </nav>
            </Card>
          </motion.div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Stats Cards */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {[
                { 
                  icon: <Package className="w-6 h-6" />,
                  label: "Courrier actifs",
                  value: "3",
                  iconBg: "bg-blue-500 dark:bg-blue-600"
                },
                {
                  icon: <Clock className="w-6 h-6" />,
                  label: "En transit",
                  value: "1",
                  iconBg: "bg-amber-500 dark:bg-amber-600"
                },
                {
                  icon: <CheckCircle2 className="w-6 h-6" />,
                  label: "Livrés",
                  value: "12",
                  iconBg: "bg-emerald-500 dark:bg-emerald-600"
                }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                >
                  <Card className="p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className={`w-12 h-12 rounded-xl ${stat.iconBg} flex items-center justify-center mb-4 shadow-lg`}>
                      <div className="text-white">
                        {stat.icon}
                      </div>
                    </div>
                    <h3 className="text-sm text-muted-foreground font-medium">{stat.label}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                      <TrendingUp className="w-4 h-4 text-emerald-500" />
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* Recent Packages */}
            <motion.div variants={itemVariants}>
              <Card className="p-6 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-foreground">Courrier récents</h3>
                  <Button variant="ghost" className="text-sm hover:bg-accent text-primary">
                    Voir tout
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>

                <div className="space-y-4">
                  {recentPackages.map((pkg, index) => (
                    <motion.div
                      key={pkg.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                      className="flex items-center justify-between p-4 rounded-xl bg-accent/50 hover:bg-accent transition-all duration-300 border border-border"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center shadow-sm">
                          <FileText className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{pkg.id}</p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {pkg.destination}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${pkg.statusColor}`}>
                          {pkg.status}
                        </span>
                        <p className="text-sm text-muted-foreground mt-1">{pkg.date}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Account Details */}
            <motion.div variants={itemVariants}>
              <Card className="p-6 shadow-lg">
                <h3 className="text-lg font-semibold mb-4 text-foreground">Informations du compte</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 rounded-xl bg-muted">
                      <p className="text-sm text-muted-foreground font-medium">ID Client</p>
                      <p className="font-semibold text-foreground mt-1">{user.id}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-muted">
                      <p className="text-sm text-muted-foreground font-medium">Date d'inscription</p>
                      <p className="font-semibold text-foreground mt-1">
                        {new Date(user.created_at).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                  </div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg">
                      Modifier le profil
                    </Button>
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
