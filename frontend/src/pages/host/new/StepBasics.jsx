import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HostNewLayout from "./HostNewLayout";
import { useHostNew } from "../../../context/HostNewContext";

function Counter({ label, value, onDec, onInc }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border p-4">
      <div className="text-sm">
        <div className="font-medium">{label}</div>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onDec}
          className="h-8 w-8 rounded-full border text-lg leading-none"
          aria-label={`Disminuir ${label}`}
        >
          –
        </button>
        <div className="w-8 text-center tabular-nums">{value}</div>
        <button
          type="button"
          onClick={onInc}
          className="h-8 w-8 rounded-full border text-lg leading-none"
          aria-label={`Aumentar ${label}`}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default function StepBasics() {
  // 👇 Asegúrate de DESESTRUCTURAR inc y dec del contexto
  const { draft, setField, inc, dec, reset } = useHostNew();
  const navigate = useNavigate();

  // Guard: no saltarse el paso 1
  useEffect(() => {
    if (!draft.id_tipo_alojamiento) {
      navigate("/host/listings/new", { replace: true });
    }
  }, [draft.id_tipo_alojamiento, navigate]);

  const next = () => navigate("/host/listings/new/details");

  return (
    <HostNewLayout
      title="Agrega algunos datos básicos"
      onSaveExit={() => { reset(); navigate("/host"); }}
      progress={75}
    >
      <div className="mt-6 grid max-w-2xl gap-4">
        <Counter
          label="Huéspedes"
          value={Number(draft.huespedes ?? 0)}
          onDec={() => dec("huespedes")}
          onInc={() => inc("huespedes")}
        />
        <Counter
          label="Recámaras"
          value={Number(draft.recamaras ?? 0)}
          onDec={() => dec("recamaras")}
          onInc={() => inc("recamaras")}
        />
        <Counter
          label="Camas"
          value={Number(draft.camas ?? 0)}
          onDec={() => dec("camas")}
          onInc={() => inc("camas")}
        />
        <Counter
          label="Baños"
          value={Number(draft.banos ?? 0)}
          onDec={() => dec("banos")}
          onInc={() => inc("banos")}
        />
      </div>

      <div className="mt-6 max-w-2xl space-y-3">
        <input
          className="w-full rounded-2xl border px-3 py-3"
          placeholder="Título del anuncio"
          value={draft.titulo}
          onChange={(e) => setField("titulo", e.target.value)}
        />
        <textarea
          className="w-full rounded-2xl border px-3 py-3"
          placeholder="Descripción"
          rows={4}
          value={draft.descripcion}
          onChange={(e) => setField("descripcion", e.target.value)}
        />
        <input
          type="number"
          min={0}
          className="w-full rounded-2xl border px-3 py-3"
          placeholder="Precio por noche (L.)"
          value={draft.precio_fijo}
          onChange={(e) => setField("precio_fijo", e.target.value)}
        />
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
