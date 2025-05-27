"use client"

import { useState, useEffect } from "react"
import ExpenseList from "@/components/expense-list"
import MonthYearSelector from "@/components/month-year-selector"
import SearchAndFilter from "@/components/search-filter"
import ExpenseSummary from "@/components/expense-summary"
import AddExpenseDialog from "@/components/add-expense-dialog"
import { getExpensesByMonth } from "@/lib/api"
import type { ExpenseDto } from "@/lib/types"

export default function Home() {
  const [expenses, setExpenses] = useState<ExpenseDto[]>([])
  const [filteredExpenses, setFilteredExpenses] = useState<ExpenseDto[]>([])
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false)

  useEffect(() => {
    const fetchExpenses = async () => {
      const data = await getExpensesByMonth(selectedYear, selectedMonth)
      setExpenses(data)
      setFilteredExpenses(data)
    }

    fetchExpenses().then()
  }, [selectedMonth, selectedYear])

  useEffect(() => {
    let result = expenses

    // Filter by search term
    if (searchTerm) {
      result = result.filter((expense) => expense.title.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    // Filter by categories
    if (selectedCategories.length > 0) {
      result = result.filter((expense) => selectedCategories.includes(expense.category))
    }

    setFilteredExpenses(result)
  }, [searchTerm, selectedCategories, expenses])

  const handleMonthYearChange = (month: number, year: number) => {
    setSelectedMonth(month)
    setSelectedYear(year)
  }

  const handleSearch = (term: string) => {
    setSearchTerm(term)
  }

  const handleCategoryFilter = (categories: string[]) => {
    setSelectedCategories(categories)
  }

  const handleAddExpense = async (newExpense: ExpenseDto) => {
    const date = new Date(newExpense.referenceDate);
    if (selectedMonth == (date.getMonth() + 1) && selectedYear == date.getFullYear()) {
      setExpenses((prev) => [newExpense, ...prev])
    }
    setIsAddExpenseOpen(false)
  }

  const allCategories = Array.from(new Set(expenses.map((expense) => expense.category)))

  return (
    <div className="space-y-6">
      <ExpenseSummary expenses={filteredExpenses} />

      <MonthYearSelector selectedMonth={selectedMonth} selectedYear={selectedYear} onChange={handleMonthYearChange} />

      <SearchAndFilter onSearch={handleSearch} onCategoryFilter={handleCategoryFilter} categories={allCategories} onAddExpense={() => setIsAddExpenseOpen(true)} />

      <ExpenseList
          expenses={filteredExpenses}
          onDelete={(id) => setExpenses((prev) => prev.filter((expense) => expense.id !== id))}
      />

      <AddExpenseDialog
        isOpen={isAddExpenseOpen}
        onClose={() => setIsAddExpenseOpen(false)}
        onAddExpense={handleAddExpense}
      />
    </div>
  )
}
