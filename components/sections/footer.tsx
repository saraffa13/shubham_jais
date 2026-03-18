"use client"

import { Instagram, Facebook, Mail, Heart } from "lucide-react"

const socials = [
  { icon: Instagram, href: "https://www.instagram.com/sketchjais?igsh=bnJpNTVyOHk4emI1", label: "Instagram" },
  { icon: Facebook, href: "https://www.facebook.com/sketchjais", label: "Facebook" },
  { icon: Mail, href: "mailto:44shubhamjaiswal@gmail.com", label: "Email" },
]

export function Footer() {
  return (
    <footer className="py-8 border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-neutral-500 dark:text-neutral-500 flex items-center gap-1">
            Made with <Heart className="h-3.5 w-3.5 text-red-500 fill-red-500" /> by Shubham
          </p>

          <div className="flex items-center gap-4">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 dark:text-neutral-600 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
                aria-label={label}
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>

          <p className="text-xs text-neutral-400 dark:text-neutral-600">
            &copy; {new Date().getFullYear()} Shubham Kr Jaiswal
          </p>
        </div>
      </div>
    </footer>
  )
}
