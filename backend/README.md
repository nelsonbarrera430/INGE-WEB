# Backend API - My Store (Express + Sequelize)

## Descripción
Servidor API-REST en **Node.js/Express** con **Sequelize** (PostgreSQL), autenticación con **Passport** (estrategias Local y JWT), validación con **Joi** y manejo centralizado de errores.

Base URL por defecto: `http://localhost:3000/api/v1`

---

## Requisitos
- Node.js 18+ (recomendado LTS)
- npm
- Docker Desktop

---

## Variables de entorno (.env)
Crea `backend/.env` (puedes copiar desde `.env.example`):
```
NODE_ENV=development
PORT=3000
DATABASE_URL=postgres://nico:admin123@localhost:5432/my_store
JWT_SECRET=dev_super_secret_change_me
API_KEY=dev_api_key
# SMTP opcional para recuperación de contraseña
SMTP_EMAIL=your@email.com
SMTP_PASSWORD=password-email
```

---

## Docker
Levanta Postgres y pgAdmin con Docker Compose:
```sh
cd backend
docker compose up -d
```
- Postgres: `localhost:5432` (DB: `my_store`, USER: `nico`, PASS: `admin123`)
- pgAdmin: `http://localhost:5050` (usuario `admin@mail.com`, pass `root`)

Conectar a la DB dentro del contenedor:
```sh
# Estructura completa de la base de datos
docker compose exec postgres pg_dump -U nico -s my_store > esquema.sql
# Acceder a realizar consultas individuales
docker compose exec postgres bash
psql -h localhost -d my_store -U nico
\d+
SELECT * FROM users;
```

---
## -----------------------------------
## Instalación y arranque del proyecto
```sh
cd backend
npm install
npm run migrations:run
npm run seed:all
npm run dev
```
Servidor: `http://localhost:3000`

Producción:
```sh
npm run start
```

---

## Scripts
- `npm run dev`: nodemon con `src/index.js`
- `npm run start`: node `src/index.js`
- `npm run migrations:run`: aplica migraciones
- `npm run migrations:revert`: revierte última migración
- `npm run seed:all`: corre todos los seeders
- `npm run seed:undo`: revierte todos los seeders

---

## Estructura de directorios (src/)
```
src/
├─ index.js            # Punto de entrada: levanta el servidor
├─ app.js              # Crea y configura la app Express
├─ routes/             # Enrutadores por recurso
│  ├─ index.js         # Prefijo /api/v1 y montaje de routers
│  ├─ products.router.js
│  ├─ categories.router.js
│  ├─ users.router.js
│  ├─ orders.router.js
│  ├─ customers.router.js
│  ├─ auth.router.js
│  └─ profile.router.js
├─ services/           # Lógica de negocio (CRUD, consultas ORM)
│  ├─ product.service.js
│  ├─ category.service.js
│  ├─ user.service.js
│  ├─ order.service.js
│  ├─ customers.service.js
│  └─ auth.service.js
├─ middlewares/        # Validación, auth y manejo de errores
│  ├─ validator.handler.js
│  ├─ auth.handler.js
│  └─ error.handler.js
├─ dtos/               # Esquemas Joi (validación de entrada)
│  ├─ product.dto.js
│  ├─ category.dto.js
│  ├─ user.dto.js
│  ├─ order.dto.js
│  └─ customer.dto.js
├─ db/
│  ├─ sequelize.js     # Conexión Sequelize
│  ├─ config.js        # Configuración sequelize-cli (usa DATABASE_URL)
│  ├─ models/          # Definición de modelos y asociaciones
│  ├─ migrations/      # Migraciones de esquema
│  └─ seeders/         # Datos de ejemplo
├─ utils/
│  └─ auth/
│     ├─ index.js      # Registro de estrategias Passport
│     └─ strategies/
│        ├─ local.strategy.js
│        └─ jwt.strategy.js
└─ config/
   └─ config.js        # Carga de variables de entorno
```

### Propósito de cada capa
- `routes/`: Define endpoints HTTP y encadena middlewares y servicios.
- `middlewares/validator.handler.js`: Aplica esquemas Joi a `req.body/params/query`.
- `middlewares/auth.handler.js`: Verifica API Key y roles/claims del JWT.
- `middlewares/error.handler.js`: Normaliza respuestas de error (Boom/ORM).
- `services/*`: Implementa la lógica de negocio y llama a modelos Sequelize.
- `db/models/*`: Define entidades y relaciones (ORM).
- `utils/auth/*`: Autenticación con Passport (login local, protección JWT).

---

## Arquitectura y conceptos
- **Express**: servidor HTTP y ruteo.
- **Sequelize (ORM)**: mapea tablas a objetos; migraciones/seeders reproducibles.
- **Joi**: validación declarativa de entrada (evita datos inválidos).
- **Passport**: autenticación con estrategias `local` (login) y `jwt` (protección).
- **JWT**: token firmado; se envía en `Authorization: Bearer <token>`.
- **Boom**: respuestas de error consistentes.
- **CORS**: habilitado para consumo desde frontend.

Flujo de autenticación:
1) `POST /api/v1/auth/login` (estrategia local) → `{ user, access_token }`
2) En el cliente, enviar `Authorization: Bearer <access_token>` a rutas protegidas.

---

## Endpoints principales
Prefijo: `/api/v1`
- `GET/POST/PATCH/DELETE /products` (público para demo de validación)
- `GET/POST/PATCH/DELETE /categories` (JWT + roles)
- `GET/POST/PATCH/DELETE /users`
- `GET/POST /orders`, `POST /orders/add-item`, `GET /orders/:id`
- `POST /auth/login`, `POST /auth/recovery`, `POST /auth/change-password`
- `GET /profile/my-user`, `GET /profile/my-orders` (JWT)

---

## Migraciones y seeders
Aplicar migraciones:
```sh
npm run migrations:run
```
Datos de ejemplo:
```sh
npm run seed:all
```
Usuarios sembrados:
- admin: `admin@mail.com` / `admin123`
- customer: `customer@mail.com` / `customer123`

---

## Troubleshooting
- `password authentication failed for user`: revisa `DATABASE_URL` en `.env` y que Postgres esté corriendo.
- `Secret or key must be provided`: define `JWT_SECRET` en `.env`.
- Docker no responde en Windows: abre Docker Desktop y habilita WSL2 (Settings → General: Use WSL 2; Resources → WSL Integration).
- Puerto en uso: cambia `PORT` en `.env` (por ejemplo, 3001).

