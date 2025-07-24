

import { PlusCircle,List } from "lucide-react"

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from  "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Link } from "react-router-dom";
import { AjouterEmployer } from "./AjouterEmployer";
import Employerlist from "../components/data-table/employer/Employerlist";
import { UpdateEmployer } from "./UpdateEmployer";
import EmployerApi from "../servicesApi/EmployerApi";



// import { AlbumArtwork } from "./components/album-artwork"



export const metadata = {
  title: "Music App",
  description: "Example music app using the components.",
}

export default function CreateEmployer() {
  return (
    <>
      <div className="md:hidden">

      </div>
      <div className="hidden md:block">
      
        <div className="">
          <div className="bg-background">
            <div className="grid">
              <div className="col-span-3 lg:col-span-4 ">
                <div className="h-full px-4 py-6 lg:px-8">
                  <Tabs defaultValue="emoloyer_list" className="h-full space-y-6">
                    <div className="space-between flex items-center">
                      <TabsList>
                        <TabsTrigger value="emoloyer_list" className="relative">
                          <List/>
                       
                        Employer
                        </TabsTrigger>

                        <TabsTrigger  value="podcasts">
                        <PlusCircle />
                        
                        Ajouter Employer
                       
                            
                            </TabsTrigger>
                    
                      </TabsList>
                 
                    </div>
                    <TabsContent
                      value="emoloyer_list"
                      className="border-none p-0 outline-none"
                    >
                      <div className="">
                        <div className="space-y-1">
                          <h2 className="text-2xl font-semibold tracking-tight">
                            Listen Employer
                          </h2>
                          <p className="text-sm text-muted-foreground">
                             <Employerlist/>
                          </p>
                        </div>
                      </div>
                      <Separator className="my-4" />
                      <div className="relative">
                        <ScrollArea>
                          <div className="flex space-x-4 pb-4">
                       
                          </div>
                          <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                      </div>
                    
                      <Separator className="my-4" />
                      <div className="relative">
                        <ScrollArea>
                          <div className="flex space-x-4 pb-4">
                          
                          </div>
                          <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                      </div>
                    </TabsContent>
                    <TabsContent
                      value="podcasts"
                      className="h-full flex-col border-none p-0 data-[state=active]:flex"
                    >
                   
                        <div className="space-y-1">
                         <AjouterEmployer handelSubmitAjouter={(values)=>EmployerApi.create(values)}/>
                        </div>

                        <div className="space-y-1">
                         {/* <UpdateEmployer handelSubmit={(values)=>EmployerApi.create(values)}/> */}
                        </div>
                    
                      <Separator className="my-4" />
               
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}