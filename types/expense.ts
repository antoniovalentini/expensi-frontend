export interface Expense {
  id: string
  title: string
  amount: number
  currency: string
  date: string
  category: string
  remitter: string
  createdById: string
}

export interface CreateExpenseDto {
  title: string
  amount: number
  currency: string
  date: string
  category: string
  remitter: string
}
