# Especificación del MVP — AlquiLibre

## 1. Resumen

Administración de alquileres: inquilinos, cobro mensual, recibos en PDF y avisos de vencimiento.

**Usuario objetivo:** dueños de cuartos, departamentos y locales.

**Problema que resuelve:** hoy estas tareas se llevan en cuaderno o en el chat de WhatsApp, con errores y sin historial. AlquiLibre las ordena en una app simple que funciona sin internet.

**Propuesta de valor:** registrar en segundos, consultar al instante y compartir el resultado, sin cuentas, sin servidores y sin costo.

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
- Servidor, nube o sincronización entre dispositivos.
- Pagos en línea o pasarelas de cobro.
- Publicación en App Store (iOS).
- Cualquier servicio de pago.

## 3. Historias de usuario y criterios de aceptación

### HU-01 — Propiedades con monto mensual y garantía

**Como** usuario (dueños de cuartos, departamentos y locales), **quiero** propiedades con monto mensual y garantía, **para** no depender de cuadernos ni mensajes sueltos.

Criterios de aceptación:

- [ ] Se puede hacer completo desde la app, sin conexión a internet.
- [ ] Los datos siguen ahí después de cerrar y volver a abrir la app.
- [ ] Los campos obligatorios se validan y muestran un mensaje claro en español.
- [ ] Hay un estado vacío que explica qué hacer cuando todavía no hay datos.

### HU-02 — Inquilinos con día de cobro y fecha de ingreso

**Como** usuario (dueños de cuartos, departamentos y locales), **quiero** inquilinos con día de cobro y fecha de ingreso, **para** no depender de cuadernos ni mensajes sueltos.

Criterios de aceptación:

- [ ] Se puede hacer completo desde la app, sin conexión a internet.
- [ ] Los datos siguen ahí después de cerrar y volver a abrir la app.
- [ ] Los campos obligatorios se validan y muestran un mensaje claro en español.
- [ ] Hay un estado vacío que explica qué hacer cuando todavía no hay datos.

### HU-03 — Registro de pagos por período y control de morosos

**Como** usuario (dueños de cuartos, departamentos y locales), **quiero** registro de pagos por período y control de morosos, **para** no depender de cuadernos ni mensajes sueltos.

Criterios de aceptación:

- [ ] Se puede hacer completo desde la app, sin conexión a internet.
- [ ] Los datos siguen ahí después de cerrar y volver a abrir la app.
- [ ] Los campos obligatorios se validan y muestran un mensaje claro en español.
- [ ] Hay un estado vacío que explica qué hacer cuando todavía no hay datos.

### HU-04 — Recibos numerados en PDF para compartir por WhatsApp

**Como** usuario (dueños de cuartos, departamentos y locales), **quiero** recibos numerados en PDF para compartir por WhatsApp, **para** no depender de cuadernos ni mensajes sueltos.

Criterios de aceptación:

- [ ] Se puede hacer completo desde la app, sin conexión a internet.
- [ ] Los datos siguen ahí después de cerrar y volver a abrir la app.
- [ ] Los campos obligatorios se validan y muestran un mensaje claro en español.
- [ ] Hay un estado vacío que explica qué hacer cuando todavía no hay datos.

### HU-05 — Recordatorios de cobro y de vencimiento de contrato

**Como** usuario (dueños de cuartos, departamentos y locales), **quiero** recordatorios de cobro y de vencimiento de contrato, **para** no depender de cuadernos ni mensajes sueltos.

Criterios de aceptación:

- [ ] Se puede hacer completo desde la app, sin conexión a internet.
- [ ] Los datos siguen ahí después de cerrar y volver a abrir la app.
- [ ] Los campos obligatorios se validan y muestran un mensaje claro en español.
- [ ] Hay un estado vacío que explica qué hacer cuando todavía no hay datos.

### HU-06 — Resumen de ingresos por mes

**Como** usuario (dueños de cuartos, departamentos y locales), **quiero** resumen de ingresos por mes, **para** no depender de cuadernos ni mensajes sueltos.

Criterios de aceptación:

- [ ] Se puede hacer completo desde la app, sin conexión a internet.
- [ ] Los datos siguen ahí después de cerrar y volver a abrir la app.
- [ ] Los campos obligatorios se validan y muestran un mensaje claro en español.
- [ ] Hay un estado vacío que explica qué hacer cuando todavía no hay datos.

## 4. Pantallas

| Pantalla | Propósito |
|---|---|
| Inicio | Resumen y accesos directos a lo más usado |
| Lista de propiedades | Ver, buscar y abrir cada registro |
| Formulario de propiedades | Crear y editar con validaciones |
| Lista de inquilinos | Ver, buscar y abrir cada registro |
| Formulario de inquilinos | Crear y editar con validaciones |
| Lista de pagos | Ver, buscar y abrir cada registro |
| Formulario de pagos | Crear y editar con validaciones |
| Ajustes | Datos del usuario, moneda y exportación |

## 5. Modelo de datos

- **propiedades**: id, nombre, direccion, monto_mensual
- **inquilinos**: id, propiedad_id, nombre, telefono, dia_cobro, fecha_ingreso, garantia
- **pagos**: id, inquilino_id, periodo, monto, fecha, recibo_nro

El SQL completo y la política de migraciones están en [ARQUITECTURA.md](ARQUITECTURA.md).

## 6. Requisitos no funcionales

- **Offline total:** ninguna función del MVP requiere internet.
- **Rendimiento:** la app abre en menos de 2 segundos y las listas responden de inmediato con cientos de registros.
- **Privacidad:** los datos nunca salen del teléfono, salvo lo que el usuario comparte a propósito.
- **Idioma y formato:** español de Bolivia, montos en bolivianos (Bs) con dos decimales, fechas día/mes/año.
- **Usabilidad:** botones grandes, formularios cortos y flujos de pocos toques; pensado para usarse de pie y con una mano.
- **Calidad:** `npm run lint`, `npx tsc --noEmit` y `npm test` pasan en cada commit (CI en GitHub Actions).

## 7. Riesgos y decisiones

| Riesgo | Mitigación |
|---|---|
| Perder el celular y los datos | Respaldo exportable (CSV o archivo de base) en la versión 1.1 |
| Cambios de esquema que rompan datos | Migraciones con `PRAGMA user_version`; nunca editar una migración publicada |
| Alcance que crece | Todo lo que no esté en la sección 2 va a «Después del MVP» |

## 8. Criterios para lanzar el MVP

- [ ] Todas las historias de la sección 3 cumplen sus criterios.
- [ ] Probado en un teléfono Android real, en modo avión.
- [ ] APK generado con `npm run build:apk`.
- [ ] README con capturas y CHANGELOG actualizado.
- [ ] Release v1.0.0 publicado.
