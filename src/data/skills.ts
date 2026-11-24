import { course } from "./course";

export const SKILL_COURSES = [
  course({
    id: "candidates-2026",
    name: "Fide Candidates 2026",
    category: "skills",
    side: null,
    stage: "all",
    levels: ["advanced"],
    elo: "1600–2400",
    summary:
      "Lecciones de las partidas del ciclo de Candidatos: cómo se convierte una ventaja pequeña y cómo se defienden las posiciones pasivas durante horas.",
    chapters: [
      [
        "Convertir la ventaja de espacio",
        "Los mejores jugadores no buscan mate en cada posición: mejoran piezas, evitan cambios favorables al rival y esperan la imprecisión.",
        "d4 Nf6 c4 e6 Nf3 d5 Nc3 Be7 Bf4 O-O e3 c5 dxc5 Bxc5",
      ],
      [
        "La defensa precisa en posiciones inferiores",
        "Cuando la posición es peor, el recurso es cambiar piezas y buscar fortalezas: bloqueo, peones dobles del rival y actividad de torre.",
        "e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Be7 Re1 b5 Bb3 d6 c3 O-O h3",
      ],
    ],
  }),
  course({
    id: "basics",
    name: "The Basics For Beginners",
    category: "skills",
    side: null,
    stage: "all",
    levels: ["beginner"],
    elo: "0–800",
    summary:
      "Las reglas y los principios que hacen que una partida tenga sentido: desarrollo, centro, seguridad del rey y valor de las piezas.",
    chapters: [
      [
        "Desarrolla y enroca",
        "Cada pieza cuenta. Sacar caballos y alfiles, enrocar temprano y conectar las torres es el plan de las primeras diez jugadas en casi cualquier apertura.",
        "e4 e5 Nf3 Nc6 Bc4 Bc5 d3 Nf6 Nc3 d6 O-O O-O",
      ],
      [
        "El centro y el valor de las piezas",
        "Las piezas valen más en el centro porque controlan más casillas. Un caballo en el borde es casi una pieza de menos.",
        "d4 d5 c4 e6 Nc3 Nf6 Bg5 Be7 e3 O-O Nf3 h6",
      ],
    ],
  }),
  course({
    id: "beginner-tactics",
    name: "Beginner Tactics",
    category: "skills",
    side: null,
    stage: "middlegame",
    levels: ["beginner"],
    elo: "0–1200",
    summary:
      "Horquillas, clavadas y ataques descubiertos: los tres patrones que deciden la mayoría de partidas por debajo de 1200.",
    chapters: [
      [
        "La horquilla del caballo",
        "El caballo ataca dos piezas a la vez. Casi siempre la mejor casilla está cerca del rey enemigo o de dos piezas sin defender.",
        "e4 e5 Nf3 Nc6 Bc4 Nf6 Ng5 d5 exd5 Nxd5 Nxf7 Kxf7",
      ],
      [
        "La clavada",
        "Una pieza clavada no se puede mover sin exponer algo más valioso. Bb5 y Bg5 son las clavadas más frecuentes del ajedrez escolar.",
        "e4 e5 Nf3 Nc6 Bb5 d6 d4 Bd7 Nc3 Nf6",
      ],
    ],
  }),
  course({
    id: "tactics-masterclass",
    name: "Tactics Masterclass",
    category: "skills",
    side: null,
    stage: "middlegame",
    levels: ["intermediate", "advanced"],
    elo: "800–2200",
    summary:
      "El curso imprescindible: de los patrones básicos a las combinaciones complejas, con sacrificios de descubierta y mates de pasillo.",
    chapters: [
      [
        "Sacrificios sobre el enroque",
        "El ataque al enroque funciona cuando hay más atacantes que defensores. Los sacrificios en f7, h7 y g7 abren las líneas que el rey necesita.",
        "e4 e5 Nf3 Nc6 Bc4 Bc5 c3 Nf6 d4 exd4 cxd4 Bb4 Nc3 Nxe4 O-O Nxc3 bxc3 Bxc3",
        {
          alts: [
            [
              "El ataque con Ng5 y Qh5",
              "e4 e5 Nf3 Nc6 Bc4 Nf6 Ng5 d5 exd5 Nxd5 Nxf7 Kxf7 Qf3+ Ke6",
              "Si el rey acepta el caballo, queda atrapado en el centro y cada pieza blanca entra con jaque.",
            ],
          ],
        },
      ],
      [
        "La descubierta y el ataque doble",
        "Mover una pieza para liberar la línea de otra es el mecanismo más rentable del cálculo. Siempre hay que revisar qué queda detrás.",
        "d4 Nf6 c4 e6 Nc3 Bb4 Qc2 O-O a3 Bxc3+ Qxc3 b6",
      ],
      [
        "El mate de pasillo",
        "Un rey sin casillas de escape y una torre en la última fila: eso es todo. El sacrificio de dama en la octava aparece en todas las partidas.",
        "e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Be7 Re1 b5 Bb3 d6 c3 O-O",
      ],
    ],
  }),
  course({
    id: "endgame-masterclass",
    name: "Endgame Masterclass",
    category: "skills",
    side: null,
    stage: "endgame",
    levels: ["intermediate", "advanced"],
    elo: "900–2200",
    summary:
      "Finales teóricos, ejemplos prácticos y los errores más caros: oposición, peones pasados, torres activas y mates elementales.",
    chapters: [
      [
        "Rey y peón contra rey",
        "La oposición decide todo. El rey atacante debe ganar la casilla clave delante del peón antes de avanzarlo.",
        "d4 Ke7 Kc6 Kf7 d5",
        {
          fen: "8/3k4/8/3K4/8/8/3P4/8 w - - 0 1",
          alts: [
            [
              "Avanzar el peón sin el rey delante",
              "Kc5 Ke7 d4 Kd7",
              "El rey blanco debe ganar la casilla delante del peón antes de avanzarlo; si se adelanta el peón sin apoyo, el final es tablas.",
            ],
          ],
        },
      ],
      [
        "El mate con torre",
        "La torre recorta filas mientras el rey empuja. El mate llega cuando el rey enemigo está en el borde y los dos reyes se miran.",
        "Rg8#",
        { fen: "7k/5K2/6R1/8/8/8/8/8 w - - 0 1" },
      ],
      [
        "Torres activas en el final",
        "La torre pertenece a la séptima fila o detrás del peón pasado. La pasividad se paga con derrotas que parecían tablas.",
        "d4 Nf6 c4 e6 Nc3 Bb4 Qc2 O-O a3 Bxc3+ Qxc3",
      ],
    ],
  }),
  course({
    id: "beginner-openings",
    name: "Beginner Openings",
    category: "skills",
    side: null,
    stage: "opening",
    levels: ["beginner"],
    elo: "0–900",
    summary:
      "Qué es una apertura y por qué importa: ocupar el centro, desarrollar y enrocar, sin memorizar variantes.",
    chapters: [
      [
        "El plan de las tres primeras jugadas",
        "Peón central, caballo, alfil. Si repites ese orden con criterio, sales bien de casi cualquier apertura.",
        "e4 e5 Nf3 Nc6 Bc4 Bc5 c3 Nf6 d3 d6",
      ],
      [
        "Errores típicos de apertura",
        "Demostración, no repertorio: 3.Qh5 sale antes de tiempo, 3...Nc6 defiende f7 y 4...Nf6 permite Qxf7#. La lección es por qué no se juega así: sin desarrollo y con el rey en el centro, una jugada de dama no gana nada.",
        "e4 e5 Qh5 Nc6 Bc4 Nf6 Qxf7",
        { demo: true },
      ],
    ],
  }),
  course({
    id: "how-to-attack",
    name: "How To Attack",
    category: "skills",
    side: null,
    stage: "middlegame",
    levels: ["intermediate"],
    elo: "600–1800",
    summary:
      "Cómo se construye un ataque real: superioridad local, apertura de líneas y el momento exacto de sacrificar.",
    chapters: [
      [
        "Más atacantes que defensores",
        "El ataque no es cuestión de valentía sino de aritmética: cuántas piezas llegan al flanco del rey y cuántas lo defienden.",
        "e4 e5 Nf3 Nc6 Bc4 Bc5 c3 Nf6 d4 exd4 cxd4 Bb4 Nc3 Nxe4 O-O",
      ],
      [
        "Abrir líneas con sacrificio",
        "Cuando todas las piezas apuntan al rey, un peón o una pieza entregada en el momento correcto vale más que el material.",
        "e4 e5 Nf3 Nc6 Bc4 Nf6 Ng5 d5 exd5 Nxd5 Nxf7 Kxf7 Qf3+ Ke6",
      ],
    ],
  }),
  course({
    id: "beginner-strategy",
    name: "Beginner Strategy",
    category: "skills",
    side: null,
    stage: "middlegame",
    levels: ["beginner"],
    elo: "0–1200",
    summary:
      "Cómo pensar como jugador de ajedrez: mejorar la peor pieza, controlar casillas y jugar contra las debilidades del rival.",
    chapters: [
      [
        "Mejora tu peor pieza",
        "Antes de calcular jugadas brillantes, pregunta cuál de tus piezas hace menos. Muchas veces esa es la jugada que necesitas.",
        "d4 d5 c4 e6 Nc3 Nf6 Bg5 Be7 e3 O-O Nf3 h6 Bh4 b6",
      ],
      [
        "Las casillas débiles",
        "Un agujero es una casilla que ningún peón puede defender. Colocar un caballo ahí cambia el valor de todas las piezas.",
        "e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Be3 e6",
      ],
    ],
  }),
  course({
    id: "beginner-endgames",
    name: "Beginner Endgames",
    category: "skills",
    side: null,
    stage: "endgame",
    levels: ["beginner"],
    elo: "0–1100",
    summary:
      "El final explicado desde cero: mates básicos, la regla del cuadrado y por qué el rey es una pieza fuerte.",
    chapters: [
      [
        "El mate de dama y rey",
        "La dama recorta filas y columnas; el rey blanco acompaña. El error habitual es dar jaques sin avanzar el rey.",
        "Qg7#",
        { fen: "7k/Q7/6K1/8/8/8/8/8 w - - 0 1" },
      ],
      [
        "El rey en el final",
        "En el final el rey deja de esconderse: centralizarlo vale más que un peón. Activar el rey a tiempo gana finales igualados.",
        "Kf3 Kc5 Ke4 Kb5",
        { fen: "8/8/8/3k4/8/8/4K3/8 w - - 0 1" },
      ],
    ],
  }),
  course({
    id: "how-to-defend",
    name: "How To Defend",
    category: "skills",
    side: null,
    stage: "middlegame",
    levels: ["intermediate"],
    elo: "600–1800",
    summary:
      "La forma más rápida de subir de nivel: dejar de cometer errores. Cambios, bloqueo y defensa activa en posiciones difíciles.",
    chapters: [
      [
        "Defensa activa, no pasiva",
        "Defender no es esperar: es contraatacar la debilidad del rival. Una torre activa salva muchas más partidas que un peón extra.",
        "e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Be7 Re1 b5 Bb3 d6 c3 O-O h3 Na5",
      ],
      [
        "Cambiar para aliviar la presión",
        "Cuando estás peor, cada cambio beneficia al bando con menos espacio. Buscar el cambio correcto es una habilidad entrenable.",
        "d4 Nf6 c4 e6 Nc3 Bb4 e3 c5 Bd3 Bxc3+ bxc3 d6",
      ],
    ],
  }),
  course({
    id: "how-to-plan",
    name: "How To Make A Plan",
    category: "skills",
    side: null,
    stage: "middlegame",
    levels: ["intermediate"],
    elo: "800–1900",
    summary:
      "¿Y ahora qué? Evaluar la estructura, encontrar la pieza mal colocada y elegir un plan que el rival no pueda impedir.",
    chapters: [
      [
        "Leer la estructura antes que las jugadas",
        "Cadenas de peones, columnas abiertas y casillas débiles definen los planes. Las jugadas vienen después.",
        "d4 Nf6 c4 e6 Nf3 d5 Nc3 Be7 Bf4 O-O e3 c5 dxc5 Bxc5",
      ],
      [
        "Plan contra el peón aislado",
        "El peón aislado defiende casillas pero no puede cambiarse. El plan es bloquearlo, cambiar piezas y atacarlo en el final.",
        "e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Nxe4 d4 b5 Bb3 d5",
      ],
    ],
  }),
  course({
    id: "how-to-use-pieces",
    name: "How To Use Your Pieces",
    category: "skills",
    side: null,
    stage: "all",
    levels: ["beginner", "intermediate"],
    elo: "400–1600",
    summary:
      "Cada pieza tiene su casilla ideal. Peones, caballos, alfiles, torres, dama y rey explicados con posiciones típicas.",
    chapters: [
      [
        "Alfiles y caballos: cuándo cada uno",
        "El alfil domina las posiciones abiertas; el caballo, las cerradas. Cambiar el alfil bueno es uno de los errores más caros.",
        "d4 Nf6 c4 e6 Nc3 Bb4 Qc2 O-O a3 Bxc3+ Qxc3",
      ],
      [
        "Torres en columnas abiertas",
        "Una torre en una columna abierta vale como una pieza más. La séptima fila suele decidir finales enteros.",
        "e4 e5 Nf3 Nc6 Bb5 Nf6 O-O Nxe4 d4 Nd6 Bxc6 dxc6 dxe5 Nf5 Qxd8 Kxd8",
      ],
    ],
  }),
  course({
    id: "queen-vs-pieces",
    name: "Queen vs Pieces: A Guide to Chess Imbalances",
    category: "skills",
    side: null,
    stage: "all",
    levels: ["advanced"],
    elo: "1200–2200",
    summary:
      "La dama contra torres, alfiles y caballos: cuándo gana, cuándo pierde y cómo se coordinan las piezas menores para cazarla.",
    chapters: [
      [
        "Dama contra tres piezas menores",
        "La dama necesita casillas seguras. Si las piezas menores se coordinan y el rey está expuesto, la dama pierde valor rápidamente.",
        "d4 Nf6 c4 e6 Nc3 Bb4 e3 O-O Bd3 d5 Nf3 c5",
      ],
      [
        "Dama contra dos torres",
        "Las torres ganan en posiciones abiertas y con rey seguro. La dama gana si puede atacar dos objetivos a la vez.",
        "e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Be3 e5 Nb3 Be6",
      ],
    ],
  }),
  course({
    id: "pawn-endgames",
    name: "Pawn Endgame Masterclass",
    category: "skills",
    side: null,
    stage: "endgame",
    levels: ["intermediate", "advanced"],
    elo: "1000–2200",
    summary:
      "Finales de peones desde partidas de maestros: oposición, casillas clave, peones pasados y la regla del cuadrado.",
    chapters: [
      [
        "La oposición",
        "Quien no tiene que mover cuando los reyes se enfrentan gana. Todo el final de peones se construye alrededor de esa idea.",
        "Ke3 Kd5 Kd3 Kc5",
        { fen: "8/8/8/4k3/8/5K2/8/8 w - - 0 1" },
      ],
      [
        "El peón pasado protegido",
        "Un peón pasado en el centro obliga al rey rival a vigilarlo. El blanco gana espacio con el rey delante del peón y solo avanza cuando la casilla de promoción está controlada.",
        "Kd6 Ke8 Ke6 Kd8 Kf7",
        { fen: "8/5k2/8/3KP3/8/8/8/8 w - - 0 1" },
      ],
    ],
  }),
  course({
    id: "tactics-level-1",
    name: "Tactics Level One",
    category: "skills",
    side: null,
    stage: "middlegame",
    levels: ["beginner"],
    elo: "0–1000",
    summary:
      "Piezas colgadas, horquillas, clavadas y rayos X. El nivel uno de táctica explicado con posiciones que aparecen en partidas reales.",
    chapters: [
      [
        "Piezas colgadas",
        "La mitad de las partidas por debajo de 1000 se deciden capturando algo que nadie defendió. Antes de mover, cuenta defensores.",
        "e4 e5 Nf3 Nc6 Bc4 Nd4 Nxe5 Qg5 Bxf7+ Kd8 O-O",
      ],
      [
        "La clavada y la horquilla",
        "Una clavada inmoviliza; una horquilla ataca dos veces. Juntas deciden partidas en menos de quince jugadas.",
        "e4 e5 Nf3 Nc6 Bb5 d6 d4 Bd7 Nc3 Nf6",
      ],
    ],
  }),
  course({
    id: "tactics-level-2",
    name: "Tactics Level Two",
    category: "skills",
    side: null,
    stage: "middlegame",
    levels: ["intermediate"],
    elo: "700–1600",
    summary:
      "Quitar el defensor, atrapar piezas, ataques descubiertos y desviaciones: los patrones que separan a un jugador de club de un principiante.",
    chapters: [
      [
        "Quitar el defensor",
        "Si una pieza no se puede capturar porque otra la defiende, el primer paso es eliminar o desviar al defensor.",
        "d4 Nf6 c4 e6 Nc3 Bb4 Qc2 c5 dxc5 Na6 a3 Bxc3+ Qxc3 Nxc5",
      ],
      [
        "Atrapar una pieza",
        "Las piezas sin casillas de escape se convierten en material perdido. Los peones son las mejores redes.",
        "e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Bg5 e6 f4 Qb6",
      ],
    ],
  }),
  course({
    id: "tactics-level-3",
    name: "Tactics Level Three",
    category: "skills",
    side: null,
    stage: "middlegame",
    levels: ["advanced"],
    elo: "1200–2200",
    summary:
      "Sacrificios de despeje, jugadas intermedias, sacrificios posicionales y combinaciones de mate: el nivel más alto del cálculo.",
    chapters: [
      [
        "La jugada intermedia",
        "Antes de recapturar, busca un jaque o una amenaza. La jugada intermedia convierte una posición igualada en una ganadora.",
        "e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Bg5 e6 f4 Qb6 Qd2 Qxb2 Rb1 Qa3",
      ],
      [
        "Sacrificios de despeje",
        "Liberar una casilla o una diagonal suele valer más que la pieza entregada. El cálculo debe llegar hasta el mate o la ganancia clara.",
        "e4 e5 Nf3 Nc6 Bc4 Bc5 b4 Bxb4 c3 Ba5 d4 exd4 O-O",
      ],
    ],
  }),
  course({
    id: "center-game",
    name: "The Center Game",
    category: "white",
    side: "white",
    levels: ["intermediate"],
    elo: "600–1600",
    status: "published",
    summary:
      "En preparación: la dama sale pronto para atacar e5 y f7. Un pariente agresivo de la Escandinava, con más riesgo que recompensa.",
    chapters: [
      [
        "La idea: dama activa desde la jugada tres",
        "La dama en d4 o e3 ataca el centro antes de que el negro se organice. La clave es no perder tiempos con ella.",
        "e4 e5 d4 exd4 Qxd4 Nc6 Qe3 Nf6",
      ],
    ],
  }),
  course({
    id: "exchange-caro",
    name: "The Exchange Caro-Kann",
    category: "white",
    side: "white",
    levels: ["beginner", "intermediate"],
    elo: "400–1800",
    status: "published",
    summary:
      "En preparación: la variante del cambio contra la Caro-Kann, simple y sólida, con un plan de desarrollo sin riesgos.",
    chapters: [
      [
        "El cambio en d5",
        "Se cambia en d5, se desarrolla con Bd3 y Bf4 y se ataca el flanco de rey mientras el negro iguala el centro. La estructura simétrica evita la teoría: motor +0,3 blanco, y la ventaja es de comodidad.",
        "e4 c6 d4 d5 exd5 cxd5 Bd3 Nc6 c3 Nf6 Bf4 Bg4 Qb3",
        {
          alts: [
            [
              "6...e6 en lugar de ...Bg4",
              "e4 c6 d4 d5 exd5 cxd5 Bd3 Nc6 c3 Nf6 Bf4 e6 Nf3 Bd6 Bxd6 Qxd6",
              "Si el negro no clava el caballo, el blanco cambia alfiles y enroca con ventaja cómoda (+0,6).",
            ],
          ],
          keys: [9],
          plans: [
            "Bd3 y Bf4, Ne2/Nf3, enroque corto y presión sobre h7; cambiar el alfil de f4 solo si mejora la estructura.",
            "...Bg4 para cambiar el caballo de f3, ...e6 y ...Bd6 para igualar; el final es tablas si no hay debilidades.",
          ],

          sources: [
            ["engine", "Stockfish 19, profundidad 18"],
            ["database", "Chess Cloud Database (chessdb.cn)", "https://www.chessdb.cn/"],
            ["book", "Wikipedia: Caro-Kann Defence, Exchange Variation", "https://en.wikipedia.org/wiki/Caro%E2%80%93Kann_Defence"],
          ],
          conf: "C",
        },
      ],
    ],
  }),
  course({
    id: "common-checkmates",
    name: "10 Most Common Checkmates",
    category: "skills",
    side: null,
    stage: "middlegame",
    levels: ["beginner"],
    elo: "0–1200",
    status: "published",
    summary:
      "En preparación: diez patrones de mate que aparecen una y otra vez, empezando por el Griego y el mate de pasillo.",
    chapters: [
      [
        "El mate del pasillo",
        "Rey sin aire y torre en la última fila. Es el patrón que más partidas decide en todos los niveles.",
        "e4 e5 Nf3 Nc6 Bc4 Bc5 c3 Nf6 d4 exd4 cxd4 Bb4+ Nc3 Nxe4",
      ],
    ],
  }),
  course({
    id: "latvian",
    name: "Latvian Gambit",
    category: "black",
    side: "black",
    levels: ["intermediate"],
    elo: "800–1800",
    status: "published",
    summary:
      "En preparación: un gambito arriesgado contra 1.e4 que debilita el rey negro a cambio de un ataque inmediato. El motor da +1,5 al blanco con la línea principal: se estudia como arma de sorpresa, no como igualdad.",
    chapters: [
      [
        "...f5 y la línea crítica 3.Nxe5",
        "El negro golpea e4 desde la segunda jugada y recupera el peón con ...Qf6, pero el blanco desarrolla con tempo y queda con +1,56. Es la refutación práctica del gambito.",
        "e4 e5 Nf3 f5 Nxe5 Qf6 d4 d6 Nc4 fxe4",
        {
          keys: [6],
          plans: [
            "Nc3 y f3 contra el peón de e4, d5 para cerrar el centro y cambiar la dama negra de f6.",
            "...Qg6 y ...Nc6 con ...Bf5 para cambiar el caballo de c4; el peón de e4 estorba a las propias piezas.",
          ],
          sources: [
            ["engine", "Stockfish 19, profundidad 18"],
            ["database", "Chess Cloud Database (chessdb.cn)", "https://www.chessdb.cn/"],
            ["book", "Wikipedia: Latvian Gambit (C40)", "https://en.wikipedia.org/wiki/Latvian_Gambit"],
          ],
          conf: "D",
        },
      ],
      [
        "3.Bc4: la versión menos mala",
        "Contra 3.Bc4 el negro toma en e4 y la dama sale a g5 con contrajuego real. El motor da solo +0,25 al blanco: es la línea que debe conocer quien juegue el gambito.",
        "e4 e5 Nf3 f5 Bc4 fxe4 Nxe5 Qg5",
        {
          alts: [
            [
              "4...Nf6 en lugar de ...Qg5",
              "e4 e5 Nf3 f5 Bc4 fxe4 Nxe5 Nf6",
              "Desarrollo normal: el negro renuncia a la dama activa pero evita las complicaciones de ...Qg5.",
            ],
          ],
          keys: [6],
          plans: [
            "d4 y Qh5+ contra g7, con la columna f abierta para la torre.",
            "...Qxg2 y ...d6 con ...Nc6; la dama blanca en h1 queda atrapada si el ataque no llega.",
          ],
          sources: [
            ["engine", "Stockfish 19, profundidad 18"],
            ["database", "Chess Cloud Database (chessdb.cn)", "https://www.chessdb.cn/"],
            ["book", "Wikipedia: Latvian Gambit, 3.Bc4", "https://en.wikipedia.org/wiki/Latvian_Gambit"],
          ],
          conf: "C",
        },
      ],
      [
        "3.exf5: aceptar el gambito",
        "Si el blanco toma el peón, ...e4 expulsa al caballo y el negro recupera material con ...Nf6. Aun así el motor da +1,08: el gambito no se sostiene con juego exacto.",
        "e4 e5 Nf3 f5 exf5 e4 Ne5 Nf6",
        {
          keys: [5],
          plans: [
            "Be2 y d3 contra e4, cambiar en f6 y jugar contra e4 con Nc3.",
            "...Be7 y ...Nc6 con ...d6 para recuperar f5; el caballo de e5 es la pieza a eliminar.",
          ],
          sources: [
            ["engine", "Stockfish 19, profundidad 18"],
            ["database", "Chess Cloud Database (chessdb.cn)", "https://www.chessdb.cn/"],
            ["book", "Wikipedia: Latvian Gambit, 3.exf5", "https://en.wikipedia.org/wiki/Latvian_Gambit"],
          ],
          conf: "D",
        },
      ],
    ],
  }),
  course({
    id: "kalashnikov",
    name: "Kalashnikov Sicilian",
    category: "black",
    side: "black",
    levels: ["intermediate", "advanced"],
    elo: "1000–2100",
    status: "published",
    summary:
      "En preparación: la Siciliana favorita de Levy, prima de la Sveshnikov, con ...e5 y un juego posicional muy sólido.",
    chapters: [
      [
        "El esquema con ...e5",
        "El negro golpea d4 y juega ...d6 y ...Be6. La estructura es flexible y aguanta bien los ataques blancos.",
        "e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 e5 Nb5 d6 N1c3 a6 Na3",
      ],
    ],
  }),
  course({
    id: "french",
    name: "The French Defense",
    category: "black",
    side: "black",
    levels: ["beginner", "intermediate"],
    elo: "500–1900",
    status: "published",
    summary:
      "En preparación: una defensa de bloque contra el centro blanco. Poco espacio, pero una estructura que aguanta toda la partida.",
    chapters: [
      [
        "El bloque ...e6 y ...d5",
        "El negro acepta menos espacio para atacar el peón e4 con ...c5 y ...f6. El alfil de c8 es el problema a resolver.",
        "e4 e6 d4 d5 Nc3 Nf6 e5 Nfd7 f4 c5 Nf3 Nc6",
      ],
    ],
  }),
];
