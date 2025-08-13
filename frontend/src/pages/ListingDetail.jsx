import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { listingsApi } from "../api/listings";

export default function ListingDetail() {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [status, setStatus] = useState("loading");

useEffect(() => {
    let mounted = true;
    (async () => {
        setStatus("loading");
        try {
            const d = await listingsApi.detail(id);
            if (mounted) setData(d);
            setStatus("idle");
        } catch (e) {
        console.error(e);
        setStatus("error");
        }
    })();
    return () => { mounted = false; };
}, [id]);

if (status === "loading") return <div className="p-4 text-sm text-gray-500">Cargando…</div>;
if (status === "error") return <div className="p-4 text-sm text-red-600">Error al cargar.</div>;
if (!data) return <div className="p-4 text-sm text-gray-500">No encontrado.</div>;

return (
    <main className="mx-auto max-w-4xl p-4">
    <h1 className="text-2xl font-bold">{data.titulo}</h1>
    <p className="mt-2 text-gray-700">{data.descripcion}</p>
    <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
        {(data.images || []).map(img => (
            <div key={img.id_imagen} className="aspect-[4/3] w-full rounded-xl bg-gray-100 overflow-hidden">
            {/* <img src={img.url_imagen} alt={img.descripcion} className="h-full w-full object-cover" /> */}
            </div>
        ))}
    </div>
    <div className="mt-6 rounded-xl border p-4">
        <div className="text-lg font-semibold">
            {data.precio_fijo != null ? `$${data.precio_fijo}` : "—"} / noche
        </div>
        {/* Más adelante acá va el selector de fechas y botón Reservar */}
    </div>
    </main>
);
}
