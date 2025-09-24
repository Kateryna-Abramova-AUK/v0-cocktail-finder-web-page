"use client"

import { SearchBar } from "@/components/search-bar"
import { CocktailCard } from "@/components/cocktail-card"
import type { Cocktail } from "@/app/page"

interface HeroSectionProps {
  onSearch: (query: string) => void
  onRandomCocktail: () => void
  loading: boolean
  trendingCocktails: Cocktail[]
  favorites: string[]
  onToggleFavorite: (id: string) => void
  onViewRecipe: (cocktail: Cocktail) => void
}

export function HeroSection({
  onSearch,
  onRandomCocktail,
  loading,
  trendingCocktails,
  favorites,
  onToggleFavorite,
  onViewRecipe,
}: HeroSectionProps) {
  return (
    <div className="bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground text-balance">Discover Amazing Cocktails</h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto text-pretty">
              Search thousands of cocktail recipes by name or ingredient. Find your perfect drink for any occasion.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <SearchBar onSearch={onSearch} onRandomCocktail={onRandomCocktail} loading={loading} />
          </div>
        </div>
      </section>

      {/* Trending Cocktails */}
      {trendingCocktails.length > 0 && (
        <section className="container mx-auto px-4 pb-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Trending Cocktails</h2>
              <p className="text-muted-foreground">Popular drinks to inspire your next creation</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {trendingCocktails.slice(0, 6).map((cocktail) => (
                <CocktailCard
                  key={cocktail.idDrink}
                  cocktail={cocktail}
                  isFavorite={favorites.includes(cocktail.idDrink)}
                  onToggleFavorite={() => onToggleFavorite(cocktail.idDrink)}
                  onViewRecipe={() => onViewRecipe(cocktail)}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
