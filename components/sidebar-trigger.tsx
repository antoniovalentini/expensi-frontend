"use client"

import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSidebar } from "@/hooks/use-sidebar"

export function SidebarTrigger() {
  const { toggleSidebar } = useSidebar()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleSidebar}
      className="h-10 w-10 z-50 text-primary hover:text-primary hover:bg-accent/50 touch-manipulation"
      style={{ touchAction: "manipulation" }}
    >
      <Menu className="h-6 w-6" />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  )
}

