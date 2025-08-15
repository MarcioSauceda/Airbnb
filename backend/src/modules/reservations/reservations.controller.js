import { createReservation, reservationsForMe, reservationsForListing } from "./reservations.service.js";

export async function postReservation(req, res, next) {
  try {
    const out = await createReservation(req.user, req.body);
    res.status(201).json(out);
  } catch (e) { next(e); }
}

export async function getMyReservations(req, res, next) {
  try {
    const rows = await reservationsForMe(req.user);
    res.json(rows);
  } catch (e) { next(e); }
}

export async function getListingReservations(req, res, next) {
  try {
    const rows = await reservationsForListing(Number(req.params.id));
    res.json(rows);
  } catch (e) { next(e); }
}
