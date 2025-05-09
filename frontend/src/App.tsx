import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from './components/ui/tabs';
import SearchBar from './components/ui/composed/SearchBar';
import { Suspense, useEffect, useState, lazy } from 'react';
import { usePageSpeed } from './context/PageSpeedContext';
import { extractPerformanceData } from './lib/utils';
import { Report, PageSpeedData } from './intefaces/PageSpeedData';
import { pushReport } from './lib/reportApi';
import { Button } from './components/ui/button';
import { toast } from 'sonner'; // Import toast from Sonner
import { isTracked,setTracked} from './lib/trackerApi';

const MainGraphic = lazy(() => import('./components/ui/composed/MainGraphic'));
const HistoryCharts = lazy(() => import('./components/ui/composed/HistoryCharts'));

function App() {
  const [url, setUrl] = useState<string>('');
  const [isReportSaved, setReportSaved] = useState<boolean>(false);
  const [currentReport, setCurrentReport] = useState<PageSpeedData | null>(null);
  const { getData } = usePageSpeed();
  const [isLoading, setLoading] = useState<boolean | null>(null);
  const [activeChart, setActiveChart] = useState<string>('desktop');
  const [trackedUrl, setIsTracked]=useState<boolean>(true);
  useEffect(() => {
    setReportSaved(false);
    const fetchData = async () => {
      if (!url) return;

      setLoading(true);
      try {
        const [mobile, desktop, isUrlTracked] = await Promise.all([
          getData(url, 'mobile'),
          getData(url, 'desktop'),
          isTracked(url),
        ]);
        const mobileData = extractPerformanceData(mobile.lighthouseResult);
        const desktopData = extractPerformanceData(desktop.lighthouseResult);
        if(!isUrlTracked?.isTracked){
          setIsTracked(false);
        }
        setCurrentReport({ mobile: mobileData, desktop: desktopData });
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Error fetching performance data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  const saveReportHandler = async () => {
    try {
      const reportData: Report = {
        url,
        data: currentReport!,
      };
      setReportSaved(true);
      const report = await pushReport(reportData);
      console.log('report', report);
      toast.success('Report saved successfully!');
    } catch (error) {
      setReportSaved(false);
      console.error('Error saving report:', error);
      toast.error('Error saving the report. Please try again.');
    }
  };
  const trackReportHandler = async () => {
    try {
      setIsTracked(true);
      await setTracked({url})
      toast.success('This url is being tracked now!');
    } catch (error) {
      setIsTracked(false);
      console.error('Error tracking the url:', error);
      toast.error('Error tracking the Url. Please try again.');
    }
  };

  return (
    <div className="md:min-w-4xl px-4 py-10 rounded-2xl min-h-screen md:min-h-auto">
      <SearchBar setUrl={setUrl} isLoading={isLoading} />
      <Suspense
        fallback={
          <div className="text-center py-8 text-muted-foreground">Loading...</div>
        }
      >
        {currentReport && !isLoading ? (
          <>
            <Tabs defaultValue="desktop">
              <TabsList className="bg-accent w-full rounded-lg p-1 border min-w-sm text-red shadow-2xs">
                <TabsTrigger value="desktop">
                  <span className="font-semibold">Performance</span>
                </TabsTrigger>
                <TabsTrigger value="history">
                  <span className="font-semibold">History</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="desktop" className="shadow-lg">
                <MainGraphic
                  data={currentReport}
                  activeChart={activeChart}
                  setActiveChart={setActiveChart}
                  url={url}
                />
              </TabsContent>

              <TabsContent value="history">
                <HistoryCharts url={url} />
              </TabsContent>
            </Tabs>
            <div className="grid grid-cols-1 w-full my-6 space-y-3">
              <Button onClick={saveReportHandler} disabled={isReportSaved}>
                Save Report
              </Button>
              <Button disabled={trackedUrl} onClick={trackReportHandler}>Set Tracker</Button>
            </div>
          </>
        ) : (
          !isLoading &&!currentReport && (
            <div className="text-center py-8 text-muted-foreground">
              Enter a URL to analyze performance
            </div>
          )
        )}
      </Suspense>
    </div>
  );
}

export default App;