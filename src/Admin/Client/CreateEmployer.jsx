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
import { Card, CardContent } from "@/components/ui/card";
import { AjouterClient } from "./AjouterClient";
import { ClientApi } from "../../servicesApi/ClientApi";
import ClientList from "../../components/data-table-client/Client/ClientList";

export default function CreateClient() {
  return (
    <>
      {/* Mobile fallback */}
      <div className="md:hidden px-4 py-8 text-center">
        <Card className="bg-gradient-to-br ">
          <CardContent className="pt-6">
            <div className="text-amber-600 mb-2">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="48" 
                height="48" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="mx-auto"
              >
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Écran non compatible</h3>
            <p className="text-muted-foreground">
              Veuillez utiliser un écran plus large pour accéder à la gestion des clients.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Desktop version */}
      <div className="hidden md:block">
        <div className="bg-gradient-to-br  min-h-screen px-6 py-8 lg:px-12">
          <Tabs defaultValue="client_list" className="space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">
                  Gestion des clients
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Gérez votre portefeuille client en toute simplicité
                </p>
              </div>
              <TabsList className=" shadow-sm">
                <TabsTrigger value="client_list" className="gap-2  ">
                  <List className="w-4 h-4" />
                  Liste
                </TabsTrigger>
                <TabsTrigger value="ajouter_client" className="gap-2 data-[state=active]:bg-slate-100 data-[state=active]:text-slate-900">
                  <PlusCircle className="w-4 h-4" />
                  Ajouter
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Client list */}
            <TabsContent
              value="client_list"
              className="border-none p-0 outline-none animate-fade-in"
            >
              <Card className=" backdrop-blur-sm  shadow-sm">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h2 className="text-2xl font-semibold">Liste des clients</h2>
                      <p className="text-sm text-muted-foreground">
                        Consultez les clients enregistrés dans le système.
                      </p>
                    </div>

                    <Separator className="my-4" />

                    <ScrollArea className="rounded-md border ">
                      <ClientList />
                      <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Add client */}
            <TabsContent
              value="ajouter_client"
              className="border-none p-0 outline-none animate-fade-in"
            >
              <Card className=" backdrop-blur-sm  shadow-sm">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h2 className="text-2xl font-semibold">Ajouter un client</h2>
                      <p className="text-sm text-muted-foreground">
                        Renseignez les informations du nouveau client.
                      </p>
                    </div>

                    <Separator className="my-4" />

                    <div className=" p-6 rounded-lg border ">
                      <AjouterClient
                        handelSubmitAjouter={(values) => ClientApi.create(values)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
