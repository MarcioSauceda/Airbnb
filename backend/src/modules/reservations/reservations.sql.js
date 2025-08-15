export function SQL_CHECK_OVERLAP({ userCol }) {
  return `
    SELECT COUNT(*) AS N
    FROM RESERVA
    WHERE id_alojamiento = :id_alojamiento
      AND :fecha_inicio < fecha_fin
      AND :fecha_fin    > fecha_inicio
      AND codigo_estado_reserva IN (1,2) -- PENDIENTE o CONFIRMADA
  `;
}

export function SQL_INSERT_RESERVA({ idCol, userCol, useReturning }) {
  // Insert genérico; si hay ID_RESERVA lo retornamos
  const cols = [userCol, "id_alojamiento", "fecha_inicio", "fecha_fin", "codigo_estado_reserva"];
  const binds = [":" + userCol, ":id_alojamiento", ":fecha_inicio", ":fecha_fin", ":codigo_estado_reserva"];

  return useReturning
    ? `
      INSERT INTO RESERVA (${cols.join(",")})
      VALUES (${binds.join(",")})
      RETURNING ${idCol} INTO :out_id
    `
    : `
      INSERT INTO RESERVA (${cols.join(",")})
      VALUES (${binds.join(",")})
    `;
}

export function SQL_LIST_BY_USER({ userCol }) {
  return `
    SELECT
      r.${userCol}              AS id_usuario,
      r.id_alojamiento         AS id_alojamiento,
      r.fecha_inicio           AS fecha_inicio,
      r.fecha_fin              AS fecha_fin,
      r.codigo_estado_reserva  AS estado,
      a.titulo                 AS titulo,
      p.precio_fijo            AS precio_fijo
    FROM RESERVA r
    JOIN TBL_ALOJAMIENTO a ON a.id_alojamiento = r.id_alojamiento
    LEFT JOIN TBL_PRECIOS p ON p.id_precio = a.id_precio
    WHERE r.${userCol} = :id_usuario
    ORDER BY r.fecha_inicio DESC
  `;
}

export const SQL_LIST_BY_LISTING = `
  SELECT
    fecha_inicio,
    fecha_fin,
    codigo_estado_reserva AS estado
  FROM RESERVA
  WHERE id_alojamiento = :id_alojamiento
    AND codigo_estado_reserva IN (1,2)
  ORDER BY fecha_inicio
`;
