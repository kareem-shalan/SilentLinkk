import { useEffect, useState } from 'react';
import { fetchAlertsData } from '../services/authService';

function useAlertsData() {
	const [alertsData, setAlertsData] = useState({
		menuItems: [],
		mapPins: [],
		userInfoRows: [],
		timelineRows: [],
	});

	useEffect(() => {
		let isMounted = true;

		async function loadAlertsData() {
			try {
				const data = await fetchAlertsData();
				if (isMounted) {
					setAlertsData(data);
				}
			} catch {
				if (isMounted) {
					setAlertsData({
						menuItems: [],
						mapPins: [],
						userInfoRows: [],
						timelineRows: [],
					});
				}
			}
		}

		loadAlertsData();

		return () => {
			isMounted = false;
		};
	}, []);

	return {
		alertsData,
	};
}

export default useAlertsData;
