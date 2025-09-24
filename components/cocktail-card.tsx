"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Eye, Sparkles } from "lucide-react"
import type { Cocktail } from "@/app/page"

interface CocktailCardProps {
  cocktail: Cocktail
  isFavorite: boolean
  onToggleFavorite: () => void
  onViewRecipe: () => void
}

export function CocktailCard({ cocktail, isFavorite, onToggleFavorite, onViewRecipe }: CocktailCardProps) {
  return (
    <Card className="group overflow-hidden transition-all duration-500 hover:scale-105 glassmorphism bg-card/40 border border-border/50 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/20 rounded-2xl">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={cocktail.strDrinkThumb || "/placeholder.svg"}
          alt={cocktail.strDrink}
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Holographic overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Favorite button with neon effect */}
        <Button
          variant="ghost"
          size="icon"
          className={`absolute top-3 right-3 glassmorphism bg-background/20 backdrop-blur-md hover:bg-background/40 border border-border/30 rounded-full transition-all duration-300 ${
            isFavorite
              ? "text-secondary border-secondary/50 shadow-lg shadow-secondary/30"
              : "text-muted-foreground hover:text-secondary hover:border-secondary/30"
          }`}
          onClick={onToggleFavorite}
        >
          <Heart
            className={`h-4 w-4 transition-all duration-300 ${isFavorite ? "fill-current scale-110" : "group-hover:scale-110"}`}
          />
        </Button>

        {/* Floating sparkle effect */}
        <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Sparkles className="h-5 w-5 text-accent animate-pulse" />
        </div>
      </div>

      <CardContent className="p-6 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl"></div>

        <div className="relative z-10">
          <h3 className="font-bold text-card-foreground mb-4 text-pretty line-clamp-2 text-lg group-hover:text-primary transition-colors duration-300">
            {cocktail.strDrink}
          </h3>

          {/* Holographic view recipe button */}
          <Button
            onClick={onViewRecipe}
            className="w-full holographic hover:scale-105 transition-all duration-300 h-12 text-base font-semibold"
            size="lg"
          >
            <Eye className="h-5 w-5 mr-2" />
            View Recipe
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-300"></div>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
