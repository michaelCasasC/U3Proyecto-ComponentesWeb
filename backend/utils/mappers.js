const doctorSelect = `
  SELECT d.id, d.name, d.specialty_id AS "specialtyId", s.name AS specialty,
         d.rating, d.experience, d.photo, d.schedule, d.available
  FROM doctors d JOIN specialties s ON s.id = d.specialty_id`

const appointmentSelect = `
  SELECT a.id, a.patient_id AS "patientId", u.name AS "patientName",
         a.doctor_id AS "doctorId", d.name AS "doctorName", s.name AS specialty,
         TO_CHAR(a.date, 'YYYY-MM-DD') AS date, TO_CHAR(a.time, 'HH24:MI') AS time,
         a.status, a.created_at AS "createdAt"
  FROM appointments a
  JOIN users u ON u.id = a.patient_id
  JOIN doctors d ON d.id = a.doctor_id
  JOIN specialties s ON s.id = d.specialty_id`

function normalizeDoctor(row) {
  return row ? { ...row, rating: Number(row.rating), available: Boolean(row.available) } : row
}

module.exports = { doctorSelect, appointmentSelect, normalizeDoctor }
