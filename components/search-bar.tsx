"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Shuffle } from "lucide-react"

interface SearchBarProps {
  onSearch: (query: string) => void
  onRandomCocktail: () => void
  loading: boolean
}

export function SearchBar({ onSearch, onRandomCocktail, loading }: SearchBarProps) {
  const [query, setQuery] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5 z-10" />
        <Input
          type="text"
          placeholder="Search by cocktail name or ingredient..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-12 h-12 text-base bg-white border-border text-foreground placeholder:text-muted-foreground focus:border-chart-1 focus:ring-2 focus:ring-chart-1/20 transition-all duration-200 rounded-lg shadow-sm"
          disabled={loading}
        />
        {loading && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <div className="w-5 h-5 border-2 border-muted border-t-chart-1 rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <Button
          type="submit"
          size="lg"
          disabled={loading || !query.trim()}
          className="px-8 h-12 bg-chart-1 hover:bg-chart-1/90 text-white transition-all duration-200 disabled:opacity-50 rounded-lg shadow-sm"
        >
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>

        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={onRandomCocktail}
          disabled={loading}
          className="px-6 h-12 border-chart-2 text-chart-2 hover:bg-chart-2 hover:text-white transition-all duration-200 rounded-lg shadow-sm bg-transparent"
        >
          <Shuffle className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Surprise Me</span>
        </Button>
      </div>
    </form>
  )
}
