import oracledb from "oracledb";
import { withConn } from "../../config/oracle.js";
import {
    SQL_TIPOS_USUARIO,
    SQL_ESTADOS_RESERVA,
    SQL_ESTADOS_PAGO,
    SQL_METODOS_PAGO,
    SQL_TIPOS_ALOJAMIENTO,
    SQL_AMENIDADES,
    SQL_SERVICIOS,
} from "./catalogs.sql.js";

const exec = (sql) =>
    withConn(async (c) => (await c.execute(sql, [], { outFormat: oracledb.OBJECT })).rows);

export const catalogsRepo = {
    tiposUsuario: () => exec(SQL_TIPOS_USUARIO),
    estadosReserva: () => exec(SQL_ESTADOS_RESERVA),
    estadosPago: () => exec(SQL_ESTADOS_PAGO),
    metodosPago: () => exec(SQL_METODOS_PAGO),
    tiposAlojamiento: () => exec(SQL_TIPOS_ALOJAMIENTO),
    amenidades: () => exec(SQL_AMENIDADES),
    servicios: () => exec(SQL_SERVICIOS),
};
