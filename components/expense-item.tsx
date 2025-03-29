import { formatCurrency, formatDate } from "@/lib/utils"
import type { Expense } from "@/types/expense"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

interface ExpenseItemProps {
  expense: Expense
}

export function ExpenseItem({ expense }: ExpenseItemProps) {
  // Map category to color class
  const getCategoryColorClass = (category: string) => {
    const lowerCategory = category.toLowerCase()
    if (lowerCategory === "food and household items") return "bg-[hsl(var(--category-food))]"
    if (lowerCategory === "utilities") return "bg-[hsl(var(--category-utilities))]"
    if (lowerCategory === "entertainment") return "bg-[hsl(var(--category-entertainment))]"
    if (lowerCategory === "car") return "bg-[hsl(var(--category-transportation))]"
    if (lowerCategory === "services") return "bg-[hsl(var(--category-services))]"
    if (lowerCategory === "home") return "bg-[hsl(var(--category-home))]"
    if (lowerCategory === "hobby") return "bg-[hsl(var(--category-hobby))]"
    if (lowerCategory === "health") return "bg-[hsl(var(--category-health))]"
    if (lowerCategory === "dining out") return "bg-[hsl(var(--category-dining))]"
    if (lowerCategory === "travel") return "bg-[hsl(var(--category-travel))]"
    if (lowerCategory === "extra") return "bg-[hsl(var(--category-extra))]"
    return "bg-[hsl(var(--category-other))]"
  }

  return (
    <Card className="overflow-hidden border-border/50 hover:border-border transition-colors duration-200">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h3 className="font-medium">{expense.title}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{formatDate(expense.date)}</span>
              <Badge variant="outline" className={`text-xs text-white ${getCategoryColorClass(expense.category)}`}>
                {expense.category}
              </Badge>
              <span>By {expense.remitter}</span>
            </div>
          </div>
          <div className="font-semibold text-sidebar-primary">{formatCurrency(expense.amount, expense.currency)}</div>
        </div>
      </CardContent>
    </Card>
  )
}

