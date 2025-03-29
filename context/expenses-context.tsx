"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Expense } from "@/types/expense"
import { fetchExpenses } from "@/lib/api"
import { useToast } from "@/components/ui/use-toast"

interface ExpensesContextType {
  expenses: Expense[]
  loading: boolean
  error: string | null
  addExpense: (expense: Expense) => void
  refreshExpenses: () => Promise<void>
}

const ExpensesContext = createContext<ExpensesContextType | undefined>(undefined)

export function ExpensesProvider({ children }: { children: ReactNode }) {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const loadExpenses = async () => {
    try {
      setLoading(true)
      const data = await fetchExpenses()

      // Filter for current month
      const now = new Date()
      const currentMonth = now.getMonth()
      const currentYear = now.getFullYear()

      const currentMonthExpenses = data.filter((expense) => {
        const expenseDate = new Date(expense.date)
        return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear
      })

      setExpenses(currentMonthExpenses)
      setError(null)
    } catch (err) {
      setError("Failed to load expenses. Please try again later.")
      console.error(err)
      toast({
        title: "Error",
        description: "Failed to load expenses. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadExpenses()
  }, [])

  const addExpense = (expense: Expense) => {
    setExpenses((prevExpenses) => [expense, ...prevExpenses])
  }

  const refreshExpenses = async () => {
    await loadExpenses()
  }

  return (
    <ExpensesContext.Provider value={{ expenses, loading, error, addExpense, refreshExpenses }}>
      {children}
    </ExpensesContext.Provider>
  )
}

export function useExpenses() {
  const context = useContext(ExpensesContext)
  if (context === undefined) {
    throw new Error("useExpenses must be used within an ExpensesProvider")
  }
  return context
}

