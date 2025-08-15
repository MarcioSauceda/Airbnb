// src/router/index.jsx
import { BrowserRouter, Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ListingDetail from "../pages/ListingDetail";
import ProtectedRoute from "./ProtectedRoute";
import Navbar from "../components/Navbar";
import Trips from "../pages/Trips";
import HostDashboard from "../pages/host/HostDashboard";

// Wizard (asegúrate de que estos archivos existan)
import { HostNewProvider } from "../context/HostNewContext";
import StepType from "../pages/host/new/StepType";
import StepAddress from "../pages/host/new/StepAddress";
import StepBasics from "../pages/host/new/StepBasics";
import StepDetails from "../pages/host/new/StepDetails";
import StepPhotos from "../pages/host/new/StepPhotos";

// Opcional: ocultar Navbar en el wizard
function Chrome({ children }) {
  const location = useLocation();
  const hideNavbar = location.pathname.startsWith("/host/listings/new");
  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
    </>
  );
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Chrome>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />

          <Route
            path="/listing/:id"
            element={
              <ProtectedRoute>
                <ListingDetail/>
              </ProtectedRoute>
            }
          />

          <Route
            path="/trips"
            element={
              <ProtectedRoute>
                <Trips/>
              </ProtectedRoute>
            }
          />

          <Route
            path="/host"
            element={
              <ProtectedRoute>
                <HostDashboard/>
              </ProtectedRoute>
            }
          />

          {/* 👇 AQUÍ va el wizard, envuelto por HostNewProvider y usando <Outlet/> */}
          <Route
            path="/host/listings/new"
            element={
              <ProtectedRoute>
                <HostNewProvider>
                  <Outlet />
                </HostNewProvider>
              </ProtectedRoute>
            }
          >
            <Route index element={<StepType />} />
            <Route path="address" element={<StepAddress />} />
            <Route path="basics" element={<StepBasics />} />
            <Route path="details" element={<StepDetails />} />
            <Route path="photos" element={<StepPhotos />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Chrome>
    </BrowserRouter>
  );
}
