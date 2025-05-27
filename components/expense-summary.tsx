"use client"

import { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ExpenseDto } from "@/lib/types"

interface ExpenseSummaryProps {
  expenses: ExpenseDto[]
}

export default function ExpenseSummary({ expenses }: ExpenseSummaryProps) {
  const { total, byRemitter } = useMemo(() => {
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0)

    const byRemitter = expenses.reduce(
      (acc, expense) => {
        const remitter = expense.remitter
        if (!acc[remitter]) {
          acc[remitter] = 0
        }
        acc[remitter] += expense.amount
        return acc
      },
      {} as Record<string, number>,
    )

    return { total, byRemitter }
  }, [expenses])

  return (
    <Card className="bg-gradient-to-br from-slate-800/40 to-teal-900/30 border-teal-700/30">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Expenses Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div>
            <div className="text-3xl font-bold">€{total.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {expenses.length} expense{expenses.length !== 1 ? "s" : ""}
            </p>
          </div>

          <div className="border-t md:border-t-0 md:border-l border-border/50 pt-4 md:pt-0 md:pl-6 flex-1">
            <div className="space-y-2">
              {Object.entries(byRemitter).length > 0 ? (
                Object.entries(byRemitter).map(([remitter, amount]) => (
                  <div key={remitter} className="flex justify-between items-center">
                    <span className="font-medium">{remitter}</span>
                    <span className="font-semibold">€{amount.toFixed(2)}</span>
                  </div>
                ))
              ) : (
                <div className="text-muted-foreground text-sm">No expenses found</div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
