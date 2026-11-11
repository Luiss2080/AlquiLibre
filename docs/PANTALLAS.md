# Pantallas y flujos — AlquiLibre

> Guía de interfaz para construir cada pantalla: ruta, contenido, estados y bosquejo. Complementa la sección 5 de [SPEC.md](SPEC.md).

## 1. Mapa de rutas

| Pantalla | Archivo (Expo Router) | Tipo |
|---|---|---|
| Inicio | `app/index.tsx` | Inicio |
| Propiedades | `app/propiedades.tsx` | Lista / vista |
| Detalle de propiedad | `app/detalle-de-propiedad.tsx` | Detalle |
| Formulario de inquilino | `app/formulario-de-inquilino.tsx` | Formulario |
| Registrar pago | `app/registrar-pago.tsx` | Lista / vista |
| Morosos | `app/morosos.tsx` | Lista / vista |
| Resumen mensual | `app/resumen-mensual.tsx` | Detalle |

**Convenciones de interfaz**

- Una acción principal por pantalla, en un botón grande abajo o en un botón flotante.
- Los formularios se abren como pantalla completa, validan al enviar y muestran el error junto al campo.
- Toda lista tiene estado vacío con una frase y un botón que lleva a la acción.
- Las acciones que borran piden confirmación explícita con el nombre del registro.
- El botón atrás nunca pierde datos sin avisar: si el formulario tiene cambios, se pregunta antes de salir.
- Textos en español de Bolivia (voseo opcional, siempre claros); montos como `Bs 1.250,00`.

## 2. Detalle por pantalla

### 2.1 Inicio

- **Archivo:** `app/index.tsx`
- **Qué muestra:** Cobrado del mes, pendiente, morosos y próximos vencimientos
- **Acciones:** Registrar pago, ver morosos

**Bosquejo**

```
┌──────────────────────────────┐
│ AlquiLibre                   │
├──────────────────────────────┤
│ [ Resumen y alertas ]        │
│                              │
│  ▸ Propiedades              │
│  ▸ Detalle de propiedad     │
│  ▸ Registrar pago           │
│  ▸ Morosos                  │
│                              │
└──────────────────────────────┘
```

**Estados**

| Estado | Qué ve el usuario |
|---|---|
| Cargando | Indicador breve; la base es local, rara vez se nota |
| Vacío | Todavía no hay información para mostrar. |
| Con datos | Cobrado del mes, pendiente, morosos y próximos vencimientos |
| Error | Mensaje «No se pudo guardar/cargar. Intentá de nuevo» con botón de reintento; el error técnico va a la consola |
| Sin cambios (formularios) | El botón guardar queda deshabilitado hasta que haya cambios válidos |

**Accesibilidad:** cada botón con `accessibilityLabel`, áreas táctiles de 48 px o más, no depender solo del color para indicar estado.

### 2.2 Propiedades

- **Archivo:** `app/propiedades.tsx`
- **Qué muestra:** Lista con estado (libre u ocupada) y alquiler
- **Acciones:** Crear, editar
- **Historias relacionadas:** HU-01 (sugerido por coincidencia de temas; confirmar al construir).

**Bosquejo**

```
┌──────────────────────────────┐
│ ←  Propiedades                 │
├──────────────────────────────┤
│ nombre · monto_mensual       │
│ nombre · monto_mensual       │
│ nombre · monto_mensual       │
│                              │
│                         (+)  │
└──────────────────────────────┘
```

**Estados**

| Estado | Qué ve el usuario |
|---|---|
| Cargando | Indicador breve; la base es local, rara vez se nota |
| Vacío | Todavía no hay propiedades. Tocá «Crear» para empezar. |
| Con datos | Lista con estado (libre u ocupada) y alquiler |
| Error | Mensaje «No se pudo guardar/cargar. Intentá de nuevo» con botón de reintento; el error técnico va a la consola |
| Sin cambios (formularios) | El botón guardar queda deshabilitado hasta que haya cambios válidos |

**Accesibilidad:** cada botón con `accessibilityLabel`, áreas táctiles de 48 px o más, no depender solo del color para indicar estado.

### 2.3 Detalle de propiedad

- **Archivo:** `app/detalle-de-propiedad.tsx`
- **Qué muestra:** Inquilino actual, historial de pagos, garantía
- **Acciones:** Asignar o dar de baja inquilino
- **Historias relacionadas:** HU-01, HU-02, HU-03 (sugerido por coincidencia de temas; confirmar al construir).

**Bosquejo**

```
┌──────────────────────────────┐
│ ←  Detalle de propiedad        │
├──────────────────────────────┤
│ nombre                       │
│ Resumen / totales            │
├──────────────────────────────┤
│ • registro 1                 │
│ • registro 2                 │
│ • registro 3                 │
│                         (+)  │
└──────────────────────────────┘
```

**Estados**

| Estado | Qué ve el usuario |
|---|---|
| Cargando | Indicador breve; la base es local, rara vez se nota |
| Vacío | Todavía no hay propiedades. Tocá «Asignar o dar de baja inquilino» para empezar. |
| Con datos | Inquilino actual, historial de pagos, garantía |
| Error | Mensaje «No se pudo guardar/cargar. Intentá de nuevo» con botón de reintento; el error técnico va a la consola |
| Sin cambios (formularios) | El botón guardar queda deshabilitado hasta que haya cambios válidos |

**Accesibilidad:** cada botón con `accessibilityLabel`, áreas táctiles de 48 px o más, no depender solo del color para indicar estado.

### 2.4 Formulario de inquilino

- **Archivo:** `app/formulario-de-inquilino.tsx`
- **Qué muestra:** Nombre, teléfono, día de cobro, fecha de ingreso, fin de contrato
- **Acciones:** Guardar
- **Historias relacionadas:** HU-02, HU-05, HU-06 (sugerido por coincidencia de temas; confirmar al construir).

**Campos del formulario**

| Campo | Control | Obligatorio | Validación |
|---|---|---|---|
| propiedad id | Selector de propiedades | No | Debe existir en `propiedades` |
| nombre | Texto | Sí | Texto de 1 a 80 caracteres sin espacios sobrantes |
| telefono | Teléfono | No | Solo dígitos, 7 a 15 caracteres (se ignoran espacios y guiones) |
| dia cobro | Numérico entero | Sí | Entero mayor o igual a 0 |
| fecha ingreso | Fecha | No | Fecha real en formato AAAA-MM-DD |
| garantia | Numérico decimal | Sí | Mayor o igual a 0; Hasta 2 decimales |

**Bosquejo**

```
┌──────────────────────────────┐
│ ←  Formulario de inquilino     │
├──────────────────────────────┤
│ propiedad id                 │
│ [____________________]       │
│ nombre                       │
│ [____________________]       │
│ telefono                     │
│ [____________________]       │
│ dia cobro                    │
│ [____________________]       │
│ fecha ingreso                │
│ [____________________]       │
│                              │
│ [        Guardar        ]    │
└──────────────────────────────┘
```

**Estados**

| Estado | Qué ve el usuario |
|---|---|
| Cargando | Indicador breve; la base es local, rara vez se nota |
| Vacío | Todavía no hay inquilinos. Tocá «Guardar» para empezar. |
| Con datos | Nombre, teléfono, día de cobro, fecha de ingreso, fin de contrato |
| Error | Mensaje «No se pudo guardar/cargar. Intentá de nuevo» con botón de reintento; el error técnico va a la consola |
| Sin cambios (formularios) | El botón guardar queda deshabilitado hasta que haya cambios válidos |

**Accesibilidad:** cada botón con `accessibilityLabel`, áreas táctiles de 48 px o más, no depender solo del color para indicar estado.

### 2.5 Registrar pago

- **Archivo:** `app/registrar-pago.tsx`
- **Qué muestra:** Período, monto, fecha, nota
- **Acciones:** Guardar y emitir recibo
- **Historias relacionadas:** HU-01, HU-02, HU-03, HU-04, HU-05 (sugerido por coincidencia de temas; confirmar al construir).

**Bosquejo**

```
┌──────────────────────────────┐
│ ←  Registrar pago              │
├──────────────────────────────┤
│ periodo · inquilino_id       │
│ periodo · inquilino_id       │
│ periodo · inquilino_id       │
│                              │
│                         (+)  │
└──────────────────────────────┘
```

**Estados**

| Estado | Qué ve el usuario |
|---|---|
| Cargando | Indicador breve; la base es local, rara vez se nota |
| Vacío | Todavía no hay pagos. Tocá «Guardar y emitir recibo» para empezar. |
| Con datos | Período, monto, fecha, nota |
| Error | Mensaje «No se pudo guardar/cargar. Intentá de nuevo» con botón de reintento; el error técnico va a la consola |
| Sin cambios (formularios) | El botón guardar queda deshabilitado hasta que haya cambios válidos |

**Accesibilidad:** cada botón con `accessibilityLabel`, áreas táctiles de 48 px o más, no depender solo del color para indicar estado.

### 2.6 Morosos

- **Archivo:** `app/morosos.tsx`
- **Qué muestra:** Inquilinos atrasados con días de atraso y saldo
- **Acciones:** Cobrar por WhatsApp
- **Historias relacionadas:** HU-02, HU-03, HU-04 (sugerido por coincidencia de temas; confirmar al construir).

**Bosquejo**

```
┌──────────────────────────────┐
│ ←  Morosos                     │
├──────────────────────────────┤
│ nombre · fecha               │
│ nombre · fecha               │
│ nombre · fecha               │
│                              │
│                         (+)  │
└──────────────────────────────┘
```

**Estados**

| Estado | Qué ve el usuario |
|---|---|
| Cargando | Indicador breve; la base es local, rara vez se nota |
| Vacío | Todavía no hay información para mostrar. |
| Con datos | Inquilinos atrasados con días de atraso y saldo |
| Error | Mensaje «No se pudo guardar/cargar. Intentá de nuevo» con botón de reintento; el error técnico va a la consola |
| Sin cambios (formularios) | El botón guardar queda deshabilitado hasta que haya cambios válidos |

**Accesibilidad:** cada botón con `accessibilityLabel`, áreas táctiles de 48 px o más, no depender solo del color para indicar estado.

### 2.7 Resumen mensual

- **Archivo:** `app/resumen-mensual.tsx`
- **Qué muestra:** Cobrado vs esperado por mes
- **Acciones:** Cambiar mes, exportar
- **Historias relacionadas:** HU-06 (sugerido por coincidencia de temas; confirmar al construir).

**Bosquejo**

```
┌──────────────────────────────┐
│ ←  Resumen mensual             │
├──────────────────────────────┤
│ nombre                       │
│ Resumen / totales            │
├──────────────────────────────┤
│ • registro 1                 │
│ • registro 2                 │
│ • registro 3                 │
│                         (+)  │
└──────────────────────────────┘
```

**Estados**

| Estado | Qué ve el usuario |
|---|---|
| Cargando | Indicador breve; la base es local, rara vez se nota |
| Vacío | Todavía no hay información para mostrar. |
| Con datos | Cobrado vs esperado por mes |
| Error | Mensaje «No se pudo guardar/cargar. Intentá de nuevo» con botón de reintento; el error técnico va a la consola |
| Sin cambios (formularios) | El botón guardar queda deshabilitado hasta que haya cambios válidos |

**Accesibilidad:** cada botón con `accessibilityLabel`, áreas táctiles de 48 px o más, no depender solo del color para indicar estado.

## 3. Flujos principales

**HU-01 — Registrar propiedades**

```
abro la app  →  veo el estado vacío con «Agregar propiedad»
```

**HU-02 — Registrar inquilinos y contrato**

```
asigno un inquilino  →  queda ocupada y aparece en la lista con su día de cobro
```

**HU-03 — Registrar pagos y ver morosos**

```
es día 8 y no hay pago del mes  →  aparece en «Morosos» con los días de atraso
```

**HU-04 — Emitir recibos en PDF**

```
toco «Recibo»  →  se genera un PDF con número correlativo, fecha, inquilino, propiedad, período y monto
```

**HU-05 — Recibir recordatorios**

```
llega la fecha del aviso  →  recibo una notificación local con inquilino y fecha
```

**HU-06 — Ver el resumen de ingresos por mes**

```
abro Resumen  →  veo cobrado, pendiente y morosos por mes
```
