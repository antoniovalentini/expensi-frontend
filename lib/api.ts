import type { Expense } from "@/types/expense"

export async function fetchExpenses(): Promise<Expense[]> {
  
  const response = await fetch('http://localhost:5038/api/expenses');
  const data = await response.json();
  return data;

  // For demo purposes, we'll return mock data
  // return [
  //   {
  //     id: "1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p",
  //     title: "Grocery Shopping",
  //     amount: 89.97,
  //     currency: "EUR",
  //     date: new Date().toISOString(), // Current date
  //     category: "Food",
  //     remitter: "John",
  //     createdById: "user-1a2b3c4d",
  //   },
  //   {
  //     id: "2b3c4d5e-6f7g-8h9i-0j1k-2l3m4n5o6p7q",
  //     title: "Internet Bill",
  //     amount: 59.99,
  //     currency: "EUR",
  //     date: new Date().toISOString(), // Current date
  //     category: "Utilities",
  //     remitter: "Sarah",
  //     createdById: "user-2b3c4d5e",
  //   },
  //   {
  //     id: "3c4d5e6f-7g8h-9i0j-1k2l-3m4n5o6p7q8r",
  //     title: "Movie Tickets",
  //     amount: 32.5,
  //     currency: "EUR",
  //     date: new Date().toISOString(), // Current date
  //     category: "Entertainment",
  //     remitter: "John",
  //     createdById: "user-1a2b3c4d",
  //   },
  //   {
  //     id: "4d5e6f7g-8h9i-0j1k-2l3m-4n5o6p7q8r9s",
  //     title: "Gas",
  //     amount: 45.23,
  //     currency: "EUR",
  //     date: new Date().toISOString(), // Current date
  //     category: "Transportation",
  //     remitter: "Sarah",
  //     createdById: "user-2b3c4d5e",
  //   },
  //   {
  //     id: "5e6f7g8h-9i0j-1k2l-3m4n-5o6p7q8r9s0t",
  //     title: "Dinner",
  //     amount: 78.45,
  //     currency: "EUR",
  //     date: new Date().toISOString(), // Current date
  //     category: "Food",
  //     remitter: "John",
  //     createdById: "user-1a2b3c4d",
  //   },
  // ]
}

// This is a mock function that would normally post to an API
export async function addExpense(expense: Expense): Promise<Expense> {
  // In a real app, this would be an API call like:
  // const response = await fetch('https://api.example.com/expenses', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(expense),
  // })
  // return response.json()

  // For demo purposes, we'll simulate a network delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Return the expense with an ID
  return expense
}

// Fetch remitters from API
export async function fetchRemitters(): Promise<string[]> {
  // In a real app, this would be an API call like:
  // const response = await fetch('https://api.example.com/remitters')
  // return response.json()

  // For demo purposes, we'll simulate a network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Return mock remitters
  return ["Anto", "Sara"]
}

