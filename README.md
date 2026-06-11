# ⚽ MundialIA 2026

> **No te pierdas ni un partido del Mundial 2026.**  
> Fixture interactivo, canales TV/streaming, notificaciones por correo y resumen diario.

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=flat&logo=next.js" alt="Next.js 16"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=flat&logo=tailwindcss" alt="Tailwind v4"/>
  <img src="https://img.shields.io/badge/NeonDB-Serverless-00E59B?style=flat&logo=neon" alt="NeonDB"/>
  <img src="https://img.shields.io/badge/Resend-Email-000000?style=flat&logo=resend" alt="Resend"/>
  <img src="https://img.shields.io/badge/Hosted-Vercel-000000?style=flat&logo=vercel" alt="Vercel"/>
</p>

---

## ✨ Features

| | |
|---|---|
| 🗓️ **Fixture completo** | 104 partidos, fase de grupos + eliminatorias, con hora Chile y Brasil |
| 📺 **Canales TV & Streaming** | Cobertura Chile (CHV, DSports, Disney+) y Brasil (Globo, CazéTV, SporTV) |
| 🔔 **Notificaciones por correo** | Suscríbete a partidos específicos y recibe recordatorios |
| 📋 **Resumen diario** | Cron a las 8:00 AM GMT-4 con los partidos del día y sus canales |
| 🔐 **Autenticación** | Login/registro con NeonDB + JWT |
| 🌙 **Diseño dark neon** | Interfaz oscura con acentos cyan, verde, rojo y fucsia |

---

## 🛠️ Stack

| Capa | Tecnología |
|---|---|
| Framework | Next.js 16 (Turbopack) |
| Estilos | Tailwind CSS v4 + `tw-animate-css` |
| Fuentes | Sora (headings) · Plus Jakarta Sans (body) |
| Base de datos | NeonDB (serverless Postgres) |
| Email | Resend |
| Autenticación | JWT (jose) + bcryptjs |
| Hosting | Vercel (con Cron Jobs) |

---

## 🚀 Desarrollo local

```bash
# 1. Clonar e instalar
pnpm install

# 2. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales (NeonDB, Resend, etc.)

# 3. Correr migraciones en Neon Console
#    migrations/001_create_users.sql
#    migrations/002_create_notifications.sql

# 4. Iniciar dev
pnpm dev
```

Abrir [http://localhost:3000](http://localhost:3000) 🚀

---

## 📁 Estructura

```
src/
├── app/
│   ├── page.tsx            # Login
│   ├── register/           # Registro
│   ├── logout/             # Logout
│   ├── app/                # Área protegida (requiere login)
│   │   ├── page.tsx        # Fixture
│   │   ├── canales/        # Canales TV
│   │   └── configuracion/  # Configuración
│   ├── api/
│   │   ├── auth/           # API de autenticación
│   │   └── cron/           # Cron job (resumen diario)
│   └── actions/            # Server Actions
├── components/
│   ├── match-card.tsx      # Card de partido con checkbox suscripción
│   ├── header.tsx          # Header con navegación
│   └── ui/                 # Componentes reutilizables (toast)
├── lib/
│   ├── db.ts               # Conexión NeonDB
│   ├── auth.ts             # JWT, sesión, passwords
│   ├── email.ts            # Servicio de emails (Resend)
│   ├── queries.ts          # Queries SQL
│   ├── data.ts             # Fixture del Mundial 2026
│   └── canales.ts          # Registro central de canales
├── types/                  # TypeScript interfaces
├── proxy.ts                # Protección de rutas /app/*
└── middleware.ts
```

---

## � Scripts útiles

### Crear usuario con CLI

Para crear nuevos usuarios directamente en la BD con contraseña hasheada:

```bash
./scripts/create-user.sh usuario@example.com micontraseña123
```

**Características:**
- Valida email y contraseña (mín 6 caracteres)
- Hashea con bcryptjs (10 rounds)
- Lee `DATABASE_URL` desde `.env`
- Maneja errores (email duplicado, conexión)

**Ejemplo de salida:**
```
📝 Creando usuario...
Email: usuario@example.com
✅ Usuario creado exitosamente
   ID: 550e8400-e29b-41d4-a716-446655440000
   Email: usuario@example.com
   Creado: 2026-06-10T20:41:02.123Z
✨ Listo
```

---

## �🕐 Cron diario

A las **8:00 AM GMT-4** (0 12 * * * UTC), un cron revisa los partidos del día y envía un email digest a cada usuario con los partidos que tiene suscritos, incluyendo:

- ⚽ Nombre del partido y grupo
- 🇨🇱🇧🇷 Horarios Chile y Brasil
- 📍 Sede
- 📺 Canales con links

---

## 🧪 Probar el cron localmente

```bash
curl -H "Authorization: Bearer <CRON_SECRET>" \
  http://localhost:3000/api/cron/daily-digest
```

---

## 🌐 Deploy en Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

Variables de entorno requeridas en Vercel:

| Variable | Descripción |
|---|---|
| `DATABASE_URL` | Connection string de NeonDB |
| `RESEND_API_KEY` | API key de Resend |
| `RESEND_FROM_EMAIL` | Remitente de correos |
| `NEXTAUTH_SECRET` | Secreto para JWT |
| `NEXTAUTH_URL` | URL del deploy |
| `CRON_SECRET` | Secreto para proteger el cron |

> ⚡ El `vercel.json` configura automáticamente el cron job al hacer deploy.

---

<p align="center">
  Hecho con 🥶 por <a href="https://andalaosa.cl">Andalaosa</a> y Shipibo Studio.
</p>
