# NK_Chess

Plataforma de ajedrez educativo de código abierto: catálogo de cursos con estudios jugables y
ejercicios que se corrigen solos.

- **73 cursos** — 67 publicados + 6 en preparación —, 181 capítulos y 286 líneas.
- Tablero interactivo, estudios paso a paso y 1.203 ejercicios derivados de las líneas y de las trampas.
- 3.976 jugadas auditadas con Stockfish 19 a profundidad 16 (`npm run engine:audit`), con planes,
transposiciones, trampas y fuentes por capítulo; 30 cursos investigados a fondo en
`docs/course-research/`.
- Progreso y XP guardados en `localStorage`.
- Sin cuentas, sin backend, sin vídeos.

## Arrancar

```bash
npm install
npm run dev      # http://localhost:5183
npm run build    # build de producción
npm run verify         # valida catálogo + legalidad de líneas + ejercicios
npm run engine:audit   # Stockfish sobre todas las posiciones (requiere .engine/)
npm run engine:report  # regenera docs/ENGINE-AUDIT.md
```

## Cómo está organizado

```
src/
  data/         catálogo (white / black / skills), tipos y agregados
  lib/          utilidades de ajedrez y progreso
  components/   tablero y resolvedor de ejercicios
  views/        catálogo, curso, capítulo, entrenamiento, progreso
scripts/        verificación automatizada
docs/           auditoría, fuentes e inventario generado
```

Cada capítulo declara una línea principal en SAN (con FEN opcional) y variantes alternativas. De ahí
se derivan automáticamente los ejercicios: todas las posiciones en las que le toca mover al bando
que se entrena.

## Estado del contenido

El catálogo replica la cobertura pública identificable de Chessly (nombres, categorías, niveles y
estado), verificada contra la web pública. Las explicaciones, títulos de capítulo y líneas son
contenido original de este proyecto, validado en legalidad pero **no** contrastado todavía con una
base de datos de partidas. La auditoría con Stockfish 19 cubre las 2.252 posiciones de las líneas y
clasifica las jugadas por pérdida de centipeones; el Lichess Opening Explorer no es accesible desde
este entorno (HTTP 401).

Detalles, fuentes y límites: [`docs/AUDIT.md`](docs/AUDIT.md),
[`docs/RESEARCH.md`](docs/RESEARCH.md) y [`docs/ENGINE-AUDIT.md`](docs/ENGINE-AUDIT.md).

Proyecto independiente: no está afiliado a Chessly ni a GothamChess, y no reproduce material
propietario.
