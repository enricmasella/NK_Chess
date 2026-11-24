import { course } from "./course";

export const WHITE_COURSES = [
  course({
    id: "vienna",
    name: "1.e4 Part 1: The Vienna",
    category: "white",
    side: "white",
    levels: ["beginner", "intermediate"],
    elo: "600–2000",
    tags: ["1.e4", "e5", "ataque", "sistema"],
    summary:
      "Repertorio principal contra 1...e5: desarrollo rápido con Nc3 y Bc4, presión sobre f7 y un plan de ataque que no exige memorizar veinte jugadas.",
    chapters: [
      [
        "El orden Vienna y el ataque a f7",
        "Bc4 sale antes que Nf3 para atacar f7 desde el primer momento. Cuando el negro acepta el peón de e4, la dama va a h5 y amenaza f7 y e5 a la vez; el caballo acaba en d6. Con ...Be7 el negro devuelve el peón, enroca y se queda con la pareja de alfiles: motor y teoría coinciden en que la posición es igualada.",
        "e4 e5 Nc3 Nf6 Bc4 Nxe4 Qh5 Nd6 Bb3 Be7 Qxe5 O-O Nf3 Nc6 Qf4 Na5 O-O Nxb3 axb3",
        {
          alts: [
            [
              "3...Nc6: híbrido Berlin-Vienna",
              "e4 e5 Nc3 Nf6 Bc4 Nc6 d3 Bc5 Nf3 d6 O-O",
              "Si las negras desarrollan en lugar de capturar, el plan no cambia: d3, Nf3 y enroque, con Bg5 para cambiar el alfil de casillas oscuras.",
            ],
            [
              "3...Bc5: ataque Spielmann",
              "e4 e5 Nc3 Nf6 Bc4 Bc5 d3 d6 Nf3 Nc6 O-O",
              "El alfil en c5 mira f2; las blancas completan el desarrollo y buscan d4 o el cambio en c5. Motor: -0,10, posición cómoda para ambos.",
            ],
          ],
          keys: [7, 11],
          plans: [
            "Enrocar corto, doblar torres en e1/d1 y jugar d4 cuando el alfil de c8 ya no pueda cambiar: la presión sobre f7 y e5 es el plan.",
            "Devolver el peón con ...Be7, enrocar y cambiar piezas hacia un final con la pareja de alfiles; ...Na5 cambia el alfil de b3.",
          ],
          trans: [
            "3.Nf3 transpone a los Cuatro Caballos",
            "2.Bc4 (Apertura del Alfil) llega a la misma posición si el negro juega ...Nf6 y el blanco Nc3",
          ],
          traps: [
            [
              "e4 e5 Nc3 Nf6 Bc4 Nxe4 Qh5 Nd6 Bb3 Nc6 Nb5 g6 Qf3 f5 Qd5 Qe7 Nxc7+ Kd8 Nxa8",
              "La trampa clásica: el blanco gana la torre de a8, pero el negro obtiene contrajuego con ...b6 y ...Bb7. Se estudia en el capítulo 4.",
            ],
          ],
          sources: [
            ["engine", "Stockfish 19, profundidad 18"],
            ["database", "Chess Cloud Database (chessdb.cn)", "https://www.chessdb.cn/"],
            ["book", "Wikipedia: Vienna Game, Stanley Variation", "https://en.wikipedia.org/wiki/Vienna_Game"],
          ],
          conf: "C",
        },
      ],
      [
        "El Gambito Vienna: 3.f4",
        "3.f4 entrega el peón f para abrir la columna y ganar el centro. La respuesta principal es 3...d5, que lleva a la línea Breyer del Gambito de Rey: dama a e2, enroque largo y ataque en el flanco de rey (motor +0,4). Aceptar el gambito con 3...exf4 es una concesión: 4.e5 obliga a ...Ng8 y el blanco recupera el peón con ventaja (motor +0,6).",
        "e4 e5 Nc3 Nf6 f4 d5 fxe5 Nxe4 Nf3 Be7 Qe2 Nxc3 dxc3 c5 Bf4 Nc6 O-O-O Be6 h4",
        {
          alts: [
            [
              "3...exf4 (aceptar el gambito)",
              "e4 e5 Nc3 Nf6 f4 exf4 Nf3 d5 exd5 Nxd5 Bc4 Nb6 Bb3 Be7",
              "Si el negro acepta y juega ...d5, la partida transpone al Gambito de Rey aceptado: el blanco tiene la columna f y el negro el peón de más.",
            ],
            [
              "3...exf4 4.e5 (la refutación práctica)",
              "e4 e5 Nc3 Nf6 f4 exf4 e5 Ng8 Nf3 d6 Qe2",
              "El caballo vuelve a g8 y el blanco juega Nf3, d4 y recupera f4 con ventaja de desarrollo; el motor da +0,6.",
            ],
          ],
          keys: [5],
          plans: [
            "Abrir la columna f, enrocar corto y atacar f7/e5 con Nf3, Bc4 y la dama en e2 o h5.",
            "Aceptar el peón solo si se aguanta 4.e5; si no, jugar 3...d5 y cambiar piezas para neutralizar la columna f.",
          ],
          trans: [
            "3...d5 4.fxe5 Nxe4 lleva a la línea Breyer del Gambito de Rey",
            "3...d6 transpone al Gambito de Rey rechazado",
          ],

          sources: [
            ["engine", "Stockfish 19, profundidad 18"],
            ["database", "Chess Cloud Database (chessdb.cn)", "https://www.chessdb.cn/"],
            ["book", "Wikipedia: Vienna Game, Falkbeer Variation", "https://en.wikipedia.org/wiki/Vienna_Game"],
          ],
          conf: "C",
        },
      ],
      [
        "Vienna tranquila con 4.d3 y 5.Nf3",
        "Versión sin riesgos: d3 sostiene e4, Nf3 controla el centro y el alfil de casillas oscuras se cambia o se lleva a g5. Ideal para quien empieza; el negro iguala si cambia en f3 y juega ...d5.",
        "e4 e5 Nc3 Nc6 Bc4 Bc5 d3 Nf6 Nf3 d6 O-O O-O Bg5 h6 Bh4",
        {
          alts: [
            [
              "7.Bg5 h6 8.Bxf6 en lugar de 8.Bh4",
              "e4 e5 Nc3 Nc6 Bc4 Bc5 d3 Nf6 Nf3 d6 O-O O-O Bg5 h6 Bxf6 Qxf6 Nd5",
              "Cambiar en f6 deja la dama negra delante; Nd5 busca la casilla fuerte y evita ...Bg4. Motor: 0,00.",
            ],
          ],
          keys: [7],
          plans: [
            "Enrocar, Re1, Bg5/Bf4 y preparar d4 o f4 según dónde esté el rey negro.",
            "Cambiar en f3 para dejar al blanco con peón doblado, jugar ...d5 y buscar el cambio de alfiles.",
          ],
          trans: [
            "Transpone a la Apertura del Alfil (2.Bc4) y al híbrido Berlin-Vienna",
            "2...Nc6 3.g3 lleva a la variante Paulsen",
          ],
          sources: [
            ["engine", "Stockfish 19, profundidad 18"],
            ["database", "Chess Cloud Database (chessdb.cn)", "https://www.chessdb.cn/"],
            ["book", "Wikipedia: Vienna Game, Berlin-Vienna Hybrid", "https://en.wikipedia.org/wiki/Vienna_Game"],
          ],
          conf: "C",
        },
      ],
      [
        "La trampa Dark Vienna: 4.Qh5 y 6.Nb5",
        "Tras ...Nxe4 el rey negro se queda en el centro y Qh5 fuerza ...Nd6. El golpe Nb5 apunta a c7 y a la torre de a8: si el negro se defiende con ...g6 y ...f5, Qd5 gana la torre porque el caballo de c6 queda clavado. El motor da +0,9 al blanco, no una victoria: el negro tiene compensación con ...b6 y ...Bb7.",
        "e4 e5 Nc3 Nf6 Bc4 Nxe4 Qh5 Nd6 Bb3 Nc6 Nb5 g6 Qf3 f5 Qd5 Qe7 Nxc7+ Kd8 Nxa8 b6",
        {
          alts: [
            [
              "8...Qf6 en lugar de 8...Qe7",
              "e4 e5 Nc3 Nf6 Bc4 Nxe4 Qh5 Nd6 Bb3 Nc6 Nb5 g6 Qf3 f5 Qd5 Qf6 Nxc7+ Kd8 Nxa8 b6",
              "Con la dama en f6 el negro conserva la casilla e7 para el caballo; la teoría la considera la defensa más incómoda para el blanco.",
            ],
          ],
          keys: [7, 11, 15],
          plans: [
            "Llevar el rey a c1, conservar la calidad de más y atacar al rey negro atrapado en el centro; evitar el cambio de damas que salva al negro.",
            "...b6 y ...Bb7 para recuperar el caballo, ...f4 y ...Nd4 para abrir diagonales; no cambiar damas.",
          ],
          traps: [
            [
              "e4 e5 Nc3 Nf6 Bc4 Nxe4 Qh5 Nd6 Bb3 Nc6 Nb5 g6 Qf3 f5 Qd5 Qe7 Nxc7+ Kd8 Nxa8 b6 d3 Bb7 h4 f4 Qf3 Nd4",
              "El negro no debe defender pasivamente: ...f4 y ...Nd4 son su contrajuego real, como en Øst-Hansen–Nunn.",
            ],
          ],
          games: [
            ["Øst-Hansen–Nunn, Teesside 1974 (0-1)", "Wikipedia: Frankenstein–Dracula Variation (partida completa)"],
            ["Dubov–Meier, Copa del Mundo 2025, desempate rápido", "Wikipedia: Frankenstein–Dracula Variation (referencia)"],
          ],
          sources: [
            ["engine", "Stockfish 19, profundidad 18"],
            ["database", "Chess Cloud Database (chessdb.cn)", "https://www.chessdb.cn/"],
            ["book", "Wikipedia: Frankenstein–Dracula Variation", "https://en.wikipedia.org/wiki/Frankenstein%E2%80%93Dracula_Variation"],
          ],
          conf: "C",
        },
      ],
    ],
  }),
  course({
    id: "dark-vienna",
    name: "The Dark Vienna",
    category: "white",
    side: "white",
    levels: ["intermediate"],
    elo: "1000–2000",
    tags: ["bonus", "1.e4", "Vienna"],
    summary:
      "Mini curso complementario al Vienna: la variante Frankenstein–Dracula, por qué la trampa funciona cuando el negro se defiende mal, y qué jugar contra la defensa correcta 5...Be7.",
    chapters: [
      [
        "La trampa: 4.Qh5, 6.Nb5 y 8.Qd5",
        "El rey negro en el centro es el objetivo. Qh5 obliga a ...Nd6, Nb5 ataca c7 y la torre de a8; 8.Qd5 gana la torre porque el caballo de c6 queda clavado. La teoría lo llama Frankenstein–Dracula y avisa: el blanco gana la calidad, el negro recibe centro y alfiles. El motor da +0,6, así que con ...b6 y ...Bb7 hay partida.",
        "e4 e5 Nc3 Nf6 Bc4 Nxe4 Qh5 Nd6 Bb3 Nc6 Nb5 g6 Qf3 f5 Qd5 Qe7 Nxc7+ Kd8 Nxa8 b6 d3 Bb7 h4",
        {
          alts: [
            [
              "8...Qf6 en lugar de 8...Qe7",
              "e4 e5 Nc3 Nf6 Bc4 Nxe4 Qh5 Nd6 Bb3 Nc6 Nb5 g6 Qf3 f5 Qd5 Qf6 Nxc7+ Kd8 Nxa8 b6",
              "Con la dama en f6 el negro deja libre la casilla e7 para el caballo; la teoría la considera la defensa más dura.",
            ],
          ],
          keys: [7, 11, 15, 21],
          plans: [
            "Enrocar largo, conservar la calidad y atacar el rey negro atrapado en el centro; no cambiar damas.",
            "...b6, ...Bb7 y ...f4 para abrir la diagonal del alfil; ...Nd4 y ...Nxb5 para cazar piezas.",
          ],

          games: [
            ["Øst-Hansen–Nunn, Teesside 1974 (0-1)", "Wikipedia: Frankenstein–Dracula Variation (partida completa)"],
            ["Dubov–Meier, Copa del Mundo 2025, desempate rápido", "Wikipedia: Frankenstein–Dracula Variation (referencia)"],
          ],
          sources: [
            ["engine", "Stockfish 19, profundidad 18"],
            ["database", "Chess Cloud Database (chessdb.cn)", "https://www.chessdb.cn/"],
            ["book", "Wikipedia: Frankenstein–Dracula Variation", "https://en.wikipedia.org/wiki/Frankenstein%E2%80%93Dracula_Variation"],
            ["game", "Øst-Hansen–Nunn, Teesside 1974", "https://en.wikipedia.org/wiki/Frankenstein%E2%80%93Dracula_Variation"],
          ],
          conf: "C",
        },
      ],
      [
        "La defensa correcta: 5...Be7 y el error 6...Nd4",
        "Contra 4.Qh5 lo sólido es devolver el peón con 5...Be7 y enrocar: el blanco recupera e5 pero la dama se queda sin objetivos y el negro tiene la pareja de alfiles. La jugada que parece activa, 6...Nd4, abandona d6 y pierde por mate forzado. Si el negro nunca captura en e4, la partida vuelve al Vienna tranquilo.",
        "e4 e5 Nc3 Nf6 Bc4 Nxe4 Qh5 Nd6 Bb3 Be7 Nf3 Nc6 Nxe5 O-O O-O Nxe5 Qxe5 Bf6 Qf4 Ne8",
        {
          alts: [
            [
              "6.Nf3 g6 (intento de conservar el peón)",
              "e4 e5 Nc3 Nf6 Bc4 Nxe4 Qh5 Nd6 Bb3 Be7 Nf3 g6 Qxe5",
              "Conservar el peón con ...g6 debilita las casillas negras: la dama entra en e5 y el motor da +1,3 al blanco.",
            ],
            [
              "Si el negro no captura en e4: Vienna tranquilo",
              "e4 e5 Nc3 Nf6 Bc4 Bc5 d3 Nc6 Nf3 d6 O-O",
              "Sin ...Nxe4 no hay trampa: las blancas vuelven al esquema sólido con d3, Nf3 y enroque, y el plan es jugar por el centro.",
            ],
          ],
          keys: [5, 9],
          plans: [
            "Cambiar piezas y jugar contra el peón de e5; si el negro devuelve el peón, buscar el final con alfiles activos.",
            "Devolver el peón, enrocar y cambiar damas; la pareja de alfiles y la columna abierta compensan.",
          ],
          traps: [
            [
              "e4 e5 Nc3 Nf6 Bc4 Nxe4 Qh5 Nd6 Bb3 Nc6 Nb5 Nd4 Nxd6+ Ke7 Nf5+ Kf6 Qxf7+ Kg5 h4+ Kf4 Nh3+ Kg4 Ne3+ Kxh4 g3#",
              "6...Nd4?? parece activo pero abandona d6: 7.Nxd6+ arrastra al rey al centro y el mate llega en siete jugadas (motor, profundidad 14).",
            ],
          ],
          sources: [
            ["engine", "Stockfish 19, profundidad 18; mate a profundidad 14"],
            ["database", "Chess Cloud Database (chessdb.cn)", "https://www.chessdb.cn/"],
            ["book", "Wikipedia: Frankenstein–Dracula Variation, 5...Be7", "https://en.wikipedia.org/wiki/Frankenstein%E2%80%93Dracula_Variation"],
          ],
          conf: "C",
        },
      ],
    ],
  }),
  course({    id: "london",
    name: "The London System",
    category: "white",
    side: "white",
    levels: ["beginner", "intermediate"],
    elo: "400–2000",
    tags: ["1.d4", "sistema", "Bf4"],
    summary:
      "Un sistema sólido contra casi cualquier defensa: Bf4 antes de e3, c3, Nbd2, Bd3 y Ne5. La ventaja es práctica, no numérica: el motor da 0,08 en la línea principal y 0,00 contra ...c5 bien jugado.",
    chapters: [
      [
        "La estructura London: Bf4 antes de e3",
        "El alfil sale antes de e3 para no quedar encerrado en la cadena c3-d4-e3. Cuando el negro lo ataca con ...Bd6, Bg3 mantiene el alfil: si el negro cambia ...Bxg3, hxg3 abre la columna h y da al blanco su plan. Motor: 0,08 para el negro, igualdad con el plan ya definido.",
        "d4 d5 Bf4 Nf6 e3 e6 Nf3 Bd6 Bg3 O-O Bd3 c5 c3",
        {
          keys: [2, 8, 10],
          alts: [
            [
              "5.Bxd6: el cambio cómodo para el negro",
              "d4 d5 Bf4 Nf6 e3 e6 Nf3 Bd6 Bxd6 Qxd6 c4",
              "El negro activa la dama en d6 y juega ...e5 con tempo. Motor: 0,11 para el blanco, pero se entrega la pareja de alfiles sin ganar nada; la teoría lo considera una concesión.",
            ],
            [
              "5.Bd3!?: la recomendación moderna",
              "d4 d5 Bf4 Nf6 e3 e6 Nf3 Bd6 Bd3",
              "Línea de ChessBase Magazine #232 (845 partidas, 56,9 % para el blanco): el blanco mantiene la flexibilidad y acepta ...Bxf4 con exf4, que refuerza el centro. Motor: 0,08 para el blanco.",
            ],
          ],
          plans: [
            "Nbd2, c3, Bd3 y Ne5: la presión va a e5 y al flanco de rey; si el negro cambia en g3, hxg3 y la torre sube por la columna h.",
            "Presionar d4 con ...c5 y ...Qb6, cambiar el alfil bueno con ...Bd6, y desarrollar con ...b6, ...Bb7 y ...Ne4 si el blanco descuida e5.",
          ],
          trans: [
            "2.Nf3 Nf6 3.Bf4 es el orden antiguo y llega a la misma estructura",
            "2.Nc3 d5 3.Bf4 es el London Jobava, que añade e4",
            "1.d4 Nf6 2.Bf4 g6 lleva al setup del capítulo 3",
          ],
          sources: [
            ["engine", "Stockfish 19, profundidad 18"],
            ["database", "Chess Cloud Database (chessdb.cn)", "https://www.chessdb.cn/"],
            ["book", "Wikipedia: London System", "https://en.wikipedia.org/wiki/London_System"],
            [
              "book",
              "ChessBase Magazine #232, Christian Braun",
              "https://en.chessbase.com/post/neu-chessbase-magazin-6",
            ],
          ],
          conf: "C",
        },
      ],
      [
        "Contra ...c5 y ...Qb6: Qb3 y Qc2",
        "...Qb6 presiona b2 y obliga a decidir. Qb3 ofrece el cambio de damas; si el negro empuja ...c4, Qc2 deja ese peón como objetivo y el negro tiene que justificarlo. Motor: 0,00. La línea anterior del curso cambiaba en b6: ...axb6 abre la columna a y ...e5 golpea f4, con 0,91 para el negro.",
        "d4 d5 Bf4 c5 e3 Nc6 c3 Qb6 Qb3 c4 Qc2",
        {
          keys: [8, 10],
          alts: [
            [
              "5.Qc1, la jugada de espera",
              "d4 d5 Bf4 c5 e3 Nc6 c3 Qb6 Qc1",
              "El blanco defiende b2 sin definir la dama y conserva la opción de Qb3 o Qd2. Motor: 0,12 para el blanco.",
            ],
            [
              "6.Qxb6?? axb6 7.Na3: el error anterior",
              "d4 d5 Bf4 c5 e3 Nc6 c3 Qb6 Qb3 c4 Qxb6 axb6 Na3",
              "La línea que enseñaba el curso. El negro queda con la columna a abierta, ...e5 contra f4 y ...b5; motor: 0,91 para el negro. Se estudia como lección, no se entrena.",
            ],
          ],
          plans: [
            "Mantener d4, jugar Nbd2 y e4 cuando el negro ya no pueda cambiar en d4; si cambia ...cxd4, recapturar con peón y presionar el peón de c4.",
            "El negro cerró el centro con ...c4: su plan es ...b5, ...Bb7, ...Nf6 y ...e5, con la dama en b6 mirando b2.",
          ],
          trans: [
            "2...c5 sin ...d5 lleva a estructuras tipo Benoni si el blanco empuja d5",
            "Si el negro cambia ...cxd4 y el blanco recaptura con peón, la posición es un London con peón aislado",
          ],
          sources: [
            ["engine", "Stockfish 19, profundidad 18"],
            ["database", "Chess Cloud Database (chessdb.cn)", "https://www.chessdb.cn/"],
            ["book", "Wikipedia: London System", "https://en.wikipedia.org/wiki/London_System"],
          ],
          conf: "C",
        },
      ],
      [
        "Contra el fianchetto (...g6 y ...Bg7)",
        "Cuando el negro fianchetta, el London cambia de flanco: Be2, O-O, h3 y Bh2 para sacar el alfil de la clavada ...Nh5 y de la diagonal de ...e5. Motor: 0,44 para el blanco, la mejor evaluación de los cuatro capítulos.",
        "d4 Nf6 Bf4 g6 e3 Bg7 Nf3 d6 Be2 O-O O-O Nbd7 h3 Qe8",
        {
          keys: [2, 12],
          alts: [
            [
              "Bh2 antes de que el negro juegue ...e5",
              "d4 Nf6 Bf4 g6 e3 Bg7 Nf3 d6 Be2 O-O O-O Nbd7 h3 Qe8 Bh2",
              "El alfil se aparta y deja f4 al caballo; el blanco prepara e4 sin que ...Nh5 cambie su alfil bueno. Motor: 0,38 para el blanco.",
            ],
          ],
          plans: [
            "Elegir entre e4 y c4 según el negro, y saltar a e5 con apoyo de f4; si el negro juega ...e5, cambiar en e5 y ocupar d5 con el caballo.",
            "Jugar ...e5, cambiar el alfil de f4 con ...Nh5 y buscar ...f5 y ...Qe7: el negro tiene el espacio del flanco de rey.",
          ],
          trans: [
            "...d6 y ...Nbd7 con ...e5 es una estructura de Rey Indio con el alfil fuera de la cadena",
            "1.d4 Nf6 2.Nf3 g6 3.Bf4 llega a la misma posición",
          ],
          sources: [
            ["engine", "Stockfish 19, profundidad 18"],
            ["database", "Chess Cloud Database (chessdb.cn)", "https://www.chessdb.cn/"],
            ["book", "Wikipedia: London System", "https://en.wikipedia.org/wiki/London_System"],
          ],
          conf: "C",
        },
      ],
      [
        "El plan de ataque: Ne5 y Qf3",
        "La casilla e5 es la joya del London. Caballo ahí, la torre en e1 y la dama en f3: el ataque a h7 no necesita peones. Empujar f4 antes de tiempo debilita e3 y permite ...Ne7 y ...Nf5; en esa versión el motor da 0,34 al negro, así que el orden importa. Con Qf3 la posición queda 0,00 y el blanco conserva todas las ideas.",
        "d4 d5 Bf4 Nf6 e3 c5 c3 Nc6 Nd2 e6 Ngf3 Bd6 Bg3 O-O Bd3 b6 Ne5 Bb7 Qf3",
        {
          keys: [16, 18],
          alts: [
            [
              "10.f4: el empuje precipitado",
              "d4 d5 Bf4 Nf6 e3 c5 c3 Nc6 Nd2 e6 Ngf3 Bd6 Bg3 O-O Bd3 b6 Ne5 Bb7 f4",
              "La versión anterior del curso. El negro responde ...Ne7 y ...Nf5 con 0,34 a su favor: f4 no gana tiempo y debilita e3.",
            ],
            [
              "Si el negro cierra con ...c4",
              "d4 d5 Bf4 Nf6 e3 c5 c3 Nc6 Nd2 e6 Ngf3 Bd6 Bg3 O-O Bd3 b6 Ne5 Bb7 f4 c4",
              "El blanco cambia de plan: Bc2, Bh4 y Qg4 por el flanco de rey. Motor: 0,53 para el blanco, porque el peón de c4 queda como objetivo.",
            ],
          ],
          plans: [
            "Ne5, Qf3, Re1 y h3; el ataque va a h7 con el caballo como ariete y la dama detrás. Si el negro cambia el caballo, la torre entra en e5.",
            "Cambiar el caballo de e5 con ...Ne7/...Nf5, jugar ...c4 para cerrar el centro y contraatacar con ...b5 y ...Qc7.",
          ],
          trans: [
            "Si el negro juega ...Bd6 y ...Bxg3, hxg3 lleva a la estructura del capítulo 3 con la columna h abierta",
            "Con ...e5 en lugar de ...e6 se llega a una estructura de Peón Dama aislado para el blanco",
          ],
          sources: [
            ["engine", "Stockfish 19, profundidad 18"],
            ["database", "Chess Cloud Database (chessdb.cn)", "https://www.chessdb.cn/"],
            ["book", "Wikipedia: London System", "https://en.wikipedia.org/wiki/London_System"],
          ],
          conf: "C",
        },
      ],
    ],

  }),
  course({    id: "kings-knight",
    name: "King's Knight Opening",
    category: "white",
    side: "white",
    levels: ["beginner", "intermediate"],
    elo: "800–2000",
    tags: ["1.e4", "e5", "Petrov", "Philidor"],
    summary:
      "Qué hacer después de 1.e4 e5 2.Nf3 cuando el negro evita las líneas principales: el Petrov, el Philidor y las transposiciones al Scotch. El motor da 0,47, 0,35 y 0,24 al blanco: sale algo mejor en las tres, sin ganar ninguna.",
    chapters: [
      [
        "El Petrov: 3.Nxe5",
        "La captura central es correcta. El negro recupera el peón con ...Nxe4, pero cede el centro: d4, Bd3 y c4 dejan el caballo de e4 como objetivo y el blanco sale con 0,47.",
        "e4 e5 Nf3 Nf6 Nxe5 d6 Nf3 Nxe4 d4 d5 Bd3 Be7 O-O Nc6 c4 Nb4 Be2",
        {
          keys: [8, 10],
          alts: [
            [
              "4.Nc3, sin peón de más",
              "e4 e5 Nf3 Nf6 Nxe5 d6 Nf3 Nxe4 Nc3 Nxc3 dxc3 Be7",
              "El cambio de caballos deja una estructura simétrica y la pareja de alfiles para el blanco. Motor: 0,16, la mitad de ventaja que la línea principal.",
            ],
          ],
          plans: [
            "d4, Bd3, c4 y presión sobre d5; el caballo de e4 se cambia o se encierra con f3 y g3, y la torre va a e1.",
            "Aceptar el peón de e4, jugar ...d5 y ...Be7 para igualar; si el blanco empuja c4, ...Nb4 cambia el alfil de d3.",
          ],
          trans: [
            "3...Nc6 4.Nc3 lleva a los Cuatro Caballos",
            "Si el negro devuelve el peón con ...Nf6, la partida vuelve a la apertura del caballo de rey",
          ],
          sources: [
            ["engine", "Stockfish 19, profundidad 18"],
            ["database", "Chess Cloud Database (chessdb.cn)", "https://www.chessdb.cn/"],
            ["book", "Wikipedia: Petrov's Defence", "https://en.wikipedia.org/wiki/Petrov%27s_Defence"],
          ],
          conf: "C",
        },
      ],
      [
        "El Philidor: 3...d6 y 4...exd4",
        "Contra la defensa pasiva, el plan es simple: cambiar en d4, desarrollar el alfil a e2 y enrocar antes de que el negro se libere con ...c5. Motor: 0,35 para el blanco, y el alfil de c8 negro no tiene casilla.",
        "e4 e5 Nf3 d6 d4 exd4 Nxd4 Nf6 Nc3 Be7 Be2 O-O O-O",
        {
          keys: [6],
          alts: [
            [
              "3...Nd7, la Philidor pasiva",
              "e4 e5 Nf3 d6 d4 Nd7 Nc3 Be7 Bc4 c6 O-O",
              "El negro defiende e5 y prepara ...c6 y ...Nf6, pero pierde un tiempo. Motor: 0,50 para el blanco, la mejor evaluación del capítulo.",
            ],
          ],
          plans: [
            "Be2, O-O y luego f4 o Re1: el blanco tiene más espacio y puede jugar en el flanco de rey sin riesgo.",
            "Cambiar en d4, jugar ...Be7 y ...O-O, y liberarse con ...c5 o ...b6 y ...Bb7 antes de que el blanco ataque e5.",
          ],
          trans: [
            "3...Nf6 4.Nc3 lleva al Petrov si el negro toma en e4",
            "El orden ...Nf6 y ...d6 puede transponer al Scotch",
          ],
          sources: [
            ["engine", "Stockfish 19, profundidad 18"],
            ["database", "Chess Cloud Database (chessdb.cn)", "https://www.chessdb.cn/"],
            ["book", "Wikipedia: Philidor Defence", "https://en.wikipedia.org/wiki/Philidor_Defence"],
          ],
          conf: "C",
        },
      ],
      [
        "El Scotch como arma universal",
        "Si el negro juega ...Nc6 en cualquier orden, 3.d4 abre el centro. Contra ...Bc5 y ...Qf6 el blanco responde con Be3, c3 y Bc4 antes de enrocar; motor 0,24, suficiente para jugar sin teoría excesiva.",
        "e4 e5 Nf3 Nc6 d4 exd4 Nxd4 Bc5 Be3 Qf6 c3 Nge7 Bc4",
        {
          keys: [8, 12],
          alts: [
            [
              "4...Nf6, el Scotch de los Cuatro Caballos",
              "e4 e5 Nf3 Nc6 d4 exd4 Nxd4 Nf6 Nxc6 bxc6 e5 Qe7 Qe2 Nd5",
              "El cambio en c6 dobla los peones negros y deja e5 al blanco, pero el negro tiene la columna b. Motor: 0,00, igualdad.",
            ],
          ],
          plans: [
            "c3 y Bc4 contra f7, O-O y Re1; si el negro cambia ...Bxd4, recapturar con la dama y jugar en la columna d.",
            "El alfil de c5 presiona d4 y f2; ...Nge7 y ...d6 consolidan y el negro busca cambiar el caballo de d4.",
          ],
          trans: [
            "4...Nf6 5.Nxc6 bxc6 llega a una Siciliana con colores cambiados",
            "3...d6 transpone a la Philidor",
          ],
          sources: [
            ["engine", "Stockfish 19, profundidad 18"],
            ["database", "Chess Cloud Database (chessdb.cn)", "https://www.chessdb.cn/"],
            ["book", "Wikipedia: Scotch Game", "https://en.wikipedia.org/wiki/Scotch_Game"],
          ],
          conf: "C",
        },
      ],
    ],

  }),
  course({    id: "larsen",
    name: "Larsen's Opening: 1.b3",
    category: "white",
    side: "white",
    levels: ["intermediate"],
    elo: "900–2000",
    tags: ["1.b3", "offbeat", "Bb2"],
    summary:
      "Apertura de flanco con el alfil en la gran diagonal. Posiciones poco teóricas donde las blancas juegan con planes y no con memoria: el motor da 0,00 en la línea principal y 0,56 en la versión con f4.",
    chapters: [
      [
        "El sistema b3/Bb2",
        "El alfil en b2 controla e5 y g7, y Bb5+ obliga al negro a decidir. No da ventaja: con ...Bd6 y ...O-O la posición queda 0,00. El plan blanco es Ne2, f4 y Nf3 sin debilitar e3; si el negro juega ...e4, el alfil de b5 se cambia y el ataque va a e4.",
        "b3 e5 Bb2 Nc6 e3 Nf6 Bb5 Bd6 Ne2 O-O O-O",
        {
          keys: [2, 8],
          alts: [
            [
              "...d5 en lugar de ...Bd6",
              "b3 e5 Bb2 Nc6 e3 d5 Bb5 Bd7 Nf3",
              "El negro cierra la diagonal con ...Bd7 y prepara ...e4. Motor: 0,15 para el negro, la única línea del capítulo en la que el negro está algo mejor.",
            ],
          ],
          plans: [
            "Ne2, f4, Nf3 y O-O; si el negro empuja ...e4, cambiar el alfil de b5 y atacar el peón de e4 con d3 y c4.",
            "Jugar ...d5 y ...e4 con espacio, o ...Bd6, ...O-O y ...Ne7 para cambiar el alfil de b2.",
          ],
          trans: [
            "...e5 con ...d5 transpone a una Francesa con el alfil en b2",
            "Si el blanco juega c4, se llega a estructuras de Inglesa",
          ],
          sources: [
            ["engine", "Stockfish 19, profundidad 18"],
            ["database", "Chess Cloud Database (chessdb.cn)", "https://www.chessdb.cn/"],
            ["book", "Wikipedia: Larsen's Opening", "https://en.wikipedia.org/wiki/Larsen%27s_Opening"],
          ],
          conf: "C",
        },
      ],
      [
        "Contra 1...d5",
        "El negro ocupa el centro con ...d5 y ...c5. Bb5+ desvía el caballo a d7 y el blanco elige entre d4 y c4 según lo que haga el negro; la posición queda 0,05.",
        "b3 d5 Bb2 Nf6 e3 c5 Bb5 Nbd7 Nf3 e6 O-O Bd6",
        {
          keys: [6],
          alts: [
            [
              "...c5 inmediato, sin ...Nf6",
              "b3 d5 Bb2 c5 e3 Nc6 Bb5 Bd7 Nf3",
              "El negro juega ...c5 antes de desarrollar y acepta un caballo pasivo en d7; motor 0,09 para el blanco.",
            ],
          ],
          plans: [
            "d4 cuando el negro ya no pueda jugar ...cxd4 con ventaja, y luego Nbd2, c4 y presión en d5 con la torre en c1.",
            "Consolidar con ...e6, ...Bd6 y ...O-O, y buscar ...e5 o ...b5 en el flanco de dama.",
          ],
          trans: [
            "Con ...e6 y ...d5 la estructura es una Defensa Ortodoxa con el alfil en b2",
            "Si el negro cambia ...cxd4, el blanco recaptura y queda con centro móvil",
          ],
          sources: [
            ["engine", "Stockfish 19, profundidad 18"],
            ["database", "Chess Cloud Database (chessdb.cn)", "https://www.chessdb.cn/"],
            ["book", "Wikipedia: Larsen's Opening", "https://en.wikipedia.org/wiki/Larsen%27s_Opening"],
          ],
          conf: "C",
        },
      ],
      [
        "Presión con f4",
        "Con el rey todavía en el centro, f4 gana espacio y ataca e5. El precio son la casilla e3 y la diagonal del rey. Motor: 0,56 para el blanco, la mejor evaluación del curso, y la única línea que convierte el espacio en algo.",
        "b3 e5 Bb2 Nc6 e3 d5 Bb5 Bd6 f4 Qe7 Nf3",
        {
          keys: [8],
          alts: [
            [
              "Sin f4: ...Bd6 y espera",
              "b3 e5 Bb2 Nc6 e3 d5 Bb5 Bd6 Nf3 Qe7",
              "Si el blanco no empuja f4, la posición queda 0,00: el espacio de la gran diagonal no se convierte en nada por sí solo.",
            ],
          ],
          plans: [
            "f4, Nf3 y O-O, luego fxe5 y presión en la columna f; si el negro cambia ...Bxf4, la columna f se abre a favor del blanco.",
            "Contestar con ...exf4, ...Nf6 y ...O-O para cambiar el caballo de f3 y neutralizar la columna; ...Qe7 defiende e5 y prepara ...Bd7.",
          ],
          trans: [
            "Si el negro juega ...exf4, la estructura es un Gambito de Rey con colores y tiempos cambiados",
            "...d5 y ...Bd6 con f4 lleva a una Holandesa invertida",
          ],
          sources: [
            ["engine", "Stockfish 19, profundidad 18"],
            ["database", "Chess Cloud Database (chessdb.cn)", "https://www.chessdb.cn/"],
            ["book", "Wikipedia: Larsen's Opening", "https://en.wikipedia.org/wiki/Larsen%27s_Opening"],
          ],
          conf: "C",
        },
      ],
    ],

  }),
  course({    id: "english",
    name: "The English Opening",
    category: "white",
    side: "white",
    levels: ["intermediate", "advanced"],
    elo: "1000–2200",
    tags: ["1.c4", "sistema", "reversed Sicilian"],
    summary:
      "Apertura de los grandes: presión en d5 desde el flanco, fianchetto con g3 y transposiciones a estructuras de Siciliana invertida. El motor da 0,17, 0,28 y 0,43 al blanco: iniciativa pequeña pero real en las tres líneas.",
    chapters: [
      [
        "Siciliana invertida: 1...e5",
        "El negro juega una Siciliana con colores cambiados. El blanco fianchetta, presiona d5 y busca la ruptura d4 en el momento adecuado; d3 y Be3 consolidan antes de abrir. Motor: 0,17 para el blanco.",
        "c4 e5 Nc3 Nf6 g3 d5 cxd5 Nxd5 Bg2 Nb6 Nf3 Nc6 O-O Be7",
        {
          keys: [6, 8],
          alts: [
            [
              "d3 y Be3 antes de abrir",
              "c4 e5 Nc3 Nf6 g3 d5 cxd5 Nxd5 Bg2 Nb6 Nf3 Nc6 O-O Be7 d3 O-O Be3",
              "El blanco consolida el centro y deja d4 para más tarde; el negro iguala con ...Be6 y ...Nd5. Motor: 0,15 para el blanco.",
            ],
          ],
          plans: [
            "Presionar d5 con Bg2, Nc3 y la torre en d1, y abrir con d4 cuando el negro ya no pueda cambiar ventajosamente; el alfil de c1 sale por g5 o e3.",
            "Cambiar en d5, jugar ...Nb6 y ...Be7, y liberarse con ...Be6 y ...Nd4 o ...f5 según el flanco que elija.",
          ],
          trans: [
            "...e5 y ...d5 llega a una Siciliana Invertida con el alfil en g2",
            "Si el negro juega ...d4 antes de cambiar, la estructura pasa a ser de Benoni invertida",
          ],
          sources: [
            ["engine", "Stockfish 19, profundidad 18"],
            ["database", "Chess Cloud Database (chessdb.cn)", "https://www.chessdb.cn/"],
            ["book", "Wikipedia: English Opening", "https://en.wikipedia.org/wiki/English_Opening"],
          ],
          conf: "C",
        },
      ],
      [
        "Contra 1...Nf6 y el centro simétrico",
        "d4 después de ...e6 y ...d5 lleva a estructuras de Gambito de Dama con el alfil en g2. El cambio en d5 deja al negro con peón aislado si cambia en d4; motor 0,28, y Bg5 o Bf4 según lo que haga el negro.",
        "c4 Nf6 Nc3 e6 Nf3 d5 cxd5 exd5 d4 Be7 Bg5 O-O e3 c6",
        {
          keys: [6, 10],
          alts: [
            [
              "Bf4 en lugar de Bg5",
              "c4 Nf6 Nc3 e6 Nf3 d5 cxd5 exd5 d4 Be7 Bf4 O-O e3 c6",
              "El alfil sale a f4, fuera de la cadena, y el blanco evita ...Nh5. Motor: 0,36 para el blanco, algo mejor que Bg5.",
            ],
          ],
          plans: [
            "Bd3, O-O y Rc1, y luego Ne5 o c5 según el negro; el alfil de g5 presiona la estructura de d5.",
            "Consolidar con ...c6, ...Nbd7 y ...Re8, y buscar ...Ne4 o ...b5 como contrajuego.",
          ],
          trans: [
            "Con ...c6 y ...Nbd7 la posición es un Gambito de Dama Declinado con el alfil en g2",
            "2...e6 3.Nf3 d5 sin c4 llega a un sistema Colle invertido",
          ],
          sources: [
            ["engine", "Stockfish 19, profundidad 18"],
            ["database", "Chess Cloud Database (chessdb.cn)", "https://www.chessdb.cn/"],
            ["book", "Wikipedia: English Opening", "https://en.wikipedia.org/wiki/English_Opening"],
          ],
          conf: "C",
        },
      ],
      [
        "Contra 1...c5: English simétrica",
        "Con los dos bandos fianchettando, la partida se decide en la ruptura d4 y en la columna d. El negro suele cambiar en d4 en mal momento; motor 0,43, la mejor evaluación del curso.",
        "c4 c5 Nf3 Nf6 Nc3 Nc6 g3 g6 Bg2 Bg7 O-O O-O d4 cxd4 Nxd4",
        {
          keys: [12],
          alts: [
            [
              "El negro evita la simetría con ...e6",
              "c4 c5 Nf3 Nf6 Nc3 Nc6 g3 e6 Bg2 d5 cxd5 exd5 d4",
              "El negro juega ...d5 con peón aislado potencial; motor 0,26 para el blanco, algo menos que la simétrica.",
            ],
          ],
          plans: [
            "d4, Nxd4 y presión en d5 con Bg2 y la torre en d1; el alfil de c1 sale por f4 o g5 y el otro caballo por c2.",
            "...d6, ...Bd7 y ...Qa5 o ...Nxd4 para cambiar piezas, y buscar la ruptura ...b5 en el flanco de dama.",
          ],
          trans: [
            "Si el blanco juega d5, se llega a una Benoni con colores cambiados",
            "1.c4 Nf6 2.Nc3 c5 llega a la misma posición con otro orden",
          ],
          sources: [
            ["engine", "Stockfish 19, profundidad 18"],
            ["database", "Chess Cloud Database (chessdb.cn)", "https://www.chessdb.cn/"],
            ["book", "Wikipedia: English Opening", "https://en.wikipedia.org/wiki/English_Opening"],
          ],
          conf: "C",
        },
      ],
    ],

  }),
  course({
    id: "scotch",
    name: "The Scotch Game",
    category: "white",
    side: "white",
    levels: ["beginner", "intermediate"],
    elo: "700–2000",
    tags: ["1.e4", "e5", "centro abierto"],
    summary:
      "Centro abierto desde la jugada tres, piezas activas y variantes comprensibles. La apertura perfecta para aprender a jugar posiciones simétricas.",
    chapters: [
      [
        "La Clásica: 4...Bc5 5.Be3",
        "Be3 defiende el caballo y prepara c3 y Bc4. La dama negra en f6 es una pieza que se puede atacar con Nb5 o Nc2, pero la respuesta más incómoda es ...Ne5 seguida de ...Qg6, con la que el negro iguala según la teoría.",
        "e4 e5 Nf3 Nc6 d4 exd4 Nxd4 Bc5 Be3 Qf6 c3 Nge7 Bc4",
        {
          alts: [
            [
              "7...Ne5 8.Be2 Qg6 (la respuesta más incómoda)",
              "e4 e5 Nf3 Nc6 d4 exd4 Nxd4 Bc5 Be3 Qf6 c3 Nge7 Bc4 Ne5 Be2 Qg6 O-O",
              "El caballo entra en e5 y la dama en g6; el blanco juega Re1 y Bf4 para cambiarlo. Motor: -0,29 para el negro, ligera ventaja blanca.",
            ],
            [
              "5.Nxc6 (variante Intermezzo)",
              "e4 e5 Nf3 Nc6 d4 exd4 Nxd4 Bc5 Nxc6 Qf6",
              "La dama negra ataca d4 y f2 a la vez; el blanco debe jugar con precisión para no perder un tiempo.",
            ],
          ],
          keys: [9],
          plans: [
            "Enrocar corto, Re1 y Bf4/Nd2; el empuje f4 o d4-d5 abre el centro cuando el negro ya no puede cambiar el caballo de d4.",
            "...Ne5 y ...Qg6, ...d6 y enroque: cambiar el caballo de d4 es el objetivo principal.",
          ],
          traps: [
            [
              "e4 e5 Nf3 Nc6 d4 exd4 Nxd4 Bc5 Be3 Nf6 Nxc6 bxc6 Bxc5",
              "5...Nf6?? pierde un alfil: Nxc6 seguido de Bxc5, porque el caballo de d4 ya no está clavado.",
            ],
          ],
          sources: [
            ["engine", "Stockfish 19, profundidad 18"],
            ["database", "Chess Cloud Database (chessdb.cn)", "https://www.chessdb.cn/"],
            ["book", "Wikipedia: Scotch Game, Classical Variation", "https://en.wikipedia.org/wiki/Scotch_Game"],
          ],
          conf: "C",
        },
      ],
      [
        "La Lolli: 4...Nxd4 5.Qxd4",
        "El cambio en d4 deja a la dama blanca en el centro con desarrollo rápido; la teoría llama a esta línea Lolli (por transposición). No hay cambio de damas: el blanco obtiene una ventaja pequeña y cómoda y el negro debe golpear la dama con ...Qf6 antes de desarrollarse. Motor: +1,0 para el blanco.",
        "e4 e5 Nf3 Nc6 d4 exd4 Nxd4 Nxd4 Qxd4 d6 Nc3 Nf6 Be3 Be7 O-O-O",
        {
          alts: [
            [
              "5...Qf6 golpeando la dama",
              "e4 e5 Nf3 Nc6 d4 exd4 Nxd4 Nxd4 Qxd4 Qf6 e5 Qb6",
              "El negro ataca d4 de inmediato; el blanco gana espacio con e5 y cambia en b6 (motor +0,5).",
            ],
            [
              "4...Bc5 en lugar de cambiar",
              "e4 e5 Nf3 Nc6 d4 exd4 Nxd4 Bc5 Be3 Qf6 c3 Nge7 Bc4",
              "Transposición al capítulo 1: el negro elige entre el cambio en d4 y la clásica.",
            ],
          ],
          keys: [9],
          plans: [
            "Enrocar largo, presionar d6 y abrir el centro con e5 o d5 antes de que el negro complete el desarrollo.",
            "Golpear la dama con ...Qf6, desarrollar y buscar el cambio de damas para llegar a un final sólido.",
          ],
          trans: [
            "Lolli por transposición: 4...Nxd4 5.Qxd4 también se alcanza con 1.e4 e5 2.d4 exd4 3.Qxd4 Nc6 4.Nf3",
            "4...Bc5 lleva a la clásica del capítulo 1",
          ],
          sources: [
            ["engine", "Stockfish 19, profundidad 18"],
            ["database", "Chess Cloud Database (chessdb.cn)", "https://www.chessdb.cn/"],
            ["book", "Wikipedia: Scotch Game, Lolli Variation", "https://en.wikipedia.org/wiki/Scotch_Game"],
          ],
          conf: "C",
        },
      ],
      [
        "La Schmidt: 4...Nf6 5.Nxc6",
        "La captura en c6 daña la estructura negra, pero el negro consigue actividad con ...Qe7 y ...Nd5. Las blancas deben jugar e5 con precisión; la línea moderna 6.Qe2 evita debilitar d4 y mantiene la igualdad.",
        "e4 e5 Nf3 Nc6 d4 exd4 Nxd4 Nf6 Nxc6 bxc6 e5 Qe7 Qe2 Nd5 c4 Ba6",
        {
          alts: [
            [
              "6.Qe2 (línea moderna)",
              "e4 e5 Nf3 Nc6 d4 exd4 Nxd4 Nf6 Nxc6 bxc6 e5 Qe7 Qe2 Nd5 c4 Nb6 Nc3",
              "La dama apoya e5 sin debilitar d4; el caballo de b6 queda pasivo. Motor: 0,00.",
            ],
          ],
          keys: [11],
          plans: [
            "Jugar contra el peón doblado de c6, cambiar el caballo de d5 y llevar el rey a un final cómodo.",
            "...Nd5 y ...Ba6 para activar piezas; el peón de e5 es el objetivo a largo plazo.",
          ],
          trans: ["5.Nc3 lleva a los Cuatro Caballos, variante Scotch"],
          sources: [
            ["engine", "Stockfish 19, profundidad 18"],
            ["database", "Chess Cloud Database (chessdb.cn)", "https://www.chessdb.cn/"],
            ["book", "Wikipedia: Scotch Game, Schmidt Variation", "https://en.wikipedia.org/wiki/Scotch_Game"],
          ],
          conf: "C",
        },
      ],
    ],
  }),
  course({
    id: "italian-aggressive",
    name: "Aggressive Italian Game",
    category: "white",
    side: "white",
    levels: ["intermediate", "advanced"],
    elo: "1000–2200",
    tags: ["1.e4", "e5", "gambito", "Max Lange"],
    summary:
      "El Italian con intención: 4.c3 y d4 para abrir el centro, el Max Lange y el Deutz. Sacrificios tempranos con líneas concretas.",
    chapters: [
      [
        "El centro con 4.c3 y 5.d4",
        "La ruptura d4 se prepara con c3. Después del cambio, las blancas aceptan un peón de menos a cambio de desarrollo masivo y la columna d abierta; el negro tiene que devolver material o defenderse con precisión. Motor: igualdad, pero con más margen de error para el negro.",
        "e4 e5 Nf3 Nc6 Bc4 Bc5 c3 Nf6 d4 exd4 cxd4 Bb4+ Nc3 Nxe4 O-O Bxc3 d5",
        {
          alts: [
            [
              "5...exd4 6.cxd4 Bb4+ (orden principal)",
              "e4 e5 Nf3 Nc6 Bc4 Bc5 c3 Nf6 d4 exd4 cxd4 Bb4+ Bd2 Bxd2+ Nbxd2 d5",
              "El cambio de alfiles lleva a una posición simétrica donde el blanco conserva la iniciativa (motor +0,11).",
            ],
            [
              "4...Nf6 sin abrir el centro",
              "e4 e5 Nf3 Nc6 Bc4 Bc5 c3 Nf6 d3 d6 O-O O-O Re1",
              "Si el negro no cambia en d4, el plan es d3, Re1 y Nbd2 con el empuje d4 preparado (motor -0,25).",
            ],
          ],
          keys: [7, 13],
          plans: [
            "Enrocar corto, Re1, Bg5 y empuje d5 para abrir líneas contra el rey; el alfil de c4 y la columna d son las piezas clave.",
            "Devolver el peón con ...d5, cambiar alfiles y llegar a un final sin debilidades.",
          ],
          trans: [
            "Transpone al Giuoco Piano clásico y, si el blanco juega 4.c3 tras 3.d4 exd4, al Gambito Escocés",
            "4.O-O Nf6 5.d4 lleva al Max Lange del capítulo 2",
          ],
          sources: [
            ["engine", "Stockfish 19, profundidad 18"],
            ["database", "Chess Cloud Database (chessdb.cn)", "https://www.chessdb.cn/"],
            ["book", "Wikipedia: Italian Game, Giuoco Piano", "https://en.wikipedia.org/wiki/Italian_Game"],
          ],
          conf: "C",
        },
      ],
      [
        "El Max Lange Attack",
        "Con 5.O-O las blancas ofrecen el peón d4 para abrir líneas. La clave es la iniciativa sobre f7 y la torre en e1 antes de recuperar material: 9...Qxf6?? pierde ante Nxe6, y por eso la teoría juega 9...Qd5 con enroque largo. Motor: +0,3 para el blanco.",
        "e4 e5 Nf3 Nc6 Bc4 Nf6 d4 exd4 O-O Bc5 e5 d5 exf6 dxc4 Re1+ Be6 Ng5 Qd5 Nc3 Qf5 Nce4 O-O-O",
        {
          alts: [
            [
              "9.fxg7 Rg8 10.Bg5 (línea de Gutman)",
              "e4 e5 Nf3 Nc6 Bc4 Nf6 d4 exd4 O-O Bc5 e5 d5 exf6 dxc4 Re1+ Be6 fxg7 Rg8 Bg5 Be7",
              "Gutman y Bücker la consideran buena para el blanco; el motor la ve igualada: iniciativa a cambio del peón.",
            ],
            [
              "5...Nxe4 (aceptar el gambito)",
              "e4 e5 Nf3 Nc6 Bc4 Nf6 d4 exd4 O-O Nxe4 Re1 d5 Bxd5 Qxd5 Nc3",
              "Si el negro toma en e4, Re1 y Nc3 explotan la clavada sobre la dama y el rey en el centro (motor 0,00).",
            ],
          ],
          keys: [13, 17],
          plans: [
            "Recuperar el peón en c4/d4 con la torre en e1 y el caballo en e4; atacar f7 y el rey que se queda sin enrocar.",
            "Devolver material en el momento justo, enrocar largo y cambiar piezas para neutralizar la iniciativa.",
          ],
          traps: [
            [
              "e4 e5 Nf3 Nc6 Bc4 Nf6 d4 exd4 O-O Bc5 e5 d5 exf6 dxc4 Re1+ Be6 Ng5 Qxf6 Nxe6 fxe6 Qh5+",
              "9...Qxf6?? es la trampa clásica: Nxe6 fxe6 Qh5+ y el blanco gana; el motor da -4,9 para el negro.",
            ],
          ],
          games: [
            ["Vatter–Nunn, 1986 (½–½)", "Wikipedia: Max Lange Attack (partida completa)"],
          ],
          sources: [
            ["engine", "Stockfish 19, profundidad 18"],
            ["database", "Chess Cloud Database (chessdb.cn)", "https://www.chessdb.cn/"],
            ["book", "Wikipedia: Max Lange Attack", "https://en.wikipedia.org/wiki/Max_Lange_Attack"],
          ],
          conf: "C",
        },
      ],
      [
        "El Deutz Gambit",
        "Después de 4.O-O y 5.d4, la captura en d4 entrega el centro. f4 y Bg5 generan amenazas antes de que el negro enroque; el motor da una ligera ventaja al negro (+0,3), así que la compensación es de iniciativa, no de material.",
        "e4 e5 Nf3 Nc6 Bc4 Bc5 O-O Nf6 d4 Bxd4 Nxd4 Nxd4 f4 d6 fxe5 dxe5 Bg5",
        {
          alts: [
            [
              "5...exd4 sin aceptar el sacrificio",
              "e4 e5 Nf3 Nc6 Bc4 Bc5 O-O Nf6 d4 exd4 e5 d5 exf6 dxc4 Re1+ Be6",
              "Si el negro no toma en d4, la partida transpone al Max Lange del capítulo 2.",
            ],
            [
              "4...Nf6 5.d3: Italian clásico",
              "e4 e5 Nf3 Nc6 Bc4 Bc5 O-O Nf6 d3 d6 c3",
              "Sin gambito, el plan es c3 y d4 con desarrollo completo (motor -0,26 para el negro).",
            ],
          ],
          keys: [9],
          plans: [
            "Abrir la columna f, cambiar el caballo de d4 y atacar e5 con Bg5 y Re1.",
            "Devolver material, enrocar y cambiar damas; el peón de más no vale si el rey queda en el centro.",
          ],
          sources: [
            ["engine", "Stockfish 19, profundidad 18"],
            ["database", "Chess Cloud Database (chessdb.cn)", "https://www.chessdb.cn/"],
            ["book", "Wikipedia: Italian Game, Deutz Gambit", "https://en.wikipedia.org/wiki/Italian_Game"],
          ],
          conf: "C",
        },
      ],
    ],
  }),
  course({
    id: "ruy-lopez",
    name: "Aggressive Ruy Lopez",
    category: "white",
    side: "white",
    levels: ["intermediate", "advanced"],
    elo: "1200–2200",
    tags: ["1.e4", "e5", "d4 temprano"],
    summary:
      "La Española con empuje central inmediato: 5.d4 contra la Berlinesa y armas prácticas contra la Jaenisch y las variantes menores.",
    chapters: [
      [
        "El empuje d4 contra 3...a6",
        "En lugar de la maniobra lenta Re1, las blancas rompen el centro de inmediato. A cambio aceptan un peón aislado y un juego de piezas muy activas; el motor da igualdad y la ventaja es práctica: posiciones abiertas sin teoría larga.",
        "e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 d4 exd4 O-O Be7 e5 Ne4 Nxd4 O-O Nf5",
        {
          alts: [
            [
              "5...b5 6.Bb3 exd4 (otro orden)",
              "e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 d4 b5 Bb3 exd4 e5 Ne4 Nxd4",
              "El negro gana espacio en el flanco de dama; el blanco sigue con e5 y Nxd4. Motor: -0,25 para el negro.",
            ],
            [
              "5...Nxe4 en lugar de ...exd4",
              "e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 d4 Nxe4 O-O Be7 Re1",
              "Tomar en e4 permite Re1 y Bxc6: la clavada sobre e5 da la iniciativa al blanco (motor -0,60 para el negro).",
            ],
          ],
          keys: [9],
          plans: [
            "Enrocar, Re1 y presionar e5; el caballo de f5 y la columna e son la clave, aunque el peón de d4 quede atrasado.",
            "Cambiar en d4 para dejar un peón aislado, enrocar y contraatacar con ...d5 o ...f6.",
          ],
          trans: ["5.d4 aparece también en líneas abiertas de la Española con ...exd4 y en la Defensa de los Dos Caballos"],
          sources: [
            ["engine", "Stockfish 19, profundidad 18"],
            ["database", "Chess Cloud Database (chessdb.cn)", "https://www.chessdb.cn/"],
            ["book", "Teoría estándar de la Española: 5.d4 contra 3...a6"],
          ],
          conf: "B",
        },
      ],
      [
        "Contra la Jaenisch: 3...f5",
        "El contragambito más directo, también llamado Schliemann. No es un gambito de verdad: el caballo de c6 defiende e5 y ...Qd4 recupera el peón. La teoría llega hasta 13...Be6 con ligera ventaja blanca (⩲), y el motor coincide (+0,26).",
        "e4 e5 Nf3 Nc6 Bb5 f5 Nc3 fxe4 Nxe4 d5 Nxe5 dxe4 Nxc6 Qg5 Qe2 Nf6 f4 Qxf4 Ne5+ c6 d4 Qh4+ g3 Qh3 Bc4 Be6",
        {
          alts: [
            [
              "4.d3 (línea tranquila)",
              "e4 e5 Nf3 Nc6 Bb5 f5 d3 fxe4 dxe4 Nf6 O-O",
              "Recapturar con peón evita el sacrificio de caballo; el negro iguala con ...d6 y ...Be7.",
            ],
            [
              "4.exf5?! y el contragolpe ...e4",
              "e4 e5 Nf3 Nc6 Bb5 f5 exf5 e4 Qe2 Qe7",
              "Tomar el peón permite ...e4: el caballo de f3 no tiene casillas y la partida acaba en tablas por repetición.",
            ],
          ],
          keys: [9, 15, 21],
          plans: [
            "Aprovechar la debilidad de e5 y la columna e; cambiar en c6 para dejar peones doblados y jugar f4.",
            "Usar la columna f y la pareja de alfiles; ...Qh4+ para molestar al rey y ...c6 para frenar el caballo.",
          ],
          sources: [
            ["engine", "Stockfish 19, profundidad 18"],
            ["database", "Chess Cloud Database (chessdb.cn)", "https://www.chessdb.cn/"],
            ["book", "Wikibooks: Ruy Lopez 3...f5 (Jaenisch / Schliemann)", "https://en.wikibooks.org/wiki/Chess_Opening_Theory/1._e4/1...e5/2._Nf3/2...Nc6/3._Bb5/3...f5"],
          ],
          conf: "C",
        },
      ],
      [
        "Contra la Berlinesa: 3...Nf6",
        "La variante sólida por excelencia. Con d3 y c3 las blancas construyen el centro sin prisas y reservan el plan de Re1 y Nbd2; el negro iguala con ...d6 y ...Ne7. Motor: -0,22, ligerísima ventaja blanca.",
        "e4 e5 Nf3 Nc6 Bb5 Nf6 d3 Bc5 c3 O-O O-O d6 Re1",
        {
          alts: [
            [
              "3...a6 primero (transposición)",
              "e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 d3 b5 Bb3 Bc5 c3 d6 O-O",
              "El mismo esquema con el alfil en b3; el negro gana espacio en el flanco de dama (motor -0,06).",
            ],
            [
              "4.O-O y la Berlinesa abierta",
              "e4 e5 Nf3 Nc6 Bb5 Nf6 O-O Nxe4 d4 Nd6 Bxc6 dxc6 dxe5 Nf5",
              "La línea principal: cambio de damas y final del Muro de Berlín, donde el blanco apenas pasa de tablas (motor +0,17).",
            ],
          ],
          keys: [7],
          plans: [
            "Enrocar, Nbd2, Re1 y empuje d4 cuando el negro haya comprometido piezas; la pareja de alfiles es la ventaja a largo plazo.",
            "...d6, ...Ne7 y ...Ng6 para cambiar piezas; el negro busca el final sin debilidades.",
          ],
          games: [
            ["Kramnik–Kasparov, Campeonato del Mundo 2000: el Muro de Berlín", "Wikibooks: Berlin defence (historia)"],
          ],
          sources: [
            ["engine", "Stockfish 19, profundidad 18"],
            ["database", "Chess Cloud Database (chessdb.cn)", "https://www.chessdb.cn/"],
            ["book", "Wikibooks: Ruy Lopez 3...Nf6 (Berlin defence)", "https://en.wikibooks.org/wiki/Chess_Opening_Theory/1._e4/1...e5/2._Nf3/2...Nc6/3._Bb5/3...Nf6"],
          ],
          conf: "C",
        },
      ],
    ],
  }),
  course({
    id: "danish",
    name: "The Danish Gambit",
    category: "white",
    side: "white",
    levels: ["beginner", "intermediate"],
    elo: "600–1800",
    tags: ["gambito", "1.e4", "e5", "C21"],
    summary:
      "Dos peones por desarrollo y dos alfiles apuntando a f7. El motor da +0,55 al blanco en la línea principal: la compensación es real, pero es una ventaja pequeña, no una demolición.",
    chapters: [
      [
        "El gambito de los tres peones",
        "Las blancas entregan b2 y c3 para colocar los alfiles en c4 y b2. El negro devuelve material con ...d5 y el final de alfiles deja +0,55 al blanco: iniciativa y dos alfiles, no mate inmediato.",
        "e4 e5 d4 exd4 c3 dxc3 Bc4 cxb2 Bxb2 d5 Bxd5 Nf6 Bxf7+ Kxf7 Qxd8 Bb4+ Qd2 Bxd2+ Nxd2 c6",
        {
          alts: [
            [
              "5...Nf6, la defensa que prefiere el motor",
              "e4 e5 d4 exd4 c3 dxc3 Bc4 cxb2 Bxb2 Nf6",
              "La teoría sigue jugando ...d5, pero el motor da +0,60 al **negro** con ...Nf6: se documenta la discrepancia y no se cambia la línea de libro.",
            ],
            [
              "7.Bxd5 sin sacrificar en f7",
              "e4 e5 d4 exd4 c3 dxc3 Bc4 cxb2 Bxb2 d5 Bxd5 Nf6",
              "Posición 0,00: sin Bxf7+ el blanco conserva los dos peones de ventaja pero el negro completa el desarrollo. Es la alternativa tranquila.",
            ],
          ],
          keys: [11, 13],
          plans: [
            "Jugar f4 y Ngf3 con la columna f abierta, cambiar en f6 y llevar el rey a e2 para activar la torre de h1.",
            "Devolver el peón en d5, cambiar damas y llegar a un final con el rey en f7 y la torre de h8 conectada.",
          ],
          trans: ["3...d5 sin aceptar es el capítulo 2", "2.Nf3 y 3.d4 con ...Nc6 es el Gambito Goring (capítulo 3)"],
          games: [
            [
              "El gambito lo popularizó el danés Martin Severin From en el siglo XIX; Wikipedia recoge su historia en Danish Gambit",
              "Wikipedia: Danish Gambit",
            ],
          ],
          sources: [
            ["engine", "Stockfish 19, profundidad 18"],
            ["database", "Chess Cloud Database (chessdb.cn)", "https://www.chessdb.cn/"],
            ["book", "Wikipedia: Danish Gambit (C21)", "https://en.wikipedia.org/wiki/Danish_Gambit"],
          ],
          conf: "B",
        },
      ],
      [
        "Contra 3...d5 (rechazo central)",
        "Si el negro devuelve el peón y ocupa el centro, el juego se vuelve posicional: cxd4, Nf3 y Be2 con presión en la columna e. Motor: +0,19 negro, el rechazo iguala.",
        "e4 e5 d4 exd4 c3 d5 exd5 Qxd5 cxd4 Nc6 Nf3 Bg4 Be2",
        {
          keys: [9],
          plans: [
            "O-O, Nc3 y Rc1 contra la dama de d5; cambiar alfiles y jugar d5 en el momento justo.",
            "...Bxf3 y ...Bb4+ para cambiar piezas, ...O-O-O y presión en d4.",
          ],
          sources: [
            ["engine", "Stockfish 19, profundidad 18"],
            ["database", "Chess Cloud Database (chessdb.cn)", "https://www.chessdb.cn/"],
            ["book", "Wikipedia: Danish Gambit, 3...d5", "https://en.wikipedia.org/wiki/Danish_Gambit"],
          ],
          conf: "B",
        },
      ],
      [
        "El Gambito Goring",
        "Transposición por 2.Nf3 y 3.d4: las blancas recuperan el peón con Nxc3 y juegan Bc4 y Qb3 buscando f7 y b7 a la vez. Motor: **+1,51 blanco**, la mejor línea del curso.",
        "e4 e5 Nf3 Nc6 d4 exd4 c3 dxc3 Nxc3 d6 Bc4 Be7 Qb3",
        {
          alts: [
            [
              "4...Nf6 en lugar de ...d6",
              "e4 e5 Nf3 Nc6 d4 exd4 c3 Nf6",
              "El negro desarrolla en lugar de tomar c3; el blanco recupera d4 con ventaja de espacio.",
            ],
          ],
          keys: [7, 13],
          plans: [
            "Qb3 contra f7 y b7, Bxf7+ si el rey no está listo, y O-O con la columna f para la torre.",
            "...Na5 para cambiar el alfil de c4, ...Be6 y ...Qd7; enrocar corto solo cuando f7 esté defendido.",
          ],
          games: [
            [
              "La variante lleva el nombre de Carl Goring, que la jugó en el siglo XIX; Wikipedia la recoge en Danish Gambit",
              "Wikipedia: Danish Gambit",
            ],
          ],
          sources: [
            ["engine", "Stockfish 19, profundidad 18"],
            ["database", "Chess Cloud Database (chessdb.cn)", "https://www.chessdb.cn/"],
            ["book", "Wikipedia: Danish Gambit, Gambito Goring", "https://en.wikipedia.org/wiki/Danish_Gambit"],
          ],
          conf: "B",
        },
      ],
    ],
  }),
  course({
    id: "e4-sicilian",
    name: "1.e4 Part 2: Sicilian",
    category: "white",
    side: "white",
    levels: ["intermediate"],
    elo: "900–2100",
    tags: ["Siciliana", "Mengarini", "2.a3"],
    summary:
      "Un sistema con 2.a3 y b4 que evita la teoría interminable de las líneas principales: práctico y poco explorado, con una evaluación honesta de lo que concede y de lo que no.",
    chapters: [
      [
        "La Mengarini: 2.a3 y 3.b4",
        "a3 y b4 atacan el caballo de c6 y obligan al negro a decidir la estructura antes de tiempo. Las blancas entregan el peón b a cambio de centro y desarrollo; el motor da +0,3 al blanco, así que la compensación es real pero pequeña.",
        "e4 c5 a3 Nc6 b4 cxb4 axb4 Nxb4 c3 Nc6 d4 d5 exd5 Qxd5 Na3",
        {
          alts: [
            [
              "3...d5 antes de ...cxb4",
              "e4 c5 a3 d5 exd5 Qxd5 Nc3 Qd8 Nf3 Nf6 Bc4 e6 O-O Be7",
              "Si el negro golpea el centro primero, la partida va al capítulo 3: dama a d8, Nc3 y Bc4 contra la dama expuesta.",
            ],
            [
              "2...g6: doble fianchetto blanco",
              "e4 c5 a3 g6 Nc3 Bg7 g3 d6 Bg2 Nc6 Nge2",
              "Contra el fianchetto, el plan bueno es g3 y Bg2 (capítulo 2). Empujar b4 antes pierde un tiempo.",
            ],
          ],
          keys: [5, 7, 14],
          plans: [
            "Cambiar en d5, desarrollar Nc3/Bc4/Nf3 y presionar d4-d5; el peón b es el precio del centro.",
            "Aceptar el peón y devolverlo en el momento justo; ...d5 y el desarrollo rápido neutralizan el centro blanco.",
          ],
          trans: [
            "2...d5 transpone al capítulo 3 y, si el negro juega ...e6/...Nf6, a estructuras de Francesa",
            "3.b4 también se llega desde 1.e4 c5 2.b4 (ala de buey)",
          ],
          sources: [
            ["engine", "Stockfish 19, profundidad 18"],
            ["database", "Chess Cloud Database (chessdb.cn)", "https://www.chessdb.cn/"],
            ["book", "Wikipedia: Sicilian Defence (sistemas anti-Sicilianas)", "https://en.wikipedia.org/wiki/Sicilian_Defence"],
          ],
          conf: "B",
        },
      ],
      [
        "Contra 2...g6: doble fianchetto, no b4",
        "El fianchetto negro cambia el plan: 3.b4 permite ...Bg7 y ...d5 con ventaja clara para el negro (+0,9 en el motor). Lo correcto es g3, Bg2 y Nge2, con presión sobre d5 y una posición igualada (+0,2 para el negro).",
        "e4 c5 a3 g6 Nc3 Bg7 g3 d6 Bg2 Nc6 Nge2",
        {
          alts: [
            [
              "3.b4?! Bg7 4.Nc3 Nf6 5.Nf3 O-O 6.Bb2 (la línea que no funciona)",
              "e4 c5 a3 g6 b4 Bg7 Nc3 Nf6 Nf3 O-O Bb2 d6 d4 cxd4 Nxd4",
              "El blanco empuja b4 antes de tiempo y el negro enroca y juega ...d5: el motor da +0,9 al negro. Se estudia para saber qué evitar.",
            ],
          ],
          keys: [5, 9],
          plans: [
            "Fianchetto en g2, Nge2 y empuje d4 o f4 según el enroque negro; el alfil de g2 presiona d5.",
            "...d5 para abrir el centro antes de que el blanco complete el desarrollo; el alfil de g7 defiende el rey.",
          ],
          trans: ["Transpone a estructuras de Dragón acelerado con colores invertidos si el blanco juega d4 muy pronto"],
          sources: [
            ["engine", "Stockfish 19, profundidad 18"],
            ["database", "Chess Cloud Database (chessdb.cn)", "https://www.chessdb.cn/"],
            ["book", "Wikipedia: Sicilian Defence (fianchetto negro)", "https://en.wikipedia.org/wiki/Sicilian_Defence"],
          ],
          conf: "A",
        },
      ],
      [
        "Contra 2...d5",
        "El negro ataca e4 de inmediato; las blancas cambian en d5 y Nc3 gana un tiempo sobre la dama. Con ...Qd8 el blanco desarrolla con d3, Nf3, Be2 y enroque: la partida queda igualada (+0,2). Empujar d4 demasiado pronto (o sacar Bc4) cede el peón e4 al caballo negro.",
        "e4 c5 a3 d5 exd5 Qxd5 Nc3 Qd8 d3 Nf6 Nf3 e6",
        {
          alts: [
            [
              "4...Qd6 en lugar de ...Qd8",
              "e4 c5 a3 d5 exd5 Qxd5 Nc3 Qd6 d4 Nf6 Nf3 Bg4 Be2",
              "La dama en d6 se expone a d4 y Be3: el motor da +0,9 al blanco. Por eso la principal es ...Qd8.",
            ],
            [
              "5.d3 (versión sólida)",
              "e4 c5 a3 d5 exd5 Qxd5 Nc3 Qd8 d3 Nf6 Nf3 e6",
              "Sin d4 inmediato, el blanco desarrolla y enroca: posición igualada (+0,2).",
            ],
          ],
          keys: [5, 9],
          plans: [
            "Jugar d4 con tempo, Be3 y Qd2; la dama negra en d8 es una pieza pasiva.",
            "Cambiar en d4 para dejar el centro abierto y buscar el cambio de damas.",
          ],
          trans: ["2...d5 3.exd5 Qxd5 es la misma estructura que el capítulo 3 de este curso"],
          sources: [
            ["engine", "Stockfish 19, profundidad 18"],
            ["database", "Chess Cloud Database (chessdb.cn)", "https://www.chessdb.cn/"],
            ["book", "Wikipedia: Sicilian Defence, 2...d5", "https://en.wikipedia.org/wiki/Sicilian_Defence"],
          ],
          conf: "C",
        },
      ],
    ],
  }),
  course({
    id: "e4-parts3",
    name: "1.e4 Part 3: Caro etc",
    category: "white",
    side: "white",
    levels: ["intermediate"],
    elo: "900–2100",
    tags: ["Caro-Kann", "Francesa", "Pirc", "escandinava"],
    summary:
      "Cierre del repertorio de 1.e4: respuestas directas contra la Caro-Kann, la Francesa, la Pirc/Moderna y la Escandinava.",
    chapters: [
      [
        "Contra la Caro-Kann: 3.Nc3 y 4.Nxe4",
        "La captura en e4 es la línea más natural. Ng3, h4 y Nf3 presionan el alfil de f5 y ganan espacio en el flanco de rey; el motor da +0,4 al blanco.",
        "e4 c6 d4 d5 Nc3 dxe4 Nxe4 Bf5 Ng3 Bg6 h4 h6 Nf3 e6 h5",
        {
          alts: [
            [
              "5...Nd7 (orden alternativo)",
              "e4 c6 d4 d5 Nc3 dxe4 Nxe4 Bf5 Ng3 Bg6 h4 h6 Nf3 Nd7 h5 Bh7 Bd3 Bxd3 Qxd3 e6",
              "El negro desarrolla el caballo a d7 antes de ...e6; el blanco responde con Bd3 y Qxd3 igual de cómodo (+0,4).",
            ],
          ],
          keys: [9, 13],
          plans: [
            "h5 para fijar el alfil de g6, Bd3 para cambiarlo y enrocar largo o corto según dónde esté el rey negro.",
            "...e6 y ...Nf6 para desarrollar; cambiar el alfil de g6 o jugar ...c5 contra el centro.",
          ],
          sources: [
            ["engine", "Stockfish 19, profundidad 18"],
            ["database", "Chess Cloud Database (chessdb.cn)", "https://www.chessdb.cn/"],
            ["book", "Wikipedia: Caro-Kann Defence, Classical Variation", "https://en.wikipedia.org/wiki/Caro%E2%80%93Kann_Defence"],
          ],
          conf: "C",
        },
      ],
      [
        "Contra la Francesa: 3.Nc3 y 4.e5",
        "El avance e5 gana espacio y fija el centro. f4 y Nf3 construyen la cadena mientras el alfil de c8 sigue encerrado; motor +0,5 blanco.",
        "e4 e6 d4 d5 Nc3 Nf6 e5 Nfd7 f4 c5 Nf3 Nc6 Be3",
        {
          alts: [
            [
              "5...c5 antes de ...Nc6",
              "e4 e6 d4 d5 Nc3 Nf6 e5 Nfd7 f4 c5 Nf3 cxd4 Nb5",
              "El negro rompe el centro antes de desarrollar; el blanco va a d4 con Nb5 y conserva la iniciativa.",
            ],
          ],
          keys: [9],
          plans: [
            "Be3, Qd2 y 0-0-0 o enroque corto; atacar e6 con f5 y llevar el caballo a e2-g3.",
            "...c5 y ...Nc6 contra d4; ...Be7 y ...0-0 para sobrevivir al ataque.",
          ],
          sources: [
            ["engine", "Stockfish 19, profundidad 18"],
            ["database", "Chess Cloud Database (chessdb.cn)", "https://www.chessdb.cn/"],
            ["book", "Wikipedia: French Defence, Steinitz Variation", "https://en.wikipedia.org/wiki/French_Defence"],
          ],
          conf: "C",
        },
      ],
      [
        "Contra la Pirc y la Moderna",
        "Sistema clásico: Be3, Qd2, f3 y 0-0-0 para atacar en el flanco de rey mientras el negro fianchetta. Motor +0,3 blanco; 6.f3 es la jugada del ataque, aunque el motor prefiere 6.Nf3 por 0,3.",
        "e4 d6 d4 Nf6 Nc3 g6 Be3 Bg7 Qd2 c6 f3 b5 O-O-O",
        {
          alts: [
            [
              "6.Nf3 en lugar de 6.f3",
              "e4 d6 d4 Nf6 Nc3 g6 Be3 Bg7 Qd2 c6 Nf3 b5 O-O-O",
              "La misma idea sin debilitar e3: el blanco enroca largo y juega Bh6.",
            ],
          ],
          keys: [11],
          plans: [
            "Bh6 para cambiar el alfil de g7, h4-h5 y, si el negro enroca corto, sacrificios en h5.",
            "...b5 y ...Nbd7 para contraatacar en el flanco de dama; ...c5 contra d4.",
          ],
          sources: [
            ["engine", "Stockfish 19, profundidad 18"],
            ["database", "Chess Cloud Database (chessdb.cn)", "https://www.chessdb.cn/"],
            ["book", "Wikipedia: Pirc Defence, Austrian Attack", "https://en.wikipedia.org/wiki/Pirc_Defence"],
          ],
          conf: "C",
        },
      ],
      [
        "Contra la Escandinava",
        "Después de 2.exd5 Qxd5 3.Nc3, la dama negra pierde tiempos. d4, Nf3 y Bc4 construyen un centro fuerte con desarrollo libre; motor +0,3 blanco.",
        "e4 d5 exd5 Qxd5 Nc3 Qa5 d4 Nf6 Nf3 Bf5 Bc4 e6 O-O",
        {
          alts: [
            [
              "3...Qd6 en lugar de ...Qa5",
              "e4 d5 exd5 Qxd5 Nc3 Qd6 d4 Nf6 Nf3 a6 Bc4",
              "La dama en d6 permite ...Nc6 y ...Bg4 con tempo; el blanco sigue con Bc4 y enroque.",
            ],
          ],
          keys: [5],
          plans: [
            "Bc4, Re1 y d5 para abrir líneas; el peón de más en el centro es la baza a largo plazo.",
            "...Qa5 y ...Bg4 para cambiar piezas; ...c6 y ...e6 para llegar a un final sólido.",
          ],
          sources: [
            ["engine", "Stockfish 19, profundidad 18"],
            ["database", "Chess Cloud Database (chessdb.cn)", "https://www.chessdb.cn/"],
            ["book", "Wikipedia: Scandinavian Defence", "https://en.wikipedia.org/wiki/Scandinavian_Defense"],
          ],
          conf: "C",
        },
      ],
    ],
  }),
  course({    id: "trompowsky",
    name: "The Trompowsky Attack",
    category: "white",
    side: "white",
    levels: ["intermediate", "advanced"],
    elo: "1000–2200",
    tags: ["1.d4", "Bg5", "offbeat"],
    summary:
      "Bg5 en la segunda jugada para salir de los caminos conocidos: el blanco cambia el alfil de f6 o lo mantiene según lo que haga el negro. El motor da 0,02 en la línea principal, 0,59 contra ...e6 y 0,88 contra ...d5.",
    chapters: [
      [
        "2.Bg5 y el caballo en e4",
        "La clavada obliga al negro a decidir. Si salta a e4, Bf4 y f3 lo devuelven a f6 con pérdida de tiempo, y el blanco construye el centro con e4; motor 0,02, igualdad.",
        "d4 Nf6 Bg5 Ne4 Bf4 d5 f3 Nf6 e4",
        {
          keys: [4, 6],
          alts: [
            [
              "3.Bh4, mantener la clavada",
              "d4 Nf6 Bg5 Ne4 Bh4 d5 f3 Nf6 e4",
              "El alfil se queda en la diagonal pero permite ...dxe4 y el blanco no recupera el tiempo. Motor: 0,23 para el negro, peor que Bf4.",
            ],
            [
              "3...c5 contra el centro",
              "d4 Nf6 Bg5 Ne4 Bf4 c5 f3 Qa5+ c3 Nf6 d5 Qb6",
              "El negro cambia de plan y ataca d4 en lugar de ceder el tiempo. Motor: 0,52 para el blanco, porque la dama negra acaba expuesta en b6.",
            ],
          ],
          plans: [
            "e4, Nc3 y Bd3: el centro con dos peones es la ventaja del blanco; si el negro cambia en e4, recapturar con peón y abrir la columna.",
            "Jugar ...d5 y ...c5 contra d4, cambiar el alfil de f4 con ...Bd6 si se puede y buscar ...Qa5+ para activar la dama.",
          ],
          trans: [
            "1.d4 Nf6 2.Bg5 e6 3.e4 llega al capítulo 2 con ...Ne4 ya descartado",
            "Si el negro juega ...g6, la posición pasa a un sistema con fianchetto tipo Rey Indio",
          ],
          sources: [
            ["engine", "Stockfish 19, profundidad 18"],
            ["database", "Chess Cloud Database (chessdb.cn)", "https://www.chessdb.cn/"],
            ["book", "Wikipedia: Trompowsky Attack", "https://en.wikipedia.org/wiki/Trompowsky_Attack"],
          ],
          conf: "C",
        },
      ],
      [
        "Contra 2...e6",
        "El negro rompe la clavada con ...e6. El blanco cambia en f6 para dañar la estructura y juega e4 con iniciativa central: la dama negra en f6 queda expuesta a Nc3 y Qd2. Motor: 0,59 para el blanco.",
        "d4 Nf6 Bg5 e6 e4 h6 Bxf6 Qxf6 Nc3 d6 Qd2 g6",
        {
          keys: [6, 10],
          alts: [
            [
              "5.Bh4?? g5: el alfil enterrado",
              "d4 Nf6 Bg5 e6 e4 h6 Bh4 g5 Bg3 Nxe4",
              "El negro gana un peón y el alfil queda tapado: motor 1,37 para el negro. Es exactamente la razón por la que el blanco cambia en f6.",
            ],
          ],
          plans: [
            "f4, Nf3 y Bd3 contra el enroque corto negro; el cambio en f6 dejó a la dama negra en una casilla incómoda.",
            "Jugar ...d6, ...g6 y ...Bg7 para reorganizar, y buscar ...e5 o ...d5 en el centro.",
          ],
          trans: [
            "Con ...d5 antes de ...h6 se llega al capítulo 3",
            "Si el negro no juega ...h6, el blanco puede mantener el alfil con Bh4 y evitar el cambio",
          ],
          sources: [
            ["engine", "Stockfish 19, profundidad 18"],
            ["database", "Chess Cloud Database (chessdb.cn)", "https://www.chessdb.cn/"],
            ["book", "Wikipedia: Trompowsky Attack", "https://en.wikipedia.org/wiki/Trompowsky_Attack"],
          ],
          conf: "C",
        },
      ],
      [
        "Contra 2...d5",
        "Si el negro defiende el caballo con ...d5, el cambio en f6 dobla los peones negros y deja el flanco de rey sin coordinación. Motor: 0,88 para el blanco, la mejor evaluación del curso, porque el negro no puede activar su pareja de alfiles.",
        "d4 Nf6 Bg5 d5 Bxf6 exf6 e3 Bd6 c4 c6 Nc3 O-O",
        {
          keys: [4, 8],
          alts: [
            [
              "...gxf6 en lugar de ...exf6",
              "d4 Nf6 Bg5 d5 Bxf6 gxf6",
              "El negro conserva la cadena de peones pero abre la columna g contra su propio rey y debilita e6; la teoría prefiere ...exf6 aunque doble peones.",
            ],
          ],
          plans: [
            "c4 y Nc3 contra d5, Bd3 y O-O, y presión en la columna c; los peones doblados de f6 son un objetivo a largo plazo.",
            "Jugar ...c6, ...Bd6 y ...O-O, y liberarse con ...f5 o ...c5 antes de que el blanco complete el desarrollo.",
          ],
          trans: [
            "Con ...c6 y ...Bd6 llega a una estructura de Caro-Kann con el alfil de f6 doblado",
            "Si el blanco juega e4 sin c4, la posición pasa a un sistema con centro de peones",
          ],
          sources: [
            ["engine", "Stockfish 19, profundidad 18"],
            ["database", "Chess Cloud Database (chessdb.cn)", "https://www.chessdb.cn/"],
            ["book", "Wikipedia: Trompowsky Attack", "https://en.wikipedia.org/wiki/Trompowsky_Attack"],
          ],
          conf: "C",
        },
      ],
    ],

  }),
  course({
    id: "smith-morra",
    name: "The Smith-Morra Gambit",
    category: "white",
    side: "white",
    levels: ["beginner", "intermediate"],
    elo: "700–1900",
    tags: ["gambito", "Siciliana", "c3"],
    summary:
      "Un peón por un desarrollo perfecto contra la Siciliana. Bc4 y Qe2 apuntan a e6 y f7 mientras el negro intenta sobrevivir.",
    chapters: [
      [
        "La Morra aceptada",
        "Las blancas entregan el peón c3 a cambio de las columnas c y d, Nc3 y Bc4. El plan es Qe2, Rfd1 y Rac1, con presión constante. El motor da +0,6 al negro en la línea principal: la compensación es práctica y peligrosa, no una ventaja objetiva.",
        "e4 c5 d4 cxd4 c3 dxc3 Nxc3 Nc6 Nf3 e6 Bc4 a6 O-O Nge7 Qe2 b5 Bb3",
        {
          alts: [
            [
              "9.Bd5 en lugar de 9.Bb3",
              "e4 c5 d4 cxd4 c3 dxc3 Nxc3 Nc6 Nf3 e6 Bc4 a6 O-O Nge7 Qe2 b5 Bd5",
              "El alfil entra en la diagonal larga y ataca b7; el negro debe jugar con cuidado para no perder el enroque.",
            ],
            [
              "6...d6 en lugar de ...e6",
              "e4 c5 d4 cxd4 c3 dxc3 Nxc3 Nc6 Nf3 d6 Bc4 e6 O-O a6 Bg5",
              "Si el negro retrasa ...e6, el alfil de c1 sale a g5 con presión sobre d6/e6 (motor +0,4 para el negro, posición activa para el blanco).",
            ],
          ],
          keys: [11, 13, 17],
          plans: [
            "Bc4 contra f7, Qe2, Rfd1 y Rac1 en las columnas abiertas; evitar cambios de damas y buscar Nd5 o Bxe6.",
            "Devolver el peón en el momento justo, cambiar piezas y enrocar; la dama a b6 o c7 es la pieza clave.",
          ],
          trans: [
            "3...Nf6 4.e5 Nd5 transpone al Alapin (capítulo 1 de The Alapin Sicilian)",
            "Si el negro no acepta, la partida vuelve al capítulo 3",
          ],
          traps: [
            [
              "e4 c5 d4 cxd4 c3 dxc3 Nxc3 Nc6 Nf3 e6 Bc4 Qc7 O-O Nf6 Qe2 Ng4 h3 Nd4",
              "La trampa siberiana contra el blanco: 8...Ng4 obliga a defender h2 y 9.h3?? permite ...Nd4, que gana material o la dama. El motor da −4,9 al blanco. Con 9.Ne4 o 9.Be3 se evita.",
            ],
          ],
          sources: [
            ["engine", "Stockfish 19, profundidad 22"],
            ["database", "Chess Cloud Database (chessdb.cn)", "https://www.chessdb.cn/"],
            ["book", "Wikipedia: Smith–Morra Gambit", "https://en.wikipedia.org/wiki/Smith%E2%80%93Morra_Gambit"],
          ],
          conf: "C",
        },
      ],
      [
        "Contra 3...d5",
        "El negro devuelve el peón para ocupar el centro. Las blancas recuperan en d4 y cambian alfiles para dejar al negro con peones débiles. Motor: +0,3 blanco.",
        "e4 c5 d4 cxd4 c3 d5 exd5 Qxd5 cxd4 Nc6 Nf3 Bg4 Be2 e6",
        {
          alts: [
            [
              "5.Nf3 sin recuperar d4",
              "e4 c5 d4 cxd4 c3 d5 exd5 Qxd5 Nf3 Nf6 Be2 Nc6",
              "El blanco no recupera d4 de inmediato: Be2, Nc3 y presión sobre d4. Motor: +0,16, igualdad.",
            ],
          ],
          keys: [9],
          plans: [
            "Recuperar d4, enrocar y romper con d5 en el momento justo.",
            "Cambiar alfiles y jugar ...Nf6/...Be7 para neutralizar la columna d.",
          ],
          sources: [
            ["engine", "Stockfish 19, profundidad 18"],
            ["database", "Chess Cloud Database (chessdb.cn)", "https://www.chessdb.cn/"],
            ["book", "Wikipedia: Smith–Morra Gambit, 3...d5", "https://en.wikipedia.org/wiki/Smith%E2%80%93Morra_Gambit"],
          ],
          conf: "B",
        },
      ],
      [
        "La Morra rechazada",
        "Si el negro no toma en c3, las blancas recuperan d4 con ventaja de espacio y juegan Bc4 contra el caballo de b6.",
        "e4 c5 d4 cxd4 c3 Nf6 e5 Nd5 Nf3 Nc6 cxd4 d6 Bc4 Nb6",
      ],
    ],
  }),
  course({
    id: "ponziani",
    name: "The Ponziani",
    category: "white",
    side: "white",
    levels: ["beginner"],
    elo: "400–1600",
    tags: ["1.e4", "e5", "trampas", "3.c3"],
    summary:
      "La apertura con más trampas por jugada invertida contra rivales inexpertos: c3 y d4 construyen un centro enorme desde la tercera jugada.",
    chapters: [
      [
        "El centro con 3.c3 y 4.d4",
        "Sostener d4 con c3 y expulsar el caballo de e4 con d5. Si el negro captura en e4, el blanco gana espacio y tiempo: d5, Nxe5 y Nxg6 dejan al negro con peón doble en g y al blanco con +0,4. El error típico es 7.Qd4, que permite ...Nf6 con tempo.",
        "e4 e5 Nf3 Nc6 c3 Nf6 d4 Nxe4 d5 Ne7 Nxe5 Ng6 Nxg6 hxg6 Qe2 Qe7 Be3",
        {
          alts: [
            [
              "4...exd4 en lugar de capturar en e4",
              "e4 e5 Nf3 Nc6 c3 Nf6 d4 exd4 cxd4 d5 e5 Ne4",
              "El negro devuelve el golpe en el centro y transpone a la línea del capítulo 2.",
            ],
            [
              "5...Bc5 en lugar de ...Ne7",
              "e4 e5 Nf3 Nc6 c3 Nf6 d4 Nxe4 d5 Bc5",
              "El alfil sale activo y la posición se iguala; cuidado con Nxe5: pierde por ...Bxf2+. La jugada correcta es 6.dxc6 con juego complejo.",
            ],
          ],
          keys: [7, 11],
          traps: [
            [
              "e4 e5 Nf3 Nc6 c3 Nf6 d4 Nxe4 d5 Bc5 Nxe5 Bxf2+",
              "6.Nxe5?? es el error clásico: ...Bxf2+ deja al rey blanco atrapado en el centro y el motor da −8,6 al blanco.",
            ],
          ],
          plans: [
            "d5, Nxe5, Nxg6 y Qe2/Be3; jugar contra el peón de e5 y el flanco de rey con el caballo doblado.",
            "...Ne7 y ...Ng6 para bloquear el centro; ...Bc5 y ...d6 para minar e5.",
          ],
          trans: ["4...exd4 cxd4 d5 lleva al capítulo 2"],
          sources: [
            ["engine", "Stockfish 19, profundidad 18"],
            ["database", "Chess Cloud Database (chessdb.cn)", "https://www.chessdb.cn/"],
            ["book", "Wikipedia: Ponziani Opening", "https://en.wikipedia.org/wiki/Ponziani_Opening"],
          ],
          conf: "C",
        },
      ],
      [
        "Contra 3...d5 (línea principal)",
        "El negro devuelve el golpe en el centro; es la respuesta principal. Qa4 presiona e5 y la dama negra queda expuesta, pero con ...f6 el negro defiende y la posición se iguala (+0,2 para él). La ventaja blanca es de comodidad.",
        "e4 e5 Nf3 Nc6 c3 d5 Qa4 f6 exd5 Qxd5 d4",
        {
          alts: [
            [
              "4...Nf6?! (la codicia)",
              "e4 e5 Nf3 Nc6 c3 d5 Qa4 Nf6 Nxe5 Bd7 Nxd7 Qxd7 exd5 Nxd5 d4",
              "Sin ...f6, el blanco gana un peón limpio: +1,5 para él. Es la trampa clásica del Ponziani.",
            ],
            [
              "4.exd5 Qxd5 5.d4 en lugar de Qa4",
              "e4 e5 Nf3 Nc6 c3 d5 exd5 Qxd5 d4 Bg4 Be2",
              "La otra forma de jugar el centro: cambio en d5, d4 y desarrollo; igualdad.",
            ],
          ],
          keys: [7],
          plans: [
            "Desarrollar Bc4/Be2 y enrocar; presionar d5 y e5 y buscar el cambio de damas favorable.",
            "...f6 y ...Bd7 para sostener e5; cambiar damas y llegar a un final con la estructura intacta.",
          ],
          sources: [
            ["engine", "Stockfish 19, profundidad 18"],
            ["database", "Chess Cloud Database (chessdb.cn)", "https://www.chessdb.cn/"],
            ["book", "Wikipedia: Ponziani Opening", "https://en.wikipedia.org/wiki/Ponziani_Opening"],
          ],
          conf: "C",
        },
      ],
      [
        "Contra 3...f5",
        "El contragolpe agresivo se castiga con 7.Bf4: el peón de e5 y la dama negra en e7 quedan clavados en la diagonal, y el motor da +1,5 al blanco. La jugada que enseña el curso anterior (7.Nd2) deja escapar casi toda la ventaja.",
        "e4 e5 Nf3 Nc6 c3 f5 d4 fxe4 Nxe5 Nxe5 dxe5 Qe7 Bf4",
        {
          alts: [
            [
              "7.Nd2 (la jugada que no hay que hacer)",
              "e4 e5 Nf3 Nc6 c3 f5 d4 fxe4 Nxe5 Nxe5 dxe5 Qe7 Nd2",
              "Desarrollo normal, pero permite ...Qf7 y ...h5: el motor baja la ventaja blanca de +1,5 a casi cero.",
            ],
            [
              "5...Nf6 en lugar de capturar el caballo",
              "e4 e5 Nf3 Nc6 c3 f5 d4 fxe4 Nxe5 Nf6",
              "La defensa más sólida del contragolpe: el blanco sigue mejor (+0,6) pero el negro evita el desastre de ...Nxe5.",
            ],
          ],
          keys: [7],
          plans: [
            "Bf4, Bc4 y Qd2; presionar e5 y el rey en la columna e.",
            "...Qf7 y ...h5 para activar la dama; cambiar el alfil de f4 si se puede.",
          ],
          sources: [
            ["engine", "Stockfish 19, profundidad 18"],
            ["database", "Chess Cloud Database (chessdb.cn)", "https://www.chessdb.cn/"],
            ["book", "Wikipedia: Ponziani Opening", "https://en.wikipedia.org/wiki/Ponziani_Opening"],
          ],
          conf: "C",
        },
      ],
    ],
  }),
  course({
    id: "hillbilly",
    name: "The Hillbilly Attack",
    category: "white",
    side: "white",
    levels: ["intermediate"],
    elo: "900–2000",
    tags: ["Caro-Kann", "offbeat", "Bc4"],
    summary:
      "Ataque creativo contra la Caro-Kann con Bc4 y Qh5. El motor da +0,85 al negro en la línea del ataque: es una sorpresa para partidas rápidas, no una ventaja. El curso lo dice.",
    chapters: [
      [
        "Bc4 y Qh5: la idea y su límite",
        "El alfil en b3 y la dama en h5 apuntan a f7 y fuerzan ...g6, pero el negro responde ...Bf5 y ...e6 con ventaja clara: +0,85. Se estudia para conocer el mecanismo, no para creer que gana.",
        "e4 c6 Bc4 d5 Bb3 dxe4 Qh5 g6 Qh4",
        {
          demo: true,
          keys: [8],
          plans: [
            "Cambiar en f7 solo si el rey negro ya no puede enrocar; si no, recuperar e4 con Nc3 y jugar d4.",
            "...Bf5 o ...Be6 contra la dama, ...e6 y ...Nf6; el peón de e4 es un escudo y la dama de h4 está fuera de juego.",
          ],
          sources: [
            ["engine", "Stockfish 19, profundidad 18"],
            ["database", "Chess Cloud Database (chessdb.cn)", "https://www.chessdb.cn/"],
            ["original", "El ataque Hillbilly (2.Bc4 contra la Caro-Kann) es una línea de club"],
          ],
          conf: "D",
        },
      ],
      [
        "Si el negro no toma en e4: 3...e6",
        "Cuando el negro ignora la amenaza y juega ...e6, el blanco recupera con Nc3 y la posición se iguala (0,00): el centro compensa el peón y la dama aún no ha salido.",
        "e4 c6 Bc4 d5 Bb3 e6 d4 dxe4 Nc3",
        {
          alts: [
            [
              "3...Nf6 sin ...d5",
              "e4 c6 Bc4 Nf6 Nc3 d5 Bb3 dxe4 Nge2",
              "Si el negro desarrolla antes de ocupar el centro, Nge2 recupera e4 y el blanco conserva la iniciativa.",
            ],
          ],
          keys: [7],
          plans: [
            "Nge2 y O-O, recuperar e4 y jugar contra d5 con c4.",
            "...Nf6 y ...b5 con ...Bb7, cambiando el alfil de b3 que es la pieza incómoda.",
          ],
          sources: [
            ["engine", "Stockfish 19, profundidad 18"],
            ["database", "Chess Cloud Database (chessdb.cn)", "https://www.chessdb.cn/"],
            ["book", "Wikipedia: Caro–Kann Defence, 2.Bc4", "https://en.wikipedia.org/wiki/Caro%E2%80%93Kann_Defence"],
          ],
          conf: "C",
        },
      ],
    ],
  }),
  course({
    id: "alapin",
    name: "The Alapin Sicilian",
    category: "white",
    side: "white",
    levels: ["beginner", "intermediate"],
    elo: "600–1900",
    tags: ["Siciliana", "2.c3", "estructura"],
    summary:
      "La respuesta sólida contra la Siciliana: c3 y d4 para crear un centro de peones que el negro debe atacar de inmediato.",
    chapters: [
      [
        "2.c3 y el centro d4",
        "El Alapin no entrega nada: c3 sostiene el empuje d4 para construir un centro de peones. e5 expulsa al caballo de f6, d4 y Nf3 fijan el espacio y la pareja de alfiles da la ventaja a largo plazo. Motor: +0,2 blanco.",
        "e4 c5 c3 Nf6 e5 Nd5 d4 cxd4 Nf3 Nc6 cxd4 d6 Bc4 Nb6",
        {
          alts: [
            [
              "4.Nf3 en lugar de 4.d4",
              "e4 c5 c3 Nf6 e5 Nd5 Nf3 Nc6 d4 cxd4 cxd4 d6",
              "El mismo esquema con otro orden; el blanco evita ...Nb6 inmediato y desarrolla primero.",
            ],
            [
              "4.Bc4 tras 3...Nd5",
              "e4 c5 c3 Nf6 e5 Nd5 Bc4 Nb6 Bb3 d5",
              "El alfil apunta a f7 y obliga al negro a jugar ...d5, que cierra el centro y deja al alfil de c8 pasivo.",
            ],
          ],
          keys: [5, 9, 13],
          plans: [
            "Fijar el centro con d4, cambiar el caballo de d5 si se puede y jugar contra el alfil de c8; Bf4/Bg5 y Re1.",
            "Jugar ...d6 y ...e6 para minar e5, cambiar piezas y buscar el final con el peón de más en el flanco de dama.",
          ],
          trans: [
            "2...d5 lleva al capítulo 2 (Barmen)",
            "3...e6 y 4.d4 d5 transpone a la Francesa (variante del avance)",
          ],
          sources: [
            ["engine", "Stockfish 19, profundidad 18"],
            ["database", "Chess Cloud Database (chessdb.cn)", "https://www.chessdb.cn/"],
            ["book", "Wikipedia: Sicilian Defence, Alapin Variation", "https://en.wikipedia.org/wiki/Sicilian_Defence,_Alapin_Variation"],
          ],
          conf: "C",
        },
      ],
      [
        "Contra 2...d5 (Barmen)",
        "El negro busca simplificar de inmediato; la línea se llama defensa Barmen. Be2 y Nf3 sostienen el centro y la dama negra en d5 pierde tiempos si sale a la columna abierta. Motor: +0,2 blanco.",
        "e4 c5 c3 d5 exd5 Qxd5 d4 Nf6 Nf3 Bg4 Be2 e6",
        {
          alts: [
            [
              "4...Nc6 en lugar de ...Nf6",
              "e4 c5 c3 d5 exd5 Qxd5 d4 Nc6 Nf3 Bg4 Be2 e6",
              "El caballo presiona d4 en vez de desarrollarse en f6; el blanco responde igual con Be2 y enroque.",
            ],
            [
              "3.e5 sin cambiar en d5",
              "e4 c5 c3 d5 e5 e6 d4 Nc6 Nf3",
              "Cerrar el centro lleva a una Francesa del avance con el alfil de c8 encerrado: buena para el blanco.",
            ],
          ],
          keys: [7],
          plans: [
            "Enrocar, Re1 y empuje c4 o Nc3 para presionar d5; cambiar el alfil de g4 con Be2.",
            "Cambiar en d4, jugar ...e6 y ...Be7 y buscar el cambio de damas.",
          ],
          trans: ["3...e6 transpone a la Francesa del avance"],
          sources: [
            ["engine", "Stockfish 19, profundidad 18"],
            ["database", "Chess Cloud Database (chessdb.cn)", "https://www.chessdb.cn/"],
            ["book", "Wikipedia: Sicilian Defence, Alapin Variation (Barmen)", "https://en.wikipedia.org/wiki/Sicilian_Defence,_Alapin_Variation"],
          ],
          conf: "C",
        },
      ],
      [
        "Contra 2...g6",
        "Si el negro fianchetta, las blancas juegan d4 y e5 y desarrollan sin prisa: el alfil de g7 se queda sin diagonales y el blanco tiene más espacio. Motor: +0,7 blanco.",
        "e4 c5 c3 g6 d4 cxd4 cxd4 d5 e5 Bg7 Nc3 Nc6",
        {
          alts: [
            [
              "3...d5 en lugar de ...g6",
              "e4 c5 c3 d5 exd5 Qxd5 Nf3 Nf6 d4",
              "Volver al esquema del capítulo 2 con la dama negra expuesta.",
            ],
          ],
          keys: [7],
          plans: [
            "Fijar d4 y e5, desarrollar Nc3/Nf3/Be3 y jugar contra el alfil de g7 con Bh6 o h4.",
            "...Nc6 y ...e6 para presionar d4; el alfil de g7 necesita que el blanco abra la diagonal.",
          ],
          sources: [
            ["engine", "Stockfish 19, profundidad 18"],
            ["database", "Chess Cloud Database (chessdb.cn)", "https://www.chessdb.cn/"],
            ["book", "Wikipedia: Sicilian Defence, Alapin Variation", "https://en.wikipedia.org/wiki/Sicilian_Defence,_Alapin_Variation"],
          ],
          conf: "B",
        },
      ],
    ],
  }),
  course({
    id: "fried-liver",
    name: "The Fried Liver Attack",
    category: "white",
    side: "white",
    levels: ["beginner", "intermediate"],
    elo: "600–1800",
    tags: ["Italian", "Nxf7", "ataque"],
    summary:
      "El sacrificio de caballo más famoso del ajedrez escolar, con la teoría necesaria para castigar a quien juega ...Nxd5 sin cuidado.",
    chapters: [
      [
        "Nxf7: el sacrificio y su defensa exacta",
        "El caballo en g5 ataca f7 y el rey negro acaba en el centro, pero la defensa moderna es 8...Ncb4: si 9.a3, ...Nxc2+ obliga a Kd1 y el negro tiene contrajuego en vez de perder. El motor da igualdad (0,0): el ataque es práctico, no una ventaja. Si el negro se defiende con ...Nce7, en cambio, el blanco gana.",
        "e4 e5 Nf3 Nc6 Bc4 Nf6 Ng5 d5 exd5 Nxd5 Nxf7 Kxf7 Qf3+ Ke6 Nc3 Ncb4 a3 Nxc2+ Kd1 Nd4",
        {
          alts: [
            [
              "8...Nce7 (la defensa floja)",
              "e4 e5 Nf3 Nc6 Bc4 Nf6 Ng5 d5 exd5 Nxd5 Nxf7 Kxf7 Qf3+ Ke6 Nc3 Nce7 d4",
              "Con ...Nce7 el blanco queda ganando (+2,5): es el error que castiga el Fried Liver y el que se ve en partidas rápidas.",
            ],
            [
              "4.d4 en lugar de 4.Ng5",
              "e4 e5 Nf3 Nc6 Bc4 Nf6 d4 exd4 O-O Bc5 e5",
              "Si no quieres depender del sacrificio, 4.d4 lleva al Max Lange del curso Aggressive Italian.",
            ],
          ],
          keys: [11, 15],

          plans: [
            "Atacar el rey en e6 con Qf3, Nc3-d5 y d4; aceptar material de menos a cambio de líneas abiertas.",
            "...Ncb4 para cambiar el caballo de c3, ...Qh4 para activar la dama y cambiar piezas; defender el rey con ...Kd6/...Be7.",
          ],
          sources: [
            ["engine", "Stockfish 19, profundidad 18"],
            ["database", "Chess Cloud Database (chessdb.cn)", "https://www.chessdb.cn/"],
            ["book", "Wikipedia: Fried Liver Attack", "https://en.wikipedia.org/wiki/Fried_Liver_Attack"],
          ],
          conf: "C",
        },
      ],
      [
        "El Italian normal tras 3...Bc5",
        "Muchos rivales evitan el Fried Liver. La respuesta es un Italian con d3, 0-0 y Re1 antes de decidir entre c3-d4 o Nbd2-f1-g3.",
        "e4 e5 Nf3 Nc6 Bc4 Bc5 c3 Nf6 d3 d6 O-O O-O Re1 a6 Nbd2 Ba7",
      ],
      [
        "Cuando no hay sacrificio: el Italian abierto",
        "Si el negro evita el Fried Liver con ...Bc5, la respuesta es el Italian con c3 y d4: se abre el centro, se entrega un peón y se juega contra el rey. Motor: igualdad con iniciativa blanca.",
        "e4 e5 Nf3 Nc6 Bc4 Bc5 c3 Nf6 d4 exd4 cxd4 Bb4+ Nc3 Nxe4 O-O",
        {
          alts: [
            [
              "5...Nf6 y 6.d3 (Italian lento)",
              "e4 e5 Nf3 Nc6 Bc4 Bc5 c3 Nf6 d3 d6 O-O O-O Re1",
              "Sin abrir el centro, el plan es Re1 y Nbd2 con la ruptura d4 preparada.",
            ],
          ],
          keys: [9],
          plans: [
            "Re1, Bg5 y d5 para abrir líneas contra el rey; recuperar el peón en e4 o c4.",
            "Devolver el peón con ...d5 y cambiar alfiles; buscar el final sin debilidades.",
          ],
          trans: ["Idéntica posición que el curso Italian Center Attack (capítulo 1)"],
          sources: [
            ["engine", "Stockfish 19, profundidad 18"],
            ["database", "Chess Cloud Database (chessdb.cn)", "https://www.chessdb.cn/"],
            ["book", "Wikipedia: Italian Game", "https://en.wikipedia.org/wiki/Italian_Game"],
          ],
          conf: "B",
        },
      ],
    ],
  }),
  course({
    id: "italian-center",
    name: "Italian Center Attack",
    category: "white",
    side: "white",
    levels: ["beginner", "intermediate"],
    elo: "500–1700",
    tags: ["Italian", "d4", "centro"],
    summary:
      "El ataque central del Italian sin sacrificios: c3 y d4 cambian el peón de e5 y dejan a las blancas con la columna d y el alfil activo.",
    chapters: [
      [
        "La ruptura d4",
        "La secuencia c3, d4, cxd4 es el corazón del curso. Después las piezas se activan sobre las columnas abiertas y el centro blanco domina.",
        "e4 e5 Nf3 Nc6 Bc4 Bc5 c3 Nf6 d4 exd4 cxd4 Bb4 Nc3 Nxe4 O-O Bxc3 d5",
      ],
      [
        "Contra 3...Nf6 y ...d6",
        "El sistema lento con d3, c3 y 0-0 concede menos ventaja pero es más seguro. Re1 y Nbd2 preparan la ruptura d4 con red de seguridad.",
        "e4 e5 Nf3 Nc6 Bc4 Nf6 d3 Bc5 c3 d6 O-O h6 Re1 O-O Nbd2",
      ],
      [
        "El alfil en c4 y el punto f7",
        "Toda la estrategia depende de f7: la batería Bc4 + Ng5 o Qb3 fuerza debilidades. Las blancas atacan antes del enroque rival.",
        "e4 e5 Nf3 Nc6 Bc4 Bc5 b4 Bxb4 c3 Ba5 d4 exd4 O-O",
      ],
    ],
  }),
  course({
    id: "bird",
    name: "The Bird Opening",
    category: "white",
    side: "white",
    levels: ["intermediate", "advanced"],
    elo: "900–2000",
    tags: ["1.f4", "offbeat", "Stonewall"],
    summary:
      "1.f4 con planes de bloqueo y ataque. Un arma poco estudiada que suele transponer a estructuras tipo Stonewall con ventaja de espacio.",
    chapters: [
      [
        "El sistema con e3 y Be2",
        "f4 controla e5. e3 y Be2 sostienen el centro y permiten 0-0 antes de decidir si el ataque va con d4 o con el peón b.",
        "f4 d5 Nf3 g6 e3 Bg7 Be2 Nf6 O-O O-O d3 c5 Qe1",
      ],
      [
        "Contra 1...e5 (From)",
        "La captura en e5 abre la columna f, pero el negro obtiene iniciativa. exd6 y d4 son necesarios para no quedar a la defensiva.",
        "f4 e5 fxe5 d6 exd6 Bxd6 Nf3 g5 d4 g4",
      ],
      [
        "El muro de piedra con b3",
        "Si el negro presiona, b3 y Bb2 dan al alfil la gran diagonal. La estructura b3-e3-f4 es una fortaleza con contrajuego.",
        "f4 d5 b3 Nf6 Bb2 g6 e3 Bg7 Be2 c5 Nf3 O-O",
      ],
    ],
  }),
  course({
    id: "b3-french",
    name: "The b3 French",
    category: "white",
    side: "white",
    levels: ["intermediate"],
    elo: "900–2000",
    tags: ["Francesa", "Papa-Ticulat", "gambito"],
    summary:
      "El sistema b3 contra la Francesa: Bb2 en la gran diagonal, pero con el orden de jugadas correcto. Incluye la refutación del gambito Papa-Ticulat, que se estudia para no jugarlo.",
    chapters: [
      [
        "El gambito Papa-Ticulat y su refutación",
        "3.b3 entrega e4 a cambio de la diagonal b2-g7, pero el negro tiene una refutación directa: 4...f5 fija el peón de e4 y abre la columna f. El motor da −1,2 al blanco. Se estudia para reconocerlo y no jugarlo; el sistema bueno está en el capítulo 2.",
        "e4 e6 d4 d5 b3 dxe4 Bb2 f5 f3 Nf6 fxe4 fxe4 Bc4 c5",
        {
          demo: true,
          keys: [5, 7],
          plans: [
            "Si ya estás dentro: f3, Nc3 y recuperar e4, aceptando una posición inferior pero con la diagonal de b2 como consuelo.",
            "...f5 y ...Nf6 para clavar e4; cambiar damas y llegar a un final con peón de más.",
          ],
          traps: [
            [
              "e4 e6 d4 d5 b3 dxe4 Bb2 f5",
              "La refutación del gambito: ...f5 impide que el blanco recupere e4 con comodidad. Sin esta jugada, el gambito sería jugable; con ella, el motor da −1,2.",
            ],
          ],
          sources: [
            ["engine", "Stockfish 19, profundidad 20"],
            ["database", "Chess Cloud Database (chessdb.cn)", "https://www.chessdb.cn/"],
            ["book", "Wikipedia: French Defence (sistemas con b3)", "https://en.wikipedia.org/wiki/French_Defence"],
          ],
          conf: "A",
        },
      ],
      [
        "b3 en la Francesa del avance",
        "La forma correcta de jugar b3: primero 3.e5 y c3, después b3 y Bb2. El peón de e5 fija el centro, el alfil presiona d4-h8 y las piezas desarrollan sin prisa. Motor: 0,00.",
        "e4 e6 d4 d5 e5 c5 c3 Nc6 Nf3 Qb6 b3 cxd4 cxd4 Nge7",
        {
          alts: [
            [
              "5...Bd7 sin ...Qb6",
              "e4 e6 d4 d5 e5 c5 c3 Nc6 Nf3 Bd7 b3 cxd4 cxd4",
              "Si la dama no presiona b3, el blanco desarrolla Be2 y Bb2 con aún menos riesgo; la posición es simétrica y cómoda.",
            ],
          ],
          keys: [7, 11],
          plans: [
            "Be2, Bb2, O-O y Nbd2; después atacar d4 o jugar contra el alfil de c8 y la casilla f5.",
            "...Nf5 y ...Bd7 para cambiar el alfil de b2; ...f6 para romper el centro si el blanco se retrasa.",
          ],
          trans: ["3.e5 c5 4.c3 lleva a la Francesa del avance clásica"],
          sources: [
            ["engine", "Stockfish 19, profundidad 20"],
            ["database", "Chess Cloud Database (chessdb.cn)", "https://www.chessdb.cn/"],
            ["book", "Wikipedia: French Defence, Advance Variation", "https://en.wikipedia.org/wiki/French_Defence"],
          ],
          conf: "C",
        },
      ],
      [
        "Por qué b3 sólo funciona en el avance",
        "Con el centro todavía abierto, b3 llega un tiempo tarde: el negro juega ...dxe4 y luego ...f5 o ...c5, y el alfil de b2 mira a un muro. En la Tarrasch el motor da −0,7 al blanco; en el avance, 0,00. La lección: b3 necesita el centro cerrado.",
        "e4 e6 d4 d5 Nd2 Nf6 e5 Nfd7 Bd3 c5 c3 Nc6 Ne2 cxd4 cxd4 Be7 b3",
        {
          demo: true,
          keys: [15],
          plans: [
            "Si ya has jugado b3, el plan es Bb2, f4 y ataque al flanco de rey; el negro cambiará en e5 cuando le convenga.",
            "...f6 contra e5, ...O-O y ...a5-a4 para atacar b3; el peón de e5 acaba siendo una debilidad.",
          ],
          sources: [
            ["engine", "Stockfish 19, profundidad 18"],
            ["database", "Chess Cloud Database (chessdb.cn)", "https://www.chessdb.cn/"],
            ["book", "Wikipedia: French Defence (Tarrasch Variation)", "https://en.wikipedia.org/wiki/French_Defence"],
          ],
          conf: "C",
        },
      ],
    ],
  }),
  course({
    id: "b3-sicilian",
    name: "The b3 Sicilian",
    category: "white",
    side: "white",
    levels: ["intermediate"],
    elo: "900–2000",
    tags: ["Siciliana", "b3", "Bb2"],
    summary:
      "Ataque de flanco contra la Siciliana: b3 y Bb2 convierten la diagonal b2-g7 en la autopista del contrajuego blanco.",
    chapters: [
      [
        "b3 contra 2...d6",
        "Con ...d6 el negro amenaza ...Nxe4 desde muy pronto. Por eso d3 va antes que Bb2: sostiene e4 y permite el plan de Be2, enroque y e5 con la diagonal de b2 abierta. La posición queda igualada (+0,2 para el negro).",
        "e4 c5 Nf3 d6 b3 Nf6 d3 e6 Bb2 Be7 Be2 O-O O-O",
        {
          alts: [
            [
              "4.Nc3 antes de Bb2",
              "e4 c5 Nf3 d6 b3 Nf6 Nc3 e6 Bb2 Be7 d4 cxd4 Qxd4 a6 O-O-O",
              "El caballo defiende e4 y permite d4 de inmediato: el motor da +0,3 al blanco, la línea más ambiciosa.",
            ],
            [
              "6...Nc6 en lugar de ...O-O",
              "e4 c5 Nf3 d6 b3 Nf6 d3 e6 Bb2 Be7 Be2 Nc6 O-O O-O",
              "El negro desarrolla antes de enrocar; el blanco sigue con el mismo plan sin diferencias.",
            ],
          ],
          keys: [7, 11],
          traps: [
            [
              "e4 c5 Nf3 d6 b3 Nf6 Bb2 Nxe4",
              "4.Bb2?? antes de d3 pierde el peón de e4: Nxe4 y el negro queda con −0,96 para el blanco. Es el error típico de este sistema.",
            ],
          ],
          plans: [
            "Enrocar, torre en e1 y empuje e5 para abrir la diagonal de b2; después d4 si el negro cambia.",
            "...Nc6, ...e5 para cerrar el centro y ...d5 para cambiar de estructura; el alfil de b7 es la pieza clave.",
          ],
          trans: ["Si el negro juega ...d5 y ...exd5, la partida transpone al capítulo 3"],
          sources: [
            ["engine", "Stockfish 19, profundidad 20"],
            ["database", "Chess Cloud Database (chessdb.cn)", "https://www.chessdb.cn/"],
            ["book", "Wikipedia: Sicilian Defence (sistemas con b3)", "https://en.wikipedia.org/wiki/Sicilian_Defence"],
          ],
          conf: "A",
        },
      ],
      [
        "Contra 2...Nc6",
        "El caballo en c6 permite Bb5 para presionar. La tensión en el centro se resuelve con d4 cuando el negro ha comprometido piezas; la posición es igualada (−0,08).",
        "e4 c5 Nf3 Nc6 b3 e5 Bb2 d6 Bb5 Bd7 O-O Nf6",
        {
          alts: [
            [
              "3...d6 sin ...e5",
              "e4 c5 Nf3 Nc6 b3 d6 Bb2 e5 Bb5 Bd7",
              "El negro cierra el centro antes; el plan es el mismo: Bb5, enroque y d4.",
            ],
          ],
          keys: [7],
          plans: [
            "Bb5, enroque y d4 cuando el negro haya jugado ...f6 o haya movido el alfil de c8.",
            "...e5 y ...Nf6 para sostener el centro; cambiar el alfil de b5 con ...Bd7-b5 no conviene.",
          ],
          sources: [
            ["engine", "Stockfish 19, profundidad 18"],
            ["database", "Chess Cloud Database (chessdb.cn)", "https://www.chessdb.cn/"],
            ["book", "Wikipedia: Sicilian Defence (sistemas con b3)", "https://en.wikipedia.org/wiki/Sicilian_Defence"],
          ],
          conf: "B",
        },
      ],
      [
        "Contra 2...e6",
        "Con la Francesa en el tablero, las blancas cambian en d5 y usan la columna e abierta. Bb5+ gana tiempos sobre el caballo; motor +0,2 blanco.",
        "e4 c5 Nf3 e6 b3 d5 exd5 exd5 Bb2 Nf6 Bb5+ Bd7",
        {
          alts: [
            [
              "3.d4 en lugar de 3.b3",
              "e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3",
              "Volver a la Siciliana abierta si el negro no juega ...d5; la partida se iguala.",
            ],
          ],
          keys: [5],
          plans: [
            "Cambiar en d5, ocupar la columna e con la torre y desarrollar Bb2/Bd3.",
            "...Nf6 y ...Be7 para neutralizar la columna e; el alfil de c8 sigue siendo el problema.",
          ],
          sources: [
            ["engine", "Stockfish 19, profundidad 18"],
            ["database", "Chess Cloud Database (chessdb.cn)", "https://www.chessdb.cn/"],
            ["book", "Wikipedia: Sicilian Defence (sistemas con b3)", "https://en.wikipedia.org/wiki/Sicilian_Defence"],
          ],
          conf: "B",
        },
      ],
    ],
  }),
  course({
    id: "anti-sicilian-white",
    name: "Anti-Sicilian For White",
    category: "white",
    side: "white",
    levels: ["intermediate"],
    elo: "1000–2100",
    tags: ["Siciliana", "Najdorf", "Dragon"],
    summary:
      "Un sistema con 3.Nc3 que evita Najdorf y Dragón: las blancas fuerzan un centro abierto antes de que el negro complete el fianchetto.",
    chapters: [
      [
        "3.Nc3 y el golpe central",
        "Contra ...d6, Nc3 prepara d4 y Be3: el esquema del ataque inglés contra Najdorf. El negro debe elegir entre permitir un centro móvil o debilitar su estructura con ...b5. Motor: +0,6 blanco en esta línea.",
        "e4 c5 Nf3 d6 Nc3 Nf6 d4 cxd4 Nxd4 a6 Be3 e6 f3 b5",
        {
          alts: [
            [
              "5...g6 en lugar de ...a6 (Dragón)",
              "e4 c5 Nf3 d6 Nc3 Nf6 d4 cxd4 Nxd4 g6 Be3 Bg7 f3 O-O",
              "Si el negro fianchetta, la partida va al capítulo 3 con el mismo esquema de ataque inglés.",
            ],
          ],
          keys: [9, 15],
          plans: [
            "Enrocar largo, Qd2, f3 y empuje g4-h4 contra el enroque corto; el alfil de e3 y el caballo de d4 son las piezas clave.",
            "...b5 y ...Bb7 para contraatacar en el flanco de dama antes de que el blanco abra la columna g.",
          ],
          trans: ["4...g6 lleva al Dragón y al capítulo 3"],
          sources: [
            ["engine", "Stockfish 19, profundidad 18"],
            ["database", "Chess Cloud Database (chessdb.cn)", "https://www.chessdb.cn/"],
            ["book", "Wikipedia: Sicilian Defence, Najdorf Variation", "https://en.wikipedia.org/wiki/Sicilian_Defence"],
          ],
          conf: "C",
        },
      ],
      [
        "El avance e5 frente a ...Nf6",
        "Si el negro desarrolla el caballo antes de ...a6, e5 gana espacio y expulsa al caballo, pero CDB la marca solo como jugable y el motor prefiere d4 (+0,5). Se estudia como arma práctica, no como línea principal.",
        "e4 c5 Nf3 d6 Nc3 Nf6 e5 dxe5 Nxe5 Nbd7 Nxd7 Bxd7 d4",
        {
          alts: [
            [
              "4.d4 (la línea principal)",
              "e4 c5 Nf3 d6 Nc3 Nf6 d4 cxd4 Nxd4 a6 Be3",
              "La jugada del motor: centro abierto y ataque inglés. Si el negro evita ...a6, la partida vuelve al capítulo 1.",
            ],
          ],
          keys: [7],
          plans: [
            "Fijar e5, cambiar piezas y jugar contra el caballo de f6 con d4 y Be3.",
            "...cxd4 y ...Nc6 para abrir la columna c a cambio del espacio; el peón de e5 es el objetivo.",
          ],
          sources: [
            ["engine", "Stockfish 19, profundidad 18"],
            ["database", "Chess Cloud Database (chessdb.cn)", "https://www.chessdb.cn/"],
            ["book", "Wikipedia: Sicilian Defence (líneas con e5)", "https://en.wikipedia.org/wiki/Sicilian_Defence"],
          ],
          conf: "B",
        },
      ],
      [
        "Contra el Dragón: 3...g6",
        "El fianchetto permite el ataque inglés con Be3, Qd2, 0-0-0 y h4-h5. El motor ve una posición compleja y ligeramente favorable al negro (−0,5), pero CDB recomienda el enroque negro: la carrera de ataques es real y las dos partes tienen que jugar con precisión.",
        "e4 c5 Nf3 d6 Nc3 g6 d4 cxd4 Nxd4 Bg7 Be3 Nf6 f3 O-O Qd2",
        {
          alts: [
            [
              "8...Nc6 antes de enrocar",
              "e4 c5 Nf3 d6 Nc3 g6 d4 cxd4 Nxd4 Bg7 Be3 Nc6 f3 Nf6",
              "El negro desarrolla primero y retrasa el enroque; el blanco sigue con Qd2 y 0-0-0.",
            ],
          ],
          keys: [13, 15],
          plans: [
            "Enrocar largo, h4-h5, Bh6 para cambiar el alfil de g7 y abrir la columna h.",
            "...Nc6, ...d5 o ...b5 para contraatacar en el centro y el flanco de dama; el alfil de g7 es el escudo del rey.",
          ],
          trans: ["También se llega desde 2...Nc6 3.d4 cxd4 4.Nxd4 g6"],
          sources: [
            ["engine", "Stockfish 19, profundidad 18"],
            ["database", "Chess Cloud Database (chessdb.cn)", "https://www.chessdb.cn/"],
            ["book", "Wikipedia: Sicilian Defence, Dragon Variation", "https://en.wikipedia.org/wiki/Sicilian_Defence"],
          ],
          conf: "C",
        },
      ],
    ],
  }),
];
