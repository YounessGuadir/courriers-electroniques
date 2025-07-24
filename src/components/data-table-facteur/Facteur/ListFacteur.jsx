import React, { useEffect, useState } from 'react'
import { Trash,Trash2Icon,RefreshCcw } from "lucide-react";
import FacteurApi from '../../../servicesApi/FacteurApi'
import { DataTableFacteur } from './DataTableFacteur'
import { DataTableColumnHeaderFacteur } from '../DataTableColumnHeaderFacteur';
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { UpdateFacteur } from '../../../Admin/Facteur/UpdateFacteur';


export default function FacteurList() {
 const Facteurcolumns = [
        {
          accessorKey: "id",
          header: ({ column }) => (
            <DataTableColumnHeaderFacteur column={column} title="#ID" />
          ),
        },
        {
          accessorKey: "nom",
          header: ({ column }) => (
            <DataTableColumnHeaderFacteur column={column} title="Nom" />
          ),
        },
        {
            accessorKey: "prenom",
            header: ({ column }) => (
              <DataTableColumnHeaderFacteur column={column} title="Prenom" />
            ),
          },
        {
          accessorKey: "email",
          header: ({ column }) => (
            <DataTableColumnHeaderFacteur column={column} title="Email" />
          ),
        },
        {
          accessorKey: "gender",
          header: ({ column }) => (
            <DataTableColumnHeaderFacteur column={column} title="Sexe" />
          ),
        },
        {
          accessorKey: "phone",
          header: ({ column }) => (
            <DataTableColumnHeaderFacteur column={column} title="Téléphone" />
          ),
        },
        {
          accessorKey: "date_of_birth",
          header: ({ column }) => (
            <DataTableColumnHeaderFacteur column={column} title="Date de naissance" />
          ),
          cell: ({ row }) => {
            const date = row.getValue("date_of_birth");
            return <div>{new Date(date).toLocaleDateString("fr-FR")}</div>;
          },
        },
        {
          accessorKey: "address",
          header: ({ column }) => (
            <DataTableColumnHeaderFacteur column={column} title="Adresse" />
          ),
        },
        {
          accessorKey: "updated_at",
          header: () => <div className="text-right">Updated_at</div>,
          cell: ({ row }) => {
            const date = row.getValue("updated_at")
            const formatted = new Date(date).toLocaleString()
            return <div className="text-right font-medium">{formatted}</div>
          },
        },
        {
            id: "actions",
            header: "Action",
            cell: ({ row }) => {
              const { id, nom } = row.original
              const [openUpdateDialog,setopenUpdateDialog] = useState(false)
             
              return (
                  <>
               <Sheet open={openUpdateDialog} onOpenChange={setopenUpdateDialog}>
                <SheetTrigger>
                <Button size="sm" ><RefreshCcw /></Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>update Client {nom}?</SheetTitle>
                    <SheetDescription>
                     Make change to your Clien here . Clicksave you're done
                  <UpdateFacteur values={row.original} handelSubmit={(values)=>{
                      const promise = FacteurApi.update(id,values)
                       promise.then(()=>setopenUpdateDialog(false));
                       return promise
                     }}/>  

                

                  
                    </SheetDescription>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
                <AlertDialog>
                  <AlertDialogTrigger>
                    <Button size="sm" variant="destructive"><Trash2Icon className="w-5 h-5 hover:text-red-700 cursor-pointer" /></Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure you want to delete <span className="font-bold">{nom}</span>?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the user and remove their data from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction className="px-4 py-2 rounded bg-red-600 text-white dark:bg-red-700" onClick={() =>{
                          const deletingLoader = toast.loading('Deleting in progress.')
                           FacteurApi.delete(id).then(({data:deleteFacteur,status})=>{
                              toast.dismiss(deletingLoader)
                              if(status ===200){
                                setdata(data.filter((e)=>e.id!==id))
                               toast("Delete Client", {
                                         title: "Succès",
                                         description: `Facteur deleted avec succès. ${deleteFacteur.data.nom}`,
                                         icon:<Trash2Icon/>
                                       });
                              }   
                          })
                      }  }>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                </>
              )
            },
          },
      ]
      const [data,setdata] = useState([])
      useEffect(() => {
        FacteurApi.all().then(({ data }) => {
          console.log(data.facteurs);     
          setdata(data.facteurs);           
        });
      }, []);

    
  return (
   
    <div>
        <DataTableFacteur columns={Facteurcolumns} data={data}/>
    </div>
  )
}
