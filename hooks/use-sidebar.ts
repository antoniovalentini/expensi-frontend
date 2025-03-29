"use client"

import { create } from "zustand"
import { useEffect } from "react"

interface SidebarState {
  isOpen: boolean
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void
}

export const useSidebar = create<SidebarState>((set) => ({
  isOpen: false,
  toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
  setSidebarOpen: (open) => set({ isOpen: open }),
}))

// Add this to apply the body class for shifting content
export function useSidebarEffect() {
  const { isOpen } = useSidebar()

  useEffect(() => {
    // Apply a class to the body when sidebar is open
    if (isOpen) {
      document.body.classList.add("sidebar-open")
    } else {
      document.body.classList.remove("sidebar-open")
    }

    // Close sidebar when window is resized to mobile size
    const handleResize = () => {
      if (window.innerWidth < 768 && isOpen) {
        document.body.classList.remove("sidebar-open")
      }
    }

    window.addEventListener("resize", handleResize)

    return () => {
      document.body.classList.remove("sidebar-open")
      window.removeEventListener("resize", handleResize)
    }
  }, [isOpen])

  return isOpen
}

