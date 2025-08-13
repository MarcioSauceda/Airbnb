import { listUsers, registerUser, verifyLogin } from "./users.service.js";
import jwt from "jsonwebtoken";
import { env } from "../../config/env.js";

export async function getUsers(req, res, next) {
  try { res.json(await listUsers()); }
  catch (e) { next(e); }
}

export async function postRegister(req, res, next) {
  try {
    await registerUser(req.body);
    res.status(201).json({ message: "Usuario registrado" });
  } catch (e) { next(e); }
}

export async function postLogin(req, res, next) {
  try {
    const auth = await verifyLogin(req.body);
    if (!auth) return res.status(401).json({ message: "Credenciales inválidas" });
    const token = jwt.sign({ sub: auth.id }, env.jwtSecret, { expiresIn: "7d" });
    res.json({ token });
  } catch (e) { next(e); }
}
