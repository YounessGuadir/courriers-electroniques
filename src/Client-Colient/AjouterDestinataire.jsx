"use client";

import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"; 
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useNavigate } from 'react-router-dom';
import { Loader, User, Phone, MapPin, Mail } from 'lucide-react';
import { toast } from 'sonner';

const formSchema = z.object({
  nom: z.string().min(2, "Nom trop court").max(255),
  prenom: z.string().min(2, "Prénom trop court"),
  phone: z
    .string()
    .min(6, "Numéro de téléphone trop court")
    .max(15, "Numéro de téléphone trop long")
    .regex(/^\+?\d+$/, "Le téléphone ne doit contenir que des chiffres et un '+' optionnel"),
  adresse: z.string().min(5, "Adresse trop courte"),
  ville_id: z.string().min(1, "La ville est requise"),
});



export function AjouterDestinataire({ handelSubmitAjouter }) {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nom: "",
      prenom: "",
      phone: "",
      adresse: "",
      ville_id: "",
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values) {
    try {
      const { status } = await handelSubmitAjouter(values);
      if (status === 200 || status === 201) {
        toast("Création réussie", {
          description: "Destinataire créé avec succès.",
        });
        form.reset();
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

  const villes = [
    { id: 1, name: "Casablanca" },
    { id: 2, name: "Rabat" },
    { id: 3, name: "Fès" },
    { id: 4, name: "Marrakech" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br     py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Ajouter un Destinataire
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Remplissez les informations du nouveau destinataire
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Name Fields Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="nom"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 dark:text-gray-300 font-medium flex items-center gap-2">
                          <User className="w-4 h-4" />
                          Nom
                        </FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            placeholder="Entrez le nom" 
                            className="h-12 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl bg-gray-50 dark:bg-gray-800 transition-all duration-200 focus:shadow-lg"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="prenom"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 dark:text-gray-300 font-medium flex items-center gap-2">
                          <User className="w-4 h-4" />
                          Prénom
                        </FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            placeholder="Entrez le prénom" 
                            className="h-12 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl bg-gray-50 dark:bg-gray-800 transition-all duration-200 focus:shadow-lg"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Contact Fields Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 dark:text-gray-300 font-medium flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          Téléphone
                        </FormLabel>
                        <FormControl>
                          <Input 
                            type="tel" 
                            placeholder="+212 6XX XXX XXX" 
                            {...field} 
                            className="h-12 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl bg-gray-50 dark:bg-gray-800 transition-all duration-200 focus:shadow-lg"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="ville_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 dark:text-gray-300 font-medium flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          Ville
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl bg-gray-50 dark:bg-gray-800 transition-all duration-200">
                              <SelectValue placeholder="Sélectionnez une ville" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="rounded-xl border-gray-200 dark:border-gray-700">
                            {villes.map((ville) => (
                              <SelectItem 
                                key={ville.id} 
                                value={String(ville.id)}
                                className="rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20"
                              >
                                {ville.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Address Field */}
                <FormField
                  control={form.control}
                  name="adresse"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 dark:text-gray-300 font-medium flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        Adresse complète
                      </FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Entrez l'adresse complète..." 
                          className="min-h-[100px] resize-none border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl bg-gray-50 dark:bg-gray-800 transition-all duration-200 focus:shadow-lg" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <div className="pt-6">
                  <Button
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <Loader className="animate-spin h-5 w-5" />
                        Création en cours...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Mail className="w-5 h-5" />
                        Créer le Destinataire
                      </div>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Tous les champs sont obligatoires pour créer un destinataire
          </p>
        </div>
      </div>
    </div>
  );
}