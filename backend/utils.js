import crypto from 'crypto'; 
export function generateUrlHash(url) {
    const normalizedUrl = url.toLowerCase().replace(/\/+$/, '');
    return crypto
      .createHash('sha256')
      .update(normalizedUrl)
      .digest('hex')
      .substring(0, 12);
  }