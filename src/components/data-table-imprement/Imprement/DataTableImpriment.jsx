"use client"

import {
  
    getPaginationRowModel,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getSortedRowModel,
  
    getFilteredRowModel

} from "@tanstack/react-table"

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

import { DataTablePaginationImpriment } from "../DataTablePaginationImpriment"
import { DataTableViewOptionsImpriment } from "../DataTableViewOptionsImpriment"



export function DataTableImprimet({columns,data}) {
    const [sorting, setSorting] = useState([])
    const [columnFilters, setColumnFilters] = useState([])
    const [columnVisibility, setColumnVisibility] =useState({})
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
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
     
     <div className="rounded-md border">
  <div className="rounded-md border p-4">
  <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
  <Input
    placeholder="Filter emails..."
    value={(table.getColumn("email")?.getFilterValue()) ?? ""}
    onChange={(event) =>
      table.getColumn("email")?.setFilterValue(event.target.value)
    }
    className="max-w-sm w-full md:w-auto"
  />

 <DataTableViewOptionsImpriment table={table}/>
</div>

    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id}>
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
       <div className="my-3">
        <DataTablePaginationImpriment table={table} />
        </div>
  </div>
</div>

   
    </>
  )
}
