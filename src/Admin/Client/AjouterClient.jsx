"use client";

import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Loader, User, Mail, Lock, Phone, Building2, MapPin } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useNavigate } from 'react-router-dom';

import { Textarea } from "@/components/ui/textarea"; 
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"; 
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import { toast } from 'sonner'

const formSchema = z.object({
  name: z.string().min(2, "Name too short").max(50),
  email: z.string().email("Invalid email").min(2).max(50),
  password: z.string().min(8, "Password must be at least 8 characters").max(50),
  // gender: z.enum(["m", "f"], { required_error: "Gender is required" }),
  status: z.enum(["active", "inactive"], { required_error: "status is required" }),
  ICE : z
    .string()
    .min(6, "ICE number too short")
    .max(15, "ICE number too long")
    .regex(/^\+?\d+$/, "ICE must contain only digits and optional '+'"),
    phone: z
    .string()
    .min(6, "Phone number too short")
    .max(15, "Phone number too long")
    .regex(/^\+?\d+$/, "Phone must contain only digits and optional '+'"),
  // date_of_birth: z.string().min(1, "Date of birth is required"), // ISO string expected
  address: z.string().min(5, "Address too short"),
  intitule: z.string().min(1, "intitule is required"),
  type_client_id: z.string().min(1, "Type client is required"),
  ville_id: z.string().min(1, "Type client is required"),
  Code_Client :z.string().min(2, "Code too short").max(50),

});

export function AjouterClient({handelSubmitAjouter}) {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: ""
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values) {
    console.log(values)
    try {
      const { status } = await handelSubmitAjouter(values);
      if (status === 200 || status === 201) {
       toast.success("Client créé avec succès", {
          description: "Le nouveau client a été ajouté à la base de données.",
          duration: 5000,
        });
      }
    } catch (error) {
      const { response } = error;
      if (response?.data?.errors) {
        for (const field in response.data.errors) {
          form.setError(field, { message: response.data.errors[field][0] });
        }
      }
    }
  }
  const typeClients = [
  { id: 1, name: "asosiation" },
  { id: 2, name: "administration" },
  { id: 3, name: "Entreprise" },
]
  const villes = [
    { id: 1, name: "Casablanca" },
    { id: 2, name: "Rabat" },
    { id: 3, name: "Fès" },
    { id: 4, name: "Marrakech" },
  ]

return (
    <div className="animate-fade-in mt-10">
      <div className="max-w-3xl mx-auto p-8 bg-gradient-to-b from-white to-gray-50 dark:from-zinc-900 dark:to-zinc-950 rounded-2xl shadow-xl border border-gray-100 dark:border-zinc-800">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gradient bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Ajouter un Client
          </h2>
          <p className="text-muted-foreground mt-2">Remplissez le formulaire pour ajouter un nouveau client</p>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="space-y-4 col-span-full md:col-span-1">
                <h3 className="font-medium text-sm uppercase tracking-wider text-muted-foreground">Informations personnelles</h3>
                
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="card-hover">
                      <FormLabel className="flex items-center gap-2">
                        <User className="h-4 w-4" /> Nom
                      </FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Jean Dupont" className="transition-all focus-within:shadow-md" />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="Code_Client"
                  render={({ field }) => (
                    <FormItem className="card-hover">
                      <FormLabel className="flex items-center gap-2">Code Client</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="CLT12345" className="transition-all focus-within:shadow-md" />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="card-hover">
                      <FormLabel className="flex items-center gap-2">
                        <Mail className="h-4 w-4" /> Email
                      </FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="exemple@email.com" className="transition-all focus-within:shadow-md" />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="card-hover">
                      <FormLabel className="flex items-center gap-2">
                        <Lock className="h-4 w-4" /> Mot de passe
                      </FormLabel>
                      <FormControl>
                        <Input type="password" {...field} placeholder="********" className="transition-all focus-within:shadow-md" />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </div>
              
              {/* Contact Information */}
              <div className="space-y-4 col-span-full md:col-span-1">
                <h3 className="font-medium text-sm uppercase tracking-wider text-muted-foreground">Coordonnées et détails</h3>
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="card-hover">
                      <FormLabel className="flex items-center gap-2">
                        <Phone className="h-4 w-4" /> Téléphone
                      </FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="+212 600000000" {...field} className="transition-all focus-within:shadow-md" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="ICE"
                  render={({ field }) => (
                    <FormItem className="card-hover">
                      <FormLabel className="flex items-center gap-2">Numéro ICE</FormLabel>
                      <FormControl>
                        <Input placeholder="000000000000000" {...field} className="transition-all focus-within:shadow-md" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="intitule"
                  render={({ field }) => (
                    <FormItem className="card-hover">
                      <FormLabel className="flex items-center gap-2">
                        <Building2 className="h-4 w-4" /> Intitulé
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Intitulé de l'entreprise" {...field} className="transition-all focus-within:shadow-md" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            {/* Additional Information */}
            <div className="pt-4 border-t border-gray-100 dark:border-zinc-800">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="card-hover col-span-full">
                      <FormLabel className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" /> Adresse
                      </FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Adresse complète" 
                          className="resize-none min-h-[120px] transition-all focus-within:shadow-md" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="space-y-3 card-hover">
                      <FormLabel>Statut</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex space-x-4"
                        >
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="active" />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">Actif</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="inactive" />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">Inactif</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              
                <FormField
                  control={form.control}
                  name="ville_id"
                  render={({ field }) => (
                    <FormItem className="card-hover">
                      <FormLabel>Ville</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="transition-all focus-within:shadow-md">
                            <SelectValue placeholder="Sélectionnez une ville" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {villes.map((ville) => (
                            <SelectItem key={ville.id} value={String(ville.id)}>
                              {ville.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              
                <FormField
                  control={form.control}
                  name="type_client_id"
                  render={({ field }) => (
                    <FormItem className="card-hover">
                      <FormLabel>Type de client</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="transition-all focus-within:shadow-md">
                            <SelectValue placeholder="Sélectionnez un type de client" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {typeClients.map((typeClient) => (
                            <SelectItem key={typeClient.id} value={String(typeClient.id)}>
                              {typeClient.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="pt-6">
              <Button
                disabled={isSubmitting}
                type="submit"
                className="w-full hover-lift bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-2.5 px-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-xl"
              >
                {isSubmitting ? (
                  <>
                    <Loader className="animate-spin mr-2 h-5 w-5" />
                    Création en cours...
                  </>
                ) : (
                  'Créer le client'
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
