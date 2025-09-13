import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="relative flex flex-col min-h-screen bg-gradient-to-br from-yellow-100 via-white to-yellow-50">
      {/* Center content */}
      <div className="flex flex-col items-center justify-center flex-grow px-6 relative">
        {/* Faint illustration in background */}
        {/* <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
          <span className="text-[10rem]">🚌</span>
        </div> */}

        <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-md text-center relative z-10">
          {/* Removed duplicate logo here */}

          <h1 className="text-2xl font-bold mb-3 text-gray-800">
            Choose Account Type
          </h1>
          <p className="text-gray-600 mb-8">
            Get started by selecting your role
          </p>

          <div className="grid grid-cols-2 gap-6">
            <Link
              to="/passenger"
              className="flex flex-col items-center justify-center 
                         border-2 border-yellow-400 rounded-xl p-6 
                         shadow hover:bg-yellow-50 transition"
            >
              <span className="text-4xl mb-2">👤</span>
              <p className="font-semibold text-gray-700">Passenger</p>
              <p className="text-xs text-gray-500">Track buses & routes</p>
            </Link>

            <Link
              to="/driver-login"
              className="flex flex-col items-center justify-center 
                         border-2 border-yellow-400 rounded-xl p-6 
                         shadow hover:bg-yellow-50 transition"
            >
              <span className="text-4xl mb-2">👮</span>
              <p className="font-semibold text-gray-700">Driver</p>
              <p className="text-xs text-gray-500">Manage trips & schedules</p>
            </Link>
          </div>
        </div>

        {/* Features section */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center text-gray-700 z-10">
          <div className="p-4 bg-white rounded-xl shadow hover:scale-[1.05]  ">
            🚍
            <p className="mt-2 font-medium">Live Tracking</p>
          </div>
          <div className="p-4 bg-white rounded-xl shadow hover:scale-[1.05] ">
            👤
            <p className="mt-2 font-medium">Simple Login</p>
          </div>
          <div className="p-4 bg-white rounded-xl shadow hover:scale-[1.05] ">
            🌍
            <p className="mt-2 font-medium">Multi-City Support</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 text-gray-600 text-center py-4 text-sm mt-10">
        © 2025 MyBusApp. All rights reserved.
      </footer>
    </div>
  );
}
