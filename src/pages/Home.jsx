
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Package,
  MapPin,
  Clock,
  Search,
  TrendingUp,
  Mail,
  Truck,
  Building2,
  ArrowRight,
  Phone,
  Globe,
  User,
  CheckCircle,
  Users,
  Shield,
  Zap,
  Award
} from "lucide-react";
import { Link } from 'react-router-dom';

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      {/* Enhanced Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur-lg opacity-20"></div>
                <div className="relative p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
                  <Mail className="h-6 w-6 text-white" />
                </div>
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Barid Al-Maghrib
                </span>
                <div className="text-xs text-slate-500 dark:text-slate-400">Service postal national</div>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#services" className="text-slate-600 hover:text-blue-600 transition-colors font-medium">Services</a>
              <a href="#tracking" className="text-slate-600 hover:text-blue-600 transition-colors font-medium">Suivi</a>
              <a href="#contact" className="text-slate-600 hover:text-blue-600 transition-colors font-medium">Contact</a>
              <Link to={'/login'}>
               <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300">
                Se Connecter
              </Button>
              </Link>
             
            </div>
          </div>
        </div>
      </nav>

      {/* Enhanced Hero Section */}
      <section className="pt-28 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="space-y-6">
                  <Badge variant="outline" className="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300">
                    <Award className="h-4 w-4 mr-2" />
                    Service de confiance depuis 1913
                  </Badge>
                  <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white leading-tight tracking-tight">
                    Livraison 
                    <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent block">
                      intelligente
                    </span>
                    pour l'avenir
                  </h1>
                  <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                    Révolutionnez vos envois avec notre plateforme nouvelle génération. 
                    Suivi IA, livraison prédictive, et service client disponible 24/7.
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 group">
                    <Package className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                    Suivre un envoi
                  </Button>
                  <Button variant="outline" size="lg" className="border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 shadow-lg">
                    <MapPin className="mr-2 h-5 w-5" />
                    Trouver un bureau
                  </Button>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-3xl blur-3xl"></div>
                <Card className="relative bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border-0 shadow-2xl hover:shadow-3xl transition-all duration-500">
                  <CardHeader className="text-center pb-6">
                    <CardTitle className="text-2xl font-bold">Suivi Intelligent</CardTitle>
                    <CardDescription className="text-base">
                      Powered by AI • Temps réel
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <Input 
                        placeholder="Ex: MA123456789"
                        className="pl-12 h-14 bg-white/80 dark:bg-slate-700/80 border-slate-200 dark:border-slate-600 text-lg font-medium"
                      />
                    </div>
                    <Button className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg font-semibold shadow-lg">
                      <Zap className="mr-2 h-5 w-5" />
                      Rechercher
                    </Button>
                    <div className="grid grid-cols-1 gap-4 pt-4">
                      {[
                        { icon: CheckCircle, text: "Suivi GPS en temps réel", color: "text-green-500" },
                        { icon: Shield, text: "Notifications push sécurisées", color: "text-blue-500" },
                        { icon: Award, text: "Garantie de livraison", color: "text-purple-500" }
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 text-sm font-medium">
                          <item.icon className={`h-4 w-4 ${item.color}`} />
                          <span className="text-slate-700 dark:text-slate-300">{item.text}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Services Section */}
      <section id="services" className="py-24 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto mb-20">
            <Badge variant="outline" className="mb-4 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-0">
              <Zap className="h-4 w-4 mr-2" />
              Innovation et Excellence
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
              Services Nouvelle Génération
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
              Découvrez notre gamme complète de solutions postales et logistiques, 
              conçues pour l'ère numérique.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Mail className="h-10 w-10" />,
                title: "Courrier Express+",
                description: "Livraison ultra-rapide avec IA prédictive, géolocalisation en temps réel et garantie horaire.",
                gradient: "from-blue-500 to-cyan-400",
                features: ["Livraison 2h", "Suivi GPS", "Assurance premium"],
                badge: "Populaire"
              },
              {
                icon: <Truck className="h-10 w-10" />,
                title: "Logistique Smart",
                description: "Plateforme complète avec automatisation IA, optimisation de routes et analytics avancés.",
                gradient: "from-purple-500 to-pink-400",
                features: ["IA optimisée", "API complète", "Analytics 360°"],
                badge: "Nouveau"
              },
              {
                icon: <Building2 className="h-10 w-10" />,
                title: "FinTech Poste",
                description: "Services financiers digitaux avec blockchain, paiements instantanés et portefeuille mobile.",
                gradient: "from-green-500 to-emerald-400",
                features: ["Blockchain", "Paiement instantané", "Mobile wallet"],
                badge: "Innovation"
              }
            ].map((service, index) => (
              <Card key={index} className="group relative overflow-hidden bg-white dark:bg-slate-800 hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 shadow-lg">
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                {service.badge && (
                  <Badge className={`absolute top-4 right-4 bg-gradient-to-r ${service.gradient} text-white border-0 shadow-lg`}>
                    {service.badge}
                  </Badge>
                )}
                <CardContent className="p-8 relative">
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${service.gradient} mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <div className="text-white">
                      {service.icon}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="space-y-3 mb-8">
                    {service.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-slate-600 dark:text-slate-400 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button variant="ghost" className="group/btn w-full justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 font-semibold">
                    Découvrir
                    <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Contact Section */}
      <section id="contact" className="py-24 bg-slate-50 dark:bg-slate-800">
        <div className="container mx-auto px-4">
          <Card className="max-w-5xl mx-auto bg-white dark:bg-slate-900 shadow-2xl border-0 overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-12 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                <h2 className="text-3xl font-bold mb-6">
                  Une question ? Notre équipe d'experts vous répond
                </h2>
                <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                  Support technique 24/7, conseillers spécialisés, 
                  et assistance personnalisée pour tous vos besoins.
                </p>
                <div className="space-y-6">
                  {[
                    { icon: Phone, text: "+212 5XX-XXXXXX", subtext: "Assistance téléphonique" },
                    { icon: Mail, text: "support@baridalmmaghrib.ma", subtext: "Email prioritaire" },
                    { icon: Globe, text: "Chat en ligne", subtext: "Réponse instantanée" }
                  ].map((contact, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="p-3 bg-white/20 rounded-lg">
                        <contact.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="font-semibold text-lg">{contact.text}</div>
                        <div className="text-blue-200">{contact.subtext}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="p-12">
                <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">
                  Contactez-nous maintenant
                </h3>
                <div className="space-y-4">
                  <Button size="lg" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300">
                    <Phone className="mr-2 h-5 w-5" />
                    Appeler maintenant
                  </Button>
                  <Button variant="outline" size="lg" className="w-full border-2 hover:bg-slate-50 dark:hover:bg-slate-800">
                    <Mail className="mr-2 h-5 w-5" />
                    Envoyer un message
                  </Button>
                  <Button variant="ghost" size="lg" className="w-full text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20">
                    <Globe className="mr-2 h-5 w-5" />
                    Chat en ligne
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Enhanced Footer */}

    </div>
  );
}