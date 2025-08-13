import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

export default function ListingCard({ item }) {
  const img = (item.images?.[0]?.url_imagen) || "https://picsum.photos/600/400?blur=2";

  return (
    <div className="group relative w-64 sm:w-72 shrink-0 rounded-2xl border bg-white shadow-sm hover:shadow-md">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-2xl bg-gray-100">
        <img src={img} alt={item.titulo} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
        <button className="absolute right-2 top-2 rounded-full bg-white/90 p-2 shadow">
          <Heart size={16} className="text-gray-800" />
        </button>
        <div className="absolute left-2 top-2 rounded-full bg-white/90 px-2 py-1 text-[11px] font-semibold">
          Favorito entre huéspedes
        </div>
      </div>

      <div className="space-y-1 p-3">
        <h3 className="line-clamp-1 text-[15px] font-semibold">{item.titulo || "Alojamiento"}</h3>
        <p className="line-clamp-2 text-sm text-gray-600">{item.descripcion || "Descripción no disponible."}</p>
        <div className="pt-1 text-sm">
          <span className="font-medium">
            {item.precio_fijo != null ? `L${item.precio_fijo}` : "—"}
          </span>
          <span className="text-gray-500"> por 2 noches</span>
        </div>
        <Link
          to={`/listing/${item.id}`}
          className="mt-1 inline-block rounded-lg bg-black px-3 py-1.5 text-sm text-white hover:opacity-90"
        >
          Ver
        </Link>
      </div>
    </div>
  );
}
