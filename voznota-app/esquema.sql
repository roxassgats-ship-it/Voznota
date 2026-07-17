-- Esquema de datos de Voznota v1 (espejo fiel de lo que la app guarda hoy)
-- IMPORTANTE: este pragma es POR CONEXION - ejecutar en cada apertura de la
-- base, no queda grabado en el archivo .db (hallazgo QA, revision 2026-07-16)
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS notas (
  id INTEGER PRIMARY KEY,
  titulo TEXT NOT NULL,
  transcripcion TEXT NOT NULL,
  creada_en TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS tareas (
  id INTEGER PRIMARY KEY,
  nota_id INTEGER NOT NULL REFERENCES notas(id) ON DELETE CASCADE,
  texto TEXT NOT NULL,
  hecha INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS idx_tareas_nota ON tareas(nota_id);
CREATE INDEX IF NOT EXISTS idx_tareas_pendientes ON tareas(hecha, nota_id);
