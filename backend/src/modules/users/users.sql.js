export const USERS_SELECT_ALL = `
  SELECT id_usuario, nombre, apellido, email, codigo_tipo_usuario, id_metodo_pago
  FROM TBL_USUARIOS
  ORDER BY id_usuario
`;

export const USERS_BY_EMAIL = `
  SELECT
    id_usuario,
    email,
    contrasena AS password_hash,   -- alias para el servicio
    nombre,
    apellido,
    codigo_tipo_usuario,
    id_metodo_pago
  FROM TBL_USUARIOS
  WHERE email = :email
`;

export const USERS_INSERT_TRIGGER = `
  INSERT INTO TBL_USUARIOS
    (nombre, apellido, email, contrasena, codigo_tipo_usuario, id_metodo_pago)
  VALUES
    (:nombre, :apellido, :email, :contrasena, :codigo_tipo_usuario, :id_metodo_pago)
`;

// Si usas la variante RETURNING:
export const USERS_INSERT_SEQ_RETURNING = `
  INSERT INTO TBL_USUARIOS
    (id_usuario, nombre, apellido, email, contrasena, codigo_tipo_usuario, id_metodo_pago)
  VALUES
    (SEQ_TBL_USUARIOS.NEXTVAL, :nombre, :apellido, :email, :contrasena, :codigo_tipo_usuario, :id_metodo_pago)
  RETURNING id_usuario INTO :out_id
`;
