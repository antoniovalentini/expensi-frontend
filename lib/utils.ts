import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency: string): string {
  // Map currency symbols to ISO currency codes
  const currencyMap: Record<string, string> = {
    "€": "EUR",
    $: "USD",
    "£": "GBP",
    "¥": "JPY",
  }

  // Use the mapped currency code or the original if not found in the map
  const currencyCode = currencyMap[currency] || currency

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
  }).format(amount)
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(date)
}

