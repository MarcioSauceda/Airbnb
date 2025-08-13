// backend/src/modules/listings/listings.repository.js
import oracledb from "oracledb";
import { withConn } from "../../config/oracle.js";
import {
  LISTINGS_LIST, LISTING_DETAIL, LISTING_IMAGES,
  LISTING_CREATE, LISTING_ADD_AMENITIES, LISTING_ADD_SERVICES
} from "./listings.sql.js";

export const listAll = () =>
  withConn(async (c) => (await c.execute(LISTINGS_LIST, [], { outFormat: oracledb.OBJECT })).rows);

export const detailById = (id) =>
  withConn(async (c) => {
    const base = await c.execute(LISTING_DETAIL, { id }, { outFormat: oracledb.OBJECT });
    const imgs = await c.execute(LISTING_IMAGES, { id }, { outFormat: oracledb.OBJECT });
    return { ...base.rows[0], images: imgs.rows };
  });

export const createListing = async (payload) =>
  withConn(async (c) => {
    const res = await c.execute(LISTING_CREATE, {
      ...payload,
      out_id: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }
    });
    const id = res.outBinds.out_id[0];

    if (payload.amenidades?.length) {
      await c.executeMany(LISTING_ADD_AMENITIES,
        payload.amenidades.map(aid => ({ id_alojamiento: id, id_amenidad: aid })));
    }
    if (payload.servicios?.length) {
      await c.executeMany(LISTING_ADD_SERVICES,
        payload.servicios.map(sid => ({ id_alojamiento: id, id_servicio: sid })));
    }
    return id;
  });
