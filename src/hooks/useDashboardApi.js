import { useState, useEffect } from 'react';
import {
  toServerPeriod,
  mapStatsFromApi,
  mapHistoryFromApi,
  classifyMapPins,
  fetchOrganizationStats,
  fetchSosHistory,
  fetchMapPins,
} from '../services/organizationApi';

const DEFAULT_STATS = [
  { title: 'Total SOS', value: '0', subtitle: 'On this daily' },
  { title: 'Ended SOS', value: '0', subtitle: 'On this daily' },
  { title: 'Running SOS', value: '0', subtitle: 'On this daily' },
  { title: 'Pending SOS', value: '0', subtitle: 'On this daily' },
];

function isUnauthorized(err) {
  return err?.response?.status === 401;
}

function isAborted(err) {
  return err?.name === 'CanceledError' || err?.code === 'ERR_CANCELED';
}

export function useDashboardApi(activeFilter) {
  const [stats, setStats] = useState(DEFAULT_STATS);
  const [chartData, setChartData] = useState(null);
  const [mapPins, setMapPins] = useState({ Help: [], Safe: [], Affected: [] });
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    async function fetchAll() {
      try {
        setIsLoading(true);
        setError(null);

        const serverPeriod = toServerPeriod(activeFilter);
        const subtitle = `On this ${activeFilter}`;

        const [statsResult, historyResult, pinsResult] = await Promise.allSettled([
          fetchOrganizationStats(serverPeriod, signal),
          fetchSosHistory(signal),
          fetchMapPins(signal),
        ]);

        let statsOk = false;
        let historyOk = false;
        let errorMessage = null;

        if (statsResult.status === 'fulfilled') {
          const { stats: mappedStats, chartData: mappedChartData } = mapStatsFromApi(statsResult.value, subtitle);
          setStats(mappedStats);
          setChartData(mappedChartData);
          statsOk = true;
        } else if (!isAborted(statsResult.reason)) {
          console.error('Stats fetch error:', statsResult.reason);
          if (isUnauthorized(statsResult.reason)) {
            errorMessage = 'Unauthorized. Please sign in again.';
          }
        }

        if (historyResult.status === 'fulfilled') {
          setHistory(mapHistoryFromApi(historyResult.value));
          historyOk = true;
        } else if (!isAborted(historyResult.reason)) {
          console.error('History fetch error:', historyResult.reason);
          if (isUnauthorized(historyResult.reason)) {
            errorMessage = 'Unauthorized. Please sign in again.';
          }
        }

        if (pinsResult.status === 'fulfilled') {
          setMapPins(classifyMapPins(pinsResult.value));
        } else if (!isAborted(pinsResult.reason)) {
          console.warn('Map pins fetch error:', pinsResult.reason);
          setMapPins({ Help: [], Safe: [], Affected: [] });
        }

        if (!statsOk && !historyOk && !errorMessage) {
          errorMessage = 'Failed to load dashboard data.';
        }

        setError(errorMessage);
      } catch (err) {
        if (!isAborted(err)) {
          console.error('Dashboard fetch error:', err);
          setError(isUnauthorized(err) ? 'Unauthorized. Please sign in again.' : 'Failed to load dashboard data.');
        }
      } finally {
        if (!signal.aborted) setIsLoading(false);
      }
    }

    fetchAll();
    return () => abortController.abort();
  }, [activeFilter]);

  return { stats, chartData, history, mapPins, isLoading, error };
}
