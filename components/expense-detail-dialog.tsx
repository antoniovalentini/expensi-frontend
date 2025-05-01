import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import type { ExpenseDto } from "@/lib/types"
import { deleteExpense } from "@/lib/api"
import GetCategoryColor from "@/components/ui/category-colors";
import {Button} from "@/components/ui/button";
import type React from "react";

interface ExpenseDetailDialogProps {
  expense: ExpenseDto
  isOpen: boolean
  onClose: () => void
  onDelete: (id: string) => void
}

export default function ExpenseDetailDialog({ expense, isOpen, onClose, onDelete }: ExpenseDetailDialogProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">{expense.title}</DialogTitle>
          <DialogDescription>Expense details and information</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-4">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Amount</span>
            <span className="text-2xl font-bold">€{expense.amount.toFixed(2)}</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Category</p>
              <Badge className={`mt-1 ${GetCategoryColor(expense.category)}`}>{expense.category}</Badge>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Date</p>
              <p className="font-medium">{formatDate(expense.referenceDate)}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Remitter</p>
              <p className="font-medium">{expense.remitter}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Currency</p>
              <p className="font-medium">EUR</p>
            </div>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Transaction ID</p>
            <p className="font-mono text-xs break-all">{expense.id}</p>
          </div>

          <div className="pt-2">
            <Button
                type="button"
                variant="destructive"
                className="w-full"
                onClick={async () => {
                  const result = await deleteExpense(expense.id);
                  if (result) {
                    onDelete(expense.id);
                    onClose();
                  } else {
                    alert("Failed to delete expense");
                  }
                }}
            >
              Delete
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
