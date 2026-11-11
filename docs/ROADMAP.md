# Roadmap de AlquiLibre

> Que el dueño sepa quién pagó el alquiler, quién está atrasado y cuándo vence cada contrato.

Ruta de desarrollo del MVP, fase por fase. Cada fase termina con algo que se puede **usar y probar en un teléfono**. Trabajá una fase a la vez y no pases a la siguiente hasta cumplir su criterio de salida.

## Resumen

- **Objetivo del MVP:** Administración de alquileres: inquilinos, cobro mensual, recibos en PDF y avisos de vencimiento.
- **Usuario:** Propietario de 2 a 15 cuartos, departamentos o locales que cobra mensualmente y entrega recibos.
- **Duración estimada:** ~17 días de trabajo efectivo (~4 semanas a ritmo tranquilo).
- **Costo:** $0 (sin servidores, sin suscripciones, todo offline en SQLite).

## Línea de tiempo

| Fase | Nombre | Objetivo | Días | Semana acumulada |
|---|---|---|---|---|
| 1 | Estructura base y navegación | Verificar la base y dejar la navegación y el tema listos. | 2 | 1 |
| 2 | Propiedades e inquilinos | Propiedades e inquilinos con contrato. | 4 | 2 |
| 3 | Pagos y morosos | Pagos por período y control de morosos. | 4 | 2 |
| 4 | Recibos en PDF | Recibos numerados en PDF. | 3 | 3 |
| 5 | Recordatorios y resumen mensual | Recordatorios y resumen mensual. | 4 | 4 |

## Hitos

### Hito 1 — Estructura base y navegación

**Demo:** La app abre en Expo Go, navega entre secciones vacías y el CI pasa en verde.

### Hito 2 — Propiedades e inquilinos

**Demo:** Puedo ocupar y liberar una propiedad sin perder historial.

### Hito 3 — Pagos y morosos

**Demo:** La lista de morosos coincide con 5 casos de prueba (al día, atrasado, parcial, sin pago, contrato vencido).

### Hito 4 — Recibos en PDF

**Demo:** Los recibos salen con numeración correlativa y nunca repetida.

### Hito 5 — Recordatorios y resumen mensual

**Demo:** Las notificaciones se programan y se cancelan correctamente al cambiar datos.

## Detalle por fase

### Fase 1 — Estructura base y navegación

- **Objetivo:** dejar el esqueleto funcionando para construir encima sin fricción.
- **Historias cubiertas:** ninguna (infraestructura).
- **Depende de:** nada.
- **Criterio de salida:** la app abre, navega y el CI está en verde.

### Fase 2 — Propiedades e inquilinos

- **Objetivo:** Propiedades e inquilinos con contrato.
- **Historias cubiertas:** HU-01 Registrar propiedades; HU-02 Registrar inquilinos y contrato
- **Depende de:** fase 1.
- **Duración:** 4 días.
- **Criterio de salida:**
  - Puedo ocupar y liberar una propiedad sin perder historial.

### Fase 3 — Pagos y morosos

- **Objetivo:** Pagos por período y control de morosos.
- **Historias cubiertas:** HU-03 Registrar pagos y ver morosos
- **Depende de:** fase 2.
- **Duración:** 4 días.
- **Criterio de salida:**
  - La lista de morosos coincide con 5 casos de prueba (al día, atrasado, parcial, sin pago, contrato vencido).

### Fase 4 — Recibos en PDF

- **Objetivo:** Recibos numerados en PDF.
- **Historias cubiertas:** HU-04 Emitir recibos en PDF
- **Depende de:** fase 3.
- **Duración:** 3 días.
- **Criterio de salida:**
  - Los recibos salen con numeración correlativa y nunca repetida.

### Fase 5 — Recordatorios y resumen mensual

- **Objetivo:** Recordatorios y resumen mensual.
- **Historias cubiertas:** HU-05 Recibir recordatorios; HU-06 Ver el resumen de ingresos por mes
- **Depende de:** fase 4.
- **Duración:** 4 días.
- **Criterio de salida:**
  - Las notificaciones se programan y se cancelan correctamente al cambiar datos.

## Estado

- [ ] **Fase 1:** Estructura base y navegación
- [ ] **Fase 2:** Propiedades e inquilinos
- [ ] **Fase 3:** Pagos y morosos
- [ ] **Fase 4:** Recibos en PDF
- [ ] **Fase 5:** Recordatorios y resumen mensual

## Dependencias y supuestos

- Un teléfono Android real para probar (Expo Go) y, al final, para instalar el APK.
- Node.js 20+ y la app Expo Go.
- Todo lo demás (cuentas, nube, pagos) queda fuera del MVP.

## Después del MVP (v1.1 en adelante)

- [ ] Modo oscuro.
- [ ] Búsqueda y filtros avanzados en las listas.
- [ ] Estadísticas y gráficos simples en la pantalla de inicio.
- [ ] Publicación en Google Play (cuenta de desarrollador, pago único de USD 25).
- [ ] Respaldo y restauración de la base de datos.
- [ ] Sincronización opcional entre dispositivos (solo si hay demanda real).

## Cómo usar este documento

1. [SPEC.md](SPEC.md) define **qué** debe hacer la app (historias, reglas, pantallas, datos).
2. [PLANNING.md](PLANNING.md) define **cómo** construirla fase por fase (tareas, pruebas, issues).
3. Al cerrar una fase: marcá el estado acá, actualizá el [CHANGELOG](../CHANGELOG.md) y fusioná la rama a `main`.

## Trazabilidad: historias por fase

| Historia | Fase | Entrega |
|---|---|---|
| HU-01 Registrar propiedades | 2 | Propiedades e inquilinos |
| HU-02 Registrar inquilinos y contrato | 2 | Propiedades e inquilinos |
| HU-03 Registrar pagos y ver morosos | 3 | Pagos y morosos |
| HU-04 Emitir recibos en PDF | 4 | Recibos en PDF |
| HU-05 Recibir recordatorios | 5 | Recordatorios y resumen mensual |
| HU-06 Ver el resumen de ingresos por mes | 5 | Recordatorios y resumen mensual |

## Indicadores de avance

| Indicador | Cómo se mide | Meta |
|---|---|---|
| Avance de tareas | Issues cerrados / 36 | 100 % al lanzar |
| Historias aceptadas | Casos CP- marcados ✔ / 11 | 100 % |
| Reglas cubiertas | RN con prueba / 7 | 100 % |
| Ritmo | Días reales vs estimados por fase | Desvío menor al 50 % |
| Calidad | Errores abiertos al cierre de fase | 0 críticos |

## Revisión de fin de fase

Antes de pasar a la siguiente fase respondé por escrito (5 minutos):

1. ¿Se cumplieron todos los criterios de salida?
2. ¿Cuántos días tomó realmente frente a lo estimado?
3. ¿Qué se recortó o se dejó para después?
4. ¿Hay algo que cambie el SPEC? Actualizalo antes de seguir.

## Documentos de apoyo

- [DATOS.md](DATOS.md): campos, validaciones, consultas y migraciones.
- [PANTALLAS.md](PANTALLAS.md): ruta, estados y bosquejo de cada pantalla.
- [PRUEBAS.md](PRUEBAS.md): casos de prueba por regla, historia y borde.
- [BACKLOG.md](BACKLOG.md): issues listos para GitHub con milestones y etiquetas.
