"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createExpense } from "@/lib/api"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {CreateExpenseDto, ExpenseDto} from "@/lib/types";

interface AddExpenseDialogProps {
  isOpen: boolean
  onClose: () => void
  onAddExpense: (expense: ExpenseDto) => void
}

export default function AddExpenseDialog({ isOpen, onClose, onAddExpense }: AddExpenseDialogProps) {
  const [title, setTitle] = useState("")
  const [amount, setAmount] = useState("")
  const [currency, setCurrency] = useState("€")
  const [category, setCategory] = useState("")
  const [remitter, setRemitter] = useState("Family")
  // Set current date in UTC at 00:00
  const [date, setDate] = useState<Date>(new Date(new Date().setUTCHours(0, 0, 0, 0)));
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const categories = [
    "Groceries",
    "Food and Household",
    "Dining Out",
    "Utilities",
    "Extra",
    "Entertainment",
    "Travel",
    "Car",
    "Healthcare",
    "Health",
    "Hobby",
    "Education",
    "Services",
    "Housing",
    "Home",
    "Other",
  ]

  const remitters = ["John", "Sara", "Family", "Mike", "Emma", "David", "Lisa", "Other"]

  const currencies    = ["€"  , "$"]
  const currenciesISO = ["EUR", "USD"]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title || !amount || !category || !remitter) {
      return
    }

    setIsSubmitting(true)

    try {
      const newExpense : CreateExpenseDto = {
        title,
        amount: Number.parseFloat(amount),
        currency: currenciesISO[currencies.indexOf(currency)],
        referenceDate: date.toLocaleDateString("en-CA"), // YYYY-MM-DD format
        category,
        remitter,
      }

      const response = await createExpense(newExpense);

      onAddExpense(response)
      resetForm()
    } catch (error) {
      console.error("Failed to add expense:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setTitle("")
    setAmount("")
    setCurrency("€")
    setCategory("")
    setRemitter("Family")
    setDate(new Date())
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Expense</DialogTitle>
          <DialogDescription>Enter the details of your new expense</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Expense title"
                required
            />
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div className="space-y-2 col-span-1">
              <Label htmlFor="currency">Currency</Label>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger id="currency">
                  <SelectValue placeholder="€"/>
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 col-span-3">
              <Label htmlFor="amount">Amount</Label>
              <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  min="0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select category"/>
              </SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div className="space-y-2 col-span-2">
              <Label htmlFor="remitter">Remitter</Label>
              <Select value={remitter} onValueChange={setRemitter} required>
                <SelectTrigger id="remitter">
                  <SelectValue placeholder="Select remitter"/>
                </SelectTrigger>
                <SelectContent>
                  {remitters.map((r) => (
                      <SelectItem key={r} value={r}>
                        {r}
                      </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 col-span-2">
              <Label htmlFor="date">Date</Label>
              <Popover  open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full">
                    { date.toLocaleDateString() }
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto">
                  <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(date) => {
                        // Convert to UTC when date is selected
                        if (!date) date = new Date();
                        date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
                        setDate(date);
                        setIsCalendarOpen(false);
                      }}
                      initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={handleClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="bg-teal-600 hover:bg-teal-700">
              {isSubmitting ? "Adding..." : "Add Expense"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
