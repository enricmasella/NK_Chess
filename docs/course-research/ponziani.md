# Investigación · The Ponziani

Bloque 3 · comprobado el 2026-11-06. Fuentes: Wikipedia, *Ponziani Opening*; Chess Cloud Database; Stockfish 19 (profundidad 18–20).

## Qué se verificó

| Capítulo | Línea | Evaluación |
| --- | --- | --- |
| 1. Centro con 3.c3 y 4.d4 | `3.c3 Nf6 4.d4 Nxe4 5.d5 Ne7 6.Nxe5 Ng6 7.Nxg6 hxg6 8.Qe2 Qe7 9.Be3` | +0,42 blanco |
| 2. Contra 3...d5 | `3...d5 4.Qa4 f6 5.exd5 Qxd5 6.d4` | +0,25 negro (igualdad) |
| 3. Contra 3...f5 | `3...f5 4.d4 fxe4 5.Nxe5 Nxe5 6.dxe5 Qe7 7.Bf4` | **+1,51 blanco** |

Comprobadas además: `4...Nf6?!` en la línea de `3...d5` (el blanco gana un peón, +1,56), `5...Nf6` como defensa sólida del contragolpe (+0,57 blanco) y `5...Bc5` en el capítulo 1 (posición igualada, pero `6.Nxe5??` pierde por `...Bxf2+`, **−8,6**).

## Los dos errores que tenía el curso

1. **Capítulo 3, `7.Nd2`**: la línea del contragolpe `3...f5` acababa en `7.Nd2`, y esa jugada deja escapar casi toda la ventaja (de +1,5 a ≈0). La auditoría la marcó con **248 cp de pérdida** — el peor error grave del bloque. La jugada correcta es **`7.Bf4`**, que clava el peón de e5 y la dama de e7 en la diagonal.
2. **Capítulo 1, `7.Qd4`**: permitía `...Nf6` con tempo y el negro desarrollaba gratis. Ahora la línea juega `7.Nxg6 hxg6`, que deja al negro con peones dobles y +0,4 al blanco.

Además, el capítulo 2 enseñaba `4...Nf6` como si fuera la respuesta normal del negro; el motor demuestra que pierde un peón. Se ha convertido en la **trampa** del capítulo (con la línea completa que castiga) y la respuesta principal pasa a ser `4...f6`, que sí iguala.

## Correcciones

1. Capítulo 1: línea reescrita con `Nxg6`; alternativas `4...exd4` (transposición) y `5...Bc5`; nueva trampa `6.Nxe5?? Bxf2+`.
2. Capítulo 2: `4...f6` como principal (igualdad, +0,2 negro); `4...Nf6?!` como alternativa con evaluación +1,56 para el blanco.
3. Capítulo 3: `7.Bf4` en lugar de `7.Nd2`; `7.Nd2` queda documentada como la jugada mala; `5...Nf6` como defensa sólida del negro.
4. Los tres capítulos tienen planes para los dos bandos y fuentes con confianza.

## Nota sobre `3.c3`

La jugada del Ponziani no es la mejor del motor (`3.Bc4` o `3.d4` son preferidas por 30–40 cp), pero es una apertura de club legítima: CDB la clasifica como jugable (`*`) y la teoría la reconoce. Se mantiene, y la ventaja blanca de +0,4 en el capítulo 1 se describe como comodidad, no como refutación.

## Huecos declarados

- Sin `LICHESS_TOKEN` no hay frecuencia de maestros del Ponziani; no se dan porcentajes.
- No se citan partidas modelo: no se ha verificado la planilla de las clásicas del Ponziani.

## Fuentes

- Wikipedia, *Ponziani Opening* — https://en.wikipedia.org/wiki/Ponziani_Opening
- Chess Cloud Database — https://www.chessdb.cn/
- Stockfish 19, profundidad 20 en la línea `3...d5` y profundidad 18 en el resto.
