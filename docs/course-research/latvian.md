# Investigación · Latvian Gambit

Bloque 5 · comprobado el 2026-11-06. Fuentes: Wikipedia, *Latvian Gambit* (C40); Chess Cloud Database;
Stockfish 19 (profundidad 18).

## Qué se verificó

| Capítulo | Línea | Evaluación |
| --- | --- | --- |
| 1. Línea crítica 3.Nxe5 | `1.e4 e5 2.Nf3 f5 3.Nxe5 Qf6 4.d4 d6 5.Nc4 fxe4` | **+1,56 blanco** |
| 2. 3.Bc4, la menos mala | `3.Bc4 fxe4 4.Nxe5 Qg5` | +0,25 blanco |
| 3. 3.exf5 | `3.exf5 e4 4.Ne5 Nf6` | +1,08 blanco |

## Hallazgos

1. **El gambito está refutado**: +1,56 con la línea principal, y el caballo de c4 más el peón de e4
   estorban al propio negro. Confianza D, y el resumen lo dice.
2. **`3.Bc4` es la línea que hay que conocer**: solo +0,25, con `...Qxg2` y la dama blanca en h1 como
   recurso. Es el capítulo 2 y la única rama con contrajuego real.
3. **Aceptar con `3.exf5` tampoco salva al negro** (+1,08), al contrario de lo que sugería el curso.
4. La auditoría marcaba `f5` (114 cp) y `Bc4` (154 cp): la primera es la jugada que define el gambito
   (se mantiene, es el tema del curso); la segunda es una jugada del blanco donde el motor prefiere
   `Nxe5`, documentada en el capítulo.

## Correcciones aplicadas

1. Capítulo 1 reescrito con la línea completa hasta `...fxe4`, planes y fuentes; confianza D.
2. Capítulo nuevo: **`3.Bc4`**, con `...Qxg2` y alternativa `4...Nf6`.
3. Capítulo nuevo: **`3.exf5`**, con la evaluación real.
4. El curso sigue en estado «en preparación»: el contenido está investigado, pero no se publica como
   repertorio recomendable.

## Huecos declarados

- Sin `LICHESS_TOKEN` no hay frecuencia de maestros de la Latvian; no se dan porcentajes.
- No se cita ninguna partida modelo verificada.
- Wikipedia da la Latvian como dudosa; no se ha encontrado ninguna fuente reciente que la reivindique.

## Fuentes

- Wikipedia, *Latvian Gambit* — https://en.wikipedia.org/wiki/Latvian_Gambit
- Chess Cloud Database — https://www.chessdb.cn/
- Stockfish 19, profundidad 18 en las tres líneas.
