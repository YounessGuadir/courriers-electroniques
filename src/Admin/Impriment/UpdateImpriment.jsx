import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Loader, Trash2Icon, CheckCircleIcon } from "lucide-react";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";

export function UpdateImpriment({ handelSubmit, values }) {
  const navigate = useNavigate();
  const isUpdate = values !== undefined;

  const formSchema = z.object({
    nom: z.string().min(2, "Nom trop court").max(50),
    prenom: z.string().min(2, "Prénom trop court").max(50),
    email: z.string().email("Email invalide").max(50),
    password: isUpdate
      ? z.string().optional()
      : z.string().min(8, "Mot de passe trop court").max(50),
    gender: z.string().min(1, "Genre requis"),
    phone: z.string().min(10, "Numéro trop court").max(15),
    date_of_birth: z.string().min(1, "Date de naissance requise"),
    address: z.string().min(5, "Adresse trop courte"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: values || {
      nom: "",
      prenom: "",
      email: "",
      password: "",
      gender: "",
      phone: "",
      date_of_birth: "",
      address: "",
    },
  });

  const { isSubmitting } = form.formState;
  const { reset } = form;

  async function onSubmit(values) {
    try {
      const loaderMsg = isUpdate ? "Mise à jour en cours..." : "Ajout en cours...";
      const loader = toast.loading(loaderMsg);

      const { status } = await handelSubmit(values);
      if (status === 200 || status === 201) {
        toast.success(isUpdate ? "Facteur mis à jour" : "Facteur ajouté", {
          description: "Opération réalisée avec succès.",
          icon: <CheckCircleIcon />,
        });
        reset();
      }
    } catch (error) {
      const { response } = error;
      if (response?.data?.errors) {
        for (const field in response.data.errors) {
          form.setError(field, { message: response.data.errors[field][0] });
        }
      } else if (
        response?.status === 409 ||
        response?.data?.message?.includes("Duplicate entry")
      ) {
        toast.error("Erreur : Téléphone ou email déjà utilisé.");
        form.setError("email", { message: "Email déjà utilisé." });
        form.setError("phone", { message: "Téléphone déjà utilisé." });
      } else {
        toast.error("Erreur lors de l'opération.");
      }
    } finally {
      toast.dismiss();
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl mt-10 border dark:border-zinc-800">
      <h2 className="text-2xl font-bold text-center text-zinc-800 dark:text-white mb-6">
        {isUpdate ? "Mettre à jour un Facteur" : "Ajouter un Facteur"}
      </h2>
      <ScrollArea className="h-[500px] w-[100%] rounded-md border p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {["nom", "prenom", "email", "password", "date_of_birth", "gender", "phone", "address"].map((fieldName) => (
              <FormField
                key={fieldName}
                control={form.control}
                name={fieldName}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-zinc-100 capitalize">
                      {fieldName.replace(/_/g, " ")}
                    </FormLabel>
                    <FormControl>
                      {fieldName === "date_of_birth" ? (
                        <Input
                          {...field}
                          type="date"
                          className={`dark:bg-zinc-800 dark:text-white dark:border-zinc-700 ${form.formState.errors[fieldName] ? "border-red-500" : ""}`}
                        />
                      ) : fieldName === "gender" ? (
                        <select
                          {...field}
                          className={`w-full p-2 rounded-md dark:bg-zinc-800 dark:text-white dark:border-zinc-700 ${form.formState.errors[fieldName] ? "border-red-500" : ""}`}
                        >
                          <option value="">Sélectionner le genre</option>
                          <option value="m">Masculin</option>
                          <option value="f">Féminin</option>
                        </select>
                      ) : (
                        <Input
                          {...field}
                          type={fieldName === "password" ? "password" : "text"}
                          placeholder={
                            fieldName === "email"
                              ? "exemple@email.com"
                              : fieldName === "nom"
                              ? "Jean Dupont"
                              : ""
                          }
                          className={`dark:bg-zinc-800 dark:text-white dark:border-zinc-700 ${form.formState.errors[fieldName] ? "border-red-500" : ""}`}
                        />
                      )}
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            ))}
            <Button
              disabled={isSubmitting}
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600 font-medium py-2 px-4 rounded-xl"
            >
              {isSubmitting && <Loader className="animate-spin mr-2 h-5 w-5" />}
              {isUpdate ? "Mettre à jour" : "Créer"}
            </Button>
          </form>
        </Form>
      </ScrollArea>
    </div>
  );
}
