import { useEffect, useMemo, useState } from 'react';

const NORTH_AFRICA_COUNTRIES = [
	{
		id: 'morocco',
		name: 'Morocco',
		iso3: 'MAR',
		center: [31.7917, -7.0926],
	},
	{
		id: 'algeria',
		name: 'Algeria',
		iso3: 'DZA',
		center: [28.0339, 1.6596],
	},
	{
		id: 'tunisia',
		name: 'Tunisia',
		iso3: 'TUN',
		center: [33.8869, 9.5375],
	},
	{
		id: 'libya',
		name: 'Libya',
		iso3: 'LBY',
		center: [26.3351, 17.2283],
	},
	{
		id: 'egypt',
		name: 'Egypt',
		iso3: 'EGY',
		center: [26.8206, 30.8025],
	},
];

const NORTH_AFRICA_VIEW_BOUNDS = [
	[19.0, -18.5],
	[38.5, 33.5],
];

function normalizeCountryFeature(payload, country) {
	if (!payload || typeof payload !== 'object') {
		return null;
	}

	if (payload.type === 'Feature') {
		return {
			...payload,
			properties: {
				...(payload.properties || {}),
				id: country.id,
				name: country.name,
				iso3: country.iso3,
			},
		};
	}

	if (payload.type === 'FeatureCollection' && Array.isArray(payload.features) && payload.features[0]) {
		return {
			...payload.features[0],
			properties: {
				...(payload.features[0].properties || {}),
				id: country.id,
				name: country.name,
				iso3: country.iso3,
			},
		};
	}

	return null;
}

function useNorthAfricaGeoData(pins = []) {
	const [geoJson, setGeoJson] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [errorMessage, setErrorMessage] = useState('');

	useEffect(() => {
		const abortController = new AbortController();

		async function loadGeoData() {
			setIsLoading(true);
			setErrorMessage('');

			try {
				const features = await Promise.all(
					NORTH_AFRICA_COUNTRIES.map(async (country) => {
						const response = await fetch(
							`https://raw.githubusercontent.com/johan/world.geo.json/master/countries/${country.iso3}.geo.json`,
							{
								signal: abortController.signal,
							}
						);

						if (!response.ok) {
							throw new Error('Country boundaries failed to load.');
						}

						const payload = await response.json();
						return normalizeCountryFeature(payload, country);
					})
				);

				const validFeatures = features.filter(Boolean);

				setGeoJson({
					type: 'FeatureCollection',
					features: validFeatures,
				});
			} catch (error) {
				if (error.name !== 'AbortError') {
					setGeoJson(null);
					setErrorMessage(error.message || 'Unable to load North Africa map data.');
				}
			} finally {
				if (!abortController.signal.aborted) {
					setIsLoading(false);
				}
			}
		}

		loadGeoData();

		return () => {
			abortController.abort();
		};
	}, []);

	const markerTonesByCountryId = useMemo(() => {
		return NORTH_AFRICA_COUNTRIES.reduce((accumulator, country, index) => {
			accumulator[country.id] = pins[index]?.tone || 'yellow';
			return accumulator;
		}, {});
	}, [pins]);

	return {
		countries: NORTH_AFRICA_COUNTRIES,
		viewBounds: NORTH_AFRICA_VIEW_BOUNDS,
		geoJson,
		isLoading,
		errorMessage,
		markerTonesByCountryId,
	};
}

export default useNorthAfricaGeoData;
