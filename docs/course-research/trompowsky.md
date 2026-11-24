# Investigación · The Trompowsky Attack

Bloque 6 · comprobado el 2026-11-06. Fuentes: Wikipedia (*Trompowsky Attack*), Chess Cloud Database;
Stockfish 19 (profundidad 18).

## Qué se verificó

| Capítulo | Línea | Evaluación |
| --- | --- | --- |
| 1. 2.Bg5 y ...Ne4 | `1.d4 Nf6 2.Bg5 Ne4 3.Bf4 d5 4.f3 Nf6 5.e4` | 0,02 negro (igualdad) |
| 2. Contra 2...e6 | `2...e6 3.e4 h6 4.Bxf6 Qxf6 5.Nc3 d6 6.Qd2 g6` | **+0,59 blanco** |
| 3. Contra 2...d5 | `2...d5 3.Bxf6 exf6 4.e3 Bd6 5.c4 c6 6.Nc3 O-O` | **+0,88 blanco** |

Alternativas medidas: `3.Bh4` **0,23 negro**; `3...c5` tras `Bf4` +0,52 blanco; `5.Bh4?? g5` **1,37
negro**.

## Hallazgos

1. **El capítulo 2 enseñaba la jugada perdedora como si fuera una opción.** `5.Bh4` permite `...g5` y
   `...Nxe4`: el negro gana un peón y el alfil queda enterrado. Motor: **1,37 negro**. Ahora está como
   alternativa explicada y la principal es el cambio en f6.
2. **El cambio en f6 es la razón de ser del curso**: contra `...e6` da +0,59 y contra `...d5` +0,88,
   porque el negro no puede activar su pareja de alfiles y sus peones quedan doblados.
3. **Contra `...Ne4`, `Bf4` es mejor que `Bh4`**: 0,02 frente a 0,23 para el negro. `Bf4` devuelve el
   caballo a f6 con pérdida de tiempo; `Bh4` permite `...dxe4` gratis.
4. `3...c5` es la respuesta crítica (+0,52 blanco): el negro ataca d4 en lugar de ceder el tiempo, y la
   dama acaba expuesta en b6.

## Correcciones aplicadas

1. Resumen con las tres evaluaciones reales (0,02 / 0,59 / 0,88).
2. Capítulo 2: `5.Bh4` degradado a alternativa con el 1,37 explicado; la principal mantiene `Bxf6`.
3. Los tres capítulos reescritos con planes, transposiciones, fuentes y confianza C.
4. Capítulo 1: dos alternativas medidas (`Bh4` y `...c5`).

## Huecos declarados

- Sin `LICHESS_TOKEN` no hay frecuencia de maestros de `2.Bg5`; no se dan porcentajes.
- No se incluye partida modelo verificable.
- `...gxf6` en el capítulo 3 queda sin evaluación propia: la línea es legal y la auditoría la mide, pero
  no se le asigna número en el texto.
- No se ha encontrado una trampa verificable con el motor para este curso; no se inventa.

## Fuentes

- Wikipedia, *Trompowsky Attack* — https://en.wikipedia.org/wiki/Trompowsky_Attack
- Chess Cloud Database — https://www.chessdb.cn/
- Stockfish 19, profundidad 18 en las 7 líneas del curso.
