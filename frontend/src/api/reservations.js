const API = import.meta.env.VITE_API_URL || "http://localhost:4000";

export async function createReservation(token, body) {
  const res = await fetch(`${API}/api/reservations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error((await res.json()).message || "Error al reservar");
  return res.json();
}

export async function myReservations(token) {
  const res = await fetch(`${API}/api/reservations/me`, {
    headers: { "Authorization": `Bearer ${token}` }
  });
  if (!res.ok) throw new Error((await res.json()).message || "Error");
  return res.json();
}

export async function listingReservations(listingId) {
  const res = await fetch(`${API}/api/reservations/by-listing/${listingId}`);
  if (!res.ok) throw new Error("Error");
  return res.json();
}
