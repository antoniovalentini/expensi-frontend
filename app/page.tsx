import { ExpensesList } from "@/components/expenses-list"
import { ExpenseSummary } from "@/components/expense-summary"
import { SidebarTrigger } from "@/components/sidebar-trigger"
import { AddExpenseButton } from "@/components/add-expense-button"

export default function Home() {
  return (
    <main className="container mx-auto p-4 max-w-3xl transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <SidebarTrigger />
          <h1 className="text-2xl font-bold ml-2 bg-gradient-to-r from-sidebar-primary to-[hsl(var(--category-entertainment))] bg-clip-text text-transparent">
            Budget Tracker
          </h1>
        </div>
        <AddExpenseButton />
      </div>
      <ExpenseSummary />
      <ExpensesList />
    </main>
  )
}

