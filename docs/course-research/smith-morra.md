# Investigación · The Smith-Morra Gambit

Bloque 2 · comprobado el 2026-11-06. Fuente: Wikipedia, *Smith–Morra Gambit* (incluye la historia y
los planes de Esserman).

## Qué se verificó

| Capítulo | Línea | Evaluación |
| --- | --- | --- |
| 1. La Morra aceptada | `...a6 O-O Nge7 Qe2 b5 Bb3` | **+0,57 negro** (profundidad 22) |
| 2. Contra 3...d5 | `...Qxd5 cxd4 Nc6 Nf3 Bg4 Be2 e6` | +0,29 blanco |
| 3. La Morra rechazada | `3...Nf6 4.e5 Nd5 5.Nf3 Nc6 6.cxd4 d6 7.Bc4 Nb6` | +0,10 blanco |

## Lo que el curso ya no dice

Antes vendía el gambito como «un peón por un desarrollo perfecto», sin cifras. La comprobación con el
motor en la línea principal da **ventaja al negro**: el sacrificio no es objetivamente correcto, es
prácticamente peligroso, y así aparece ahora en el texto. La fuente lo respalda: Esserman es su
principal defensor y el gambito es popular en club, no en la élite.

## Correcciones

1. **La trampa que enseñaba el capítulo 1 no era una trampa**: era una línea normal con `...d6` y
   `...e6` mezclados. Sustituida por la **trampa siberiana** real (`...Qc7`, `...Ng4`, y `9.h3??`
   permite `...Nd4`), comprobada con el motor: tras `...Nd4` el blanco está a −4,9.
2. Se añaden dos alternativas verificadas: `9.Bd5` (+0,47 negro, misma evaluación que la principal) y
   `6...d6` con `Bg5` (+0,41 negro).
3. Planes explícitos: `Bc4`, `Qe2`, `Rfd1` y `Rac1` en las columnas c y d, tal como describe la
   fuente.

## Discrepancias motor / teoría

| Jugada | Pérdida | Lectura |
| --- | --- | --- |
| `3.c3` (el gambito) | 34 cp | CDB la recomienda (`!`); el motor prefiere `3.Nf3`. Es la esencia del curso: se mantiene y se explica el coste. |
| `8.Qe2` | 59 cp | CDB la recomienda (`!`); el motor prefiere `h4`. Se deja `Qe2` como principal por ser el plan de la fuente y se añade la variante con `Bg5`. |

## Métricas de auditoría (profundidad 16)

**The Smith-Morra Gambit posiciones, 45 señaladas, 0 errores graves, pérdida media 7 cp** (peor 10,0). Las señaladas son
jugadas de libro que CDB recomienda y el motor discute; ninguna queda sin explicación en este informe.

## Huecos declarados

- Las planillas de Esserman (van Wely, Gukesh) y de Nakamura–Caruana 2023 están citadas en la fuente,
  pero sin token de Lichess no se pueden verificar jugada a jugada: no se usan como material de
  estudio.

## Fuentes

- Wikipedia, *Smith–Morra Gambit* — https://en.wikipedia.org/wiki/Smith%E2%80%93Morra_Gambit
- Chess Cloud Database — https://www.chessdb.cn/
- Stockfish 19 (profundidad 22 para la línea principal, 18 para las alternativas).
