# Guía de Defensa del Proyecto - Buzón Real Navideño

Este documento reúne las respuestas clave para la sustentación y defensa del código del proyecto **Buzón Real Navideño**.

---

## 1. ¿Qué propósito cumple cada etiqueta semántica principal de esta página?

- **`<header class="site-header">`**: Define el encabezado global y fijo del sitio web. Contiene el logotipo institucional y el menú de navegación principal (`<nav>`).
- **`<nav class="nav-container">`**: Agrupa y delimita el sistema de navegación por el cual el usuario puede desplazarse entre las distintas secciones de la landing page.
- **`<main class="main-content">`**: Encapsula todo el contenido principal, representativo e innovador del documento (sección Hero, formulario, estado del taller y FAQ).
- **`<section>`**: Estructura el documento en bloques de contenido temático independiente:
  - **`#inicio` (`.hero-section`)**: Sección de bienvenida con llamada a la acción y contador regresivo en tiempo real.
  - **`#pasos` (`.features-section`)**: Explicación del proceso para enviar la carta a Papá Noel.
  - **`#formulario` (`.form-section`)**: Sección que alberga el formulario de registro de cartas.
  - **`#estado-taller` (`.status-section`)**: Indicadores interactivos del estado de producción y duendes.
  - **`#faq` (`.faq-section`)**: Acordeón interactivo de preguntas frecuentes.
- **`<article>`**: Utilizado para contenedores independientes que tienen significado por sí mismos:
  - `.feature-card`: Tarjeta informativa de pasos.
  - `.status-card`: Tarjeta de métricas del taller.
  - `.faq-item`: Ítem individual del acordeón de preguntas frecuentes.
- **`<form id="letter-form">`**: Estructura accesible que agrupa campos (`<input>`, `<select>`, `<textarea>`), etiquetas (`<label>`) y botones (`<button type="submit">`) para la captura formal de datos.
- **`<footer>`**: Pie de página que contiene información institucional, enlaces a redes sociales y derechos de autor.

---

## 2. ¿Qué variables CSS definió, dónde se reutilizan y qué mejora aporta?

### Variables Definidas en [`variables.css`](file:///c:/Users/1-P203/Downloads/TALLER_LANDING_PAGE_JLP_EJQP/variables.css)
- **Paleta de Colores**:
  - Primarios: `--color-primary` (`#C41E3A`), `--color-primary-dark`, `--color-primary-light`.
  - Secundarios: `--color-secondary` (`#2D5A27`), `--color-secondary-dark`, `--color-secondary-light`.
  - Acento Dorado: `--color-accent` (`#D4AF37`), `--color-accent-light`, `--color-accent-dark`.
  - Fondos y Superficies: `--color-bg`, `--color-bg-alt`, `--color-surface`, `--color-surface-glass`.
- **Tipografías**:
  - `--font-heading`: `'Playfair Display', Georgia, serif`.
  - `--font-body`: `'Plus Jakarta Sans', sans-serif`.
- **Efectos y Sombras**: `--shadow-sm`, `--shadow-md`, `--shadow-lg`, `--shadow-festive`, `--shadow-gold`.
- **Bordes y Redondeado**: `--radius-sm` (8px), `--radius-md` (14px), `--radius-lg` (22px), `--radius-full` (9999px).
- **Transiciones y Curvas**: `--transition-fast`, `--transition-normal`, `--transition-bounce`.

### Dónde se Reutilizan
Se emplean a lo largo de todo el archivo [`styles.css`](file:///c:/Users/1-P203/Downloads/TALLER_LANDING_PAGE_JLP_EJQP/styles.css) en:
- Botones (`.btn-primary`, `.btn-secondary`, `.nav-cta`).
- Tarjetas y paneles flotantes (`.hero-card`, `.feature-card`, `.form-card`, `.toast`).
- Formulario e inputs (bordes, fondos al enfocar y mensajes de error).
- Tipografía y títulos (`h1`, `h2`, `h3`, cuerpo de texto).

### Mejora que Aporta
1. **Centralización**: Permite modificar cualquier aspecto del diseño (colores, fuentes, sombras) desde un único archivo ([`variables.css`](file:///c:/Users/1-P203/Downloads/TALLER_LANDING_PAGE_JLP_EJQP/variables.css)).
2. **Consistencia Visual**: Garantiza una coherencia cromática y estética en todos los elementos del sitio.
3. **Mantenibilidad y Escalabilidad**: Facilita agregar nuevos temas (como modo oscuro o variaciones estacionales) de manera eficiente.

---

## 3. ¿Por qué eligió Grid para una zona y Flexbox para otras?

### CSS Grid (Diseño Bidimensional)
Se utilizó en layouts estructurados en filas y columnas:
- **`.hero-grid` y `.form-layout-grid`**: Para dividir la pantalla en dos columnas asimétricas (ej. 1.15fr y 0.85fr) que se reorganizan limpiamente.
- **`.features-grid`**: Emplea `grid-template-columns: repeat(auto-fit, minmax(260px, 1fr))` para que las tarjetas de pasos adopten automáticamente el número de columnas óptimo según el ancho disponible.
- **`.countdown-grid`**: Para ordenar los 4 rectángulos del temporizador en una cuadrícula equilibrada.

### Flexbox (Diseño Unidireccional)
Se utilizó en componentes que requieran alineación sobre un solo eje (horizontal o vertical):
- **`.nav-container` y `.nav-menu`**: Para distribuir el logo a la izquierda, la lista de enlaces al centro/derecha y alinearlos verticalmente (`align-items: center`).
- **`.hero-actions`**: Para alinear y distanciar los botones principales horizontalmente (`gap: 1.25rem`).
- **Headers de tarjetas e ítems FAQ (`.countdown-header`, `.faq-header`)**: Para empujar íconos y títulos a extremos opuestos usando `justify-content: space-between`.
- **Toast de Notificaciones (`.toast`)**: Para alinear el ícono flotante, el texto descriptivo y el botón de cierre en una fila flexible.

---

## 4. ¿Qué regla pertenece a diseño móvil y qué cambian en cada breakpoint?

Las reglas de adaptación responsive se manejan mediante `@media` queries al final de [`styles.css`](file:///c:/Users/1-P203/Downloads/TALLER_LANDING_PAGE_JLP_EJQP/styles.css):

1. **Breakpoint Tablet/Pantallas Medianas (`@media (max-width: 992px)`)**:
   - `.hero-grid` y `.form-layout-grid`: Cambian de 2 columnas a 1 sola columna (`grid-template-columns: 1fr`), apilando el contenido verticalmente para evitar que se apriete el texto.
   - `.footer-grid`: Pasa de 4 columnas a 2 columnas.

2. **Breakpoint Móvil (`@media (max-width: 768px)`)**:
   - **Navegación**: Muestra el botón hamburguesa (`.mobile-toggle { display: block; }`) y transforma la lista de navegación `.nav-menu` en un menú flotante vertical desplegable.
   - **Formulario**: El contenedor `.form-row-2` pasa de 2 columnas a 1 columna para facilitar la pulsación táctil en pantallas de smartphone.
   - **Contador Regresivo**: `.countdown-grid` pasa de 4 columnas en fila a una matriz de 2x2 (`repeat(2, 1fr)`).
   - **Pie de Página**: `.footer-grid` se colapsa a 1 sola columna.

3. **Accesibilidad de Movimiento (`@media (prefers-reduced-motion: reduce)`)**:
   - Desactiva el efecto del canvas de nieve (`#snow-canvas { display: none; }`) y reduce las duraciones de transición CSS para usuarios sensibles a las animaciones.

---

## 5. ¿Qué código fue sugerido por IA, cómo lo verificó y qué modificación realizó?

### Código Sugerido por IA
- Algoritmo de renderizado del canvas 2D en JavaScript (`app.js`) para simular la caída realista de copos de nieve con movimiento parabólico.
- Lógica del sistema de notificaciones flotantes (Toasts) con barra de progreso decreciente via CSS.
- Separación de la arquitectura CSS en dos archivos ([`variables.css`](file:///c:/Users/1-P203/Downloads/TALLER_LANDING_PAGE_JLP_EJQP/variables.css) y [`styles.css`](file:///c:/Users/1-P203/Downloads/TALLER_LANDING_PAGE_JLP_EJQP/styles.css)).

### Cómo se Verificó
- **Verificación de Carga y Sintaxis**: Se inspeccionó la consola del navegador para confirmar que no existían errores de referencia ni llamadas a variables CSS no declaradas.
- **Rendimiento**: Se midió la tasa de fotogramas (FPS) durante la animación del Canvas de nieve para garantizar que se ejecute a 60 FPS mediante `requestAnimationFrame` sin bloquear el hilo de ejecución principal.
- **Pruebas de Uso y Formularios**: Se completó el formulario con datos válidos e inválidos para validar que los Toasts de confirmación y la validación en JS operaran correctamente.

### Modificaciones Realizadas
- **Refactorización de Estilos**: Se extrajo el bloque `:root` desde `styles.css` a [`variables.css`](file:///c:/Users/1-P203/Downloads/TALLER_LANDING_PAGE_JLP_EJQP/variables.css) y se vinculó en [`index.html`](file:///c:/Users/1-P203/Downloads/TALLER_LANDING_PAGE_JLP_EJQP/index.html) para garantizar una arquitectura limpia de doble stylesheet.
- **Ajustes de Accesibilidad**: Se agregaron atributos `aria-expanded`, `aria-controls` y navegación por teclado en el menú móvil e ítems del acordeón FAQ.
