import axios from 'axios';

// Process raw Lighthouse API response into our clean format
function processLighthouseData(rawData, strategy) {
  const { audits, categories } = rawData.lighthouseResult;
  
  return {
    score: categories.performance.score * 100, // Convert to percentage
    firstContentfulPaint: {
      value: audits['first-contentful-paint'].displayValue,
      weight: getMetricWeight(categories.performance.auditRefs, 'first-contentful-paint'),
      title: audits['first-contentful-paint'].title
    },
    largestContentfulPaint: {
      value: audits['largest-contentful-paint'].displayValue,
      weight: getMetricWeight(categories.performance.auditRefs, 'largest-contentful-paint'),
      title: audits['largest-contentful-paint'].title
    },
    totalBlockingTime: {
      value: audits['total-blocking-time'].displayValue,
      weight: getMetricWeight(categories.performance.auditRefs, 'total-blocking-time'),
      title: audits['total-blocking-time'].title
    },
    cumulativeLayoutShift: {
      value: audits['cumulative-layout-shift'].displayValue,
      weight: getMetricWeight(categories.performance.auditRefs, 'cumulative-layout-shift'),
      title: audits['cumulative-layout-shift'].title
    },
    speedIndex: {
      value: audits['speed-index'].displayValue,
      weight: getMetricWeight(categories.performance.auditRefs, 'speed-index'),
      title: audits['speed-index'].title
    },
    screenshot: audits['final-screenshot']?.details?.data
  };
}

function getMetricWeight(auditRefs, metricId) {
  return auditRefs.find(ref => ref.id === metricId)?.weight || 0;
}

// Fetch data from Lighthouse API
export async function fetchLighthouseData(url, strategy = 'mobile') {
  try {
    const apiKey = 'AIzaSyB0NA4C_JS0nYsgLr6XYP6NB0akYoGJSnk';
    const res = await axios.get('https://www.googleapis.com/pagespeedonline/v5/runPagespeed', {
      params: {
        url,
        key: apiKey,
        strategy,
        category: 'performance'
      }
    });
    
    return processLighthouseData(res.data, strategy);
  } catch (error) {
    console.error(`Error fetching Lighthouse data for ${url}:`, error.message);
    throw error;
  }
}
export async function getFullReport(url) {
  const [mobile, desktop] = await Promise.all([
    fetchLighthouseData(url, 'mobile'),
    fetchLighthouseData(url, 'desktop')
  ]);
  
  return {
    url,
    data:{
      mobile,
      desktop
    }
  };
}

//console.log(await getFullReport('https://example.com'));