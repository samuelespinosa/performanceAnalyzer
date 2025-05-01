/**
 * Dynamically validates PageSpeedData against your interfaces
 * @param {object} data - The incoming report data
 * @returns {{isValid: boolean, errors: string[], example?: object}}
 */
export const validatePageSpeedData = (data) => {
  const errors = [];
  
  // 1. Validate root structure
  if (!data || typeof data !== 'object') {
    return {
      isValid: false,
      errors: ['Data must be an object with mobile and desktop properties'],
      example: { mobile: {}, desktop: {} }
    };
  }

  // 2. Validate required platforms
  const platforms = ['mobile', 'desktop'];
  platforms.forEach(platform => {
    if (!data[platform]) {
      errors.push(`Missing ${platform} performance data`);
    }
  });

  // 3. Validate each platform's data structure
  if (data.mobile) validatePlatform(data.mobile, 'mobile', errors);
  if (data.desktop) validatePlatform(data.desktop, 'desktop', errors);

  // 4. Return validation result with dynamic example
  return {
    isValid: errors.length === 0,
    errors,
    example: generateExample()
  };
};

// Helper: Validate a single platform's data
const validatePlatform = (platformData, platformName, errors) => {
  // Validate score
  if (typeof platformData.score !== 'number') {
    errors.push(`${platformName}.score must be a number`);
  }

  // Validate all metrics
  const requiredMetrics = [
    'firstContentfulPaint',
    'largestContentfulPaint',
    'totalBlockingTime',
    'cumulativeLayoutShift',
    'speedIndex'
  ];

  requiredMetrics.forEach(metric => {
    validateMetric(platformData[metric], `${platformName}.${metric}`, errors);
  });

  // Validate optional screenshot
  if ('screenshot' in platformData && typeof platformData.screenshot !== 'string') {
    errors.push(`${platformName}.screenshot must be a string if provided`);
  }
};

// Helper: Validate a single metric
const validateMetric = (metric, path, errors) => {
  if (!metric) {
    errors.push(`${path} metric is missing`);
    return;
  }

  const metricStructure = {
    value: 'string',
    weight: 'number',
    title: 'string'
  };

  Object.entries(metricStructure).forEach(([key, type]) => {
    if (typeof metric[key] !== type) {
      errors.push(`${path}.${key} must be a ${type}`);
    }
  });
};

// Helper: Generate dynamic example based on actual interface
const generateExample = () => {
  const metricExample = {
    value: "1.5s",
    weight: 0.15,
    title: "First Contentful Paint"
  };

  return {
    mobile: {
      score: 0.92,
      firstContentfulPaint: metricExample,
      largestContentfulPaint: metricExample,
      totalBlockingTime: metricExample,
      cumulativeLayoutShift: metricExample,
      speedIndex: metricExample,
      screenshot: "data:image/png;base64,..."
    },
    desktop: {
      /* Same structure as mobile */
      score: 0.95,
      ...Object.fromEntries(
        Object.entries(metricExample).map(([k,v]) => 
          [k, k === 'value' ? "1.2s" : v]))
    }
  };
};