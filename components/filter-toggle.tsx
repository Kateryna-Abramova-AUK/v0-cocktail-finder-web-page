"use client"

import { Button } from "@/components/ui/button"

interface FilterToggleProps {
  value: "all" | "alcoholic" | "non-alcoholic"
  onChange: (value: "all" | "alcoholic" | "non-alcoholic") => void
}

export function FilterToggle({ value, onChange }: FilterToggleProps) {
  return (
    <div className="flex justify-center gap-2">
      <Button variant={value === "all" ? "default" : "outline"} size="sm" onClick={() => onChange("all")}>
        All Drinks
      </Button>
      <Button variant={value === "alcoholic" ? "default" : "outline"} size="sm" onClick={() => onChange("alcoholic")}>
        Alcoholic
      </Button>
      <Button
        variant={value === "non-alcoholic" ? "default" : "outline"}
        size="sm"
        onClick={() => onChange("non-alcoholic")}
      >
        Non-Alcoholic
      </Button>
    </div>
  )
}
