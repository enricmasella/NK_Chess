# Investigación · The Albin Countergambit

Bloque 4 · comprobado el 2026-11-06. Fuentes: Wikipedia, *Albin Countergambit* (D08–D09); Chess Cloud
Database; Stockfish 19 (profundidad 18).

## Qué se verificó

| Capítulo | Línea | Evaluación |
| --- | --- | --- |
| 1. La cuña en d4 (5.g3) | `3.dxe5 d4 4.Nf3 Nc6 5.g3 Be6 6.Nbd2 Qd7 7.Bg2 O-O-O 8.O-O Bh3` | +1,58 blanco |
| 2. 5.a3 | `5.a3 Bg4 6.Nbd2 Qe7 7.e3 O-O-O` | **0,00** |
| 3. Gambito de Lasker | `4.e3 Bb4+ 5.Bd2 dxe3 6.Bxb4 exf2+ 7.Ke2 fxg1=N+ 8.Rxg1 Bg4+ 9.Kf2 Bxd1` | **mate negro** |

Comprobadas además: `5.Nbd2 f6` (Janowski, +1,10 blanco), `4.e4` (variante Spassky, **+0,23 negro**),
`8...h5` con `...h4` (+1,89 blanco, peor que `...Bh3`) y la variante de Lasker completa hasta `Bxd1`.

## Hallazgos

1. **El curso no tenía la línea principal del Albin.** Enseñaba `5.a3`, que es la variante tranquila
   (y la que más conviene al negro: 0,00), y `...Qxb2` como "truco". La línea principal de la teoría es
   **`5.g3 Be6 6.Nbd2 Qd7 7.Bg2 O-O-O 8.O-O Bh3`**, y el motor da +1,58 al blanco: el Albin es un
   gambito de iniciativa, no de igualdad.
2. **`...Qxb2` no es una trampa, es una jugada normal** del sistema cuando el blanco juega `a3`. La
   trampa real del Albin es **el gambito de Lasker**: `4.e3??` y la subpromoción a caballo en g1. Ahora
   es el capítulo 3, con el mate forzado que confirma el motor.
3. **`4.e4` (Spassky) favorece al negro** (+0,23): el blanco no puede capturar al paso y `...Qxd1+`
   cambia damas en buena posición. Es un dato útil para el repertorio y no estaba.
4. Los avisos de la auditoría (`e3` 268 cp, `O-O-O` 97 cp) venían de la línea `5.a3 7.e3`, que sigue
   siendo igualada (0,00) pero con otro orden: `7...O-O-O` dejaba al blanco jugar `exd4` con tempo. La
   línea se ha corregido y el aviso queda explicado, no oculto.

## Correcciones aplicadas

1. Capítulo 1 reescrito con la línea principal de la teoría (`5.g3`), alternativa Janowski y la variante
   Spassky; planes de los dos bandos, transposiciones y partidas de Albin–Lasker (1893) y
   Cavallotti–Salvioli (1881).
2. Capítulo 2: `5.a3` como la línea que iguala, con la evaluación real (0,00) en lugar de presentarla
   como si el negro estuviera peor.
3. Capítulo 3 nuevo: el **gambito de Lasker**, con la subpromoción obligatoria y el castigo verificado.
4. Resumen corregido: +1,6 en la principal, 0,00 en `5.a3`; el gambito se juega por las trampas.

## Huecos declarados

- Sin `LICHESS_TOKEN` no hay frecuencia de maestros del Albin (Morozevich lo jugó en los 2000, pero no
  se dan porcentajes sin datos).
- Las partidas de Albin–Lasker y Cavallotti–Salvioli se citan por la referencia de Wikipedia, sin
  reproducir sus planillas.

## Fuentes

- Wikipedia, *Albin Countergambit* — https://en.wikipedia.org/wiki/Albin_Countergambit
- Chess Cloud Database — https://www.chessdb.cn/
- Stockfish 19, profundidad 18 en todas las líneas del curso.
