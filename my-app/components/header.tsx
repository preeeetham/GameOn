import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { Link2 } from "lucide-react"

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link2 className="h-6 w-6" />
          <span className="text-xl font-bold">Blink Station</span>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost">My Blinks</Button>
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}