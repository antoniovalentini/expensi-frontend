"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface MonthYearSelectorProps {
  selectedMonth: number
  selectedYear: number
  onChange: (month: number, year: number) => void
}

export default function MonthYearSelector({ selectedMonth, selectedYear, onChange }: MonthYearSelectorProps) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - 2 + i)

  const handlePreviousMonth = () => {
    let newMonth = selectedMonth - 1
    let newYear = selectedYear

    if (newMonth < 1) {
      newMonth = 12
      newYear -= 1
    }

    onChange(newMonth, newYear)
  }

  const handleNextMonth = () => {
    let newMonth = selectedMonth + 1
    let newYear = selectedYear

    if (newMonth > 12) {
      newMonth = 1
      newYear += 1
    }

    onChange(newMonth, newYear)
  }

  return (
    <div className="flex items-center space-x-2">
      <Button variant="outline" size="icon" onClick={handlePreviousMonth} className="h-8 w-8">
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous month</span>
      </Button>

      <Select
        value={selectedMonth.toString()}
        onValueChange={(value) => onChange(Number.parseInt(value), selectedYear)}
      >
        <SelectTrigger className="w-[130px]">
          <SelectValue placeholder="Select month" />
        </SelectTrigger>
        <SelectContent>
          {months.map((month, index) => (
            <SelectItem key={month} value={(index + 1).toString()}>
              {month}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={selectedYear.toString()}
        onValueChange={(value) => onChange(selectedMonth, Number.parseInt(value))}
      >
        <SelectTrigger className="w-[100px]">
          <SelectValue placeholder="Select year" />
        </SelectTrigger>
        <SelectContent>
          {years.map((year) => (
            <SelectItem key={year} value={year.toString()}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button variant="outline" size="icon" onClick={handleNextMonth} className="h-8 w-8">
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next month</span>
      </Button>
    </div>
  )
}
