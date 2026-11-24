import { course } from "./course";

export const BLACK_COURSES = [
  course({
    id: "dutch-gotham",
    name: "The Gotham Dutch",
    category: "black",
    side: "black",
    levels: ["beginner", "intermediate"],
    elo: "600–1900",
    tags: ["1...f5", "Dutch", "Ilyin–Zhenevsky", "sistema"],
    summary:
      "El Holandés sin teoría: fianchetto, ...e6, ...d6 y ...Qe8 para sostener ...e5. Un esquema fácil de recordar; el motor da +0,8 al blanco, así que se juega por iniciativa, no por igualdad.",
    chapters: [
      [
        "El esquema ...e6, ...d6 y ...Qe8",
        "La variante Ilyin–Zhenevsky: ...Be7, ...d6 y ...Qe8 dejan el peón e5 listo para avanzar con el caballo detrás. El blanco consigue +0,8 con b4 y espacio en el ala de dama; el negro compensa con el ataque al rey y la casilla e4.",
        "d4 f5 g3 Nf6 Bg2 e6 Nf3 Be7 O-O O-O c4 d6 Nc3 Qe8",
        {
          alts: [
            [
              "6...c6 en lugar de ...d6",
              "d4 f5 g3 Nf6 Bg2 e6 Nf3 Be7 O-O O-O c4 c6",
              "Transpone al Holandés clásico: el negro jugará ...d5 y ...Bd6. Motor: +0,60 blanco.",
            ],
            [
              "8...Nc6 antes de ...Qe8",
              "d4 f5 g3 Nf6 Bg2 e6 Nf3 Be7 O-O O-O c4 d6 Nc3 Nc6",
              "Desarrollo rápido, pero permite d5 y el salto a e5: +1,39 blanco. ...Qe8 es más flexible.",
            ],
          ],
          keys: [13, 15],
          plans: [
            "b4 y Bb2 con espacio en el ala de dama; cambiar el alfil de g2 solo si abre la columna d, y presionar e5 en cuanto el negro lo juegue.",
            "...Nc6 y ...Ne4 para fijar e4, ...e5 solo cuando un caballo lo sostenga, y ...Qh5/...Rf6 mirando a h2.",
          ],
          trans: [
            "6...c6 y ...d5 es el Holandés clásico (curso The Gotham Dutch, capítulo 1)",
            "...g6 y ...Bg7 es el Holandés de Leningrado (curso The Leningrad Dutch)",
            "...d5 y ...c6 con el alfil en d6 es el Muro de piedra (curso The Stonewall Dutch)",
          ],
          traps: [
            [
              "d4 f5 g3 Nf6 Bg2 e6 Nf3 Be7 O-O O-O c4 d6 Nc3 e5 dxe5 dxe5 Nxe5",
              "El error clásico del esquema: ...e5 sin que el caballo lo sostenga pierde un peón tras dxe5 dxe5 Nxe5. Motor: +2,0 blanco. Primero ...Nc6, después ...e5.",
            ],
          ],
          games: [
            [
              "La Inmortal Polaca: Najdorf defiende el Muro de piedra y sacrifica las tres piezas menores (Varsovia, 1929)",
              "Wikipedia: Dutch Defence",
            ],
          ],
          sources: [
            ["engine", "Stockfish 19, profundidad 18"],
            ["database", "Chess Cloud Database (chessdb.cn)", "https://www.chessdb.cn/"],
            [
              "book",
              "Wikipedia: Dutch Defence, variante Ilyin–Zhenevsky",
              "https://en.wikipedia.org/wiki/Dutch_Defence",
            ],
          ],
          conf: "B",
        },
      ],
      [
        "Contra 6.g4: castigar con ...fxg4",
        "El empuje g4 debilita la diagonal h1-a8 y el punto f4. El negro toma en g4 y desarrolla con ...Nc6: +1,9 para el negro. La línea anterior del curso (...d5) dejaba al blanco con la iniciativa y por eso la auditoría la marcó.",
        "d4 f5 g3 Nf6 Bg2 e6 Nf3 Be7 O-O O-O g4 fxg4 Ne1 Nc6",
        {
          alts: [
            [
              "6...d5 sin capturar",
              "d4 f5 g3 Nf6 Bg2 e6 Nf3 Be7 O-O O-O g4 d5",
              "Jugable pero inferior a ...fxg4: el blanco conserva su ataque sin haber debilitado nada en el ala de rey.",
            ],
          ],
          keys: [12],
          plans: [
            "Be3 y Nbd2 con Ne5 contra c6; el peón de g4 ya no está, así que el rey blanco es el objetivo.",
            "...Nc6, ...Kh8 y ...Rg8 con ...e5; el peón de g4 blanco es un blanco fijo y la columna g se abre a favor del negro.",
          ],
          sources: [
            ["engine", "Stockfish 19, profundidad 18"],
            ["database", "Chess Cloud Database (chessdb.cn)", "https://www.chessdb.cn/"],
            ["book", "Wikipedia: Dutch Defence, los empujes g4", "https://en.wikipedia.org/wiki/Dutch_Defence"],
          ],
          conf: "B",
        },
      ],
      [
        "El gambito Krejcik: 2.g4",
        "Si el blanco empuja g4 en la segunda jugada, el negro no debe asustarse: ...d5 ocupa el centro y, si el blanco toma en g4, el caballo de f6 y el alfil de e7 ya están donde deben. Posición igualada (+0,15 negro) con la columna g rota para el blanco.",
        "d4 f5 g4 d5 Bg2 fxg4 Nc3 Nf6",
        {
          keys: [3],
          plans: [
            "Aguantar g4 y jugar h3 para cambiarlo, con Bf4 y Nbd2 buscando e5.",
            "...Nc6 y ...e5 para abrir el centro mientras el rey blanco no puede enrocar corto con comodidad.",
          ],
          sources: [
            ["engine", "Stockfish 19, profundidad 18"],
            ["database", "Chess Cloud Database (chessdb.cn)", "https://www.chessdb.cn/"],
            ["book", "Wikipedia: Dutch Defence, 2.g4 (Krejcik Gambit)", "https://en.wikipedia.org/wiki/Dutch_Defence"],
          ],
          conf: "C",
        },
      ],
    ],
  }),
  course({
    id: "kid",
    name: "King's Indian Defense",
    category: "black",
    side: "black",
    levels: ["intermediate", "advanced"],
    elo: "1000–2200",
    tags: ["1...Nf6", "fianchetto", "sistema"],
    summary:
      "El sistema más versátil con negras: se puede jugar contra 1.d4, 1.c4 y 1.Nf3. Fianchetto, ...e5 y ataque en el flanco de rey.",
    chapters: [
      [
        "La Clásica: ...e5 y ...Ne7",
        "Las negras ceden espacio en el centro para atacar después con ...f5. El plan es ...Ne7, ...f5 y presión en la columna f.",
        "d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Nf3 O-O Be2 e5 O-O Nc6 d5 Ne7",
      ],
      [
        "Contra el sistema Sämisch",
        "Con f3 y Be3 las blancas preparan 0-0-0. Las negras responden con ...c5 y ...Nc6 buscando abrir el centro antes del ataque.",
        "d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 f3 O-O Be3 c5 Nge2 Nc6",
      ],
      [
        "El ataque ...f5 típico",
        "La estructura ...e5 y ...f5 es la firma del KID: el negro gana el peón e4 y lanza todas las piezas al flanco de rey.",
        "d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Nf3 O-O Be2 e5 O-O Nc6 d5 Ne7 Ne1 Nd7 Be3 f5",
      ],
    ],
  }),
  course({
    id: "owen",
    name: "Owen's Defense (e6 b6)",
    category: "black",
    side: "black",
    levels: ["intermediate"],
    elo: "800–1900",
    tags: ["1...b6", "offbeat", "fianchetto"],
    summary:
      "Un esquema jugable contra cualquier primera jugada: ...b6 y ...Bb7 con ...e6 y ...c5. Las negras suelen ganar un peón central temprano.",
    chapters: [
      [
        "El doble fianchetto flexible",
        "La idea es controlar e4 desde b7. Contra 1.e4, el negro juega ...e6 y ...c5 para minar el centro; contra 1.d4, ...f5 o ...c5.",
        "e4 b6 d4 Bb7 Bd3 e6 Nf3 c5 c3 Nf6",
      ],
      [
        "Contra 1.d4",
        "Con ...b6 y ...e6 el negro espera el momento para cambiar en d4 y abrir la diagonal del alfil de b7 hacia g2.",
        "d4 b6 Nf3 Bb7 c4 e6 Nc3 Bb4 e3 f5",
      ],
    ],
  }),
  course({
    id: "stonewall",
    name: "The Stonewall Dutch",
    category: "black",
    side: "black",
    levels: ["intermediate"],
    elo: "900–2000",
    tags: ["Stonewall", "1...f5", "estructura"],
    summary:
      "Un muro de peones en casillas claras (d5, e6, f5) que cierra el centro y convierte cada partida en un ataque al rey blanco.",
    chapters: [
      [
        "La estructura del muro",
        "Los peones en d5-e6-f5 son invulnerables si el negro completa ...Bd6, ...Nbd7 y ...Qe8. El alfil de d6 apunta a h2.",
        "d4 d5 c4 e6 Nc3 c6 e3 f5 Bd3 Nf6 Nf3 Bd6",
      ],
      [
        "El ataque con ...Qe8 y ...Rf6",
        "La torre sube por la tercera fila: ...Qe8, ...Rf6, ...Rh6. Es el plan más brutal del Stonewall y llega antes de que las blancas reaccionen.",
        "d4 d5 c4 e6 Nc3 c6 e3 f5 Bd3 Nf6 Nf3 Bd6 O-O O-O b3 Qe8",
      ],
    ],
  }),
  course({
    id: "leningrad",
    name: "The Leningrad Dutch",
    category: "black",
    side: "black",
    levels: ["advanced"],
    elo: "1200–2200",
    tags: ["Leningrad", "1...f5", "fianchetto"],
    summary:
      "Holandés dinámico con ...g6 y ...Bg7: el negro ataca en el flanco de rey y disputa el centro con ...e5 en el momento exacto.",
    chapters: [
      [
        "El esquema Leningrado",
        "Con ...g6 y ...Bg7 el negro gana la gran diagonal. ...d6 y ...Qe8 preparan ...e5, la ruptura que despeja el juego.",
        "d4 f5 g3 Nf6 Bg2 g6 Nf3 Bg7 O-O O-O c4 d6 Nc3 Qe8",
      ],
      [
        "Contra 2.e4 (Holandés con centro cerrado)",
        "Si las blancas ocupan el centro, el negro debe jugar ...e5 de inmediato para no quedar ahogado en su propio campo.",
        "d4 f5 e4 fxe4 Nc3 Nf6 Bg5 g6 f3 exf3 Nxf3 Bg7",
      ],
    ],
  }),
  course({
    id: "dutch-sidelines",
    name: "Dutch Defense Sidelines",
    category: "black",
    side: "black",
    levels: ["intermediate"],
    elo: "1000–2000",
    tags: ["Dutch", "Staunton", "gambito"],
    summary:
      "Mini curso para completar el Holandés: el gambito Staunton y el clásico con ...d5. El motor da 0,00 con ...g6 contra el Staunton y +0,6 al blanco en el clásico: el negro iguala, no gana.",
    chapters: [
      [
        "El Gambito Staunton: 2.e4 y ...g6!",
        "Las blancas entregan un peón por el centro y la columna e. La defensa correcta no es ...e6 sino ...g6: quita a f5 su defensa natural y deja el caballo de f6 donde debe. Motor: 0,00, el gambito se neutraliza.",
        "d4 f5 e4 fxe4 Nc3 Nf6 Bg5 g6",
        {
          alts: [
            [
              "5.f3 exf3 6.Nxf3 Be7, la línea que jugaba el curso",
              "d4 f5 e4 fxe4 Nc3 Nf6 Bg5 e6 f3 exf3 Nxf3 Be7",
              "Con ...e6 el negro tapa su propio alfil y permite Bd3 y Ne5: +0,76 blanco. La auditoría marcaba justo ese ...e6 (103 cp); la corrección es ...g6.",
            ],
            [
              "4.Bxf6 exf6, el cambio que alivia al negro",
              "d4 f5 e4 fxe4 Nc3 Nf6 Bg5 g6 Bxf6 exf6",
              "Si el blanco cambia en f6, el negro queda con peones dobles pero conserva la pareja de alfiles y la columna f semiabierta.",
            ],
          ],
          keys: [8],
          plans: [
            "Recuperar el peón con Bc4 y Qe2, jugar f3 para abrir la columna e y atacar el punto e4.",
            "...g6, ...Bg7 y ...d6 con el rey a salvo; ...e5 para devolver el peón cuando convenga y ...Nc6 contra d4.",
          ],
          trans: ["Si el blanco retrasa e4, la partida entra en el clásico: ...d5, ...c6 y ...Be7"],
          sources: [
            ["engine", "Stockfish 19, profundidad 18"],
            ["database", "Chess Cloud Database (chessdb.cn)", "https://www.chessdb.cn/"],
            ["book", "Wikipedia: Dutch Defence, gambito Staunton", "https://en.wikipedia.org/wiki/Dutch_Defence"],
          ],
          conf: "B",
        },
      ],
      [
        "El clásico: ...d5, ...c6 y ...Be7",
        "Si las blancas fianchettan sin empujar e4, el negro pasa al Holandés clásico: ...d5 y ...c6 sujetan e4 y dejan ...Bd6 o ...b6 como planes. Motor: +0,47 blanco antes de ...c6 y +0,62 después.",
        "d4 f5 g3 Nf6 Nf3 e6 Bg2 d5 O-O Be7 c4 c6",
        {
          keys: [12],
          plans: [
            "c4 y Nc3 con presión en d5; cambiar en d5 solo si abre la columna c a favor.",
            "...Ne4 y ...Nd7 contra el fianchetto, ...Bd6 con la idea ...e5, y ...Qe8-...Qh5 si el blanco enroca corto.",
          ],
          trans: [
            "La misma estructura que el curso The Gotham Dutch, capítulo 1",
            "...d5 y ...c6 con el alfil en d6 es el Muro de piedra (curso The Stonewall Dutch)",
          ],
          sources: [
            ["engine", "Stockfish 19, profundidad 18"],
            ["database", "Chess Cloud Database (chessdb.cn)", "https://www.chessdb.cn/"],
            ["book", "Wikipedia: Dutch Defence, Holandés clásico", "https://en.wikipedia.org/wiki/Dutch_Defence"],
          ],
          conf: "B",
        },
      ],
    ],
  }),
  course({
    id: "caro-kann",
    name: "Caro-Kann Defense",
    category: "black",
    side: "black",
    levels: ["beginner", "intermediate", "advanced"],
    elo: "500–2200",
    tags: ["1...c6", "sólida", "Caro-Kann"],
    summary:
      "La defensa que hizo famoso a Levy: estructura sana, alfil activo fuera de la cadena y finales cómodos para toda la escalera de niveles.",
    chapters: [
      [
        "La Clásica: 3.Nc3 dxe4 4.Nxe4 Bf5",
        "El alfil sale a f5 antes de ...e6, la razón de ser de la Caro. Después de ...Bg6 y ...h6 las negras tienen una estructura ideal.",
        "e4 c6 d4 d5 Nc3 dxe4 Nxe4 Bf5 Ng3 Bg6 h4 h6 Nf3 Nd7 h5 Bh7 Bd3 Bxd3 Qxd3 e6",
      ],
      [
        "La Avance: 3.e5",
        "Las blancas cierran el centro. Las negras atacan la cadena con ...c5 y colocan el alfil en f5 antes de ...e6.",
        "e4 c6 d4 d5 e5 Bf5 Nf3 e6 Be2 c5 Be3 cxd4 Nxd4 Nc6",
      ],
      [
        "La Variante del Cambio: 3.exd5",
        "Menos ambiciosa pero muy sólida. El negro desarrolla con ...Nc6 y ...Bf5, apuntando a la casilla c2 y al caballo de f3.",
        "e4 c6 d4 d5 exd5 cxd5 Bd3 Nc6 c3 Nf6 Bf4 Bg4 Qb3 Qd7",
      ],
      [
        "La Panov: 3.cxd5",
        "Con peones aislados en ambos bandos, el negro busca actividad con ...Nc6, ...Bg4 y presión sobre d5. La partida se vuelve táctica.",
        "e4 c6 d4 d5 exd5 cxd5 c4 Nf6 Nc3 e6 Nf3 Be7 Bf4",
      ],
    ],
  }),
  course({
    id: "caro-bonus",
    name: "Caro-Kann Bonus Lines",
    category: "black",
    side: "black",
    levels: ["intermediate"],
    elo: "800–2000",
    tags: ["bonus", "Caro-Kann", "repertorio"],
    summary:
      "Variantes adicionales para completar el repertorio de la Caro: respuestas contra 2.Nf3, 2.c4 y las ideas raras del segundo movimiento.",
    chapters: [
      [
        "Contra 2.Nf3 (anti-Caro)",
        "Si las blancas evitan Nc3, el negro juega ...d5 de todos modos. El plan es ...Bg4 para cambiar el caballo de f3.",
        "e4 c6 Nf3 d5 exd5 cxd5 d4 Nc6 c4 Nf6 Nc3 Bg4",
      ],
      [
        "Contra 2.c4 y los sistemas con c4",
        "El negro responde ...Nf6 y ...e6 buscando ...d5 en buenas condiciones. El peón c4 blanco puede quedar débil.",
        "e4 c6 c4 d5 exd5 cxd5 cxd5 Nf6 Nc3 Nxd5 Nf3 Nc6",
      ],
    ],
  }),
  course({
    id: "grunfeld",
    name: "The Grunfeld Defense",
    category: "black",
    side: "black",
    levels: ["advanced"],
    elo: "1200–2200",
    tags: ["1...Nf6", "Grünfeld", "hipermoderna"],
    summary:
      "Una de las defensas más respetadas contra 1.d4, 1.c4 y 1.Nf3: ceder el centro para atacarlo después con ...c5 y la gran diagonal.",
    chapters: [
      [
        "La Clásica del Cambio: 5.e4",
        "El negro permite un centro enorme a cambio de destruirlo con ...c5 y ...Bg7. El alfil de g7 es la pieza clave del plan.",
        "d4 Nf6 c4 g6 Nc3 d5 cxd5 Nxd5 e4 Nxc3 bxc3 Bg7 Nf3 c5",
      ],
      [
        "Contra 4.Bg2 y las líneas cerradas",
        "Si las blancas evitan e4, el negro juega ...Bg7 y ...0-0 y busca ...e5 o ...c5 según la estructura blanca.",
        "d4 Nf6 c4 g6 Nc3 d5 cxd5 Nxd5 g3 Bg7 Bg2 Nxc3 bxc3 O-O",
      ],
    ],
  }),
  course({
    id: "scandi",
    name: "Scandinavian Defense",
    category: "black",
    side: "black",
    levels: ["beginner", "intermediate"],
    elo: "500–2000",
    tags: ["1...d5", "Qa5", "sólida"],
    summary:
      "Contrajuego inmediato desde la primera jugada. La dama en a5, ...Nf6 y ...Bf5 dan una posición cómoda con planes muy claros.",
    chapters: [
      [
        "La Clásica: 3.Nc3 Qa5",
        "La dama en a5 mantiene la presión sobre e4 y evita el desarrollo blanco. ...Bf5 y ...e6 completan el esquema.",
        "e4 d5 exd5 Qxd5 Nc3 Qa5 d4 Nf6 Nf3 Bf5 Bc4 e6 Bd2",
      ],
      [
        "Contra 4.Bd2 y las líneas con 0-0-0",
        "Si las blancas apartan la dama con Bd2 y juegan 0-0-0, el negro cambia en d2 y ataca el rey con ...Bg4 y ...c6.",
        "e4 d5 exd5 Qxd5 Nc3 Qa5 d4 Nf6 Nf3 Bf5 Bd2 e6 Qe2 Bb4",
      ],
      [
        "Contra 2...Nf6 (línea moderna)",
        "Con el caballo en f6 el negro ataca d5. Las blancas sostienen el centro con d4 y Nf3, y el negro cambia en d5 para evitar más ventaja.",
        "e4 d5 exd5 Nf6 d4 Nxd5 Nf3 Bg4 Be2 e6 O-O Be7",
      ],
    ],
  }),
  course({
    id: "gotham-gambit",
    name: "The Gotham Gambit",
    category: "black",
    side: "black",
    levels: ["intermediate"],
    elo: "900–2000",
    tags: ["Petroff", "gambito", "1...e5"],
    summary:
      "Un Petroff con veneno: las negras no igualan, atacan. Sacrificio de peón por desarrollo y presión sobre el caballo de f3.",
    chapters: [
      [
        "La idea del gambito",
        "Después de ...Nxe4, el negro entrega la estructura por actividad. ...Be7 y ...0-0 llegan rápido y el peón e5 blanco queda débil.",
        "e4 e5 Nf3 Nf6 Nxe5 d6 Nf3 Nxe4 Nc3 Nxc3 dxc3 Be7 Be3 O-O",
      ],
      [
        "Contra 5.d4 (línea crítica)",
        "Si las blancas ocupan el centro, el negro responde ...d5 y ...Be7, buscando cambiar alfiles y llegar a un final igualado con mejores peones.",
        "e4 e5 Nf3 Nf6 Nxe5 d6 Nf3 Nxe4 d4 d5 Bd3 Be7 O-O Nc6 c4 Nb4",
      ],
    ],
  }),
  course({
    id: "jaenisch",
    name: "The Jaenisch Gambit",
    category: "black",
    side: "black",
    levels: ["intermediate", "advanced"],
    elo: "1000–2100",
    tags: ["Ruy Lopez", "1...f5", "gambito", "Schliemann"],
    summary:
      "Contra la Española: ...f5 golpea el centro de inmediato. El motor da +0,6 al blanco en las líneas principales: es un arma práctica de doble filo, no una igualdad garantizada.",
    chapters: [
      [
        "El golpe ...f5 y la línea crítica 4.Nc3",
        "El negro entrega el peón de e5 a cambio de ...d5 y de la dama en g5. Tras 7...Qg5 el blanco elige entre 8.Qe2 y 8.Nxa7+; el motor da +0,6 al blanco en juego muy concreto, pero el negro tiene todas las piezas activas.",
        "e4 e5 Nf3 Nc6 Bb5 f5 Nc3 fxe4 Nxe4 d5 Nxe5 dxe4 Nxc6 Qg5 Qe2 Nf6",
        {
          alts: [
            [
              "9.f4 Qxf4 10.Ne5+, la línea de Timman–Speelman",
              "e4 e5 Nf3 Nc6 Bb5 f5 Nc3 fxe4 Nxe4 d5 Nxe5 dxe4 Nxc6 Qg5 Qe2 Nf6 f4 Qxf4 Ne5+ c6 d4 Qh4+ g3 Qh3",
              "La línea principal de la teoría, jugada en Timman–Speelman (Candidatos, Londres 1989). Motor: 0,00, el ataque compensa el material.",
            ],
            [
              "5...Nf6 (variante Tartakower)",
              "e4 e5 Nf3 Nc6 Bb5 f5 Nc3 fxe4 Nxe4 Nf6",
              "La alternativa que más se juega hoy: el negro sacrifica un peón tras 6.Nxf6 Qxf6 7.Qe2 Be7 8.Bxc6. Motor: +0,59 blanco.",
            ],
          ],
          keys: [7, 13],
          plans: [
            "Devolver material a tiempo con Nxa7+ y Bxd7+, cambiar damas y llegar a un final con peón de más.",
            "Dama a g5 y ...Nf6 contra f2 y e4; ...Bd7 para cambiar el alfil de b5 y ...0-0-0 con ...Rdf8.",
          ],
          trans: [
            "3...a6 4.Ba4 f5 es el Jaenisch diferido: peor para el negro porque 5.d4! funciona",
            "4...Nf6 5.0-0 fxe4 6.dxe4 transpone al capítulo 2",
          ],
          games: [
            [
              "Timman–Speelman, semifinal de Candidatos, Londres 1989 (8.Qe2 Nf6 9.f4 Qxf4)",
              "Wikipedia: Jaenisch Gambit",
            ],
          ],
          sources: [
            ["engine", "Stockfish 19, profundidad 18"],
            ["database", "Chess Cloud Database (chessdb.cn)", "https://www.chessdb.cn/"],
            ["book", "Wikipedia: Jaenisch Gambit (C63)", "https://en.wikipedia.org/wiki/Jaenisch_Gambit"],
          ],
          conf: "B",
        },
      ],
      [
        "4.d3: la vía posicional",
        "4.d3 defiende e4 sin regalar nada y ha superado en popularidad a 4.Nc3. Tras 4...fxe4 5.dxe4 Nf6 6.0-0 el negro elige entre ...Bc5 (activo) y ...d6 (sólido). Motor: +0,62 blanco.",
        "e4 e5 Nf3 Nc6 Bb5 f5 d3 fxe4 dxe4 Nf6 O-O Bc5",
        {
          alts: [
            [
              "7.Bxc6 bxc6 8.Nxe5, la línea crítica",
              "e4 e5 Nf3 Nc6 Bb5 f5 d3 fxe4 dxe4 Nf6 O-O Bc5 Bxc6 bxc6 Nxe5 O-O Nc3 d6",
              "El blanco gana un peón; el negro recibe la pareja de alfiles y actividad. Motor: +0,60 blanco, la mejor práctica del negro.",
            ],
            [
              "6...d6 en lugar de ...Bc5",
              "e4 e5 Nf3 Nc6 Bb5 f5 d3 fxe4 dxe4 Nf6 O-O d6",
              "La opción sólida: quita a e5 la casilla de caballo y deja ...Be7, ...0-0 y ...Bg4 para el desarrollo.",
            ],
          ],
          keys: [7, 11],
          plans: [
            "O-O, Bc4 o Bg5 con presión en la columna e; cambiar en c6 solo cuando abra la columna b para el negro a cambio de la pareja de alfiles.",
            "...Bc5 y ...0-0 con ...d6 para sostener e5, ...Bg4 contra el caballo de f3 y ...Ne7-...g6 si el blanco cambia alfiles.",
          ],
          sources: [
            ["engine", "Stockfish 19, profundidad 18"],
            ["database", "Chess Cloud Database (chessdb.cn)", "https://www.chessdb.cn/"],
            ["book", "Wikipedia: Jaenisch Gambit, 4.d3", "https://en.wikipedia.org/wiki/Jaenisch_Gambit"],
          ],
          conf: "B",
        },
      ],
      [
        "4.exf5: aceptar el gambito",
        "Tomar en f5 no da ventaja: ...e4 gana tempo y el negro llega a ...Nh6 con la iniciativa. El motor da 0,00 tras 7...Nh6, así que el blanco solo iguala. La línea anterior del curso (5.d3) perdía 317 cp y está documentada como error.",
        "e4 e5 Nf3 Nc6 Bb5 f5 exf5 e4 Qe2 Qe7 Bxc6 dxc6 Nd4 Nh6",
        {
          alts: [
            [
              "5.Ng1!? en lugar de 5.Qe2",
              "e4 e5 Nf3 Nc6 Bb5 f5 exf5 e4 Ng1 Nf6 d3",
              "Retirada fea pero sólida: el blanco conserva el peón y defiende e4. Motor: +0,19 blanco, casi igualdad.",
            ],
          ],
          keys: [5, 8],
          plans: [
            "Conservar el peón de f5, cambiar en c6 para doblar peones y jugar Qh5+ si el negro retrasa ...g6.",
            "...Qe7 y ...Nh6 con presión sobre f5 y g4; ...Bg7 y ...0-0-0 después, con la dama blanca expuesta en e2.",
          ],
          traps: [
            [
              "e4 e5 Nf3 Nc6 Bb5 f5 exf5 e4 d3 exf3 Qxf3 Nf6",
              "El error que tenía el curso: 5.d3?? devuelve el peón sin compensación (317 cp de pérdida). Con ...exf3 y ...Nf6 el negro desarrolla y ataca e4; la jugada correcta es 5.Qe2 o 5.Ng1.",
            ],
          ],
          sources: [
            ["engine", "Stockfish 19, profundidad 18"],
            ["database", "Chess Cloud Database (chessdb.cn)", "https://www.chessdb.cn/"],
            ["book", "Wikipedia: Jaenisch Gambit, 4.exf5", "https://en.wikipedia.org/wiki/Jaenisch_Gambit"],
          ],
          conf: "C",
        },
      ],
    ],
  }),
  course({
    id: "budapest",
    name: "The Budapest Gambit",
    category: "black",
    side: "black",
    levels: ["intermediate"],
    elo: "700–1900",
    tags: ["1...Nf6", "gambito", "trampas"],
    summary:
      "Un contragolpe contra el Gambito de Dama que contiene una celada capaz de ganar en menos de diez jugadas a quien no la conoce.",
    chapters: [
      [
        "3...Ng4 y la recuperación del peón",
        "Las negras presionan e5 y f2. ...Bb4+ y ...Qe7 amortiguan la falta de material y dejan a las blancas con un peón débil.",
        "d4 Nf6 c4 e5 dxe5 Ng4 Bf4 Nc6 Nf3 Bb4+ Nbd2 Qe7",
      ],
      [
        "La celada de las blancas",
        "Si las blancas juegan Nc3 descuidadamente, ...Bb4 y ...Qe7 ganan material. Conocer el orden de jugadas evita el desastre.",
        "d4 Nf6 c4 e5 dxe5 Ng4 Nf3 Bc5 e3 Nc6",
      ],
    ],
  }),
  course({
    id: "englund",
    name: "The Englund Gambit",
    category: "black",
    side: "black",
    levels: ["beginner"],
    elo: "400–1500",
    tags: ["1...e5", "gambito", "trampas", "refutado"],
    summary:
      "El gambito contra 1.d4 con más trampas para principiantes: mate en ocho si las blancas se descuidan. Objetivamente es malo —Avrukh lo llama la peor respuesta a 1.d4— y el curso lo dice con la refutación delante.",
    chapters: [
      [
        "La línea principal y su refutación 6.Nc3!",
        "El negro recupera el peón de e5 con la dama y gana tiempo, pero 6.Nc3! desarrolla mientras la dama pasea. Motor: +2,3 blanco. Se estudia para saber cuánto aguanta el gambito y cuándo hay que abandonarlo.",
        "d4 e5 dxe5 Nc6 Nf3 Qe7 Bf4 Qb4+ Bd2 Qxb2 Nc3 Bb4 Rb1 Qa3",
        {
          alts: [
            [
              "8.Nd5!, la refutación de Bücker y Avrukh",
              "d4 e5 dxe5 Nc6 Nf3 Qe7 Bf4 Qb4+ Bd2 Qxb2 Nc3 Bb4 Rb1 Qa3 Nd5 Bxd2+ Qxd2",
              "La jugada que la teoría considera decisiva: el caballo entra en d5 y el negro no tiene defensa cómoda. Avrukh llega a ventaja decisiva.",
            ],
          ],
          keys: [11, 13],
          plans: [
            "Desarrollar con tempo contra la dama, cambiar el alfil de b4 y jugar e4 para acabar el desarrollo con ventaja.",
            "Cambiar damas o alfiles para reducir el ataque, enrocar largo y devolver el peón a cambio de desarrollo; si no hay compensación, abandonar el esquema.",
          ],
          traps: [
            [
              "d4 e5 dxe5 Nc6 Nf3 Qe7 Bf4 Qb4+ Bd2 Qxb2 Bc3 Bb4 Qd2 Bxc3 Qxc3 Qc1#",
              "La celada clásica del Englund: 6.Bc3?? Bb4 gana (7.Bxb4 Nxb4 o 7.Qd2 Bxc3 8.Qxc3 Qc1#). Es el auténtico mate en ocho del gambito.",
            ],
          ],
          trans: [
            "2...Nc6 3.Nf3 f6 es el gambito Soller",
            "2...d6 es el gambito Blackburne–Hartlaub (capítulo 3)",
            "Emparentado con el Budapest y el Albin, pero peor: el blanco no ha debilitado b4 con c4",
          ],
          games: [
            [
              "Korchnoi, simultánea de 1978: miniatura con 4.Nc3 Nxe5 5.Nd5 y 8.Bg5",
              "Wikipedia: Englund Gambit",
            ],
          ],
          sources: [
            ["engine", "Stockfish 19, profundidad 18"],
            ["database", "Chess Cloud Database (chessdb.cn)", "https://www.chessdb.cn/"],
            ["book", "Wikipedia: Englund Gambit (A40)", "https://en.wikipedia.org/wiki/Englund_Gambit"],
          ],
          conf: "D",
        },
      ],
      [
        "4.Qd5!? la variante de Estocolmo",
        "El blanco conserva el peón con la dama en d5. El negro debe golpear de inmediato con ...f6; tras 5.exf6 Nxf6 6.Qb3 d5 tiene desarrollo y la dama blanca está expuesta. Motor: +0,74 blanco, su mejor intento.",
        "d4 e5 dxe5 Nc6 Nf3 Qe7 Qd5 f6 exf6 Nxf6 Qb3 d5",
        {
          keys: [8],
          plans: [
            "Mantener el peón, cambiar damas si conviene y jugar c4 para sujetar d5.",
            "...f6 para eliminar e5, ...d5 con ...Bd7 y ...0-0-0; la dama de b3 no tiene objetivos.",
          ],
          sources: [
            ["engine", "Stockfish 19, profundidad 18"],
            ["database", "Chess Cloud Database (chessdb.cn)", "https://www.chessdb.cn/"],
            ["book", "Wikipedia: Englund Gambit, variante de Estocolmo", "https://en.wikipedia.org/wiki/Englund_Gambit"],
          ],
          conf: "C",
        },
      ],
      [
        "2...d6: el gambito Blackburne–Hartlaub",
        "La versión sana del Englund: en lugar de recuperar el peón, el negro lo cambia por desarrollo con ...Bxd6. Es la idea de Charlick y la que mejor puntúa. Motor: +0,71 blanco.",
        "d4 e5 dxe5 d6 exd6 Bxd6 Nf3 Nf6 Bg5",
        {
          alts: [
            [
              "3.Nf3 Bg4 4.Bg5!, la refutación de esta variante",
              "d4 e5 dxe5 d6 Nf3 Bg4 Bg5 Qd7 exd6 Bxd6 Nbd2",
              "Si el blanco retrasa la captura, el alfil de g5 resulta incómodo: ventaja grande según la teoría. El negro necesita ...Be7 y ...Nbd7 antes de ...h6.",
            ],
          ],
          keys: [5],
          plans: [
            "Devolver el peón en el momento justo, cambiar alfiles y jugar c4 con ventaja de espacio.",
            "...Bg4 y ...Nf6 con presión sobre d4 y e4; enrocar corto y buscar ...Ne5.",
          ],
          sources: [
            ["engine", "Stockfish 19, profundidad 18"],
            ["database", "Chess Cloud Database (chessdb.cn)", "https://www.chessdb.cn/"],
            ["book", "Wikipedia: Englund Gambit, Blackburne–Hartlaub", "https://en.wikipedia.org/wiki/Englund_Gambit"],
          ],
          conf: "D",
        },
      ],
    ],
  }),
  course({
    id: "traxler",
    name: "Traxler Counterattack",
    category: "black",
    side: "black",
    levels: ["intermediate", "advanced"],
    elo: "900–2000",
    tags: ["Fried Liver", "contraataque", "trampas", "C57"],
    summary:
      "La respuesta más agresiva contra el Fried Liver: ...Bc5 ignora la amenaza y lanza todas las piezas al rey blanco sin enrocar. El blanco conserva +0,9 con 6.Bd5!, pero el negro tiene todo el juego práctico.",
    chapters: [
      [
        "5.Bxf7+ y 6.Bd5!, la mejor del blanco",
        "El blanco gana un peón y evita el sacrificio en f2. 6.Bd5! es la jugada que la teoría marca con exclamación: protege e4 y prepara Bxc6. El negro replica ...Rf8 contra f2. Motor: +0,87 blanco, con iniciativa negra.",
        "e4 e5 Nf3 Nc6 Bc4 Nf6 Ng5 Bc5 Bxf7+ Ke7 Bd5 Rf8 O-O d6 Nf3",
        {
          alts: [
            [
              "9...Nd4 en lugar de la retirada del caballo",
              "e4 e5 Nf3 Nc6 Bc4 Nf6 Ng5 Bc5 Bxf7+ Ke7 Bd5 Rf8 O-O d6 Nf3 Nd4",
              "La idea principal del Traxler: cambiar en d4 el caballo que defiende c2 y e5, y dejar al blanco sin su mejor pieza.",
            ],
          ],
          keys: [10],
          plans: [
            "Cambiar en c6 para doblar peones, jugar d3 y Nbd2, y aprovechar la columna f abierta para el rey negro.",
            "...Rf8 contra f2, ...d6 y ...Bg4 con ...Nd4; el rey de e7 está seguro si el centro se cierra.",
          ],
          trans: [
            "5.Nxf7 Bxf2+ es la otra rama del Traxler (capítulo 3)",
            "Si el negro no juega ...Bc5, la partida vuelve al Fried Liver normal (curso The Fried Liver Attack)",
          ],
          sources: [
            ["engine", "Stockfish 19, profundidad 18"],
            ["database", "Chess Cloud Database (chessdb.cn)", "https://www.chessdb.cn/"],
            ["book", "Wikipedia: Traxler Counterattack (C57)", "https://en.wikipedia.org/wiki/Traxler_Counterattack"],
          ],
          conf: "B",
        },
      ],
      [
        "6.Bb3 y la defensa ...Qe8",
        "Si el blanco retira el alfil a b3, el negro no necesita ...Nd4 de inmediato: ...Qe8 defiende el flanco y prepara ...Qg6 contra g2. Motor: +0,94 blanco, la posición práctica más cómoda para el negro.",
        "e4 e5 Nf3 Nc6 Bc4 Nf6 Ng5 Bc5 Bxf7+ Ke7 Bb3 Qe8 d3 d6 Be3 Bg4",
        {
          keys: [8, 12],
          plans: [
            "d3 y Be3 para expulsar el caballo, Nf3 y Nbd2, y enrocar largo.",
            "...Qg6 y ...Rf8 con presión sobre g2; ...Nd4 cuando el caballo de f3 se mueva.",
          ],
          sources: [
            ["engine", "Stockfish 19, profundidad 18"],
            ["database", "Chess Cloud Database (chessdb.cn)", "https://www.chessdb.cn/"],
            ["book", "Wikipedia: Traxler Counterattack, 6.Bb3", "https://en.wikipedia.org/wiki/Traxler_Counterattack"],
          ],
          conf: "B",
        },
      ],
      [
        "5.Nxf7: el contraataque real",
        "Si el blanco toma el caballo en f7, el negro entrega el alfil en f2 y saca al rey a pasear. El motor da +0,18 al blanco: material arriba, rey en el centro. Toda la práctica está del lado negro.",
        "e4 e5 Nf3 Nc6 Bc4 Nf6 Ng5 Bc5 Nxf7 Bxf2+ Kf1 Qe7 Nxh8 d5",
        {
          alts: [
            [
              "6.Ke2?? Nd4+, el error que pierde",
              "e4 e5 Nf3 Nc6 Bc4 Nf6 Ng5 Bc5 Nxf7 Bxf2+ Ke2 Nd4+ Kd3 b5",
              "La defensa mala: el rey blanco acaba cazado por todo el ejército negro. Es la línea de la partida Reinisch–Traxler (1890).",
            ],
          ],
          keys: [10, 12],
          plans: [
            "Devolver material para enrocar, cerrar el centro con d4 y sobrevivir al ataque.",
            "...d5 para abrir la diagonal a2-g8, ...Qe7 con ...Qh4 y ...Bf5/...Nd4; el rey blanco en f1 es el objetivo.",
          ],
          traps: [
            [
              "e4 e5 Nf3 Nc6 Bc4 Nf6 Ng5 Bc5 Nxf7 Bxf2+ Ke2 Nd4+ Kd3 b5 Bb3 Nxe4 Nxd8 Nc5+ Kc3 Ne2+ Qxe2 Bd4+ Kb4 a5+ Kxb5 Ba6+ Kxa5 Bd3+ Kb4 Na6+ Ka4 Nb4+ Kxb4 c5#",
              "La caza del rey de la partida Reinisch–Traxler (Hostouň, 1890): el negro sacrifica dama y dos caballos y da mate con peón, torre y alfiles. 6.Ke2?? es el error; 6.Kf1 es la única defensa.",
            ],
          ],
          games: [
            [
              "J. Reinisch–Karel Traxler, Hostouň 1890: la partida que da nombre a la variante, con mate final tras sacrificar la dama",
              "Wikipedia: Traxler Counterattack",
            ],
          ],
          sources: [
            ["engine", "Stockfish 19, profundidad 18"],
            ["database", "Chess Cloud Database (chessdb.cn)", "https://www.chessdb.cn/"],
            ["book", "Wikipedia: Traxler Counterattack, 5.Nxf7", "https://en.wikipedia.org/wiki/Traxler_Counterattack"],
          ],
          conf: "B",
        },
      ],
    ],
  }),
  course({
    id: "alekhine",
    name: "Alekhine's Defense",
    category: "black",
    side: "black",
    levels: ["intermediate"],
    elo: "900–2000",
    tags: ["1...Nf6", "caballo agresivo", "offbeat"],
    summary:
      "Provocación desde la primera jugada: el caballo invita a las blancas a perseguirlo mientras el negro ataca la cadena de peones.",
    chapters: [
      [
        "La Caza: 4...dxe5",
        "El negro deja que las blancas construyan un centro grande para atacarlo después con ...c6, ...Nd7 y ...e5.",
        "e4 Nf6 e5 Nd5 d4 d6 Nf3 dxe5 Nxe5 c6 Be2 Bf5",
      ],
      [
        "La Cuatro Peones",
        "La línea más ambiciosa de las blancas. El negro debe jugar con calma: ...Bg4, ...Nc6 y presión constante sobre d4 y e5.",
        "e4 Nf6 e5 Nd5 d4 d6 c4 Nb6 f4 dxe5 fxe5 Nc6",
      ],
    ],
  }),
  course({
    id: "albin",
    name: "The Albin Countergambit",
    category: "black",
    side: "black",
    levels: ["intermediate"],
    elo: "800–1900",
    tags: ["1...d5", "gambito", "QGD", "D08"],
    summary:
      "...e5 contra el Gambito de Dama: el peón d4 se convierte en una cuña que limita a las blancas. El motor da +1,6 al blanco en la línea principal y 0,00 en 5.a3: el gambito se juega por las trampas, no por la igualdad.",
    chapters: [
      [
        "La cuña en d4 y la línea principal 5.g3",
        "El peón de d4 divide el campo blanco y da al negro la casilla c5 y la columna d. La teoría considera 5.g3 el intento más sólido del blanco: Bg2, Nbd2 y O-O, con ...Be6, ...Qd7, ...0-0-0 y ...Bh3. Motor: +1,58 blanco.",
        "d4 d5 c4 e5 dxe5 d4 Nf3 Nc6 g3 Be6 Nbd2 Qd7 Bg2 O-O-O O-O Bh3",
        {
          alts: [
            [
              "5.Nbd2 f6 (defensa Janowski)",
              "d4 d5 c4 e5 dxe5 d4 Nf3 Nc6 Nbd2 f6",
              "El negro ataca e5 de inmediato, pero abre la columna e y pierde un tiempo: +1,10 blanco tras 6.exf6.",
            ],
            [
              "4.e4 (variante Spassky)",
              "d4 d5 c4 e5 dxe5 d4 e4 dxe3 Bxe3",
              "El blanco intenta jugar e4 con ganancia de tiempo, pero ...Qxd1+ y ...Nc6 igualan: +0,23 negro. Buena noticia para el repertorio.",
            ],
          ],
          keys: [7, 15],
          plans: [
            "Bg2 y Nbd2 contra d4, O-O y e4 o b4 para abrir líneas; cambiar el alfil de g2 por el de e6 si se puede.",
            "...Be6 y ...Qd7 con ...0-0-0, ...Bh3 para cambiar el alfil de g2 y ...h5-...h4 contra el enroque corto.",
          ],
          trans: [
            "4...c5 en lugar de ...Nc6 evita el jaque en b4 pero permite 5.e3 sin problemas",
            "Emparentado con el Englund (1.d4 e5), que es la versión sin ...d5 y objetivamente peor",
          ],
          games: [
            [
              "Adolf Albin–Emanuel Lasker, Nueva York 1893: la partida que dio nombre al gambito, ganada por el negro",
              "Wikipedia: Albin Countergambit",
            ],
            [
              "Cavallotti–Salvioli, Milán 1881: primera aparición documentada de 2...e5",
              "Wikipedia: Albin Countergambit",
            ],
          ],
          sources: [
            ["engine", "Stockfish 19, profundidad 18"],
            ["database", "Chess Cloud Database (chessdb.cn)", "https://www.chessdb.cn/"],
            ["book", "Wikipedia: Albin Countergambit (D08–D09)", "https://en.wikipedia.org/wiki/Albin_Countergambit"],
          ],
          conf: "B",
        },
      ],
      [
        "5.a3: la partida tranquila",
        "Con 5.a3 el blanco quita a b4 su casilla natural y la posición se iguala: el motor da 0,00. Es la línea que más conviene al negro, porque el peón de d4 sobrevive y las piezas blancas no encuentran plan.",
        "d4 d5 c4 e5 dxe5 d4 Nf3 Nc6 a3 Bg4 Nbd2 Qe7 e3 O-O-O",
        {
          keys: [11],
          plans: [
            "Jugar contra d4 con Nbd2 y b4, cambiar en d4 en el momento justo y aprovechar el peón de e5 como compensación.",
            "...Bg4 para clavar, ...Qe7 y ...0-0-0; ...f6 contra e5 y ...Nge7-...g6 si el blanco no hace nada.",
          ],
          sources: [
            ["engine", "Stockfish 19, profundidad 18"],
            ["database", "Chess Cloud Database (chessdb.cn)", "https://www.chessdb.cn/"],
            ["book", "Wikipedia: Albin Countergambit, 5.a3", "https://en.wikipedia.org/wiki/Albin_Countergambit"],
          ],
          conf: "B",
        },
      ],
      [
        "El gambito de Lasker: 4.e3??",
        "La joya del Albin: si el blanco ataca d4 con e3, el negro entrega el alfil con ...dxe3 y corona en g1 con jaque. Motor: mate forzado. La subpromoción a caballo es la clave.",
        "d4 d5 c4 e5 dxe5 d4 e3 Bb4+ Bd2 dxe3 Bxb4 exf2+ Ke2 fxg1=N+ Rxg1 Bg4+ Kf2 Bxd1",
        {
          keys: [8, 16],
          plans: [
            "Nunca jugar e3 sin calcular ...dxe3; con 5.Nbd2 o 5.g3 el gambito no funciona.",
            "...Bb4+ siempre que el blanco juegue e3; después ...dxe3, y si toma el alfil, ...exf2+ y ...fxg1=N+.",
          ],
          traps: [
            [
              "d4 d5 c4 e5 dxe5 d4 e3 Bb4+ Bd2 dxe3 Bxb4 exf2+ Ke2 fxg1=N+ Rxg1 Bg4+ Kf2 Bxd1",
              "El gambito de Lasker: la única subpromoción obligatoria del repertorio. Si el blanco corona a dama, 8.Qxd8+ cambia damas; el caballo da jaque y ...Bg4+ gana la dama.",
            ],
          ],
          games: [
            [
              "Emanuel Lasker popularizó la línea tras jugarla en Nueva York 1893",
              "Wikipedia: Albin Countergambit",
            ],
          ],
          sources: [
            ["engine", "Stockfish 19, profundidad 18"],
            ["database", "Chess Cloud Database (chessdb.cn)", "https://www.chessdb.cn/"],
            ["book", "Wikipedia: Albin Countergambit, Lasker Trap", "https://en.wikipedia.org/wiki/Albin_Countergambit"],
          ],
          conf: "A",
        },
      ],
    ],
  }),
  course({
    id: "four-knights-sicilian",
    name: "Four Knights Sicilian",
    category: "black",
    side: "black",
    levels: ["intermediate"],
    elo: "900–2000",
    tags: ["Siciliana", "Sveshnikov", "estructura"],
    summary:
      "Una Siciliana directa: ...e5 iguala el centro y lleva a estructuras tipo Sveshnikov con el caballo en d5 como pieza estrella.",
    chapters: [
      [
        "5...e5 y el caballo de d5",
        "El negro golpea d4 y obtiene la casilla d5. ...a6 y ...b5 crean espacio en el flanco de dama.",
        "e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 Nf6 Nc3 e5 Ndb5 d6 Bg5 a6",
      ],
      [
        "Contra 6.Nxc6",
        "Si las blancas cambian, el negro recaptura con el peón b y obtiene la columna b y presión sobre el centro blanco.",
        "e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 Nf6 Nc3 e5 Nxc6 bxc6",
      ],
    ],
  }),
  course({
    id: "anti-sicilian-black",
    name: "Anti-Sicilians For Black",
    category: "black",
    side: "black",
    levels: ["intermediate"],
    elo: "900–2000",
    tags: ["Siciliana", "Alapin", "Rossolimo"],
    summary:
      "Ningún repertorio de Siciliana está completo sin esto: qué hacer cuando las blancas evitan las líneas principales con Alapin, Morra o Rossolimo.",
    chapters: [
      [
        "Contra el Alapin",
        "El negro ocupa el centro con ...d5 y cambia damas si es posible. ...Nf6 y ...Bf5 completan un desarrollo sin problemas.",
        "e4 c5 c3 d5 exd5 Qxd5 d4 Nc6 Nf3 Bg4 Be2 e6",
      ],
      [
        "Contra el Smith-Morra",
        "La mejor receta es no aceptar el tercer peón sin necesidad. ...Nf6, ...d6 y desarrollo rápido contra la columna c blanca.",
        "e4 c5 d4 cxd4 c3 Nf6 e5 Nd5 Nf3 Nc6 cxd4 d6",
      ],
      [
        "Contra el Rossolimo",
        "Con ...g6 las negras fianchettan y tratan el alfil de b5 como una pieza pasajera. ...Bg7 y ...Nf6 son la prioridad.",
        "e4 c5 Nf3 Nc6 Bb5 g6 Bxc6 dxc6 d3 Bg7",
      ],
    ],
  }),
  course({
    id: "qgd",
    name: "Queen's Gambit Declined",
    category: "black",
    side: "black",
    levels: ["intermediate", "advanced"],
    elo: "1000–2200",
    tags: ["1...d5", "QGD", "Janowski"],
    summary:
      "La defensa clásica contra 1.d4, 1.c4 y 1.Nf3: ...e6 y ...a6 dan al negro la iniciativa en el flanco de dama sin ceder el centro.",
    chapters: [
      [
        "El sistema Janowski: 3...a6",
        "La jugada ...a6 prepara ...b5 y ...Bb7. El alfil de c8 sale por b7 en lugar de quedarse encerrado, algo que el QGD clásico nunca consigue.",
        "d4 d5 c4 e6 Nc3 a6 Nf3 Nf6 Bg5 Be7 e3 O-O",
      ],
      [
        "Contra 4.cxd5",
        "Si las blancas cambian, el negro recupera con ...exd5 y obtiene una estructura simétrica cómoda con el alfil de c8 activo por f5.",
        "d4 d5 c4 e6 Nc3 a6 cxd5 exd5 Bf4 Nf6 e3 Bf5",
      ],
      [
        "Contra el cambio temprano y el sistema con Bf4",
        "El negro desarrolla con ...Bd6 y cambia alfiles para evitar la presión sobre h7. El plan es ...0-0 y ...Re8 antes de ...c5.",
        "d4 d5 c4 e6 Nc3 Nf6 Bf4 Bd6 Bxd6 Qxd6 e3 O-O",
      ],
    ],
  }),
  course({
    id: "dragon",
    name: "The Sicilian Dragon",
    category: "black",
    side: "black",
    levels: ["intermediate", "advanced"],
    elo: "1000–2200",
    tags: ["Siciliana", "fianchetto", "Yugoslavo"],
    summary:
      "La Siciliana más fácil de aprender: alfil en g7, presión en la columna c y carrera de ataques contra el enroque largo blanco.",
    chapters: [
      [
        "El esquema Dragón",
        "El alfil de g7 ataca d4 y la columna c. ...Nc6, ...0-0 y ...Rc8 preparan la ruptura ...d5 o ...b5 según el ataque blanco.",
        "e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 g6 Be3 Bg7 f3 O-O Qd2 Nc6",
      ],
      [
        "Contra el Ataque Yugoslavo",
        "Cuando las blancas enrocan largo y empujan h4-h5, el negro debe contraatacar en la columna c: ...Rc8 y ...Ne5 o ...Nxd4.",
        "e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 g6 Be3 Bg7 f3 O-O Qd2 Nc6 O-O-O d5",
      ],
      [
        "La Variante Clásica",
        "Si las blancas no atacan con h4, el negro puede jugar ...Nd7 y ...Nc5 para cambiar el caballo de d3 y controlar el centro.",
        "e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 g6 Be2 Bg7 O-O O-O Be3 Nc6",
      ],
    ],
  }),
  course({
    id: "modern",
    name: "The Modern Defense",
    category: "black",
    side: "black",
    levels: ["intermediate"],
    elo: "900–2100",
    tags: ["1...g6", "fianchetto", "sistema"],
    summary:
      "Un setup de fianchetto contra cualquier primera jugada blanca: se cede el centro para atacarlo después con piezas.",
    chapters: [
      [
        "El esquema ...g6 y ...Bg7",
        "El alfil controla la diagonal larga. ...d6 y ...a6 preparan ...b5 y la expansión en el flanco de dama.",
        "e4 g6 d4 Bg7 Nc3 d6 f4 a6 Nf3 b5 Bd3 Bb7",
      ],
      [
        "Contra el ataque austriaco",
        "Con f4 y e5 las blancas ganan espacio. El negro debe golpear con ...c5 o ...f6 antes de que el ataque llegue al rey.",
        "e4 g6 d4 Bg7 Nc3 d6 f4 c5 Nf3 cxd4 Nxd4 Nc6",
      ],
    ],
  }),
  course({
    id: "beefeater",
    name: "The Beefeater Defense",
    category: "black",
    side: "black",
    levels: ["intermediate"],
    elo: "900–1900",
    tags: ["offbeat", "1...c6", "sistema"],
    summary:
      "Un sistema excéntrico contra 1.d4 y 1.c4 que saca al rival de su preparación: ...c6, ...e5 y ...e4 cierran el centro. El motor da +0,24 al negro en la línea principal, así que el esquema se sostiene.",
    chapters: [
      [
        "El esquema ...c6, ...e5 y ...e4",
        "El negro construye una cadena sólida, empuja ...e4 para quitarle a e5 su casilla y coloca las piezas detrás del muro: ...d5, ...Nf6 y ...Bd6. Motor: +0,24 negro, el sistema funciona.",
        "d4 c6 c4 e5 Nf3 e4 Nfd2 d5 e3 Nf6",
        {
          alts: [
            [
              "5...Be7 en lugar de ...d5",
              "d4 c6 c4 e5 Nf3 e4 Nfd2 Be7",
              "Desarrollo tranquilo: el negro reserva ...d5 para cuando el blanco haya definido el centro.",
            ],
          ],
          keys: [6],
          plans: [
            "Nc3 y f3 contra e4, Be2 y O-O; cambiar en d5 solo si abre la columna c o elimina el peón fuerte negro.",
            "...d5 y ...Nf6 con ...Bd6 o ...Be7; ...f5 si el blanco juega f3, y ...c5 para abrir la columna c en el momento justo.",
          ],
          trans: ["Si el blanco juega e4 antes, la partida pasa al capítulo 2 (estructura Caro-Kann)"],
          sources: [
            ["engine", "Stockfish 19, profundidad 18"],
            ["database", "Chess Cloud Database (chessdb.cn)", "https://www.chessdb.cn/"],
            ["original", "Esquema Basman/Beefeater: 1...c6, ...e5 y ...e4"],
          ],
          conf: "C",
        },
      ],
      [
        "Contra 2.e4: estructura Caro-Kann",
        "Si las blancas ocupan el centro con e4, el negro cambia en d5 y juega una Caro-Kann con un tiempo de menos, pero sin debilidades. Motor: +0,23 blanco, posición normal.",
        "d4 c6 e4 d5 exd5 cxd5 c4 Nf6 Nc3 e6",
        {
          keys: [8],
          plans: [
            "Nf3 y cxd5 para aislar el peón de d5; Bd3 y O-O con presión en la columna e.",
            "...Be7 y ...O-O, ...b6 y ...Bb7 contra el peón de d4, y ...dxc4 si el blanco retrasa el cambio.",
          ],
          trans: ["Transpone a la Caro-Kann con ...c6 y ...d5 (curso Caro-Kann Defense)"],
          sources: [
            ["engine", "Stockfish 19, profundidad 18"],
            ["database", "Chess Cloud Database (chessdb.cn)", "https://www.chessdb.cn/"],
            ["original", "Transposición a la Caro-Kann desde 1...c6"],
          ],
          conf: "C",
        },
      ],
    ],
  }),
  course({
    id: "czech-benoni",
    name: "The Czech Benoni",
    category: "black",
    side: "black",
    levels: ["intermediate"],
    elo: "900–1900",
    tags: ["Benoni", "estructura cerrada", "1...c5"],
    summary:
      "Cierra el centro con ...e5 y ataca en el flanco de rey. Una defensa fácil de aprender que genera posiciones con planes claros.",
    chapters: [
      [
        "La cadena d5-e5",
        "Con ...e5 el negro fija el centro. ...Be7, ...0-0 y ...Ne8 preparan ...f5, la ruptura que abre el ataque.",
        "d4 Nf6 c4 c5 d5 e5 Nc3 d6 e4 Be7 Nf3 O-O Be2 Ne8",
      ],
      [
        "El ataque ...f5",
        "La torre en f8 y el peón f5 son el motor del contrajuego. Si las blancas cierran con f4, el negro cambia en f4 y presiona la columna f.",
        "d4 Nf6 c4 c5 d5 e5 Nc3 d6 e4 Be7 Nf3 O-O Be2 Ne8 O-O f5",
      ],
    ],
  }),
  course({
    id: "qga",
    name: "Queen's Gambit Accepted",
    category: "black",
    side: "black",
    levels: ["intermediate"],
    elo: "800–2000",
    tags: ["1...d5", "QGA", "actividad"],
    summary:
      "Aceptar el peón c4 y devolverlo en el momento justo. El negro obtiene piezas activas y una estructura sin debilidades.",
    chapters: [
      [
        "La recuperación con ...c5",
        "El negro permite ...c5 para golpear d4 y liberar el juego. ...a6 y ...b5 completan el plan en el flanco de dama.",
        "d4 d5 c4 dxc4 Nf3 Nf6 e3 e6 Bxc4 c5 O-O a6",
      ],
      [
        "Contra 3.e4 (el centro grande)",
        "Las blancas ocupan el centro de inmediato. El negro responde ...Nf6, ...e6 y ...c5 para minar d4 y e4.",
        "d4 d5 c4 dxc4 e4 Nf6 Nc3 e6 Bxc4 c5",
      ],
    ],
  }),
  course({
    id: "portuguese",
    name: "The Portuguese Gambit",
    category: "black",
    side: "black",
    levels: ["intermediate"],
    elo: "900–2000",
    tags: ["1...d5", "gambito", "escandinava"],
    summary:
      "Escandinava con veneno: ...Bg4 y ...Qxd5 dan al negro un desarrollo rapidísimo y amenazas sobre el rey blanco.",
    chapters: [
      [
        "El gambito portugués",
        "Después de ...Nf6 y ...Bg4, el negro cambia alfiles y recupera el peón con la dama, quedando con iniciativa y desarrollo superior.",
        "e4 d5 exd5 Nf6 d4 Bg4 Be2 Bxe2 Qxe2 Qxd5 Nf3 e6",
      ],
      [
        "El gambito islandés",
        "Recuperar el peón con ...Nxd5 pierde el caballo ante cxd5. La jugada del gambito es ...e6: el negro entrega el peón para abrir diagonales con ...Bxe6, ...Nc6 y ...Qd7 sobre el centro blanco.",
        "e4 d5 exd5 Nf6 c4 e6 dxe6 Bxe6",
      ],
    ],
  }),
  course({
    id: "d4-sidelines-black",
    name: "d4 Sidelines For Black",
    category: "black",
    side: "black",
    levels: ["intermediate"],
    elo: "900–2000",
    tags: ["London", "Trompowsky", "repertorio"],
    summary:
      "Completa cualquier repertorio contra 1.d4: cómo castigar el London, el Trompowsky y las jugadas raras de las blancas.",
    chapters: [
      [
        "Contra el London",
        "El negro cambia el alfil de f4 con ...Bd6 y juega ...c5 para golpear d4. ...Nc6 y ...Qb6 aumentan la presión.",
        "d4 d5 Bf4 Nf6 e3 c5 c3 Nc6 Nd2 e6 Ngf3 Bd6",
      ],
      [
        "Contra el Trompowsky",
        "Con ...e6 y ...h6 el negro obliga al alfil a definirse. Si cambia en f6, ...Qxf6 da la pareja de alfiles y un centro sólido.",
        "d4 Nf6 Bg5 e6 e4 h6 Bxf6 Qxf6",
      ],
      [
        "Contra 1.Nf3 y los sistemas de flanco",
        "El negro ocupa el centro con ...d5 y ...Nf6 antes de decidir la estructura. ...c5 llega cuando las blancas han comprometido piezas.",
        "Nf3 d5 d4 Nf6 c4 e6 Nc3 Be7 Bg5 h6",
      ],
    ],
  }),
];
