const API_BASE_URL = 'http://localhost:8000';

export async function fetchCameras() {
  try {
    const res = await fetch(`${API_BASE_URL}/cameras`);
    if (!res.ok) throw new Error('Failed to fetch cameras');
    return await res.json();
  } catch (err) {
    console.warn('API connection offline, using fallback mock data:', err);
    return null;
  }
}

export async function fetchLiveFeed(cameraId = 'CAM-202') {
  try {
    const res = await fetch(`${API_BASE_URL}/live-feed?camera_id=${cameraId}`);
    if (!res.ok) throw new Error('Failed to fetch live feed');
    return await res.json();
  } catch (err) {
    console.warn('API live feed offline:', err);
    return null;
  }
}

export async function fetchAlerts(severity, status) {
  try {
    let url = `${API_BASE_URL}/alerts`;
    const params = new URLSearchParams();
    if (severity) params.append('severity', severity);
    if (status) params.append('status', status);
    if (params.toString()) url += `?${params.toString()}`;

    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch alerts');
    return await res.json();
  } catch (err) {
    console.warn('API alerts offline:', err);
    return null;
  }
}

export async function fetchAnalytics() {
  try {
    const res = await fetch(`${API_BASE_URL}/analytics`);
    if (!res.ok) throw new Error('Failed to fetch analytics');
    return await res.json();
  } catch (err) {
    console.warn('API analytics offline:', err);
    return null;
  }
}

export async function fetchWorkers() {
  try {
    const res = await fetch(`${API_BASE_URL}/workers`);
    if (!res.ok) throw new Error('Failed to fetch workers');
    return await res.json();
  } catch (err) {
    console.warn('API workers offline:', err);
    return null;
  }
}

export async function dispatchNotification(alertId, assignedTeam, notes = '') {
  try {
    const res = await fetch(`${API_BASE_URL}/notify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        alert_id: alertId,
        assigned_team: assignedTeam,
        notes: notes
      })
    });
    return await res.json();
  } catch (err) {
    console.error('Failed to send notification dispatch:', err);
    return { status: 'error', message: err.message };
  }
}
