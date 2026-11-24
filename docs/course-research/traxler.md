# Investigación · Traxler Counterattack

Bloque 4 · comprobado el 2026-11-06. Fuentes: Wikipedia, *Traxler Counterattack* (C57); Chess Cloud
Database; Stockfish 19 (profundidad 18).

## Qué se verificó

| Capítulo | Línea | Evaluación |
| --- | --- | --- |
| 1. 5.Bxf7+ y 6.Bd5! | `5.Bxf7+ Ke7 6.Bd5 Rf8 7.O-O d6 8.Nf3` | +0,87 blanco |
| 2. 6.Bb3 y ...Qe8 | `6.Bb3 Qe8 7.d3 d6 8.Be3 Bg4` | +0,94 blanco |
| 3. 5.Nxf7 | `5.Nxf7 Bxf2+ 6.Kf1 Qe7 7.Nxh8 d5` | +0,18 blanco |

Comprobadas además: `6...Nd4` contra el alfil de b3 (**+1,70 blanco**, mala para el negro), `6...Rf8`
(+1,11 blanco) y la caza del rey de Reinisch–Traxler, que termina en mate (comprobada jugada a jugada
con el motor: mate en 1 en la posición final).

## Hallazgos

1. **El curso enseñaba la peor rama como principal.** Las dos líneas del curso empezaban con `6.Bb3`
   seguido de `...Nd4`, que el motor castiga con +1,70. La jugada que la teoría marca con exclamación es
   **`6.Bd5!`**, y contra `6.Bb3` la mejor defensa es **`...Qe8`**, no `...Nd4`.
2. **`...Bc5` no es un gambito de peón, es un contragolpe**: tras `5.Bxf7+` el negro recupera material y
   cambia la iniciativa por un peón. El motor da +0,9 al blanco en las tres ramas: el Traxler no iguala,
   pero es incómodo de defender con reloj.
3. **La rama `5.Nxf7` es la más peligrosa para el blanco**: solo +0,18, con el rey en f1 y el negro con
   peón de menos pero todas las piezas. La partida Reinisch–Traxler (Hostouň, 1890) es el ejemplo
   perfecto y ahora es la trampa del capítulo, con el mate de peón incluido.
4. Los dos avisos de la auditoría (`Bc5` 156–169 cp, `Nd4` 95–100 cp) eran el mismo problema: el curso
   elegía mal la rama y el orden de jugadas. No era un "error de libro" que hubiera que respetar.

## Correcciones aplicadas

1. Capítulo 1 reescrito con `6.Bd5!` y `...Rf8`; alternativa `9...Nd4` (la idea de cambio de caballos).
2. Capítulo 2: `6.Bb3` con **`...Qe8`**, la defensa correcta; `...Nd4` queda fuera de la línea principal.
3. Capítulo 3: `5.Nxf7` con `6.Kf1!`, y la caza del rey como trampa verificada.
4. Planes para los dos bandos en los tres capítulos, más transposiciones con el Fried Liver.

## Huecos declarados

- Sin `LICHESS_TOKEN` no hay frecuencia de maestros del Traxler; no se dan porcentajes.
- No se ha verificado la planilla completa de Reinisch–Traxler: se reproduce solo la secuencia final que
  publica Wikipedia, comprobada con el motor.

## Fuentes

- Wikipedia, *Traxler Counterattack* — https://en.wikipedia.org/wiki/Traxler_Counterattack
- Chess Cloud Database — https://www.chessdb.cn/
- Stockfish 19, profundidad 18 en todas las líneas del curso.
