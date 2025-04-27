import { Spinner } from "@/components/spinner";

export default function Loading() {
  return <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
  <div className="flex flex-col items-center gap-2">
    <Spinner size="lg" className="border-[#c34a00]" />
    <p className="text-sm text-muted-foreground animate-pulse">Loading...</p>
  </div>
</div>
}

