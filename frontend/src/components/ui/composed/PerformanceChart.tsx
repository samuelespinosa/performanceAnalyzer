"use client"

import * as React from "react"
import { CartesianGrid, XAxis, AreaChart, Area } from "recharts"
import { ChartData } from "@/intefaces/ChartTypes"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const getChartConfig =(avgScores:any)=>{ return {
  views: {
    label: "Performance",
  },
  desktop: {
    label: "Desktop",
    color: `var(--color-${getScoreColor(avgScores.desktop*100).primary})`,
  },
  mobile: {
    label: "Mobile",
    color: `var(--color-${getScoreColor(avgScores.mobile*100).primary})`,
  },
  
} satisfies ChartConfig
}
import { getScoreColor } from "@/lib/utils"
export default function PerformanceChart({chartData,url}:{chartData:ChartData[],url:string}) {

  const [timeRange, setTimeRange] = React.useState("90d");
  const filteredData = chartData.filter((item) => {
    // Get current date in local timezone (start of day)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Parse item date (assuming YYYY-MM-DD format)
    const itemDate = new Date(item.date + 'T00:00:00'); // Add time to ensure local timezone
    
    let daysToSubtract = timeRange === "7d" ? 6 : 
                        timeRange === "30d" ? 29 : 
                        89; // 90 days minus today
    
    const cutoffDate = new Date(today);
    cutoffDate.setDate(today.getDate() - daysToSubtract);
    
    return itemDate >= cutoffDate && itemDate <= today;
  });
  

  const scoreAvg=chartData.reduce((acum,item)=>{
    return{
      desktop:Math.round((acum.desktop+item.desktop)*100)/chartData.length,
      mobile:Math.round((acum.mobile+item.mobile)*100)/chartData.length
    }
  
  },{desktop:0,mobile:0}
)
const chartConfig=getChartConfig(scoreAvg)
  

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Performance over time</CardTitle>
          <CardDescription>
            {url} Performance History{timeRange}
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
      <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="mobile"
              type="natural"
              fill="url(#fillMobile)"
              stroke="var(--color-mobile)"
              stackId="a"
            />
            <Area
              dataKey="desktop"
              type="natural"
              fill="url(#fillDesktop)"
              stroke="var(--color-desktop)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
