# Investigación · The Jaenisch Gambit

Bloque 4 · comprobado el 2026-11-06. Fuentes: Wikipedia, *Jaenisch Gambit* (C63); Chess Cloud Database;
Stockfish 19 (profundidad 18).

## Qué se verificó

| Capítulo | Línea | Evaluación |
| --- | --- | --- |
| 1. Línea crítica 4.Nc3 | `4.Nc3 fxe4 5.Nxe4 d5 6.Nxe5 dxe4 7.Nxc6 Qg5 8.Qe2 Nf6` | +0,65 blanco |
| 2. 4.d3 | `4.d3 fxe4 5.dxe4 Nf6 6.O-O Bc5` | +0,62 blanco |
| 3. 4.exf5 | `4.exf5 e4 5.Qe2 Qe7 6.Bxc6 dxc6 7.Nd4 Nh6` | **0,00** |

Comprobadas además: `9.f4 Qxf4 10.Ne5+ c6 11.d4 Qh4+ 12.g3 Qh3`, la línea de Timman–Speelman (**0,00**),
`5...Nf6` (Tartakower, +0,59 blanco), `7.Bxc6 bxc6 8.Nxe5 O-O 9.Nc3 d6` (+0,60 blanco) y `5.Ng1!?`
(+0,19 blanco).

## Hallazgos

1. **`4.exf5` no refuta el gambito, pero tampoco lo castiga.** El motor da 0,00 tras `7...Nh6`:
   el blanco iguala como mucho. Wikipedia lo dice igual de claro: «aceptar el gambito con 4.exf5 es
   inferior a 4.Nc3 y 4.d3».
2. **La línea del curso en ese capítulo era un error de 317 cp**: `5.d3??` devuelve el peón sin
   compensación (`...exf3` y `...Nf6`). Ahora está documentada como trampa, con la línea que la castiga
   y la jugada correcta (`5.Qe2`, o `5.Ng1` como alternativa sólida).
3. **4.d3 es hoy más popular que 4.Nc3**, y el motor confirma que es la vía práctica: +0,62 con muy poca
   teoría. El curso solo enseñaba 4.Nc3.
4. **La evaluación honesta es +0,6 blanco**, no igualdad: el gambito entrega un peón y compensa con
   actividad. Se ha corregido el resumen, que prometía que el negro "suele llevar la iniciativa".
5. Wikipedia confirma el dato histórico: Jaenisch lo analizó en 1847 y Radjabov es el único jugador de
   élite que lo emplea con regularidad. No se usa para vender el gambito, sino para situarlo.

## Correcciones aplicadas

1. Capítulo 1 ampliado: la línea ya no se corta en `7...Qg5`; se añaden `8.Qe2 Nf6` y la línea de
   Timman–Speelman como alternativa con partida citada.
2. Capítulo 2 nuevo: **4.d3**, con la línea crítica `7.Bxc6` y la opción sólida `6...d6`.
3. Capítulo 3 reescrito con **`5.Qe2`** (0,00) y `5.Ng1!?` como alternativa; `5.d3` pasa a trampa.
4. Planes para los dos bandos en los tres capítulos y transposiciones (Jaenisch diferido, `4...Nf6`).

## Huecos declarados

- Sin `LICHESS_TOKEN` no hay frecuencia de maestros del Schliemann ni resultados por nivel.
- La partida de Timman–Speelman se cita por la referencia de Wikipedia (Candidatos, Londres 1989), no por
  la planilla completa: solo se reproduce la línea teórica que allí aparece.

## Fuentes

- Wikipedia, *Jaenisch Gambit* — https://en.wikipedia.org/wiki/Jaenisch_Gambit
- Wikibooks, *Chess Opening Theory/1. e4/1...e5/2. Nf3/2...Nc6/3. Bb5/3...f5* — tabla de teoría C63
- Chess Cloud Database — https://www.chessdb.cn/
- Stockfish 19, profundidad 18 en todas las líneas del curso.
