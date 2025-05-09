import { getTrackerRef, push, get } from "../config/firebase.js";
import { generateUrlHash } from "../utils.js";

export const addToTracker = async (url) => {
  const trackerRef = getTrackerRef();
  const snapshot = await get(trackerRef);
  const hashedUrl = generateUrlHash(url);

  const existingEntries = snapshot.val();
  if (
    existingEntries &&
    Object.values(existingEntries).some(entry => entry.hashedUrl === hashedUrl)
  ) {
    throw Error('URL already tracked');
  }

  await push(trackerRef, {
    originalUrl: url,
    hashedUrl: hashedUrl,
  });
};

export const checkTracked = async (url) => {
  const snapshot = await get(getTrackerRef());
  const hashedUrl = generateUrlHash(url);

  if (!snapshot.exists()) return false;

  const entries = Object.values(snapshot.val());
  return entries.some(entry => entry.hashedUrl === hashedUrl);
};

export const getTrackedUrls = async () => {
  const snapshot = await get(getTrackerRef());
  if (!snapshot.exists()) return [];
  return Object.values(snapshot.val());
};
