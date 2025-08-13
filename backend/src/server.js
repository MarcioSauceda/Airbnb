import app from "./app.js";
import { initOracle } from "./config/oracle.js";
import { env } from "./config/env.js";

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

/*import express from "express";

const app = express();
app.get("/", (req, res) => res.send("Servidor funcionando 🚀"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
});*/

