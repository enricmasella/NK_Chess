# Investigación · The Alapin Sicilian

Bloque 2 · comprobado el 2026-11-06. Fuente: Wikipedia, *Sicilian Defence, Alapin Variation*.

## Qué se verificó

| Capítulo | Línea | Evaluación |
| --- | --- | --- |
| 1. 2.c3 y el centro d4 | `...Nc6 cxd4 d6 Bc4 Nb6` | +0,24 blanco |
| 2. Contra 2...d5 (Barmen) | `...Qxd5 d4 Nf6 Nf3 Bg4 Be2 e6` | +0,17 blanco |
| 3. Contra 2...g6 | `4.d4 cxd4 5.cxd4 d5 6.e5 Bg7 7.Nc3 Nc6` | +0,67 blanco |

## Correcciones

1. **Error de concepto en el capítulo 1**: decía que «las blancas renuncian al peón c». No es un
   gambito: `c3` sostiene el empuje `d4` y no entrega nada. Reescrito.
2. El capítulo 2 se llamaba solo «Contra 2...d5»; ahora usa el nombre real, **defensa Barmen**, y
   explica por qué la dama negra en d5 pierde tiempos.
3. El capítulo 3 decía que el alfil de g7 «queda sin objetivos claros» sin matizar: ahora dice que el
   blanco tiene +0,7 y por qué (espacio y diagonales cerradas para el alfil).
4. Dos alternativas nuevas en el capítulo 1 (`4.Nf3` y `4.Bc4`) y una en cada uno de los otros dos.

## Discrepancias motor / teoría

| Jugada | Pérdida | Lectura |
| --- | --- | --- |
| `2...g6` | 35 cp | CDB la marca `?`; el motor prefiere `2...Nf6`. Se mantiene porque es una respuesta real que el blanco debe conocer, y el curso explica que no es la principal. |

## Estado de la teoría

La fuente confirma que el Alapin pasó de ser considerado inferior a ser «una de las anti-sicilianas más
sólidas», jugada por Anand, Karpov, Kramnik y Carlsen. El curso puede decir eso sin exagerar: es
sólido, no una ventaja forzada.

## Fuentes

- Wikipedia, *Sicilian Defence, Alapin Variation* — https://en.wikipedia.org/wiki/Sicilian_Defence,_Alapin_Variation
- Chess Cloud Database — https://www.chessdb.cn/
- Stockfish 19, profundidad 18.


## Métricas de auditoría (profundidad 16)

**The Alapin Sicilian posiciones, 38 señaladas, 0 errores graves, pérdida media 1 cp** (peor 4,5). Las señaladas son
jugadas de libro que CDB recomienda y el motor discute; ninguna queda sin explicación en este informe.
