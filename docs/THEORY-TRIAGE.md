# Triaje teórico de las jugadas señaladas por Stockfish

Generado por `scripts/theory-triage.mjs` el 2026-11-06.
Umbral: pérdida > 30 cp. Datos: `.tmp/engine-audit.json` + Chess Cloud
Database (`chessdb.cn`).

## Qué significa cada categoría

| Categoría | Significado |
| --- | --- |
| `demo` | Capítulo marcado como demostración: el error se muestra a propósito. |
| `recomendada` | CDB marca la jugada con `!` y rank 2: jugada de la base, el motor discrepa. |
| `jugable` | CDB la marca con `*` y rank 1: aceptable, no la mejor según el motor. |
| `dudosa` | CDB la marca con `?` y rank 0: la base también la considera inferior. |
| `fuera de libro` | CDB conoce la posición pero no esa jugada. |

## Recuento

| Categoría | Jugadas |
| --- | --- |
| Total señaladas (> 30 cp) | 177 |
| Demo intencional | 8 |
| Recomendada por CDB (revisar con teoría) | 33 |
| Jugable según CDB | 35 |
| Dudosa según CDB (candidatas reales) | 101 |
| Fuera de libro | 0 |
| Error de consulta | 0 |

## Candidatas reales (CDB también las considera dudosas)

| Curso | Capítulo | Jugada | Pérdida | Motor | Nota CDB |
| --- | --- | --- | --- | --- | --- |
| The Albin Countergambit | El gambito de Lasker: 4.e3?? | Bxb4 | 607 cp | fxe3 | ? (22-01) |
| The Gotham Dutch | Contra 6.g4: castigar con ...fxg4 | g4 | 269 cp | c4 | ? (05-01) |
| The Albin Countergambit | 5.a3: la partida tranquila | e3 | 252 cp | g3 | ? (09-01) |
| The Albin Countergambit | El gambito de Lasker: 4.e3?? | Rxg1 | 225 cp | Ke1 | ? (13-01) |
| Tactics Level One | Piezas colgadas | Nxe5 | 175 cp | Nxd4 | ? (36-01) |
| Latvian Gambit | ...f5 y la línea crítica 3.Nxe5 | f5 | 160 cp | Nc6 | ? (28-01) |
| The Beefeater Defense | El esquema ...c6, ...e5 y ...e4 | Nf3 | 158 cp | dxe5 | ? (31-01) |
| The Fried Liver Attack | Nxf7: el sacrificio y su defensa exacta | Nxd5 | 156 cp | Na5 | ? (37-01) |
| Latvian Gambit | 3.exf5: aceptar el gambito | f5 | 144 cp | Nc6 | ? (28-01) |
| The Fried Liver Attack | Nxf7: el sacrificio y su defensa exacta | a3 | 135 cp | Bb3 | ? (17-01) |
| The Englund Gambit | La línea principal y su refutación 6.Nc3! | e5 | 131 cp | Nf6 | ? (29-01) |
| Latvian Gambit | 3.Bc4: la versión menos mala | f5 | 131 cp | Nc6 | ? (28-01) |
| The Danish Gambit | El Gambito Goring | Be7 | 127 cp | Nf6 | ? (46-01) |
| The Englund Gambit | 2...d6: el gambito Blackburne–Hartlaub | e5 | 127 cp | d5 | ? (29-01) |
| The Englund Gambit | 4.Qd5!? la variante de Estocolmo | e5 | 126 cp | Nf6 | ? (29-01) |
| Tactics Masterclass | Sacrificios sobre el enroque | Bxc3 | 119 cp | d5 | ? (37-01) |
| Traxler Counterattack | 6.Bb3 y la defensa ...Qe8 | Bc5 | 114 cp | d5 | ? (38-01) |
| Traxler Counterattack | 5.Bxf7+ y 6.Bd5!, la mejor del blanco | Bc5 | 107 cp | d5 | ? (38-01) |
| Queen's Gambit Accepted | Contra 3.e4 (el centro grande) | e6 | 106 cp | e5 | ? (40-01) |
| The Fried Liver Attack | Nxf7: el sacrificio y su defensa exacta | Nd4 | 104 cp | Nxa1 | ? (09-01) |
| The Englund Gambit | 4.Qd5!? la variante de Estocolmo | Qd5 | 100 cp | Bg5 | ? (31-01) |
| The Albin Countergambit | 5.a3: la partida tranquila | O-O-O | 100 cp | dxe3 | ? (09-01) |
| The Beefeater Defense | El esquema ...c6, ...e5 y ...e4 | e5 | 100 cp | d5 | ? (31-01) |
| Tactics Level One | Piezas colgadas | Nd4 | 99 cp | Bc5 | ? (31-01) |
| Traxler Counterattack | 5.Nxf7: el contraataque real | Bc5 | 94 cp | d5 | ? (38-01) |
| The Ponziani | Contra 3...f5 | Qe7 | 93 cp | d5 | ? (28-01) |
| The Albin Countergambit | El gambito de Lasker: 4.e3?? | e3 | 93 cp | Nf3 | ? (37-02) |
| The Trompowsky Attack | Contra 2...d5 | O-O | 90 cp | dxc4 | ? (27-01) |
| Beginner Tactics | La horquilla del caballo | Nxd5 | 88 cp | Na5 | ? (37-01) |
| The Modern Defense | Contra el ataque austriaco | Nf3 | 86 cp | dxc5 | ? (31-02) |
| The b3 French | b3 en la Francesa del avance | cxd4 | 81 cp | Bd3 | ? (33-01) |
| The Hillbilly Attack | Si el negro no toma en e4: 3...e6 | e6 | 79 cp | dxe4 | ? (28-03) |
| The Danish Gambit | El gambito de los tres peones | c6 | 77 cp | Na6 | ? (08-02) |
| Owen's Defense (e6 b6) | Contra 1.d4 | Nf3 | 77 cp | e4 | ? (21-02) |
| The Scotch Game | La Lolli: 4...Nxd4 5.Qxd4 | d6 | 74 cp | Qf6 | ? (46-02) |
| Owen's Defense (e6 b6) | Contra 1.d4 | b6 | 74 cp | d5 | ? (28-01) |
| Scandinavian Defense | Contra 4.Bd2 y las líneas con 0-0-0 | Qe2 | 73 cp | Ne5 | ? (16-01) |
| How To Attack | Abrir líneas con sacrificio | Nxd5 | 73 cp | Na5 | ? (37-01) |
| The b3 French | b3 en la Francesa del avance | Nge7 | 71 cp | Bb4+ | ? (28-03) |
| The Gotham Dutch | El gambito Krejcik: 2.g4 | g4 | 69 cp | Bg5 | ? (21-02) |

## Discrepancias motor/teoría (CDB la recomienda, Stockfish la penaliza)

No se tocan sin leer teoría: la base las respalda.

| Curso | Capítulo | Jugada | Pérdida | Motor | Nota CDB |
| --- | --- | --- | --- | --- | --- |
| Pawn Endgame Masterclass | El peón pasado protegido | Kd8 | 128 cp | Kf8 | ! (L-0003) |
| The Ponziani | El centro con 3.c3 y 4.d4 | Ne7 | 102 cp | Bc5 | ! (34-01) |
| The Dark Vienna | La trampa: 4.Qh5, 6.Nb5 y 8.Qd5 | Nc6 | 77 cp | Be7 | ! (28-01) |
| The Danish Gambit | El gambito de los tres peones | c3 | 72 cp | Nf3 | ! (31-10) |
| 1.e4 Part 1: The Vienna | La trampa Dark Vienna: 4.Qh5 y 6.Nb5 | Nc6 | 71 cp | Be7 | ! (28-01) |
| Aggressive Italian Game | El centro con 4.c3 y 5.d4 | Nc3 | 61 cp | Bd2 | ! (34-01) |
| The Danish Gambit | El gambito de los tres peones | Bc4 | 55 cp | Nxc3 | ! (31-08) |
| The Sicilian Dragon | El esquema Dragón | g6 | 47 cp | a6 | ! (43-24) |
| The Danish Gambit | Contra 3...d5 (rechazo central) | c3 | 46 cp | Nf3 | ! (31-10) |
| Larsen's Opening: 1.b3 | Presión con f4 | Qe7 | 45 cp | Qh4+ | ! (30-06) |
| Anti-Sicilian For White | El avance e5 frente a ...Nf6 | Nbd7 | 45 cp | a6 | ! (28-05) |
| The Smith-Morra Gambit | La Morra aceptada | Qe2 | 44 cp | h4 | ! (21-05) |
| 1.e4 Part 1: The Vienna | Vienna tranquila con 4.d3 y 5.Nf3 | Bc5 | 43 cp | Nf6 | ! (36-12) |
| Aggressive Ruy Lopez | El empuje d4 contra 3...a6 | d4 | 39 cp | O-O | ! (31-04) |
| 1.e4 Part 2: Sicilian | La Mengarini: 2.a3 y 3.b4 | d5 | 39 cp | d6 | ! (35-04) |
| Aggressive Italian Game | El Max Lange Attack | Bc5 | 38 cp | Nxe4 | ! (38-02) |
| Aggressive Ruy Lopez | Contra la Jaenisch: 3...f5 | d5 | 37 cp | Nf6 | ! (33-04) |
| 1.e4 Part 2: Sicilian | Contra 2...d5 | d5 | 36 cp | g6 | ! (30-01) |
| 1.e4 Part 1: The Vienna | El Gambito Vienna: 3.f4 | Qe2 | 35 cp | d4 | ! (22-04) |
| The London System | Contra ...c5 y ...Qb6: Qb3 y Qc2 | Qb3 | 35 cp | Qc2 | ! (30-03) |
| Aggressive Italian Game | El Max Lange Attack | Ng5 | 34 cp | fxg7 | ! (22-02) |
| Caro-Kann Defense | La Avance: 3.e5 | cxd4 | 34 cp | Qb6 | ! (13-02) |
| 1.e4 Part 1: The Vienna | El orden Vienna y el ataque a f7 | Nxe4 | 33 cp | Bc5 | ! (37-02) |
| Larsen's Opening: 1.b3 | El sistema b3/Bb2 | Ne2 | 33 cp | Be2 | ! (25-05) |
| The Smith-Morra Gambit | La Morra aceptada | c3 | 33 cp | Nf3 | ! (23-08) |
