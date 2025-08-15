import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HostNewLayout from "./HostNewLayout";
import { useHostNew } from "../../../context/HostNewContext";

const COUNTRIES = [
  { code: "HN", name: "Honduras - HN" },
  { code: "SV", name: "El Salvador - SV" },
  { code: "GT", name: "Guatemala - GT" },
  { code: "NI", name: "Nicaragua - NI" },
  { code: "CR", name: "Costa Rica - CR" },
  { code: "PA", name: "Panamá - PA" },
];

export default function StepAddress() {
  // 👇 Los hooks SIEMPRE dentro del componente
  const { draft, setField, reset } = useHostNew();
  const navigate = useNavigate();

  // Guard: no saltarse el paso 1
  useEffect(() => {
    if (!draft.id_tipo_alojamiento) {
      navigate("/host/listings/new", { replace: true });
    }
  }, [draft.id_tipo_alojamiento, navigate]);

  const next = () => navigate("/host/listings/new/basics");

  return (
    <HostNewLayout
      title="Confirma tu dirección"
      onSaveExit={() => { reset(); navigate("/host"); }}
      progress={50}
    >
      <p className="text-gray-600">Solo compartiremos la dirección con los huéspedes después de que hayan hecho la reservación.</p>

      <div className="mt-6 space-y-3 max-w-2xl">
        <select
          className="w-full rounded-2xl border px-3 py-3"
          value={draft.country}
          onChange={e => setField("country", e.target.value)}
        >
          {COUNTRIES.map(c => <option key={c.code} value={c.code}>{c.name}</option>)}
        </select>

        <input className="w-full rounded-2xl border px-3 py-3" placeholder="Dirección"
               value={draft.address1} onChange={e => setField("address1", e.target.value)} />
        <input className="w-full rounded-2xl border px-3 py-3" placeholder="Departamento, piso, edificio"
               value={draft.address2} onChange={e => setField("address2", e.target.value)} />
        <input className="w-full rounded-2xl border px-3 py-3" placeholder="Ciudad / municipio"
               value={draft.city} onChange={e => setField("city", e.target.value)} />
        <input className="w-full rounded-2xl border px-3 py-3" placeholder="Provincia / estado"
               value={draft.state} onChange={e => setField("state", e.target.value)} />
        <input className="w-full rounded-2xl border px-3 py-3" placeholder="Código postal"
               value={draft.postalCode} onChange={e => setField("postalCode", e.target.value)} />
      </div>

      <div className="fixed inset-x-0 bottom-0 border-t bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
          <button onClick={() => history.back()} className="text-sm underline">Atrás</button>
          <button onClick={next} className="rounded-full bg-black px-5 py-2 text-sm text-white">
            Siguiente
          </button>
        </div>
      </div>
    </HostNewLayout>
  );
}
