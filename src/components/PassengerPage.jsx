import { Link } from "react-router-dom";
import { buses as initialBuses } from "../data/dummydata";

import React, { useState, useEffect } from "react";



export default function PassengerPage() {
  const [showMap, setShowMap] = useState(false);     // Map On/Off
  const [query, setQuery] = useState("");            // search input
  const [filtered, setFiltered] = useState(initialBuses);

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

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-yellow-400 text-white p-4 text-center font-bold text-lg shadow">
        Passenger Dashboard
      </header>

      {/* Controls: search + bandwidth toggle */}
      <div className="p-3 bg-white shadow flex items-center gap-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search bus no. or route (e.g. 303 or A-37)..."
          className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <button
          onClick={() => setQuery("")}
          className="px-3 py-2 text-sm text-gray-600 border rounded hover:bg-gray-100"
        >
          Clear
        </button>

        <div className="flex items-center gap-2 ml-2">
          {/* <span className="text-gray-700 text-sm">Low BW</span> */}
          <button
            onClick={() => setShowMap(!showMap)}
            className={`px-3 py-1 rounded-full text-white font-semibold ${
              showMap ? "bg-green-500" : "bg-gray-400"
            }`}
          >
            {showMap ? "Map On" : "Map Off"}
          </button>
        </div>
      </div>

      {/* Main area: either map placeholder or light list */}
      <div className="flex-1 bg-gray-200 flex items-center justify-center p-4">
        {showMap ? (
          <div className="w-full max-w-4xl h-full bg-white rounded-xl shadow-inner p-4 flex flex-col">
            {/* Replace this placeholder with your map embed / component */}
            <div className="flex-1 rounded-md border-2 border-dashed border-gray-200 flex items-center justify-center">
              <p className="text-gray-500">🗺 Map Placeholder (shows {filtered.length} result(s))</p>
            </div>

            {/* quick list under the map */}
            <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
              {filtered.length ? (
                filtered.map((b) => (
                  <div key={b.id} className="p-3 border rounded-lg bg-gray-50">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-gray-800">{b.route} • Bus {b.id}</p>
                        <p className="text-sm text-gray-500">ETA: {b.eta}</p>
                      </div>
                      <button className="text-sm text-yellow-600 font-medium">Track</button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 p-3">No buses match your search.</p>
              )}
            </div>
          </div>
        ) : (
          // Lite mode: simple text-only list for low bandwidth
          <div className="w-full max-w-md bg-white rounded-xl shadow-inner p-4">
            <p className="text-gray-700 font-bold mb-3">Nearby Buses (Lite mode)</p>

            <ul className="space-y-2 text-gray-700">
              {filtered.length ? (
                filtered.map((b) => (
                  <li key={b.id} className="p-3 border rounded-lg flex justify-between items-center">
                    <div>
                      <div className="font-semibold">{b.route} • Bus {b.id}</div>
                      <div className="text-sm text-gray-500">{b.eta}</div>
                    </div>
                    <div className="text-xs text-gray-400">▸</div>
                  </li>
                ))
              ) : (
                <li className="text-gray-500">No buses found for "{query}"</li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
