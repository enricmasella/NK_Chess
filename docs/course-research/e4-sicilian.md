# Investigación · 1.e4 Part 2: Sicilian (Mengarini)

Bloque 2 · comprobado el 2026-11-06. Teoría: Wikipedia, *Sicilian Defence*. Base: Chess Cloud
Database. Motor: Stockfish 19, profundidad 18–20 en las posiciones discutidas.

## Qué se verificó

| Capítulo | Línea | Evaluación |
| --- | --- | --- |
| 1. La Mengarini (2.a3 y 3.b4) | `...Nxb4 c3 Nc6 d4 d5` | +0,25 blanco |
| 2. Contra 2...g6 | `3.Nc3 Bg7 4.g3 d6 5.Bg2 Nc6 6.Nge2` | +0,18 negro (igualdad) |
| 3. Contra 2...d5 | `...Qd8 4.Nc3 5.d3 Nf6 6.Nf3 e6` | +0,19 blanco |

## Correcciones importantes

1. **El capítulo 2 era una línea perdedora.** Enseñaba `3.b4 Bg7 4.Nc3 Nf6 5.Nf3 O-O 6.Bb2 d6
   7.d4` con la idea de «presionar d5 con b5». El motor da **+0,9 al negro**: el enroque negro llega
   antes de que el blanco desarrolle y el centro se abre a su favor. Sustituido por el doble
   fianchetto (`g3`, `Bg2`, `Nge2`), que es igualado. La línea mala se conserva como alternativa
   para reconocerla.
2. **El capítulo 3 enseñaba `6.Bc4`, un error de 0,9** según el motor: la dama negra está en d8 y el
   caballo de f6 puede tomar e4. Sustituido por `d3`, `Nf3`, `Be2` y enroque, con igualdad.
3. El capítulo 1 decía que las blancas «obtienen espacio» sin más; ahora dice lo que cuesta: el peón
   b y ~0,3 de evaluación. CDB marca `2.a3` como jugable (`*`), no como recomendada.

## Discrepancias motor / teoría

| Jugada | Pérdida | Lectura |
| --- | --- | --- |
| `2.a3` | 35–43 cp | Es la idea del curso; el motor prefiere `2.Nf3`. CDB la acepta como jugable. Se mantiene con la evaluación escrita. |
| `...d5` tras 2.a3 | 55 cp | CDB recomienda (`*`); el motor prefiere `...g6`. La dama negra se expone, que es justo lo que explota el capítulo 3. |

## Nota de método

La primera auditoría (profundidad 12) marcaba en este curso un «error grave» de 162 cp en una jugada
que a profundidad 20 está igualada. Por eso la auditoría del proyecto pasa a **profundidad 16**: con
12, las posiciones sicilianas abiertas generan falsos positivos.

## Métricas de auditoría (profundidad 16)

**1.e4 Part 2: Sicilian posiciones, 38 señaladas, 0 errores graves, pérdida media 7 cp** (peor 9,3). Las señaladas son
jugadas de libro que CDB recomienda y el motor discute; ninguna queda sin explicación en este informe.

## Huecos declarados

- Sin `LICHESS_TOKEN` no hay frecuencia de maestros: no se cita ninguna partida de este curso.

## Fuentes

- Wikipedia, *Sicilian Defence* — https://en.wikipedia.org/wiki/Sicilian_Defence
- Chess Cloud Database — https://www.chessdb.cn/
- Stockfish 19 (profundidad 18–20; auditoría a 16).
