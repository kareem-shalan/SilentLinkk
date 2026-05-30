import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import redPinImg from '../../assets/red-pin.png';
import greenPinImg from '../../assets/green-pin.png';
import yellowPinImg from '../../assets/yellow-pin.png';

const countryCoordinates = {
  Egypt: { center: [26.8206, 30.8025], zoom: 6 },
  Morocco: { center: [31.7917, -7.0926], zoom: 6 },
  Tunisia: { center: [33.8869, 9.5375], zoom: 7 },
  Algeria: { center: [28.0339, 1.6596], zoom: 5 },
  Libya: { center: [26.3351, 17.2283], zoom: 6 },
};

// قاموس صغير للتحويل من الكلمة المخزنة في الـ localStorage إلى الاسم المكتوب فوق في الإحداثيات
const countryNameMapping = {
  maroc: 'Morocco',
  tunisia: 'Tunisia',
  libya: 'Libya',
  egypt: 'Egypt'
};

function ChangeView({ center, zoom }) {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.setView(center, zoom);
    }
  }, [center, zoom, map]);

  return null;
}

function AlertsMapPanel({ pins }) {
  // 1. التعديل هنا: نقرأ نفس المفتاح الموحد للمشروع 'org_country'
  const savedCountryKey = localStorage.getItem('org_country') || 'maroc';
  
  // 2. تحويل الاسم المكتوب (مثلاً maroc إلى Morocco) ليطابق الـ Object الخاص بالإحداثيات
  const currentCountry = countryNameMapping[savedCountryKey] || 'Morocco';

  const countryConfig =
    countryCoordinates[currentCountry] || countryCoordinates['Morocco'];

  const icons = {
    red: new L.Icon({
      iconUrl: redPinImg,
      iconSize: [32, 40],
      iconAnchor: [16, 40],
      popupAnchor: [0, -40],
    }),

    green: new L.Icon({
      iconUrl: greenPinImg,
      iconSize: [32, 40],
      iconAnchor: [16, 40],
      popupAnchor: [0, -40],
    }),

    yellow: new L.Icon({
      iconUrl: yellowPinImg,
      iconSize: [32, 40],
      iconAnchor: [16, 40],
      popupAnchor: [0, -40],
    }),
  };

  return (
    <div className="flex h-full gap-6">
      <div
        className="border border-[#8f8f8f] rounded-lg overflow-hidden"
        style={{ width: '929px', height: '862px' }}
      >
        <MapContainer
          center={countryConfig.center}
          zoom={countryConfig.zoom}
          style={{ height: '100%', width: '100%' }}
        >
          <ChangeView
            center={countryConfig.center}
            zoom={countryConfig.zoom}
          />

          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {pins?.map((pin, index) => (
            <Marker
              key={index}
              position={[
                pin.lat || countryConfig.center[0] + (index * 0.1), // تعديل بسيط لتبدأ الـ Pins الافتراضية من سنتر البلد المفتوحة بدلاً من التثبيت على مصر
                pin.lng || countryConfig.center[1] + (index * 0.1),
              ]}
              icon={icons[pin.tone] || icons.red}
            >
              <Popup>{pin.locationName || 'Alert Location'}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <div className="w-[220px] flex items-end pb-6">
        <div className="w-full rounded-2xl border border-[#E5E5E5] bg-[#F6F6F6] px-5 py-4 shadow-sm">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <img src={redPinImg} alt="Affected areas" className="w-4 h-5" />
              <span className="text-[14px] font-medium text-[#222]">
                Affected areas
              </span>
            </div>

            <div className="flex items-center gap-3">
              <img src={greenPinImg} alt="Safe places" className="w-4 h-5" />
              <span className="text-[14px] font-medium text-[#222]">
                Safe places
              </span>
            </div>

            <div className="flex items-center gap-3">
              <img src={yellowPinImg} alt="Help reached here" className="w-4 h-5" />
              <span className="text-[14px] font-medium text-[#222]">
                Help reached here
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlertsMapPanel;