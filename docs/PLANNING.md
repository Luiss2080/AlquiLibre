# Plan de desarrollo — AlquiLibre

Guía para construir el MVP **fase por fase**. Complementa a [ROADMAP.md](ROADMAP.md) (qué y cuándo) y [SPEC.md](SPEC.md) (qué debe hacer la app).

## Forma de trabajo

1. **Una fase por rama:** `git checkout -b fase-N-nombre`.
2. **Un issue por tarea** (usá los títulos de abajo) y un milestone por fase en GitHub.
3. **Commits chicos** con prefijo: `feat:`, `fix:`, `test:`, `docs:`, `chore:`.
4. **Pull request al cerrar la fase** con la lista de criterios de salida marcada.
5. **Primero la lógica pura y sus pruebas** (en `src/lib/`), después la pantalla que la usa.
6. **Probá en el teléfono** al terminar cada tarea de pantalla, no solo al final de la fase.

### Definición de «terminado» (vale para toda tarea y fase)

- [ ] `npm run lint`, `npx tsc --noEmit` y `npm test` sin errores.
- [ ] Funciona en modo avión.
- [ ] Estados vacíos, de carga y de error resueltos, con textos en español.
- [ ] Los datos persisten al reiniciar la app.
- [ ] La regla de negocio correspondiente tiene prueba o verificación manual anotada.
- [ ] CHANGELOG actualizado al cerrar la fase.

## Calendario sugerido

| Fase | Nombre | Días | Acumulado |
|---|---|---|---|
| 1 | Estructura base y navegación | 2 | 2 |
| 2 | Propiedades e inquilinos | 4 | 6 |
| 3 | Pagos y morosos | 4 | 10 |
| 4 | Recibos en PDF | 3 | 13 |
| 5 | Recordatorios y resumen mensual | 4 | 17 |

Total: **17 días** (~4 semanas). Si una fase se pasa del doble de lo estimado, recortá alcance dentro de la fase en lugar de saltar a la siguiente.

---

## Fase 1 — Estructura base y navegación

**Estimación:** 2 días.

**Objetivo:** dejar el esqueleto funcionando para construir encima sin fricción. La estructura ya viene en el repositorio.

**Tareas**

- [ ] **F1-T1** `npm install` y `npx expo start`: la app abre en Expo Go.
- [ ] **F1-T2** Revisar `src/db/schema.ts`: la base se crea y migra sola al primer arranque (verificar en el teléfono).
- [ ] **F1-T3** Definir la navegación principal en `app/_layout.tsx` (inicio + una sección por entidad).
- [ ] **F1-T4** Aplicar el tema de `src/theme.ts` y el componente `Pantalla` a todas las rutas.
- [ ] **F1-T5** Pantalla de inicio con tarjetas de acceso a cada sección.
- [ ] **F1-T6** Confirmar que el CI de GitHub Actions pasa en verde.

**Criterio de salida:** la app abre, navega entre secciones vacías y no da errores; lint, tipos y tests en verde.

---

## Fase 2 — Propiedades e inquilinos

**Estimación:** 4 días. **Rama sugerida:** `fase-2-propiedades-e-inquilinos`.

**Objetivo:** Propiedades e inquilinos con contrato.

**Historias que se completan:** HU-01 (Registrar propiedades), HU-02 (Registrar inquilinos y contrato).

**Tareas**

- [ ] **F2-T1** Consultas de propiedades e inquilinos.
- [ ] **F2-T2** Regla de un inquilino vigente por propiedad (validación en la capa de datos).
- [ ] **F2-T3** Pantallas de lista y formulario con estados vacíos.
- [ ] **F2-T4** Baja de inquilino conservando su historial.
- [ ] **F2-T5** Pruebas de validación.
- [ ] **F2-T6** Validaciones, estados vacíos y mensajes de error en español para todo lo nuevo.
- [ ] **F2-T7** Pruebas automáticas de la lógica de la fase y verificación manual de los criterios de abajo.
- [ ] **F2-T8** Probar en un teléfono real en modo avión; actualizar ROADMAP y CHANGELOG.

**Pruebas de aceptación manuales** (de [SPEC.md](SPEC.md)):

- [ ] HU-01 — no tengo propiedades → abro la app → veo el estado vacío con «Agregar propiedad».
- [ ] HU-01 — el formulario de propiedad → ingreso un alquiler negativo → no guarda y avisa el error.
- [ ] HU-02 — una propiedad libre → asigno un inquilino → queda ocupada y aparece en la lista con su día de cobro.
- [ ] HU-02 — una propiedad ocupada → intento asignar otro inquilino → la app pide dar de baja al actual primero.

**Criterio de salida:**

- [ ] Puedo ocupar y liberar una propiedad sin perder historial.
- [ ] Definición de «terminado» cumplida.

---

## Fase 3 — Pagos y morosos

**Estimación:** 4 días. **Rama sugerida:** `fase-3-pagos-y-morosos`.

**Objetivo:** Pagos por período y control de morosos.

**Historias que se completan:** HU-03 (Registrar pagos y ver morosos).

**Tareas**

- [ ] **F3-T1** Registro de pagos con período AAAA-MM y pagos parciales.
- [ ] **F3-T2** Función pura de saldo y morosidad por inquilino, con pruebas.
- [ ] **F3-T3** Pantalla Morosos con días de atraso.
- [ ] **F3-T4** Historial de pagos por propiedad.
- [ ] **F3-T5** Validación contra pagos duplicados del mismo período completo.
- [ ] **F3-T6** Validaciones, estados vacíos y mensajes de error en español para todo lo nuevo.
- [ ] **F3-T7** Pruebas automáticas de la lógica de la fase y verificación manual de los criterios de abajo.
- [ ] **F3-T8** Probar en un teléfono real en modo avión; actualizar ROADMAP y CHANGELOG.

**Pruebas de aceptación manuales** (de [SPEC.md](SPEC.md)):

- [ ] HU-03 — un inquilino con día de cobro 5 → es día 8 y no hay pago del mes → aparece en «Morosos» con los días de atraso.
- [ ] HU-03 — pago parcial de 300 de 500 Bs → lo registro → el período queda con saldo 200 Bs pendiente.

**Criterio de salida:**

- [ ] La lista de morosos coincide con 5 casos de prueba (al día, atrasado, parcial, sin pago, contrato vencido).
- [ ] Definición de «terminado» cumplida.

---

## Fase 4 — Recibos en PDF

**Estimación:** 3 días. **Rama sugerida:** `fase-4-recibos-en-pdf`.

**Objetivo:** Recibos numerados en PDF.

**Historias que se completan:** HU-04 (Emitir recibos en PDF).

**Tareas**

- [ ] **F4-T1** Número correlativo = MAX(recibo_nro) + 1 calculado dentro de la misma transacción que guarda el pago.
- [ ] **F4-T2** Plantilla HTML del recibo para expo-print.
- [ ] **F4-T3** Compartir por WhatsApp o menú del sistema con expo-sharing.
- [ ] **F4-T4** Reimpresión de un recibo con el mismo número.
- [ ] **F4-T5** Validaciones, estados vacíos y mensajes de error en español para todo lo nuevo.
- [ ] **F4-T6** Pruebas automáticas de la lógica de la fase y verificación manual de los criterios de abajo.
- [ ] **F4-T7** Probar en un teléfono real en modo avión; actualizar ROADMAP y CHANGELOG.

**Pruebas de aceptación manuales** (de [SPEC.md](SPEC.md)):

- [ ] HU-04 — un pago registrado → toco «Recibo» → se genera un PDF con número correlativo, fecha, inquilino, propiedad, período y monto.
- [ ] HU-04 — dos recibos del mismo día → los emito → tienen números distintos y consecutivos.

**Criterio de salida:**

- [ ] Los recibos salen con numeración correlativa y nunca repetida.
- [ ] Definición de «terminado» cumplida.

---

## Fase 5 — Recordatorios y resumen mensual

**Estimación:** 4 días. **Rama sugerida:** `fase-5-recordatorios-y-resumen-mensual`.

**Objetivo:** Recordatorios y resumen mensual.

**Historias que se completan:** HU-05 (Recibir recordatorios), HU-06 (Ver el resumen de ingresos por mes).

**Tareas**

- [ ] **F5-T1** Notificaciones locales de cobro (día de cobro) y de vencimiento (30 y 7 días antes).
- [ ] **F5-T2** Reprogramar notificaciones al editar o dar de baja un inquilino.
- [ ] **F5-T3** Pantalla Resumen mensual con cobrado, esperado y morosos.
- [ ] **F5-T4** Pantalla Ajustes: permisos de notificación y plantilla de mensaje.
- [ ] **F5-T5** Validaciones, estados vacíos y mensajes de error en español para todo lo nuevo.
- [ ] **F5-T6** Pruebas automáticas de la lógica de la fase y verificación manual de los criterios de abajo.
- [ ] **F5-T7** Probar en un teléfono real en modo avión; actualizar ROADMAP y CHANGELOG.

**Pruebas de aceptación manuales** (de [SPEC.md](SPEC.md)):

- [ ] HU-05 — un contrato que vence en 30 días → llega la fecha del aviso → recibo una notificación local con inquilino y fecha.
- [ ] HU-05 — permiso de notificaciones denegado → abro Ajustes → veo cómo activarlo y la app sigue funcionando.
- [ ] HU-06 — pagos de tres meses → abro Resumen → veo cobrado, pendiente y morosos por mes.

**Criterio de salida:**

- [ ] Las notificaciones se programan y se cancelan correctamente al cambiar datos.
- [ ] Definición de «terminado» cumplida.

---

## Lanzamiento del MVP (v1.0.0)

- [ ] Revisar todas las historias de [SPEC.md](SPEC.md) y marcar sus criterios.
- [ ] Capturas de pantalla para el README.
- [ ] Revisar textos, íconos y nombre de la app en `app.json`.
- [ ] `npm run build:apk` y probar el APK en un teléfono limpio, sin Expo Go y en modo avión.
- [ ] Publicar el release v1.0.0 con el APK adjunto.
- [ ] Pasar las ideas pendientes a issues para la versión 1.1.

## Plantilla de issue

Copiá esto al crear cada issue:

```
Título: [F2-T1] <descripción de la tarea>
Fase: N — <nombre>
Historia: HU-XX
Criterios:
- [ ] ...
Notas técnicas: ...
```

---

## Cronograma día por día

Guía para no perder el hilo: cada día tiene tareas concretas. Si un día se atrasa, mové la tarea al siguiente, no la saltees.

### Fase 1 — Estructura base y navegación

- **Día 1** (día 1 de la fase): `F1-T1` Instalar dependencias y abrir la app en Expo Go; `F1-T2` Verificar creación y migración de la base; `F1-T3` Definir la navegación principal.
- **Día 2** (día 2 de la fase): `F1-T4` Aplicar tema y componente Pantalla; `F1-T5` Pantalla de inicio con accesos; `F1-T6` Confirmar CI en verde.

### Fase 2 — Propiedades e inquilinos

- **Día 3** (día 1 de la fase): `F2-T1` Consultas de propiedades e inquilinos.; `F2-T2` Regla de un inquilino vigente por propiedad (validación en la capa de datos)..
- **Día 4** (día 2 de la fase): `F2-T3` Pantallas de lista y formulario con estados vacíos.; `F2-T4` Baja de inquilino conservando su historial..
- **Día 5** (día 3 de la fase): `F2-T5` Pruebas de validación.; `F2-T6` Validaciones, estados vacíos y mensajes en español.
- **Día 6** (día 4 de la fase): `F2-T7` Pruebas automáticas y verificación manual de criterios; `F2-T8` Prueba en teléfono real en modo avión; actualizar ROADMAP y CHANGELOG.

### Fase 3 — Pagos y morosos

- **Día 7** (día 1 de la fase): `F3-T1` Registro de pagos con período AAAA-MM y pagos parciales.; `F3-T2` Función pura de saldo y morosidad por inquilino, con pruebas..
- **Día 8** (día 2 de la fase): `F3-T3` Pantalla Morosos con días de atraso.; `F3-T4` Historial de pagos por propiedad..
- **Día 9** (día 3 de la fase): `F3-T5` Validación contra pagos duplicados del mismo período completo.; `F3-T6` Validaciones, estados vacíos y mensajes en español.
- **Día 10** (día 4 de la fase): `F3-T7` Pruebas automáticas y verificación manual de criterios; `F3-T8` Prueba en teléfono real en modo avión; actualizar ROADMAP y CHANGELOG.

### Fase 4 — Recibos en PDF

- **Día 11** (día 1 de la fase): `F4-T1` Número correlativo = MAX(recibo_nro) + 1 calculado dentro de la misma transacción que guarda el pago.; `F4-T2` Plantilla HTML del recibo para expo-print.; `F4-T3` Compartir por WhatsApp o menú del sistema con expo-sharing..
- **Día 12** (día 2 de la fase): `F4-T4` Reimpresión de un recibo con el mismo número.; `F4-T5` Validaciones, estados vacíos y mensajes en español; `F4-T6` Pruebas automáticas y verificación manual de criterios.
- **Día 13** (día 3 de la fase): `F4-T7` Prueba en teléfono real en modo avión; actualizar ROADMAP y CHANGELOG.

### Fase 5 — Recordatorios y resumen mensual

- **Día 14** (día 1 de la fase): `F5-T1` Notificaciones locales de cobro (día de cobro) y de vencimiento (30 y 7 días antes).; `F5-T2` Reprogramar notificaciones al editar o dar de baja un inquilino..
- **Día 15** (día 2 de la fase): `F5-T3` Pantalla Resumen mensual con cobrado, esperado y morosos.; `F5-T4` Pantalla Ajustes: permisos de notificación y plantilla de mensaje..
- **Día 16** (día 3 de la fase): `F5-T5` Validaciones, estados vacíos y mensajes en español; `F5-T6` Pruebas automáticas y verificación manual de criterios.
- **Día 17** (día 4 de la fase): `F5-T7` Prueba en teléfono real en modo avión; actualizar ROADMAP y CHANGELOG.

## Rutina diaria

1. Empezá releyendo la tarea del día en [BACKLOG.md](BACKLOG.md) y su regla o historia en [SPEC.md](SPEC.md).
2. Escribí primero la prueba de la lógica, después el código.
3. Probá en el teléfono antes de hacer commit.
4. Cerrá el día con un commit, el issue marcado y una línea en el CHANGELOG si corresponde.

## Qué hacer si te trabás

- Más de 2 horas sin avanzar: simplificá la tarea al caso mínimo y anotá lo que quedó fuera como issue `mejora`.
- Duda de alcance: la respuesta está en la sección 2 del [SPEC](SPEC.md); si no está, no entra al MVP.
- Duda de datos o validaciones: [DATOS.md](DATOS.md).
- Duda de pantallas: [PANTALLAS.md](PANTALLAS.md).
- Duda de cómo probar: [PRUEBAS.md](PRUEBAS.md).
