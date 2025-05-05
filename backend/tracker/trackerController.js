import {addToTracker,getTrackedUrls} from './trackerService.js';

export async function setTrackedUrl(req, res) {
    try {
      const {url} = req.body;
      if (!url) throw new Error('URL parameter is required');
      await addToTracker(url);
      res.json({
        succes:true,
        message: 'Url Added Successfully'
      })

    } catch (error) {
      console.log(error);
      res.json({
        succes:false,
        message:error.message
      })
    }
  }

export async function getTrackedList(req, res) {
  try {
  
    const reports = getTrackedUrls();
    
    return ReportController.sendSuccess(res, 200, {
      url,
      count: reports.length,
      reports
    });

  } catch (error) {
    res.json({
      succes:false,
      message:error.message
    })
  }
}