# NK_Chess · auditoría de contenido

Fecha de auditoría: **2026-11-06**. Fuente de referencia: `https://chessly.com/public/courses`.

## 1. Método

1. La página pública de cursos de Chessly se renderiza en el cliente (Next.js), así que un `fetch`
   simple devuelve un shell vacío. Se renderizó con Chrome headless (`--dump-dom`) y se extrajeron
   los nombres publicados desde el DOM real.
2. La antigua web (`old.chessly.com/courses`) sí expone datos estructurados en `__NEXT_DATA__`:
   se descargó y se parseó para obtener cursos, módulos y capítulos. Ese archivo contiene 15 cursos
   legacy con su lista real de capítulos; se usó como evidencia de la estructura de capítulos de
   Chessly, no como texto a copiar.
3. Los detalles de curso de la web nueva están detrás de login (`/courses/<id>` redirige a "Log In"),
   por lo que **no** se pudieron extraer capítulos de los 67 cursos publicados. Este es el límite
   real de la auditoría y está documentado abajo.
4. El catálogo implementado se compara automáticamente contra `docs/source-catalogue.txt` con
   `npm run verify`.

## 2. Resultado de la auditoría

| Métrica | Valor |
| --- | --- |
| Nombres de curso publicados identificados | 67 |
| Cursos "coming soon" identificados | 6 |
| Total de entradas del catálogo | 73 |
| Cursos implementados en NK_Chess | 73 (67 publicados + 6 en preparación) |
| Capítulos originales escritos | 174 |
| Líneas y variantes | 182 |
| Jugadas validadas con chess.js | 2332 |
| Ejercicios generados y verificados | 1150 |

El inventario completo, generado a partir de los datos reales, está en
[`course-inventory.md`](./course-inventory.md). La lista de nombres extraída de la fuente está en
[`source-catalogue.txt`](./source-catalogue.txt).

## 3. Qué está verificado

- **Catálogo**: los 73 nombres coinciden exactamente con la fuente pública. La comprobación es
  bidireccional: falla si falta un curso de la fuente o si aparece uno que no está en ella.
- **Legalidad**: cada capítulo, variante y ejercicio se reproduce con `chess.js`. El script falla
  con la jugada exacta que rompe la línea; durante el desarrollo detectó y permitió corregir varios
  errores reales (jugadas ilegales, un FEN con el rey en la casilla equivocada y nombres que no
  coincidían con la fuente).
- **Ejercicios**: cada respuesta esperada se valida aplicándola sobre su propio FEN.
- **Categorías, niveles y estado**: derivados de las secciones públicas de la web (White Openings,
  Black Openings, Skills Courses, Coming Soon).

## 4. Qué es contenido original (no verificado contra Chessly)

- Los títulos y textos de los capítulos, las explicaciones y las variantes alternativas son
  **reconstrucción original**: teoría de ajedrez escrita para este proyecto. Chessly no publica
  esos capítulos sin cuenta, así que no se copiaron ni se atribuyen a su catálogo.
- No se ha reproducido vídeo, texto de lección, base de datos ni material protegido.
- Las frases sobre el autor que aparecen en las descripciones (por ejemplo, qué apertura se asocia
  a Levy) provienen de las descripciones públicas de los cursos, no de invención.

## 5. Limitaciones y siguientes pasos

1. **Evaluación de calidad de las líneas**: la verificación actual es de legalidad, no de
   corrección teórica. Contrastar cada línea con una base de datos de partidas (Lichess/ChessBase)
   o con un motor (Stockfish) es el siguiente paso natural; el proyecto no incluye motor.
2. **Capítulos de Chessly**: sin cuenta no son accesibles. La cobertura se ha replicado por tema
   (cada curso tiene capítulos sobre sus ideas centrales) y no capítulo a capítulo.
3. **Vídeos y quices originales**: fuera de alcance por derechos de autor.

## 6. Sobre la skill `rea`

Se buscó en el catálogo local (`~/.agents/skills/`) y en el registro público
(`npx skills find rea`). **No existe una skill llamada `rea`**: el catálogo local no la contiene y
el registro devuelve coincidencias parciales no relacionadas (`break-ui`,
`roblox-creator-store-security-audit`). No se instaló ni se sustituyó por otra skill: el trabajo se
hizo con las instrucciones del proyecto y verificación propia.

## 7. Fuentes

- `https://chessly.com/public/courses` — catálogo público (renderizado con Chrome headless el
  2026-11-06).
- `https://old.chessly.com/courses` — `__NEXT_DATA__` con 15 cursos legacy y sus módulos.
- `https://chessly.com/courses/<id>` — redirige a login; sin acceso a capítulos.
- `https://chessly.com/` — página de inicio (70+ cursos, membresía).
