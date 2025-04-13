import { SidebarTrigger } from "@/components/ui/sidebar"

export async function Header() {
  return (
    <header className="h-14 border-b border-border flex items-center px-4 bg-white">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="text-[#5b5857]" />
      </div>
    </header>
  )
}

