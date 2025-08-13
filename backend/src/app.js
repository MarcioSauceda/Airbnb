import express from "express";
import cors from "cors";
import morgan from "morgan";
import usersRoutes from "./modules/users/users.routes.js";
import { dbHealth } from "./core/health.js";
// src/app.js
import { whoami, probeCatalogs } from "./core/debug-db.js";
import { listUserTables, findOwners } from "./core/debug-db.js";
import { probeOwn } from "./core/debug-db.js";
import listingsRoutes from "./modules/listings/listings.routes.js";
import catalogsRoutes from "./modules/catalogs/catalogs.routes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/health", (_req, res) => {
    res.json({ ok: true, service: "api", ts: new Date().toISOString() });
});
app.get("/health/db", dbHealth);

app.use("/api/users", usersRoutes);

app.get("/debug/db/whoami", whoami);
app.get("/debug/db/probe-catalogs", probeCatalogs);
app.get("/debug/db/list-tables", listUserTables);
app.get("/debug/db/find-owners", findOwners);
app.get("/debug/db/probe-own", probeOwn);

app.use("/api/listings", listingsRoutes);

app.use("/api/catalogs", catalogsRoutes);

app.use((err, _req, res, _next) => {
    console.error(err);
    const status = err.name === "ZodError" ? 400 : 500;
    res.status(status).json({
        message: err.message || "Server error",
    ...(err.issues ? { issues: err.issues } : {}),
    });
});

export default app;
