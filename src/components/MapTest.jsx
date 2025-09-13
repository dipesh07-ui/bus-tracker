import React from 'react';

export default function MapTest() {
  return (
    <div className="w-full h-64 bg-blue-100 rounded-lg flex items-center justify-center">
      <div className="text-center">
        <div className="text-4xl mb-2">🗺️</div>
        <p className="text-lg font-semibold">Map Test Component</p>
        <p className="text-sm text-gray-600">This should show if the component is loading</p>
      </div>
    </div>
  );
}
