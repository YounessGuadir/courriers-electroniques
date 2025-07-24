"use client"

import {
  
getPaginationRowModel,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,

  getFilteredRowModel

} from "@tanstack/react-table"
import { Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useState } from "react"
import { Input } from "@/components/ui/input"

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import { Button } from "@/components/ui/button"
import { DataTablePaginationClient } from "../DataTablePaginationClient"
import { DataTableViewOptionsClient } from "../DataTableViewOptionsClient"



export function DataTableClient({columns,data,filterColumn = "email" }) {
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
    <>
     
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={`Filter ${filterColumn}...`}
            value={(table.getColumn(filterColumn)?.getFilterValue()) ?? ""}
            onChange={(event) =>
              table.getColumn(filterColumn)?.setFilterValue(event.target.value)
            }
            className="w-full pl-8"
          />
        </div>
        <DataTableViewOptionsClient table={table} />
      </div>
      
      <div className="rounded-md border border-border bg-background shadow-sm">
        <div className="relative overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/50">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="hover:bg-muted/20">
                  {headerGroup.headers.map((header) => (
                    <TableHead 
                      key={header.id}
                      className="font-semibold text-muted-foreground"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="hover:bg-muted/30 transition-colors"
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
                  <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                    No results found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
        <div className="border-t border-border px-4 py-3 sm:px-6">
          <DataTablePaginationClient table={table} />
        </div>
      </div>
    </div>
   
    </>
  )
}
