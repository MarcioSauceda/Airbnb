import { useEffect, useState } from "react";
import { listingsApi } from "../api/listings";
import ListingCard from "../components/ListingCard";
import SearchBar from "../components/SearchBar";
import ListingCarousel from "../components/ListingCarousel";

export default function Home() {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    let mounted = true;
    (async () => {
      setStatus("loading");
      try {
        const data = await listingsApi.list();
        if (mounted) setItems(Array.isArray(data) ? data : []);
        setStatus("idle");
      } catch (e) {
        console.error(e);
        setStatus("error");
      }
    })();
    return () => { mounted = false; };
  }, []);

  const populares = items.slice(0, 10);
  const disponibles = items.slice(10, 20);

  return (
    <main className="min-h-screen bg-gradient-to-b from-rose-50/40 to-white">
      {/* Hero + Barra de búsqueda */}
      <section className="container pb-4 pt-6">
        <div className="mb-6">
          <SearchBar onSubmit={(f) => console.log("buscar:", f)} />
        </div>

        {status === "loading" && <p className="text-sm text-gray-500">Cargando…</p>}
        {status === "error" && <p className="text-sm text-red-600">No se pudo cargar.</p>}
      </section>

      {/* Sección 1 */}
      <section className="container">
        <h2 className="mb-3 text-xl font-bold">Alojamientos populares en ...</h2>
        <ListingCarousel>
          {populares.map((it) => <ListingCard key={it.id} item={it} />)}
        </ListingCarousel>
        {!populares.length && status === "idle" && (
          <p className="mt-4 text-sm text-gray-500">No hay alojamientos aún.</p>
        )}
      </section>

      {/* Sección 2 */}
      <section className="container pt-6">
        <h2 className="mb-3 text-xl font-bold">Disponibles el próximo fin de semana</h2>
        <ListingCarousel>
          {disponibles.map((it) => <ListingCard key={it.id} item={it} />)}
        </ListingCarousel>
      </section>
    </main>
  );
}
