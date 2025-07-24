import React from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { PlusCircle, List } from "lucide-react";

import { AjouterImpriment } from "./AjouterImpriment";
import ImprimentApi from "../../servicesApi/ImprimentApi";
import ImprimentList from "../../components/data-table-imprement/Imprement/ListImprimet";

export default function CreateImpriment() {
  return (
    <>
      {/* Mobile view fallback if needed */}
      <div className="md:hidden px-4 py-6 text-center text-muted-foreground">
        Veuillez utiliser un écran plus large pour gérer les Imprimeurs.
      </div>

      {/* Desktop layout */}
      <div className="hidden md:block">
        <div className="bg-background min-h-screen px-4 py-6 lg:px-8">
          <Tabs defaultValue="facteur_list" className="space-y-6">
            {/* Tabs header */}
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold tracking-tight">
                Gestion des Imprimeurs
              </h1>
              <TabsList>
                <TabsTrigger value="facteur_list" className="gap-2">
                  <List className="w-4 h-4" />
                  Liste
                </TabsTrigger>
                <TabsTrigger value="ajouter_facteur" className="gap-2">
                  <PlusCircle className="w-4 h-4" />
                  Ajouter
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Liste des facteurs */}
            <TabsContent
              value="facteur_list"
              className="border-none p-0 outline-none"
            >
              <div className="space-y-4">
                <div>
                  <h2 className="text-2xl font-semibold">Liste des Imprimeurs</h2>
                  <p className="text-sm text-muted-foreground">
                    Consultez tous les Imprimeurs enregistrés.
                  </p>
                </div>

                <Separator />

                <ScrollArea className="rounded-md border p-2">
                 
                  <ImprimentList/>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </div>
            </TabsContent>

            {/* Formulaire d'ajout */}
            <TabsContent
              value="ajouter_facteur"
              className="border-none p-0 outline-none flex-col gap-4"
            >
              <h2 className="text-2xl font-semibold">Ajouter un Imprimeurs</h2>
              <p className="text-sm text-muted-foreground">
                Remplissez les informations pour enregistrer un nouveau Imprimeurs.
              </p>

              <Separator />

              <AjouterImpriment
                handelSubmitAjouter={(values) => ImprimentApi.create(values)}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
