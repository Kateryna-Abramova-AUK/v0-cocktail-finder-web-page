"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { CocktailGrid } from "@/components/cocktail-grid"
import { FilterToggle } from "@/components/filter-toggle"
import { CocktailModal } from "@/components/cocktail-modal"
import { FavoritesPage } from "@/components/favorites-page"

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
  strIngredient11?: string
  strIngredient12?: string
  strIngredient13?: string
  strIngredient14?: string
  strIngredient15?: string
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
  strMeasure11?: string
  strMeasure12?: string
  strMeasure13?: string
  strMeasure14?: string
  strMeasure15?: string
  strAlcoholic?: string
  strCategory?: string
  strGlass?: string
}

export default function CocktailFinder() {
  // State management
  const [cocktails, setCocktails] = useState<Cocktail[]>([])
  const [selectedCocktail, setSelectedCocktail] = useState<Cocktail | null>(null)
  const [loading, setLoading] = useState(false)
  const [favorites, setFavorites] = useState<string[]>([])
  const [alcoholicFilter, setAlcoholicFilter] = useState<"all" | "alcoholic" | "non-alcoholic">("all")
  const [currentPage, setCurrentPage] = useState<"home" | "favorites">("home")
  const [trendingCocktails, setTrendingCocktails] = useState<Cocktail[]>([])
  const [darkMode, setDarkMode] = useState(false)

  // Load favorites and dark mode preference on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem("cocktail-favorites")
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites))
      } catch (error) {
        console.error("Error parsing saved favorites:", error)
        setFavorites([])
      }
    }

    const savedDarkMode = localStorage.getItem("cocktail-dark-mode")
    if (savedDarkMode) {
      try {
        setDarkMode(JSON.parse(savedDarkMode))
      } catch (error) {
        console.error("Error parsing dark mode preference:", error)
        setDarkMode(false)
      }
    }

    // Check system preference if no saved preference
    if (!savedDarkMode && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setDarkMode(true)
    }
  }, [])

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem("cocktail-favorites", JSON.stringify(favorites))
  }, [favorites])

  // Handle dark mode changes
  useEffect(() => {
    localStorage.setItem("cocktail-dark-mode", JSON.stringify(darkMode))
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  // Load trending cocktails on mount
  useEffect(() => {
    const loadTrendingCocktails = async () => {
      try {
        const promises = Array.from({ length: 6 }, () =>
          fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
            .then((res) => res.json())
            .catch(() => ({ drinks: null }))
        )
        
        const results = await Promise.all(promises)
        const trending = results
          .map((result) => result.drinks?.[0])
          .filter(Boolean) as Cocktail[]
        
        setTrendingCocktails(trending)
      } catch (error) {
        console.error("Error loading trending cocktails:", error)
        setTrendingCocktails([])
      }
    }

    loadTrendingCocktails()
  }, [])

  // Search cocktails function
  const searchCocktails = async (query: string) => {
    if (!query.trim()) {
      setCocktails([])
      return
    }

    setLoading(true)
    try {
      // Search by name first
      let response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query.trim())}`
      )
      let data = await response.json()

      // If no results by name, try searching by ingredient
      if (!data.drinks) {
        response = await fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(query.trim())}`
        )
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

  // Get random cocktail function
  const getRandomCocktail = async () => {
    setLoading(true)
    try {
      const response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
      const data = await response.json()
      
      if (data.drinks && data.drinks[0]) {
        setCocktails([data.drinks[0]])
      } else {
        setCocktails([])
      }
    } catch (error) {
      console.error("Error fetching random cocktail:", error)
      setCocktails([])
    } finally {
      setLoading(false)
    }
  }

  // Toggle favorite function
  const toggleFavorite = (cocktailId: string) => {
    setFavorites((prev) =>
      prev.includes(cocktailId)
        ? prev.filter((id) => id !== cocktailId)
        : [...prev, cocktailId]
    )
  }

  // Filter cocktails based on alcoholic filter
  const filteredCocktails = cocktails.filter((cocktail) => {
    if (alcoholicFilter === "all") return true
    if (alcoholicFilter === "alcoholic") return cocktail.strAlcoholic === "Alcoholic"
    if (alcoholicFilter === "non-alcoholic") {
      return cocktail.strAlcoholic === "Non alcoholic" || cocktail.strAlcoholic === "Non-alcoholic"
    }
    return true
  })

  // Handle view recipe
  const handleViewRecipe = (cocktail: Cocktail) => {
    setSelectedCocktail(cocktail)
  }

  // Close modal
  const closeModal = () => {
    setSelectedCocktail(null)
  }

  return (
  <div className="min-h-screen bg-background text-foreground">
      <Navigation
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        favoritesCount={favorites.length}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
      />

      <main>
        {currentPage === "home" ? (
          <>
            <HeroSection
              onSearch={searchCocktails}
              onRandomCocktail={getRandomCocktail}
              loading={loading}
              trendingCocktails={trendingCocktails}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
              onViewRecipe={handleViewRecipe}
            />

            {/* Results Section */}
            {cocktails.length > 0 && (
              <section className="container mx-auto px-4 py-12">
                <div className="max-w-6xl mx-auto space-y-8">
                  {/* Filter Controls */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-card/50 backdrop-blur-sm rounded-xl border border-border/50">
                    <div className="flex items-center gap-4">
                      <h2 className="text-lg font-semibold text-foreground">
                        Search Results
                      </h2>
                      <span className="text-sm text-muted-foreground px-3 py-1 bg-muted/50 rounded-full">
                        {filteredCocktails.length} cocktail{filteredCocktails.length !== 1 ? "s" : ""} found
                      </span>
                    </div>

                    <FilterToggle
                      value={alcoholicFilter}
                      onChange={setAlcoholicFilter}
                    />
                  </div>

                  {/* Cocktail Grid */}
                  <CocktailGrid
                    cocktails={filteredCocktails}
                    favorites={favorites}
                    onToggleFavorite={toggleFavorite}
                    onViewRecipe={handleViewRecipe}
                    loading={loading}
                  />
                </div>
              </section>
            )}
          </>
        ) : (
          <FavoritesPage
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            onViewRecipe={handleViewRecipe}
          />
        )}
      </main>

      {/* Recipe Modal */}
      {selectedCocktail && (
        <CocktailModal
          cocktail={selectedCocktail}
          isOpen={!!selectedCocktail}
          onClose={closeModal}
        />
      )}
    </div>
  )
}
