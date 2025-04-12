"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, X, User, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { AuthChangeEvent, Session } from '@supabase/supabase-js'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface NavItem {
  title: string
  href: string
  description?: string
}

const navItems: NavItem[] = [
  {
    title: "Home",
    href: "/",
    description: "Emergency Medical Aid Platform",
  },
  {
    title: "Blood Donation",
    href: "/blood-donation",
    description: "Donate or request blood",
  },
  {
    title: "Patient Fundraisers",
    href: "/fundraisers",
    description: "Help patients in need",
  },
  {
    title: "Emergency Services",
    href: "/emergency",
    description: "Find ambulance and emergency contacts",
  },
  {
    title: "Dashboard",
    href: "/dashboard",
    description: "View statistics and your activity",
  },
]

export function SiteHeader() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = getSupabaseBrowserClient()

    // Get current session
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      setUser(session?.user || null)
      setLoading(false)
    }

    checkUser()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event: AuthChangeEvent, session: Session | null) => {
      setUser(session?.user || null)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const handleSignOut = async () => {
    const supabase = getSupabaseBrowserClient()
    await supabase.auth.signOut()
    window.location.href = "/"
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-gradient-to-r from-red-600 to-red-800 shadow-lg">
      <div className="container flex h-20 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2 group">
          <div className="relative">
            <div className="absolute -inset-1 bg-white/30 rounded-full blur-sm group-hover:bg-white/50 transition-all duration-300"></div>
            <span className="relative font-bold text-2xl text-white flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mr-2">
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
              EmergencyMed
            </span>
          </div>
        </Link>

        <div className="hidden md:flex md:flex-1">
          <nav className="flex items-center space-x-8 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative text-white/90 hover:text-white transition-all duration-300 group",
                  pathname === item.href ? "font-semibold" : ""
                )}
              >
                {item.title}
                <span className={cn(
                  "absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full",
                  pathname === item.href ? "w-full" : ""
                )}></span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          {!loading && (
            <>
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/20">
                      <User className="h-5 w-5 text-white" />
                      <span className="sr-only">User menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-white border-gray-200">
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        {user.email && <p className="font-medium text-gray-700">{user.email}</p>}
                      </div>
                    </div>
                    <DropdownMenuSeparator className="bg-gray-200" />
                    <DropdownMenuItem asChild className="text-gray-600 hover:text-red-600 hover:bg-red-50">
                      <Link href="/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="text-gray-600 hover:text-red-600 hover:bg-red-50">
                      <Link href="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-gray-200" />
                    <DropdownMenuItem 
                      className="cursor-pointer text-gray-600 hover:text-red-600 hover:bg-red-50" 
                      onSelect={handleSignOut}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button asChild className="bg-white text-red-600 hover:bg-white/90 hover:text-red-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                  <Link href="/auth">Sign In</Link>
                </Button>
              )}
            </>
          )}

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden hover:bg-red-50" aria-label="Toggle Menu">
                <Menu className="h-5 w-5 text-gray-600" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="pr-0 bg-gradient-to-b from-red-600 to-red-800">
              <div className="px-7">
                <Link href="/" className="flex items-center" onClick={() => setIsOpen(false)}>
                  <span className="font-bold text-2xl text-white">EmergencyMed</span>
                </Link>
                <Button variant="ghost" size="icon" className="absolute right-4 top-4 hover:bg-white/20" onClick={() => setIsOpen(false)}>
                  <X className="h-5 w-5 text-white" />
                  <span className="sr-only">Close</span>
                </Button>
              </div>
              <nav className="mt-6 flex flex-col gap-6 px-7">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "text-white/90 hover:text-white text-lg transition-all duration-300 py-2 border-b border-white/10 hover:border-white/30",
                      pathname === item.href ? "font-medium" : ""
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.title}
                  </Link>
                ))}
                {!user && (
                  <Button asChild className="mt-8 bg-white text-red-600 hover:bg-white/90 hover:text-red-700 transition-all duration-300">
                    <Link href="/auth" onClick={() => setIsOpen(false)}>
                      Sign In
                    </Link>
                  </Button>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
