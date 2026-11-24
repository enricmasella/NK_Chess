# Investigación · Larsen's Opening: 1.b3

Bloque 6 · comprobado el 2026-11-06. Fuentes: Wikipedia (*Larsen's Opening*), Chess Cloud Database;
Stockfish 19 (profundidad 18).

## Qué se verificó

| Capítulo | Línea | Evaluación |
| --- | --- | --- |
| 1. El sistema b3/Bb2 | `1.b3 e5 2.Bb2 Nc6 3.e3 Nf6 4.Bb5 Bd6 5.Ne2 O-O 6.O-O` | 0,00 |
| 2. Contra 1...d5 | `1...d5 2.Bb2 Nf6 3.e3 c5 4.Bb5+ Nbd7 5.Nf3 e6 6.O-O Bd6` | +0,05 blanco |
| 3. Presión con f4 | `2...Nc6 3.e3 d5 4.Bb5 Bd6 5.f4 Qe7 6.Nf3` | **+0,56 blanco** |

Alternativas medidas: `...d5` y `...Bd7` en el capítulo 1 **0,15 negro**; `...c5` inmediato +0,09 blanco;
sin `f4` (con `5.Nf3`) 0,00.

## Hallazgos

1. **El sistema no da nada por sí solo**: 0,00 en la principal y +0,05 contra `...d5`. El curso lo decía
   como si `Bb5+` creara presión; no es así.
2. **La única línea con ventaja real es la de f4**: +0,56, con el precio conocido (e3 y la diagonal del
   rey). Es el capítulo que hay que jugar y ahora está arriba.
3. **`...d5` y `...Bd7` es la respuesta más incómoda**: 0,15 para el negro, la primera línea del curso en
   la que el blanco está peor. Se dice en la alternativa en lugar de ocultarse.
4. La evaluación 0,00 sin `f4` demuestra que el espacio de la gran diagonal no se convierte en nada sin
   un peón que lo apoye: eso es ahora el plan del capítulo 3.

## Correcciones aplicadas

1. Resumen con las tres evaluaciones y sin promesas: «da juego, no ventaja».
2. Los tres capítulos reescritos con planes, transposiciones, fuentes y confianza C.
3. Capítulos 1 y 2 con la alternativa en la que el negro está mejor, explicada.

## Huecos declarados

- Sin `LICHESS_TOKEN` no hay frecuencia de maestros de `1.b3`; no se dan porcentajes.
- No se incluye partida modelo verificable (Larsen–Spassky 1970 se cita en prensa, no en una base
  consultable por el proyecto).
- No se ha encontrado una trampa verificable con el motor para este curso; no se inventa.

## Fuentes

- Wikipedia, *Larsen's Opening* — https://en.wikipedia.org/wiki/Larsen%27s_Opening
- Chess Cloud Database — https://www.chessdb.cn/
- Stockfish 19, profundidad 18 en las 6 líneas del curso.
