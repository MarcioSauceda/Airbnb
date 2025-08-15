import app from "./app.js";
import path from "path";
import express from "express"

import { initOracle } from "./config/oracle.js";
import { env } from "./config/env.js";

app.use("/uploads", express.static(path.resolve("uploads")));

const start = async () => {
    try {
        await initOracle();
        app.listen(env.port, () =>
            console.log(`API escuchando en http://localhost:${env.port}`)
        );
    } catch (err) {
    console.error("Fallo al iniciar:", err);
    process.exit(1);
    }
};

start();


