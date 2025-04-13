"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
const chartData = [
  { roomType: "standard", occupied: 42, fill: "#f97316" },
  { roomType: "lab", occupied: 28, fill: "var(--color-lab)" },
  { roomType: "auditorium", occupied: 15, fill: "var(--color-auditorium)" },
]

const chartConfig = {
  occupied: {
    label: "Occupied",
  },
  standard: {
    label: "Standard",
    color: "hsl(var(--chart-1))",
  },
  lab: {
    label: "Lab",
    color: "hsl(var(--chart-2))",
  },
  auditorium: {
    label: "Auditorium",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig

export function ChartComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Room Occupancy</CardTitle>
        <CardDescription>Today's Schedule</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 0,
            }}
          >
            <YAxis
              dataKey="roomType"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => chartConfig[value as keyof typeof chartConfig]?.label}
            />
            <XAxis dataKey="occupied" type="number" hide />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar dataKey="occupied" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
