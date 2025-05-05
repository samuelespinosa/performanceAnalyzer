import PerformanceChart from './PerformanceChart';
import { MetricsChart } from './MetricsChart';
import { getReports } from '@/lib/reportApi';
import { useEffect, useState } from 'react';
import { ChartData } from '@/intefaces/ChartTypes';

export default function HistoryCharts({ url }: { url: string }) {
  
  const [scoreData, setScoreData] = useState<null | ChartData[]>(null);
  const [fcpData, setFcpData] = useState<null | ChartData[]>(null);
  const [lcpData, setLcpData] = useState<null | ChartData[]>(null);
  const [siData, setSiData] = useState<null | ChartData[]>(null);
  const [tbtData, setTbtData] = useState<null | ChartData[]>(null);
  const [clsData, setClsData] = useState<null | ChartData[]>(null);

  useEffect(() => {
    if (!url) {
      console.error('URL is undefined');
      return;
    }

    const fetchReport = async () => {
      try {
        const reports = await getReports(url);
        setScoreData(filterDataForCharts(reports.reports, 'score'));
        setFcpData(filterDataForCharts(reports.reports, 'firstContentfulPaint'));
        setLcpData(filterDataForCharts(reports.reports, 'largestContentfulPaint'));
        setSiData(filterDataForCharts(reports.reports, 'speedIndex'));
        setTbtData(filterDataForCharts(reports.reports, 'totalBlockingTime'));
        setClsData(filterDataForCharts(reports.reports, 'cumulativeLayoutShift'));
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };

    fetchReport();
  }, [url]);

  const filterDataForCharts = (reports: any[], metric: string): ChartData[] => {
    const grouped: Record<string, { desktop: number[]; mobile: number[] }> = {};
  
    reports.forEach((report) => {
      const date = new Date(report.createdAt).toISOString().split('T')[0];
  
      const rawDesktop = report.data?.desktop?.[metric]?.value ?? report.data?.desktop?.[metric] ?? 0;
      const rawMobile = report.data?.mobile?.[metric]?.value ?? report.data?.mobile?.[metric] ?? 0;
  
      const desktop = parseFloat(rawDesktop.toString().replace(/[^\d.]/g, '')) || 0;
      const mobile = parseFloat(rawMobile.toString().replace(/[^\d.]/g, '')) || 0;
  
      if (!grouped[date]) {
        grouped[date] = { desktop: [], mobile: [] };
      }
  
      grouped[date].desktop.push(desktop);
      grouped[date].mobile.push(mobile);
    });
  
    const result: ChartData[] = Object.entries(grouped).map(([date, values]) => {
      const avg = (arr: number[]) =>
        arr.length ? arr.reduce((sum, val) => sum + val, 0) / arr.length : 0;
  
      return {
        date,
        desktop: parseFloat(avg(values.desktop).toFixed(2)),
        mobile: parseFloat(avg(values.mobile).toFixed(2)),
      };
    });
  
    return result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };
  

  return (
    <>
      {scoreData && <PerformanceChart chartData={scoreData} url={url} />}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2">
        {fcpData && <MetricsChart title="First Contentful Paint" chartData={fcpData} />}
        {lcpData && <MetricsChart title="Largest Contentful Paint" chartData={lcpData} />}
        {siData && <MetricsChart title="Speed Index" chartData={siData} />}
        {tbtData && <MetricsChart title="Total Blocking Time" chartData={tbtData} />}
        {clsData && <MetricsChart title="Cumulative Layout Shift" chartData={clsData} />}
      </div>
    </>
  );
}
