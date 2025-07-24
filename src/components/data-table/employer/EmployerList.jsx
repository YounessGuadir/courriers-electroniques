import React, { useEffect, useState } from 'react'
import { DataTable } from './Data-Table'
import EmployerApi from '../../../servicesApi/EmployerApi'
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
import { DataTableColumnHeader } from '../DataTableColumnHeader'
import { Trash2Icon,RefreshCcw } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { UpdateEmployer } from '../../../Admin/UpdateEmployer'

// 👉 colonne définies ici, et non importées


// 👇 Fonction principale
export default function EmployerList() {
    const employerColumns = [
        {
          accessorKey: "id",
          header: ({ column }) => (
            <DataTableColumnHeader column={column} title="#id" />
          ),
        },
        {
          accessorKey: "name",
          header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Name" />
          ),
        },
        {
          accessorKey: "email",
          header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Email" />
          ),
        },
        {
          accessorKey: "user.name",
          header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Client" />
          ),
          cell: ({ row }) => row.original.user?.name ?? "N/A",
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
                    <SheetTitle>update Employer {name}?</SheetTitle>
                    <SheetDescription>
                     Make change to your Employer here . Clicksave you're done

                     <UpdateEmployer values={row.original} handelSubmit={(values)=>{
                      const promise = EmployerApi.update(id,values)
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
                         EmployerApi.delete(id).then(({data:deleteEmployer,status})=>{
                            toast.dismiss(deletingLoader)
                            if(status ===200){
                              setData(data.filter((e)=>e.id!==id))
                             toast("Delete Employer", {
                                       title: "Succès",
                                       description: `Employé deleted avec succès. ${deleteEmployer.data.name}`,
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
  const [data, setData] = useState([])

  useEffect(() => {
    EmployerApi.all().then(({ data }) => {
      setData(data.data)
    })
  }, [])

//   const handleDelete = (id) => {
//     EmployerApi.delete(id).then(() => {
//       setData(prev => prev.filter(emp => emp.id !== id))
//     })
//   }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Liste des employeurs</h2>
      <DataTable columns={employerColumns} data={data} />
    </div>
  )
}
