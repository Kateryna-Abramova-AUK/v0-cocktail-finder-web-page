"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Eye, Wine } from "lucide-react"
import type { Cocktail } from "@/app/page"

interface CocktailCardProps {
  cocktail: Cocktail
  isFavorite: boolean
  onToggleFavorite: () => void
  onViewRecipe: () => void
}

export function CocktailCard({ cocktail, isFavorite, onToggleFavorite, onViewRecipe }: CocktailCardProps) {
  return (
    <Card className="group overflow-hidden card-hover bg-card border border-border rounded-xl shadow-sm">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={cocktail.strDrinkThumb || "/placeholder.svg?height=300&width=300&query=cocktail"}
          alt={cocktail.strDrink}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {cocktail.strAlcoholic && (
          <div className="absolute top-3 left-3 px-2 py-1 bg-black/70 backdrop-blur-sm text-white text-xs rounded-full flex items-center space-x-1">
            <Wine className="w-3 h-3" />
            <span>{cocktail.strAlcoholic === "Alcoholic" ? "Alcoholic" : "Non-alcoholic"}</span>
          </div>
        )}

        <Button
          variant="ghost"
          size="icon"
          className={`absolute top-3 right-3 bg-white/90 backdrop-blur-sm hover:bg-white border border-white/20 rounded-full transition-all duration-300 shadow-lg ${
            isFavorite ? "text-red-500 hover:text-red-600 scale-110" : "text-muted-foreground hover:text-red-500"
          }`}
          onClick={onToggleFavorite}
        >
          <Heart className={`h-4 w-4 transition-all duration-300 ${isFavorite ? "fill-current scale-110" : ""}`} />
        </Button>
      </div>

      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <h3 className="font-bold text-card-foreground text-lg leading-tight text-pretty line-clamp-2 group-hover:text-chart-1 transition-colors duration-300">
            {cocktail.strDrink}
          </h3>
          {cocktail.strIngredient1 && (
            <p className="text-sm text-muted-foreground line-clamp-1">Main ingredient: {cocktail.strIngredient1}</p>
          )}
        </div>

        <Button
          onClick={onViewRecipe}
          className="w-full hover:scale-105 transition-all duration-300 h-11 text-base font-semibold bg-chart-1 hover:bg-chart-1/90 text-white shadow-sm"
          size="lg"
        >
          <Eye className="h-4 w-4 mr-2" />
          View Recipe
        </Button>
      </CardContent>
    </Card>
  )
}
