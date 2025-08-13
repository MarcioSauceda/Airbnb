// backend/src/modules/bookings/bookings.sql.js
export const BOOKING_CREATE = `
INSERT INTO reserva (
  id_reserva, codigo_estado_reserva, id_usuario, id_alojamiento,
  fecha_inicio, fecha_fin, numero_huesped, precio_total
) VALUES (
  seq_reserva.NEXTVAL, :codigo_estado_reserva, :id_usuario, :id_alojamiento,
  :fecha_inicio, :fecha_fin, :numero_huesped, :precio_total
)
RETURNING id_reserva INTO :out_id
`;
