# Backlog de issues — AlquiLibre

> Lista lista para pasar a GitHub Issues, con milestones, etiquetas, estimaciones y trazabilidad a las historias. Se puede crear todo de una vez con [crear-issues.sh](crear-issues.sh).

## 1. Milestones

| Milestone | Fase | Días | Tareas | Horas est. |
|---|---|---|---|---|
| Fase 1 — Estructura base y navegación | 1 | 2 | 6 | 12 |
| Fase 2 — Propiedades e inquilinos | 2 | 4 | 8 | 24 |
| Fase 3 — Pagos y morosos | 3 | 4 | 8 | 24 |
| Fase 4 — Recibos en PDF | 4 | 3 | 7 | 17.5 |
| Fase 5 — Recordatorios y resumen mensual | 5 | 4 | 7 | 24.5 |

Total: **36 tareas**, ~102 horas (17 días a 6 horas efectivas).

## 2. Etiquetas

| Etiqueta | Uso |
|---|---|
| ui | Pantallas y componentes |
| datos | Tablas, consultas y migraciones |
| lógica | Reglas de negocio y cálculos |
| pruebas | Pruebas automáticas y manuales |
| integración | Cámara, notificaciones, PDF, compartir |
| tarea | Otras tareas |
| bug | Errores |
| mejora | Ideas para v1.1+ |

## 3. Issues del MVP

### Fase 1 — Estructura base y navegación

| ID | Título | Historias | Etiquetas | Prioridad | Horas |
|---|---|---|---|---|---|
| `F1-T1` | Instalar dependencias y abrir la app en Expo Go | — | tarea | Alta | 2 |
| `F1-T2` | Verificar creación y migración de la base | — | datos | Alta | 2 |
| `F1-T3` | Definir la navegación principal | — | ui | Alta | 2 |
| `F1-T4` | Aplicar tema y componente Pantalla | — | ui | Alta | 2 |
| `F1-T5` | Pantalla de inicio con accesos | — | ui | Alta | 2 |
| `F1-T6` | Confirmar CI en verde | — | tarea | Alta | 2 |

### Fase 2 — Propiedades e inquilinos

| ID | Título | Historias | Etiquetas | Prioridad | Horas |
|---|---|---|---|---|---|
| `F2-T1` | Consultas de propiedades e inquilinos. | HU-01, HU-02 | datos | Alta | 3 |
| `F2-T2` | Regla de un inquilino vigente por propiedad (validación en la capa de datos). | HU-01, HU-02 | lógica | Alta | 3 |
| `F2-T3` | Pantallas de lista y formulario con estados vacíos. | HU-01, HU-02 | ui | Alta | 3 |
| `F2-T4` | Baja de inquilino conservando su historial. | HU-01, HU-02 | tarea | Alta | 3 |
| `F2-T5` | Pruebas de validación. | HU-01, HU-02 | lógica, pruebas | Alta | 3 |
| `F2-T6` | Validaciones, estados vacíos y mensajes en español | HU-01, HU-02 | lógica | Alta | 3 |
| `F2-T7` | Pruebas automáticas y verificación manual de criterios | HU-01, HU-02 | pruebas | Alta | 3 |
| `F2-T8` | Prueba en teléfono real en modo avión; actualizar ROADMAP y CHANGELOG | HU-01, HU-02 | pruebas | Alta | 3 |

### Fase 3 — Pagos y morosos

| ID | Título | Historias | Etiquetas | Prioridad | Horas |
|---|---|---|---|---|---|
| `F3-T1` | Registro de pagos con período AAAA-MM y pagos parciales. | HU-03 | tarea | Alta | 3 |
| `F3-T2` | Función pura de saldo y morosidad por inquilino, con pruebas. | HU-03 | lógica, pruebas | Alta | 3 |
| `F3-T3` | Pantalla Morosos con días de atraso. | HU-03 | ui | Alta | 3 |
| `F3-T4` | Historial de pagos por propiedad. | HU-03 | tarea | Alta | 3 |
| `F3-T5` | Validación contra pagos duplicados del mismo período completo. | HU-03 | lógica | Alta | 3 |
| `F3-T6` | Validaciones, estados vacíos y mensajes en español | HU-03 | lógica | Alta | 3 |
| `F3-T7` | Pruebas automáticas y verificación manual de criterios | HU-03 | pruebas | Alta | 3 |
| `F3-T8` | Prueba en teléfono real en modo avión; actualizar ROADMAP y CHANGELOG | HU-03 | pruebas | Alta | 3 |

### Fase 4 — Recibos en PDF

| ID | Título | Historias | Etiquetas | Prioridad | Horas |
|---|---|---|---|---|---|
| `F4-T1` | Número correlativo = MAX(recibo_nro) + 1 calculado dentro de la misma transacción que guarda el pago. | HU-04 | lógica | Media | 2.5 |
| `F4-T2` | Plantilla HTML del recibo para expo-print. | HU-04 | tarea | Media | 2.5 |
| `F4-T3` | Compartir por WhatsApp o menú del sistema con expo-sharing. | HU-04 | integración | Media | 2.5 |
| `F4-T4` | Reimpresión de un recibo con el mismo número. | HU-04 | tarea | Media | 2.5 |
| `F4-T5` | Validaciones, estados vacíos y mensajes en español | HU-04 | lógica | Media | 2.5 |
| `F4-T6` | Pruebas automáticas y verificación manual de criterios | HU-04 | pruebas | Media | 2.5 |
| `F4-T7` | Prueba en teléfono real en modo avión; actualizar ROADMAP y CHANGELOG | HU-04 | pruebas | Media | 2.5 |

### Fase 5 — Recordatorios y resumen mensual

| ID | Título | Historias | Etiquetas | Prioridad | Horas |
|---|---|---|---|---|---|
| `F5-T1` | Notificaciones locales de cobro (día de cobro) y de vencimiento (30 y 7 días antes). | HU-05, HU-06 | integración | Media | 3.5 |
| `F5-T2` | Reprogramar notificaciones al editar o dar de baja un inquilino. | HU-05, HU-06 | integración | Media | 3.5 |
| `F5-T3` | Pantalla Resumen mensual con cobrado, esperado y morosos. | HU-05, HU-06 | ui | Media | 3.5 |
| `F5-T4` | Pantalla Ajustes: permisos de notificación y plantilla de mensaje. | HU-05, HU-06 | ui, integración | Media | 3.5 |
| `F5-T5` | Validaciones, estados vacíos y mensajes en español | HU-05, HU-06 | lógica | Media | 3.5 |
| `F5-T6` | Pruebas automáticas y verificación manual de criterios | HU-05, HU-06 | pruebas | Media | 3.5 |
| `F5-T7` | Prueba en teléfono real en modo avión; actualizar ROADMAP y CHANGELOG | HU-05, HU-06 | pruebas | Media | 3.5 |

## 4. Orden recomendado de ataque

1. Terminá cada fase completa antes de abrir la siguiente; dentro de la fase, de arriba hacia abajo.
2. Las tareas `lógica` y `datos` van antes que las `ui` que las usan.
3. Cada issue se cierra con un commit o PR que lo mencione (`Cierra #N`).
4. Nada de abrir issues de v1.1 hasta tener el APK de la v1.0.0.

## 5. Ideas para después del MVP

| Idea | Esfuerzo | Valor |
|---|---|---|
| Modo oscuro | Bajo | Medio |
| Búsqueda y filtros avanzados | Medio | Alto |
| Estadísticas y gráficos simples en inicio | Medio | Medio |
| Respaldo y restauración de la base | Medio | Alto |
| Publicación en Google Play | Bajo | Alto |
| Sincronización opcional entre dispositivos | Alto | Depende de demanda |
