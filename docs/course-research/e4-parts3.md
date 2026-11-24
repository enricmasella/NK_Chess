# Investigación · 1.e4 Part 3: Caro, French, Pirc y Escandinava

Bloque 3 · comprobado el 2026-11-06. Fuentes: Wikipedia (*Caro–Kann Defence*, *French Defence*, *Pirc Defence*, *Scandinavian Defense*); Chess Cloud Database; Stockfish 19 (profundidad 18).

## Qué se verificó

| Capítulo | Línea | Evaluación |
| --- | --- | --- |
| 1. Caro-Kann: 3.Nc3 y 4.Nxe4 | `...dxe4 Nxe4 Bf5 Ng3 Bg6 h4 h6 Nf3 e6 h5` | +0,36 blanco |
| 1b. Orden con 5...Nd7 | `...Nd7 h5 Bh7 Bd3 Bxd3 Qxd3 e6` | +0,38 blanco |
| 2. Francesa: 3.Nc3 y 4.e5 (Steinitz) | `...e6 d5 Nc3 Nf6 e5 Nfd7 f4 c5 Nf3 Nc6 Be3` | +0,45 blanco |
| 3. Pirc/Moderna clásica | `...d6 d4 Nf6 Nc3 g6 Be3 Bg7 Qd2 c6 f3 b5 O-O-O` | +0,28 blanco |
| 4. Escandinava | `...d5 exd5 Qxd5 Nc3 Qa5 d4 Nf6 Nf3 Bf5 Bc4 e6 O-O` | +0,28 blanco |

## Errores que había

Ninguno grave. La auditoría de profundidad 16 marcó **2 jugadas de 54** con una pérdida media de 4,9 cp:

1. **Pirc, `6.f3`** — el motor prefiere `6.Nf3` por unos 33 cp sin cambiar el plan (Be3, Qd2, enroque largo, Bh6). `f3` es la jugada del ataque austriaco y debilita e3; se mantiene como línea principal porque es la que enseña el sistema, y se añade `6.Nf3` como alternativa con la explicación. Es una discrepancia teoría/motor, no un error.
2. **Escandinava, `1...d5`** — la jugada es del negro; el motor prefiere `...e5` en la posición inicial. No es un defecto del repertorio blanco: significa que la Escandinava ya es algo inferior para el negro, que es justo lo que el capítulo explica.

## Añadidos

En los cuatro capítulos se han completado planes para los dos bandos y fuentes con confianza C:

- Caro: `h5` para fijar el alfil de g6, `Bd3` para cambiarlo; el negro con `...e6`/`...Nf6` o `...c5` contra el centro.
- Francesa: `Be3`, `Qd2`, enroque y `f5` contra e6; el negro con `...c5`/`...Nc6` contra d4.
- Pirc: `Bh6`, `h4-h5` y sacrificios en h5 si el negro enroca corto; el negro con `...b5`, `...Nbd7` y `...c5`.
- Escandinava: `Bc4`, `Re1` y `d5`; el negro con `...Qa5`, `...Bg4` y final sólido.

También se añadieron alternativas verificadas: `5...c5` antes de `...Nc6` en la Francesa y `3...Qd6` en la Escandinava.

## Discrepancias motor / teoría

| Jugada | Pérdida | Lectura |
| --- | --- | --- |
| `6.f3` (Pirc) | 33 cp | Ataque austriaco estándar; el motor prefiere `Nf3`. Documentado, se mantiene. |
| `1...d5` (Escandinava) | 36 cp | Jugada negra; confirma que la línea es cómoda para el blanco. |

## Huecos declarados

- Sin `LICHESS_TOKEN` no hay frecuencias de maestros para estas cuatro respuestas a 1.e4.
- No se citan partidas modelo.

## Fuentes

- Wikipedia, *Caro–Kann Defence* — https://en.wikipedia.org/wiki/Caro%E2%80%93Kann_Defence
- Wikipedia, *French Defence* — https://en.wikipedia.org/wiki/French_Defence
- Wikipedia, *Pirc Defence* — https://en.wikipedia.org/wiki/Pirc_Defence
- Wikipedia, *Scandinavian Defense* — https://en.wikipedia.org/wiki/Scandinavian_Defense
- Chess Cloud Database — https://www.chessdb.cn/
- Stockfish 19, profundidad 18.
