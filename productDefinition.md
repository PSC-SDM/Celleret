
# 🍷 Celleret — Webapp de gestión de bodegas domésticas

**Versión:** 0.1 (MVP)
**Tipo de proyecto:** Webapp multiusuario
**Objetivo:** Permitir a usuarios particulares registrar, visualizar y gestionar sus vinos almacenados en casa, con información sobre consumo ideal y estado del stock.

---

## 1. 🎯 Resumen ejecutivo

Celleret es una aplicación web que ayuda a los usuarios a **organizar y planificar el consumo de sus vinos**. Cada usuario puede crear su propia “bodega digital” registrando botellas, añadas y fechas de consumo óptimo.
El propósito principal es **mantener una visión clara del stock** y **no dejar que los vinos se pasen de su punto ideal de consumo**.

---

## 2. 🥂 Objetivos del producto

* Facilitar la gestión de bodegas domésticas de forma sencilla e intuitiva.
* Permitir registrar vinos con sus principales características (nombre, tipo, año, denominación, notas).
* Ofrecer una visión general del stock actual.
* Indicar visualmente el estado de cada vino según su “ventana de consumo” ideal.
* Soportar múltiples usuarios, cada uno con su propia bodega.

---

## 3. ⚙️ Alcance funcional (MVP)

### Módulos principales:

1. **Registro y login de usuario**

   * Autenticación con email/contraseña (o Google opcional).
   * Cada usuario gestiona solo su bodega.
2. **Gestión de vinos**

   * Crear, editar y eliminar vinos.
   * Campos:

     * Nombre del vino
     * Cantidad de botellas
     * Bodega / Productor
     * Denominación de origen
     * Tipo (tinto, blanco, rosado, espumoso, generoso…)
     * Añada (año)
     * Fecha de adquisición
     * Fecha estimada de consumo ideal (inicio y fin)
     * Notas personales / cata
     * Imagen de la etiqueta (opcional)
3. **Visualización del stock**

   * Lista con filtros (tipo, año, estado de consumo).
   * Indicador visual por estilo de vino .
   * Indicador visual por fecha optima de consumo(óptimo, pronto, tarde).
   * Buscador rápido por nombre.
4. **Dashboard resumen**

   * Conteo total de vinos por tipo.
   * Indicador de próximos vinos a consumir.
5. **Interfaz responsive**

   * Optimizada para móvil, tablet y escritorio.

---

## 4. 🚀 Roadmap (futuras fases)

* Integración con APIs de vinos (ej. Vivino, Wine.com, Wine-Searcher).
* Soporte para compartir bodegas o hacer inventarios conjuntos.
* Sistema de recordatorios (p. ej., “Tienes 3 vinos próximos a su fecha ideal”).
* Escaneo de etiquetas mediante cámara.
* Exportar datos (CSV o PDF).
* Modo sin conexión (PWA).
* Recomendaciones automáticas de consumo o maridaje.

---

## 5. 🧱 Stack tecnológico propuesto

### Frontend

* **Framework:** React + Vite
* **UI:** TailwindCSS + shadcn/ui
* **Estado global:** Zustand
* **Routing:** React Router
* **Autenticación:** Custom con Backend OAuth
* **Deploy:** Vercel / VPS

### Backend

* **Opción ligera (recomendada para MVP):**
  * Firebase Firestore o Supabase (BaaS)
  * Permite gestionar usuarios y datos sin mantener un servidor.
* **Opción autogestionada (si se prefiere Node):**
  * Node.js + Express
  * Base de datos: PostgreSQL o MongoDB Atlas
  * ORM: Prisma (en caso de SQL)

### Infraestructura

* Hosting estático (Vercel / Netlify / Render).
* Autenticación y base de datos gestionadas.
* Opcional: almacenamiento de imágenes en Firebase Storage o Cloudinary. NO MVP

---

## 6. 🎨 Diseño y experiencia de usuario

* Interfaz minimalista con predominancia de tonos vino / burdeos suaves.
* Dashboard principal estilo tarjeta.
* Iconografía simple y legible.
* Acciones principales accesibles desde la pantalla inicial (añadir vino, ver stock, filtrar).
* UX inspirada en apps tipo Notion / Habitica (fluida, sin sobrecarga visual).

---

