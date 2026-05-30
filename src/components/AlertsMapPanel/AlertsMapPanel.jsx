import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import redPinImg from '../../assets/red-pin.png';
import greenPinImg from '../../assets/green-pin.png';
import yellowPinImg from '../../assets/yellow-pin.png';
import { toneToType } from '../../services/organizationApi';

const countryCoordinates = {
  Egypt: { center: [26.8206, 30.8025], zoom: 6 },
  Morocco: { center: [31.7917, -7.0926], zoom: 6 },
  Tunisia: { center: [33.8869, 9.5375], zoom: 7 },
  Algeria: { center: [28.0339, 1.6596], zoom: 5 },
  Libya: { center: [26.3351, 17.2283], zoom: 6 },
};

const countryNameMapping = {
  maroc: 'Morocco',
  morocco: 'Morocco',
  tunisia: 'Tunisia',
  libya: 'Libya',
  egypt: 'Egypt',
  algeria: 'Algeria',
  algerie: 'Algeria',
};

const PIN_TYPES = [
  { label: 'Affected areas', tone: 'red', type: 'Affected' },
  { label: 'Safe places', tone: 'green', type: 'Safe' },
  { label: 'Help reached here', tone: 'yellow', type: 'Help' },
];

function ChangeView({ center, zoom }) {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.setView(center, zoom);
    }
  }, [center, zoom, map]);

  return null;
}

function MapClickHandler({ onMapClick, disabled }) {
  useMapEvents({
    click(e) {
      if (!disabled && onMapClick) {
        onMapClick(e.latlng.lat, e.latlng.lng);
      }
    },
  });
  return null;
}

function CreatePinMarker({ position, onConfirm, onCancel, isSubmitting }) {
  const [selectedType, setSelectedType] = useState('Affected');
  const markerRef = useRef(null);

  useEffect(() => {
    markerRef.current?.openPopup();
  }, []);

  return (
    <Marker position={position} ref={markerRef}>
      <Popup>
        <div style={{ minWidth: '160px' }}>
          <p style={{ margin: '0 0 8px', fontWeight: 'bold', fontSize: '13px' }}>Add pin</p>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            style={{ width: '100%', marginBottom: '8px', fontSize: '12px' }}
          >
            {PIN_TYPES.map((item) => (
              <option key={item.type} value={item.type}>{item.label}</option>
            ))}
          </select>
          <div style={{ display: 'flex', gap: '6px' }}>
            <button
              type="button"
              onClick={() => onConfirm(selectedType)}
              disabled={isSubmitting}
              style={{
                flex: 1,
                padding: '4px 8px',
                backgroundColor: '#C5D5B9',
                border: 'none',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: 'bold',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                opacity: isSubmitting ? 0.6 : 1,
              }}
            >
              {isSubmitting ? 'Saving...' : 'Confirm'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              disabled={isSubmitting}
              style={{
                flex: 1,
                padding: '4px 8px',
                backgroundColor: '#F5F5F5',
                border: 'none',
                borderRadius: '4px',
                fontSize: '12px',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}

function AlertsMapPanel({ pins, onCreatePin, onDeletePin, isSubmitting, actionError }) {
  const savedCountryKey = localStorage.getItem('org_country') || 'maroc';
  const currentCountry = countryNameMapping[savedCountryKey.toLowerCase()] || 'Morocco';
  const countryConfig = countryCoordinates[currentCountry] || countryCoordinates['Morocco'];

  const [pendingPin, setPendingPin] = useState(null);

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

  async function handleConfirmCreate(type) {
    if (!pendingPin || !onCreatePin) return;
    const result = await onCreatePin({
      latitude: pendingPin.lat,
      longitude: pendingPin.lng,
      type,
    });
    if (result?.success) setPendingPin(null);
  }

  async function handleDelete(id) {
    if (onDeletePin) await onDeletePin(id);
  }

  return (
    <div className="flex h-full min-h-[400px] w-full flex-col gap-4 lg:min-h-[500px] lg:flex-row lg:gap-6">
      <div className="relative h-[350px] w-full flex-1 overflow-hidden rounded-lg border border-[#8f8f8f] sm:h-[450px] lg:min-h-[500px] lg:h-auto lg:flex-[1_1_0%]">
        {actionError ? (
          <div style={{ padding: '8px 12px', color: '#8a1f1f', fontSize: '13px', fontWeight: 'bold' }}>
            {actionError}
          </div>
        ) : null}
        <MapContainer
          center={countryConfig.center}
          zoom={countryConfig.zoom}
          style={{ height: '100%', width: '100%' }}
        >
          <ChangeView center={countryConfig.center} zoom={countryConfig.zoom} />
          <MapClickHandler onMapClick={(lat, lng) => setPendingPin({ lat, lng })} disabled={isSubmitting} />
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {pendingPin ? (
            <CreatePinMarker
              position={[pendingPin.lat, pendingPin.lng]}
              onConfirm={handleConfirmCreate}
              onCancel={() => setPendingPin(null)}
              isSubmitting={isSubmitting}
            />
          ) : null}

          {pins?.filter((pin) => pin.lat != null && pin.lng != null).map((pin) => (
            <Marker
              key={pin.id ?? `${pin.lat}-${pin.lng}`}
              position={[pin.lat, pin.lng]}
              icon={icons[pin.tone] || icons.red}
            >
              <Popup>
                <div style={{ minWidth: '180px' }}>
                  <p style={{ margin: '0 0 6px', fontSize: '13px', fontWeight: 'bold' }}>{pin.locationName || 'Alert Location'}</p>
                  <p style={{ margin: '0 0 4px', fontSize: '11px', color: '#666' }}>{toneToType(pin.tone)}</p>
                  
                  {pin.userName ? (
                    <p style={{ margin: '0 0 4px', fontSize: '11px' }}>
                      <strong>User:</strong> {pin.userName}
                    </p>
                  ) : null}
                  
                  {pin.emergencyType ? (
                    <p style={{ margin: '0 0 4px', fontSize: '11px' }}>
                      <strong>Type:</strong> {pin.emergencyType}
                    </p>
                  ) : null}
                  
                  {pin.status ? (
                    <p style={{ margin: '0 0 4px', fontSize: '11px' }}>
                      <strong>Status:</strong> {pin.status}
                    </p>
                  ) : null}
                  
                  <p style={{ margin: '0 0 4px', fontSize: '11px', color: '#666' }}>
                    <strong>Coords:</strong> {pin.lat?.toFixed(4)}, {pin.lng?.toFixed(4)}
                  </p>
                  
                  {pin.phone ? (
                    <p style={{ margin: '0 0 8px', fontSize: '11px' }}>
                      <strong>Phone:</strong> {pin.phone}
                    </p>
                  ) : null}
                  
                  {pin.createdAt ? (
                    <p style={{ margin: '0 0 8px', fontSize: '10px', color: '#999' }}>
                      {pin.createdAt}
                    </p>
                  ) : null}
                  
                  {pin.id ? (
                    <button
                      type="button"
                      onClick={() => handleDelete(pin.id)}
                      disabled={isSubmitting}
                      style={{
                        width: '100%',
                        padding: '4px 8px',
                        backgroundColor: '#E09A9A',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        cursor: isSubmitting ? 'not-allowed' : 'pointer',
                        opacity: isSubmitting ? 0.6 : 1,
                      }}
                    >
                      Delete
                    </button>
                  ) : null}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <div className="flex w-full shrink-0 items-end pb-2 lg:w-[220px] lg:pb-6">
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
