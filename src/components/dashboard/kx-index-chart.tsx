
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

const generateChartData = (timeRange: string) => {
  const now = new Date();
  let data = [];
  let value = 150;

  const addDataPoint = (date: Date, customValue?: number) => {
    value += (Math.random() - 0.5) * (timeRange === "1D" ? 0.5 : 5);
    data.push({
      date: date.toISOString(),
      value: Math.max(customValue || value, 100),
    });
  };

  switch (timeRange) {
    case "1D":
      for (let i = 24; i >= 0; i--) {
        const date = new Date(now);
        date.setHours(now.getHours() - i);
        addDataPoint(date);
      }
      break;
    case "1W":
      for (let i = 7; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(now.getDate() - i);
        addDataPoint(date);
      }
      break;
    case "1Y":
      for (let i = 12; i >= 0; i--) {
        const date = new Date(now);
        date.setMonth(now.getMonth() - i);
        // Ensure some variability month to month
        const monthValue = 150 + (Math.random() - 0.5) * 50 * (i/12);
        addDataPoint(date, monthValue);
      }
      break;
    case "ALL":
       for (let i = 36; i >= 0; i--) {
        const date = new Date(now);
        date.setMonth(now.getMonth() - i);
        const allValue = 100 + (Math.random()) * 80 * (i/36);
        addDataPoint(date, allValue);
      }
      break;
    case "1M":
    default:
      for (let i = 30; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(now.getDate() - i);
        addDataPoint(date);
      }
      break;
  }
  return data;
};


const chartConfig = {
  value: {
    label: "KX Index",
    color: "hsl(var(--primary))",
  },
}

export function KxIndexChart() {
  const [timeRange, setTimeRange] = React.useState("1M");
  const [chartData, setChartData] = React.useState<any[]>([]);
  const [currentPrice, setCurrentPrice] = React.useState(0);

  React.useEffect(() => {
    const data = generateChartData(timeRange)
    setChartData(data)
    if (data.length > 0) {
      setCurrentPrice(data[data.length - 1].value)
    }
  }, [timeRange]);


  if (chartData.length === 0) {
      return null;
  }
  
  const yDomain = [
    Math.min(...chartData.map((d) => d.value)) * 0.95,
    Math.max(...chartData.map((d) => d.value)) * 1.05,
  ]

  const formatXAxis = (tickItem: string) => {
    const date = new Date(tickItem);
    switch (timeRange) {
      case '1D':
        return date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true }).replace(' ', '');
      case '1W':
        return date.toLocaleDateString('en-US', { weekday: 'short' });
      case '1M':
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      case '1Y':
        return date.toLocaleDateString('en-US', { month: 'short' });
      case 'ALL':
        return date.toLocaleDateString('en-US', { year: 'numeric' });
      default:
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };
  
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
                tickFormatter={formatXAxis}
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
                content={<ChartTooltipContent 
                    indicator="line" 
                    labelFormatter={(label, payload) => {
                        if (payload && payload.length > 0) {
                            return new Date(payload[0].payload.date).toLocaleString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                                hour: 'numeric',
                                minute: '2-digit'
                            });
                        }
                        return label;
                    }}
                />}
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
