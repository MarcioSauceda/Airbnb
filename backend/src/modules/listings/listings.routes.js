import { Router } from "express";
//import { getListings } from "./listings.controller.js";
import { list, detail, create, addImages } from "./listings.controller.js";
import { requireAuth } from "../../middlewares/requireAuth.js";
import { upload } from "../../middlewares/upload.js";

const router = Router();
//router.get("/", getListings);  
router.get("/", list);
router.get("/:id", detail);
router.post("/", requireAuth, create); 
router.post("/:id/images", requireAuth, upload.array("images", 10), addImages);
export default router;
