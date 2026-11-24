# Investigación · Aggressive Italian Game

Bloque 1 · comprobado el 2026-11-06. Fuentes: Wikipedia, *Italian Game* y *Max Lange Attack*.

## Qué se verificó

| Capítulo | Línea | Evaluación |
| --- | --- | --- |
| 1. Centro con 4.c3 y 5.d4 | `...Bb4+ 6.Nc3 Nxe4 7.O-O Bxc3 8.d5` | igualdad (+0,31 para el negro en la posición final) |
| 2. Max Lange | `6.e5 d5 7.exf6 dxc4 8.Re1+ Be6 9.Ng5 Qd5 10.Nc3 Qf5 11.Nce4 O-O-O` | +0,32 blanco |
| 3. Deutz | `...Bxd4 6.Nxd4 Nxd4 7.f4 d6 8.fxe5 dxe5 9.Bg5` | +0,28 para el negro |

Auditoría actual: **56 posiciones, 6 señaladas, 0 errores graves, media 6,5 cp** (peor 63). Las seis son
jugadas de libro del Max Lange y del centro con `c3`, documentadas abajo.

## Correcciones

1. **El Max Lange estaba cortado y con la línea equivocada**: terminaba en `9.fxg7` sin respuesta
   negra y trataba esa posición como principal. La principal pasa a ser la de la teoría
   (`9.Ng5 Qd5 10.Nc3 Qf5 11.Nce4 O-O-O`); la de Gutman (`8.fxg7 Rg8 9.Bg5 Be7`) queda como
   alternativa, avisando de que el motor la ve igualada y los autores la consideran buena para el
   blanco.
2. **Faltaba el `+` en `5...Bb4+`**: la jugada es jaque y así se estudia.
3. Se añadió la trampa `9...Qxf6?? 10.Nxe6 fxe6 11.Qh5+` (el motor da −4,4 para el negro) y la partida
   Vatter–Nunn, 1986, cuya planilla completa aparece en la fuente.
4. Planes, transposiciones y fuentes por capítulo.

## Discrepancias motor / teoría

| Jugada | Pérdida | Lectura |
| --- | --- | --- |
| `5.d4` (Max Lange y Deutz) | 49–50 cp | CDB la recomienda (`!`); el motor prefiere `5.d3`. Es la esencia de los dos gambitos: se mantiene con la evaluación escrita. |
| `5...Bc5` (Max Lange) | 37 cp | CDB `*`; el motor prefiere `5...Nxe4`. La teoría juega ambas. |
| `9.Ng5` y `9...Qd5` | 59–63 cp | Línea principal de la teoría; el motor prefiere `9.fxg7` y `9...g6`. Documentado: la diferencia es de estilo, no de corrección. |
| `6.Nc3` (centro) | 40 cp | El motor prefiere `6.Bd2`; se añadió como alternativa. |

## Lo que el curso ya no afirma

- No dice que el Max Lange sea «mejor para el blanco»: dice que la iniciativa compensa y que el motor
  da +0,3. La línea de Gutman se presenta como opinión de sus autores.

## Fuentes

- Wikipedia, *Max Lange Attack* — https://en.wikipedia.org/wiki/Max_Lange_Attack (incluye Vatter–Nunn, 1986)
- Wikipedia, *Italian Game* — https://en.wikipedia.org/wiki/Italian_Game
- Chess Cloud Database — https://www.chessdb.cn/
- Stockfish 19, profundidad 18.
