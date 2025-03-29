"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { formatCurrency } from "@/lib/utils"
import { useExpenses } from "@/context/expenses-context"

export function ExpenseSummary() {
  const { expenses, loading } = useExpenses()

  // Calculate totals
  const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0)

  // Group by remitter
  const remitterTotals = expenses.reduce(
    (acc, expense) => {
      const { remitter, amount } = expense
      if (!acc[remitter]) {
        acc[remitter] = 0
      }
      acc[remitter] += amount
      return acc
    },
    {} as Record<string, number>,
  )

  if (loading) {
    return (
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="text-sm font-medium text-muted-foreground mb-1">Total Expenses</div>
              <Skeleton className="h-7 w-28" />
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground mb-1">By Remitter</div>
              <div className="space-y-2">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="flex justify-between">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-sidebar-primary">Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="text-sm font-medium text-muted-foreground mb-1">Total Expenses</div>
            <div className="text-2xl font-bold text-sidebar-primary">
              {expenses.length > 0 ? formatCurrency(totalAmount, expenses[0].currency) : formatCurrency(0, "EUR")}
            </div>
          </div>
          {Object.keys(remitterTotals).length > 0 && (
            <div>
              <div className="text-sm font-medium text-muted-foreground mb-1">By Remitter</div>
              <div className="space-y-2">
                {Object.entries(remitterTotals).map(([remitter, amount]) => (
                  <div key={remitter} className="flex justify-between">
                    <span>{remitter}</span>
                    <span className="font-medium text-sidebar-primary">
                      {formatCurrency(amount, expenses[0].currency)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

