import oracledb from "oracledb";
import { withConn } from "../config/oracle.js";

export async function dbHealth(req, res, next) {
    try {
        const r = await withConn((conn) =>
            conn.execute("select 1 as OK from dual", [], { outFormat: oracledb.OBJECT })
        );
    res.json({ db: "ok", value: r.rows?.[0]?.OK ?? null, ts: new Date().toISOString() });
    } catch (e) { next(e); }
}
