import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Loader,Trash2Icon } from "lucide-react";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";

export function UpdateClient({ handelSubmit, values }) {
    const navigate = useNavigate();
    const isUpdate = values !== undefined;
  
    // Schéma de validation avec ville_id et type_client_id
    const formSchema = z.object({
      name: z.string().min(2, "Name too short").max(50),
      email: z.string().email("Invalid email").min(2).max(50),
      password: isUpdate
        ? z.string().optional()
        : z.string().min(8, "Password must be at least 8 characters").max(50),
   
      phone: z.string().min(10, "Phone number is too short").max(15),
      address: z.string().min(5, "Address is too short"),
      ville_id: z.string().min(1, "City ID is required"), // Ajout de la validation pour ville_id
      type_client_id: z.string().min(1, "Client type ID is required"), // Ajout de la validation pour type_client_id
      ICE: z.string().min(1, "ICE is required"),
      status: z.string().min(1, "Status is required"),
      intitule: z.string().min(1, "Title is required"),
    });
  
    const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: values || {
        name: "",
        email: "",
        password: "",
        ville_id: "",
        type_client_id: "",
        // Ajoutez ici d'autres valeurs par défaut si nécessaire
      },
    });
  
    const { isSubmitting } = form.formState;
    const { reset } = form;
  
    // Fonction pour soumettre le formulaire
   async function onSubmit(values) {
    try {
      const loaderMsg = isUpdate ? "Update in progress" : "Adding employer";
      const loader = toast.loading(loaderMsg);

      const { status } = await handelSubmit(values);
      if (status === 200 || status === 201) {
        toast.success("Client Updated", {
          description: "Update successful.",
          icon: <Trash2Icon />
        });
        reset();
      }
    } catch (error) {
      const { response } = error;
      if (response?.data?.errors) {
        for (const field in response.data.errors) {
          form.setError(field, { message: response.data.errors[field][0] });
        }
      }
    } finally {
      toast.dismiss();
    }
  }
 return (
    <Card className="max-w-4xl mx-auto shadow-lg border bg-card rounded-xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r ">
        <CardTitle className="text-2xl font-bold tracking-tight text-center">
          {isUpdate ? "Update Client" : "Add New Client"}
        </CardTitle>
        <CardDescription className=" text-center">
          {isUpdate ? "Modify client information" : "Enter client details to create a new record"}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <ScrollArea className="h-[500px] pr-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { name: "name", placeholder: "Jean Dupont", icon: "user" },
                  { name: "email", placeholder: "exemple@email.com", icon: "mail" },
                  { name: "password", placeholder: "••••••••", icon: "lock", type: "password" },
                  { name: "phone", placeholder: "0612345678", icon: "phone" },
                  { name: "address", placeholder: "123 Main Street", icon: "home" },
                  { name: "ville_id", placeholder: "City ID", icon: "map-pin" },
                  { name: "type_client_id", placeholder: "Client Type ID", icon: "tag" },
                  { name: "ICE", placeholder: "ICE Number", icon: "file-text" },
                  { name: "status", placeholder: "Active/Inactive", icon: "activity" },
                  { name: "intitule", placeholder: "Title", icon: "bookmark" }
                ].map((field) => (
                  <FormField
                    key={field.name}
                    control={form.control}
                    name={field.name}
                    render={({ field: formField }) => (
                      <FormItem className="space-y-1.5">
                        <FormLabel className="text-sm font-medium capitalize">
                          {field.name.replace('_', ' ')}
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              {...formField}
                              type={field.type || "text"}
                              placeholder={field.placeholder}
                              className={`pl-3 h-10 rounded-md border bg-background transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring ${
                                form.formState.errors[field.name] 
                                  ? "border-destructive focus-visible:ring-destructive" 
                                  : "border-input"
                              }`}
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-xs text-destructive" />
                      </FormItem>
                    )}
                  />
                ))}
              </div>
              
              <div className="pt-4">
                <Button
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full h-11 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-md transition-all duration-200 flex items-center justify-center"
                >
                  {isSubmitting && <Loader className="mr-2 h-4 w-4 animate-spin" />}
                  {isUpdate ? "Save Changes" : "Create Client"}
                </Button>
              </div>
            </form>
          </Form>
        </ScrollArea>
      </CardContent>
    </Card>
  );
  }
  
