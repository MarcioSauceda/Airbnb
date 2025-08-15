import { z } from "zod";
import * as repo from "./listings.repository.js";

const createSchema = z.object({
  id_tipo_alojamiento: z.coerce.number().int().positive(),
  titulo: z.string().min(4),
  descripcion: z.string().min(10),
  num_habitaciones: z.coerce.number().int().min(0),
  num_camas: z.coerce.number().int().min(0),
  num_banos: z.coerce.number().int().min(0),
  precio_fijo: z.coerce.number().min(0),
  address: z.object({
    country: z.string().optional(),
    address1: z.string().optional(),
    address2: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    postalCode: z.string().optional(),
  }).optional(),
  amenidades: z.array(z.coerce.number().int().positive()).optional(),
  servicios: z.array(z.coerce.number().int().positive()).optional(),
});

export const getAllListings = () => repo.listAll();
export const getListingDetail = (id) => repo.detailById(id);

export async function createListing(user, body) {
  const data = createSchema.parse(body); // 👈 sin Number(...)
  return repo.createListing(user, data);
}

export async function addListingImages(listingId, files) {
  if (!listingId) throw new Error("listingId requerido");
  if (!files || files.length === 0) return { ok: true, inserted: 0, images: [] };
  return repo.insertListingImages(listingId, files);
}
