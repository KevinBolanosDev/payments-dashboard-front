# 🎨 Frontend - Sistema de Gestión de Cobros

Aplicación web desarrollada con Next.js 14+, shadcn/ui, Tailwind CSS y JavaScript para el sistema de gestión de cobros.

## 📋 Requisitos

- Node.js 18+
- npm, yarn, pnpm o bun
- Backend API ejecutándose en http://localhost:5000

## ⚡ Inicio Rápido

### 1. Instalar dependencias
```bash
npm install
# o
pnpm install
# o
yarn install
```

### 2. Configurar variables de entorno
Crear archivo `.env.local`:
```bash
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_APP_NAME="Gestión de Cobros"
```

### 3. Instalar componentes shadcn/ui
```bash
# Componentes básicos
npx shadcn-ui@latest add button input card table select badge switch dialog form

# Componentes adicionales
npx shadcn-ui@latest add toast alert-dialog dropdown-menu tabs calendar
```

### 4. Iniciar servidor de desarrollo
```bash
npm run dev
# o
pnpm dev
# o
yarn dev
```

Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

## 🌐 Funcionalidades

### Implementadas
- ✅ Configuración base con Next.js 14+
- ✅ Integración con shadcn/ui
- ✅ Configuración de Tailwind CSS
- ✅ Estructura de carpetas organizada

### En Desarrollo
- 🔄 Dashboard principal
- 🔄 Gestión de clientes
- 🔄 Sistema de cobros
- 🔄 Generación de recibos
- 🔄 Reportes y estadísticas

## 📊 Estructura del Proyecto

```
src/
├── app/                    # App Router (Next.js 14+)
│   ├── (dashboard)/        # Rutas del dashboard
│   ├── globals.css         # Estilos globales
│   ├── layout.js           # Layout principal
│   └── page.js             # Página de inicio
├── components/             # Componentes reutilizables
│   ├── ui/                 # shadcn/ui components
│   ├── layout/             # Header, Sidebar, Footer
│   ├── forms/              # Formularios específicos
│   ├── tables/             # Tablas de datos
│   └── charts/             # Gráficos y estadísticas
├── lib/                    # Utilidades y configuraciones
│   ├── utils.js            # Utilidades generales
│   ├── api.js              # Cliente HTTP
│   └── validations.js      # Esquemas de validación
├── hooks/                  # Custom hooks
└── store/                  # Estado global (Zustand)
```

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Iniciar servidor de desarrollo
npm run lint         # Verificar código con ESLint
npm run lint:fix     # Corregir errores de ESLint

# Producción
npm run build        # Construir para producción
npm start           # Iniciar servidor de producción

# shadcn/ui
npx shadcn-ui@latest add [component]  # Agregar componente
```

## 🎯 Tecnologías

- **Next.js 14+** - Framework React con App Router
- **shadcn/ui** - Componentes UI modernos
- **Tailwind CSS** - Framework de estilos
- **JavaScript ES6+** - Sintaxis moderna
- **React Hook Form** - Manejo de formularios
- **Yup** - Validación de esquemas
- **Axios** - Cliente HTTP
- **Zustand** - Estado global
- **Recharts** - Gráficos y visualizaciones

## 🚀 Desarrollo

### Flujo de trabajo con Backend
```bash
# Terminal 1: Backend
cd ../payments-dashboard-back
npm run dev

# Terminal 2: Frontend
npm run dev

# URLs
# Frontend: http://localhost:3000
# Backend API: http://localhost:5000
```

### Agregar nuevos componentes shadcn/ui
```bash
# Ver componentes disponibles
npx shadcn-ui@latest add

# Agregar componente específico
npx shadcn-ui@latest add button
```

## 📖 Documentación

- **[DESARROLLO-FRONTEND.md](./DESARROLLO-FRONTEND.md)** - Guía completa de desarrollo
- **[Next.js Documentation](https://nextjs.org/docs)** - Documentación oficial de Next.js
- **[shadcn/ui](https://ui.shadcn.com/)** - Documentación de componentes UI
- **[Tailwind CSS](https://tailwindcss.com/docs)** - Documentación de Tailwind

## 🎨 Diseño

### Tema y Colores
- **Tema**: Light/Dark mode automático
- **Colores**: Esquema profesional para aplicaciones financieras
- **Tipografía**: Inter font family
- **Responsive**: Mobile-first design

### Componentes UI
- Botones, inputs, cards, tablas
- Formularios con validación
- Modales y alertas
- Navegación y menús
- Gráficos y estadísticas

## 📱 Responsive Design

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+
- **Large**: 1440px+

## 🚨 Solución de Problemas

### Error: "Module not found"
```bash
# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
```

### Error de shadcn/ui
```bash
# Verificar configuración
cat components.json

# Reinstalar shadcn/ui
npx shadcn-ui@latest init
```

### Error de conexión con API
```bash
# Verificar variables de entorno
cat .env.local

# Verificar que el backend esté corriendo
curl http://localhost:5000/health
```

---

🎯 **Estado actual**: Configuración base completada
📅 **Próximo**: Implementación del dashboard principal

Para más detalles, consulta [DESARROLLO-FRONTEND.md](./DESARROLLO-FRONTEND.md)
