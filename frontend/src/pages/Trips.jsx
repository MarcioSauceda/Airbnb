// src/pages/Trips.jsx
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { myReservations } from "../api/reservations";

export default function Trips() {
  const { token } = useAuth();
  const [rows, setRows] = useState([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await myReservations(token);
        if (mounted) setRows(data);
      } catch (e) {
        if (mounted) setErr(e.message || "Error");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [token]);

  if (loading) return <div className="p-6">Cargando…</div>;
  if (err) return <div className="p-6 text-red-600">{err}</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Mis viajes</h1>
      {rows.length === 0 && <div>No tienes reservas todavía.</div>}
      <div className="grid md:grid-cols-2 gap-4">
        {rows.map((r, i) => (
          <div key={i} className="rounded-2xl border p-4">
            <div className="font-medium">{r.TITULO}</div>
            <div className="text-sm text-gray-600">
              {new Date(r.FECHA_INICIO).toLocaleDateString()} –{" "}
              {new Date(r.FECHA_FIN).toLocaleDateString()}
            </div>
            {r.PRECIO_FIJO != null && (
              <div className="text-sm mt-1">
                Precio: {Number(r.PRECIO_FIJO).toLocaleString()}
              </div>
            )}
            <div className="text-sm">Estado: {r.ESTADO}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
