export interface CreateExpenseDto {
  title: string
  amount: number
  currency: string
  referenceDate: string
  category: string
  remitter: string
}

export interface ExpenseDto {
  id: string
  title: string
  amount: number
  currency: string
  referenceDate: string
  category: string
  remitter: string
  createdById: string
}
