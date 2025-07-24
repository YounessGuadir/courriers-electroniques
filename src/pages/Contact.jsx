import React from 'react'
import { Link } from 'react-router-dom';

import { MapPin, Phone, Mail, Home } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 m-10">
      
     

      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-foreground">Contactez-nous</h2>
            <div className="w-24 h-1 bg-primary mx-auto my-4"></div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Pour toute information ou demande de service, notre équipe est à votre disposition.
              N'hésitez pas à nous contacter.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div>
              <Card className="h-full shadow-lg border-t-4 border-t-primary">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-6 text-foreground border-b pb-2">Nos Coordonnées</h3>
                  
                  <div className="space-y-8">
                    <div className="flex items-start space-x-4">
                      <div className="bg-primary/10 p-3 rounded-full">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">Adresse</h4>
                        <p className="text-muted-foreground mt-1">
                          Sale Sidi Moussa<br />
                         
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-primary/10 p-3 rounded-full">
                        <Phone className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">Téléphone</h4>
                        <p className="text-muted-foreground mt-1">
                          <a href="tel:+212615855264" className="hover:text-primary transition-colors">
                            (+212) 6 15 85 52 64
                          </a><br />
                        
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-primary/10 p-3 rounded-full">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">Email</h4>
                        <p className="text-muted-foreground mt-1">
                          <a href="mailto:contact@baridmaroc.ma" className="hover:text-primary transition-colors">
                            contact@baridmaroc.ma
                          </a><br />
                          <a href="mailto:support@baridmaroc.ma" className="hover:text-primary transition-colors">
                            support@baridmaroc.ma
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t">
                    <h4 className="font-semibold text-foreground mb-3">Heures d'ouverture</h4>
                    <ul className="text-muted-foreground space-y-1">
                      <li className="flex justify-between">
                        <span>Lundi - Vendredi:</span>
                        <span>8:30 - 16:30</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Samedi:</span>
                        <span>9:00 - 13:00</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Dimanche:</span>
                        <span>Fermé</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-lg">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-6 text-foreground border-b pb-2">
                    Envoyez-nous un message
                  </h3>
                  
                  <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-foreground">
                        Nom complet
                      </label>
                      <Input 
                        id="name" 
                        placeholder="Votre nom" 
                        required 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium text-foreground">
                        Sujet
                      </label>
                      <Input 
                        id="subject" 
                        placeholder="Sujet de votre message" 
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-foreground">
                        Email
                      </label>
                      <Input 
                        id="email"
                        type="email" 
                        placeholder="Votre email" 
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium text-foreground">
                        Téléphone
                      </label>
                      <Input 
                        id="phone"
                        placeholder="Votre téléphone" 
                        required
                      />
                    </div>
                    
                    <div className="space-y-2 md:col-span-2">
                      <label htmlFor="message" className="text-sm font-medium text-foreground">
                        Message
                      </label>
                      <Textarea 
                        id="message"
                        placeholder="Votre message" 
                        rows={6}
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <Button 
                        type="submit" 
                        className="w-full"
                      >
                        Envoyer le message
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      
      
    </div>
  );
}
