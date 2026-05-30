import { useState, useEffect } from 'react';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://silentlink.runasp.net',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export function useDashboardApi(activeFilter) {
  const [stats, setStats] = useState([
    { title: "Total SOS",   value: "0", subtitle: "On this daily" },
    { title: "Ended SOS",   value: "0", subtitle: "On this daily" },
    { title: "Running SOS", value: "0", subtitle: "On this daily" },
    { title: "Pending SOS", value: "0", subtitle: "On this daily" },
  ]);
  const [mapPins, setMapPins] = useState({ Help: [], Safe: [], Affected: [] });
  const [history, setHistory]   = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchAll() {
      try {
        setIsLoading(true);

        // تحويل الفلتر للقيمة اللي السيرفر بيفهمها
        const periodMap = { daily: 'Daily', weekly: 'Weekly', monthly: 'Monthly' };
        const serverPeriod = periodMap[activeFilter] ?? 'Daily';
        const subtitle = `On this ${activeFilter}`;

        const [statsRes, historyRes, pinsRes] = await Promise.all([
          api.get(`/api/organization/stats?period=${serverPeriod}`).catch(() => ({ data: {} })),
          api.get('/api/organization/sos-history').catch(() => ({ data: { historyRows: [] } })),
          api.get('/api/organization/map/pins').catch(() => ({ data: [] })),
        ]);

        // ── Stats ──────────────────────────────────────────────
        const s = statsRes?.data ?? {};
        setStats([
          { title: "Total SOS",   value: String(s.totalSOS   ?? s.totalSos   ?? 0), subtitle },
          { title: "Ended SOS",   value: String(s.endedSOS   ?? s.endedSos   ?? 0), subtitle },
          { title: "Running SOS", value: String(s.runningSOS ?? s.runningSos ?? 0), subtitle },
          { title: "Pending SOS", value: String(s.pendingSOS ?? s.pendingSos ?? 0), subtitle },
        ]);

        // ── History ────────────────────────────────────────────
        // السيرفر بيرجع { status, historyRows: [...] }
        // كل row فيها: name, status, emergencyType (أو EmergencyType)
        const rows = historyRes?.data?.historyRows
                  ?? historyRes?.data?.HistoryRows
                  ?? [];

        // نورمالايز الأسماء عشان SosHistoryPanel يقرأها صح
        const normalizedRows = Array.isArray(rows)
          ? rows.map(r => ({
              name:          r.name          ?? r.Name          ?? '',
              status:        r.status        ?? r.Status        ?? '',
              emergencyType: r.emergencyType ?? r.EmergencyType ?? '',
            }))
          : [];

        setHistory(normalizedRows);

        // ── Map Pins ───────────────────────────────────────────
        const livePins = Array.isArray(pinsRes?.data) ? pinsRes.data : [];
        const classified = { Help: [], Safe: [], Affected: [] };
        livePins.forEach(pin => {
          if (pin.tone === 'red'    || pin.type === 'Affected') classified.Affected.push(pin);
          else if (pin.tone === 'green' || pin.type === 'Safe') classified.Safe.push(pin);
          else classified.Help.push(pin);
        });
        setMapPins(classified);

      } catch (err) {
        console.error('Dashboard fetch error:', err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAll();
  }, [activeFilter]);

  return { stats, history, mapPins, isLoading, error: null };
}