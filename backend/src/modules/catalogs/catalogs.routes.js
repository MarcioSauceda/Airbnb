import { Router } from "express";
import {
  getTiposUsuario, getEstadosReserva, getEstadosPago, getMetodosPago,
  getTiposAlojamiento, getAmenidades, getServicios, getBootstrap
} from "./catalogs.controller.js";

const r = Router();
r.get("/tipos-usuario", getTiposUsuario);
r.get("/estados-reserva", getEstadosReserva);
r.get("/estados-pago", getEstadosPago);
r.get("/metodos-pago", getMetodosPago);
r.get("/tipos-alojamiento", getTiposAlojamiento);
r.get("/amenidades", getAmenidades);
r.get("/servicios", getServicios);

// Útil para el front:
r.get("/bootstrap", getBootstrap);

export default r;
