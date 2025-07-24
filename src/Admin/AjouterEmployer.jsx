"use client";

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
import { Loader } from 'lucide-react';

import EmployerApi from '../servicesApi/EmployerApi';
import { toast } from 'sonner'

const formSchema = z.object({
  name: z.string().min(2, "Name too short").max(50),
  email: z.string().email("Invalid email").min(2).max(50),
  password: z.string().min(8, "Password must be at least 8 characters").max(50),
  user_id: z.string().min(1, "User ID required"),
});

export function AjouterEmployer({handelSubmitAjouter}) {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      user_id: "",
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values) {
    try {
      const { status } = await handelSubmitAjouter(values);
      if (status === 200 || status === 201) {
        toast("Création réussie", {
          title: "Succès",
          description: "Employé créé avec succès.",
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

  return (
    <div className="max-w-xl mx-auto p-6 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl mt-10 border dark:border-zinc-800">
      <h2 className="text-2xl font-bold text-center text-zinc-800 dark:text-white mb-6">
        Ajouter un Employé
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="dark:text-zinc-100">Nom</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Jean Dupont" className="dark:bg-zinc-800 dark:text-white dark:border-zinc-700" />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="dark:text-zinc-100">Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="exemple@email.com" className="dark:bg-zinc-800 dark:text-white dark:border-zinc-700" />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="dark:text-zinc-100">Mot de passe</FormLabel>
                <FormControl>
                  <Input type="password" {...field} placeholder="********" className="dark:bg-zinc-800 dark:text-white dark:border-zinc-700" />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="user_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="dark:text-zinc-100">ID Client</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="ID du client" className="dark:bg-zinc-800 dark:text-white dark:border-zinc-700" />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <Button
            disabled={isSubmitting}
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600 font-medium py-2 px-4 rounded-xl"
          >
            {isSubmitting && <Loader className="animate-spin mr-2 h-5 w-5" />}
            Créer l'employé
          </Button>
        </form>
      </Form>
    </div>
  );
}
