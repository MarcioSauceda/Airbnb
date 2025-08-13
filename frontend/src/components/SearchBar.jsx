import { Search } from "lucide-react";
import { useState } from "react";

export default function SearchBar({ onSubmit }) {
  const [form, setForm] = useState({
    destino: "",
    llegada: "",
    salida: "",
    huespedes: "",
  });

  const update = (k, v) => setForm(s => ({ ...s, [k]: v }));

  return (
    <div className="w-full">
    <div className="flex flex-wrap items-center gap-2 rounded-full border bg-white p-2 shadow-sm">
        <div className="flex-1 rounded-full px-4 py-2 hover:bg-gray-50">
          <label className="block text-[11px] font-semibold uppercase tracking-wide text-gray-500">Destino</label>
          <input
            value={form.destino}
            onChange={(e)=>update("destino", e.target.value)}
            placeholder="Buscar destinos"
            className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
          />
        </div>
        <div className="hidden sm:block h-8 w-px bg-gray-200" />
        <div className="hidden sm:block rounded-full px-4 py-2 hover:bg-gray-50">
          <label className="block text-[11px] font-semibold uppercase tracking-wide text-gray-500">Llegada</label>
          <input
            type="date"
            value={form.llegada}
            onChange={(e)=>update("llegada", e.target.value)}
            className="bg-transparent text-sm outline-none"
          />
        </div>
        <div className="hidden sm:block h-8 w-px bg-gray-200" />
        <div className="hidden sm:block rounded-full px-4 py-2 hover:bg-gray-50">
          <label className="block text-[11px] font-semibold uppercase tracking-wide text-gray-500">Salida</label>
          <input
            type="date"
            value={form.salida}
            onChange={(e)=>update("salida", e.target.value)}
            className="bg-transparent text-sm outline-none"
          />
        </div>
        <div className="hidden sm:block h-8 w-px bg-gray-200" />
        <div className="rounded-full px-4 py-2 hover:bg-gray-50">
          <label className="block text-[11px] font-semibold uppercase tracking-wide text-gray-500">Huéspedes</label>
          <input
            value={form.huespedes}
            onChange={(e)=>update("huespedes", e.target.value)}
            placeholder="¿Cuántos?"
            className="w-24 bg-transparent text-sm outline-none placeholder:text-gray-400"
          />
        </div>
        <button
          onClick={() => onSubmit?.(form)}
          className="ml-1 inline-flex items-center gap-2 rounded-full bg-rose-500 px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
        >
          <Search size={16} />
          Buscar
        </button>
      </div>
    </div>
  );
}
