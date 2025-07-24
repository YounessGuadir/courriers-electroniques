import {
  flexRender,
  
  getFilteredRowModel,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  getSortedRowModel,
} from "@tanstack/react-table"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from "../DataTableViewOptions"
import { DataTablePagination } from "../DataTablePagination "



export function DataTable({columns,data}) {
const [sorting, setSorting] = useState([])
const [columnFilters, setColumnFilters] = useState([])
const [columnVisibility, setColumnVisibility] =useState({})
  const table = useReactTable({
    data,
    columns,
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  })

  return (
    <div className="rounded-md border">
         <div className="rounded-md border p-4">
  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
    
    {/* Filtre par email */}
    <Input
      placeholder="Filtrer les emails..."
      value={table.getColumn("email")?.getFilterValue() ?? ""}
      onChange={(event) =>
        table.getColumn("email")?.setFilterValue(event.target.value)
      }
      className="max-w-sm w-full md:w-auto"
    />

    {/* Menu de colonnes */}
    <DataTableViewOptions table={table} />

  </div>
</div>

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="my-5">
      <DataTablePagination table={table} />
      </div>
     
    </div>
  )
}
