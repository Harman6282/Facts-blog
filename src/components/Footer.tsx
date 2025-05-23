import { Separator } from "@/components/ui/separator"

export default function Footer() {
  return (
    <footer className="w-full border-t mt-15 bg-background">
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        
        {/* Left side: Copyright */}
        <div className="text-center sm:text-left">
          &copy; {new Date().getFullYear()} Facts. All rights reserved.
        </div>

        {/* Right side: Links */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
          <a href="/privacy" className="hover:underline">
            Privacy Policy
          </a>
          <Separator orientation="vertical" className="h-4 hidden sm:block" />
          <a href="/terms" className="hover:underline">
            Terms
          </a>
          <Separator orientation="vertical" className="h-4 hidden sm:block" />
          <a href="/contact" className="hover:underline">
            Contact
          </a>
        </div>
      </div>
    </footer>
  )
}
