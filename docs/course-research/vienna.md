# Investigación · 1.e4 Part 1: The Vienna

Bloque 1 · contenido comprobado el 2026-11-06. Motor: Stockfish 19 (auditoría a profundidad 16; 18 en
las posiciones discutidas). Base: Chess Cloud Database. Teoría: Wikipedia, *Vienna Game* (Stanley
Variation) y la nomenclatura Frankenstein–Dracula.

## Qué se verificó

| Capítulo | Línea principal | Evaluación |
| --- | --- | --- |
| 1. El orden Vienna y el ataque a f7 | `4.Qh5 Nd6 5.Bb3 Be7 6.Qxe5 O-O` | −0,01 (igualdad) |
| 2. El Gambito Vienna: 3.f4 | `3...d5 4.fxe5 Nxe4` (Breyer) | +0,41 blanco |
| 3. Vienna tranquila 4.d3 | `...Bc5 d3 Nf6 Nf3 d6 O-O O-O Bg5` | −0,20 para el negro |
| 4. La trampa Dark Vienna | `...Nc6 6.Nb5 ... 10.Nxa8 b6` | +0,86 blanco |

Auditoría actual: **73 posiciones, 3 señaladas, 0 errores graves, pérdida media 6,3 cp** (peor 76).

## Cambios aplicados

1. **El capítulo 1 estaba duplicado con el 4**: la línea era la trampa `4.Qh5 ... Qd5`. Ahora enseña la
   variante sólida `5...Be7 6.Qxe5`, que es la recomendación de la teoría cuando las negras no entran
   en la trampa.
2. **El capítulo 2 vendía `3...exf4` como línea principal.** La teoría lo considera una concesión
   (`4.e5` obliga a `...Ng8`) y el motor da +0,6 al blanco. La principal pasa a ser la Breyer
   (`3...d5`), con la captura como alternativa.
3. Dos alternativas por capítulo, planes para ambos bandos, transposiciones y fuentes con fecha.

## Discrepancias motor / teoría (documentadas, no corregidas)

| Jugada | Pérdida | Por qué se mantiene |
| --- | --- | --- |
| `5.Bb3` (cap. 1 y 4) | 74 y 76 cp | Es la jugada principal de la teoría; el motor prefiere `5.Qxe5+` (recomendación de Andersson). Se documenta la alternativa, no se reescribe la línea. |
| `...Nxc3` en el gambito | 35 cp | CDB la recomienda (`!`); el motor prefiere `...Bf5`. La pérdida mide material/tiempo, no la compensación del gambito. |

## Huecos declarados

- Sin `LICHESS_TOKEN` no hay partidas de maestros: no se cita ninguna en este curso. La partida real
  más cercana (Øst-Hansen–Nunn, 1974) está en el curso de la trampa, donde la fuente reproduce la
  planilla completa.

## Fuentes

- Wikipedia, *Vienna Game* — https://en.wikipedia.org/wiki/Vienna_Game
- Chess Cloud Database — https://www.chessdb.cn/
- Stockfish 19 (`node scripts/best-line.mjs "<fen>" 18`).
