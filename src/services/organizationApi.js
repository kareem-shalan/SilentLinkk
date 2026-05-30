import axios from 'axios';

export const ORGANIZATION_BASE_URL = 'http://silentlink.runasp.net';

const api = axios.create({
  baseURL: ORGANIZATION_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const PERIOD_MAP = { daily: 'Daily', weekly: 'Weekly', monthly: 'Monthly' };

export function toServerPeriod(activeFilter) {
  return PERIOD_MAP[activeFilter] ?? 'Daily';
}

function pick(obj, ...keys) {
  for (const key of keys) {
    if (obj?.[key] !== undefined && obj?.[key] !== null) return obj[key];
  }
  return undefined;
}

function isResolvedStatus(status) {
  const normalized = String(status ?? '').toLowerCase();
  return normalized.includes('resolved') || normalized.includes('ended');
}

function toDisplayStatus(status) {
  return isResolvedStatus(status) ? '⚠️ Resolved' : '⚠️ Pending';
}

export function typeToTone(type) {
  const normalized = String(type ?? '').toLowerCase();
  if (normalized === 'affected') return 'red';
  if (normalized === 'safe') return 'green';
  return 'yellow';
}

export function toneToType(tone) {
  if (tone === 'red') return 'Affected';
  if (tone === 'green') return 'Safe';
  return 'Help';
}

export function mapPinFromApi(pin) {
  const type = pick(pin, 'type', 'Type') ?? 'Help';
  const tone = pin.tone ?? typeToTone(type);
  return {
    id: pick(pin, 'id', 'Id'),
    lat: pick(pin, 'latitude', 'Latitude', 'lat', 'Lat'),
    lng: pick(pin, 'longitude', 'Longitude', 'lng', 'Lng'),
    type,
    tone,
    userName: pick(pin, 'userName', 'UserName') ?? '',
    locationName: pick(pin, 'userName', 'UserName', 'locationName', 'LocationName') ?? 'Alert Location',
  };
}

export function classifyMapPins(pins) {
  const classified = { Help: [], Safe: [], Affected: [] };
  pins.forEach((pin) => {
    const mapped = mapPinFromApi(pin);
    const type = String(mapped.type).toLowerCase();
    if (mapped.tone === 'red' || type === 'affected') classified.Affected.push(mapped);
    else if (mapped.tone === 'green' || type === 'safe') classified.Safe.push(mapped);
    else classified.Help.push(mapped);
  });
  return classified;
}

export function mapStatsFromApi(data, subtitle) {
  const total = pick(data, 'totalSOS', 'totalSos', 'TotalSOS', 'TotalSos') ?? 0;
  const ended = pick(data, 'endedSOS', 'endedSos', 'EndedSOS', 'EndedSos') ?? 0;
  const running = pick(data, 'runningSOS', 'runningSos', 'RunningSOS', 'RunningSos') ?? 0;
  const pending = pick(data, 'pendingSOS', 'pendingSos', 'PendingSOS', 'PendingSos') ?? 0;

  const stats = [
    { title: 'Total SOS', value: String(total), subtitle },
    { title: 'Ended SOS', value: String(ended), subtitle },
    { title: 'Running SOS', value: String(running), subtitle },
    { title: 'Pending SOS', value: String(pending), subtitle },
  ];

  const totalNum = Number(total) || 0;
  const goal = totalNum > 0 ? totalNum : 52;

  const chartData = [
    { name: 'total sos', value: Number(total) || 0, goal, trend: 0 },
    { name: 'ended sos', value: Number(ended) || 0, goal, trend: Math.round((Number(ended) || 0) * 0.4) },
    { name: 'running sos', value: Number(running) || 0, goal, trend: Math.round((Number(running) || 0) * 0.7) },
    { name: 'pennding sos', value: Number(pending) || 0, goal, trend: Math.round((Number(pending) || 0) * 0.9) },
  ];

  return { stats, chartData };
}

export function mapHistoryFromApi(data) {
  const rows = data?.historyRows ?? data?.HistoryRows ?? data ?? [];
  if (!Array.isArray(rows)) return [];
  return rows.map((r) => ({
    name: pick(r, 'name', 'Name') ?? '',
    status: pick(r, 'status', 'Status') ?? '',
    emergencyType: pick(r, 'emergencyType', 'EmergencyType') ?? '',
  }));
}

function extractSosList(data) {
  if (Array.isArray(data)) return data;
  return data?.alerts ?? data?.sos ?? data?.items ?? data?.data ?? [];
}

export function mapSosRowFromApi(item) {
  const id = pick(item, 'id', 'Id', 'sosId', 'SosId');
  const alertId = pick(item, 'alertId', 'AlertId') ?? (id != null ? String(id) : '');
  const status = pick(item, 'status', 'Status', 'state', 'State') ?? 'Pending';
  const resolved = isResolvedStatus(status);

  return {
    id,
    alertId,
    user: pick(item, 'user', 'User', 'userName', 'UserName') ?? '',
    emergencyType: pick(item, 'emergencyType', 'EmergencyType') ?? '',
    location: pick(item, 'location', 'Location') ?? '',
    time: pick(item, 'time', 'Time', 'createdAt', 'CreatedAt') ?? '',
    status: toDisplayStatus(status),
    statusClass: resolved ? 'bg-[#4AAA6B] text-[#0f4c26]' : 'bg-[#d59b9b] text-[#5a1111]',
    phone: pick(item, 'phone', 'Phone') ?? '',
  };
}

export function mapSosDetailFromApi(data) {
  const row = mapSosRowFromApi(data);
  return {
    ...row,
    injuryType: pick(data, 'injuryType', 'InjuryType') ?? '',
    latitude: pick(data, 'latitude', 'Latitude'),
    longitude: pick(data, 'longitude', 'Longitude'),
  };
}

export function buildStatusSummary(alertRows) {
  const pending = alertRows.filter((r) => !r.status.includes('Resolved')).length;
  const resolved = alertRows.filter((r) => r.status.includes('Resolved')).length;
  return [
    {
      label: 'Pending Alerts',
      value: pending,
      cardClass: 'bg-[#e3b8b8]',
      dotClass: 'bg-[#d84d4d]',
    },
    {
      label: 'Resolved',
      value: resolved,
      cardClass: 'bg-[#d6e5d8]',
      dotClass: 'bg-[#3ea867]',
    },
  ];
}

export function uiStatusToApiState(uiStatus) {
  return uiStatus === 'resolved' ? 'Resolved' : 'Pending';
}

export function apiStateToUiStatus(state) {
  return isResolvedStatus(state) ? 'resolved' : 'pending';
}

const DEFAULT_MENU_ITEMS = ['Dashboard', 'SOS management', 'Map management'];

export const ORG_MENU_ITEMS = DEFAULT_MENU_ITEMS;

const ORG_MAP_PINS_CACHE_KEY = 'organization_map_pins';

function readCachedMapPins() {
  try {
    const raw = localStorage.getItem(ORG_MAP_PINS_CACHE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.map(mapPinFromApi) : [];
  } catch {
    return [];
  }
}

function writeCachedMapPins(pins) {
  localStorage.setItem(ORG_MAP_PINS_CACHE_KEY, JSON.stringify(pins));
}

function normalizePinList(data) {
  const raw = Array.isArray(data) ? data : data?.pins ?? data?.data ?? [];
  return raw.map(mapPinFromApi);
}

function cacheMapPin(pin) {
  const mapped = mapPinFromApi(pin);
  const pins = readCachedMapPins();
  const id = mapped.id ?? `local_${Date.now()}`;
  const next = [...pins.filter((p) => String(p.id) !== String(id)), { ...mapped, id }];
  writeCachedMapPins(next);
  return { ...mapped, id };
}

function uncacheMapPin(id) {
  const pins = readCachedMapPins().filter((p) => String(p.id) !== String(id));
  writeCachedMapPins(pins);
  return pins;
}

function isPinFetchFallbackStatus(status) {
  return status === 401 || status === 403 || status === 405;
}

export async function fetchOrganizationStats(period, signal) {
  const response = await api.get(`/api/organization/stats?period=${period}`, { signal });
  return response.data;
}

export async function fetchSosHistory(signal) {
  const response = await api.get('/api/organization/sos-history', { signal });
  return response.data;
}

export async function fetchMapPins(signal) {
  // Org API has POST/DELETE only — no GET list endpoint.
  // GET /api/App/map/pins is for mobile app tokens; org dashboard tokens get 401.
  // Fall back to locally cached pins created via POST in this session.
  try {
    const response = await api.get('/api/App/map/pins', { signal });
    const pins = normalizePinList(response.data);
    writeCachedMapPins(pins);
    return pins;
  } catch (err) {
    if (err?.name === 'CanceledError' || err?.code === 'ERR_CANCELED') throw err;

    const status = err?.response?.status;
    if (isPinFetchFallbackStatus(status)) {
      return readCachedMapPins();
    }

    const cached = readCachedMapPins();
    if (cached.length > 0) return cached;
    throw err;
  }
}

export async function createMapPin(payload, signal) {
  const response = await api.post('/api/organization/map/pins', payload, { signal });
  return cacheMapPin({ ...payload, ...response.data });
}

export async function deleteMapPin(id, signal) {
  const response = await api.delete(`/api/organization/map/pins/${id}`, { signal });
  uncacheMapPin(id);
  return response.data;
}

export async function fetchSosList(signal) {
  const response = await api.get('/api/organization/sos', { signal });
  return response.data;
}

export async function fetchSosDetail(id, signal) {
  const response = await api.get(`/api/organization/sos/${id}`, { signal });
  return response.data;
}

export async function updateSosStatus(id, state, signal) {
  const response = await api.put(`/api/organization/sos/${id}/status`, { state }, { signal });
  return response.data;
}

export function normalizeSosList(data) {
  return extractSosList(data).map(mapSosRowFromApi);
}

export default api;
