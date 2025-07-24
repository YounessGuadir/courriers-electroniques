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

import { toast } from 'sonner';

export function UpdateEmployer({ handelSubmit, values }) {
  const navigate = useNavigate();
  const isUpdate = values !== undefined;

  const formSchema = z.object({
    name: z.string().min(2, "Name too short").max(50),
    email: z.string().email("Invalid email").min(2).max(50),
    password: isUpdate
      ? z.string().optional()
      : z.string().min(8, "Password must be at least 8 characters").max(50),
       user_id: z.string().min(1, "User ID required"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: values || {},
  });

  const { isSubmitting } = form.formState;
  const { reset } = form;

  async function onSubmit(values) {
    try {
      const loaderMsg = isUpdate ? 'Update in progress' : 'Adding employer';
      const loader = toast.loading(loaderMsg);

      const { status } = await handelSubmit(values);
      if (status === 200 || status === 201) {
        toast.success("Employer Updated", {
          description: "Update successful.",
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
    <div className="max-w-xl mx-auto p-6 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl mt-10 border dark:border-zinc-800">
      <h2 className="text-2xl font-bold text-center text-zinc-800 dark:text-white mb-6">
        {isUpdate ? "Mettre à jour un employé" : "Ajouter un employé"}
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {["name", "email", "password", "user_id"].map((fieldName) => (
            <FormField
              key={fieldName}
              control={form.control}
              name={fieldName}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-zinc-100 capitalize">
                    {fieldName === "user_id" ? "ID Client" : fieldName}
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type={fieldName === "password" ? "password" : "text"}
                      placeholder={
                        fieldName === "email"
                          ? "exemple@email.com"
                          : fieldName === "user_id"
                          ? "ID du client"
                          : fieldName === "name"
                          ? "Jean Dupont"
                          : ""
                      }
                      className="dark:bg-zinc-800 dark:text-white dark:border-zinc-700"
                    />
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
            {isUpdate ? "Update" : "Create"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
