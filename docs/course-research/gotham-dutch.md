# Investigación · The Gotham Dutch

Bloque 4 · comprobado el 2026-11-06. Fuentes: Wikipedia, *Dutch Defence*; Chess Cloud Database;
Stockfish 19 (profundidad 18).

## Qué se verificó

| Capítulo | Línea | Evaluación |
| --- | --- | --- |
| 1. ...e6, ...d6 y ...Qe8 | `1.d4 f5 2.g3 Nf6 3.Bg2 e6 4.Nf3 Be7 5.O-O O-O 6.c4 d6 7.Nc3 Qe8` | +0,79 blanco |
| 2. Contra 6.g4 | `6.g4 fxg4 7.Ne1 Nc6` | **+1,93 negro** |
| 3. Gambito Krejcik | `2.g4 d5 3.Bg2 fxg4 4.Nc3 Nf6` | +0,15 negro (igualdad) |

Comprobadas además: `6...c6` (transposición al Holandés clásico, +0,60 blanco), `8...Nc6` en lugar de
`...Qe8` (**+1,39 blanco**, peor para el negro) y `...e5` sin apoyo (**+2,02 blanco**, pierde un peón).

## Hallazgos

1. **El esquema es la variante Ilyin–Zhenevsky** (`...d6` y `...Qe8`, no el Muro de piedra): Wikipedia
   la nombra así en *Dutch Defence*. El curso la presentaba como "el esquema" sin nombre ni alternativa.
2. **La línea del capítulo 2 estaba al revés.** El curso jugaba `6.g4 d5`, que deja al blanco con la
   iniciativa; el motor prefiere **`...fxg4`** con +1,9 para el negro. La auditoría marcaba `g4` (275 cp)
   y `d5` (161 cp) en esa misma posición: los dos avisos apuntaban al mismo error de planteamiento.
3. **`...e5` no se juega solo.** Es el plan del sistema, pero sin un caballo que sostenga el peón se
   pierde tras `dxe5 dxe5 Nxe5`. Queda documentado como trampa del propio repertorio.
4. **`2.g4` es el gambito Krejcik**, no una rareza: `...d5` iguala y la columna g queda rota para el
   blanco.
5. El resumen del curso prometía "un peón e5 fuerte"; el motor da +0,8 al blanco en la línea principal.
   Se ha corregido el texto: el Holandés se juega por iniciativa, no por igualdad.

## Correcciones aplicadas

1. Capítulo 1 reescrito con nombre propio (Ilyin–Zhenevsky), alternativas `6...c6` y `8...Nc6`, planes
   de los dos bandos, transposiciones (clásico, Leningrado, Muro de piedra) y la trampa de `...e5`.
2. Capítulo 2 sustituido por **`...fxg4`**: el empuje `g4` se castiga y el negro desarrolla con `...Nc6`.
3. Capítulo 3 nuevo: el gambito Krejcik, con la evaluación real (+0,15 negro).
4. Partida de referencia: la Inmortal Polaca (Najdorf, Varsovia 1929), citada por Wikipedia como ejemplo
   del Muro de piedra; no se reproducen sus jugadas porque no se ha verificado la planilla completa.

## Huecos declarados

- Sin `LICHESS_TOKEN` no hay frecuencia de maestros del Holandés; no se dan porcentajes.
- No se cita ninguna partida con jugadas completas: solo la referencia bibliográfica de la Inmortal Polaca.

## Fuentes

- Wikipedia, *Dutch Defence* — https://en.wikipedia.org/wiki/Dutch_Defence
- Chess Cloud Database — https://www.chessdb.cn/
- Stockfish 19, profundidad 18 en todas las líneas del curso.
