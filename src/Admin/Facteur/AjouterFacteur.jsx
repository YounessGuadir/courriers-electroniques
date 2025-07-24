import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
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
import { Loader, User, Mail, Lock, Phone, MapPin, Calendar } from 'lucide-react';
import { Textarea } from "@/components/ui/textarea"; 
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from 'sonner';
import { motion } from "framer-motion";

const formSchema = z.object({
  nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères").max(50, "Le nom ne peut pas dépasser 50 caractères"),
  prenom: z.string().min(2, "Le prénom doit contenir au moins 2 caractères").max(50, "Le prénom ne peut pas dépasser 50 caractères"),
  email: z.string().email("Format d'email invalide").min(2).max(50),
  password: z.string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .max(50, "Le mot de passe ne peut pas dépasser 50 caractères"),
    // .regex(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule")
    // .regex(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre"),
  gender: z.enum(["m", "f"], { required_error: "Veuillez sélectionner un genre" }),
  phone: z.string()
    .min(6, "Le numéro de téléphone est trop court")
    .max(10, "Le numéro de téléphone est trop long")
     .regex(/^\+?\d+$/, "Le numéro doit contenir uniquement des chiffres et éventuellement un '+'"),
  date_of_birth: z.string().min(1, "La date de naissance est requise"),
  address: z.string().min(5, "L'adresse est trop courte").max(200, "L'adresse est trop longue"),
});

export function AjouterFacteur({handelSubmitAjouter}) {
 const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nom: "",
      prenom: "",
      date_of_birth: "",
      gender: "",
      address: "",
      phone: "",
      email: "",
      password: "",
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values) {
    try {
      const { status } = await handelSubmitAjouter(values);
      
      if (status === 200 || status === 201) {
        toast.success("Création réussie", {
          description: "L'imprimant a été créé avec succès.",
        });
        // navigate("/dashboard"); // Redirect after success
      } else {
        toast.success("Création réussie", {
          description: "Facteur a été créé avec succès..",
        });
      }
    } catch (error) {
      const { response } = error;
      
      if (response?.data?.errors) {
        Object.entries(response.data.errors).forEach(([field, [message]]) => {
          form.setError(field, { message });
        });
      }
  
      toast.error("Erreur", {
        description: "Une erreur est survenue lors de la soumission du formulaire.",
      });
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-xl mx-auto p-8 bg-card rounded-2xl shadow-lg mt-10 border border-border/30"
    >
      <div className="flex items-center justify-center mb-8">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
          <User className="w-8 h-8 text-primary" />
        </div>
      </div>
      
      <h2 className="text-2xl font-bold text-center mb-8">
        Ajouter un Facteur
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="nom"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input {...field} placeholder="Dupont" className="pl-10" />
                      <User className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="prenom"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prénom</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input {...field} placeholder="Jean" className="pl-10" />
                      <User className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input {...field} type="email" placeholder="exemple@email.com" className="pl-10" />
                    <Mail className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mot de passe</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input {...field} type="password" placeholder="********" className="pl-10" />
                    <Lock className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Téléphone</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input {...field} type="tel" placeholder="+33612345678" className="pl-10" />
                      <Phone className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date_of_birth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date de naissance</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input {...field} type="date" className="pl-10" />
                      <Calendar className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Adresse</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Textarea 
                      {...field} 
                      placeholder="Votre adresse complète" 
                      className="min-h-[100px] pl-10 pt-8" 
                    />
                    <MapPin className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Genre</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex space-x-4"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="m" />
                      </FormControl>
                      <FormLabel className="font-normal">Homme</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="f" />
                      </FormControl>
                      <FormLabel className="font-normal">Femme</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            disabled={isSubmitting}
            type="submit"
            className="w-full"
          >
            {isSubmitting ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center"
              >
                <Loader className="animate-spin mr-2 h-5 w-5" />
                <span>Création en cours...</span>
              </motion.div>
            ) : (
              "Créer Facteur"
            )}
          </Button>
        </form>
      </Form>
    </motion.div>
  );
}
