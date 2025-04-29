export interface PerformanceMetric {
  value: string;
  weight: number;
  title: string;
}

export interface PerformanceData {
  score: number;
  firstContentfulPaint: PerformanceMetric;
  // ... other metrics
}

export interface PerformanceReport {
  id: string;
  url: string;
  createdAt: string;
  data: {
    mobile: PerformanceData;
    desktop: PerformanceData;
  };
}

export interface CreateReportDTO {
  url: string;
  data: {
    mobile: PerformanceData;
    desktop: PerformanceData;
  };
}