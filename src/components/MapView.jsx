
import React, { useEffect, useRef, useState, Suspense, lazy } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Lazy load heavy map components
const MapContainer = lazy(() => import('react-leaflet').then(module => ({ default: module.MapContainer })));
const TileLayer = lazy(() => import('react-leaflet').then(module => ({ default: module.TileLayer })));
const Marker = lazy(() => import('react-leaflet').then(module => ({ default: module.Marker })));
const Popup = lazy(() => import('react-leaflet').then(module => ({ default: module.Popup })));

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Ensure Leaflet is available
if (typeof window !== 'undefined') {
  window.L = L;
}

// Custom bus icon
const createBusIcon = (color = '#FCD34D') => {
  return L.divIcon({
    className: 'custom-bus-icon',
    html: `<div style="
      background-color: ${color};
      width: 30px;
      height: 30px;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    ">
      <span style="
        transform: rotate(45deg);
        font-size: 16px;
        color: white;
      ">🚌</span>
    </div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });
};

export default function MapView({ buses, onBusClick, isFullscreen = false, onCloseFullscreen }) {
  const mapRef = useRef(null);
  const [mapCenter, setMapCenter] = useState([19.0760, 72.8777]); // Mumbai coordinates

  useEffect(() => {
    // Get user's current location if available
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMapCenter([position.coords.latitude, position.coords.longitude]);
        },
        () => {
          // Use default Mumbai coordinates if location access denied
          console.log('Location access denied, using default coordinates');
        }
      );
    }
  }, []);

  const handleBusClick = (bus) => {
    if (onBusClick) {
      onBusClick(bus);
    }
  };

  return (
    <div className={`relative ${isFullscreen ? 'fixed inset-0 z-50 bg-white' : 'w-full h-full'}`}>
      {isFullscreen && (
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={onCloseFullscreen}
            className="bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
          >
            <span className="text-xl">✕</span>
          </button>
        </div>
      )}
      
      <div className="w-full h-full">
        <Suspense fallback={
          <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400 mx-auto mb-2"></div>
              <p className="text-gray-600 text-sm">Loading map...</p>
            </div>
          </div>
        }>
          <MapContainer
            center={mapCenter}
            zoom={13}
            className="w-full h-full rounded-lg"
            ref={mapRef}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {buses.map((bus) => (
              <Marker
                key={bus.id}
                position={[bus.lat, bus.lng]}
                icon={createBusIcon(bus.eta === 'Delayed' ? '#EF4444' : '#FCD34D')}
                eventHandlers={{
                  click: () => handleBusClick(bus),
                }}
              >
                <Popup>
                  <div className="p-2">
                    <h3 className="font-bold text-lg">{bus.route} • Bus {bus.id}</h3>
                    <p className="text-sm text-gray-700"><span className="font-semibold">ETA:</span> {bus.eta || 'N/A'}</p>
                    {bus.next_stop && (
                      <p className="text-sm text-gray-700"><span className="font-semibold">Next stop:</span> {bus.next_stop}</p>
                    )}
                    {bus.upcoming_stops && bus.upcoming_stops.length > 0 && (
                      <div className="mt-1 flex flex-wrap gap-1">
                        {bus.upcoming_stops.map((s, i) => (
                          <span key={i} className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 border text-xs">{s}</span>
                        ))}
                      </div>
                    )}
                    <button 
                      className="mt-2 bg-yellow-400 text-white px-3 py-1 rounded text-sm hover:bg-yellow-500 transition-colors"
                      onClick={() => handleBusClick(bus)}
                    >
                      Track Bus
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </Suspense>
      </div>
    </div>
  );
}
