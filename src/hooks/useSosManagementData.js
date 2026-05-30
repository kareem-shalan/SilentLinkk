
import { useEffect, useState } from 'react';
import { fetchSosManagementData } from '../services/authService';

function useSosManagementData() {
	const [sosManagementData, setSosManagementData] = useState({
		menuItems: [],
		statusSummary: [],
		historyRows: [],
		alertDetails: {
			alertId: '',
			status: '',
			statusClass: '',
			userLabel: '',
			userName: '',
			phone: '',
			timeline: [],
		},
	});

	useEffect(() => {
    let isMounted = true;

    async function loadSosManagementData() {
      try {
        const data = await fetchSosManagementData();
        if (isMounted && data) {
          // بنضمن إن alertRows دايماً موجودة حتى لو الـ service اتأخرت
          setSosManagementData({
            ...data,
            alertRows: data.alertRows || [] 
          });
        }
      } catch (error) {
        console.error("Error loading data:", error);
        if (isMounted) {
          // في حالة الخطأ بنرجع مصفوفة فاضية عشان الـ map متضربش
          setSosManagementData(prev => ({ ...prev, alertRows: [] }));
        }
      }
    }

    loadSosManagementData();
    return () => { isMounted = false; };
  }, []);

	return {
		sosManagementData,
	};
}

export default useSosManagementData;
