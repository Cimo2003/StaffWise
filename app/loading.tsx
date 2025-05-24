export default function Loading() {
  return <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
  <div className="flex flex-col items-center gap-2">
    <div className="mr-2 h-12 w-12 animate-spin rounded-full border-2 border-[#c34a00] border-t-transparent"></div>
    <p className="text-sm text-muted-foreground animate-pulse">Loading...</p>
  </div>
</div>
}

