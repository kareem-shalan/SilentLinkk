import { useEffect, useState } from 'react';
import { fetchDashboardData } from '../services/authService';
import { DASHBOARD_CONTENT } from '../utils/constants';

function useDashboardData() {
	const [activeFilter, setActiveFilter] = useState(DASHBOARD_CONTENT.filterOptions[0]);
	const [dashboardData, setDashboardData] = useState({
		stats: [],
		menuItems: [],
		historyRows: [],
		mapPins: [],
	});

	useEffect(() => {
		let isMounted = true;

		async function loadDashboardData() {
			try {
				const data = await fetchDashboardData();
				if (isMounted) {
					setDashboardData(data);
				}
			} catch {
				if (isMounted) {
					setDashboardData({
						stats: [],
						menuItems: [],
						historyRows: [],
						mapPins: [],
					});
				}
			}
		}

		loadDashboardData();

		return () => {
			isMounted = false;
		};
	}, []);

	return {
		activeFilter,
		setActiveFilter,
		dashboardData,
	};
}

export default useDashboardData;
