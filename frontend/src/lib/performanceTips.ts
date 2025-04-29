// lib/performanceTips.ts
import { PerformanceData, Metric } from "@/intefaces/PageSpeedData";

interface PerformanceTip {
  metric: keyof PerformanceData;
  emoji: string;
  message: string;
  severity: 'good' | 'warning' | 'critical';
  metricData: Metric; // Guaranteed to be a proper Metric object
}

export const getPerformanceTips = (data: PerformanceData): PerformanceTip[] => {
  // Helper to ensure we always return a valid Metric
  const getSafeMetric = (metricName: keyof PerformanceData): Metric => {
    const metric = data[metricName];
    
    // Handle score specially since it's a number in PerformanceData
    if (metricName === 'score') {
      return {
        value: (data.score * 100).toString(),
        weight: 1,
        title: 'Overall Score'
      };
    }
    
    // For all other metrics, they should already be Metric objects
    if (typeof metric === 'object' && 'value' in metric && 'title' in metric) {
      return metric as Metric;
    }
    
    throw new Error(`Invalid metric structure for ${metricName}`);
  };

  const tips: PerformanceTip[] = [];

  // First Contentful Paint
  const fcp = getSafeMetric('firstContentfulPaint');
  const fcpValue = parseFloat(fcp.value);
  tips.push({
    metric: 'firstContentfulPaint',
    emoji: fcpValue < 1800 ? '✅' : '⚠️',
    message: fcpValue < 1800
      ? 'Excellent FCP! Consider preloading key resources.'
      : 'Optimize server response times and eliminate render-blocking resources.',
    severity: fcpValue < 1800 ? 'good' : 'warning',
    metricData: fcp
  });

  // Largest Contentful Paint
  const lcp = getSafeMetric('largestContentfulPaint');
  const lcpValue = parseFloat(lcp.value);
  tips.push({
    metric: 'largestContentfulPaint',
    emoji: lcpValue < 2500 ? '✅' : '🔴',
    message: lcpValue < 2500
      ? 'Good LCP! Maintain by optimizing hero images.'
      : 'Improve LCP by optimizing images and implementing lazy loading.',
    severity: lcpValue < 2500 ? 'good' : 'critical',
    metricData: lcp
  });

  // Continue with other metrics (Total Blocking Time, CLS, Speed Index)...
  // [Follow the same pattern as above]

  // Overall Score
  const scoreMetric = getSafeMetric('score');
  const scoreValue = parseFloat(scoreMetric.value);
  let scoreSeverity: 'good' | 'warning' | 'critical' = 'good';
  let scoreMessage = 'Excellent overall performance!';
  let scoreEmoji = '🎉';
  
  if (scoreValue < 50) {
    scoreSeverity = 'critical';
    scoreMessage = 'Needs work. Prioritize critical issues.';
    scoreEmoji = '🔴';
  } else if (scoreValue < 90) {
    scoreSeverity = 'warning';
    scoreMessage = 'Decent score. Focus on critical suggestions.';
    scoreEmoji = 'ℹ️';
  }

  tips.push({
    metric: 'score',
    emoji: scoreEmoji,
    message: scoreMessage,
    severity: scoreSeverity,
    metricData: scoreMetric
  });

  return tips;
};