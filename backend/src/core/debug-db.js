import oracledb from "oracledb";
import { withConn } from "../config/oracle.js";

export async function whoami(_req, res, next) {
  try {
    const r = await withConn(c =>
      c.execute(
        "select user as USERNAME, sys_context('USERENV','CON_NAME') as PDB from dual",
        [], { outFormat: oracledb.OBJECT }
      )
    );
    res.json(r.rows[0]);
  } catch (e) { next(e); }
}

export async function probeCatalogs(_req, res) {
  const tables = [
    "TIPO_USUARIO",
    "ESTADO_RESERVA",
    "TBL_ESTADO_PAGO",
    "TBL_METODO_PAGO",
    "TBL_TIPO_ALOJAMIENTO",
    "TBL_AMENIDADES",
    "TBL_SERVICIOS",
  ];
  const out = [];
  for (const t of tables) {
    try {
      const r = await withConn(c =>
        c.execute(`select count(*) as N from AIRBNB2.${t}`, [], { outFormat: oracledb.OBJECT })
      );
      out.push({ table: t, ok: true, count: r.rows[0].N });
    } catch (e) {
      out.push({ table: t, ok: false, error: e.message });
    }
  }
  res.json(out);
}

export async function listUserTables(_req, res, next) {
  try {
    const r = await withConn(c =>
      c.execute(`select table_name from user_tables order by table_name`,
        [], { outFormat: oracledb.OBJECT })
    );
    res.json(r.rows);
  } catch (e) { next(e); }
}

export async function findOwners(_req, res, next) {
  const wanted = [
    'TIPO_USUARIO','ESTADO_RESERVA','TBL_ESTADO_PAGO',
    'TBL_METODO_PAGO','TBL_TIPO_ALOJAMIENTO','TBL_AMENIDADES','TBL_SERVICIOS',
    'TBL_ALOJAMIENTO','TBL_PRECIOS','TBL_USUARIOS'
  ];
  try {
    const r = await withConn(c =>
      c.execute(
        `select owner, table_name
            from all_tables
          where upper(table_name) in (${wanted.map((_,i)=>`:t${i}`).join(',')})
          order by owner, table_name`,
        Object.fromEntries(wanted.map((n,i)=>[`t${i}`, n])),
        { outFormat: oracledb.OBJECT }
      )
    );
    res.json(r.rows);
  } catch (e) { next(e); }
}

export async function probeOwn(_req, res, next) {
  const sqls = [
    ["TBL_USUARIOS",      "select count(*) N from TBL_USUARIOS"],
    ["TBL_ALOJAMIENTO",   "select count(*) N from TBL_ALOJAMIENTO"],
    ["TBL_PRECIOS",       "select count(*) N from TBL_PRECIOS"],
    ["TIPO_USUARIO",      "select count(*) N from TIPO_USUARIO"],
  ];
  try {
    const out = [];
    for (const [name, q] of sqls) {
      try {
        const r = await withConn(c => c.execute(q, [], { outFormat: oracledb.OBJECT }));
        out.push({ table: name, ok: true, count: r.rows[0].N });
      } catch (e) {
        out.push({ table: name, ok: false, err: e.message });
      }
    }
    res.json(out);
  } catch (e) { next(e); }
}
