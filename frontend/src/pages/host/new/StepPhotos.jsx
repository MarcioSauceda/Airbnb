import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HostNewLayout from "./HostNewLayout";
import { useHostNew } from "../../../context/HostNewContext";
import { useAuth } from "../../../context/AuthContext";
import { uploadListingImages } from "../../../api/listings";

export default function StepPhotos() {
  const { draft, reset } = useHostNew();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (!draft.listingId) navigate("/host"); // si no hay anuncio creado
  }, [draft.listingId, navigate]);

  function onPick(e) {
    const f = Array.from(e.target.files || []);
    setFiles((prev) => [...prev, ...f]);
    setPreviews((prev) => [...prev, ...f.map((x) => URL.createObjectURL(x))]);
  }

  async function onUpload() {
    if (!files.length || !draft.listingId) return;
    setLoading(true);
    setErr("");
    try {
      await uploadListingImages(token, draft.listingId, files);
      reset();
      navigate(`/host?created=${draft.listingId}`);
    } catch (e) {
      setErr(e.message || "Error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <HostNewLayout
      title="Agrega fotos de tu alojamiento"
      onSaveExit={() => { reset(); navigate("/host"); }}
      progress={100}
    >
      <div className="max-w-2xl mt-6">
        <p className="text-gray-600 mb-4">
          Sube al menos una imagen. Formatos: JPG, PNG, WebP. Tamaño máx. 10 MB por imagen.
        </p>

        <label className="block rounded-2xl border border-dashed p-8 text-center cursor-pointer hover:bg-gray-50">
          <input type="file" multiple accept="image/*" className="hidden" onChange={onPick} />
          <div className="text-sm text-gray-700">Haz clic para seleccionar imágenes</div>
        </label>

        {previews.length > 0 && (
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {previews.map((src, i) => (
              <div key={i} className="aspect-square overflow-hidden rounded-xl border">
                <img src={src} alt="" className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        )}

        {err && <div className="mt-4 text-red-600 text-sm">{err}</div>}
      </div>

      <div className="fixed inset-x-0 bottom-0 border-t bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
          <button onClick={() => history.back()} className="text-sm underline">Atrás</button>
          <button
            onClick={onUpload}
            disabled={!files.length || loading}
            className="rounded-full bg-black px-5 py-2 text-sm text-white disabled:opacity-40"
          >
            {loading ? "Subiendo…" : "Finalizar"}
          </button>
        </div>
      </div>
    </HostNewLayout>
  );
}
