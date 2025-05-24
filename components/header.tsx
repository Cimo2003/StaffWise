import { SidebarTrigger } from "@/components/ui/sidebar"
import { format } from "date-fns"

export async function Header() {
  return (
    <header className="h-14 border-b border-border flex items-center px-4 bg-white">
      <div className="flex justify-between items-center gap-2 flex-1 max-w-lvw">
        <SidebarTrigger className="text-[#5b5857]" />
        <div className="text-[#5b5857]">{format(Date.now(), "EEEE',' MMMM do',' yyyy ")}</div>
      </div>
    </header>
  )
}

