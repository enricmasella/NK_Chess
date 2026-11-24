# Investigación · The Englund Gambit

Bloque 4 · comprobado el 2026-11-06. Fuentes: Wikipedia, *Englund Gambit* (A40); Chess Cloud Database;
Stockfish 19 (profundidad 18).

## Qué se verificó

| Capítulo | Línea | Evaluación |
| --- | --- | --- |
| 1. Línea principal y refutación | `3.Nf3 Qe7 4.Bf4 Qb4+ 5.Bd2 Qxb2 6.Nc3 Bb4 7.Rb1 Qa3` | **+2,27 blanco** |
| 2. Variante de Estocolmo | `4.Qd5 f6 5.exf6 Nxf6 6.Qb3 d5` | +0,74 blanco |
| 3. Blackburne–Hartlaub | `2...d6 3.exd6 Bxd6 4.Nf3 Nf6 5.Bg5` | +0,71 blanco |

Comprobadas además: `8.Nd5!` (la refutación de Bücker y Avrukh), `2...Nc6 3.Nf3 f6` (gambito Soller) y
la celada `6.Bc3?? Bb4 7.Qd2 Bxc3 8.Qxc3 Qc1#`, mate verificado por el motor (mate en 1 tras la Octava).

## Hallazgos

1. **El "mate en ocho" del curso no existía.** La línea era `4.Bf4 Qb4+ 5.Nc3 Qxf4`, que el motor
   evalúa +0,10 para el blanco: no hay mate ni ventaja. El mate en ocho real es otro:
   `6.Bc3?? Bb4` y `...Qc1#`, tal como lo recoge Wikipedia. Se ha sustituido la línea y se ha
   conservado el nombre del capítulo para lo que de verdad ocurre.
2. **El gambito está refutado y el curso lo vendía sin decirlo.** Avrukh: «me parece la peor respuesta
   posible al primer movimiento blanco». Se ha añadido la cita al resumen y la refutación `6.Nc3!` /
   `8.Nd5!` como línea principal, con confianza D.
3. **La dama en e7 es el problema, no la solución**: tras `Qxb2` el blanco desarrolla con tempo y el
   negro no tiene compensación. Los dos avisos de la auditoría (`e5` 100–122 cp y `Qxb2` 71 cp) caen
   dentro de esta misma idea.
4. **Sí hay variantes presentables**: la de Estocolmo (`4.Qd5`) y el Blackburne–Hartlaub (`2...d6`)
   pierden menos que la línea principal y dan juego práctico. Son los capítulos 2 y 3.

## Correcciones aplicadas

1. Capítulo 1: línea principal reescrita con `6.Nc3` y `7.Rb1`; alternativa `8.Nd5!`; planes de los dos
   bandos; transposiciones (Soller, Blackburne–Hartlaub, Budapest/Albin); partida de Korchnoi (simultánea
   1978) citada por Wikipedia.
2. Capítulo 2: sustituido el falso mate por la **variante de Estocolmo**.
3. Capítulo 3: nuevo, el **gambito Blackburne–Hartlaub**, la versión más sana del Englund.
4. Resumen y etiquetas corregidos: se dice que el gambito es malo y por qué se estudia igualmente.

## Huecos declarados

- Sin `LICHESS_TOKEN` no hay frecuencia de maestros; en este gambito, además, casi no existe.
- El mate de Korchnoi se cita como referencia bibliográfica, sin reproducir la planilla.

## Fuentes

- Wikipedia, *Englund Gambit* — https://en.wikipedia.org/wiki/Englund_Gambit
- Chess Cloud Database — https://www.chessdb.cn/
- Stockfish 19, profundidad 18 en todas las líneas del curso.
