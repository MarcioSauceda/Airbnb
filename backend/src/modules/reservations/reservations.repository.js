import oracledb from "oracledb";
import { withConn } from "../../config/oracle.js";
import { SQL_CHECK_OVERLAP, SQL_INSERT_RESERVA, SQL_LIST_BY_USER, SQL_LIST_BY_LISTING } from "./reservations.sql.js";

let META = null;
async function ensureMeta() {
  if (META) return META;
  return withConn(async (c) => {
    const cols = await c.execute(
      `SELECT UPPER(column_name) AS COL FROM user_tab_columns WHERE table_name = 'RESERVA'`,
      [], { outFormat: oracledb.OBJECT }
    );
    const names = new Set(cols.rows.map(r => r.COL));

    const idCol = names.has("ID_RESERVA") ? "id_reserva" : null;
    const userCol = names.has("ID_USUARIO") ? "id_usuario"
                  : names.has("ID_HUESPED") ? "id_huesped"
                  : null;

    if (!userCol) throw new Error("No se encontró columna de usuario en RESERVA (esperado ID_USUARIO o ID_HUESPED)");
    const useReturning = !!idCol;

    META = { idCol, userCol, useReturning };
    return META;
  });
}

export async function hasOverlap({ id_alojamiento, fecha_inicio, fecha_fin }) {
  const meta = await ensureMeta();
  const sql = SQL_CHECK_OVERLAP(meta);
  const r = await withConn(c => c.execute(sql,
    { id_alojamiento, fecha_inicio, fecha_fin },
    { outFormat: oracledb.OBJECT }
  ));
  return (r.rows[0]?.N ?? 0) > 0;
}

export async function insertReserva({ id_usuario, id_alojamiento, fecha_inicio, fecha_fin, codigo_estado_reserva }) {
  const meta = await ensureMeta();
  const sql = SQL_INSERT_RESERVA(meta);

  const binds = {
    [meta.userCol]: id_usuario, // id_usuario o id_huesped
    id_alojamiento,
    fecha_inicio,
    fecha_fin,
    codigo_estado_reserva,
  };

  if (meta.useReturning) {
    binds.out_id = { dir: oracledb.BIND_OUT, type: oracledb.NUMBER };
  }

  const r = await withConn(c => c.execute(sql, binds));
  return meta.useReturning ? r.outBinds.out_id[0] : true;
}

export async function listMyReservations(id_usuario) {
  const meta = await ensureMeta();
  const sql = SQL_LIST_BY_USER(meta);
  const r = await withConn(c => c.execute(sql, { id_usuario }, { outFormat: oracledb.OBJECT }));
  return r.rows;
}

export async function listByListing(id_alojamiento) {
  const r = await withConn(c => c.execute(SQL_LIST_BY_LISTING, { id_alojamiento }, { outFormat: oracledb.OBJECT }));
  return r.rows;
}
