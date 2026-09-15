// Sparsha Healthcare Cloud & Local Inquiries Service
// Ensures inquiries saved on any device (phone, laptop, incognito) sync in real-time to the Admin dashboard

const CLOUD_SYNC_URL = 'https://kvdb.io/A4gPz642U8jWk78bK1f9/sparsha_healthcare_inquiries_v1';
const LOCAL_STORAGE_KEY = 'sparsha_saved_inquiries';

/**
 * Save an inquiry across Local Storage, Backend API, and Cloud Sync
 */
export async function saveInquiry(inquiry) {
  // 1. Save to local storage immediately
  try {
    const local = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
    const updated = [inquiry, ...(Array.isArray(local) ? local.filter(i => i.id !== inquiry.id) : [])];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {}

  // 2. Dispatch to local / Vercel backend endpoint
  try {
    await fetch('/api/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inquiry)
    }).catch(() => {});
  } catch (e) {}

  // 3. Dispatch to resilient Cloud Store so cross-device Admin gets it immediately
  try {
    const cloudFetch = await fetch(CLOUD_SYNC_URL).catch(() => null);
    let existingCloud = [];
    if (cloudFetch && cloudFetch.ok) {
      try {
        existingCloud = await cloudFetch.json();
      } catch (err) {}
    }
    const merged = [
      inquiry, 
      ...(Array.isArray(existingCloud) ? existingCloud.filter(i => i.id !== inquiry.id && i.email !== inquiry.email) : [])
    ];
    
    await fetch(CLOUD_SYNC_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(merged.slice(0, 100)) // persist latest 100 inquiries
    }).catch(() => {});
  } catch (e) {}

  return inquiry;
}

/**
 * Retrieve all inquiries merged from Cloud Store, Serverless API, and Local Storage
 */
export async function getInquiries() {
  let list = [];

  // 1. Load from Cloud Store (primary for cross-device real-time sync)
  try {
    const cloudRes = await fetch(CLOUD_SYNC_URL + '?t=' + Date.now()).catch(() => null);
    if (cloudRes && cloudRes.ok) {
      const text = await cloudRes.text();
      if (text && (text.startsWith('[') || text.startsWith('{'))) {
        const cloudData = JSON.parse(text);
        if (Array.isArray(cloudData)) {
          list = [...cloudData];
        }
      }
    }
  } catch (e) {}

  // 2. Try fetching from /api/appointments
  try {
    const apiRes = await fetch('/api/appointments').catch(() => null);
    if (apiRes && apiRes.ok) {
      const text = await apiRes.text();
      if (text && (text.startsWith('[') || text.startsWith('{'))) {
        const apiData = JSON.parse(text);
        if (Array.isArray(apiData)) {
          const knownIds = new Set(list.map(i => i.id));
          for (const item of apiData) {
            if (!knownIds.has(item.id)) {
              list.push(item);
              knownIds.add(item.id);
            }
          }
        }
      }
    }
  } catch (e) {}

  // 3. Merge with local storage
  try {
    const local = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
    if (Array.isArray(local)) {
      const knownIds = new Set(list.map(i => i.id));
      for (const item of local) {
        if (!knownIds.has(item.id)) {
          list.push(item);
          knownIds.add(item.id);
        }
      }
    }
  } catch (e) {}

  // Sort newest first
  list.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));

  // Sync back to local storage
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list));
  } catch (e) {}

  return list;
}

/**
 * Delete a specific inquiry by ID
 */
export async function deleteInquiry(id) {
  try {
    const current = await getInquiries();
    const filtered = current.filter(i => i.id !== id);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filtered));

    await fetch(CLOUD_SYNC_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(filtered)
    }).catch(() => {});
    return filtered;
  } catch (e) {
    return [];
  }
}

/**
 * Clear all inquiries
 */
export async function clearAllInquiries() {
  try {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    await fetch(CLOUD_SYNC_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify([])
    }).catch(() => {});
  } catch (e) {}
}
