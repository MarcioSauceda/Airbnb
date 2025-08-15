import { useState } from "react";
import { Link } from "react-router-dom";

function Tab({ active, children, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`relative pb-2 text-sm font-medium ${
        active ? "text-gray-900" : "text-gray-600 hover:text-gray-900"
      }`}
    >
      {children}
      {active && (
        <span className="absolute inset-x-0 -bottom-[9px] mx-auto h-[3px] w-8 rounded-full bg-gray-900" />
      )}
    </button>
  );
}

export default function HostDashboard() {
  const [tab, setTab] = useState("hoy");
  const [seg, setSeg] = useState("hoy");

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      {/* Tabs superiores */}
      <div className="flex items-center justify-center gap-10">
        <Tab active={tab === "hoy"} onClick={() => setTab("hoy")}>Hoy</Tab>
        <Tab active={tab === "cal"} onClick={() => setTab("cal")}>Calendario</Tab>
        <Tab active={tab === "ads"} onClick={() => setTab("ads")}>Anuncios</Tab>
        <Tab active={tab === "msg"} onClick={() => setTab("msg")}>Mensajes</Tab>
      </div>

      {tab === "hoy" && (
        <>
          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              onClick={() => setSeg("hoy")}
              className={`px-5 py-2 rounded-full text-sm font-medium ${
                seg === "hoy" ? "bg-gray-900 text-white" : "bg-gray-100"
              }`}
            >
              Hoy
            </button>
            <button
              onClick={() => setSeg("prox")}
              className={`px-5 py-2 rounded-full text-sm font-medium ${
                seg === "prox" ? "bg-gray-900 text-white" : "bg-gray-100"
              }`}
            >
              Próximas
            </button>
          </div>

          {/* Empty state */}
          <div className="mt-16 flex flex-col items-center">
            <div className="w-44 h-44 opacity-80">
              <svg viewBox="0 0 256 256" className="w-full h-full">
                <rect x="32" y="64" width="192" height="128" rx="12" fill="#f3f4f6" />
                <rect x="48" y="80" width="160" height="96" rx="8" fill="#e5e7eb" />
                <path d="M64 96h64M64 120h96M64 144h112" stroke="#9ca3af" strokeWidth="8" strokeLinecap="round"/>
              </svg>
            </div>
            <h2 className="mt-6 text-3xl font-semibold text-center leading-tight">
              No tienes<br/>ninguna reservación
            </h2>
          </div>
        </>
      )}

      {tab === "ads" && (
        <div className="mt-10">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Tus anuncios</h2>
            <Link
              to="/host/listings/new"
              className="rounded-full bg-black px-4 py-2 text-sm text-white hover:opacity-90"
            >
              Crear anuncio
            </Link>
          </div>
          {/* Aquí luego listaremos anuncios del anfitrión */}
          <div className="mt-14 text-center text-gray-500">
            Aún no tienes anuncios publicados.
          </div>
        </div>
      )}

      {tab === "cal" && (
        <div className="mt-10 text-center text-gray-500">Calendario (próximamente)</div>
      )}
      {tab === "msg" && (
        <div className="mt-10 text-center text-gray-500">Mensajes (próximamente)</div>
      )}
    </div>
  );
}
