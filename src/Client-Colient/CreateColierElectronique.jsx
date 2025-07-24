import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { PlusCircle, List, Mail, Users } from "lucide-react"
import { AjouterColier } from './AjouterColier'
import ColierApi from '../servicesApi/ColierApi'
import { AjouterDestinataire } from './AjouterDestinataire'
import DestinataireApi from '../servicesApi/DestinataireApi'
import { Card } from "@/components/ui/card"

export default function CreateColierElectronique() {
  return (
    <div className="container mx-auto p-4 min-h-screen">
      <div className="md:hidden">
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-center mb-4">
            Please use a larger screen for the best experience
          </h2>
        </Card>
      </div>

      <div className="hidden md:block">
        <Card className="bg-background/60 backdrop-blur-sm border-none shadow-lg">
          <div className="grid">
            <div className="col-span-3 lg:col-span-4">
              <div className="h-full px-6 py-8">
                <Tabs defaultValue="destinataire_list" className="h-full space-y-8">
                  <div className="flex items-center justify-between">
                    <TabsList className="grid w-full max-w-md grid-cols-2 h-12">
                      <TabsTrigger 
                        value="destinataire_list" 
                        className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                      >
                        <Users className="mr-2 h-5 w-5" />
                        Destinataire
                      </TabsTrigger>

                      <TabsTrigger 
                        value="add_colier"
                        className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                      >
                        <Mail className="mr-2 h-5 w-5" />
                        Nouveau Courrier
                      </TabsTrigger>
                    </TabsList>
                  </div>

                  <TabsContent 
                    value="destinataire_list" 
                    className="border-none p-0 outline-none"
                  >
                    <Card className="p-6">
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <h2 className="text-2xl font-semibold tracking-tight text-primary">
                            Ajouter un Destinataire
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            Ajoutez un nouveau destinataire pour vos courriers électroniques
                          </p>
                        </div>

                        <div className="bg-card rounded-lg p-6">
                          <AjouterDestinataire 
                            handelSubmitAjouter={(values) => DestinataireApi.create(values)} 
                          />
                        </div>
                      </div>

                      <Separator className="my-8" />

                      <div className="relative">
                        <ScrollArea>
                          <div className="flex space-x-4 pb-4">
                            {/* Liste des destinataires si nécessaire */}
                          </div>
                          <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                      </div>
                    </Card>
                  </TabsContent>

                  <TabsContent 
                    value="add_colier" 
                    className="h-full flex-col border-none p-0 data-[state=active]:flex"
                  >
                    <Card className="p-6">
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <h2 className="text-2xl font-semibold tracking-tight text-primary">
                            Nouveau Courrier Électronique
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            Créez et envoyez un nouveau courrier électronique
                          </p>
                        </div>

                        <div className="bg-card rounded-lg p-6">
                          <AjouterColier 
                            handelSubmitAjouter={(values) => ColierApi.create(values)} 
                          />
                        </div>
                      </div>

                      <Separator className="my-8" />
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}