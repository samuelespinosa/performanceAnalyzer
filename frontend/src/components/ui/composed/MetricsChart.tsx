"use client"


import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardContent,

  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"


const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--color-foreground)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--color-foreground)",
  },
} satisfies ChartConfig

export function MetricsChart({title,chartData}:{title:string,chartData:any[]}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {/*<CardDescription>January - June 2024</CardDescription>*/}
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  date.setDate(date.getDate() + 1);
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })
                }}
              />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Line
              dataKey="desktop"
              type="natural"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-desktop)",
              }}
              activeDot={{
                r: 6,
              }}
            >
             {/* <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />*/}
            </Line>
            <Line
              dataKey="mobile"
              type="natural"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-desktop)",
              }}
              activeDot={{
                r: 6,
              }}
            >
              {/*<LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />*/}
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
      {/*<CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>*/}
    </Card>
  )
}
