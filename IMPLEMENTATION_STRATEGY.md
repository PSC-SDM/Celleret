# 📋 Estrategia de Implementación - Celleret MVP

**Proyecto:** Celleret - Webapp de gestión de bodegas domésticas  
**Versión:** 0.1 (MVP)  
**Fecha de creación:** 7 de noviembre de 2025

---

## 🎯 Objetivos de la Implementación

1. Desarrollar un MVP funcional en **8-10 semanas**
2. Priorizar funcionalidades core sobre características secundarias
3. Garantizar una base de código escalable y mantenible
4. Implementar un diseño responsive desde el inicio
5. Asegurar la experiencia de usuario fluida y minimalista

---

## 🏗️ Arquitectura Técnica

### Stack Seleccionado (Recomendado)

**Frontend:**
- ⚛️ React 18+ con Vite
- 🎨 TailwindCSS + shadcn/ui
- 🔄 Zustand (gestión de estado)
- 🛣️ React Router v6
- 📱 PWA ready (fase futura)

**Backend:**
- 🔥 **Supabase** (opción recomendada para MVP)
  - Auth integrada
  - PostgreSQL
  - Storage para imágenes (fase futura)
  - Real-time capabilities
  
**Infraestructura:**
- 🚀 Vercel (Frontend)
- ☁️ Supabase Cloud (Backend + DB)
- 🖼️ Cloudinary (imágenes - fase futura)

---

## 📅 Plan de Implementación por Fases

### **FASE 0: Setup Inicial** (Semana 1)
- [ ] Configuración del repositorio Git
- [ ] Setup de proyecto React + Vite
- [ ] Instalación de dependencias principales
- [ ] Configuración de TailwindCSS
- [ ] Integración de shadcn/ui
- [ ] Configuración de ESLint + Prettier
- [ ] Setup de Supabase (proyecto + configuración)
- [ ] Configuración de variables de entorno
- [ ] Estructura de carpetas del proyecto
- [ ] Configuración de React Router
- [ ] Setup de Zustand

### **FASE 1: Autenticación y Usuario** (Semana 2)
- [ ] Diseño de esquema de base de datos (usuarios)
- [ ] Implementación de registro de usuario
- [ ] Implementación de login
- [ ] Implementación de logout
- [ ] Persistencia de sesión
- [ ] Rutas protegidas
- [ ] Página de perfil básica
- [ ] Recuperación de contraseña
- [ ] Validación de formularios (Zod)
- [ ] Manejo de errores de autenticación

### **FASE 2: Modelo de Datos - Vinos** (Semana 3)
- [ ] Diseño de esquema de base de datos (vinos)
- [ ] Definición de tipos TypeScript/PropTypes
- [ ] Creación de tablas en Supabase
- [ ] Setup de políticas RLS (Row Level Security)
- [ ] Servicios API para CRUD de vinos
- [ ] Validación de datos del lado del servidor
- [ ] Testing de operaciones CRUD

### **FASE 3: Gestión de Vinos - CRUD** (Semanas 4-5)
- [ ] Diseño de interfaz "Añadir vino"
- [ ] Formulario de creación de vino
  - [ ] Campo: Nombre
  - [ ] Campo: Cantidad de botellas
  - [ ] Campo: Bodega/Productor
  - [ ] Campo: Denominación de origen
  - [ ] Campo: Tipo (selector)
  - [ ] Campo: Añada
  - [ ] Campo: Fecha de adquisición
  - [ ] Campo: Fecha de consumo ideal (inicio/fin)
  - [ ] Campo: Notas personales
  - [ ] Campo: Imagen (opcional - fase futura)
- [ ] Validación de formularios
- [ ] Implementación de crear vino
- [ ] Vista de detalle de vino
- [ ] Formulario de edición de vino
- [ ] Implementación de editar vino
- [ ] Implementación de eliminar vino (con confirmación)
- [ ] Feedback visual de operaciones (toast/notifications)
- [ ] Manejo de estados de carga
- [ ] Manejo de errores

### **FASE 4: Visualización del Stock** (Semana 6)
- [ ] Vista de lista de vinos
- [ ] Diseño de tarjetas de vino
- [ ] Implementación de indicadores visuales por tipo
- [ ] Implementación de indicadores de fecha óptima
  - [ ] Estado: Óptimo (verde)
  - [ ] Estado: Pronto (amarillo/naranja)
  - [ ] Estado: Tarde (rojo)
- [ ] Sistema de filtros
  - [ ] Filtro por tipo de vino
  - [ ] Filtro por año
  - [ ] Filtro por estado de consumo
- [ ] Buscador por nombre
- [ ] Ordenamiento (por fecha, nombre, tipo)
- [ ] Paginación o scroll infinito
- [ ] Vista vacía (empty state)
- [ ] Responsive design

### **FASE 5: Dashboard** (Semana 7)
- [ ] Diseño del dashboard principal
- [ ] Widget: Total de vinos
- [ ] Widget: Contador por tipo de vino
- [ ] Widget: Próximos a consumir
- [ ] Widget: Estadísticas básicas
- [ ] Gráficos simples (opcional)
- [ ] Accesos rápidos a acciones principales
- [ ] Responsive design del dashboard

### **FASE 6: UI/UX Refinamiento** (Semana 8)
- [ ] Paleta de colores definitiva (tonos vino/burdeos)
- [ ] Tipografía y jerarquía visual
- [ ] Iconografía consistente
- [ ] Animaciones y transiciones sutiles
- [ ] Loading states pulidos
- [ ] Error states pulidos
- [ ] Empty states pulidos
- [ ] Accesibilidad (a11y) básica
- [ ] Dark mode (opcional)

### **FASE 7: Testing y Optimización** (Semana 9)
- [ ] Testing manual completo
- [ ] Testing en diferentes navegadores
- [ ] Testing responsive (móvil, tablet, desktop)
- [ ] Optimización de rendimiento
- [ ] Optimización de imágenes
- [ ] Code splitting
- [ ] Lazy loading de componentes
- [ ] SEO básico
- [ ] Meta tags
- [ ] Corrección de bugs críticos

### **FASE 8: Deploy y Documentación** (Semana 10)
- [ ] Configuración de deployment en Vercel
- [ ] Variables de entorno en producción
- [ ] Testing en producción
- [ ] Documentación de código
- [ ] README del proyecto
- [ ] Guía de usuario básica
- [ ] Documentación de API/servicios
- [ ] Monitoreo básico (opcional)

---

## 🗂️ Estructura de Carpetas Propuesta

```
celleret/
├── public/
│   └── icons/
├── src/
│   ├── assets/
│   │   ├── images/
│   │   └── icons/
│   ├── components/
│   │   ├── ui/              # shadcn/ui components
│   │   ├── auth/            # Login, Register, etc.
│   │   ├── wine/            # WineCard, WineForm, etc.
│   │   ├── dashboard/       # Dashboard widgets
│   │   ├── layout/          # Header, Footer, Sidebar
│   │   └── shared/          # Componentes reutilizables
│   ├── hooks/               # Custom hooks
│   ├── lib/
│   │   ├── supabase.js      # Cliente de Supabase
│   │   └── utils.js         # Utilidades
│   ├── pages/
│   │   ├── Auth/
│   │   ├── Dashboard/
│   │   ├── Wines/
│   │   └── Profile/
│   ├── services/            # API calls
│   │   ├── auth.service.js
│   │   └── wine.service.js
│   ├── store/               # Zustand stores
│   │   ├── authStore.js
│   │   └── wineStore.js
│   ├── styles/
│   │   └── globals.css
│   ├── types/               # TypeScript types (si se usa TS)
│   ├── App.jsx
│   └── main.jsx
├── .env.example
├── .gitignore
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

## 🗄️ Esquema de Base de Datos

### Tabla: `users` (gestionada por Supabase Auth)
```sql
-- Extendida con perfil personalizado si es necesario
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Tabla: `wines`
```sql
CREATE TABLE wines (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users NOT NULL,
  name TEXT NOT NULL,
  quantity INTEGER DEFAULT 1,
  winery TEXT,
  denomination TEXT,
  type TEXT NOT NULL, -- 'tinto', 'blanco', 'rosado', 'espumoso', 'generoso'
  vintage INTEGER,
  purchase_date DATE,
  optimal_start_date DATE,
  optimal_end_date DATE,
  notes TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para mejorar rendimiento
CREATE INDEX wines_user_id_idx ON wines(user_id);
CREATE INDEX wines_type_idx ON wines(type);
CREATE INDEX wines_optimal_dates_idx ON wines(optimal_start_date, optimal_end_date);
```

### Políticas RLS (Row Level Security)
```sql
-- Los usuarios solo pueden ver sus propios vinos
ALTER TABLE wines ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own wines"
  ON wines FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own wines"
  ON wines FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own wines"
  ON wines FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own wines"
  ON wines FOR DELETE
  USING (auth.uid() = user_id);
```

---

## 🎨 Guía de Diseño

### Paleta de Colores
```css
:root {
  /* Colores principales - Tonos vino/burdeos */
  --wine-900: #4a1520;
  --wine-800: #6b1f2f;
  --wine-700: #8b2940;
  --wine-600: #a83750;
  --wine-500: #c94560;
  --wine-400: #d96a81;
  --wine-300: #e999ab;
  --wine-200: #f4c2cd;
  --wine-100: #fae5e9;
  
  /* Neutrales */
  --neutral-900: #1a1a1a;
  --neutral-100: #f5f5f5;
  
  /* Estados */
  --status-optimal: #10b981;    /* Verde */
  --status-soon: #f59e0b;       /* Naranja */
  --status-late: #ef4444;       /* Rojo */
}
```

### Tipografía
- **Headings:** Inter, System UI
- **Body:** Inter, System UI
- **Monospace:** Fira Code (si se necesita)

---

## 🔐 Consideraciones de Seguridad

- [ ] Implementar HTTPS en producción
- [ ] Validación de datos en cliente y servidor
- [ ] Protección contra XSS
- [ ] Protección contra CSRF
- [ ] Rate limiting en operaciones críticas
- [ ] Sanitización de inputs de usuario
- [ ] Políticas RLS correctamente configuradas
- [ ] Variables de entorno seguras
- [ ] No exponer claves API en frontend

---

## 📊 Métricas de Éxito del MVP

1. **Funcionalidad:**
   - Usuario puede registrarse y autenticarse ✓
   - Usuario puede crear, editar y eliminar vinos ✓
   - Usuario puede visualizar su stock completo ✓
   - Filtros y búsqueda funcionan correctamente ✓

2. **Performance:**
   - Tiempo de carga inicial < 3s
   - First Contentful Paint < 1.5s
   - Time to Interactive < 3.5s

3. **UX:**
   - Interfaz intuitiva y sin fricción
   - Responsive en todos los dispositivos
   - Feedback visual claro en todas las acciones

4. **Técnico:**
   - 0 errores críticos en producción
   - Código bien documentado
   - Test coverage > 60% (opcional para MVP)

---

## 🚀 Roadmap Post-MVP

### Versión 0.2 (Fase 2)
- [ ] Sistema de recordatorios
- [ ] Subida de imágenes de etiquetas
- [ ] Exportación de datos (CSV/PDF)
- [ ] Compartir bodega con otros usuarios

### Versión 0.3 (Fase 3)
- [ ] Integración con APIs externas (Vivino, Wine-Searcher)
- [ ] Escaneo de etiquetas con OCR
- [ ] Recomendaciones de maridaje
- [ ] Modo offline (PWA completa)

### Versión 1.0 (Producto Completo)
- [ ] App móvil nativa (React Native)
- [ ] Sistema de notificaciones push
- [ ] Analytics avanzados
- [ ] Comunidad y valoraciones

---

## 📝 Notas de Desarrollo

### Comandos Útiles
```bash
# Desarrollo
npm run dev

# Build
npm run build

# Preview
npm run preview

# Lint
npm run lint

# Format
npm run format
```

### Variables de Entorno (.env.example)
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## 🤝 Colaboración y Contribución

- Seguir la guía de estilo del proyecto
- Crear branches descriptivos: `feature/nombre`, `fix/nombre`
- Pull requests con descripción clara
- Code review antes de merge a main
- Commits siguiendo conventional commits

---

## 📞 Contacto y Soporte

**Desarrollador Principal:** [Tu nombre]  
**Email:** [Tu email]  
**Repositorio:** [URL del repo]

---

**Última actualización:** 7 de noviembre de 2025
