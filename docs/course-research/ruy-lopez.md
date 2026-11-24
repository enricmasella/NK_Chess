# Investigación · Aggressive Ruy Lopez

Bloque 1 · comprobado el 2026-11-06. Fuentes: Wikibooks *Chess Opening Theory* (3...f5 Jaenisch/Schliemann
y 3...Nf6 Berlin defence).

## Qué se verificó

| Capítulo | Línea | Evaluación |
| --- | --- | --- |
| 1. Empuje d4 contra 3...a6 | `5.d4 exd4 6.O-O Be7 7.e5 Ne4 8.Nxd4 O-O 9.Nf5` | 0,00 |
| 2. Contra la Jaenisch 3...f5 | `4.Nc3 fxe4 5.Nxe4 d5 6.Nxe5 dxe4 7.Nxc6 Qg5 8.Qe2 Nf6 9.f4 ... 13...Be6` | +0,26 blanco (teoría: ⩲) |
| 3. Contra la Berlinesa 3...Nf6 | `4.d3 Bc5 5.c3 O-O 6.O-O d6 7.Re1` | −0,22 para el negro |

Auditoría actual: **56 posiciones, 2 señaladas, 0 errores graves, media 4,5 cp** (peor 83).

## Correcciones

1. **La Jaenisch se quedaba en `8.Qe2`**, a mitad de la línea teórica. Ahora llega hasta `13...Be6`,
   donde la teoría cierra la evaluación (⩲). El motor coincide (+0,26).
2. **Se corrige la idea del capítulo 1**, que prometía «un peón aislado» sin más: ahora dice que es
   igualdad según el motor y que la ventaja es práctica (posiciones abiertas, poca teoría).
3. Añadidas: alternativas por capítulo (incluida la refutación práctica de `4.exf5?!` con `...e4`),
   trampas, planes de ambos bandos y el Muro de Berlín como referencia histórica (Kramnik contra
   Kasparov, Mundial 2000, citado en la fuente).

## Discrepancias motor / teoría

| Jugada | Pérdida | Lectura |
| --- | --- | --- |
| `3...f5` (Jaenisch) | 37 cp | CDB la marca `?`; el motor prefiere `3...Nf6`. Es la jugada del capítulo: se mantiene y se explica que no es un gambito de verdad. |
| `5...d5` | 83 cp | CDB la recomienda (`!`); el motor prefiere `5...Nf6`. La teoría juega ambas; el curso la conserva porque es la línea con evaluación ⩲ de la fuente. |

## Huecos declarados

- Sin `LICHESS_TOKEN` no hay frecuencia de maestros ni planillas. El Muro de Berlín se cita como
  referencia histórica, no como partida para estudiar jugadas.

## Fuentes

- Wikibooks, *Ruy Lopez 3...f5* — https://en.wikibooks.org/wiki/Chess_Opening_Theory/1._e4/1...e5/2._Nf3/2...Nc6/3._Bb5/3...f5
- Wikibooks, *Ruy Lopez 3...Nf6* — https://en.wikibooks.org/wiki/Chess_Opening_Theory/1._e4/1...e5/2._Nf3/2...Nc6/3._Bb5/3...Nf6
- Chess Cloud Database — https://www.chessdb.cn/
- Stockfish 19, profundidad 18.
