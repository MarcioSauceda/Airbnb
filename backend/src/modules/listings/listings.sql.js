// Listado simple (sin joins por ahora)
export const LISTINGS_LIST = `
  SELECT
    id_alojamiento AS id,
    titulo,
    descripcion
  FROM TBL_ALOJAMIENTO
  ORDER BY id_alojamiento
`;

// Detalle (si tu tabla tiene esas columnas; si no, ajustamos)
export const LISTING_DETAIL = `
  SELECT
    a.*,
    p.precio_fijo
  FROM TBL_ALOJAMIENTO a
  LEFT JOIN TBL_PRECIOS p ON p.id_precio = a.id_precio
  WHERE a.id_alojamiento = :id
`;

// Imágenes (no adivino columnas: traemos todas)
export const LISTING_IMAGES = `
  SELECT *
  FROM IMAGEN_ALOJAMIENTO
  WHERE id_alojamiento = :id
`;

// Crear alojamiento (ajusta columnas a tu DDL si difieren)
export const LISTING_CREATE = `
  INSERT INTO TBL_ALOJAMIENTO (
    titulo, descripcion, direccion, capacidad, id_tipo_alojamiento, id_precio
  ) VALUES (
    :titulo, :descripcion, :direccion, :capacidad, :id_tipo_alojamiento, :id_precio
  )
  RETURNING id_alojamiento INTO :out_id
`;

// Relación alojamiento-amenidades (según tu tabla ALOJ_AMENIDAD)
export const LISTING_ADD_AMENITIES = `
  INSERT INTO ALOJ_AMENIDAD (id_alojamiento, id_amenidades)
  VALUES (:id_alojamiento, :id_amenidad)
`;

// Relación alojamiento-servicios (según tu tabla TBL_SERVICIOS_X_ALOJAMIENTO)
export const LISTING_ADD_SERVICES = `
  INSERT INTO TBL_SERVICIOS_X_ALOJAMIENTO (id_alojamiento, id_servicio)
  VALUES (:id_alojamiento, :id_servicio)
`;
