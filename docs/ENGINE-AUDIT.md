# NK_Chess · auditoría con Stockfish

Generado automáticamente por `scripts/engine-report.mjs` el 2026-11-06.
Motor: Stockfish 19 (binario oficial, en `.engine/`, fuera de git).

## Método

1. `scripts/engine-audit.mjs` compila los datos reales con esbuild y reproduce cada línea del
   catálogo.
2. Para cada posición consulta al motor con `go depth 16 multipv 3` y guarda las tres mejores
   jugadas.
3. Evalúa también la posición resultante de la jugada del repertorio (`depth 12`) para
   calcular la **pérdida en centipeones** desde el punto de vista de quien mueve.
4. Clasificación: correcta ≤ 30 cp · imprecisión ≤ 70 · error ≤ 150 · error grave > 150.
5. Cada posición tiene un límite de 8000 ms: al agotarse se envía `stop`, se espera el
   `bestmove` y, si el motor no responde, se reinicia el proceso y se reintenta una vez.

## Cobertura

| Métrica | Valor |
| --- | --- |
| Posiciones analizadas | **2390 / 2390** (100.0 %) |
| Posiciones omitidas | 0 |
| Jugadas dentro del top 3 | 1422 (59.5 %) |
| Pérdida media | 12.1 cp |
| Tiempo de motor | 358.7 s |
| Reinicios del motor | 0 |

## Distribución

| Veredicto | Jugadas |
| --- | --- |
| Correcta | 2212 |
| Imprecisión | 127 |
| Error | 41 |
| Error grave | 9 |
| Sin evaluar | 1 |

## Posiciones con mayor pérdida

| Curso | Capítulo | Jugada | Pérdida | Motor |
| --- | --- | --- | --- | --- |
| Beginner Openings | Errores típicos de apertura | Nf6 | 9930 cp | g6 |
| The Albin Countergambit | El gambito de Lasker: 4.e3?? | Bxb4 | 607 cp | fxe3 |
| The Gotham Dutch | Contra 6.g4: castigar con ...fxg4 | g4 | 269 cp | c4 |
| The Albin Countergambit | 5.a3: la partida tranquila | e3 | 252 cp | g3 |
| The Albin Countergambit | El gambito de Lasker: 4.e3?? | Rxg1 | 225 cp | Ke1 |
| Tactics Level One | Piezas colgadas | Nxe5 | 175 cp | Nxd4 |
| Latvian Gambit | ...f5 y la línea crítica 3.Nxe5 | f5 | 160 cp | Nc6 |
| The Beefeater Defense | El esquema ...c6, ...e5 y ...e4 | Nf3 | 158 cp | dxe5 |
| The Fried Liver Attack | Nxf7: el sacrificio y su defensa exacta | Nxd5 | 156 cp | Na5 |
| The b3 French | El gambito Papa-Ticulat y su refutación | b3 | 149 cp | Nc3 |
| Latvian Gambit | 3.exf5: aceptar el gambito | f5 | 144 cp | Nc6 |
| The Fried Liver Attack | Nxf7: el sacrificio y su defensa exacta | a3 | 135 cp | Bb3 |
| The Englund Gambit | La línea principal y su refutación 6.Nc3! | e5 | 131 cp | Nf6 |
| Latvian Gambit | 3.Bc4: la versión menos mala | f5 | 131 cp | Nc6 |
| Pawn Endgame Masterclass | El peón pasado protegido | Kd8 | 128 cp | Kf8 |
| The Danish Gambit | El Gambito Goring | Be7 | 127 cp | Nf6 |
| The Englund Gambit | 2...d6: el gambito Blackburne–Hartlaub | e5 | 127 cp | d5 |
| The Englund Gambit | 4.Qd5!? la variante de Estocolmo | e5 | 126 cp | Nf6 |
| Tactics Masterclass | Sacrificios sobre el enroque | Bxc3 | 119 cp | d5 |
| Traxler Counterattack | 6.Bb3 y la defensa ...Qe8 | Bc5 | 114 cp | d5 |
| Traxler Counterattack | 5.Bxf7+ y 6.Bd5!, la mejor del blanco | Bc5 | 107 cp | d5 |
| Queen's Gambit Accepted | Contra 3.e4 (el centro grande) | e6 | 106 cp | e5 |
| The Fried Liver Attack | Nxf7: el sacrificio y su defensa exacta | Nd4 | 104 cp | Nxa1 |
| The b3 French | Por qué b3 sólo funciona en el avance | b3 | 103 cp | O-O |
| The Ponziani | El centro con 3.c3 y 4.d4 | Ne7 | 102 cp | Bc5 |

## Cobertura por curso

| Curso | Capítulos | Posiciones | Errores | Peor pérdida |
| --- | --- | --- | --- | --- |
| Beginner Openings | 2 | 17 | 1 | 9930 cp |
| The Albin Countergambit | 3 | 48 | 5 | 607 cp |
| The Gotham Dutch | 3 | 36 | 1 | 269 cp |
| Tactics Level One | 2 | 21 | 2 | 175 cp |
| Latvian Gambit | 3 | 26 | 3 | 160 cp |
| The Beefeater Defense | 2 | 20 | 2 | 158 cp |
| The Fried Liver Attack | 3 | 51 | 3 | 156 cp |
| The b3 French | 3 | 45 | 5 | 149 cp |
| The Englund Gambit | 3 | 35 | 4 | 131 cp |
| Pawn Endgame Masterclass | 2 | 9 | 1 | 128 cp |
| The Danish Gambit | 3 | 46 | 3 | 127 cp |
| Tactics Masterclass | 3 | 46 | 1 | 119 cp |
| Traxler Counterattack | 3 | 45 | 3 | 114 cp |
| Queen's Gambit Accepted | 2 | 22 | 1 | 106 cp |
| The Ponziani | 3 | 41 | 2 | 102 cp |
| Endgame Masterclass | 3 | 17 | 1 | 100 cp |
| The Trompowsky Attack | 3 | 33 | 1 | 90 cp |
| Beginner Tactics | 2 | 22 | 1 | 88 cp |
| The Modern Defense | 2 | 24 | 1 | 86 cp |
| The Hillbilly Attack | 2 | 18 | 2 | 83 cp |

## Cómo leer esto

- El motor **no es teoría de aperturas**: en gambitos y líneas agresivas suele preferir la línea
  sólida. Una pérdida alta no implica que la jugada sea un error de repertorio, sino que hay que
  revisarla con teoría publicada.
- Las líneas marcadas como `demo` en los datos muestran errores a propósito (por ejemplo, la
  posición de mate en `Beginner Openings`) y no generan ejercicios.
- Este informe **no** dice que el catálogo esté validado teóricamente: mide legalidad, coherencia
  posicional y desviaciones frente al motor, y solo en las posiciones listadas.
