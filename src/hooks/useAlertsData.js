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

  // Listen for SOS status updates to refresh map pins
  useEffect(() => {
    const handleSosStatusUpdate = () => {
      loadPins(new AbortController().signal).catch((err) => {
        if (err.name !== 'CanceledError' && err.code !== 'ERR_CANCELED') {
          console.error('Error refreshing map pins after SOS update:', err);
        }
      });
    };

    window.addEventListener('sos-status-updated', handleSosStatusUpdate);
    return () => window.removeEventListener('sos-status-updated', handleSosStatusUpdate);
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
      
      // Dispatch event to notify Dashboard and SOS pages to refresh
      window.dispatchEvent(new CustomEvent('map-pin-created', { detail: { pin: created } }));
      
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
      // Check if this is a locally cached pin (starts with 'local_')
      // Local pins don't exist on the server, so we only remove them from local state
      const isLocalPin = String(id).startsWith('local_');
      
      if (!isLocalPin) {
        await deleteMapPin(id, new AbortController().signal);
      }
      
      setAlertsData((prev) => ({
        ...prev,
        mapPins: prev.mapPins.filter((pin) => String(pin.id) !== String(id)),
      }));
      
      // Dispatch event to notify Dashboard and SOS pages to refresh
      window.dispatchEvent(new CustomEvent('map-pin-deleted', { detail: { pinId: id, isLocalPin } }));
      
      return { success: true };
    } catch (err) {
      console.error('Error deleting map pin:', err);
      const errorMessage = err.response?.data?.message || err.response?.data?.error || err.message || 'Failed to delete pin.';
      setActionError(err.response?.status === 401 ? 'Unauthorized. Please sign in again.' : errorMessage);
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
