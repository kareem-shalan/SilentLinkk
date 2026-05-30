import React, { useEffect } from 'react';
import { CircleMarker, GeoJSON, MapContainer, Popup, TileLayer, Tooltip, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import useNorthAfricaGeoData from '../../hooks/useNorthAfricaGeoData';

// 1️⃣ كائن الإحداثيات الدقيقة للزوم الخاص بكل دولة (أضفنا الجزائر هنا بالملي)
const MAP_CENTERS = {
  maroc: { center: [31.7917, -7.0926], zoom: 6 },
  morocco: { center: [31.7917, -7.0926], zoom: 6 },
  libya: { center: [26.3351, 17.2283], zoom: 6 },
  tunisia: { center: [33.8869, 9.5375], zoom: 7 },
  egypt: { center: [26.8206, 30.8025], zoom: 6 },
  algeria: { center: [28.0339, 1.6596], zoom: 5.5 }, // 🎯 إحداثيات الجزائر السحرية والزووم المظبوط ليها
  algerie: { center: [28.0339, 1.6596], zoom: 5.5 }  // تأمين إضافي للاسم بالفرنسية
};

// 2️⃣ المكون الداخلي اللي بيجبر الكاميرا تطير وتركز على البلد الحالية
function ChangeView({ country }) {
  const map = useMap();
  
  useEffect(() => {
    // تحويل اسم البلد لسمول عشان يطابق الـ Keys بالملي
    const cleanCountry = String(country || '').toLowerCase().trim();
    const config = MAP_CENTERS[cleanCountry];
    
    if (config && config.center) {
      // الغاء القيود مؤقتاً عشان نسمح بالانتقال السلس والزوم الحر
      map.setMaxBounds(null);
      // طيران وعمل زووم على البلد المحددة
      map.setView(config.center, config.zoom, { animate: true, duration: 1.5 });
    }
  }, [country, map]);
  
  return null;
}

function NorthAfricaInteractiveMap({ pins, country }) {
	const { countries, viewBounds, geoJson, isLoading, errorMessage, markerTonesByCountryId } =
		useNorthAfricaGeoData(pins);
	
	const markerColorByTone = {
		red: '#e05044',
		yellow: '#f1b100',
		green: '#34a264',
	};

	// قراءة البلد النشطة وتحويلها لحروف صغيرة للأمان
	const activeCountry = String(country || localStorage.getItem('org_country') || 'maroc').toLowerCase().trim();
	const hasActiveConfig = MAP_CENTERS[activeCountry];

	return (
		<div className="relative h-full w-full">
			<MapContainer
				// لو فيه بلد نشطة ومتسجلة في الـ CENTERS بنلغي الـ bounds عشان ما تكتفش الزووم
				bounds={hasActiveConfig ? undefined : viewBounds}
				maxBounds={hasActiveConfig ? undefined : viewBounds}
				maxBoundsViscosity={1}
				minZoom={3} 
				maxZoom={12} 
				zoomControl
				className="h-full w-full"
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				
				{/* 3️⃣ استدعاء مكون التوجيه والزووم التلقائي الطائر */}
				<ChangeView country={activeCountry} />

				{geoJson ? (
					<GeoJSON
						data={geoJson}
						style={() => ({
							color: '#2f4b2f',
							weight: 1.5,
							fillColor: '#b8d2a8',
							fillOpacity: 0.5,
						})}
					/>
				) : null}
				{countries.map((countryItem) => (
					<CircleMarker
						key={countryItem.id}
						center={countryItem.center}
						radius={6}
						pathOptions={{
							color: markerColorByTone[markerTonesByCountryId[countryItem.id]] || markerColorByTone.yellow,
							fillOpacity: 1,
							weight: 2,
						}}
					>
						<Tooltip direction="top" offset={[0, -4]} opacity={1} permanent>
							{countryItem.name}
						</Tooltip>
						<Popup>{countryItem.name}</Popup>
					</CircleMarker>
				))}
			</MapContainer>
			{isLoading ? (
				<div className="pointer-events-none absolute inset-0 z-[500] grid place-items-center bg-white/45 text-[length:var(--font-size-md)] font-semibold text-[#1f1f1f]">
					Loading North Africa map...
				</div>
			) : null}
			{errorMessage ? (
				<div className="pointer-events-none absolute inset-x-3 bottom-3 z-[500] rounded-[var(--radius-sm)] bg-[#fff5f5] px-3 py-2 text-[length:var(--font-size-sm)] font-semibold text-[#8a1f1f]">
					{errorMessage}
				</div>
			) : null}
		</div>
	);
}

export default NorthAfricaInteractiveMap;