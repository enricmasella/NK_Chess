# Investigación · King's Knight Opening

Bloque 6 · comprobado el 2026-11-06. Fuentes: Wikipedia (*Petrov's Defence*, *Philidor Defence*,
*Scotch Game*), Chess Cloud Database; Stockfish 19 (profundidad 18).

## Qué se verificó

| Capítulo | Línea | Evaluación |
| --- | --- | --- |
| 1. El Petrov | `1.e4 e5 2.Nf3 Nf6 3.Nxe5 d6 4.Nf3 Nxe4 5.d4 d5 6.Bd3 Be7 7.O-O Nc6 8.c4 Nb4 9.Be2` | +0,47 blanco |
| 2. El Philidor | `2...d6 3.d4 exd4 4.Nxd4 Nf6 5.Nc3 Be7 6.Be2 O-O 7.O-O` | +0,35 blanco |
| 3. El Scotch | `2...Nc6 3.d4 exd4 4.Nxd4 Bc5 5.Be3 Qf6 6.c3 Nge7 7.Bc4` | +0,24 blanco |

Alternativas medidas: `4.Nc3` en el Petrov +0,16; `3...Nd7` en el Philidor +0,50; `4...Nf6` en el Scotch
0,00.

## Hallazgos

1. **La captura del Petrov es correcta y da más de lo que el curso decía**: +0,47, no «igualdad
   material». El caballo negro de e4 es un objetivo y el blanco tiene la pareja de alfiles tras ...Nxc3.
2. **El Philidor es el capítulo más flojo del curso en evaluación** (+0,35) pero el más sólido en plan: el
   alfil de c8 no tiene casilla y el blanco puede jugar f4 sin riesgo.
3. **El Scotch es igualdad práctica contra la defensa precisa**: +0,24 con `7.Bc4`, pero `4...Nf6` lleva
   a 0,00. Se dice en el capítulo, no se vende como ventaja.
4. La auditoría anterior no marcaba errores graves en este curso: los cambios son de contenido
   (planes, transposiciones, fuentes), no de jugadas.

## Correcciones aplicadas

1. Resumen con las tres evaluaciones reales (0,47 / 0,35 / 0,24) en lugar de una promesa genérica.
2. Los tres capítulos reescritos con alternativas medidas, planes de ambos bandos, transposiciones y
   fuentes con confianza C.
3. Capítulo 3: se explica que `4...Nf6` es la igualdad y que el Scotch se juega por posición, no por
   ventaja.

## Huecos declarados

- Sin `LICHESS_TOKEN` no hay frecuencia de maestros de `3.Nxe5` ni de `4...Nf6`; no se dan porcentajes.
- No se incluye partida modelo verificable.
- No se ha encontrado una trampa verificable con el motor para este curso; no se inventa.

## Fuentes

- Wikipedia, *Petrov's Defence* — https://en.wikipedia.org/wiki/Petrov%27s_Defence
- Wikipedia, *Philidor Defence* — https://en.wikipedia.org/wiki/Philidor_Defence
- Wikipedia, *Scotch Game* — https://en.wikipedia.org/wiki/Scotch_Game
- Chess Cloud Database — https://www.chessdb.cn/
- Stockfish 19, profundidad 18 en las 7 líneas del curso.
