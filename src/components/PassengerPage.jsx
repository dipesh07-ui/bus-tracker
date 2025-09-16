// Imports resolved after merge: removed conflicting unused imports
import MapView from "./MapView";
import BackButton from "./BackButton";
import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "../config";

export default function PassengerPage() {
  const [showMap, setShowMap] = useState(false);
  const [query, setQuery] = useState("");
  const [buses, setBuses] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [isFullscreenMap, setIsFullscreenMap] = useState(false);
  const [selectedBus, setSelectedBus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/buses`);
        if (!response.ok) {
          throw new Error('Failed to fetch bus data');
        }
        const data = await response.json();
        setBuses(data.buses);
        setFiltered(data.buses);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBuses();
    // Refresh bus data every 10 seconds
    const interval = setInterval(fetchBuses, 10000); 
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const q = query.trim().toLowerCase();
    const t = setTimeout(() => {
        if (!q) {
            setFiltered(buses);
            return;
        }
        const result = buses.filter((b) => {
            return (
                String(b.id).toLowerCase().includes(q) ||
                (b.route && b.route.toLowerCase().includes(q))
            );
        });
        setFiltered(result);
    }, 180);
    return () => clearTimeout(t);
  }, [query, buses]);

  const handleBusClick = (bus) => {
    setSelectedBus(bus);
  };

  const handleCloseFullscreen = () => {
    setIsFullscreenMap(false);
    setSelectedBus(null);
  };

  if (loading) {
    return (
      <div className="flex flex-col h-screen bg-gray-50">
        <header className="bg-yellow-400 text-white p-3 sm:p-4 shadow">
          <div className="flex items-center justify-between">
            <BackButton to="/" className="text-white hover:text-gray-200 hover:bg-yellow-500" />
            <h1 className="text-base sm:text-lg font-bold">Passenger Dashboard</h1>
            <div className="w-16"></div>
          </div>
        </header>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading bus data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col h-screen bg-gray-50">
        <header className="bg-yellow-400 text-white p-3 sm:p-4 shadow">
          <div className="flex items-center justify-between">
            <BackButton to="/" className="text-white hover:text-gray-200 hover:bg-yellow-500" />
            <h1 className="text-base sm:text-lg font-bold">Passenger Dashboard</h1>
            <div className="w-16"></div>
          </div>
        </header>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            <h2 className="font-bold mb-2">Something went wrong</h2>
            <p>{error}</p>
            <p className="mt-2 text-sm">Please try again later.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-yellow-400 text-white p-3 sm:p-4 shadow">
        <div className="flex items-center justify-between">
          <BackButton to="/" className="text-white hover:text-gray-200 hover:bg-yellow-500" />
          <h1 className="text-base sm:text-lg font-bold">Passenger Dashboard</h1>
          <div className="w-16"></div> {/* Spacer for centering */}
        </div>
      </header>

      {/* Controls: search + map toggle */}
      <div className="p-2 sm:p-3 bg-white shadow">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          {/* Search Input */}
          <div className="flex-1 relative">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search bus no. or route..."
              className="w-full p-2 sm:p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm sm:text-base"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </div>

          {/* Map Toggle Button */}
          <button
            onClick={() => setShowMap(!showMap)}
            className={`px-3 py-2 sm:py-3 rounded-lg text-white font-semibold text-sm sm:text-base transition-colors ${
              showMap ? "bg-green-500 hover:bg-green-600" : "bg-gray-400 hover:bg-gray-500"
            }`}
          >
            {showMap ? "🗺️ Map On" : "📋 List View"}
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden">
        {showMap ? (
          // Map View
          <div className="h-full p-2 sm:p-4">
            <div className="w-full h-full bg-white rounded-xl shadow-lg overflow-hidden">
              <MapView 
                buses={filtered} 
                onBusClick={handleBusClick}
                isFullscreen={false}
              />
            </div>
          </div>
        ) : (
          // List View
          <div className="h-full overflow-y-auto p-2 sm:p-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-xl shadow-lg p-3 sm:p-4">
                <h2 className="text-lg font-bold text-gray-800 mb-3 sm:mb-4">
                  Nearby Buses ({filtered.length})
                </h2>
                
                {filtered.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                    {filtered.map((bus) => (
                      <div 
                        key={bus.id} 
                        className="p-3 border rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                        onClick={() => handleBusClick(bus)}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-lg">🚌</span>
                              <p className="font-semibold text-gray-800 text-sm sm:text-base">
                                {bus.route} • Bus {bus.id}
                              </p>
                            </div>
                            <p className={`text-xs sm:text-sm font-medium ${
                              bus.eta === 'Delayed' ? 'text-red-600' : 'text-gray-600'
                            }`}>
                              ETA: {bus.eta || 'N/A'}
                            </p>
                          </div>
                          <button className="text-yellow-600 hover:text-yellow-700 text-xs sm:text-sm font-medium ml-2">
                            Track →
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-2">🚌</div>
                    <p className="text-gray-500 text-sm sm:text-base">
                      {query ? `No buses found for \"${query}\"` : "No buses available"}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bus Details Overlay */}
      {selectedBus && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-end sm:items-center justify-center p-2 sm:p-4">
          <div className="w-full sm:max-w-md bg-white rounded-t-xl sm:rounded-2xl shadow-xl p-4 sm:p-6">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800">Bus {selectedBus.id}</h3>
              <button
                onClick={() => setSelectedBus(null)}
                className="text-gray-500 hover:text-gray-700 text-xl leading-none"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <div className="space-y-2 text-sm sm:text-base text-gray-700">
              <p><span className="font-semibold">Route:</span> {selectedBus.route}</p>
              <p>
                <span className="font-semibold">ETA:</span>{" "}
                <span className={selectedBus.eta === 'Delayed' ? 'text-red-600 font-semibold' : 'text-gray-700'}>
                  {selectedBus.eta}
                </span>
              </p>
            </div>

            {/* <div className="mt-4 flex gap-2">
              <button
                onClick={() => {
                  setIsFullscreenMap(true);
                }}
                className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 rounded-lg"
              >
                Track on Map
              </button>

              <button
                onClick={() => setSelectedBus(null)}
                className="px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50"
              >
                Close
              </button>
            </div> */}

          </div>
        </div>
      )}

      {/* Fullscreen Map Modal */}
      {isFullscreenMap && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4">
          <div className="w-full h-full bg-white rounded-lg sm:rounded-xl overflow-hidden">
            <MapView 
              buses={selectedBus ? [selectedBus] : filtered} 
              onBusClick={handleBusClick}
              isFullscreen={true}
              onCloseFullscreen={handleCloseFullscreen}
            />
          </div>
        </div>
      )}
    </div>
  );
}
