import { z } from "zod";
import { hasOverlap, insertReserva, listMyReservations, listByListing } from "./reservations.repository.js";

const createSchema = z.object({
  id_alojamiento: z.number().int().positive(),
  fecha_inicio: z.string().date().transform(s => new Date(s)),
  fecha_fin: z.string().date().transform(s => new Date(s)),
  // opcional: # huéspedes si luego lo necesitas
});

export async function createReservation(user, payload) {
  const data = createSchema.parse(payload);
  if (data.fecha_fin <= data.fecha_inicio) {
    throw new Error("La fecha de salida debe ser posterior a la de llegada.");
  }

  const overlap = await hasOverlap({
    id_alojamiento: data.id_alojamiento,
    fecha_inicio: data.fecha_inicio,
    fecha_fin: data.fecha_fin,
  });
  if (overlap) {
    const e = new Error("El alojamiento ya está reservado en ese rango.");
    e.status = 409;
    throw e;
  }

  // 1 = PENDIENTE (según tu catálogo)
  const id = await insertReserva({
    id_usuario: user.id_usuario, // middleware añade id_usuario del JWT
    id_alojamiento: data.id_alojamiento,
    fecha_inicio: data.fecha_inicio,
    fecha_fin: data.fecha_fin,
    codigo_estado_reserva: 1,
  });

  return { ok: true, id };
}

export const reservationsForMe = (user) => listMyReservations(user.id_usuario);
export const reservationsForListing = (id_alojamiento) => listByListing(id_alojamiento);
