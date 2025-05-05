import {addToTracker,checkTracked} from './trackerService.js';

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

export async function isTracked(req, res) {
  try {
    const { url } = req.query;
    const tracked= await checkTracked(url);
    
    return   res.json({
      succes:true,
      isTracked:tracked
    });

  } catch (error) {
    res.json({
      succes:false,
      message:error.message
    })
  }
}