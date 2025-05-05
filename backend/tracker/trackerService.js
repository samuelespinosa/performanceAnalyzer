import { getTrackerRef,push,get} from "../config/firebase.js";
import { generateUrlHash } from "../utils.js";
export const addToTracker = async (url) => {
  const trackerRef = getTrackerRef();
  const snapshot = await get(trackerRef);
  const hashedUrl=generateUrlHash(url);
  if(!!Object.values(snapshot.val()).find(i=>i===hashedUrl)){
    throw Error('Url Already Tracked');
  }
  await push(trackerRef, generateUrlHash(url));
};
export const checkTracked = async (url) => {
  const snapshot = await get(getTrackerRef());
  const urls=Object.values(snapshot.val());
  const hashedUrl=generateUrlHash(url);
  return snapshot.exists() && !!urls.find(i=>i===hashedUrl);
};

export const getTrackedUrls=async ()=>{
  const trackerRef = getTrackerRef();
  const snapshot = await get(trackerRef);
  return Object.values(snapshot.val());
}