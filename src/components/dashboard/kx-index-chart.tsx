"use client"

import * as React from "react"
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Button } from "@/components/ui/button"

const generateChartData = () => {
  let value = 150
  return Array.from({ length: 30 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (29 - i))
    value += (Math.random() - 0.5) * 5
    return {
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: Math.max(value, 100), // Ensure value doesn't drop too low
    }
  })
}

const initialData = generateChartData();

const chartConfig = {
  value: {
    label: "KX Index",
    color: "hsl(var(--primary))",
  },
}

export function KxIndexChart() {
  const [chartData, setChartData] = React.useState<any[]>([]);
  const [currentPrice, setCurrentPrice] = React.useState(0);
  const [timeRange, setTimeRange] = React.useState("1M");

  React.useEffect(() => {
    // This effect runs only on the client, preventing hydration mismatch
    const data = generateChartData()
    setChartData(data)
    if (data.length > 0) {
      setCurrentPrice(data[data.length - 1].value)
    }
  }, [timeRange]);


  if (chartData.length === 0) {
      return null; // Or a loading skeleton
  }

  const yDomain = [
    Math.min(...chartData.map((d) => d.value)) * 0.95,
    Math.max(...chartData.map((d) => d.value)) * 1.05,
  ]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle>KX Index</CardTitle>
          <CardDescription>
            Real-time performance of the KX utility token index.
          </CardDescription>
        </div>
        <div className="flex items-baseline space-x-2">
            <p className="text-3xl font-bold tracking-tight">${currentPrice.toFixed(2)}</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-72 w-full">
          <ChartContainer config={chartConfig}>
            <AreaChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: -20,
                top: 20,
                right: 20,
                bottom: 10,
              }}
            >
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <YAxis
                domain={yDomain}
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => `$${value.toFixed(0)}`}
                />

              <Tooltip
                cursor={true}
                content={<ChartTooltipContent indicator="line" />}
              />
              <defs>
                  <linearGradient id="fillValue" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--color-value)"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-value)"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
              </defs>
              <Area
                dataKey="value"
                type="monotone"
                fill="url(#fillValue)"
                stroke="var(--color-value)"
                strokeWidth={2}
                dot={false}
              />
            </AreaChart>
          </ChartContainer>
        </div>
        <div className="flex justify-end space-x-2 mt-4">
            {["1D", "1W", "1M", "1Y", "ALL"].map((range) => (
                <Button key={range} variant={timeRange === range ? "default" : "outline"} size="sm" onClick={() => setTimeRange(range)}>
                    {range}
                </Button>
            ))}
        </div>
      </CardContent>
    </Card>
  )
}
