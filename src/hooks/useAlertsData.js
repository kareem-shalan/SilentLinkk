import { useCallback, useEffect, useState } from 'react';
import {
  ORG_MENU_ITEMS,
  fetchMapPins,
  createMapPin,
  deleteMapPin,
} from '../services/organizationApi';

function useAlertsData() {
  const [alertsData, setAlertsData] = useState({
    menuItems: ORG_MENU_ITEMS,
    mapPins: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [actionError, setActionError] = useState(null);

  const loadPins = useCallback(async (signal) => {
    const mapPins = await fetchMapPins(signal);
    setAlertsData({ menuItems: ORG_MENU_ITEMS, mapPins });
    return mapPins;
  }, []);

  useEffect(() => {
    const abortController = new AbortController();

    async function load() {
      try {
        setIsLoading(true);
        setError(null);
        await loadPins(abortController.signal);
      } catch (err) {
        if (err.name === 'CanceledError' || err.code === 'ERR_CANCELED') return;
        console.error('Error loading map pins:', err);
        setError(err.response?.status === 401 ? 'Unauthorized. Please sign in again.' : 'Failed to load map pins.');
        setAlertsData({ menuItems: ORG_MENU_ITEMS, mapPins: [] });
      } finally {
        if (!abortController.signal.aborted) setIsLoading(false);
      }
    }

    load();
    return () => abortController.abort();
  }, [loadPins]);

  const handleCreatePin = useCallback(async ({ latitude, longitude, type }) => {
    setIsSubmitting(true);
    setActionError(null);

    try {
      const userName = localStorage.getItem('orgName') || '';
      const created = await createMapPin({ latitude, longitude, type, userName });
      setAlertsData((prev) => ({
        ...prev,
        mapPins: [...prev.mapPins, created],
      }));
      return { success: true };
    } catch (err) {
      console.error('Error creating map pin:', err);
      setActionError(err.response?.status === 401 ? 'Unauthorized. Please sign in again.' : 'Failed to create pin.');
      return { success: false };
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const handleDeletePin = useCallback(async (id) => {
    if (!id) return { success: false };

    setIsSubmitting(true);
    setActionError(null);

    try {
      await deleteMapPin(id);
      setAlertsData((prev) => ({
        ...prev,
        mapPins: prev.mapPins.filter((pin) => String(pin.id) !== String(id)),
      }));
      return { success: true };
    } catch (err) {
      console.error('Error deleting map pin:', err);
      setActionError(err.response?.status === 401 ? 'Unauthorized. Please sign in again.' : 'Failed to delete pin.');
      return { success: false };
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  return {
    alertsData,
    isLoading,
    isSubmitting,
    error,
    actionError,
    handleCreatePin,
    handleDeletePin,
    refetchPins: loadPins,
  };
}

export default useAlertsData;
