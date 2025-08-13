// backend/src/modules/users/users.repository.js
import oracledb from "oracledb";
import { withConn } from "../../config/oracle.js";
import {
  USERS_SELECT_ALL,
  USERS_BY_EMAIL,
  USERS_INSERT_TRIGGER,
} from "./users.sql.js";

export async function getAllUsers() {
  return withConn(async (conn) => {
    const res = await conn.execute(USERS_SELECT_ALL, [], { outFormat: oracledb.OBJECT });
    return res.rows;
  });
}

export async function insertUser({ nombre, apellido, email, password_hash, codigo_tipo_usuario, id_metodo_pago }) {
  return withConn(async (conn) => {
    const useReturning = false; // si usas trigger de ID

    if (useReturning) {
      const res = await conn.execute(
        USERS_INSERT_SEQ_RETURNING,
        {
          nombre, apellido, email,
          contrasena: password_hash,         
          codigo_tipo_usuario,
          id_metodo_pago,
          out_id: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
        }
      );
      return res.outBinds.out_id[0];
    } else {
      await conn.execute(USERS_INSERT_TRIGGER, {
        nombre, apellido, email,
        contrasena: password_hash,          
        codigo_tipo_usuario,
        id_metodo_pago,
      });
      return true;
    }
  });
}


export async function getAuthByEmail(email) {
  return withConn(async (conn) => {
    const res = await conn.execute(USERS_BY_EMAIL, { email }, { outFormat: oracledb.OBJECT });
    return res.rows[0] ?? null;
  });
}
