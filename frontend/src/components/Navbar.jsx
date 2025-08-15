import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Globe, Menu } from "lucide-react";

export default function Navbar() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const inHostArea = location.pathname.startsWith("/host");

  return (
    <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur">
      <div className="container flex items-center justify-between py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-rose-500" />
          <span className="text-xl font-semibold tracking-tight">airbnb</span>
        </Link>

        {/* Tabs centro */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link to="/" className="relative pb-2 font-medium text-gray-900">
            Alojamientos
            <span className="absolute inset-x-0 -bottom-[9px] mx-auto h-[3px] w-8 rounded-full bg-gray-900" />
          </Link>
          <button className="text-gray-600 hover:text-gray-900">Experiencias</button>
          <button className="text-gray-600 hover:text-gray-900">Servicios</button>
        </nav>

        {/* Acciones derecha */}
        <div className="flex items-center gap-2">
          {/* Host toggle */}
          <Link
            to={inHostArea ? "/" : "/host"}
            className="hidden sm:block rounded-full px-3 py-2 text-sm hover:bg-gray-100"
          >
            {inHostArea ? "Usar como huésped" : "Conviértete en anfitrión"}
          </Link>

          {/* (opcional) Mis viajes cuando está logueado */}
          {token && (
            <Link to="/trips" className="hidden sm:block rounded-full px-3 py-2 text-sm hover:bg-gray-100">
              Mis viajes
            </Link>
          )}

          <button className="rounded-full p-2 hover:bg-gray-100" title="Idioma">
            <Globe size={18} />
          </button>

          {token ? (
            <button
              onClick={() => { logout(); navigate("/"); }}
              className="rounded-full border px-3 py-2 text-sm hover:bg-gray-50"
            >
              Cerrar sesión
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="rounded-full border px-3 py-2 text-sm hover:bg-gray-50">
                Ingresar
              </Link>
              <Link
                to="/register"
                className="hidden sm:block rounded-full bg-black px-3 py-2 text-sm text-white hover:opacity-90"
              >
                Crear cuenta
              </Link>
            </div>
          )}

          <button className="ml-1 rounded-full border p-2 hover:bg-gray-50" title="Menú">
            <Menu size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
