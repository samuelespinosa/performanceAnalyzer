// interfaces.ts
export interface Metric {
    value: string;
    weight: number;
    title: string;
  }
  
  export interface PerformanceData {
    score: number;
    firstContentfulPaint: Metric;
    largestContentfulPaint: Metric;
    totalBlockingTime: Metric;
    cumulativeLayoutShift: Metric;
    speedIndex: Metric;
    screenshot?: string; 
  }
  
  export interface LighthouseResult {
    categories: {
      performance: {
        score: number;
        auditRefs: Array<{
          id: string;
          weight: number;
        }>;
      };
    };
    audits: {
      'first-contentful-paint': { title: string; displayValue: string };
      'largest-contentful-paint': { title: string; displayValue: string };
      'total-blocking-time': { title: string; displayValue: string };
      'cumulative-layout-shift': { title: string; displayValue: string };
      'speed-index': { title: string; displayValue: string };
      'final-screenshot': {details: {data: string};
      [key: string]: any;
    }
  }
}
  
  export interface PageSpeedData {
    mobile: PerformanceData;
    desktop: PerformanceData;
  }

  export interface Report{
    url:string
    data:PageSpeedData
  }