"use client"

import { ExpenseItem } from "@/components/expense-item"
import { Skeleton } from "@/components/ui/skeleton"
import { useExpenses } from "@/context/expenses-context"

export function ExpensesList() {
  const { expenses, loading, error } = useExpenses()

  if (loading) {
    return (
      <div className="space-y-4 mt-6">
        <h2 className="text-xl font-semibold">Current Month Expenses</h2>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="p-4 border rounded-lg">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
              <Skeleton className="h-6 w-20" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return <div className="p-4 mt-6 border border-destructive rounded-lg text-destructive">{error}</div>
  }

  return (
    <div className="space-y-4 mt-6">
      <h2 className="text-xl font-semibold">Current Month Expenses</h2>
      {expenses.length === 0 ? (
        <div className="p-4 border rounded-lg text-center text-muted-foreground">
          No expenses found for the current month.
        </div>
      ) : (
        expenses.map((expense) => <ExpenseItem key={expense.id} expense={expense} />)
      )}
    </div>
  )
}

