import { getChartOutsideData,formatMetricValue } from "@/lib/utils";
import { Card, CardContent, CardFooter } from "../card";
import { PieChartComposed } from "../PieChartComposed";
import { PerformanceData} from "@/intefaces/PageSpeedData";

interface MainGraphicProps {
  data: PerformanceData;
  screen:string;
}
export default function MainGraphic({ data, screen}: MainGraphicProps) {
  const chartOutsideData=getChartOutsideData(data);
  const scorePercentage = Math.round(data.score * 100);
  const imageSizeClasses =
  screen === 'mobile' ? 'h-56 w-auto' :
  screen === 'desktop' ? 'w-xs h-auto' :
  '';
  return (
    <Card className="shadow-none">
      <CardContent className="grid gap-4 md:grid-cols-2 w-full">
        <div className="flex justify-center">
          <img
            className={`object-contain border border-gray-300 rounded-xl shadow-md ${imageSizeClasses}`}
            src={data.screenshot}
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
      
      <CardFooter>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 justify-center text-sm text-muted-foreground p-4 w-full rounded-sm border">
          <div>
            <span className="block font-medium text-foreground">First Contentful Paint</span>
            <span>{formatMetricValue(data.firstContentfulPaint)}</span>
          </div>
          <div>
            <span className="block font-medium text-foreground">Largest Contentful Paint</span>
            <span>{formatMetricValue(data.largestContentfulPaint)}</span>
          </div>
          <div>
            <span className="block font-medium text-foreground">Total Blocking Time</span>
            <span>{formatMetricValue(data.totalBlockingTime)}</span>
          </div>
          <div>
            <span className="block font-medium text-foreground">Cumulative Layout Shift</span>
            <span>{formatMetricValue(data.cumulativeLayoutShift)}</span>
          </div>
          <div>
            <span className="block font-medium text-foreground">Speed Index</span>
            <span>{formatMetricValue(data.speedIndex)}</span>
          </div>
          <div>
            <span className="block font-medium text-foreground">Overall Score</span>
            <span>{scorePercentage}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}