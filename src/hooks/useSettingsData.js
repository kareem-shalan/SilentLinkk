import { useEffect, useState } from 'react';
import { fetchSettingsData } from '../services/authService';

function useSettingsData() {
	const [settingsData, setSettingsData] = useState({
		menuItems: [],
		preferences: [],
	});

	useEffect(() => {
		let isMounted = true;

		async function loadSettingsData() {
			try {
				const data = await fetchSettingsData();
				if (isMounted) {
					setSettingsData(data);
				}
			} catch {
				if (isMounted) {
					setSettingsData({
						menuItems: [],
						preferences: [],
					});
				}
			}
		}

		loadSettingsData();

		return () => {
			isMounted = false;
		};
	}, []);

	return {
		settingsData,
	};
}

export default useSettingsData;
