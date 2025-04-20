"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ExpenseChartProps {
  currentYear: number
  currentMonth: number
}

export default function ExpenseChart({ currentYear, currentMonth }: ExpenseChartProps) {
  // Hardcoded data for the three months
  const chartData = [
    {
      month: "Feb",
      amount: 1845.7,
    },
    {
      month: "Mar",
      amount: 1843.67,
    },
    {
      month: "Apr",
      amount: 1783.44,
    },
  ]

  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Last 3 Months</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex justify-around items-end h-[200px]">
          {chartData.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="relative">
                {/* Amount on top of the bar */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-background text-foreground text-sm font-medium rounded px-2 py-1 z-10 whitespace-nowrap">
                  €{item.amount.toFixed(2)}
                </div>
                {/* Fixed height bar with teal colors */}
                <div
                  className="w-16 bg-teal-500 rounded-t-md"
                  style={{
                    height: index === 0 ? "150px" : index === 1 ? "140px" : "130px",
                  }}
                ></div>
              </div>
              <div className="mt-2 font-medium">{item.month}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
