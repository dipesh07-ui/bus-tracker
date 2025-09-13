import { Link } from "react-router-dom";
import { buses as initialBuses } from "../data/dummydata";
import MapView from "./MapView";
import React, { useState, useEffect } from "react";



export default function PassengerPage() {
  const [showMap, setShowMap] = useState(false);     // Map On/Off
  const [query, setQuery] = useState("");            // search input
  const [filtered, setFiltered] = useState(initialBuses);
  const [isFullscreenMap, setIsFullscreenMap] = useState(false);
  const [selectedBus, setSelectedBus] = useState(null);

  // Debounce filter so it doesn't run on every keystroke immediately
  useEffect(() => {
    const q = query.trim().toLowerCase();
    const t = setTimeout(() => {
      if (!q) {
        setFiltered(initialBuses);
        return;
      }
      // match by id or route (case-insensitive)
      const result = initialBuses.filter((b) => {
        return (
          b.id.toLowerCase().includes(q) ||
          (b.route && b.route.toLowerCase().includes(q))
        );
      });
      setFiltered(result);
    }, 180); // 180ms debounce
    return () => clearTimeout(t);
  }, [query]);

  const handleBusClick = (bus) => {
    setSelectedBus(bus);
    setIsFullscreenMap(true);
  };

  const handleCloseFullscreen = () => {
    setIsFullscreenMap(false);
    setSelectedBus(null);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-yellow-400 text-white p-3 sm:p-4 text-center font-bold text-lg shadow">
        <h1 className="text-base sm:text-lg">Passenger Dashboard</h1>
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
                              ETA: {bus.eta}
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
                      {query ? `No buses found for "${query}"` : "No buses available"}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Fullscreen Map Modal */}
      {isFullscreenMap && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4">
          <div className="w-full h-full bg-white rounded-lg sm:rounded-xl overflow-hidden">
            <MapView 
              buses={filtered} 
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
