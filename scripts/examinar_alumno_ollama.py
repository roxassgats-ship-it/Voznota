#!/usr/bin/env python3
"""
Examinador de alumnos locales (Ollama) — el enchufe del colegio.
Uso (en tu PC, con ollama corriendo):  python examinar_alumno_ollama.py qwen3
Toma el examen de ubicación de SQL, corrige con el MOTOR (no a ojo) y
escribe el acta. Sin ollama disponible, corre en modo --demo para verificar
que el corrector funciona (prueba de vida del examinador mismo).
"""
import json, sys, sqlite3, urllib.request, re, datetime

OLLAMA_URL = "http://localhost:11434/api/generate"

CASOS = [
    {"id": 1, "pts": 2, "pregunta": "Tenés la tabla notas(id, titulo, duracion_seg). Escribí SOLO la consulta SQL para: títulos de las notas de más de 60 segundos, ordenadas de más larga a más corta.",
     "verificar": "sql_select", "esperado": [("Reunion lunes",), ("Ideas app",)]},
    {"id": 2, "pts": 3, "pregunta": "Tablas: notas(id,titulo) y tareas(id,nota_id,texto,hecha). Escribí SOLO la consulta SQL para: título y cantidad de tareas PENDIENTES (hecha=0) de las notas que tengan MÁS de una pendiente.",
     "verificar": "sql_select", "esperado": [("Reunion lunes", 2), ("Ideas app", 2)]},
    {"id": 3, "pts": 3, "pregunta": "Vas a borrar filas de una tabla grande. Describí en 3 pasos cortos el procedimiento SEGURO antes y durante el borrado.",
     "verificar": "texto", "claves": ["select", "count", "transac"]},
    {"id": 4, "pts": 2, "pregunta": "¿Por qué NUNCA se concatena texto del usuario dentro de una consulta SQL y qué se usa en su lugar? Respondé en 2 frases.",
     "verificar": "texto", "claves": ["inyec", "parámetro|parametro|\\?"]},
]

def base_de_examen():
    con = sqlite3.connect(":memory:"); c = con.cursor()
    c.executescript("""
    CREATE TABLE notas (id INTEGER PRIMARY KEY, titulo TEXT, duracion_seg INTEGER);
    CREATE TABLE tareas (id INTEGER PRIMARY KEY, nota_id INTEGER, texto TEXT, hecha INTEGER);
    INSERT INTO notas VALUES (1,'Compras',42),(2,'Reunion lunes',180),(3,'Ideas app',95),(4,'Llamar dentista',20);
    INSERT INTO tareas VALUES (1,2,'enviar acta',0),(2,2,'agendar seguimiento',0),(3,2,'reservar sala',1),
                              (4,3,'boceto pantalla',0),(5,3,'lista de campos',0),(6,1,'comprar leche',1);""")
    return c

def preguntar_a_ollama(modelo, pregunta):
    datos = json.dumps({"model": modelo, "prompt":
        "Sos un alumno rindiendo un examen del colegio de IA. Respondé SOLO lo pedido, sin explicaciones extra.\n\n" + pregunta,
        "stream": False}).encode()
    req = urllib.request.Request(OLLAMA_URL, data=datos, headers={"Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=120) as r:
        return json.loads(r.read())["response"].strip()

def extraer_sql(texto):
    m = re.search(r"(SELECT[\s\S]*?)(;|$)", texto, re.IGNORECASE)
    return m.group(1) if m else texto

def corregir(caso, respuesta):
    if caso["verificar"] == "sql_select":
        try:
            got = base_de_examen().execute(extraer_sql(respuesta)).fetchall()
            return caso["pts"] if got == caso["esperado"] else 0, f"motor: {got}"
        except Exception as e:
            return 0, f"motor: ERROR {e}"
    else:
        r = respuesta.lower()
        aciertos = sum(1 for k in caso["claves"] if re.search(k, r))
        pts = round(caso["pts"] * aciertos / len(caso["claves"]))
        return pts, f"claves detectadas: {aciertos}/{len(caso['claves'])}"

def main():
    modelo = sys.argv[1] if len(sys.argv) > 1 else "--demo"
    total, detalles = 0, []
    for caso in CASOS:
        if modelo == "--demo":  # respuestas correctas simuladas: verifica el CORRECTOR
            demo = {1: "SELECT titulo FROM notas WHERE duracion_seg > 60 ORDER BY duracion_seg DESC",
                    2: "SELECT n.titulo, COUNT(*) FROM notas n JOIN tareas t ON t.nota_id=n.id WHERE t.hecha=0 GROUP BY n.id HAVING COUNT(*)>1 ORDER BY n.id",
                    3: "1. SELECT COUNT(*) con el mismo WHERE para ver el alcance. 2. BEGIN transacción. 3. DELETE y COMMIT (ROLLBACK si algo no cuadra).",
                    4: "Porque el texto puede convertirse en comando (inyección SQL). Se usan parámetros (?) que viajan como dato puro."}
            respuesta = demo[caso["id"]]
        else:
            respuesta = preguntar_a_ollama(modelo, caso["pregunta"])
        pts, evidencia = corregir(caso, respuesta)
        total += pts
        detalles.append(f"  Caso {caso['id']}: {pts}/{caso['pts']} ({evidencia})")
        print(f"Caso {caso['id']} [{pts}/{caso['pts']}] {evidencia}")
    nota = f"{total}/10"
    veredicto = "APRUEBA basica de SQL (15%) -> sigue al examen de media" if total >= 8 else "REPRUEBA -> estudiar lecciones 001-003 del corpus y re-rendir"
    print(f"\nNOTA: {nota} -> {veredicto}")
    acta = (f"| {datetime.date.today()} | alumno {modelo} (local/ollama) | {nota} | "
            f"motor SQLite + detector de claves (script) | {veredicto} |")
    print("\nFila para el acta (pegar en corpus/datos-sql/examenes/):\n" + acta)

if __name__ == "__main__":
    main()
