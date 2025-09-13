import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="relative flex flex-col min-h-screen bg-gradient-to-br from-yellow-100 via-white to-yellow-50">
      {/* Center content */}
      <div className="flex flex-col items-center justify-center flex-grow px-4 sm:px-6 relative">
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-6 sm:p-10 w-full max-w-md text-center relative z-10">
          <h1 className="text-xl sm:text-2xl font-bold mb-3 text-gray-800">
            Choose Account Type
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
            Get started by selecting your role
          </p>

          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            <Link
              to="/passenger"
              className="flex flex-col items-center justify-center 
                         border-2 border-yellow-400 rounded-xl p-4 sm:p-6 
                         shadow hover:bg-yellow-50 transition-colors"
            >
              <span className="text-3xl sm:text-4xl mb-2">👤</span>
              <p className="font-semibold text-gray-700 text-sm sm:text-base">Passenger</p>
              <p className="text-xs text-gray-500">Track buses & routes</p>
            </Link>

            <Link
              to="/driver-login"
              className="flex flex-col items-center justify-center 
                         border-2 border-yellow-400 rounded-xl p-4 sm:p-6 
                         shadow hover:bg-yellow-50 transition-colors"
            >
              <span className="text-3xl sm:text-4xl mb-2">👮</span>
              <p className="font-semibold text-gray-700 text-sm sm:text-base">Driver</p>
              <p className="text-xs text-gray-500">Manage trips & schedules</p>
            </Link>
          </div>
        </div>

        {/* Features section */}
        <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-center text-gray-700 z-10 w-full max-w-2xl">
          <div className="p-3 sm:p-4 bg-white rounded-xl shadow hover:scale-[1.02] sm:hover:scale-[1.05] transition-transform">
            <div className="text-2xl sm:text-3xl mb-2">🚍</div>
            <p className="text-sm sm:text-base font-medium">Live Tracking</p>
          </div>
          <div className="p-3 sm:p-4 bg-white rounded-xl shadow hover:scale-[1.02] sm:hover:scale-[1.05] transition-transform">
            <div className="text-2xl sm:text-3xl mb-2">👤</div>
            <p className="text-sm sm:text-base font-medium">Simple Login</p>
          </div>
          <div className="p-3 sm:p-4 bg-white rounded-xl shadow hover:scale-[1.02] sm:hover:scale-[1.05] transition-transform">
            <div className="text-2xl sm:text-3xl mb-2">🌍</div>
            <p className="text-sm sm:text-base font-medium">Multi-City Support</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 text-gray-600 text-center py-3 sm:py-4 text-xs sm:text-sm mt-6 sm:mt-10">
        © 2025 MyBusApp. All rights reserved.
      </footer>
    </div>
  );
}
