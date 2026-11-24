# Investigación · Dutch Defense Sidelines

Bloque 5 · comprobado el 2026-11-06. Fuentes: Wikipedia, *Dutch Defence*; Chess Cloud Database;
Stockfish 19 (profundidad 18).

## Qué se verificó

| Capítulo | Línea | Evaluación |
| --- | --- | --- |
| 1. Staunton con ...g6 | `1.d4 f5 2.e4 fxe4 3.Nc3 Nf6 4.Bg5 g6` | **0,00** |
| 2. Clásico ...d5 y ...c6 | `2.g3 Nf6 3.Nf3 e6 4.Bg2 d5 5.O-O Be7 6.c4 c6` | +0,62 blanco |

Comprobadas además: la línea anterior del curso `4...e6 5.f3 exf3 6.Nxf3 Be7` (**+0,76 blanco**, peor)
y el clásico sin `c4` (+0,47 blanco).

## Hallazgos

1. **Contra el gambito Staunton la jugada es `...g6`, no `...e6`.** Con `...e6` el negro tapa su propio
   alfil y permite `Bd3` y `Ne5`: +0,76 blanco. Con `...g6` la posición queda 0,00 y el gambito se
   neutraliza. La auditoría marcaba exactamente ese `...e6` (103 cp) y el `f3` blanco (89 cp).
2. **El clásico es la otra mitad del mini curso**: `...d5` y `...c6` sujetan e4 y dan al negro un plan
   claro (`...Ne4`, `...Bd6`, `...b6`). +0,62 blanco, posición normal.
3. El gambito Staunton no da ventaja a nadie: 0,00 es el dato que faltaba en el curso.

## Correcciones aplicadas

1. Capítulo 1 reescrito con **`...g6`** y la línea `...e6` como alternativa documentada (y explicada como
   inferior); planes de los dos bandos y transposición al clásico.
2. Capítulo 2 con `...c6` incluido, planes y transposiciones a los otros cursos de Holandés.
3. Resumen con las dos evaluaciones (0,00 y +0,6) en lugar de una promesa genérica.

## Huecos declarados

- Sin `LICHESS_TOKEN` no hay frecuencia de maestros del Staunton.
- No se citan partidas: el curso es de sistema, sin partidas modelo verificadas.

## Fuentes

- Wikipedia, *Dutch Defence* — https://en.wikipedia.org/wiki/Dutch_Defence
- Chess Cloud Database — https://www.chessdb.cn/
- Stockfish 19, profundidad 18 en todas las líneas del curso.
