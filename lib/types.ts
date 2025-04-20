export interface CreateExpenseDto {
  title: string
  amount: number
  currency: string
  date: Date
  category: string
  remitter: string
}

export interface ExpenseDto {
  id: string
  title: string
  amount: number
  currency: string
  date: Date
  category: string
  remitter: string
  createdById: string
}
