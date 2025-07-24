import React, { useEffect, useState } from 'react'
import { DataTableClient } from './dataTableClient'
import { ClientApi } from '../../../servicesApi/ClientApi'
import { DataTableColumnHeaderClient } from '../DataTableColumnHeaderClient'
import { toast } from "sonner"


import { Button } from "@/components/ui/button"
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
import { Trash,Trash2Icon ,RefreshCcw} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { UpdateClient } from '../../../Admin/Client/UpdateClient'

export default function ClientList() {
 const Clientcolumns = [
        {
          accessorKey: "id",
          header: ({ column }) => (
            <DataTableColumnHeaderClient column={column} title="#ID" />
          ),
        },
        {
          accessorKey: "name",
          header: ({ column }) => (
            <DataTableColumnHeaderClient column={column} title="Name" />
          ),
        },
        {
          accessorKey: "email",
          header: ({ column }) => (
            <DataTableColumnHeaderClient column={column} title="Email" />
          ),
        },
        {
          accessorKey: "Code_Client",
          header: ({ column }) => (
            <DataTableColumnHeaderClient column={column} title="Code_Client" />
          ),
        },
      
        {
          accessorKey: "phone",
          header: ({ column }) => (
            <DataTableColumnHeaderClient column={column} title="Téléphone" />
          ),
        },
        
        {
          accessorKey: "address",
          header: ({ column }) => (
            <DataTableColumnHeaderClient column={column} title="Adresse" />
          ),
        },
          {
          accessorKey: "ICE",
          header: ({ column }) => (
            <DataTableColumnHeaderClient column={column} title="ICE" />
          ),
        },
        {
          accessorKey: "status",
          header: ({ column }) => (
            <DataTableColumnHeaderClient column={column} title="status" />
          ),
        },
        {
          accessorKey: "intitule",
          header: ({ column }) => (
            <DataTableColumnHeaderClient column={column} title="intitule" />
          ),
        },
        // {
        //   accessorKey: "ville.name",
        //   header: ({ column }) => (
        //     <DataTableColumnHeaderClient column={column} title="Ville" />
        //   ),
        //   cell: ({ row }) => <div>{row.original.ville?.name ?? '—'}</div>,
        // },
        // {
        //   accessorKey: "typeClient.name",
        //   header: ({ column }) => (
        //     <DataTableColumnHeaderClient column={column} title="Type Client" />
        //   ),
        //   cell: ({ row }) => <div>{row.original.typeClient?.name ?? '—'}</div>,
        // },
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
            const { id, name } = row.original
            const [openUpdateDialog,setopenUpdateDialog] = useState(false)

           
            
            return (
                <>
                
                     <Sheet open={openUpdateDialog} onOpenChange={setopenUpdateDialog}>
                <SheetTrigger>
                <Button size="sm" ><RefreshCcw /></Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>update Client {name}?</SheetTitle>
                    <SheetDescription>
                     Make change to your Clien here . Clicksave you're done
                     <UpdateClient  values={row.original} handelSubmit={(values)=>{
                      const promise = ClientApi.update(id,values)
                       promise.then(()=>setopenUpdateDialog(false));
                       return promise
                     }}/>

                     {/* <UpdateEmployer values={row.original} handelSubmit={(values)=>{
                      const promise = EmployerApi.update(id,values)
                       promise.then(()=>setopenUpdateDialog(false));
                       return promise
                     }}/> */}
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
                      Are you absolutely sure you want to delete <span className="font-bold">{name}</span>?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete the user and remove their data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction className="px-4 py-2 rounded bg-red-600 text-white dark:bg-red-700" onClick={() =>{
                        const deletingLoader = toast.loading('Deleting in progress.')
                         ClientApi.delete(id).then(({data:deleteClient,status})=>{
                            toast.dismiss(deletingLoader)
                            if(status ===200){
                              setdata(data.filter((e)=>e.id!==id))
                             toast("Delete Client", {
                                       title: "Succès",
                                       description: `Client deleted avec succès. ${deleteClient.data.name}`,
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
        ClientApi.all().then(({ data }) => {
          console.log(data.clients);       // Vérifie bien ce qui est loggé ici
          setdata(data.clients);           // Mets à jour ton state correctement
        });
      }, []);

    
  return (
   
    <div>
        <DataTableClient columns={Clientcolumns} data={data}/>
    </div>
  )
}
