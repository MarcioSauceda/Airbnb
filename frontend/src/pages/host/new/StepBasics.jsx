import { useNavigate } from "react-router-dom";
import HostNewLayout from "./HostNewLayout";
import { useHostNew } from "../../../context/HostNewContext";
import { useEffect } from "react";


function RowCounter({ label, value, onDec, onInc }) {
  return (
    <div className="flex items-center justify-between py-4 border-b">
      <div className="text-lg">{label}</div>
      <div className="flex items-center gap-4">
        <button onClick={onDec} className="h-8 w-8 rounded-full border text-xl leading-8">−</button>
        <div className="w-6 text-center">{value}</div>
        <button onClick={onInc} className="h-8 w-8 rounded-full border text-xl leading-8">+</button>
      </div>
    </div>
  );
}

export default function StepBasics() {

  const { draft, setField, reset } = useHostNew();
  const navigate = useNavigate();

  // Guard: no saltarse el paso 1
  useEffect(() => {
    if (!draft.id_tipo_alojamiento) {
      navigate("/host/listings/new", { replace: true });
    }
  }, [draft.id_tipo_alojamiento, navigate]);

  const next = () => { navigate("/host/listings/new/details"); };

  return (
    <HostNewLayout
      title="Agrega algunos datos básicos de tu espacio"
      onSaveExit={() => { reset(); navigate("/host"); }}
      progress={75}
    >
      <p className="text-gray-600 max-w-2xl">
        Más adelante, podrás incluir otros detalles, como los tipos de camas.
      </p>

      <div className="mt-8 max-w-xl">
        <RowCounter
          label="Huéspedes"
          value={draft.huespedes}
          onDec={() => dec("huespedes")}
          onInc={() => inc("huespedes")}
        />
        <RowCounter
          label="Recámaras"
          value={draft.recamaras}
          onDec={() => dec("recamaras")}
          onInc={() => inc("recamaras")}
        />
        <RowCounter
          label="Camas"
          value={draft.camas}
          onDec={() => dec("camas")}
          onInc={() => inc("camas")}
        />
        <RowCounter
          label="Baños"
          value={draft.banos}
          onDec={() => dec("banos")}
          onInc={() => inc("banos")}
        />
      </div>

      <div className="fixed inset-x-0 bottom-0 border-t bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
          <button onClick={() => history.back()} className="text-sm underline">Atrás</button>
          <button
            onClick={next}
            className="rounded-full bg-black px-5 py-2 text-sm text-white"
          >
            Siguiente
          </button>
        </div>
      </div>
    </HostNewLayout>
  );
}
