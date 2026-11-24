# NK_Chess · investigación y trazabilidad del contenido

Última actualización: 2026-11-06. Registra qué está comprobado, con qué, y qué falta.

## Escala de confianza

| Nivel | Significado | Cobertura actual |
| --- | --- | --- |
| **A · Motor** | Analizada con Stockfish 19 | 2.390 posiciones (todas las líneas) |
| **B · Base de datos** | Contrastada con una base de jugadas | 177 jugadas señaladas, clasificadas con Chess Cloud Database |
| **B2 · Maestros** | Frecuencia en partidas de maestros | **0** — requiere `LICHESS_TOKEN` (ver bloqueos) |
| **C · Teoría publicada** | Coincide con teoría estándar | Líneas principales, revisión manual |
| **D · Legalidad** | Línea legal, FEN válido, ejercicio resoluble | 3.976 jugadas, 1.203 ejercicios y 14 trampas (`npm run verify`) |
| **E · Original** | Explicación pedagógica propia | Todas las ideas y notas |
| **F · Sin verificar** | Pendiente | Ver «Pendiente» |

## Resultados del motor

`npm run engine:audit` + `npm run engine:report`; informe en [`ENGINE-AUDIT.md`](./ENGINE-AUDIT.md).

| Métrica | Valor |
| --- | --- |
| Posiciones analizadas | **2.390 / 2.390 (100 %)** |
| Profundidad | 16 (MultiPV 3) + 12 para la posición resultante |
| Dentro del top 3 | 59,5 % |
| Pérdida media | 12,1 cp |
| Correctas / imprecisión / error / error grave | 2.212 / 127 / 41 / 9 |
| Omitidas | 0 · reinicios del motor: 0 |

Las 9 «graves» que quedan son: `Beginner Openings` (`...Nf6`, capítulo `demo` de errores típicos), Albin
`Bxb4`, `e3` y `Rxg1` (jugadas del blanco dentro del gambito de Lasker y del capítulo `5.a3`), Gotham
Dutch `g4` (el empuje que el capítulo 2 castiga), `Tactics Level One` `Nxe5` (ejercicio de piezas
colgadas), Latvian `f5` (la jugada que define el gambito, refutada), Beefeater `Nf3` (el motor prefiere
`dxe5`; el capítulo lo explica) y Fried Liver `Nxd5` (dentro de la línea del sacrificio). Todas están
explicadas: errores a propósito, artefactos de evaluación o jugadas donde el motor propone algo mejor y
la teoría no.
Un caso aparte: `Endgame Masterclass / Rey y peón contra rey` aparece con 4.028 cp por el marcador de mate;
comprobado a profundidad 18, la propia PV del motor juega `d5` (ventaja de +6,4 y mate forzado), así que es
un artefacto de la evaluación, no un error de la línea.

La única fila «sin evaluar» es el mate final de `Beginner Endgames / El mate de dama y rey`: no hay
posición posterior que evaluar porque la partida termina. Está explicado, no es un hueco.

## La posición que faltaba (2.252 de 2.253, ya resuelta)

Era `Beginner Endgames / El mate de dama y rey`, cuyo FEN era
`7k/8/6K1/8/8/8/8/7Q w - - 0 1`: **posición ilegal**, porque la dama de h1 ya daba jaque al rey de h8
con el turno de las blancas. El motor se niega a analizarla (de ahí el `restart` que la marcaba como
omitida). Corregido a `7k/Q7/6K1/8/8/8/8/8 w` con mate en uno `Qg7#` (verificado: mate 1).

Para que este tipo de error no vuelva a pasar desapercibido, `scripts/verify.mjs` ahora valida cada
FEN: dos reyes, sin peones en primera u octava fila y sin que el bando que acaba de mover esté en
jaque. El catálogo actual pasa la validación completo.

## Triaje de las 177 jugadas señaladas

[`THEORY-TRIAGE.md`](./THEORY-TRIAGE.md) clasifica cada jugada con pérdida > 30 cp usando Chess Cloud
Database (marcas `!`, `*`, `?` de la propia base) además del motor:

| Categoría | Jugadas |
| --- | --- |
| Demo intencional | 8 |
| CDB la recomienda (`!`): discrepancia motor/teoría, no se reescribe | 33 |
| CDB la considera jugable (`*`) | 35 |
| CDB también la considera dudosa (`?`): candidatas reales | 101 |

Las 100 candidatas están ordenadas por pérdida. Las más caras ya están explicadas en los informes:
Albin `Bxb4` (607 cp) y `Rxg1` (225) son jugadas **del blanco** dentro del gambito de Lasker (la línea de
castigo del capítulo 3); Gotham Dutch `g4` (269) es el empuje que el capítulo 2 castiga; Albin `e3` (252)
es la jugada que abre la trampa; Beefeater `Nf3`, Latvian `f5` y Fried Liver `Nxd5` son jugadas del bando
fuerte que el motor mejora y que los capítulos explican. El resto es trabajo de los bloques 7–14, no un
fallo pendiente de la app.

## Ejercicios de trampas

Desde el bloque 5, `chapterDrills` añade un ejercicio por trampa: la posición antes del castigo y la
jugada que lo ejecuta. Se entrenan así los mates del Traxler, el Englund y el gambito de Lasker, no solo
se leen. Son 10 de los 1.203 ejercicios (el resto de trampas castiga con jugadas del bando contrario al
del curso y no genera pregunta).

## Cambios aplicados tras la auditoría

| Curso / capítulo | Antes | Ahora | Motivo |
| --- | --- | --- | --- |
| Beginner Endgames · mate de dama | FEN ilegal (jaque con turno del rival) | `7k/Q7/6K1/8/8/8/8/8 w` + `Qg7#` | El motor no podía analizarlo |
| Beginner Openings · errores típicos | `...Nf6` generaba un ejercicio que entrenaba el error | Capítulo `demo`, sin ejercicios | No enseñar el fallo como respuesta correcta |
| The Dark Vienna | `Qg4` (−957 cp) y `...d6` regalaba g7 | `4.Qh5`, `6.Nb5`, `8.Qd5` | Línea objetivamente perdedora |
| The Dark Vienna · defensa | Segunda línea también perdía material | `3...Bc5` | Qué hacer si el rival no entra |
| Vienna · orden de jugadas | `Qg3` (−808 cp) | `Qd5` | Perdía la torre de a8 |
| The Portuguese Gambit | `...Nxd5` perdía un caballo ante `cxd5` | `...e6` y `...Bxe6` | El gambito islandés entrega un peón |
| The Grünfeld | `...O-O` dejaba colgado el caballo de d5 | `...Nxc3` y `...O-O` | Orden correcto |
| Tactics Level One · piezas colgadas | Entrenaba `Nxf7??` | `Bxf7+ Kd8 O-O` | El ejercicio debe premiar la jugada correcta |
| Endgame Masterclass · rey y peón | Posición de tablas | FEN ganador + `d4, Kc6, d5` | Coherencia texto/posición |
| Pawn Endgame · peón pasado | FEN de tablas | FEN con peón pasado y rey activo | Ídem |
| The Jaenisch Gambit | `...Nf6` permitía `dxe4` | `...exf3` | Recuperar el caballo es la idea |
| The b3 French · Papa-Ticulat | `Nd2` antes de desarrollar (−324 cp) | `Bb2` primero | El alfil sale antes que los caballos |
| The b3 French (bloque 3) | Gambito Papa-Ticulat como línea principal | Capítulo `demo` de la refutación + sistema con `3.e5` | `...f5` lo refuta: −1,22 |
| The b3 French (bloque 3) | Capítulo `3...Nf6` con `3.b3` inmediato (155 cp) | Capítulo `demo` «b3 sólo en el avance» (Tarrasch, −0,66) | b3 con el centro abierto permite `...dxe4` |
| The Ponziani (bloque 3) | `7.Nd2` contra `3...f5` (248 cp) | `7.Bf4` (+1,51) | Nd2 deja escapar toda la ventaja |
| The Ponziani (bloque 3) | `4...Nf6` como respuesta normal | Respuesta principal `4...f6`; `...Nf6` como trampa (+1,56 blanco) | ...Nf6 pierde un peón |
| The Fried Liver (bloque 3) | `8...Nce7` vendido como "el ataque gana" | Línea principal `8...Ncb4` (igualdad) + `...Nce7` como defensa floja (+2,5) | La defensa moderna iguala |
| The Fried Liver (bloque 3) | `Bb4` sin jaque en el capítulo del Italian | `Bb4+` | Jugada ilegal en la secuencia |
| The Exchange Caro-Kann (bloque 3) | Solo `6.Bf4`, sin planes ni fuentes | `7.Qb3` + alternativa `6...e6` (+0,63) | Curso en preparación sin contenido de estudio |

## Fuentes

- `https://chessly.com/public/courses` — catálogo público (DOM renderizado).
- `https://old.chessly.com/courses` — `__NEXT_DATA__`, 15 cursos legacy con módulos.
- Stockfish 19 (binario oficial) — evaluación de todas las líneas.
- Chess Cloud Database (`chessdb.cn`) — jugadas de libro y marca de calidad por posición.
- Teoría estándar de aperturas para las líneas principales.

## Bloqueos reales

1. **Lichess Opening Explorer exige token** desde mediados de 2026 (la propia API lista
   `Authorization` y hay confirmación pública en el repo `lichess-org/lila-openingexplorer`). `401`
   con y sin User-Agent, en `explorer.lichess.ovh` y `explorer.lichess.org`, para `/masters` y
   `/lichess`. No es un bloqueo de red: es autenticación. Solución: token gratuito sin scopes en
   `https://lichess.org/account/oauth/token` guardado como `LICHESS_TOKEN` en `.env.local`;
   `npm run theory:check` ya lo envía como `Bearer` y se detiene con instrucciones si falta. Guía paso a paso en [`LICHESS-TOKEN.md`](./LICHESS-TOKEN.md); `npm run theory:ping` valida el token.
2. **`lichess.org/api/cloud-eval` sí responde 200** sin token: sirve para evaluaciones de referencia,
   no para frecuencias de jugadas.
3. **Cobertura capítulo a capítulo de Chessly**: inaccesible sin cuenta; los capítulos son
   reconstrucción original.

## Bloque 1 completado (2026-11-06)

Cursos: The Vienna, The Dark Vienna, The Scotch Game, Aggressive Italian Game y Aggressive Ruy
Lopez. Informes por curso en [`course-research/`](./course-research/).

| Métrica | Valor (auditoría a profundidad 16) |
| --- | --- |
| Posiciones auditadas del bloque | 272 |
| Jugadas con pérdida > 30 cp | 15 |
| Errores graves | **0** |
| Pérdida media por curso | 4,5 – 6,5 cp |
| Peor pérdida | 83 cp |

Los dos errores graves que había (208 y 107 cp a profundidad 12) desaparecieron. Las jugadas señaladas
que quedan son de libro: la base las recomienda y el motor discute, no son errores de línea.

Hallazgos que cambiaron contenido:

1. El capítulo 1 del Vienna duplicaba la trampa del capítulo 4. Ahora enseña la línea sólida `5...Be7`.
2. El Gambito Vienna presentaba `3...exf4` como línea principal; la teoría lo considera una concesión
   y el motor da +0,6 al blanco. La principal pasa a ser la Breyer (`3...d5`).
3. The Dark Vienna titulaba «La defensa correcta: 6...Nd4» una línea que no era esa jugada. Al
   comprobarlo, **6...Nd4 pierde por mate en 7** (`7.Nxd6+`); el capítulo se reescribió.
4. El capítulo del Scotch llamado «Mieses» era en realidad la Lolli; además afirmaba un cambio de
   damas que no existe. Corregido el nombre y la explicación.
5. El Max Lange terminaba en una posición sin respuesta negra y usaba como principal una línea que la
   teoría considera alternativa. Ahora usa la línea principal real y cita Vatter–Nunn, 1986.
6. La Jaenisch se quedaba a mitad de línea; ahora llega hasta `13...Be6`, donde la teoría cierra ⩲.

Cada capítulo de estos cinco cursos lleva ahora planes para ambos bandos, transposiciones, trampas y
fuentes con fecha, visibles en la ficha del capítulo (`ChapterView`).

## Bloque 2 completado (2026-11-06)

Cursos: 1.e4 Part 2: Sicilian, The Alapin Sicilian, The Smith-Morra Gambit, Anti-Sicilian For White y
The b3 Sicilian. Informes en [`course-research/`](./course-research/).

| Métrica | Valor |
| --- | --- |
| Posiciones auditadas del bloque | 200 |
| Jugadas con pérdida > 30 cp | 21 |
| Errores graves | **0** |
| Pérdida media por curso | 4,5 – 10,5 cp |
| Peor pérdida | 67 cp |

Hallazgos que cambiaron contenido:

1. **The b3 Sicilian tenía un error grave real**: `4.Bb2??` antes de `d3` pierde el peón de e4
   (`...Nxe4`, −0,96). El capítulo ahora empieza con `d3` y guarda la jugada mala como trampa.
2. **Mengarini contra `...g6` enseñaba una línea perdedora** (`3.b4` antes de desarrollar, +0,9 para el
   negro). Sustituida por el doble fianchetto, igualado.
3. **Mengarini contra `2...d5` enseñaba `Bc4`**, un error de 0,9 que permite `...Nxe4`; ahora la línea
   es `d3`, `Nf3`, `Be2` y enroque.
4. **El Smith-Morra no es objetivo**: la línea principal deja +0,6 al negro (profundidad 22). El curso
   lo dice en lugar de venderlo como ventaja; se añade la trampa siberiana real.
5. **El Alapin no entrega peones**: la idea del capítulo 1 decía «renuncian al peón c», que es falso.

### Cambio de método: auditoría a profundidad 16

La primera pasada (profundidad 12) marcaba como «error grave» jugadas sicilianas que a profundidad 20
están igualadas. `npm run engine:audit` usa ahora **profundidad 16** (tarda ~6 minutos en las 2.390
posiciones). Los informes de los bloques 1 a 3 se recalcularon con esa profundidad; las cifras de los
bloques no son comparables con las de la primera auditoría.

### Bloque 3 (2026-11-06)

Cinco cursos investigados: `b3-french`, `e4-parts3`, `exchange-caro`, `fried-liver` y `ponziani`, con
informe propio en [`course-research/`](./course-research/). Hallazgos principales:

1. **El Papa-Ticulat está refutado** (`...f5`, −1,22): el capítulo pasa a `demo` y el sistema bueno se
   mueve al avance con b3 (0,00). El capítulo que enseñaba `3.b3` directo tenía 155 cp de pérdida; se
   reescribe como lección de por qué b3 necesita el centro cerrado.
2. **Ponziani `7.Nd2` era el peor error del catálogo de aperturas** (248 cp): la jugada correcta contra
   `3...f5` es `7.Bf4` (+1,51). También se corrige `4...Nf6` como "respuesta normal": pierde un peón.
3. **El Fried Liver no gana**: la defensa moderna `8...Ncb4` iguala. El curso ahora lo dice y conserva
   `8...Nce7` como la defensa floja que sí se castiga (+2,5).
4. **Caro-Kann (1.e4 Part 3) y Exchange Caro** no tenían errores: se completan planes, alternativas
   verificadas y fuentes. La Francesa Steinitz y la Pirc clásica quedan con +0,45 y +0,28.
5. Se descartaron dos "trampas" que el motor no respaldaba (`...Qh4` en el Fried Liver y `...Na5` en el
   Exchange Caro): las trampas del catálogo son 9 y las 9 pasan `theory:trapcheck`.

### Bloque 4 (2026-11-06)

Cinco gambitos con negras: `dutch-gotham`, `jaenisch`, `englund`, `traxler` y `albin`, cada uno con
informe en [`course-research/`](./course-research/). Hallazgos principales:

1. **El "mate en ocho" del Englund no existía.** La línea `4.Bf4 Qb4+ 5.Nc3 Qxf4` da +0,10 al blanco, no
   mate. El mate en ocho real es `6.Bc3?? Bb4 ... Qc1#`, y ahora es la trampa del capítulo. El curso
   pasa a confianza D y dice en el resumen que el gambito está refutado (Avrukh: «la peor respuesta a
   1.d4»).
2. **El Traxler enseñaba la peor rama.** `6.Bb3 ...Nd4` da +1,70 al blanco; la jugada de la teoría es
   `6.Bd5!` y contra `6.Bb3` la defensa es `...Qe8`. `5.Nxf7` es la rama que de verdad aprieta (+0,18) y
   la caza del rey de Reinisch–Traxler (1890) es la trampa verificada, con mate de peón.
3. **El Albin no tenía la línea principal**: es `5.g3 Be6 6.Nbd2 Qd7 7.Bg2 O-O-O 8.O-O Bh3` (+1,58
   blanco), mientras que la `5.a3` del curso es la que iguala (0,00) y `4.e4` (Spassky) favorece al negro.
   El gambito de Lasker pasa a ser capítulo propio con la subpromoción obligatoria.
4. **El Gotham Dutch es la variante Ilyin–Zhenevsky** (`...d6` y `...Qe8`), y su capítulo contra `g4`
   estaba invertido: el motor pide `...fxg4` (+1,93 negro), no `...d5`. `...e5` sin caballo detrás
   pierde un peón y queda como trampa del propio repertorio.
5. **El Jaenisch tenía el peor error del bloque**: `4.exf5 e4 5.d3??` (317 cp). Ahora es la trampa del
   capítulo 3, la línea buena es `5.Qe2` (0,00) y se añade `4.d3`, que es hoy la vía más popular.
6. Sin excepción: los cinco cursos dicen en el resumen la evaluación real del motor. Ninguno se vende
   como igualdad cuando no lo es.

### Bloque 6 (2026-11-06)

`london`, `kings-knight`, `larsen`, `english` y `trompowsky`, con informe en
[`course-research/`](./course-research/). Hallazgos principales:

1. **El London enseñaba una línea mala para el blanco.** `5.Qb3 c4 6.Qxb6 axb6 7.Na3` da **+0,91
   negro** (`...e5` contra f4 y la columna a). Corregida por `6.Qc2` (0,00). El capítulo 4 empujaba
   `10.f4` antes de tiempo (0,34 negro); ahora la principal es `10.Qf3` (0,00).
2. **El Trompowsky tenía la jugada perdedora como plan**: `5.Bh4` permite `...g5` y `...Nxe4`
   (**1,37 negro**). Ahora es una alternativa explicada y la principal mantiene `Bxf6`.
3. **Las evaluaciones son pequeñas y se dicen**: London 0,08; Petrov 0,47; Philidor 0,35; Scotch 0,24;
   Larsen 0,00 en la principal y 0,56 con f4; English 0,17 / 0,28 / 0,43; Trompowsky 0,02 / 0,59 / 0,88.
4. **Ninguno de los cinco tiene trampa verificable**: se ha probado la más obvia del London (`...Qxb2`)
   y pierde la dama para el negro; no se inventa trampa y se declara en los informes.
5. **Sin partidas modelo**: no hay base de partidas consultable sin `LICHESS_TOKEN`, así que los cinco
   informes declaran el hueco en lugar de citar partidas de memoria.

### Bloque 5 (2026-11-06)

`danish`, `hillbilly`, `beefeater`, `latvian` y `dutch-sidelines`, con informe en
[`course-research/`](./course-research/). Hallazgos principales:

1. **El Gambito Danés no es una demolición**: +0,55 blanco en la línea principal. El resumen prometía un
   arma «demoledora»; ahora dice la evaluación real. Se documenta que el motor prefiere `5...Nf6`
   (+0,60 negro) a la línea de libro `5...d5`, y se mantiene la de libro.
2. **El Hillbilly pierde por 0,85**: `4.Qh5 g6 5.Qh4` y el negro responde `...Bf5`/`...e6`. El capítulo
   pasa a `demo` y el resumen lo dice; el curso queda con el capítulo jugable (`3...e6`, 0,00).
3. **El Beefeater funciona**: +0,24 negro con `...e5` y `...e4`. Es el único de los cinco con evaluación
   favorable al bando del curso, y se documenta como tal.
4. **La Latvian está refutada** (+1,56 con `3.Nxe5`) pero `3.Bc4` solo da +0,25: es la línea que debe
   conocer quien la juegue. Confianza D, sin venderla.
5. **El Staunton se neutraliza con `...g6`, no con `...e6`**: la auditoría marcaba ese `...e6` (103 cp) y
   el motor confirma 0,00 con `...g6` frente a +0,76 con la línea anterior del curso.
6. **Los ejercicios de trampas ya existen**: `chapterDrills` genera la posición previa al castigo de cada
   trampa. 1.203 ejercicios, 10 de ellos de trampas.

### Trampas verificadas con el motor

`npm run theory:trapcheck` comprueba que la jugada final de cada trampa es la mejor del motor o da
mate. Encontró dos «trampas» que eran continuaciones normales (Vienna, gambito 3.f4, y Dark Vienna
cap. 1): se retiraron. Resultado actual: **7 trampas, 7 correctas**.

## Pendiente

1. Bloques 3–14 del plan de investigación: ver [`NEXT-PHASE-PROMPT.md`](./NEXT-PHASE-PROMPT.md).
2. Las 118 jugadas que CDB también considera dudosas, una a una, con teoría.
3. Frecuencia de maestros y partidas de referencia, en cuanto haya `LICHESS_TOKEN`.
