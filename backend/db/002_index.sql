BEGIN;

CREATE UNIQUE INDEX ux_users_email_lower ON users (LOWER(email));
CREATE INDEX ix_doctors_specialty_available ON doctors (specialty_id, available);
CREATE INDEX ix_doctors_name_lower ON doctors (LOWER(name));
CREATE INDEX ix_specialties_name_lower ON specialties (LOWER(name));
CREATE INDEX ix_appointments_patient_date ON appointments (patient_id, date DESC);
CREATE INDEX ix_appointments_patient_status_date ON appointments (patient_id, status, date DESC);
CREATE INDEX ix_appointments_doctor_date_status ON appointments (doctor_id, date, status);

COMMIT;
