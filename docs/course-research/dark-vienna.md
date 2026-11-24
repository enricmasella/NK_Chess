# Investigación · The Dark Vienna

Bloque 1 · comprobado el 2026-11-06.

## Qué se verificó

| Capítulo | Línea | Evaluación |
| --- | --- | --- |
| 1. La trampa 4.Qh5 / 6.Nb5 / 8.Qd5 | `...Nc6 6.Nb5 g6 7.Qf3 f5 8.Qd5 Qe7 9.Nxc7+ Kd8 10.Nxa8 b6` | +0,60 blanco |
| 2. La defensa correcta `5...Be7` | `...Be7 6.Nf3 Nc6 7.Nxe5 O-O 8.O-O Nxe5 9.Qxe5 Bf6 10.Qf4 Ne8` | +0,29 blanco |

Auditoría actual: **43 posiciones, 1 señalada, 0 errores graves, media 5,8 cp** (peor 70).

## Hallazgo principal: el capítulo 2 estaba mal

Se titulaba «La defensa correcta: 6...Nd4» y su línea no contenía esa jugada: era el Vienna tranquilo
con `...Bc5`. Al comprobarlo con el motor, **`6...Nd4` no es una defensa: pierde por mate forzado**:

```
1.e4 e5 2.Nc3 Nf6 3.Bc4 Nxe4 4.Qh5 Nd6 5.Bb3 Nc6 6.Nb5 Nd4 7.Nxd6+ Ke7 8.Nf5+ Kf6
9.Qxf7+ Kg5 10.h4+ Kf4 11.Nh3+ Kg4 12.Ne3+ Kxh4 13.g3#   (mate en 7, profundidad 14)
```

El capítulo ahora se llama «La defensa correcta: 5...Be7 y el error 6...Nd4», enseña la defensa real y
guarda el mate como trampa. También se corrigió el resumen del curso, que presentaba la trampa como si
fuera una victoria.

## Discrepancias motor / teoría

| Jugada | Pérdida | Lectura |
| --- | --- | --- |
| `5...Nc6` (cap. 1) | 70 cp | Entrada a la trampa; CDB la marca `!` y el motor prefiere `5...Be7`. Documentado: el negro pierde la calidad a cambio de contrajuego. |

La valoración honesta que ahora aparece: el blanco gana la calidad, el negro recibe centro y pareja de
alfiles, y la teoría lo considera opinable (+0,6 para el motor).

## Partidas de referencia (reales, verificadas en la fuente)

- **Øst-Hansen–Nunn, Teesside 1974 (0-1)**: planilla completa en Wikipedia.
- **Dubov–Meier, Copa del Mundo 2025, desempate rápido**: citada por Wikipedia (sin planilla, no se usa
  para estudiar jugadas).

## Fuentes

- Wikipedia, *Vienna Game, Frankenstein–Dracula Variation* — https://en.wikipedia.org/wiki/Frankenstein%E2%80%93Dracula_Variation
- Chess Cloud Database — https://www.chessdb.cn/
- Stockfish 19 (profundidad 14 para el mate, 18 para el resto).
