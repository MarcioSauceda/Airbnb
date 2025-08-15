import { useNavigate } from "react-router-dom";
import HostNewLayout from "./HostNewLayout";
import { useHostNew } from "../../../context/HostNewContext";

function Card({ active, title, desc, icon, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-2xl border p-4 text-left transition ${
        active ? "border-gray-900 bg-gray-50" : "hover:bg-gray-50"
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="text-lg font-semibold">{title}</div>
          <div className="text-sm text-gray-600 mt-1">{desc}</div>
        </div>
        <div className="text-gray-700">{icon}</div>
      </div>
    </button>
  );
}

export default function StepType() {
  const { draft, setField, reset } = useHostNew();
  const navigate = useNavigate();

  const next = () => navigate("/host/listings/new/address");

  return (
    <HostNewLayout
      title="¿Qué tipo de alojamiento ofreces a los huéspedes?"
      onSaveExit={() => { reset(); navigate("/host"); }}
      progress={25}
    >
      <div className="mt-6 space-y-4">
        <Card
          active={draft.id_tipo_alojamiento === 1}
          title="Un alojamiento entero"
          desc="Los huéspedes tienen toda la propiedad para ellos."
          icon={<span className="inline-block w-6 h-6">🏠</span>}
          onClick={() => setField("id_tipo_alojamiento", 1)}
        />
        <Card
          active={draft.id_tipo_alojamiento === 2}
          title="Una habitación"
          desc="Los huéspedes tienen su propia habitación y comparten espacios."
          icon={<span className="inline-block w-6 h-6">🚪</span>}
          onClick={() => setField("id_tipo_alojamiento", 2)}
        />
        <Card
          active={draft.id_tipo_alojamiento === 3}
          title="Una habitación compartida en un hostal"
          desc="Una cama en dormitorio compartido gestionado profesionalmente."
          icon={<span className="inline-block w-6 h-6">👥</span>}
          onClick={() => setField("id_tipo_alojamiento", 3)}
        />
      </div>

      <div className="fixed inset-x-0 bottom-0 border-t bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
          <button onClick={() => history.back()} className="text-sm underline">Atrás</button>
          <button
            onClick={next}
            disabled={!draft.id_tipo_alojamiento}
            className="rounded-full bg-black px-5 py-2 text-sm text-white disabled:opacity-40"
          >
            Siguiente
          </button>
        </div>
      </div>
    </HostNewLayout>
  );
}
