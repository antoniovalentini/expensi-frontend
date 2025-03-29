"use client"

import { Home } from "lucide-react"
import { useSidebar } from "@/hooks/use-sidebar"
import Link from "next/link"
import { useEffect, useRef } from "react"

export function Sidebar() {
  const { isOpen, toggleSidebar, setSidebarOpen } = useSidebar()
  const sidebarRef = useRef<HTMLDivElement>(null)

  // Handle clicks outside the sidebar to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setSidebarOpen(false)
      }
    }

    // Only add the event listener if the sidebar is open
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, setSidebarOpen])

  // Handle navigation item click to close sidebar on mobile
  const handleNavItemClick = () => {
    if (window.innerWidth < 768) {
      // Close only on mobile
      setSidebarOpen(false)
    }
  }

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full bg-sidebar-background text-sidebar-foreground border-r border-sidebar-border z-50 transition-all duration-300 ease-in-out ${
          isOpen ? "w-64" : "w-0"
        }`}
      >
        <div className="p-4 h-full">
          <div className="flex items-center justify-center h-12 mb-6">
            {isOpen && <h2 className="font-semibold text-sidebar-primary">Budget App</h2>}
          </div>
          <nav className="space-y-2">
            {isOpen && (
              <Link
                href="/"
                className="flex items-center gap-2 p-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
                onClick={handleNavItemClick}
              >
                <Home className="h-5 w-5" />
                <span>Dashboard</span>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </>
  )
}

