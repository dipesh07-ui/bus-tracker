import { HashRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import PassengerPage from "./components/PassengerPage";
import DriverLogin from "./components/DriverLogin";
import DriverPage from "./components/DriverPage";
import ProtectedRoute from "./components/ProtectedRoute";
import SplashScreen from "./components/SplashScreen";
import Navbar from "./components/Navbar"; // ⬅️ import navbar
import { useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <SplashScreen onFinish={() => setLoading(false)} />;
  }

  return (
    <Router>
      {/* Navbar stays on top of all pages */}
      <Navbar />

      {/* Page routes */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/passenger" element={<PassengerPage />} />
        <Route path="/driver-login" element={<DriverLogin />} />
        <Route
          path="/driver"
          element={
            <ProtectedRoute>
              <DriverPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
