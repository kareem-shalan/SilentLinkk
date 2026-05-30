import { useState, useEffect } from 'react';
import {
  calculateStatsFromSosData,
  mapHistoryFromApi,
  classifyMapPins,
  fetchSosHistory,
  fetchMapPins,
  fetchSosList,
  normalizeSosList,
} from '../services/organizationApi';

const DEFAULT_STATS = [
  { title: 'Total SOS', value: '0', subtitle: 'On this daily' },
  { title: 'Pending', value: '0', subtitle: 'On this daily' },
  { title: 'Running', value: '0', subtitle: 'On this daily' },
  { title: 'Ended', value: '0', subtitle: 'On this daily' },
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

        const subtitle = `On this ${activeFilter}`;

        const [sosListResult, historyResult, pinsResult] = await Promise.allSettled([
          fetchSosList(signal),
          fetchSosHistory(signal),
          fetchMapPins(signal),
        ]);

        let statsOk = false;
        let historyOk = false;
        let errorMessage = null;

        if (sosListResult.status === 'fulfilled') {
          const sosList = normalizeSosList(sosListResult.value);
          const { stats: mappedStats, chartData: mappedChartData } = calculateStatsFromSosData(sosList, subtitle);
          setStats(mappedStats);
          setChartData(mappedChartData);
          statsOk = true;
        } else if (!isAborted(sosListResult.reason)) {
          console.error('SOS list fetch error:', sosListResult.reason);
          if (isUnauthorized(sosListResult.reason)) {
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

  // Listen for SOS status updates from other pages
  useEffect(() => {
    const handleSosStatusUpdate = () => {
      const abortController = new AbortController();
      const { signal } = abortController;

      async function refreshData() {
        try {
          setIsLoading(true);
          setError(null);

          const subtitle = `On this ${activeFilter}`;

          const [sosListResult, historyResult] = await Promise.allSettled([
            fetchSosList(signal),
            fetchSosHistory(signal),
          ]);

          if (sosListResult.status === 'fulfilled') {
            const sosList = normalizeSosList(sosListResult.value);
            const { stats: mappedStats, chartData: mappedChartData } = calculateStatsFromSosData(sosList, subtitle);
            setStats(mappedStats);
            setChartData(mappedChartData);
          }

          if (historyResult.status === 'fulfilled') {
            setHistory(mapHistoryFromApi(historyResult.value));
          }
        } catch (err) {
          console.error('Dashboard refresh error:', err);
        } finally {
          if (!signal.aborted) setIsLoading(false);
        }
      }

      refreshData();
      return () => abortController.abort();
    };

    window.addEventListener('sos-status-updated', handleSosStatusUpdate);
    return () => window.removeEventListener('sos-status-updated', handleSosStatusUpdate);
  }, [activeFilter]);

  // Listen for map pin changes from Map Management
  useEffect(() => {
    const handleMapPinChange = () => {
      const abortController = new AbortController();
      const { signal } = abortController;

      async function refreshData() {
        try {
          setIsLoading(true);
          setError(null);

          const subtitle = `On this ${activeFilter}`;

          const [sosListResult, historyResult] = await Promise.allSettled([
            fetchSosList(signal),
            fetchSosHistory(signal),
          ]);

          if (sosListResult.status === 'fulfilled') {
            const sosList = normalizeSosList(sosListResult.value);
            const { stats: mappedStats, chartData: mappedChartData } = calculateStatsFromSosData(sosList, subtitle);
            setStats(mappedStats);
            setChartData(mappedChartData);
          }

          if (historyResult.status === 'fulfilled') {
            setHistory(mapHistoryFromApi(historyResult.value));
          }
        } catch (err) {
          console.error('Dashboard refresh error:', err);
        } finally {
          if (!signal.aborted) setIsLoading(false);
        }
      }

      refreshData();
      return () => abortController.abort();
    };

    window.addEventListener('map-pin-created', handleMapPinChange);
    window.addEventListener('map-pin-deleted', handleMapPinChange);
    return () => {
      window.removeEventListener('map-pin-created', handleMapPinChange);
      window.removeEventListener('map-pin-deleted', handleMapPinChange);
    };
  }, [activeFilter]);

  return { stats, chartData, history, mapPins, isLoading, error };
}
