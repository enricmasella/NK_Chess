# Investigación · The Exchange Caro-Kann

Bloque 3 · comprobado el 2026-11-06. Fuentes: Wikipedia, *Caro–Kann Defence*; Chess Cloud Database; Stockfish 19 (profundidad 18).

## Qué se verificó

| Línea | Evaluación |
| --- | --- |
| `1.e4 c6 2.d4 d5 3.exd5 cxd5 4.Bd3 Nc6 5.c3 Nf6 6.Bf4 Bg4 7.Qb3` | +0,28 blanco |
| `6...e6 7.Nf3 Bd6 8.Bxd6 Qxd6` | +0,63 blanco |

## Estado del curso

Este curso estaba en preparación (`soon`) con un único capítulo. La auditoría de profundidad 16 no marcó **ninguna** jugada (0 señaladas, pérdida media 3,0 cp), así que no había errores que corregir: el trabajo era completar el contenido.

## Correcciones y añadidos

1. Línea principal ampliada hasta `7.Qb3`, que es la jugada que presiona b7 y d5 a la vez (antes terminaba en `6.Bf4`).
2. Alternativa `6...e6`: si el negro no clava con `...Bg4`, el blanco cambia alfiles y tiene +0,6. Es la línea más cómoda del curso.
3. Se añaden planes para los dos bandos (presión en h7 y en el flanco de rey blancas; `...e6`, `...Bd6` y final sólido negras), fuentes y confianza C.
4. Se probó una trampa con `7.Qb3 Na5` y se **descartó**: el motor prefiere `...e5` en esa posición, así que la "trampa" no era tal. El curso queda sin trampas, que es lo honesto para una variación simétrica.

## Por qué la confianza es C

La variación del cambio no da ventaja real: +0,3 es comodidad. El valor del curso es práctico (evita teoría, estructura simétrica, planes claros), no una ventaja de evaluación. Así se explica en la lección.

## Huecos declarados

- Sin `LICHESS_TOKEN` no hay frecuencias de maestros para el cambio en d5.
- No se citan partidas modelo.

## Fuentes

- Wikipedia, *Caro–Kann Defence* — https://en.wikipedia.org/wiki/Caro%E2%80%93Kann_Defence
- Chess Cloud Database — https://www.chessdb.cn/
- Stockfish 19, profundidad 18.
