"use client"

import { useEffect } from "react"
import { useSidebar } from "@/hooks/use-sidebar"

export function SidebarEffect() {
  const { isOpen } = useSidebar()

  useEffect(() => {
    // Apply a class to the body when sidebar is open
    if (isOpen) {
      document.body.classList.add("sidebar-open")
    } else {
      document.body.classList.remove("sidebar-open")
    }

    return () => {
      document.body.classList.remove("sidebar-open")
    }
  }, [isOpen])

  return null
}

