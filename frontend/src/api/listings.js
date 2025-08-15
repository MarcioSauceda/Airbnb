// src/api/listings.js
const API = import.meta.env.VITE_API_URL || "http://localhost:4000";

/* ---------- Listados / detalle ---------- */
export async function getListings() {
  const res = await fetch(`${API}/api/listings`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Error al cargar listados");
  return data; // []
}

export async function getListingById(id) {
  const res = await fetch(`${API}/api/listings/${id}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Error al cargar detalle");
  return data; // { ... }
}

/* ---------- Crear anuncio ---------- */
export async function createListing(token, body) {
  const res = await fetch(`${API}/api/listings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Error al crear anuncio");
  return data; // { ok:true, id }
}

/* ---------- Subir imágenes ---------- */
export async function uploadListingImages(token, listingId, files) {
  const fd = new FormData();
  for (const f of files) fd.append("images", f);

  const res = await fetch(`${API}/api/listings/${listingId}/images`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: fd,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Error al subir imágenes");
  return data; // { ok:true, inserted:n, images:[{id,url}] }
}

/* ---------- Facade para compatibilidad con tu Home.jsx ---------- */
export const listingsApi = {
  // alias comunes para que no falle si tu Home usa otro nombre
  list: getListings,
  getAll: getListings,
  detail: getListingById,
  byId: getListingById,
  create: createListing,
  uploadImages: uploadListingImages,
};

// opcional: también lo exponemos como default por si en otro archivo lo importas así
export default listingsApi;
