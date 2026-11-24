# Investigación · The Scotch Game

Bloque 1 · comprobado el 2026-11-06. Teoría: Wikipedia, *Scotch Game* (Clásica, Schmidt y Lolli).

## Qué se verificó

| Capítulo | Línea | Evaluación |
| --- | --- | --- |
| 1. La Clásica `4...Bc5 5.Be3` | `Qf6 6.c3 Nge7 7.Bc4` | `7...Ne5` da −0,29 al negro (ligera ventaja blanca) |
| 2. La Lolli `4...Nxd4 5.Qxd4` | `...d6 6.Nc3 Nf6 7.Be3 Be7 8.O-O-O` | +1,07 blanco |
| 3. La Schmidt `4...Nf6 5.Nxc6` | `...bxc6 6.e5 Qe7 7.Qe2 Nd5 8.c4 Ba6` | 0,00 |

Auditoría actual: **44 posiciones, 3 señaladas, 0 errores graves, media 6,5 cp** (peor 81).

## Correcciones

1. **Nombre equivocado**: el capítulo se llamaba «La Mieses: 4...Nxd4 5.Qxd4». En la teoría, Mieses es
   `6.e5` dentro de la Schmidt; `4...Nxd4 5.Qxd4` es la **Lolli** (por transposición). Renombrado.
2. **Explicación falsa**: decía que «el cambio de damas simplifica». No hay cambio de damas en esa
   línea. Ahora dice lo que ocurre: la dama blanca queda en el centro, el negro debe golpearla con
   `...Qf6` y el motor da +1,0 al blanco.
3. **La Clásica se quedaba corta**: se añade `7...Ne5 8.Be2 Qg6`, la respuesta más fuerte según la
   teoría, y la variante Intermezzo `5.Nxc6`.
4. **La Schmidt gana `6.Qe2`** como alternativa, con la misma evaluación y sin debilitar d4.

## Discrepancias motor / teoría

| Jugada | Pérdida | Lectura |
| --- | --- | --- |
| `4...Nxd4` (Lolli) | 64 cp | CDB la marca `?`; el motor prefiere `4...Bc5`. Se mantiene porque es una línea real que el blanco debe conocer, y el curso dice que deja al negro peor. |
| `5...d6` | 81 cp | El motor prefiere `5...Qf6`; se añadió como alternativa. |
| `6.Be3` | 39 cp | El motor prefiere `6.Bf4`; la jugada es de libro y la diferencia es pequeña en la práctica. |

## Huecos declarados

- Sin `LICHESS_TOKEN` no se han podido citar partidas de referencia; no se ha inventado ninguna.

## Fuentes

- Wikipedia, *Scotch Game* — https://en.wikipedia.org/wiki/Scotch_Game
- Chess Cloud Database — https://www.chessdb.cn/
- Stockfish 19, profundidad 18.
