import * as React from "react";
import { Label, Pie, PieChart } from "recharts";
import { z } from "zod";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";

const ViewBoxSchema = z.object({
  cx: z.number(),
  cy: z.number(),
});

interface PieChartComposedProps {
  outsideData: {
    type: string;
    score: number;
    fill: string;
  }[];
  score: number;
}

const ChartTooltipContent = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  
  return (
    <div className="rounded-sm bg-accent/50 px-2 py-1 shadow-xl ring-1 ring-black/5 backdrop-blur-lg text-sm text-foreground">
      {payload.map((item: any, index: number) => (
        <div key={index} className="flex justify-between gap-2">
          <span className="font-medium">{item.name}</span>
          <span className="text-right">{item.value}</span>
        </div>
      ))}
    </div>
  );
};

export function PieChartComposed({ outsideData, score }: PieChartComposedProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  // Determine colors based on score
  const getScoreColor = () => {
    if (score < 40) {
      return {
        primary: "red-500",       // Low score - red
        secondary: "red-100"       // Light red for remaining
      };
    } else if (score >= 40 && score < 70) {
      return {
        primary: "yellow-500",    // Medium score - yellow
        secondary: "yellow-100"    // Light yellow for remaining
      };
    } else {
      return {
        primary: "green-500",     // High score - green
        secondary: "green-100"     // Light green for remaining
      };
    }
  };

  const scoreColors = getScoreColor();

  const labelContent = (props: any) => {
    const viewBoxValidation = ViewBoxSchema.safeParse(props.viewBox);
    if (!viewBoxValidation.success) return null;

    const { cx, cy } = viewBoxValidation.data;

    return (
      <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle">
        <tspan x={cx} y={cy - 24} className="fill-muted-foreground">
          Score
        </tspan>
        <tspan 
          x={cx} 
          y={cy} 
          className={`fill-foreground text-3xl font-bold ${
            score < 40 ? "text-red-500" :
            score < 70 ? "text-yellow-500" :
            "text-green-500"
          }`}
        >
          {score}
        </tspan>
      </text>
    );
  };

  const insideData = [
    { 
      total: "Total Score", 
      value: score, 
      fill: `var(--color-${scoreColors.primary})` 
    },
    { 
      total: "Total Score", 
      value: 100 - score, 
      fill: `var(--color-${scoreColors.secondary}` 
    },
  ];

  return (
    <div
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ChartContainer config={{}} className="mx-auto aspect-square max-h-[250px]">
        <PieChart>
          <Pie
            data={insideData}
            dataKey="value"
            nameKey="total"
            innerRadius={60}
            outerRadius={80}
            strokeWidth={1}
            label={false}
          >
            <Label content={labelContent} />
          </Pie>

          <ChartTooltip cursor={true} content={<ChartTooltipContent />} />
         
          {isHovered && (
            <Pie
              data={outsideData}
              dataKey="score"
              nameKey="type"
              innerRadius={85}
              outerRadius={100}
              strokeWidth={5}
            />
          )}
        </PieChart>
      </ChartContainer>
    </div>
  );
}