"use client"

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AddExpenseDialog } from "@/components/add-expense-dialog"
import { useState } from "react"

export function AddExpenseButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant="outline"
        className="border-sidebar-primary text-sidebar-primary hover:bg-sidebar-primary/10 hover:text-sidebar-primary"
      >
        <Plus className="mr-2 h-4 w-4" /> Add Expense
      </Button>
      <AddExpenseDialog open={open} onOpenChange={setOpen} />
    </>
  )
}

