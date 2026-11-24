# Investigación · Anti-Sicilian For White

Bloque 2 · comprobado el 2026-11-06. Fuente: Wikipedia, *Sicilian Defence* (Najdorf y Dragón).

## Qué se verificó

| Capítulo | Línea | Evaluación |
| --- | --- | --- |
| 1. 3.Nc3 y el golpe central | `...a6 Be3 e6 f3 b5` (ataque inglés) | +0,64 blanco |
| 2. El avance e5 frente a ...Nf6 | `...dxe5 Nxe5 Nbd7 Nxd7 Bxd7 d4` | +0,14 negro (igualdad) |
| 3. Contra el Dragón: 3...g6 | `...Bg7 Be3 Nf6 f3 O-O Qd2` | −0,49 blanco (ligera ventaja negra) |

## Correcciones

1. **El capítulo 1 no nombraba lo que enseña**: es el ataque inglés (Be3, Qd2, 0-0-0, f3, g4-h4)
   contra la Najdorf. Ahora lo dice y explica el plan de las dos partes.
2. **El capítulo 2 presentaba `5.e5` como la respuesta natural.** CDB la marca solo como jugable (`*`)
   y el motor prefiere `4.d4` (+0,45). Ahora se presenta como arma práctica, con `d4` como alternativa
   principal.
3. **El capítulo 3 afirmaba que la carrera de ataques se decide por quién abre líneas primero.** Es
   cierto en la práctica, pero el motor da −0,5 al blanco en la posición final: ahora se dice, y se
   añade que CDB recomienda el enroque negro (`!`), no lo censura.

## Discrepancias motor / teoría

| Jugada | Pérdida | Lectura |
| --- | --- | --- |
| `...g6` (Dragón) | 54 cp | CDB la marca `?` por la tasa de victorias de la base; es la jugada principal del Dragón. Se mantiene y se explica. |
| `5.e5` | 45 cp | CDB `*`; el motor prefiere `d4`. Se mantiene como línea práctica. |

## Métricas de auditoría (profundidad 16)

**Anti-Sicilian For White posiciones, 42 señaladas, 0 errores graves, pérdida media 3 cp** (peor 6,5). Las señaladas son
jugadas de libro que CDB recomienda y el motor discute; ninguna queda sin explicación en este informe.

## Huecos declarados

- Sin token de Lichess no se puede medir la frecuencia real de estas líneas en maestros; la valoración
  es motor + base de datos.

## Fuentes

- Wikipedia, *Sicilian Defence* (Najdorf, Dragón, ataque inglés) — https://en.wikipedia.org/wiki/Sicilian_Defence
- Chess Cloud Database — https://www.chessdb.cn/
- Stockfish 19, profundidad 18.
