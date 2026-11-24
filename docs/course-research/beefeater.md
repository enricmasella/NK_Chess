# Investigación · The Beefeater Defense

Bloque 5 · comprobado el 2026-11-06. Fuentes: Chess Cloud Database; Stockfish 19 (profundidad 18);
esquema Basman/Beefeater (`1...c6`, `...e5`, `...e4`).

## Qué se verificó

| Capítulo | Línea | Evaluación |
| --- | --- | --- |
| 1. ...c6, ...e5 y ...e4 | `1.d4 c6 2.c4 e5 3.Nf3 e4 4.Nfd2 d5 5.e3 Nf6` | **+0,24 negro** |
| 2. Contra 2.e4 | `2.e4 d5 3.exd5 cxd5 4.c4 Nf6 5.Nc3 e6` | +0,23 blanco |

Comprobada además `4...Be7` en lugar de `...d5` (desarrollo tranquilo, sin evaluación de motor afirmada).

## Hallazgos

1. **Es el único de los cinco cursos del bloque con evaluación favorable al bando del curso**: +0,24
   negro. El esquema cierra el centro y las piezas blancas no encuentran plan si el negro juega `...f5`
   en el momento justo.
2. **La auditoría marcaba `Nf3` (166 cp)**: no es un error del negro, es que el blanco tenía `dxe5` antes.
   El capítulo lo explica: el negro agradece `Nf3` porque le permite `...e4` con tempo.
3. **La transposición a Caro-Kann es real**: tras `2.e4 d5` la partida es una Caro con un tiempo de menos,
   y el motor da solo +0,23 al blanco.

## Correcciones aplicadas

1. Resumen con la evaluación real (+0,24 negro) y la idea del sistema.
2. Capítulo 1: alternativa `4...Be7`, planes de los dos bandos, transposición y fuentes con confianza C.
3. Capítulo 2: evaluación +0,23, planes y transposición a la Caro-Kann.
4. Se sustituye la etiqueta «offbeat» por una descripción verificable del esquema.

## Huecos declarados

- No hay teoría publicada estándar del Beefeater: no se cita libro ni partida, y la confianza es C.
- Sin `LICHESS_TOKEN` no hay frecuencia de maestros (y en esta apertura sería casi nula).

## Fuentes

- Chess Cloud Database — https://www.chessdb.cn/
- Stockfish 19, profundidad 18 en todas las líneas del curso.
