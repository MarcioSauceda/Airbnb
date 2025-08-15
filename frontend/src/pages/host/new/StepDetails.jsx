import { useNavigate } from "react-router-dom";
import HostNewLayout from "./HostNewLayout";
import { useHostNew } from "../../../context/HostNewContext";
import { useAuth } from "../../../context/AuthContext";
import { createListing } from "../../../api/listings";

export default function StepDetails() {
  const { draft, setField, reset } = useHostNew();
  const { token } = useAuth();
  const navigate = useNavigate();

  async function continueToPhotos() {
    // Ensamblar payload para el backend
    const payload = {
       id_tipo_alojamiento: Number(draft.id_tipo_alojamiento),
       titulo: draft.titulo?.trim(),
       descripcion: draft.descripcion?.trim(),
       num_habitaciones: Number(draft.recamaras || 0),
       num_camas: Number(draft.camas || 0),
       num_banos: Number(draft.banos || 0),
       precio_fijo: Number(draft.precio_fijo || 0),
       address: {
         country: draft.country, address1: draft.address1, address2: draft.address2,
         city: draft.city, state: draft.state, postalCode: draft.postalCode,
       },
     };

    const res = await createListing(token, payload);
    setField("listingId", res.id);
    navigate("/host/listings/new/photos");
  }

  const disabled =
    !draft.titulo?.trim() ||
    !draft.descripcion?.trim() ||
    !draft.precio_fijo ||
    Number(draft.precio_fijo) <= 0;

  return (
    <HostNewLayout
      title="Agrega el título, la descripción y el precio"
      onSaveExit={() => { reset(); navigate("/host"); }}
      progress={100}
    >
      <div className="grid gap-4 max-w-2xl mt-6">
        <div>
          <label className="text-sm text-gray-600">Título</label>
          <input
            className="w-full rounded-2xl border px-3 py-3 mt-1"
            placeholder="Acogedor apartamento en el centro"
            value={draft.titulo}
            onChange={(e) => setField("titulo", e.target.value)}
          />
        </div>
        <div>
          <label className="text-sm text-gray-600">Descripción</label>
          <textarea
            className="w-full rounded-2xl border px-3 py-3 mt-1 min-h-[120px]"
            placeholder="Describe lo que hace especial tu espacio…"
            value={draft.descripcion}
            onChange={(e) => setField("descripcion", e.target.value)}
          />
        </div>
        <div className="max-w-xs">
          <label className="text-sm text-gray-600">Precio por noche</label>
          <div className="relative mt-1">
            <span className="absolute left-3 top-[10px] text-gray-500">L</span>
            <input
              type="number"
              min={0}
              className="w-full rounded-2xl border pl-7 pr-3 py-3"
              placeholder="0"
              value={draft.precio_fijo}
              onChange={(e) => setField("precio_fijo", e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 border-t bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
          <button onClick={() => history.back()} className="text-sm underline">Atrás</button>
          <button
            onClick={continueToPhotos}
            disabled={disabled}
            className="rounded-full bg-black px-5 py-2 text-sm text-white disabled:opacity-40"
          >
            Continuar con fotos
          </button>
        </div>
      </div>
    </HostNewLayout>
  );
}
