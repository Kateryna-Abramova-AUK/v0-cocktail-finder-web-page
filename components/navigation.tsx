"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Heart, Menu, X, Search, Moon, Sun } from "lucide-react"

interface NavigationProps {
  currentPage: "home" | "favorites"
  onPageChange: (page: "home" | "favorites") => void
  favoritesCount: number
  darkMode: boolean
  onToggleDarkMode: () => void
}

export function Navigation({ currentPage, onPageChange, favoritesCount, darkMode, onToggleDarkMode }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => onPageChange("home")}
            className="text-2xl font-bold text-foreground hover:text-primary transition-colors"
          >
            Cocktail Finder
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => onPageChange("home")}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                currentPage === "home"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Search className="w-4 h-4" />
              <span>Search</span>
            </button>

            <button
              onClick={() => onPageChange("favorites")}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors relative ${
                currentPage === "favorites"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Heart className="w-4 h-4" />
              <span>Favorites</span>
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </button>

            <Button variant="ghost" size="sm" onClick={onToggleDarkMode} className="p-2">
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={onToggleDarkMode} className="p-2">
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>

            <Button variant="ghost" size="sm" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2">
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border">
            <div className="flex flex-col space-y-2 pt-4">
              <button
                onClick={() => {
                  onPageChange("home")
                  setMobileMenuOpen(false)
                }}
                className={`flex items-center space-x-3 px-4 py-3 rounded-md transition-colors ${
                  currentPage === "home"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <Search className="w-5 h-5" />
                <span>Search Cocktails</span>
              </button>

              <button
                onClick={() => {
                  onPageChange("favorites")
                  setMobileMenuOpen(false)
                }}
                className={`flex items-center space-x-3 px-4 py-3 rounded-md transition-colors relative ${
                  currentPage === "favorites"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <Heart className="w-5 h-5" />
                <span>Favorites ({favoritesCount})</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
