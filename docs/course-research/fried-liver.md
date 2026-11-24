# Investigación · The Fried Liver Attack

Bloque 3 · comprobado el 2026-11-06. Fuentes: Wikipedia, *Fried Liver Attack* e *Italian Game*; Chess Cloud Database; Stockfish 19 (profundidad 16–20).

## Qué se verificó

| Capítulo | Línea | Evaluación |
| --- | --- | --- |
| 1. Sacrificio y defensa exacta | `6.Nxf7 Kxf7 7.Qf3+ Ke6 8.Nc3 Ncb4 9.a3 Nxc2+ 10.Kd1 Nd4` | ≈0,0 (igualdad) |
| 1b. Defensa floja | `8...Nce7 9.d4` | **+2,54 blanco** |
| 2. Contra 4...h6 | `4...Bc5 5.c3 Nf6 6.d4 exd4 7.cxd4 Bb4+ 8.Nc3 Nxe4 9.O-O` | igualdad con iniciativa blanca |
| 3. Sin sacrificio | `4.Bc4 Bc5 5.c3 Nf6 6.d4 exd4 7.cxd4 Bb4+ 8.Nc3 Nxe4 9.O-O` | igualdad |

## El error que tenía el curso

El curso presentaba el Fried Liver como si el ataque diera ventaja:

```
... 6.Nxf7 Kxf7 7.Qf3+ Ke6 8.Nc3 Nce7 9.d4 c6 10.Bg5
```

con `8...Nce7`, la defensa **mala**. La defensa moderna es **`8...Ncb4`**: cambia el caballo que ataca d5 y, si `9.a3`, `...Nxc2+` obliga a `Kd1`. Con esa secuencia el motor da **igualdad**, no ventaja blanca, y `...Qh4` activa la dama contra el rey expuesto.

Eso no invalida el sacrificio: sigue siendo una excelente arma práctica de club, porque el negro tiene que encontrar varias jugadas exactas. Pero el curso ya no puede venderlo como "ganador". Lo que sí es cierto y está verificado: contra `8...Nce7` el blanco **gana** (+2,5).

## Correcciones

1. Capítulo 1: línea principal reescrita con `8...Ncb4 9.a3 Nxc2+ 10.Kd1 Nd4` (evaluación ≈0).
2. El texto pasa de "el ataque gana" a "el ataque es práctico y la defensa exacta iguala", con la defensa floja documentada como alternativa (+2,5).
3. Se añade `4.d4` como alternativa sólida que evita el sacrificio y lleva al Max Lange del curso *Aggressive Italian*.
4. Capítulo 3: corregido `7...Bb4+` con jaque (`Bb4` sin jaque era ilegal en la secuencia anterior) y renombrado a "Cuando no hay sacrificio", con nota de transposición al curso *Italian Center Attack*.
5. Nota: se eliminó una línea de "trampa" con `...Qh4` al final porque el motor prefiere `...c6`; la secuencia `...Ncb4` se queda como línea principal, no como trampa.

## Discrepancias motor / teoría

| Jugada | Lectura |
| --- | --- |
| `6.Nxf7` | El motor prefiere `6.d4`/`6.Nf3` (el sacrificio cuesta ~0,5). Se mantiene porque es el tema del curso y la práctica es muy favorable al blanco. |
| `8...Ncb4` | Corrección teórica reciente frente al `8...Nce7` de los libros antiguos. La fuente principal de la línea es el motor + CDB; se marca confianza C por eso. |

## Huecos declarados

- Sin `LICHESS_TOKEN` no hay estadísticas de resultados del sacrificio por nivel.
- No se citan partidas modelo: el curso no incluye planillas verificadas del Fried Liver.

## Fuentes

- Wikipedia, *Fried Liver Attack* — https://en.wikipedia.org/wiki/Fried_Liver_Attack
- Wikipedia, *Italian Game* — https://en.wikipedia.org/wiki/Italian_Game
- Chess Cloud Database — https://www.chessdb.cn/
- Stockfish 19, profundidad 20 en la línea principal.
