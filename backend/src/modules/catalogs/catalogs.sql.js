export const SQL_TIPOS_USUARIO = `
  SELECT codigo_tipo_usuario AS id, tipo_usuario AS nombre
  FROM TIPO_USUARIO
  ORDER BY codigo_tipo_usuario
`;

export const SQL_ESTADOS_RESERVA = `
  SELECT codigo_estado_reserva AS id, estado_reserva AS nombre
  FROM ESTADO_RESERVA
  ORDER BY codigo_estado_reserva
`;

export const SQL_ESTADOS_PAGO = `
  SELECT id_estado_pago AS id, estado_pago AS nombre
  FROM TBL_ESTADO_PAGO
  ORDER BY id_estado_pago
`;

export const SQL_METODOS_PAGO = `
  SELECT id_metodo_pago AS id, tipo_pago AS nombre
  FROM TBL_METODO_PAGO
  ORDER BY id_metodo_pago
`;

export const SQL_TIPOS_ALOJAMIENTO = `
  SELECT id_tipo_alojamiento AS id, categoria AS nombre
  FROM TBL_TIPO_ALOJAMIENTO
  ORDER BY id_tipo_alojamiento
`;

export const SQL_AMENIDADES = `
  SELECT id_amenidades AS id, descripcion_amenidad AS nombre, id_servicios_amenidad AS grupo_id
  FROM TBL_AMENIDADES
  ORDER BY id_amenidades
`;

export const SQL_SERVICIOS = `
  SELECT id_servicio AS id, nombre_servicio AS nombre
  FROM TBL_SERVICIOS
  ORDER BY id_servicio
`;
