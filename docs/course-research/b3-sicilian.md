# Investigación · The b3 Sicilian

Bloque 2 · comprobado el 2026-11-06. Fuente: Wikipedia, *Sicilian Defence*. Base: Chess Cloud Database.

## Qué se verificó

| Capítulo | Línea | Evaluación |
| --- | --- | --- |
| 1. b3 contra 2...d6 | `4.d3 e6 5.Bb2 Be7 6.Be2 O-O 7.O-O` | +0,21 negro (igualdad) |
| 2. Contra 2...Nc6 | `...e5 Bb2 d6 Bb5 Bd7 O-O Nf6` | −0,08 blanco |
| 3. Contra 2...e6 | `...d5 exd5 exd5 Bb2 Nf6 Bb5+ Bd7` | +0,18 blanco |

## El error grave que tenía el curso

El capítulo 1 enseñaba `1.e4 c5 2.Nf3 d6 3.b3 Nf6 4.Bb2`, y ahí **`4.Bb2??` pierde el peón de e4**:
el caballo de f6 lo captura porque nada lo defiende (no hay `Nc3` ni `d3`). El motor da **−0,96 al
blanco**. La auditoría lo marcó como error grave de 153 cp.

Ahora el capítulo empieza por `4.d3` (o `4.Nc3` como alternativa ambiciosa) y solo después `Bb2`. La
jugada mala queda guardada como **trampa**, con la línea que la castiga.

## Correcciones

1. Capítulo 1: línea principal reescrita (`d3` antes de `Bb2`, `Be2`, enroque), trampa documentada y
   dos alternativas verificadas (`4.Nc3` con `d4`, +0,3 blanco; orden con `...Nc6`).
2. Capítulo 1 evitaba la ruptura `c4` prematura: comprobada como inferior (+0,4 negro), ahora es
   alternativa con la explicación.
3. Capítulos 2 y 3: se añaden planes, transposiciones y fuentes; no se cambian las líneas porque están
   dentro del margen (±0,2).

## Discrepancias motor / teoría

| Jugada | Pérdida | Lectura |
| --- | --- | --- |
| `3.b3` | 38–67 cp | Es la idea del curso; el motor prefiere `d4`. CDB la acepta como jugable (`*`). |
| `2...e6` en el capítulo 1 | 34 cp | El motor prefiere `...g6`; la línea es una transposición normal a estructuras de Francesa. |

## Métricas de auditoría (profundidad 16)

**The b3 Sicilian posiciones, 37 señaladas, 0 errores graves, pérdida media 3 cp** (peor 10,5). Las señaladas son
jugadas de libro que CDB recomienda y el motor discute; ninguna queda sin explicación en este informe.

## Huecos declarados

- Sin `LICHESS_TOKEN` no hay datos de frecuencia de maestros para este sistema, poco habitual en la
  élite.

## Fuentes

- Wikipedia, *Sicilian Defence* — https://en.wikipedia.org/wiki/Sicilian_Defence
- Chess Cloud Database — https://www.chessdb.cn/
- Stockfish 19, profundidad 20 en las líneas del capítulo 1.
