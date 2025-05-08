import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from './components/ui/tabs'
import SearchBar from './components/ui/composed/SearchBar'
import { Suspense, useEffect, useState,lazy} from 'react'
import { usePageSpeed } from './PageSpeedContext';
import { extractPerformanceData } from './lib/utils';
import { Report, PageSpeedData} from './intefaces/PageSpeedData';
import { pushReport } from './lib/reportApi';
import { Button } from './components/ui/button';

const MainGraphic = lazy(() => import('./components/ui/composed/MainGraphic'));
const HistoryCharts = lazy(() => import('./components/ui/composed/HistoryCharts'));

function App() {
  const [url, setUrl] = useState<string>("");
  const [isReportSaved,setReportSaved]=useState<boolean>(false);
  const [currentReport, setCurrentReport] = useState<PageSpeedData | null>(null);
  const { getData } = usePageSpeed();
  const [isLoading, setLoading] = useState<boolean | null>(null);
  const [activeChart, setActiveChart] = useState<string>("desktop")

  useEffect(() => {
    setReportSaved(false)
    const fetchData = async () => {
      if (!url) return;
      
      setLoading(true);
      try {
        const [mobile, desktop] = await Promise.all([
          getData(url, "mobile"),
          getData(url, "desktop")
        ]);
        const mobileData=extractPerformanceData(mobile.lighthouseResult);
        const desktopData=extractPerformanceData(desktop.lighthouseResult);
        
       setCurrentReport({mobile:mobileData,desktop:desktopData})
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  const saveReportHanddler= async () => {
    try {
      const reportData:Report={
        url, 
        data:currentReport!
      }
      setReportSaved(true);
      const report=await pushReport(reportData);
      console.log('report',report);
    } catch (error) {
      setReportSaved(false);
      console.error('Error seting report:', error);
    }
  };

  return (
    <div className=" w-5xl px-4 py-10 rounded-2xl min-h-screen md:min-h-auto">
      <SearchBar setUrl={setUrl} isLoading={isLoading} />
      <Suspense fallback={<div className="text-center py-8 text-muted-foreground">Loading...</div>}>
      {currentReport && !isLoading ? (<>
        <Tabs defaultValue="desktop">
          <TabsList className="bg-accent w-full rounded-lg p-1 border min-w-sm text-red shadow-2xs">
            <TabsTrigger value="desktop">
              <span className="font-semibold">Performace</span>
            </TabsTrigger>
            <TabsTrigger value="history">
              <span className="font-semibold">History</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="desktop" className='shadow-lg'>
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
         <Button
           onClick={saveReportHanddler}
           disabled={isReportSaved}
         >
           Save Report
         </Button>
         <Button>Set Tracker</Button>
         </div>
         </>
      ) : (
        !isLoading && (
          <div className="text-center py-8 text-muted-foreground">
            Enter a URL to analyze performance
          </div>
        )
      )}
    </Suspense>

    </div>
  )
}

export default App