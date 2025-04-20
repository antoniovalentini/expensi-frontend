import type { CreateExpenseDto, ExpenseDto } from "./types"

const baseUrl: string = "http://localhost:5038/api/expenses";

// Mock data for April 2025
const mockExpensesApril: ExpenseDto[] = [
  {
    id: "1",
    title: "Weekly Grocery Shopping",
    amount: 127.85,
    currency: "$",
    date: new Date(2025, 3, 10),
    category: "Groceries",
    remitter: "John",
    createdById: "user1",
  },
  {
    id: "2",
    title: "Electricity Bill",
    amount: 89.5,
    currency: "$",
    date: new Date(2025, 3, 5),
    category: "Utilities",
    remitter: "Sara",
    createdById: "user1",
  },
  {
    id: "3",
    title: "Movie Night",
    amount: 42.0,
    currency: "$",
    date: new Date(2025, 3, 8),
    category: "Entertainment",
    remitter: "Family",
    createdById: "user1",
  },
  {
    id: "4",
    title: "Gas Station",
    amount: 65.75,
    currency: "$",
    date: new Date(2025, 3, 12),
    category: "Car",
    remitter: "John",
    createdById: "user1",
  },
  {
    id: "5",
    title: "Doctor's Appointment",
    amount: 120.0,
    currency: "$",
    date: new Date(2025, 3, 7),
    category: "Healthcare",
    remitter: "Sara",
    createdById: "user1",
  },
  {
    id: "6",
    title: "School Supplies",
    amount: 78.35,
    currency: "$",
    date: new Date(2025, 3, 3),
    category: "Education",
    remitter: "Family",
    createdById: "user1",
  },
  {
    id: "7",
    title: "Rent Payment",
    amount: 1200.0,
    currency: "$",
    date: new Date(2025, 3, 1),
    category: "Housing",
    remitter: "John",
    createdById: "user1",
  },
  {
    id: "8",
    title: "Internet Subscription",
    amount: 59.99,
    currency: "$",
    date: new Date(2025, 3, 15),
    category: "Utilities",
    remitter: "Sara",
    createdById: "user1",
  },
]

// Mock data for March 2025
const mockExpensesMarch: ExpenseDto[] = [
  {
    id: "m1",
    title: "Weekly Grocery Shopping",
    amount: 135.42,
    currency: "$",
    date: new Date(2025, 2, 12),
    category: "Groceries",
    remitter: "Sara",
    createdById: "user1",
  },
  {
    id: "m2",
    title: "Electricity Bill",
    amount: 92.75,
    currency: "$",
    date: new Date(2025, 2, 7),
    category: "Utilities",
    remitter: "John",
    createdById: "user1",
  },
  {
    id: "m3",
    title: "Concert Tickets",
    amount: 120.0,
    currency: "$",
    date: new Date(2025, 2, 18),
    category: "Entertainment",
    remitter: "Family",
    createdById: "user1",
  },
  {
    id: "m4",
    title: "Car Maintenance",
    amount: 210.5,
    currency: "$",
    date: new Date(2025, 2, 22),
    category: "Car",
    remitter: "John",
    createdById: "user1",
  },
  {
    id: "m5",
    title: "Dental Checkup",
    amount: 85.0,
    currency: "$",
    date: new Date(2025, 2, 15),
    category: "Healthcare",
    remitter: "Sara",
    createdById: "user1",
  },
  {
    id: "m6",
    title: "Rent Payment",
    amount: 1200.0,
    currency: "$",
    date: new Date(2025, 2, 1),
    category: "Housing",
    remitter: "John",
    createdById: "user1",
  },
]

// Mock data for February 2025
const mockExpensesFebruary: ExpenseDto[] = [
  {
    id: "f1",
    title: "Weekly Grocery Shopping",
    amount: 142.3,
    currency: "$",
    date: new Date(2025, 1, 8),
    category: "Groceries",
    remitter: "John",
    createdById: "user1",
  },
  {
    id: "f2",
    title: "Electricity Bill",
    amount: 105.2,
    currency: "$",
    date: new Date(2025, 1, 5),
    category: "Utilities",
    remitter: "Sara",
    createdById: "user1",
  },
  {
    id: "f3",
    title: "Valentine's Day Dinner",
    amount: 95.0,
    currency: "$",
    date: new Date(2025, 1, 14),
    category: "Entertainment",
    remitter: "John",
    createdById: "user1",
  },
  {
    id: "f4",
    title: "Gas Station",
    amount: 72.45,
    currency: "$",
    date: new Date(2025, 1, 20),
    category: "Car",
    remitter: "Sara",
    createdById: "user1",
  },
  {
    id: "f5",
    title: "Prescription Medication",
    amount: 45.0,
    currency: "$",
    date: new Date(2025, 1, 17),
    category: "Healthcare",
    remitter: "Family",
    createdById: "user1",
  },
  {
    id: "f6",
    title: "Rent Payment",
    amount: 1200.0,
    currency: "$",
    date: new Date(2025, 1, 1),
    category: "Housing",
    remitter: "John",
    createdById: "user1",
  },
  {
    id: "f7",
    title: "Winter Clothes",
    amount: 185.75,
    currency: "$",
    date: new Date(2025, 1, 10),
    category: "Shopping",
    remitter: "Sara",
    createdById: "user1",
  },
]

// Get expenses for chart - simplified and fixed
export async function getExpensesByMonthForChart(
  year: number,
  month: number,
  numberOfMonths = 3,
): Promise<{ month: string; amount: number }[]> {
  const x = new Date();
  x.setDate(1);
  x.setMonth(x.getMonth()-1);
  console.log(x.getMonth()-1);

  // Hardcoded data for the three months
  const chartData = [
    {
      month: "Feb",
      amount: mockExpensesFebruary.reduce((sum, expense) => sum + expense.amount, 0),
    },
    {
      month: "Mar",
      amount: mockExpensesMarch.reduce((sum, expense) => sum + expense.amount, 0),
    },
    {
      month: "Apr",
      amount: mockExpensesApril.reduce((sum, expense) => sum + expense.amount, 0),
    },
  ]

  return chartData
}

export async function getExpensesByMonth(year: number, month: number): Promise<ExpenseDto[]> {

  console.log(`Fetching expenses for year: ${year}, month: ${month}`);

  if (year === 2025) {
    // if (month === 4) return mockExpensesApril;
    const response = await fetch(`${baseUrl}/by-month/${year}/${month}`);
    return await response.json();
  }

  return []
}

export async function getExpenseById(id: string): Promise<ExpenseDto | null> {
  console.log(`Fetching expense by id ${id}`);
  const response = await fetch(`${baseUrl}/${id}`);
  return await response.json();
}

export async function createExpense(expense: CreateExpenseDto): Promise<ExpenseDto> {
  console.log("Creating expense", expense);
  const response = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(expense),
  });

  if (!response.ok) {
      throw new Error("Failed to create expense");
  }

  console.log("Expense created successfully");
  const newExpense: ExpenseDto = await response.json();
  console.log(newExpense);

  return newExpense
}

export async function deleteExpense(id: string): Promise<boolean> {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    console.log("Failed to delete expense");
    return false;
  }

  console.log("Expense deleted successfully");
  return true;
}
