"use client"

import { useState, useEffect } from "react"
import { CocktailCard } from "@/components/cocktail-card"
import { Heart } from "lucide-react"
import type { Cocktail } from "@/app/page"

interface FavoritesPageProps {
  favorites: string[]
  onToggleFavorite: (id: string) => void
  onViewRecipe: (cocktail: Cocktail) => void
}

export function FavoritesPage({ favorites, onToggleFavorite, onViewRecipe }: FavoritesPageProps) {
  const [favoriteCocktails, setFavoriteCocktails] = useState<Cocktail[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadFavoriteCocktails = async () => {
      if (favorites.length === 0) {
        setFavoriteCocktails([])
        setLoading(false)
        return
      }

      setLoading(true)
      try {
        const cocktailPromises = favorites.map((id) =>
          fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
            .then((res) => res.json())
            .then((data) => data.drinks?.[0])
            .catch(() => null),
        )

        const cocktails = await Promise.all(cocktailPromises)
        setFavoriteCocktails(cocktails.filter(Boolean))
      } catch (error) {
        console.error("Error loading favorite cocktails:", error)
        setFavoriteCocktails([])
      } finally {
        setLoading(false)
      }
    }

    loadFavoriteCocktails()
  }, [favorites])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Your Favorites</h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-card rounded-lg border p-4 animate-pulse">
                <div className="aspect-square bg-muted rounded-lg mb-4"></div>
                <div className="h-4 bg-muted rounded mb-2"></div>
                <div className="h-3 bg-muted rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Your Favorites</h1>
          <p className="text-muted-foreground">
            {favoriteCocktails.length} saved cocktail{favoriteCocktails.length !== 1 ? "s" : ""}
          </p>
        </div>

        {favoriteCocktails.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">No favorites yet</h2>
            <p className="text-muted-foreground">Start exploring cocktails and add your favorites to see them here!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favoriteCocktails.map((cocktail) => (
              <CocktailCard
                key={cocktail.idDrink}
                cocktail={cocktail}
                isFavorite={true}
                onToggleFavorite={() => onToggleFavorite(cocktail.idDrink)}
                onViewRecipe={() => onViewRecipe(cocktail)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
