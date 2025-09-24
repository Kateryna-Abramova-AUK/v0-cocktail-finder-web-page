"use client"

import { CocktailCard } from "@/components/cocktail-card"
import type { Cocktail } from "@/app/page"

interface CocktailGridProps {
  cocktails: Cocktail[]
  favorites: string[]
  onToggleFavorite: (id: string) => void
  onViewRecipe: (cocktail: Cocktail) => void
  loading: boolean
}

export function CocktailGrid({ cocktails, favorites, onToggleFavorite, onViewRecipe, loading }: CocktailGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl border border-border animate-pulse overflow-hidden shadow-sm">
            <div className="aspect-square bg-muted"></div>
            <div className="p-4 space-y-3">
              <div className="h-5 bg-muted rounded w-3/4"></div>
              <div className="h-10 bg-muted rounded"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (cocktails.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="bg-white rounded-xl p-8 max-w-md mx-auto border border-border shadow-sm">
          <div className="text-6xl mb-4">🍸</div>
          <h3 className="text-xl font-semibold text-foreground mb-2">No cocktails found</h3>
          <p className="text-muted-foreground">Try searching for a different cocktail name or ingredient</p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {cocktails.map((cocktail) => (
        <CocktailCard
          key={cocktail.idDrink}
          cocktail={cocktail}
          isFavorite={favorites.includes(cocktail.idDrink)}
          onToggleFavorite={() => onToggleFavorite(cocktail.idDrink)}
          onViewRecipe={() => onViewRecipe(cocktail)}
        />
      ))}
    </div>
  )
}
