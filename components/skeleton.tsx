import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "./ui/card"

export function SkeletonCard() {
  return (
    <Card className="flex flex-col space-y-3">
        <CardContent>
            <Skeleton className="h-[125px] w-full rounded-xl" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
            </div>
        </CardContent>
    </Card>
  )
}
