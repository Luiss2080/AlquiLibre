# Plan de pruebas — AlquiLibre

> Qué probar, cuándo y cómo. Cada historia y cada regla de negocio tiene casos concretos. Complementa a [SPEC.md](SPEC.md).

## 1. Estrategia

| Nivel | Herramienta | Qué cubre | Cuándo |
|---|---|---|---|
| Unitarias | jest-expo (`npm test`) | Lógica pura de `src/lib/` (cálculos, validaciones, formatos) | En cada commit (CI) |
| Manuales por historia | Teléfono con Expo Go | Criterios de aceptación de SPEC (casos CP-) | Al cerrar cada tarea de pantalla |
| Regresión por fase | Teléfono real | Lo ya terminado sigue andando | Al cerrar cada fase |
| Aceptación final | APK en teléfono limpio, modo avión | Criterios de lanzamiento | Antes de v1.0.0 |

Meta de cobertura: **100 % de las reglas de negocio** con prueba automática o caso manual, y **100 % de los criterios de aceptación** ejecutados al menos una vez en un teléfono real.

## 2. Pruebas unitarias por regla de negocio

Crear un archivo `src/lib/<tema>.test.ts` por tema. Una prueba por regla como mínimo; agregar los bordes de la sección 4.

| ID | Regla | Tipo de prueba | Casos mínimos |
|---|---|---|---|
| RN-01 | Cada propiedad puede tener un solo inquilino vigente a la vez. | Unitaria o manual | Caso válido, caso inválido, límite |
| RN-02 | El período de un pago es un mes (formato AAAA-MM) y no puede registrarse dos veces completo. | Unitaria (cálculo) | Valor típico, cero, redondeo a 2 decimales, valor grande |
| RN-03 | Un pago puede ser parcial: el saldo del período queda pendiente hasta completar el monto mensual. | Unitaria (cálculo) | Valor típico, cero, redondeo a 2 decimales, valor grande |
| RN-04 | Un inquilino está moroso cuando pasó su día de cobro y el período actual no está completo. | Unitaria (fechas) | Hoy, mañana, fin de mes, año bisiesto |
| RN-05 | Los recibos se numeran de forma correlativa y no se reutilizan. | Unitaria o manual | Caso válido, caso inválido, límite |
| RN-06 | La garantía es informativa: se registra, no se descuenta automáticamente. | Unitaria (cálculo) | Valor típico, cero, redondeo a 2 decimales, valor grande |
| RN-07 | El aviso de vencimiento de contrato se programa 30 y 7 días antes. | Unitaria (fechas) | Hoy, mañana, fin de mes, año bisiesto |

## 3. Casos manuales por historia

Formato: ejecutar en el teléfono, marcar ✔ o ✘ y anotar la fecha. Si falla, abrir un issue con el ID del caso.

### HU-01 — Registrar propiedades (fase 2)

| ID | Dado | Cuando | Entonces | Resultado |
|---|---|---|---|---|
| CP-01-1 | no tengo propiedades | abro la app | veo el estado vacío con «Agregar propiedad» | ☐ |
| CP-01-2 | el formulario de propiedad | ingreso un alquiler negativo | no guarda y avisa el error | ☐ |

Casos transversales: **CP-01-T1** modo avión · **CP-01-T2** cerrar y reabrir la app (persistencia) · **CP-01-T3** texto del sistema en tamaño grande.

### HU-02 — Registrar inquilinos y contrato (fase 2)

| ID | Dado | Cuando | Entonces | Resultado |
|---|---|---|---|---|
| CP-02-1 | una propiedad libre | asigno un inquilino | queda ocupada y aparece en la lista con su día de cobro | ☐ |
| CP-02-2 | una propiedad ocupada | intento asignar otro inquilino | la app pide dar de baja al actual primero | ☐ |

Casos transversales: **CP-02-T1** modo avión · **CP-02-T2** cerrar y reabrir la app (persistencia) · **CP-02-T3** texto del sistema en tamaño grande.

### HU-03 — Registrar pagos y ver morosos (fase 3)

| ID | Dado | Cuando | Entonces | Resultado |
|---|---|---|---|---|
| CP-03-1 | un inquilino con día de cobro 5 | es día 8 y no hay pago del mes | aparece en «Morosos» con los días de atraso | ☐ |
| CP-03-2 | pago parcial de 300 de 500 Bs | lo registro | el período queda con saldo 200 Bs pendiente | ☐ |

Casos transversales: **CP-03-T1** modo avión · **CP-03-T2** cerrar y reabrir la app (persistencia) · **CP-03-T3** texto del sistema en tamaño grande.

### HU-04 — Emitir recibos en PDF (fase 4)

| ID | Dado | Cuando | Entonces | Resultado |
|---|---|---|---|---|
| CP-04-1 | un pago registrado | toco «Recibo» | se genera un PDF con número correlativo, fecha, inquilino, propiedad, período y monto | ☐ |
| CP-04-2 | dos recibos del mismo día | los emito | tienen números distintos y consecutivos | ☐ |

Casos transversales: **CP-04-T1** modo avión · **CP-04-T2** cerrar y reabrir la app (persistencia) · **CP-04-T3** texto del sistema en tamaño grande.

### HU-05 — Recibir recordatorios (fase 5)

| ID | Dado | Cuando | Entonces | Resultado |
|---|---|---|---|---|
| CP-05-1 | un contrato que vence en 30 días | llega la fecha del aviso | recibo una notificación local con inquilino y fecha | ☐ |
| CP-05-2 | permiso de notificaciones denegado | abro Ajustes | veo cómo activarlo y la app sigue funcionando | ☐ |

Casos transversales: **CP-05-T1** modo avión · **CP-05-T2** cerrar y reabrir la app (persistencia) · **CP-05-T3** texto del sistema en tamaño grande.

### HU-06 — Ver el resumen de ingresos por mes (fase 5)

| ID | Dado | Cuando | Entonces | Resultado |
|---|---|---|---|---|
| CP-06-1 | pagos de tres meses | abro Resumen | veo cobrado, pendiente y morosos por mes | ☐ |

Casos transversales: **CP-06-T1** modo avión · **CP-06-T2** cerrar y reabrir la app (persistencia) · **CP-06-T3** texto del sistema en tamaño grande.

## 4. Casos borde

| ID | Caso | Resultado esperado | Resultado |
|---|---|---|---|
| CB-01 | Contrato sin fecha de fin (indefinido): no genera aviso de vencimiento. | La app no se rompe; el mensaje o comportamiento es claro y no se pierden datos | ☐ |
| CB-02 | Día de cobro 31 en meses cortos: se usa el último día del mes. | La app no se rompe; el mensaje o comportamiento es claro y no se pierden datos | ☐ |
| CB-03 | Pago adelantado de varios meses: se registra un pago por período. | La app no se rompe; el mensaje o comportamiento es claro y no se pierden datos | ☐ |
| CB-04 | Cambio de alquiler a mitad de contrato: aplica al próximo período. | La app no se rompe; el mensaje o comportamiento es claro y no se pierden datos | ☐ |

## 5. Pruebas de datos y migraciones

| ID | Prueba | Esperado |
|---|---|---|
| CD-01 | Primer arranque en teléfono limpio | La base se crea con todas las tablas y `user_version` queda en 1 |
| CD-02 | Actualizar de una versión anterior con datos cargados | Las migraciones nuevas se aplican y no se pierde ningún registro |
| CD-03 | Borrar un registro padre | Los hijos se borran o se bloquea con mensaje, según el esquema |
| CD-04 | Intentar guardar con campos obligatorios vacíos | No se inserta nada y se marcan los campos |
| CD-05 | Cargar 1.000 registros de prueba | Las listas siguen fluidas (scroll sin trabas) y abren en menos de 2 s |

## 6. Regresión al cerrar cada fase

**Fase 1 — Estructura base y navegación**

- [ ] La app abre y navega sin errores

**Fase 2 — Propiedades e inquilinos**

- [ ] Puedo ocupar y liberar una propiedad sin perder historial.
- [ ] Los criterios de las fases anteriores siguen funcionando

**Fase 3 — Pagos y morosos**

- [ ] La lista de morosos coincide con 5 casos de prueba (al día, atrasado, parcial, sin pago, contrato vencido).
- [ ] Los criterios de las fases anteriores siguen funcionando

**Fase 4 — Recibos en PDF**

- [ ] Los recibos salen con numeración correlativa y nunca repetida.
- [ ] Los criterios de las fases anteriores siguen funcionando

**Fase 5 — Recordatorios y resumen mensual**

- [ ] Las notificaciones se programan y se cancelan correctamente al cambiar datos.
- [ ] Los criterios de las fases anteriores siguen funcionando

## 7. Matriz de dispositivos

| Dispositivo | Android | Qué se verifica |
|---|---|---|
| Gama baja (2–3 GB de RAM) | 8–10 | Fluidez de listas, tiempo de arranque |
| Gama media | 11–13 | Flujo completo y APK |
| Pantalla pequeña (5") | cualquiera | Que nada quede cortado ni oculto por el teclado |
| Texto del sistema grande | cualquiera | Que los formularios sigan siendo usables |

## 8. Lista de verificación para el lanzamiento (v1.0.0)

- [ ] Todas las historias ejecutadas en teléfono real (casos CP-)
- [ ] Todos los casos borde (CB-) ejecutados
- [ ] Pruebas de datos (CD-) ejecutadas
- [ ] APK instalado en un teléfono limpio sin Expo Go
- [ ] Probado en modo avión durante todo el flujo principal
- [ ] Rotación de pantalla no pierde datos del formulario
- [ ] Permisos solicitados solo cuando se necesitan y con explicación
- [ ] Sin errores en la consola durante un recorrido completo
- [ ] README con capturas y CHANGELOG al día

## 9. Informe de errores

```
Título: [Bug] <qué pasó>
ID de caso: CP-XX-X
Pasos: 1... 2... 3...
Esperado: ...
Obtenido: ...
Dispositivo / Android: ...
Captura o video: ...
```
