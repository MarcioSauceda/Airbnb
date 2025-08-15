import { listAll } from "./listings.repository.js";
import { getAllListings, getListingDetail, createListing, addListingImages } from "./listings.service.js";

export async function getListings(req, res, next) {
  try { res.json(await listAll()); }
  catch (e) { next(e); }
}

export async function list(_req, res, next) {
  try { res.json(await getAllListings()); }
  catch (e) { next(e); }
}

export async function detail(req, res, next) {
  try { res.json(await getListingDetail(Number(req.params.id))); }
  catch (e) { next(e); }
}

export async function create(req, res, next) {
  try {
    const id = await createListing(req.user, req.body);
    res.status(201).json({ ok: true, id });
  } catch (e) { next(e); }
}

export async function addImages(req, res, next) {
  try {
    const { id } = req.params;
    const files = req.files || [];
    const out = await addListingImages(Number(id), files);
    res.status(201).json(out); // { ok:true, inserted:n, images:[{id,url}] }
  } catch (e) { next(e); }
}