import oracledb from "oracledb";
import { env } from "./env.js";

let pool;

export async function initOracle() {
  // Thin mode (no Instant Client) en oracledb >= 6
    oracledb.autoCommit = false;
    pool = await oracledb.createPool({
        user: env.oracle.user,
        password: env.oracle.password,
        connectString: env.oracle.connectString,
        poolMin: env.oracle.poolMin,
        poolMax: env.oracle.poolMax,
        poolTimeout: env.oracle.poolTimeout,
    });
    return pool;
}

export function getPool() {
    if (!pool) throw new Error("Oracle pool no inicializado");
    return pool;
}

export async function withConn(fn) {
    const connection = await getPool().getConnection();
    try {
        const result = await fn(connection);
        await connection.commit();
        return result;
    } catch (e) {
        try { await connection.rollback(); } catch {}
        throw e;
    } finally {
        await connection.close();
    }
}
