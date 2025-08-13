import { z } from "zod";
import bcrypt from "bcryptjs";
import { getAllUsers, insertUser, getAuthByEmail } from "./users.repository.js";

const RegisterDTO = z.object({
  nombre: z.string().min(2),
  apellido: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  codigo_tipo_usuario: z.number().int(),     // 1=anfitrión / 2=huésped (según tu catálogo)
  id_metodo_pago: z.number().int().nullable().optional()
});

export async function listUsers() {
  return getAllUsers();
}

export async function registerUser(payload) {
  const data = RegisterDTO.parse(payload);
  const password_hash = await bcrypt.hash(data.password, 10);

  const newId = await insertUser({
    nombre: data.nombre,
    apellido: data.apellido,
    email: data.email,
    password_hash,
    codigo_tipo_usuario: data.codigo_tipo_usuario,
    id_metodo_pago: data.id_metodo_pago ?? null,
  });

  return { ok: true, id: newId };
}

export async function verifyLogin({ email, password }) {
  const rec = await getAuthByEmail(email);
  if (!rec) return null;
  const ok = await bcrypt.compare(password, rec.PASSWORD_HASH || rec.password_hash);
  return ok ? { id: rec.ID || rec.id } : null;
}
