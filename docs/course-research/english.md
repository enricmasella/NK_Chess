# Investigación · The English Opening

Bloque 6 · comprobado el 2026-11-06. Fuentes: Wikipedia (*English Opening*), Chess Cloud Database;
Stockfish 19 (profundidad 18).

## Qué se verificó

| Capítulo | Línea | Evaluación |
| --- | --- | --- |
| 1. Siciliana invertida | `1.c4 e5 2.Nc3 Nf6 3.g3 d5 4.cxd5 Nxd5 5.Bg2 Nb6 6.Nf3 Nc6 7.O-O Be7` | +0,17 blanco |
| 2. Centro simétrico | `1...Nf6 2.Nc3 e6 3.Nf3 d5 4.cxd5 exd5 5.d4 Be7 6.Bg5 O-O 7.e3 c6` | +0,28 blanco |
| 3. English simétrica | `1...c5 2.Nf3 Nf6 3.Nc3 Nc6 4.g3 g6 5.Bg2 Bg7 6.O-O O-O 7.d4 cxd4 8.Nxd4` | **+0,43 blanco** |

Alternativas medidas: `d3`/`Be3` en el capítulo 1 +0,15; `Bf4` en el capítulo 2 +0,36; `...e6`/`...d5` en
el capítulo 3 +0,26.

## Hallazgos

1. **La simétrica es la mejor línea del curso** (+0,43): el negro cambia en d4 y el blanco queda con
   presión en la columna d. El capítulo lo decía sin número.
2. **En el capítulo 2, `Bf4` es mejor que `Bg5`** (+0,36 frente a +0,28): evita `...Nh5` y saca el alfil
   fuera de la cadena. Añadido como alternativa recomendada.
3. **La Siciliana invertida es la más floja** (+0,17): con `...Nb6` y `...Be7` el negro iguala sin
   problemas. El texto ahora lo reconoce en lugar de describirla como «presión».
4. Los tres capítulos son de igualdad a pequeña ventaja: no hay línea que gane por sí sola, y el curso se
   vende así.

## Correcciones aplicadas

1. Resumen con las tres evaluaciones reales.
2. Capítulos 1, 2 y 3 reescritos con planes de los dos bandos, transposiciones, fuentes y confianza C.
3. Capítulo 1: añadida la versión `d3`/`Be3` con su dato (+0,15), que es la que consolida antes de abrir.
4. Capítulo 2: `Bf4` como alternativa por delante de `Bg5`.

## Huecos declarados

- Sin `LICHESS_TOKEN` no hay frecuencia de maestros de `1.c4`; no se dan porcentajes.
- No se incluye partida modelo verificable.
- No se ha encontrado una trampa verificable con el motor para este curso; no se inventa.

## Fuentes

- Wikipedia, *English Opening* — https://en.wikipedia.org/wiki/English_Opening
- Chess Cloud Database — https://www.chessdb.cn/
- Stockfish 19, profundidad 18 en las 6 líneas del curso.
