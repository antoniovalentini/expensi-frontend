"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { CalendarIcon, Loader2 } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { toast } from "@/components/ui/use-toast"
import { addExpense, fetchRemitters } from "@/lib/api"
import { useExpenses } from "@/context/expenses-context"

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  amount: z.coerce.number().positive({
    message: "Amount must be a positive number.",
  }),
  currency: z.string().min(1, {
    message: "Please select a currency.",
  }),
  date: z.date(),
  category: z.string().min(1, {
    message: "Please select a category.",
  }),
  remitter: z.string().min(1, {
    message: "Please select a remitter.",
  }),
})

type FormValues = z.infer<typeof formSchema>

interface AddExpenseDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddExpenseDialog({ open, onOpenChange }: AddExpenseDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [remitters, setRemitters] = useState<string[]>([])
  const [loadingRemitters, setLoadingRemitters] = useState(false)
  const { addExpense: addExpenseToContext } = useExpenses()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      amount: 0,
      currency: "EUR",
      date: new Date(),
      category: "",
      remitter: "",
    },
    mode: "onChange", // Enable validation on change
  })

  // Fetch remitters when dialog opens
  useEffect(() => {
    if (open) {
      const getRemitters = async () => {
        try {
          setLoadingRemitters(true)
          const data = await fetchRemitters()
          setRemitters(data)
        } catch (error) {
          console.error("Failed to fetch remitters:", error)
          toast({
            title: "Error",
            description: "Failed to load remitters. Please try again.",
            variant: "destructive",
          })
        } finally {
          setLoadingRemitters(false)
        }
      }

      getRemitters()
    }
  }, [open])

  async function onSubmit(values: FormValues) {
    try {
      setIsSubmitting(true)

      // Call the API to add the expense
      const newExpense = await addExpense({
        ...values,
        id: crypto.randomUUID(),
        createdById: "user-1", // In a real app, this would come from auth
      })

      // Add the new expense to the context
      addExpenseToContext(newExpense)

      // Show success message
      toast({
        title: "Expense added",
        description: "Your expense has been added successfully.",
      })

      // Reset form and close dialog
      form.reset()
      onOpenChange(false)
    } catch (error) {
      console.error("Failed to add expense:", error)
      toast({
        title: "Error",
        description: "Failed to add expense. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-sidebar-primary">Add New Expense</DialogTitle>
          <DialogDescription>Enter the details of your expense below.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Grocery shopping" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        {...field}
                        value={field.value === 0 && field.value !== null ? "" : field.value}
                        onChange={(e) => {
                          const value = e.target.value === "" ? 0 : Number.parseFloat(e.target.value)
                          field.onChange(value)
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <FormItem className="w-24">
                    <FormLabel>Currency</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="EUR">€</SelectItem>
                        <SelectItem value="USD">$</SelectItem>
                        <SelectItem value="GBP">£</SelectItem>
                        <SelectItem value="JPY">¥</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button variant={"outline"} className="w-full pl-3 text-left font-normal">
                          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Food">Food</SelectItem>
                      <SelectItem value="Utilities">Utilities</SelectItem>
                      <SelectItem value="Entertainment">Entertainment</SelectItem>
                      <SelectItem value="Transportation">Transportation</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="remitter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Remitter</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger disabled={loadingRemitters}>
                        <SelectValue placeholder={loadingRemitters ? "Loading remitters..." : "Select a remitter"} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {remitters.map((remitter) => (
                        <SelectItem key={remitter} value={remitter}>
                          {remitter}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                type="button"
                variant="outline"
                className="border-destructive/50 text-destructive hover:bg-destructive/10 hover:text-destructive"
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="outline"
                className="border-[hsl(var(--category-food))] text-[hsl(var(--category-food))] hover:bg-[hsl(var(--category-food))/10] hover:text-[hsl(var(--category-food))]"
                disabled={isSubmitting || !form.formState.isValid}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Add Expense"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

