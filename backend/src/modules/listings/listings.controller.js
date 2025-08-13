import { listAll } from "./listings.repository.js";

export async function getListings(req, res, next) {
  try { res.json(await listAll()); }
  catch (e) { next(e); }
}
