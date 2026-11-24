# Investigación · The Danish Gambit

Bloque 5 · comprobado el 2026-11-06. Fuentes: Wikipedia, *Danish Gambit* (C21); Chess Cloud Database;
Stockfish 19 (profundidad 18).

## Qué se verificó

| Capítulo | Línea | Evaluación |
| --- | --- | --- |
| 1. Los tres peones | `1.e4 e5 2.d4 exd4 3.c3 dxc3 4.Bc4 cxb2 5.Bxb2 d5 6.Bxd5 Nf6 7.Bxf7+ Kxf7 8.Qxd8 Bb4+ 9.Qd2 Bxd2+ 10.Nxd2 c6` | +0,55 blanco |
| 2. Contra 3...d5 | `3...d5 4.exd5 Qxd5 5.cxd4 Nc6 6.Nf3 Bg4 7.Be2` | +0,19 negro |
| 3. Gambito Goring | `2.Nf3 Nc6 3.d4 exd4 4.c3 dxc3 5.Nxc3 d6 6.Bc4 Be7 7.Qb3` | **+1,51 blanco** |

Comprobadas además: `5...Nf6` (**+0,60 negro**, la defensa que prefiere el motor), `7.Bxd5` sin sacrificar
(0,00) y el orden `3...d5` con `...Qxd5` (igualdad).

## Hallazgos

1. **El resumen vendía una demolición y es +0,55.** El gambito danés da una ventaja pequeña y estable
   (dos alfiles y columna f), no un ataque ganador. Texto corregido.
2. **Discrepancia teoría/motor documentada**: la teoría juega `5...d5`, el motor prefiere `5...Nf6` con
   +0,60 para el negro. Se mantiene la línea de libro (regla del proyecto) y se deja constancia en la
   alternativa del capítulo, sin reescribirla.
3. **El Gambito Goring es la mejor línea del curso** (+1,51) y estaba sin evaluación. Ahora es el capítulo
   3 con ese dato y con `...Na5` como recurso del negro.
4. La auditoría marcaba `Bc4` y `c3` con CDB recomendándolas (`!`): son las jugadas del gambito, respaldadas
   por la base. No se tocan.

## Correcciones aplicadas

1. Capítulo 1: evaluación real en el texto, alternativas `5...Nf6` y `7.Bxd5`, planes de los dos bandos,
   transposiciones y fuente.
2. Capítulo 2: añadidos planes y fuentes; la evaluación (+0,19 negro) se dice en la idea.
3. Capítulo 3: Goring con `+1,51`, alternativa `4...Nf6` y planes.
4. Los tres capítulos tienen fuentes con fecha y confianza B.

## Huecos declarados

- Sin `LICHESS_TOKEN` no hay frecuencia de maestros del Danés; no se dan porcentajes.
- No se cita ninguna partida completa: solo la referencia histórica (Martin Severin From), sin planilla.

## Fuentes

- Wikipedia, *Danish Gambit* — https://en.wikipedia.org/wiki/Danish_Gambit
- Chess Cloud Database — https://www.chessdb.cn/
- Stockfish 19, profundidad 18 en todas las líneas del curso.
