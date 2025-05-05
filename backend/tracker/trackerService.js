import { getTrackerRef } from "../config/firebase.js";
import { generateUrlHash } from "../utils.js";
export const removeFromTracker = async (url) => {
  const snapshot = await get(getTrackerRef());
  if (snapshot.exists()) {
    const urls = snapshot.val();
    const key = Object.keys(urls).find(key => urls[key] === url);
    if (key) {
      await remove(ref(db, `tracker/${key}`));
    }
  }
};
export const addToTracker = async (url) => {
  const trackerRef = getTrackerRef();
  await push(trackerRef, generateUrlHash(url));
};
export const getTrackedUrls = async () => {
  const snapshot = await get(getTrackerRef());
  return snapshot.exists() ? Object.values(snapshot.val()) : [];
};