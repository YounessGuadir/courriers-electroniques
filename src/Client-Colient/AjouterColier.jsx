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
  FormDescription,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useNavigate } from 'react-router-dom';
import { Loader, Mail } from 'lucide-react';
import { toast } from 'sonner';

const formSchema = z.object({
  Object: z.string().min(2, "L'objet doit contenir au moins 2 caractères"),
  titre: z.string().min(5, "Le titre doit contenir au moins 5 caractères"),
  type_colier_electroniques: z.string().min(1, "Veuillez sélectionner un type de courrier")
});

const type_colier_electronique = [
  { id: "Information", name: "Information" },
  { id: "Avertisment", name: "Avertissement" },
];

export function AjouterColier({ handelSubmitAjouter }) {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Object: "",
      titre: "",
      type_colier_electroniques: "",
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values) {
    try {
      const { status } = await handelSubmitAjouter(values);
      if (status === 200 || status === 201) {
        toast("Création réussie", {
          title: "Succès",
          description: "Courrier électronique créé avec succès.",
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
      toast("Erreur", {
        title: "Échec",
        description: "Une erreur est survenue lors de la création.",
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="Object"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Objet</FormLabel>
                <FormDescription>
                  L'objet principal de votre courrier électronique
                </FormDescription>
                <FormControl>
                  <Input 
                    {...field} 
                    placeholder="Ex: Réunion mensuelle" 
                    className="transition-colors focus:border-primary"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type_colier_electroniques"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type de Courrier</FormLabel>
                <FormDescription>
                  Sélectionnez la nature de votre courrier
                </FormDescription>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full transition-colors focus:border-primary">
                      <SelectValue placeholder="Sélectionnez un type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {type_colier_electronique.map((type) => (
                      <SelectItem 
                        key={type.id} 
                        value={type.id}
                        className="cursor-pointer hover:bg-primary/10"
                      >
                        {type.name}
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
            name="titre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contenu</FormLabel>
                <FormDescription>
                  Le contenu détaillé de votre courrier
                </FormDescription>
                <FormControl>
                  <Textarea 
                    {...field} 
                    placeholder="Saisissez le contenu de votre courrier ici..."
                    className="min-h-[150px] resize-none transition-colors focus:border-primary"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full transition-colors"
        >
          {isSubmitting ? (
            <>
              <Loader className="mr-2 h-4 w-4 animate-spin" />
              Création en cours...
            </>
          ) : (
            <>
              <Mail className="mr-2 h-4 w-4" />
              Envoyer le courrier
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}