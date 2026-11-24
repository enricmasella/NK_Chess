# Investigación · The London System

Bloque 6 · comprobado el 2026-11-06. Fuentes: Wikipedia (*London System*), ChessBase Magazine #232,
Chess Cloud Database; Stockfish 19 (profundidad 18).

## Qué se verificó

| Capítulo | Línea | Evaluación |
| --- | --- | --- |
| 1. Bf4 antes de e3 | `1.d4 d5 2.Bf4 Nf6 3.e3 e6 4.Nf3 Bd6 5.Bg3 O-O 6.Bd3 c5 7.c3` | 0,08 negro (igualdad) |
| 2. Contra ...c5 y ...Qb6 | `2...c5 3.e3 Nc6 4.c3 Qb6 5.Qb3 c4 6.Qc2` | **0,00** |
| 3. Contra el fianchetto | `1...Nf6 2.Bf4 g6 3.e3 Bg7 4.Nf3 d6 5.Be2 O-O 6.O-O Nbd7 7.h3 Qe8` | +0,44 blanco |
| 4. Ne5 y Qf3 | `2...c5 3.c3 Nc6 4.Nd2 e6 5.Ngf3 Bd6 6.Bg3 O-O 7.Bd3 b6 8.Ne5 Bb7 9.Qf3` | **0,00** |

Alternativas medidas: `5.Bxd6` +0,11 blanco; `5.Bd3!?` +0,08 blanco; `5.Qc1` +0,12 blanco;
`Bh2` +0,38 blanco; `10.f4` **0,34 negro**; `...c4` tras `f4` +0,53 blanco.

## Hallazgos

1. **El capítulo 2 enseñaba una línea mala para el blanco.** `5.Qb3 c4 6.Qxb6 axb6 7.Na3` deja al negro
   con la columna a abierta, `...e5` contra f4 y `...b5`: **+0,91 negro**. Sustituida por `6.Qc2`, que
   mantiene el peón de c4 como objetivo y deja la posición en 0,00.
2. **El capítulo 4 empujaba f4 antes de tiempo.** Con `10.f4` el negro responde `...Ne7` y `...Nf5` con
   0,34 a su favor. Con `10.Qf3` la posición es 0,00 y el blanco conserva el ataque: el orden importa.
3. **La ventaja del London no es numérica.** 0,08 para el negro en la principal y 0,00 en las dos líneas
   corregidas. El resumen ahora lo dice: la ventaja es práctica, no de evaluación.
4. El mejor capítulo es el del fianchetto (+0,44), justo el que no tenía ni planes ni alternativas.

## Correcciones aplicadas

1. Capítulos 1, 2, 3 y 4 reescritos con planes de los dos bandos, transposiciones, fuentes y confianza C.
2. Capítulo 2: línea corregida y la anterior conservada como alternativa con el 0,91 negro explicado.
3. Capítulo 4: `Qf3` como principal, `f4` documentado como imprecisión y la respuesta `...c4` con su dato.
4. Capítulo 1: añadida `5.Bd3!?` citando ChessBase Magazine #232 (845 partidas, 56,9 %).

## Huecos declarados

- Sin `LICHESS_TOKEN` no hay frecuencia de maestros del London; el 56,9 % citado es de ChessBase, no mío.
- No se incluye partida modelo: no hay forma de verificarla con las fuentes disponibles.
- No se ha encontrado una trampa verificable con el motor para este curso; no se inventa.

## Fuentes

- Wikipedia, *London System* — https://en.wikipedia.org/wiki/London_System
- ChessBase Magazine #232 (C. Braun, `5.Bd3!?`) — https://en.chessbase.com/post/neu-chessbase-magazin-6
- Chess Cloud Database — https://www.chessdb.cn/
- Stockfish 19, profundidad 18 en las 11 líneas del curso.
