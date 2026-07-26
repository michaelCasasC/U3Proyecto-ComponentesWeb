BEGIN;

INSERT INTO users (name, email, password, role) VALUES
  ('Jefferson Mejía', 'jefferson.mejia@gmail.com', crypt('admin123', gen_salt('bf', 10)), 'admin'),
  ('Andrea Cedeño', 'andrea.cedeno@gmail.com', crypt('123456', gen_salt('bf', 10)), 'patient'),
  ('Carlos Zambrano', 'carlos.zambrano@gmail.com', crypt('123456', gen_salt('bf', 10)), 'patient');

INSERT INTO specialties (name, icon, description, color) VALUES
  ('Cardiología', 'Favorite', 'Prevención, diagnóstico y tratamiento de enfermedades cardiovasculares.', '#e53935'),
  ('Pediatría', 'ChildCare', 'Atención integral para niños y adolescentes.', '#43a047'),
  ('Traumatología', 'Healing', 'Diagnóstico y tratamiento de lesiones musculoesqueléticas.', '#fb8c00'),
  ('Neurología', 'Psychology', 'Atención de enfermedades del sistema nervioso.', '#8e24aa'),
  ('Dermatología', 'Spa', 'Diagnóstico y cuidado de la piel, cabello y uñas.', '#ec407a'),
  ('Oftalmología', 'Visibility', 'Prevención y tratamiento de enfermedades oculares.', '#00897b'),
  ('Medicina General', 'LocalHospital', 'Atención primaria, prevención y seguimiento de enfermedades.', '#3949ab');

INSERT INTO doctors (name, specialty_id, rating, experience, schedule, available) VALUES
  ('Dra. María Fernanda López', (SELECT id FROM specialties WHERE name = 'Cardiología'), 4.9, 14, 'Lun-Vie 08:00-14:00', TRUE),
  ('Dr. Andrés Molina', (SELECT id FROM specialties WHERE name = 'Cardiología'), 4.7, 10, 'Lun-Vie 14:00-18:00', TRUE),
  ('Dra. Gabriela Torres', (SELECT id FROM specialties WHERE name = 'Pediatría'), 4.8, 12, 'Lun-Vie 09:00-16:00', TRUE),
  ('Dr. José Luis Mendoza', (SELECT id FROM specialties WHERE name = 'Traumatología'), 4.6, 16, 'Mar-Sáb 08:00-14:00', TRUE),
  ('Dra. Daniela Paredes', (SELECT id FROM specialties WHERE name = 'Neurología'), 4.9, 11, 'Lun-Vie 10:00-17:00', TRUE),
  ('Dra. Valeria Ríos', (SELECT id FROM specialties WHERE name = 'Dermatología'), 4.8, 9, 'Lun-Vie 09:00-15:00', TRUE),
  ('Dr. Sebastián Vera', (SELECT id FROM specialties WHERE name = 'Oftalmología'), 4.7, 13, 'Mar-Sáb 09:00-16:00', TRUE),
  ('Dra. Carolina Ortiz', (SELECT id FROM specialties WHERE name = 'Medicina General'), 4.9, 8, 'Lun-Vie 07:30-15:30', TRUE);

INSERT INTO appointments (patient_id, doctor_id, date, time, status) VALUES
  ((SELECT id FROM users WHERE email = 'andrea.cedeno@gmail.com'), (SELECT id FROM doctors WHERE name = 'Dra. María Fernanda López'), CURRENT_DATE + 3, '09:00', 'Confirmada'),
  ((SELECT id FROM users WHERE email = 'andrea.cedeno@gmail.com'), (SELECT id FROM doctors WHERE name = 'Dra. Valeria Ríos'), CURRENT_DATE + 8, '14:30', 'Pendiente'),
  ((SELECT id FROM users WHERE email = 'carlos.zambrano@gmail.com'), (SELECT id FROM doctors WHERE name = 'Dr. José Luis Mendoza'), CURRENT_DATE - 7, '10:00', 'Finalizada');

COMMIT;
