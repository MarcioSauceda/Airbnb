import { useState, useMemo } from "react";
import { createReservation, listingReservations } from "../api/reservations";

export default function BookingCard({ listing, token, onBooked }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [loading, setLoading] = useState(false);
  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0;
    const a = new Date(checkIn), b = new Date(checkOut);
    return Math.max(0, Math.round((b - a) / (1000*60*60*24)));
  }, [checkIn, checkOut]);

  const total = useMemo(() => {
    const precio = listing?.precio_fijo || 0;
    return nights * precio;
  }, [nights, listing]);

  async function reserve() {
    try {
      setLoading(true);
      await createReservation(token, {
        id_alojamiento: listing.id,
        fecha_inicio: checkIn,
        fecha_fin: checkOut
      });
      onBooked?.();
      alert("Reserva creada");
    } catch (e) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border p-4 shadow-sm w-full max-w-md">
      <div className="text-xl font-semibold mb-2">{listing?.titulo}</div>
      <div className="flex gap-2">
        <div className="flex-1">
          <label className="text-sm">Llegada</label>
          <input className="w-full border rounded-lg p-2" type="date" value={checkIn} onChange={e=>setCheckIn(e.target.value)} />
        </div>
        <div className="flex-1">
          <label className="text-sm">Salida</label>
          <input className="w-full border rounded-lg p-2" type="date" value={checkOut} onChange={e=>setCheckOut(e.target.value)} />
        </div>
      </div>
      <div className="mt-3 text-sm text-gray-600">Noches: {nights}</div>
      <div className="mt-1 text-lg font-medium">Total: {total.toLocaleString()}</div>
      <button
        className="mt-3 w-full rounded-xl bg-black text-white py-2 disabled:opacity-50"
        onClick={reserve}
        disabled={loading || nights <= 0 || !token}
      >
        {loading ? "Reservando..." : "Reservar"}
      </button>
      {!token && <div className="text-xs text-red-500 mt-2">Inicia sesión para reservar.</div>}
    </div>
  );
}
