import { Router } from "express";
import { getUsers, postRegister, postLogin } from "./users.controller.js";

const r = Router();
r.get("/", getUsers);
r.post("/register", postRegister);
r.post("/login", postLogin);

export default r;
