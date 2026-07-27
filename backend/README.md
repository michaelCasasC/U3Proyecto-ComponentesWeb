# Backend de MediCitas

API REST con Express, PostgreSQL, JWT y autorización por roles. Docker Compose ejecuta únicamente PostgreSQL; la API se ejecuta con Node.js en el equipo. Al iniciar por primera vez, la API crea el esquema y carga los datos demo del frontend.

## Configuración

1. Copie `.env.example` como `.env`.
2. Cambie `JWT_SECRET` y `DB_PASSWORD` antes de usar el proyecto fuera del entorno local.
3. Instale las dependencias con `npm install` y `npm --prefix backend install`.
4. Desde la raíz del proyecto, levante PostgreSQL con `npm run backend:up`.
5. Inicie la API local con `npm run backend:dev`.
6. Verifique la API en `GET http://localhost:3000/api/health`.
7. En otra terminal, inicie el frontend con `npm run dev`.

Para detener PostgreSQL, ejecute `npm run backend:down`. El volumen `medicitas_postgres_data` conserva los datos entre reinicios.

## Usuarios iniciales

- Administrador: `jefferson.mejia@gmail.com` / `admin123`
- Paciente: `andrea.cedeno@gmail.com` / `123456`

## Base de datos

PostgreSQL ejecuta automáticamente y en orden los archivos de `db` cuando crea un volumen nuevo:

1. `001_schema.sql`: tablas, restricciones y procedimientos almacenados.
2. `002_index.sql`: índices para búsquedas y filtros frecuentes.
3. `003_seed.sql`: conjunto inicial pequeño de usuarios, especialidades, médicos y citas.

Los procedimientos `calculate_doctor_daily_load` y `calculate_patient_appointment_totals` calculan disponibilidad diaria y totales de citas respectivamente.

## Rutas principales

| Método | Ruta | Acceso |
| --- | --- | --- |
| POST | `/api/auth/register` | Público |
| POST | `/api/auth/login` | Público |
| GET | `/api/specialties` | Público |
| GET | `/api/doctors` | Público |
| GET, POST | `/api/appointments` | JWT |
| PATCH | `/api/appointments/:id/status` | Propietario (cancelar) o admin |
| GET | `/api/users` | Admin |
| POST, PUT, DELETE | `/api/doctors`, `/api/specialties` | Admin |

La colección de endpoints devuelve los campos en `camelCase` para conservar el contrato que ya utilizaba React.
