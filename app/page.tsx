"use client"

import { useState, useEffect } from "react"
import { SearchBar } from "@/components/search-bar"
import { CocktailGrid } from "@/components/cocktail-grid"
import { CocktailModal } from "@/components/cocktail-modal"
import { FilterToggle } from "@/components/filter-toggle"
import { Heart, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export interface Cocktail {
  idDrink: string
  strDrink: string
  strDrinkThumb: string
  strInstructions: string
  strIngredient1?: string
  strIngredient2?: string
  strIngredient3?: string
  strIngredient4?: string
  strIngredient5?: string
  strIngredient6?: string
  strIngredient7?: string
  strIngredient8?: string
  strIngredient9?: string
  strIngredient10?: string
  strMeasure1?: string
  strMeasure2?: string
  strMeasure3?: string
  strMeasure4?: string
  strMeasure5?: string
  strMeasure6?: string
  strMeasure7?: string
  strMeasure8?: string
  strMeasure9?: string
  strMeasure10?: string
  strAlcoholic?: string
}

export default function CocktailFinder() {
  const [cocktails, setCocktails] = useState<Cocktail[]>([])
  const [selectedCocktail, setSelectedCocktail] = useState<Cocktail | null>(null)
  const [loading, setLoading] = useState(false)
  const [favorites, setFavorites] = useState<string[]>([])
  const [alcoholicFilter, setAlcoholicFilter] = useState<"all" | "alcoholic" | "non-alcoholic">("all")
  const [showFavorites, setShowFavorites] = useState(false)

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem("cocktail-favorites")
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }, [])

  // Save favorites to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cocktail-favorites", JSON.stringify(favorites))
  }, [favorites])

  const searchCocktails = async (query: string) => {
    if (!query.trim()) {
      setCocktails([])
      return
    }

    setLoading(true)
    setShowFavorites(false)
    try {
      // Search by name first
      let response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`,
      )
      let data = await response.json()

      // If no results by name, try searching by ingredient
      if (!data.drinks) {
        response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(query)}`)
        data = await response.json()
      }

      setCocktails(data.drinks || [])
    } catch (error) {
      console.error("Error searching cocktails:", error)
      setCocktails([])
    } finally {
      setLoading(false)
    }
  }

  const getRandomCocktail = async () => {
    setLoading(true)
    setShowFavorites(false)
    try {
      const response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
      const data = await response.json()
      setCocktails(data.drinks || [])
    } catch (error) {
      console.error("Error fetching random cocktail:", error)
      setCocktails([])
    } finally {
      setLoading(false)
    }
  }

  const toggleFavorite = (cocktailId: string) => {
    setFavorites((prev) => (prev.includes(cocktailId) ? prev.filter((id) => id !== cocktailId) : [...prev, cocktailId]))
  }

  const showFavoritesCocktails = async () => {
    if (favorites.length === 0) return

    setLoading(true)
    setShowFavorites(true)
    try {
      const favoriteCocktails = await Promise.all(
        favorites.map(async (id) => {
          const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
          const data = await response.json()
          return data.drinks?.[0]
        }),
      )
      setCocktails(favoriteCocktails.filter(Boolean))
    } catch (error) {
      console.error("Error fetching favorite cocktails:", error)
      setCocktails([])
    } finally {
      setLoading(false)
    }
  }

  const filteredCocktails = cocktails.filter((cocktail) => {
    if (alcoholicFilter === "all") return true
    if (alcoholicFilter === "alcoholic") return cocktail.strAlcoholic === "Alcoholic"
    if (alcoholicFilter === "non-alcoholic") return cocktail.strAlcoholic === "Non alcoholic"
    return true
  })

  return (
    <div className="min-h-screen gradient-bg">
      <nav className="sticky top-0 z-50 glass-effect border-b border-border/50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-8 h-8 text-chart-1" />
              <h1 className="text-2xl font-bold text-foreground">Cocktail Finder</h1>
            </div>
            <Button
              variant="ghost"
              className="flex items-center space-x-2 px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
              onClick={showFavoritesCocktails}
              disabled={favorites.length === 0}
            >
              <Heart className={`w-5 h-5 ${favorites.length > 0 ? "text-red-500" : ""}`} />
              <span className="hidden sm:inline">Favorites ({favorites.length})</span>
            </Button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-6 animate-fade-in">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-6xl font-bold text-foreground text-balance leading-tight">
                Discover Amazing
                <span className="text-chart-1 block">Cocktails</span>
              </h2>
              <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto text-pretty">
                Search by name or ingredient to find your perfect drink. Explore thousands of cocktail recipes from
                around the world.
              </p>
            </div>

            <div className="max-w-2xl mx-auto animate-slide-in">
              <SearchBar onSearch={searchCocktails} onRandomCocktail={getRandomCocktail} loading={loading} />
            </div>
          </div>

          {cocktails.length > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 animate-fade-in">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">
                  {showFavorites
                    ? `Showing ${favorites.length} favorites`
                    : `Found ${filteredCocktails.length} cocktails`}
                </span>
              </div>
              <FilterToggle value={alcoholicFilter} onChange={setAlcoholicFilter} />
            </div>
          )}

          {/* Results */}
          <div className="animate-fade-in">
            <CocktailGrid
              cocktails={filteredCocktails}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
              onViewRecipe={setSelectedCocktail}
              loading={loading}
            />
          </div>
        </div>
      </main>

      {/* Recipe Modal */}
      {selectedCocktail && (
        <CocktailModal
          cocktail={selectedCocktail}
          isOpen={!!selectedCocktail}
          onClose={() => setSelectedCocktail(null)}
        />
      )}
    </div>
  )
}
