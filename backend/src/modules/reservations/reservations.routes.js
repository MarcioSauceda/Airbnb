import { Router } from "express";
import { requireAuth } from "../../middlewares/requireAuth.js";
import { postReservation, getMyReservations, getListingReservations } from "./reservations.controller.js";

const router = Router();

router.post("/", requireAuth, postReservation);
router.get("/me", requireAuth, getMyReservations);
router.get("/by-listing/:id", getListingReservations); // público (solo para bloquear calendario)

export default router;
