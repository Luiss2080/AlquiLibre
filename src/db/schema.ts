// Cada elemento es una migración. Para cambiar el esquema, AGREGÁ uno nuevo al final;
// nunca edites uno ya publicado.
export const MIGRACIONES: string[] = [
  `CREATE TABLE propiedades (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT NOT NULL, direccion TEXT, monto_mensual REAL NOT NULL);
CREATE TABLE inquilinos (id INTEGER PRIMARY KEY AUTOINCREMENT, propiedad_id INTEGER REFERENCES propiedades(id) ON DELETE SET NULL, nombre TEXT NOT NULL, telefono TEXT, dia_cobro INTEGER NOT NULL DEFAULT 1, fecha_ingreso TEXT, garantia REAL NOT NULL DEFAULT 0);
CREATE TABLE pagos (id INTEGER PRIMARY KEY AUTOINCREMENT, inquilino_id INTEGER NOT NULL REFERENCES inquilinos(id) ON DELETE CASCADE, periodo TEXT NOT NULL, monto REAL NOT NULL, fecha TEXT NOT NULL, recibo_nro INTEGER);`,
];

export const TABLAS = ['propiedades', 'inquilinos', 'pagos'] as const;
