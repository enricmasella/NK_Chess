# Investigación · The Hillbilly Attack

Bloque 5 · comprobado el 2026-11-06. Fuentes: Wikipedia, *Caro–Kann Defence*; Chess Cloud Database;
Stockfish 19 (profundidad 18).

## Qué se verificó

| Capítulo | Línea | Evaluación |
| --- | --- | --- |
| 1. Bc4 y Qh5 (demo) | `1.e4 c6 2.Bc4 d5 3.Bb3 dxe4 4.Qh5 g6 5.Qh4` | **+0,85 negro** |
| 2. Contra 3...e6 | `3...e6 4.d4 dxe4 5.Nc3` | 0,00 |

Sin evaluar (se mantiene sin afirmar nada): `2...Nf6 3.Nc3 d5 4.Bb3 dxe4 5.Nge2`, la línea del
capítulo 2 anterior.

## Hallazgos

1. **El ataque no funciona contra la defensa correcta**: tras `...g6` el negro responde `...Bf5` y `...e6`
   y queda con +0,85. La dama de h4 está fuera de juego y el peón de e4 es un escudo, no una debilidad.
   El capítulo pasa a `demo`: se estudia el mecanismo, no se entrena como si fuera bueno.
2. **Sí hay una versión jugable**: si el negro ignora la amenaza con `3...e6`, el blanco recupera con
   `Nc3` y la posición queda 0,00. Es el capítulo que se entrena.
3. La auditoría marcaba `Bb3`, `Nc3` y `Nf6` (80–104 cp): eran jugadas del propio ataque, no errores de
   tecleo. La corrección honesta era la evaluación y la marca `demo`, no cambiar jugadas de la idea.

## Correcciones aplicadas

1. Resumen reescrito: «es una sorpresa para partidas rápidas, no una ventaja» con el +0,85 explícito.
2. Capítulo 1 marcado `demo`, con planes de los dos bandos y confianza D.
3. Capítulo 2 con la evaluación 0,00, alternativa `2...Nf6` y fuentes.
4. Se elimina del texto la promesa de «ataque sobre h7» que el motor no respalda.

## Huecos declarados

- Sin `LICHESS_TOKEN` no hay frecuencia del Hillbilly; el propio nombre es de club, no de teoría.
- La línea `2...Nf6` queda sin evaluación verificada: no se afirma nada sobre ella.

## Fuentes

- Wikipedia, *Caro–Kann Defence* — https://en.wikipedia.org/wiki/Caro%E2%80%93Kann_Defence
- Chess Cloud Database — https://www.chessdb.cn/
- Stockfish 19, profundidad 18 en las líneas evaluadas.
