"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { Cocktail } from "@/app/page"

interface CocktailModalProps {
  cocktail: Cocktail
  isOpen: boolean
  onClose: () => void
}

export function CocktailModal({ cocktail, isOpen, onClose }: CocktailModalProps) {
  // Extract ingredients and measurements
  const ingredients = []
  for (let i = 1; i <= 15; i++) {
    const ingredient = cocktail[`strIngredient${i}` as keyof Cocktail]
    const measure = cocktail[`strMeasure${i}` as keyof Cocktail]

    if (ingredient && ingredient.trim()) {
      ingredients.push({
        name: ingredient.trim(),
        measure: measure?.trim() || "",
      })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] bg-popover">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-popover-foreground text-balance">
            {cocktail.strDrink}
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[70vh]">
          <div className="space-y-6">
            {/* Image */}
            <div className="relative aspect-video overflow-hidden rounded-lg">
              <img
                src={cocktail.strDrinkThumb || "/placeholder.svg"}
                alt={cocktail.strDrink}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Type Badge */}
            {cocktail.strAlcoholic && (
              <Badge variant={cocktail.strAlcoholic === "Alcoholic" ? "default" : "secondary"} className="w-fit">
                {cocktail.strAlcoholic}
              </Badge>
            )}

            {/* Ingredients */}
            <div>
              <h3 className="text-lg font-semibold text-popover-foreground mb-3">Ingredients</h3>
              <div className="space-y-2">
                {ingredients.map((ingredient, index) => (
                  <div key={index} className="flex justify-between items-center py-2 px-3 bg-background/50 rounded-md">
                    <span className="text-popover-foreground">{ingredient.name}</span>
                    {ingredient.measure && <span className="text-muted-foreground text-sm">{ingredient.measure}</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* Instructions */}
            <div>
              <h3 className="text-lg font-semibold text-popover-foreground mb-3">Instructions</h3>
              <p className="text-popover-foreground leading-relaxed text-pretty">{cocktail.strInstructions}</p>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
