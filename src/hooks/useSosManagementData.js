import { useCallback, useEffect, useState } from 'react';
import {
  ORG_MENU_ITEMS,
  buildStatusSummary,
  fetchSosList,
  fetchSosDetail,
  updateSosStatus,
  normalizeSosList,
  mapSosDetailFromApi,
  mapSosRowFromApi,
  uiStatusToApiState,
} from '../services/organizationApi';

function useSosManagementData() {
  const [sosManagementData, setSosManagementData] = useState({
    menuItems: ORG_MENU_ITEMS,
    statusSummary: [],
    alertRows: [],
  });
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDetailLoading, setIsDetailLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState(null);
  const [detailError, setDetailError] = useState(null);
  const [updateError, setUpdateError] = useState(null);

  const loadSosList = useCallback(async (signal) => {
    const data = await fetchSosList(signal);
    const alertRows = normalizeSosList(data);
    setSosManagementData({
      menuItems: ORG_MENU_ITEMS,
      alertRows,
      statusSummary: buildStatusSummary(alertRows),
    });
    return alertRows;
  }, []);

  useEffect(() => {
    const abortController = new AbortController();

    async function load() {
      try {
        setIsLoading(true);
        setError(null);
        await loadSosList(abortController.signal);
      } catch (err) {
        if (err.name === 'CanceledError' || err.code === 'ERR_CANCELED') return;
        console.error('Error loading SOS list:', err);
        setError(err.response?.status === 401 ? 'Unauthorized. Please sign in again.' : 'Failed to load SOS alerts.');
        setSosManagementData((prev) => ({ ...prev, alertRows: [], statusSummary: buildStatusSummary([]) }));
      } finally {
        if (!abortController.signal.aborted) setIsLoading(false);
      }
    }

    load();
    return () => abortController.abort();
  }, [loadSosList]);

  const fetchDetail = useCallback(async (row) => {
    const sosId = row?.id ?? row?.alertId;
    if (!sosId) {
      setSelectedDetail(row);
      return row;
    }

    setIsDetailLoading(true);
    setDetailError(null);

    try {
      const data = await fetchSosDetail(sosId);
      const detail = mapSosDetailFromApi(data);
      setSelectedDetail(detail);
      return detail;
    } catch (err) {
      console.error('Error loading SOS detail:', err);
      setDetailError(err.response?.status === 401 ? 'Unauthorized. Please sign in again.' : 'Failed to load alert details.');
      setSelectedDetail(row);
      return row;
    } finally {
      setIsDetailLoading(false);
    }
  }, []);

  const handleStatusUpdate = useCallback(async (row, uiStatus) => {
    const sosId = row?.id ?? row?.alertId;
    if (!sosId) return { success: false };

    setIsUpdating(true);
    setUpdateError(null);

    try {
      const state = uiStatusToApiState(uiStatus);
      await updateSosStatus(sosId, state);

      const updatedRow = mapSosRowFromApi({
        ...row,
        id: sosId,
        alertId: row.alertId ?? String(sosId),
        status: state,
      });

      setSelectedDetail((prev) => (prev ? { ...prev, ...updatedRow } : updatedRow));

      const alertRows = await loadSosList(undefined);
      const refreshed = alertRows.find((r) => String(r.id ?? r.alertId) === String(sosId)) ?? updatedRow;
      setSelectedDetail(refreshed);

      return { success: true, detail: refreshed };
    } catch (err) {
      console.error('Error updating SOS status:', err);
      setUpdateError(err.response?.status === 401 ? 'Unauthorized. Please sign in again.' : 'Failed to update status.');
      return { success: false };
    } finally {
      setIsUpdating(false);
    }
  }, [loadSosList]);

  return {
    sosManagementData,
    selectedDetail,
    isLoading,
    isDetailLoading,
    isUpdating,
    error,
    detailError,
    updateError,
    fetchDetail,
    handleStatusUpdate: updateSosStatus,
  };
}

export default useSosManagementData;
