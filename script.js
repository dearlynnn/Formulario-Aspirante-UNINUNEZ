// Funciones auxiliares
const qs = (sel, ctx = document) => ctx.querySelector(sel);
const qsa = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

// Limpieza/formateo
function onlyDigits(str) { 
  return (str || '').replace(/\D/g, ''); 
}

function onlyLettersAndSpaces(str) { 
  return (str || '').replace(/[^a-zA-Z\sÁÉÍÓÚáéíóúÑñ]/g, ''); 
}

function capitalizeWords(str) {
  return str.split(' ').filter(Boolean).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
}

// Permite escribir dos palabras separadas por un único espacio
function twoWordsWithSpace(str) {
  // Primero limpiamos caracteres no válidos
  str = onlyLettersAndSpaces(str);
  
  // Dividimos por espacios
  const words = str.split(/\s+/).filter(Boolean);
  
  // Tomamos solo las primeras 2 palabras y las unimos con un espacio
  const result = words.slice(0, 2).join(' ');
  
  // Limitamos a 50 caracteres
  return result.slice(0, 50);
}

// Limita a máximo un espacio entre palabras
function limitSpaces(str) {
  return str.replace(/  +/g, ' ');
}

// Permite solo un espacio (máximo 2 palabras)
function maxOneSpace(str) {
  const parts = str.split(' ').filter(Boolean);
  return parts.slice(0, 2).join(' ');
}

// Calcula la edad a partir de la fecha de nacimiento en formato DD/MM/YYYY
function calcAgeFromDMY(dmy) {
  if (!dmy || dmy.length !== 10) return null;
  const [d, m, y] = dmy.split('/').map(x => parseInt(x, 10));
  if (!d || !m || !y) return null;
  const birth = new Date(y, m - 1, d);
  if (isNaN(birth)) return null;
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const mo = today.getMonth(), bdMo = birth.getMonth();
  if (mo < bdMo || (mo === bdMo && today.getDate() < birth.getDate())) age--;
  return age;
}

// Ventanas de error/advertencia
function showError(id, msg) {
  const el = qs(`#error-${id}`);
  if (el) { 
    el.textContent = msg; 
  }
  const input = qs(`[name="${id}"]`);
  if (input && !input.classList.contains('border-red-500')) {
    input.classList.add('border-red-500');
  }
}

function clearError(id) {
  const el = qs(`#error-${id}`);
  if (el) { 
    el.textContent = ''; 
  }
  const input = qs(`[name="${id}"]`);
  if (input && input.classList.contains('border-red-500')) {
    input.classList.remove('border-red-500');
  }
}

// Form validation
function validateForm() {
  // Borra todos los errores previos
  qsa('[id^="error-"]').forEach(el => el.textContent = '');
  qsa('[name]').forEach(el => el.classList.remove('border-red-500'));
  
  let isValid = true;

  const tipoDoc = qs('#tipoDoc').value.trim();
  const numDoc = qs('#numDoc').value.trim();
  const nombres = qs('#nombres').value.trim();
  const apellidos = qs('#apellidos').value.trim();
  const sexo = qs('#sexo').value.trim();
  const fechaNac = qs('#fechaNac').value.trim();
  const edad = qs('#edad').value.trim();
  const nacionalidad = qs('#nacionalidad').value.trim();
  const telefonoFijo = qs('#telefonoFijo').value.trim();
  const email = qs('#email').value.trim();
  const carreras = qsa('input[name="carrera"]:checked');
  const trabaja = qs('input[name="trabaja"]:checked')?.value || '';
  const ingresos = qs('#ingresos')?.value || '';

  if (!tipoDoc) { 
    showError('tipoDoc', 'Selecciona un tipo de documento'); 
    isValid = false; 
  }

  if (!numDoc) { 
    showError('numDoc', 'El número de documento es requerido'); 
    isValid = false; 
  } else if (!/^\d{6,15}$/.test(numDoc)) { 
    showError('numDoc', 'El documento debe tener entre 6 y 15 dígitos'); 
    isValid = false; 
  }

  if (!nombres) { 
    showError('nombres', 'Los nombres son requeridos'); 
    isValid = false; 
  }

  if (!apellidos) { 
    showError('apellidos', 'Los apellidos son requeridos'); 
    isValid = false; 
  }

  if (!sexo) { 
    showError('sexo', 'Selecciona el sexo biológico'); 
    isValid = false; 
  }

  if (!fechaNac) { 
    showError('fechaNac', 'La fecha de nacimiento es requerida'); 
    isValid = false; 
  }

  if (edad && (parseInt(edad) >= 100 || parseInt(edad) < 0)) { 
    showError('edad', 'La edad debe ser menor a 100 años'); 
    isValid = false; 
  }

  if (!nacionalidad) { 
    showError('nacionalidad', 'La nacionalidad es requerida'); 
    isValid = false; 
  }

  if (telefonoFijo && !/^\d{4,}$/.test(telefonoFijo)) { 
    showError('telefonoFijo', 'El teléfono debe tener mínimo 4 dígitos'); 
    isValid = false; 
  }

  if (!email) { 
    showError('email', 'El correo es requerido'); 
    isValid = false; 
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { 
    showError('email', 'Ingresa un correo válido'); 
    isValid = false; 
  }

  if (carreras.length === 0) { 
    showError('carrera', 'Selecciona al menos una carrera'); 
    isValid = false; 
  }

  if (!trabaja) { 
    showError('trabaja', 'Selecciona tu estado laboral'); 
    isValid = false; 
  }

  if (trabaja === 'Sí' && !ingresos) { 
    showError('ingresos', 'Especifica el rango de ingresos'); 
    isValid = false; 
  }

  return isValid;
}

// Eventos para formateo de inputs
qs('#numDoc').addEventListener('input', (e) => {
  e.target.value = onlyDigits(e.target.value).slice(0, 15);
  clearError('numDoc');
});

// Nombres: permite escribir primer y segundo nombre separados por un espacio
qs('#nombres').addEventListener('input', (e) => {
  let value = e.target.value;
  
  // Limpiamos caracteres no válidos (solo letras y espacios)
  value = onlyLettersAndSpaces(value);
  
  // Limitamos a máximo dos palabras separadas por un espacio
  const parts = value.split(' ');
  
  // Si hay más de 2 partes, solo tomamos las primeras 2
  if (parts.length > 2) {
    value = parts.slice(0, 2).join(' ');
  }
  
  // Capitalizamos cada palabra
  value = value.split(' ').map(word => {
    if (word.length === 0) return '';
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }).join(' ');
  
  // Limitamos a 50 caracteres
  e.target.value = value.slice(0, 50);
  clearError('nombres');
});

// Apellidos: permite escribir primer y segundo apellido separados por un espacio
qs('#apellidos').addEventListener('input', (e) => {
  let value = e.target.value;
  
  // Limpiamos caracteres no válidos (solo letras y espacios)
  value = onlyLettersAndSpaces(value);
  
  // Limitamos a máximo dos palabras separadas por un espacio
  const parts = value.split(' ');
  
  // Si hay más de 2 partes, solo tomamos las primeras 2
  if (parts.length > 2) {
    value = parts.slice(0, 2).join(' ');
  }
  
  // Capitalizamos cada palabra
  value = value.split(' ').map(word => {
    if (word.length === 0) return '';
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }).join(' ');
  
  // Limitamos a 50 caracteres
  e.target.value = value.slice(0, 50);
  clearError('apellidos');
});

qs('#fechaNac').addEventListener('input', (e) => {
  let v = e.target.value.replace(/[^\d/]/g, '');
  if (v.length > 10) v = v.slice(0, 10);
  if (v.length === 2 && !v.includes('/')) v += '/';
  if (v.length === 5 && v.split('/').length === 2) v += '/';
  e.target.value = v;
  clearError('fechaNac');
  
  // Calcular y actualizar automáticamente la edad
  const age = calcAgeFromDMY(v);
  if (age !== null && age >= 100) {
    showError('fechaNac', 'La edad no puede ser mayor o igual a 100 años');
    qs('#edad').value = ''; // Limpiar edad si no es válida
  } else if (age !== null) {
    qs('#edad').value = String(age); // Actualizar con la edad calculada
    clearError('fechaNac');
  }
});

// Edad: permite escribir manualmente o se actualiza automáticamente
qs('#edad').addEventListener('input', (e) => {
  // Solo permitir números
  e.target.value = onlyDigits(e.target.value).slice(0, 3);
  clearError('edad');
});

qs('#edad').addEventListener('input', (e) => {
  e.target.value = onlyDigits(e.target.value).slice(0, 3);
  clearError('edad');
});

qs('#nacionalidad').addEventListener('change', (e) => {
  clearError('nacionalidad');
});

qs('#telefonoFijo').addEventListener('input', (e) => {
  e.target.value = onlyDigits(e.target.value);
  clearError('telefonoFijo');
});

qs('#email').addEventListener('input', (e) => {
  e.target.value = e.target.value.replace(/\s/g, '');
  clearError('email');
});

// Show/hide income section based on employment status
qsa('input[name="trabaja"]').forEach(radio => {
  radio.addEventListener('change', (e) => {
    const incomesSection = qs('#incomesSection');
    if (e.target.value === 'Sí') {
      incomesSection.classList.remove('hidden');
    } else {
      incomesSection.classList.add('hidden');
      clearError('ingresos');
    }
    clearError('trabaja');
  });
});

// Envío de información
qs('#mainForm').addEventListener('submit', (e) => {
  e.preventDefault();
  
  if (validateForm()) {
    const successMsg = qs('#successMessage');
    successMsg.classList.remove('hidden');
    
    // Cargar información del formulario
    const formData = new FormData(qs('#mainForm'));
    console.log('Formulario enviado:', Object.fromEntries(formData));
    
    // Ocultar mensaje de éxito después de 5 segundos
    setTimeout(() => {
      successMsg.classList.add('hidden');
    }, 5000);
  }
});

// Clear button
qs('#clearBtn').addEventListener('click', () => {
  qs('#mainForm').reset();
  qsa('[id^="error-"]').forEach(el => el.textContent = '');
  qsa('[name]').forEach(el => el.classList.remove('border-red-500'));
  qs('#incomesSection').classList.add('hidden');
});
