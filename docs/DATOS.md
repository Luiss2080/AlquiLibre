# Modelo de datos — AlquiLibre

> Diseño detallado de la base SQLite: campos, validaciones, consultas y migraciones. Complementa la sección 6 de [SPEC.md](SPEC.md).

## 1. Convenciones

- Base local `SQLite` con `expo-sqlite`; versión del esquema en `PRAGMA user_version`.
- Claves primarias `INTEGER AUTOINCREMENT` llamadas `id`.
- Fechas como texto ISO `AAAA-MM-DD` (y `AAAA-MM-DDTHH:MM` cuando hay hora). Nunca se guardan textos como «hoy».
- Montos como `REAL` en bolivianos; se redondean a 2 decimales al guardar y se formatean al mostrar.
- Booleanos como `INTEGER` 0/1.
- Los textos se guardan sin espacios sobrantes (`trim()`).
- Todas las consultas usan parámetros (`?`), nunca concatenan texto del usuario.
- Las claves foráneas se activan con `PRAGMA foreign_keys = ON` al abrir la base.

## 2. Relaciones

| Campo | Apunta a | Comportamiento |
|---|---|---|
| `inquilinos.propiedad_id` | `propiedades` | Sin borrado en cascada |
| `pagos.inquilino_id` | `inquilinos` | Al borrar el padre se borran los hijos |

```
propiedades  ──<  inquilinos
inquilinos  ──<  pagos
pagos
```

## 3. Detalle por tabla

### 3.1 `propiedades`

Inmuebles con su alquiler mensual y garantía.

| Campo | Tipo SQL → TS | Control en formulario | Validación | Mensaje de error |
|---|---|---|---|---|
| `id` | INTEGER | Automático | Clave primaria | — |
| `nombre` | TEXT → `string` | Texto | Obligatorio; Texto de 1 a 80 caracteres sin espacios sobrantes | «Escribí nombre» |
| `direccion` | TEXT → `string \| null` | Texto | Opcional; Texto de 1 a 80 caracteres sin espacios sobrantes | «Escribí direccion» |
| `monto_mensual` | REAL → `number` | Numérico decimal | Obligatorio; Mayor a 0; Hasta 2 decimales | «Ingresá un monto mayor a 0» |

**Consultas base** (en `src/db/propiedades.ts`):

```ts
listar(): Promise<Propiedad[]>            // SELECT * FROM propiedades ORDER BY id DESC
obtener(id: number): Promise<Propiedad | null>   // SELECT * FROM propiedades WHERE id = ?
crear(datos: NuevoPropiedad): Promise<number>   // INSERT INTO propiedades (nombre, direccion, monto_mensual) VALUES (?, ?, ?)
actualizar(id: number, datos: NuevoPropiedad): Promise<void>   // UPDATE propiedades SET nombre = ?, direccion = ?, monto_mensual = ? WHERE id = ?
eliminar(id: number): Promise<void>      // DELETE FROM propiedades WHERE id = ?
```

### 3.2 `inquilinos`

Quién ocupa cada propiedad, día de cobro y vigencia del contrato.

| Campo | Tipo SQL → TS | Control en formulario | Validación | Mensaje de error |
|---|---|---|---|---|
| `id` | INTEGER | Automático | Clave primaria | — |
| `propiedad_id` | INTEGER → `number \| null` | Selector de propiedades | Opcional; Debe existir en `propiedades` | «Elegí un registro» |
| `nombre` | TEXT → `string` | Texto | Obligatorio; Texto de 1 a 80 caracteres sin espacios sobrantes | «Escribí nombre» |
| `telefono` | TEXT → `string \| null` | Teléfono | Opcional; Solo dígitos, 7 a 15 caracteres (se ignoran espacios y guiones) | «Teléfono no válido» |
| `dia_cobro` | INTEGER → `number` | Numérico entero | Obligatorio; Entero mayor o igual a 0; Valor inicial `1` | «Ingresá un número entero» |
| `fecha_ingreso` | TEXT → `string \| null` | Fecha | Opcional; Fecha real en formato AAAA-MM-DD | «Fecha no válida» |
| `garantia` | REAL → `number` | Numérico decimal | Obligatorio; Mayor o igual a 0; Hasta 2 decimales; Valor inicial `0` | «Ingresá un número válido» |

**Índices recomendados** (agregarlos en la migración si aún no existen):

```sql
CREATE INDEX IF NOT EXISTS idx_inquilinos_propiedad_id ON inquilinos(propiedad_id);
CREATE INDEX IF NOT EXISTS idx_inquilinos_fecha_ingreso ON inquilinos(fecha_ingreso);
```

**Consultas base** (en `src/db/inquilinos.ts`):

```ts
listar(): Promise<Inquilino[]>            // SELECT * FROM inquilinos ORDER BY id DESC
obtener(id: number): Promise<Inquilino | null>   // SELECT * FROM inquilinos WHERE id = ?
crear(datos: NuevoInquilino): Promise<number>   // INSERT INTO inquilinos (propiedad_id, nombre, telefono, dia_cobro, fecha_ingreso, garantia) VALUES (?, ?, ?, ?, ?, ?)
actualizar(id: number, datos: NuevoInquilino): Promise<void>   // UPDATE inquilinos SET propiedad_id = ?, nombre = ?, telefono = ?, dia_cobro = ?, fecha_ingreso = ?, garantia = ? WHERE id = ?
eliminar(id: number): Promise<void>      // DELETE FROM inquilinos WHERE id = ?
listarPorPropiedad(propiedad_id: number): Promise<Inquilino[]>   // WHERE propiedad_id = ?
```

### 3.3 `pagos`

Cada pago por período con su número de recibo.

| Campo | Tipo SQL → TS | Control en formulario | Validación | Mensaje de error |
|---|---|---|---|---|
| `id` | INTEGER | Automático | Clave primaria | — |
| `inquilino_id` | INTEGER → `number` | Selector de inquilinos | Obligatorio; Debe existir en `inquilinos` | «Elegí un registro» |
| `periodo` | TEXT → `string` | Texto | Obligatorio; Texto de 1 a 80 caracteres sin espacios sobrantes | «Escribí periodo» |
| `monto` | REAL → `number` | Numérico decimal | Obligatorio; Mayor a 0; Hasta 2 decimales | «Ingresá un monto mayor a 0» |
| `fecha` | TEXT → `string` | Fecha | Obligatorio; Fecha real en formato AAAA-MM-DD | «Fecha no válida» |
| `recibo_nro` | INTEGER → `number \| null` | Numérico entero | Opcional; Entero mayor o igual a 0 | «Ingresá un número entero» |

**Índices recomendados** (agregarlos en la migración si aún no existen):

```sql
CREATE INDEX IF NOT EXISTS idx_pagos_inquilino_id ON pagos(inquilino_id);
CREATE INDEX IF NOT EXISTS idx_pagos_fecha ON pagos(fecha);
```

**Consultas base** (en `src/db/pagos.ts`):

```ts
listar(): Promise<Pago[]>            // SELECT * FROM pagos ORDER BY id DESC
obtener(id: number): Promise<Pago | null>   // SELECT * FROM pagos WHERE id = ?
crear(datos: NuevoPago): Promise<number>   // INSERT INTO pagos (inquilino_id, periodo, monto, fecha, recibo_nro) VALUES (?, ?, ?, ?, ?)
actualizar(id: number, datos: NuevoPago): Promise<void>   // UPDATE pagos SET inquilino_id = ?, periodo = ?, monto = ?, fecha = ?, recibo_nro = ? WHERE id = ?
eliminar(id: number): Promise<void>      // DELETE FROM pagos WHERE id = ?
listarPorInquilino(inquilino_id: number): Promise<Pago[]>   // WHERE inquilino_id = ?
```

## 4. Tipos TypeScript

Copiar a `src/db/tipos.ts`:

```ts
export interface Propiedad {
  id: number;
  nombre: string;
  direccion: string | null;
  monto_mensual: number;
}
export type NuevoPropiedad = Omit<Propiedad, 'id'>;

export interface Inquilino {
  id: number;
  propiedad_id: number | null;
  nombre: string;
  telefono: string | null;
  dia_cobro: number;
  fecha_ingreso: string | null;
  garantia: number;
}
export type NuevoInquilino = Omit<Inquilino, 'id'>;

export interface Pago {
  id: number;
  inquilino_id: number;
  periodo: string;
  monto: number;
  fecha: string;
  recibo_nro: number | null;
}
export type NuevoPago = Omit<Pago, 'id'>;

```

## 5. Valores permitidos (enumeraciones)

Esta app no usa columnas con valores cerrados.

## 6. Migraciones

Migración 1 = esquema inicial (ya en `src/db/schema.ts`). Cada cambio posterior es una migración nueva al final de la lista; nunca se edita una ya publicada.

| Versión | Fase | Motivo |
|---|---|---|
| 2 | 2 | Fecha de fin de contrato para los avisos de vencimiento (nula si es indefinido). |
| 3 | 5 | Plantilla de mensaje y preferencias de aviso. |

**Migración 2** (fase 2)

```sql
ALTER TABLE inquilinos ADD COLUMN fin_contrato TEXT;
```

**Migración 3** (fase 5)

```sql
CREATE TABLE ajustes (clave TEXT PRIMARY KEY, valor TEXT NOT NULL);
```

## 7. Esquema inicial completo

```sql
CREATE TABLE propiedades (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT NOT NULL, direccion TEXT, monto_mensual REAL NOT NULL);
CREATE TABLE inquilinos (id INTEGER PRIMARY KEY AUTOINCREMENT, propiedad_id INTEGER REFERENCES propiedades(id) ON DELETE SET NULL, nombre TEXT NOT NULL, telefono TEXT, dia_cobro INTEGER NOT NULL DEFAULT 1, fecha_ingreso TEXT, garantia REAL NOT NULL DEFAULT 0);
CREATE TABLE pagos (id INTEGER PRIMARY KEY AUTOINCREMENT, inquilino_id INTEGER NOT NULL REFERENCES inquilinos(id) ON DELETE CASCADE, periodo TEXT NOT NULL, monto REAL NOT NULL, fecha TEXT NOT NULL, recibo_nro INTEGER);
```

## 8. Reglas de integridad que NO delega a la base

- **RN-01** Cada propiedad puede tener un solo inquilino vigente a la vez.
- **RN-02** El período de un pago es un mes (formato AAAA-MM) y no puede registrarse dos veces completo.
- **RN-03** Un pago puede ser parcial: el saldo del período queda pendiente hasta completar el monto mensual.
- **RN-04** Un inquilino está moroso cuando pasó su día de cobro y el período actual no está completo.
- **RN-05** Los recibos se numeran de forma correlativa y no se reutilizan.
- **RN-06** La garantía es informativa: se registra, no se descuenta automáticamente.
- **RN-07** El aviso de vencimiento de contrato se programa 30 y 7 días antes.

Estas reglas se implementan en `src/lib/` como funciones puras y se prueban de forma automática (ver [PRUEBAS.md](PRUEBAS.md)).
