import { catalogsRepo } from "./catalogs.repository.js";

export const getTiposUsuario     = (req, res, next) => catalogsRepo.tiposUsuario().then(d=>res.json(d)).catch(next);
export const getEstadosReserva   = (req, res, next) => catalogsRepo.estadosReserva().then(d=>res.json(d)).catch(next);
export const getEstadosPago      = (req, res, next) => catalogsRepo.estadosPago().then(d=>res.json(d)).catch(next);
export const getMetodosPago      = (req, res, next) => catalogsRepo.metodosPago().then(d=>res.json(d)).catch(next);
export const getTiposAlojamiento = (req, res, next) => catalogsRepo.tiposAlojamiento().then(d=>res.json(d)).catch(next);
export const getAmenidades       = (req, res, next) => catalogsRepo.amenidades().then(d=>res.json(d)).catch(next);
export const getServicios        = (req, res, next) => catalogsRepo.servicios().then(d=>res.json(d)).catch(next);

// Combo para bootstrap del front (menos llamadas):
export async function getBootstrap(req, res, next) {
  try {
    const [tiposUsuario, estadosReserva, estadosPago, metodosPago, tiposAlojamiento, amenidades, servicios] =
      await Promise.all([
        catalogsRepo.tiposUsuario(),
        catalogsRepo.estadosReserva(),
        catalogsRepo.estadosPago(),
        catalogsRepo.metodosPago(),
        catalogsRepo.tiposAlojamiento(),
        catalogsRepo.amenidades(),
        catalogsRepo.servicios(),
      ]);
    res.json({ tiposUsuario, estadosReserva, estadosPago, metodosPago, tiposAlojamiento, amenidades, servicios });
  } catch (e) { next(e); }
}
