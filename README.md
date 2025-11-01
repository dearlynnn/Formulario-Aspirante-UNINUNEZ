# 📋 Formulario Aspirante UNINUÑEZ

> Especificación técnica completa del formulario de inscripción para aspirantes a programas académicos de la Universidad UNINUÑEZ.

## 📑 Tabla de Contenidos

- [Descripción General](#descripción-general)
- [Sección 1: Datos Básicos](#sección-1-datos-básicos)
- [Sección 2: Carrera](#sección-2-carrera)
- [Sección 3: Ocupación](#sección-3-ocupación)
- [Cambios Principales](#cambios-principales)
- [Validaciones](#validaciones)
- [Notas Técnicas](#notas-técnicas)

---

## 🎯 Descripción General

Este documento especifica los requerimientos técnicos y funcionales del formulario de aspirante para UNINUÑEZ. El formulario está dividido en tres secciones principales que recopilan información personal, académica y laboral del aspirante.

---

## 📝 Sección 1: Datos Básicos

### Tipo de Documento

| Propiedad | Valor |
|-----------|-------|
| **Descripción** | Identificación del documento de identidad |
| **Tipo de Input** | Select box |
| **Requerido** | ✅ Sí |
| **Opciones** | Cédula, Tarjeta de Identidad, Pasaporte, Permiso de Residencia |
| **Validación** | Debe seleccionar una opción válida |

### Número de Documento

| Propiedad | Valor |
|-----------|-------|
| **Descripción** | Número único de identificación |
| **Tipo de Input** | Input text |
| **Requerido** | ✅ Sí |
| **Longitud** | Mín. 6 - Máx. 15 caracteres |
| **Caracteres Permitidos** | Solo dígitos |
| **Restricciones** | Sin puntos, comas ni caracteres especiales |
| **Validación** | Debe ser único en el sistema |

### Nombres

| Propiedad | Valor |
|-----------|-------|
| **Descripción** | Primer y segundo nombre del aspirante |
| **Tipo de Input** | Input text |
| **Requerido** | ✅ Sí |
| **Caracteres Permitidos** | Solo alfabéticos |
| **Espacios** | Máximo un espacio entre palabras |
| **Formato** | Pascal Case (automático) |
| **Flexibilidad** | Puede contener uno o dos nombres |
| **Ejemplo** | "Juan Carlos" o solo "Juan" |

### Apellidos

| Propiedad | Valor |
|-----------|-------|
| **Descripción** | Primer y segundo apellido del aspirante |
| **Tipo de Input** | Input text |
| **Requerido** | ✅ Sí |
| **Caracteres Permitidos** | Solo alfabéticos |
| **Espacios** | Máximo un espacio entre palabras |
| **Formato** | Pascal Case (automático) |
| **Flexibilidad** | Puede contener uno o dos apellidos |
| **Ejemplo** | "González López" o solo "González" |

### Sexo

| Propiedad | Valor |
|-----------|-------|
| **Descripción** | Clasificación de sexo biológico |
| **Tipo de Input** | Select desplegable |
| **Requerido** | ✅ Sí |
| **Opciones** | Masculino, Femenino |
| **Selección** | Única |

### Fecha de Nacimiento

| Propiedad | Valor |
|-----------|-------|
| **Descripción** | Día, mes y año de nacimiento |
| **Tipo de Input** | Input DD/MM/AAAA |
| **Requerido** | ✅ Sí |
| **Formato** | DD/MM/AAAA |
| **Placeholder** | "DD/MM/AAAA" (visible) |
| **Caracteres Permitidos** | Solo dígitos y barras "/" |
| **Barras** | Se insertan automáticamente |
| **Rango de Edad** | Menor de 100 años |
| **Validación** | Fecha válida requerida |

### Edad (Años)

| Propiedad | Valor |
|-----------|-------|
| **Descripción** | Edad en años cumplidos |
| **Tipo de Input** | Input numérico |
| **Requerido** | ❌ No (Opcional) |
| **Rango** | 0 - 99 años |
| **Cálculo** | Se calcula automáticamente desde fecha de nacimiento |
| **Entrada Manual** | Permitida |
| **Caracteres Permitidos** | Solo números |
| **Validación** | Advertencia si no coincide con fecha de nacimiento |

### Nacionalidad

| Propiedad | Valor |
|-----------|-------|
| **Descripción** | País de origen |
| **Tipo de Input** | Select desplegable |
| **Requerido** | ✅ Sí |
| **Opciones** | Nacional, Extranjero |

### Teléfono Fijo

| Propiedad | Valor |
|-----------|-------|
| **Descripción** | Línea telefónica residencial |
| **Tipo de Input** | Input telefónico |
| **Requerido** | ❌ No (Opcional) |
| **Longitud** | Mínimo 6 dígitos |
| **Caracteres Permitidos** | Solo dígitos |
| **Restricciones** | Sin espacios ni caracteres especiales |
| **Advertencia** | Si se ingresa menos de 6 dígitos |
| **Validación** | Debe tener identificador de formato |

### Correo Electrónico

| Propiedad | Valor |
|-----------|-------|
| **Descripción** | Dirección de correo para comunicaciones |
| **Tipo de Input** | Input email |
| **Requerido** | ✅ Sí |
| **Formato** | usuario@dominio.tld |
| **Caracteres Especiales** | Solo @ y . permitidos |
| **Restricciones** | Sin espacios ni otros caracteres especiales |
| **Validación** | Debe ser único en el sistema |

---

## 🎓 Sección 2: Carrera

### Carrera Seleccionada

| Propiedad | Valor |
|-----------|-------|
| **Descripción** | Programa académico de interés |
| **Tipo de Input** | Checkboxes (múltiple) |
| **Requerido** | ✅ Sí |
| **Opciones** | • Medicina<br>• Enfermería<br>• Odontología<br>• Bacteriología<br>• Instrumentación Quirúrgica |
| **Selección** | Una o más opciones obligatoria |

---

## 💼 Sección 3: Ocupación

### ¿Trabaja Actualmente?

| Propiedad | Valor |
|-----------|-------|
| **Descripción** | Estado laboral actual |
| **Tipo de Input** | Radio buttons |
| **Requerido** | ✅ Sí |
| **Opciones** | • Independiente<br>• Empleado<br>• No laborando |
| **Selección** | Única y excluyente |

### Ingresos Mensuales

| Propiedad | Valor |
|-----------|-------|
| **Descripción** | Rango de ingresos en SMLV |
| **Tipo de Input** | Select desplegable |
| **Requerido** | ❓ Condicional |
| **Activación** | Solo si responde "Sí" a "¿Trabaja actualmente?" |
| **Opciones** | • 1 - 2 SMLV<br>• 3 - 4 SMLV<br>• 5+ SMLV |
| **Selección** | Única |

---

## ✨ Cambios Principales

### ➕ Adiciones

- ✅ **Tarjeta de Identidad** agregada a opciones de tipo de documento
- ✅ **Flexibilidad de nombres/apellidos** para casos con un solo nombre o apellido
- ✅ **Sexo como select desplegable** para mejor UX

### 🔄 Modificaciones

- 📝 **Nacionalidad**: Actualizado de (Colombiano/Extranjero) a (Nacional/Extranjero)
- 📞 **Teléfono fijo**: Mínimo 6 dígitos (antes sin especificación clara)
- 📅 **Fecha de nacimiento**: Placeholder visible con formato DD/MM/AAAA
- ✉️ **Correo**: Validación más estricta sin caracteres especiales

---

## 🔍 Validaciones

### Validaciones en Tiempo Real

| Campo | Validación |
|-------|-----------|
| **Tipo de documento** | Selección obligatoria |
| **Número de documento** | 6-15 dígitos, sin puntos ni comas |
| **Nombres** | Solo letras, máximo un espacio, Pascal Case automático |
| **Apellidos** | Solo letras, máximo un espacio, Pascal Case automático |
| **Sexo** | Selección obligatoria |
| **Fecha nacimiento** | Formato DD/MM/AAAA, edad < 100 años |
| **Edad** | Opcional, solo números, validación con fecha |
| **Nacionalidad** | Selección obligatoria |
| **Teléfono fijo** | Opcional, mín. 6 dígitos si se ingresa |
| **Correo** | Formato válido, sin espacios ni caracteres especiales |
| **Carrera** | Mínimo una selección |
| **Trabaja** | Selección obligatoria |
| **Ingresos** | Obligatorio si trabaja = "Sí" |

### Mensajes de Error

- 🔴 **Color rojo**: Errores que impiden el envío del formulario
- 🟡 **Color ámbar**: Advertencias que el usuario debe reconocer
- 🟢 **Color verde**: Confirmación de envío exitoso

---

## 🛠️ Notas Técnicas

### Comportamiento del Formulario

```javascript
// Validación en tiempo real
- Nombres y apellidos se formatean automáticamente a Pascal Case
- Fecha de nacimiento inserta "/" automáticamente
- Edad se calcula automáticamente desde fecha de nacimiento
- Campo de ingresos solo se muestra si trabaja = "Sí"
- Validaciones ocurren conforme el usuario escribe
```

### Restricciones de Entrada

| Campo | Restricción |
|-------|------------|
| Documento | Solo dígitos (0-9) |
| Nombres | Solo letras (A-Z, a-z) y espacios |
| Apellidos | Solo letras (A-Z, a-z) y espacios |
| Fecha | Solo dígitos y "/" |
| Edad | Solo dígitos (0-9) |
| Teléfono | Solo dígitos (0-9) |
| Correo | Alphanumericos, @ y . |

### Estados del Formulario

- ✏️ **Edición**: Validaciones en tiempo real
- ⏸️ **Incompleto**: Botón enviar deshabilitado
- ✅ **Completo**: Botón enviar habilitado
- 📤 **Enviado**: Mensaje de éxito y limpieza de formulario

### Funcionalidades Principales

- ✅ Validación completa antes de envío
- ✅ Campos condicionales según respuestas previas
- ✅ Limpieza de formulario con un clic
- ✅ Mensajes de error y advertencia descriptivos
- ✅ Responsivo en dispositivos móviles y desktop

---

## 📊 Resumen de Cambios

| Aspecto | Antes | Ahora |
|--------|-------|-------|
| **Tipos de documento** | 3 opciones | 4 opciones (+ Tarjeta de Identidad) |
| **Sexo** | Radio buttons | Select desplegable |
| **Teléfono fijo mínimo** | No especificado | 6 dígitos |
| **Celular** | Sí | ❌ Removido |
| **Nacionalidad** | Colombiano/Extranjero | Nacional/Extranjero |
| **Nombre/Apellido** | Rígido | Flexible (1 o 2) |
| **Espacios permitidos** | No limitado | Máximo 1 |

---
