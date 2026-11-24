# Investigación · The b3 French

Bloque 3 · comprobado el 2026-11-06. Fuentes: Wikipedia, *French Defence*; base de datos Chess Cloud Database; motor Stockfish 19 (profundidad 18–20).

## Qué se verificó

| Capítulo | Línea | Evaluación |
| --- | --- | --- |
| 1. Gambito Papa-Ticulat | `1.e4 e6 2.d4 d5 3.b3 dxe4 4.Bb2 f5` | **−1,22 blanco** (refutado) |
| 2. b3 en el avance | `3.e5 c5 4.c3 Nc6 5.Nf3 Qb6 6.b3 cxd4 7.cxd4 Nge7` | +0,02 |
| 3. b3 en la Tarrasch | `3.Nd2 Nf6 4.e5 Nfd7 5.Bd3 c5 6.c3 Nc6 7.Ne2 cxd4 8.cxd4 Be7 9.b3` | −0,66 blanco (demo) |

Líneas comprobadas además: `3...c5` con captura en d5 (equilibrada, +0,1 negro) y el orden con `...dxe4` tras `...Nf6` (recuperación con f3 sin columna abierta).

## El problema que tenía el curso

El curso enseñaba el gambito Papa-Ticulat como línea principal:

```
1.e4 e6 2.d4 d5 3.b3 dxe4 4.Bb2 f5 5.f3 Nc6 6.Nd2 Nf6 7.fxe4 fxe4 8.Bc4
```

Y esa línea está **refutada**. El motor da **−1,22 al blanco**: `...f5` sostiene el peón de e4, abre la columna f para el negro y el alfil de b2 no compensa. La auditoría de profundidad 16 marcó además 3 errores graves en este curso, todos en la misma línea.

La regla del proyecto es no "arreglar" una jugada de libro porque el motor la penalice, pero aquí no hay libro que la respalde: CDB tampoco la recomienda. Por eso el capítulo se conserva como **lección marcada `demo`** (se estudia, no genera ejercicios) y el sistema bueno se traslada al capítulo 2.

## Correcciones

1. Capítulo 1: convertido en lección de la refutación. Línea larga hasta `...c5`, `demo: true`, trampa documentada (`...f5`), planes para los dos bandos si ya estás dentro.
2. Capítulo 2: nuevo capítulo con el orden correcto — primero `3.e5` y `c3`, después `b3` y `Bb2`. Es la forma de jugar b3 en la Francesa que el motor acepta (0,00).
3. Capítulo 3: era `3.b3 Nf6 4.Bb2 e5`, que la auditoría marcó con 155 cp de pérdida (el motor pide `3.Nc3`). Se reescribe como lección `demo` **«Por qué b3 sólo funciona en el avance»** con la Tarrasch: −0,66 para el blanco, frente a 0,00 en el avance. Es la conclusión honesta del bloque: b3 no es un sistema universal contra la Francesa.
4. Se elimina la línea de `3...c5` como capítulo propio: su evaluación es de igualdad y entra como alternativa del capítulo 2.

## Discrepancias motor / teoría

| Jugada | Lectura |
| --- | --- |
| `3.b3` | El motor prefiere `3.Nc3`/`3.e5`, y con razón: 3.b3 inmediato permite `...dxe4` y cuesta ~1,5. Por eso el curso separa la refutación (cap. 2) del sistema bueno (cap. 1 marcado demo) — no se maquilla la evaluación. |
| `3...Be7` y `3...Nf6` (capítulo 2, ahora demo) | Las dos estaban señaladas porque el motor quiere `...Nxe4`/`dxe4`; con el centro abierto el negro está mejor. Confirmaba el problema, no lo resolvía. |

## Huecos declarados

- Sin `LICHESS_TOKEN` no hay frecuencias de maestros para el gambito ni para el sistema con b3. No se inventan porcentajes.
- No se cita ninguna partida modelo: no se ha podido verificar la planilla de las que suelen atribuirse al Papa-Ticulat.

## Fuentes

- Wikipedia, *French Defence* — https://en.wikipedia.org/wiki/French_Defence
- Chess Cloud Database — https://www.chessdb.cn/
- Stockfish 19, profundidad 20 en las tres líneas del curso.
