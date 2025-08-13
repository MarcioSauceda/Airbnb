import { Router } from "express";
import { getListings } from "./listings.controller.js";

const r = Router();
r.get("/", getListings);   // GET /api/listings
export default r;
