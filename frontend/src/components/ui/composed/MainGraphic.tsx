import { getChartOutsideData,formatMetricValue } from "@/lib/utils";
import { Card, CardContent, CardFooter,CardHeader,CardTitle,CardDescription } from "../card";
import { PieChartComposed } from "../PieChartComposed";
import { PageSpeedData, PerformanceData} from "@/intefaces/PageSpeedData";
import { getPerformanceTips } from "@/lib/performanceTips";
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils";
import { AlertCircle, AlertTriangle, CheckCircle2 } from "lucide-react";


interface MainGraphicProps {
  data: PageSpeedData;
  url:string;
  activeChart:string;
  setActiveChart:(chart:string)=>void
}

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
}
export default function MainGraphic({ data,url,activeChart,setActiveChart}: MainGraphicProps) {
  const currentData:PerformanceData=data[activeChart as keyof typeof chartConfig];
  const chartOutsideData=getChartOutsideData(currentData);
  const scorePercentage = Math.round(currentData.score * 100);
  const imageSizeClasses =
  activeChart === 'mobile' ? 'h-56 w-auto' :
  activeChart === 'desktop' ? 'w-xs h-auto' :
  '';
  return (
    <Card className="text-sm">
        <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Performance</CardTitle>
          <CardDescription>
          {new Date(Date.now()).toDateString()} | {url}
          </CardDescription>
        </div>
        <div className="flex">
          {["desktop", "mobile"].map((key) => {
            const chart = key as keyof typeof chartConfig
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {data[chart].score*100}
                </span>
              </button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-2 w-full">
        <div className="flex justify-center">
          <img
            className={`object-contain border border-gray-300 rounded-xl shadow-md ${imageSizeClasses}`}
            src={currentData.screenshot}
            alt="Screenshot"
          />
        </div>
        <div>
          <PieChartComposed 
            outsideData={chartOutsideData}
            score={scorePercentage}
          />
        </div>
      </CardContent>
     
      <CardContent>
       
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 p-6 w-full max-w-screen m-auto rounded-lg bg-muted/30 border-1 ">
          {/* Loading Metrics */}
          <div className="space-y-2">
            <span className="block text-xs font-medium text-muted-foreground uppercase tracking-wider text-center">Loading</span>
            <div className="space-y-4">
              <div className="text-center">
                <span className="text-3xl font-bold text-primary">
                  {formatMetricValue(currentData.firstContentfulPaint)}
                </span>
                <span className="block text-sm text-muted-foreground mt-1">First Paint</span>
              </div>
              <div className="text-center">
                <span className="text-3xl font-bold text-primary">
                  {formatMetricValue(currentData.largestContentfulPaint)}
                </span>
                <span className="block text-sm text-muted-foreground mt-1">Largest Paint</span>
              </div>
            </div>
          </div>

          {/* Responsiveness Metrics */}
          <div className="space-y-2 ">
            <span className="block text-xs font-medium text-muted-foreground uppercase tracking-wider text-center">Responsiveness</span>
            <div className="space-y-4">
              <div className="text-center">
                <span className="text-3xl font-bold text-primary">
                  {formatMetricValue(currentData.speedIndex)}
                </span>
                <span className="block text-sm text-muted-foreground mt-1">Speed Index</span>
              </div>
              <div className="text-center">
                <span className="text-3xl font-bold text-primary">
                  {formatMetricValue(currentData.totalBlockingTime)}
                </span>
                <span className="block text-sm text-muted-foreground mt-1">Blocking Time</span>
              </div>
            </div>
          </div>

          {/* Visual Stability */}
          <div className="space-y-2">
            <span className="block text-xs font-medium text-muted-foreground uppercase tracking-wider text-center">Visual Stability</span>
            <div className="space-y-4">
              <div className="text-center">
                <span className="text-3xl font-bold text-primary">
                  {formatMetricValue(currentData.cumulativeLayoutShift)}
                </span>
                <span className="block text-sm text-muted-foreground mt-1">Layout Shift</span>
              </div>
              <div className="p-3 rounded-lg text-center">
                <span className="text-4xl font-extrabold text-primary">
                  {scorePercentage}
                </span>
                <span className="block text-sm font-medium text-muted-foreground mt-1">Overall Score</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <Separator className="my-3"/>
      <CardFooter className="flex flex-col gap-4">
        
        
        <div className="space-y-4 w-full">
          <h3 className="text-lg font-semibold leading-none tracking-tight">
            Performance Recommendations
          </h3>
          
          <div className="grid gap-3">
            {getPerformanceTips(currentData).map((tip) => (
              <div 
                key={tip.metric}
                className={cn(
                  "flex items-start gap-3 p-3 rounded-lg border",
                  tip.severity === 'critical' && "bg-red-50/50 border-red-200 dark:bg-red-900/20 dark:border-red-800",
                  tip.severity === 'warning' && "bg-yellow-50/50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800",
                  tip.severity === 'good' && "bg-green-50/50 border-green-200 dark:bg-green-900/20 dark:border-green-800"
                )}
              >
                {tip.severity === 'critical' && (
                  <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5" />
                )}
                {tip.severity === 'warning' && (
                  <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                )}
                {tip.severity === 'good' && (
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
                )}
                <p className="text-sm leading-snug">
                  {tip.message}
                </p>
              </div>
            ))}
          </div>
        </div>
      </CardFooter>
    </Card>
   
  );
}