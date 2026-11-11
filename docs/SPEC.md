# Especificación del MVP — AlquiLibre

> Documento vivo. Si una decisión cambia, se actualiza acá primero y después en el código.

## 1. Resumen

**Propuesta de valor:** Que el dueño sepa quién pagó el alquiler, quién está atrasado y cuándo vence cada contrato.

**Problema:** Los cobros de alquiler se llevan de memoria o en cuadernos; es fácil olvidar un mes impago, perder la garantía de vista o dejar vencer un contrato.

**Cómo se resuelve hoy:** Cuaderno, planilla de Excel y recibos hechos a mano.

**Usuario objetivo:** Propietario de 2 a 15 cuartos, departamentos o locales que cobra mensualmente y entrega recibos.

**Métricas de éxito del MVP:**

- Ver los morosos del mes en una sola pantalla.
- Emitir un recibo numerado en PDF en menos de 15 segundos.
- No dejar vencer ningún contrato sin aviso.

## 2. Alcance del MVP

### Incluido

- Propiedades con monto mensual y garantía.
- Inquilinos con día de cobro y fecha de ingreso.
- Registro de pagos por período y control de morosos.
- Recibos numerados en PDF para compartir por WhatsApp.
- Recordatorios de cobro y de vencimiento de contrato.
- Resumen de ingresos por mes.

### Fuera del MVP

- Cuentas de usuario, inicio de sesión y multiusuario.
- Servidor propio, nube o sincronización entre dispositivos.
- Pagos en línea o pasarelas de cobro.
- Publicación en App Store (iOS).
- Cualquier servicio de pago o con costo recurrente.

## 3. Reglas de negocio

Reglas que el código **debe** cumplir. Cada una se cubre con pruebas automáticas cuando es lógica pura.

- **RN-01** Cada propiedad puede tener un solo inquilino vigente a la vez.
- **RN-02** El período de un pago es un mes (formato AAAA-MM) y no puede registrarse dos veces completo.
- **RN-03** Un pago puede ser parcial: el saldo del período queda pendiente hasta completar el monto mensual.
- **RN-04** Un inquilino está moroso cuando pasó su día de cobro y el período actual no está completo.
- **RN-05** Los recibos se numeran de forma correlativa y no se reutilizan.
- **RN-06** La garantía es informativa: se registra, no se descuenta automáticamente.
- **RN-07** El aviso de vencimiento de contrato se programa 30 y 7 días antes.

## 4. Historias de usuario y criterios de aceptación

Formato: **Dado** un contexto, **Cuando** el usuario hace algo, **Entonces** pasa algo verificable.

### HU-01 — Registrar propiedades

**Como** propietario **quiero** cargar mis inmuebles con alquiler y garantía **para** tener todo en un solo lugar.

**Fase:** 2 — Propiedades e inquilinos

**Criterios de aceptación:**

1. **Dado:** no tengo propiedades. **Cuando:** abro la app. **Entonces:** veo el estado vacío con «Agregar propiedad».
2. **Dado:** el formulario de propiedad. **Cuando:** ingreso un alquiler negativo. **Entonces:** no guarda y avisa el error.

Criterios comunes a toda historia:

- [ ] Funciona sin conexión a internet.
- [ ] Los datos persisten al cerrar y reabrir la app.
- [ ] Los errores de validación se muestran en español y junto al campo.
- [ ] Hay un estado vacío claro cuando todavía no hay datos.

### HU-02 — Registrar inquilinos y contrato

**Como** propietario **quiero** asignar un inquilino con día de cobro y fecha de ingreso **para** saber cuándo cobrar a cada uno.

**Fase:** 2 — Propiedades e inquilinos

**Criterios de aceptación:**

1. **Dado:** una propiedad libre. **Cuando:** asigno un inquilino. **Entonces:** queda ocupada y aparece en la lista con su día de cobro.
2. **Dado:** una propiedad ocupada. **Cuando:** intento asignar otro inquilino. **Entonces:** la app pide dar de baja al actual primero.

Criterios comunes a toda historia:

- [ ] Funciona sin conexión a internet.
- [ ] Los datos persisten al cerrar y reabrir la app.
- [ ] Los errores de validación se muestran en español y junto al campo.
- [ ] Hay un estado vacío claro cuando todavía no hay datos.

### HU-03 — Registrar pagos y ver morosos

**Como** propietario **quiero** anotar cada pago y ver quién está atrasado **para** cobrar a tiempo.

**Fase:** 3 — Pagos y morosos

**Criterios de aceptación:**

1. **Dado:** un inquilino con día de cobro 5. **Cuando:** es día 8 y no hay pago del mes. **Entonces:** aparece en «Morosos» con los días de atraso.
2. **Dado:** pago parcial de 300 de 500 Bs. **Cuando:** lo registro. **Entonces:** el período queda con saldo 200 Bs pendiente.

Criterios comunes a toda historia:

- [ ] Funciona sin conexión a internet.
- [ ] Los datos persisten al cerrar y reabrir la app.
- [ ] Los errores de validación se muestran en español y junto al campo.
- [ ] Hay un estado vacío claro cuando todavía no hay datos.

### HU-04 — Emitir recibos en PDF

**Como** propietario **quiero** generar un recibo numerado y enviarlo por WhatsApp **para** dar constancia sin hacerlo a mano.

**Fase:** 4 — Recibos en PDF

**Criterios de aceptación:**

1. **Dado:** un pago registrado. **Cuando:** toco «Recibo». **Entonces:** se genera un PDF con número correlativo, fecha, inquilino, propiedad, período y monto.
2. **Dado:** dos recibos del mismo día. **Cuando:** los emito. **Entonces:** tienen números distintos y consecutivos.

Criterios comunes a toda historia:

- [ ] Funciona sin conexión a internet.
- [ ] Los datos persisten al cerrar y reabrir la app.
- [ ] Los errores de validación se muestran en español y junto al campo.
- [ ] Hay un estado vacío claro cuando todavía no hay datos.

### HU-05 — Recibir recordatorios

**Como** propietario **quiero** recibir avisos de cobro y de vencimiento de contrato **para** no olvidar fechas.

**Fase:** 5 — Recordatorios y resumen mensual

**Criterios de aceptación:**

1. **Dado:** un contrato que vence en 30 días. **Cuando:** llega la fecha del aviso. **Entonces:** recibo una notificación local con inquilino y fecha.
2. **Dado:** permiso de notificaciones denegado. **Cuando:** abro Ajustes. **Entonces:** veo cómo activarlo y la app sigue funcionando.

Criterios comunes a toda historia:

- [ ] Funciona sin conexión a internet.
- [ ] Los datos persisten al cerrar y reabrir la app.
- [ ] Los errores de validación se muestran en español y junto al campo.
- [ ] Hay un estado vacío claro cuando todavía no hay datos.

### HU-06 — Ver el resumen de ingresos por mes

**Como** propietario **quiero** ver cuánto cobré y cuánto me falta por mes **para** saber cómo voy.

**Fase:** 5 — Recordatorios y resumen mensual

**Criterios de aceptación:**

1. **Dado:** pagos de tres meses. **Cuando:** abro Resumen. **Entonces:** veo cobrado, pendiente y morosos por mes.

Criterios comunes a toda historia:

- [ ] Funciona sin conexión a internet.
- [ ] Los datos persisten al cerrar y reabrir la app.
- [ ] Los errores de validación se muestran en español y junto al campo.
- [ ] Hay un estado vacío claro cuando todavía no hay datos.

## 5. Pantallas y navegación

| Pantalla | Qué muestra | Acciones principales |
|---|---|---|
| Inicio | Cobrado del mes, pendiente, morosos y próximos vencimientos | Registrar pago, ver morosos |
| Propiedades | Lista con estado (libre u ocupada) y alquiler | Crear, editar |
| Detalle de propiedad | Inquilino actual, historial de pagos, garantía | Asignar o dar de baja inquilino |
| Formulario de inquilino | Nombre, teléfono, día de cobro, fecha de ingreso, fin de contrato | Guardar |
| Registrar pago | Período, monto, fecha, nota | Guardar y emitir recibo |
| Morosos | Inquilinos atrasados con días de atraso y saldo | Cobrar por WhatsApp |
| Resumen mensual | Cobrado vs esperado por mes | Cambiar mes, exportar |

**Navegación:** la pantalla de inicio es el punto de partida; desde ahí se llega a cada sección con un toque y se vuelve con el botón atrás. Las acciones frecuentes (nuevo registro) están siempre a la vista. La navegación se implementa con Expo Router (rutas por archivo en `app/`).

## 6. Modelo de datos

Base SQLite local versionada con `PRAGMA user_version`. Las fechas se guardan como texto ISO 8601 y los montos como números reales (en bolivianos).

### `propiedades`

Inmuebles con su alquiler mensual y garantía.

| Campo | Tipo | Reglas |
|---|---|---|
| `id` | INTEGER | Clave primaria autoincremental |
| `nombre` | TEXT | Obligatorio |
| `direccion` | TEXT | Opcional |
| `monto_mensual` | REAL | Obligatorio |

### `inquilinos`

Quién ocupa cada propiedad, día de cobro y vigencia del contrato.

| Campo | Tipo | Reglas |
|---|---|---|
| `id` | INTEGER | Clave primaria autoincremental |
| `propiedad_id` | INTEGER | Referencia a propiedades |
| `nombre` | TEXT | Obligatorio |
| `telefono` | TEXT | Opcional |
| `dia_cobro` | INTEGER | Obligatorio; Por defecto 1 |
| `fecha_ingreso` | TEXT | Opcional |
| `garantia` | REAL | Obligatorio; Por defecto 0 |

### `pagos`

Cada pago por período con su número de recibo.

| Campo | Tipo | Reglas |
|---|---|---|
| `id` | INTEGER | Clave primaria autoincremental |
| `inquilino_id` | INTEGER | Obligatorio; Referencia a inquilinos (se borra en cascada) |
| `periodo` | TEXT | Obligatorio |
| `monto` | REAL | Obligatorio |
| `fecha` | TEXT | Obligatorio |
| `recibo_nro` | INTEGER | Opcional |

Detalle de la política de migraciones: nunca editar una migración publicada; agregar una nueva al final de la lista en `src/db/schema.ts`.

## 7. Casos borde a contemplar

- Contrato sin fecha de fin (indefinido): no genera aviso de vencimiento.
- Día de cobro 31 en meses cortos: se usa el último día del mes.
- Pago adelantado de varios meses: se registra un pago por período.
- Cambio de alquiler a mitad de contrato: aplica al próximo período.

## 8. Requisitos no funcionales

- **Offline total:** ninguna función del MVP requiere internet.
- **Rendimiento:** la app abre en menos de 2 segundos; las listas responden de inmediato con cientos de registros (consultas con índices y listas virtualizadas).
- **Privacidad:** los datos nunca salen del teléfono, salvo lo que el usuario comparte a propósito.
- **Idioma y formato:** español de Bolivia, montos en bolivianos (Bs) con dos decimales, fechas día/mes/año.
- **Usabilidad:** botones grandes, formularios cortos y flujos de pocos toques; pensado para usarse de pie y con una mano.
- **Accesibilidad básica:** contraste suficiente, etiquetas de accesibilidad en botones y tamaño de texto que respeta el ajuste del sistema.
- **Calidad:** `npm run lint`, `npx tsc --noEmit` y `npm test` pasan en cada commit (CI en GitHub Actions).
- **Compatibilidad:** Android 8 o superior (probado con Expo Go y con el APK).

### Capacidades de Expo que usa

| Paquete | Para qué | Permiso |
|---|---|---|
| `expo-notifications` | Recordatorios locales (programados en el teléfono, sin servidor) | Notificaciones |
| `expo-print` | Generar PDF desde HTML | — |
| `expo-sharing` | Compartir PDF, CSV o respaldos con otras apps | — |

## 9. Riesgos y mitigaciones

| Riesgo | Mitigación |
|---|---|
| Reclamos sobre recibos | Numeración correlativa inmutable y reimpresión idéntica. |
| Datos personales del inquilino | Todo queda en el teléfono; el PDF solo incluye lo necesario. |
| Cambios de esquema que rompan datos | Migraciones con `PRAGMA user_version`; nunca editar una migración publicada |
| El alcance crece | Todo lo que no esté en la sección 2 va a «Después del MVP» en el [ROADMAP](ROADMAP.md) |

## 10. Criterios para lanzar el MVP (v1.0.0)

- [ ] Todas las historias de la sección 4 cumplen sus criterios de aceptación.
- [ ] Todas las reglas de negocio de la sección 3 tienen pruebas o verificación manual.
- [ ] Probado en un teléfono Android real, en modo avión.
- [ ] APK generado con `npm run build:apk` e instalado en un teléfono limpio.
- [ ] README con capturas de pantalla y CHANGELOG actualizado.
- [ ] Release v1.0.0 publicado con el APK adjunto.

## 11. Glosario

| Término | Significado en AlquiLibre |
|---|---|
| `propiedades` | Inmuebles con su alquiler mensual y garantía. |
| `inquilinos` | Quién ocupa cada propiedad, día de cobro y vigencia del contrato. |
| `pagos` | Cada pago por período con su número de recibo. |

## 12. Mensajes estándar

| Situación | Mensaje |
|---|---|
| Campo obligatorio vacío | Completá este campo |
| Número inválido | Ingresá un número válido |
| Monto cero o negativo | El monto debe ser mayor a 0 |
| Fecha inválida | Fecha no válida |
| Guardado correcto | Guardado |
| Error al guardar | No se pudo guardar. Intentá de nuevo |
| Confirmar borrado | ¿Borrar «{nombre}»? No se puede deshacer |
| Lista vacía | Todavía no hay nada acá. Tocá «+» para empezar |

## 13. Trazabilidad

| Historia | Fase | Casos de prueba |
|---|---|---|
| HU-01 Registrar propiedades | 2 | CP-01-1, CP-01-2 |
| HU-02 Registrar inquilinos y contrato | 2 | CP-02-1, CP-02-2 |
| HU-03 Registrar pagos y ver morosos | 3 | CP-03-1, CP-03-2 |
| HU-04 Emitir recibos en PDF | 4 | CP-04-1, CP-04-2 |
| HU-05 Recibir recordatorios | 5 | CP-05-1, CP-05-2 |
| HU-06 Ver el resumen de ingresos por mes | 5 | CP-06-1 |

## 14. Documentos relacionados

- [DATOS.md](DATOS.md) · [PANTALLAS.md](PANTALLAS.md) · [PRUEBAS.md](PRUEBAS.md) · [BACKLOG.md](BACKLOG.md) · [ROADMAP.md](ROADMAP.md) · [PLANNING.md](PLANNING.md)
