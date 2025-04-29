import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { LighthouseResult, PerformanceData, Metric } from '../intefaces/PageSpeedData';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function extractPerformanceData(lighthouseResult: LighthouseResult): PerformanceData {
  const performanceScore = lighthouseResult.categories.performance.score;
  
  // Get the thumbnail screenshot from the 'final-screenshot' audit
  const thumbnailScreenshot = lighthouseResult.audits['final-screenshot']?.details?.data;
  
  // Create weight mapping
  const weightMap: Record<string, number> = {};
  lighthouseResult.categories.performance.auditRefs.forEach(ref => {
    weightMap[ref.id] = ref.weight;
  });

  return {
    score: performanceScore,
    firstContentfulPaint: {
      value: lighthouseResult.audits['first-contentful-paint'].displayValue,
      weight: weightMap['first-contentful-paint'],
      title: lighthouseResult.audits['first-contentful-paint'].title
    },
    largestContentfulPaint: {
      value: lighthouseResult.audits['largest-contentful-paint'].displayValue,
      weight: weightMap['largest-contentful-paint'],
      title: lighthouseResult.audits['largest-contentful-paint'].title
    },
    totalBlockingTime: {
      value: lighthouseResult.audits['total-blocking-time'].displayValue,
      weight: weightMap['total-blocking-time'],
      title: lighthouseResult.audits['total-blocking-time'].title
    },
    cumulativeLayoutShift: {
      value: lighthouseResult.audits['cumulative-layout-shift'].displayValue,
      weight: weightMap['cumulative-layout-shift'],
      title: lighthouseResult.audits['cumulative-layout-shift'].title
    },
    speedIndex: {
      value: lighthouseResult.audits['speed-index'].displayValue,
      weight: weightMap['speed-index'],
      title: lighthouseResult.audits['speed-index'].title
    },
    screenshot: thumbnailScreenshot
  };
}

export const formatMetricValue = (metric: Metric) => {
  const value = parseFloat(metric.value);
  
  if (metric.title.includes('Paint') || metric.title.includes('Time') || metric.title.includes('Index')) {
    return value >= 1000 ? `${(value / 1000).toFixed(1)} s` : `${value.toFixed(0)} ms`;
  }
  
  return value.toFixed(3);
};

export const getOutsideDataColors = (outsideData: { type: string; score: number }[]) => {
  const totalScore = outsideData.reduce((sum, item) => sum + item.score, 0);
  
  const colorPalette = [
    'bg-blue-100',    // 0
    'bg-green-100',   // 1
    'bg-yellow-100',  // 2
    'bg-red-100',     // 3
    'bg-purple-100',  // 4
    'bg-pink-100',    // 5
    'bg-indigo-100',  // 6
    'bg-teal-100',    // 7
    'bg-orange-100',  // 8
    'bg-amber-100',   // 9
  ];

  // Calculate each item's percentage of the total score
  const dataWithPercentages = outsideData.map(item => ({
    ...item,
    percentage: (item.score / totalScore) * 100
  }));

  // Sort by percentage to assign colors (higher percentages get more "important" colors)
  const sortedData = [...dataWithPercentages].sort((a, b) => b.percentage - a.percentage);

  // Assign colors based on ranking
  const coloredData = sortedData.map((item, index) => ({
    ...item,
    // Use modulo to cycle through colors if there are more items than colors
    fill: `var(--color-${colorPalette[index % colorPalette.length].split('-')[1]}-100)`
  }));

  // Return to original order but with colors assigned
  return dataWithPercentages.map(originalItem => {
    const coloredItem = coloredData.find(item => item.type === originalItem.type);
    return {
      ...originalItem,
      fill: coloredItem?.fill || 'var(--color-gray-100)'
    };
  });
};

export const getChartOutsideData =(data:PerformanceData)=>{
  const chartOutsideData = [
    { type: "FCP", score: Math.round(parseFloat(data.firstContentfulPaint.value)* data.firstContentfulPaint.weight) },
    { type: "LCP", score: Math.round(parseFloat(data.largestContentfulPaint.value)*data.largestContentfulPaint.weight)},
    { type: "TBT", score: Math.round(parseFloat(data.totalBlockingTime.value)*data.totalBlockingTime.weight)},
    { type: "CLS", score: Math.round(parseFloat(data.cumulativeLayoutShift.value)*data.cumulativeLayoutShift.weight)},
    { type: "SI", score: Math.round(parseFloat(data.speedIndex.value)*data.cumulativeLayoutShift.weight)},
  ];
  return getOutsideDataColors(chartOutsideData)
}