"use client"

import { useState, useEffect } from "react"
import { Plus, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button";

interface SearchAndFilterProps {
  onSearch: (term: string) => void
  onCategoryFilter: (categories: string[]) => void
  categories: string[]
  onAddExpense: () => void
}

export default function SearchAndFilter({ onSearch, onCategoryFilter, categories, onAddExpense}: SearchAndFilterProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      onSearch(searchTerm)
    }, 300)

    return () => clearTimeout(debounceTimer)
  }, [searchTerm, onSearch])

  const handleCategorySelect = (category: string) => {
    if (!selectedCategories.includes(category)) {
      const newCategories = [...selectedCategories, category]
      setSelectedCategories(newCategories)
      onCategoryFilter(newCategories)
    }
  }

  const handleRemoveCategory = (category: string) => {
    const newCategories = selectedCategories.filter((c) => c !== category)
    setSelectedCategories(newCategories)
    onCategoryFilter(newCategories)
  }

  const handleClearCategories = () => {
    setSelectedCategories([])
    onCategoryFilter([])
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search expenses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="flex flex-wrap justify-between items-center gap-2">
        <Select onValueChange={handleCategorySelect} value="">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex flex-wrap gap-2">
          {selectedCategories.map((category) => (
            <Badge key={category} variant="secondary" className="px-3 py-1">
              {category}
              <button onClick={() => handleRemoveCategory(category)} className="ml-2 rounded-full hover:bg-muted">
                <X className="h-3 w-3" />
                <span className="sr-only">Remove {category} filter</span>
              </button>
            </Badge>
          ))}

          {selectedCategories.length > 0 && (
            <button onClick={handleClearCategories} className="text-xs text-muted-foreground hover:text-foreground">
              Clear all
            </button>
          )}
        </div>

        <Button onClick={onAddExpense} className="bg-teal-600 hover:bg-teal-700">
          <Plus className="mr-2 h-4 w-4"/>
          New
        </Button>
      </div>
    </div>
  )
}
