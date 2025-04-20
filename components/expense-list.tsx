"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { ExpenseDto } from "@/lib/types"
import ExpenseDetailDialog from "./expense-detail-dialog"
import GetCategoryColor from "@/components/ui/category-colors";

interface ExpenseListProps {
  expenses: ExpenseDto[]
  onDelete: (id: string) => void
}

export default function ExpenseList({ expenses, onDelete }: ExpenseListProps) {
  const [selectedExpense, setSelectedExpense] = useState<ExpenseDto | null>(null)

  // Sort expenses by date in descending order
  const sortedExpenses = [...expenses].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="space-y-4">
      {sortedExpenses.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium">No expenses found</h3>
          <p className="text-muted-foreground mt-1">Try adjusting your filters or add a new expense</p>
        </div>
      ) : (
        <div className="space-y-3">
          {sortedExpenses.map((expense) => (
            <Card
              key={expense.id}
              className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer border-border/50"
              onClick={() => setSelectedExpense(expense)}
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h3 className="font-medium">{expense.title}</h3>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={GetCategoryColor(expense.category)}>
                        {expense.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">by {expense.remitter}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg">€{expense.amount.toFixed(2)}</div>
                    <span className="text-xs text-muted-foreground">{formatDate(expense.date)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {selectedExpense && (
        <ExpenseDetailDialog
          expense={selectedExpense}
          isOpen={!!selectedExpense}
          onClose={() => setSelectedExpense(null)}
          onDelete={(id) => onDelete(id)}
        />
      )}
    </div>
  )
}
