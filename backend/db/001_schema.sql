BEGIN;

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(120) NOT NULL,
  password TEXT NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'patient' CHECK (role IN ('admin', 'patient')),
  avatar TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE specialties (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  icon VARCHAR(50) NOT NULL DEFAULT 'LocalHospital',
  description TEXT NOT NULL DEFAULT '',
  color VARCHAR(20) NOT NULL DEFAULT '#1976d2'
);

CREATE TABLE doctors (
  id SERIAL PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  specialty_id INTEGER NOT NULL REFERENCES specialties(id),
  rating NUMERIC(2,1) NOT NULL DEFAULT 0 CHECK (rating BETWEEN 0 AND 5),
  experience INTEGER NOT NULL DEFAULT 0 CHECK (experience >= 0),
  photo TEXT NOT NULL DEFAULT '',
  schedule VARCHAR(100) NOT NULL DEFAULT '',
  available BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE appointments (
  id SERIAL PRIMARY KEY,
  patient_id INTEGER NOT NULL REFERENCES users(id),
  doctor_id INTEGER NOT NULL REFERENCES doctors(id),
  date DATE NOT NULL,
  time TIME NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'Pendiente'
    CHECK (status IN ('Pendiente', 'Confirmada', 'Cancelada', 'Finalizada')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (doctor_id, date, time)
);

CREATE PROCEDURE calculate_doctor_daily_load(
  IN p_doctor_id INTEGER,
  IN p_date DATE,
  IN p_daily_capacity INTEGER,
  INOUT p_booked INTEGER,
  INOUT p_available INTEGER
)
LANGUAGE plpgsql
AS $$
BEGIN
  SELECT COUNT(*)::INTEGER
    INTO p_booked
    FROM appointments
   WHERE doctor_id = p_doctor_id
     AND date = p_date
     AND status IN ('Pendiente', 'Confirmada');

  p_available := GREATEST(p_daily_capacity - p_booked, 0);
END;
$$;

CREATE PROCEDURE calculate_patient_appointment_totals(
  IN p_patient_id INTEGER,
  INOUT p_total INTEGER,
  INOUT p_active INTEGER,
  INOUT p_completed INTEGER
)
LANGUAGE plpgsql
AS $$
BEGIN
  SELECT
    COUNT(*)::INTEGER,
    COUNT(*) FILTER (WHERE status IN ('Pendiente', 'Confirmada'))::INTEGER,
    COUNT(*) FILTER (WHERE status = 'Finalizada')::INTEGER
  INTO p_total, p_active, p_completed
  FROM appointments
  WHERE patient_id = p_patient_id;
END;
$$;

CREATE TABLE push_subscriptions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  endpoint TEXT NOT NULL UNIQUE,
  p256dh TEXT NOT NULL,
  auth TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_push_subscriptions_user_id ON push_subscriptions(user_id);

COMMIT;
