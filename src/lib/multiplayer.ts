export interface MultiplayerGameState {
  roomId: string;
  creatorSide: "w" | "b";
  fen: string;
  history: string[];
  lastMove: { from: string; to: string } | null;
  turn: "w" | "b";
  whiteTime: number; // segundos restantes
  blackTime: number;
  status: "waiting" | "active" | "checkmate" | "draw" | "resigned" | "timeout";
  winner: "w" | "b" | "draw" | null;
  drawOffer: "w" | "b" | null;
  connectedPlayers: number;
}

export type MultiplayerMessage =
  | { type: "JOIN_ROOM"; roomId: string; clientId: string }
  | { type: "ROOM_STATE"; state: MultiplayerGameState }
  | { type: "MAKE_MOVE"; roomId: string; from: string; to: string; promotion?: string; fen: string; history: string[] }
  | { type: "OFFER_DRAW"; roomId: string; fromSide: "w" | "b" }
  | { type: "ACCEPT_DRAW"; roomId: string }
  | { type: "RESIGN"; roomId: string; side: "w" | "b" };

const CHANNEL_NAME = "nk_chess_multiplayer_bus";
const STORAGE_PREFIX = "nk_chess_room_";

export class MultiplayerClient {
  private channel: BroadcastChannel | null = null;
  private onStateChange: ((state: MultiplayerGameState) => void) | null = null;
  private currentRoomId: string | null = null;
  public clientId: string;

  constructor() {
    this.clientId = "user_" + Math.random().toString(36).substring(2, 9);
    if (typeof window !== "undefined" && "BroadcastChannel" in window) {
      this.channel = new BroadcastChannel(CHANNEL_NAME);
      this.channel.onmessage = (event: MessageEvent<MultiplayerMessage>) => {
        this.handleMessage(event.data);
      };
    }

    if (typeof window !== "undefined") {
      window.addEventListener("storage", (e) => {
        if (e.key && e.key.startsWith(STORAGE_PREFIX) && e.newValue) {
          try {
            const state = JSON.parse(e.newValue) as MultiplayerGameState;
            if (this.currentRoomId && state.roomId === this.currentRoomId) {
              this.onStateChange?.(state);
            }
          } catch {
            // Ignore malformed storage events
          }
        }
      });
    }
  }

  public subscribe(callback: (state: MultiplayerGameState) => void): () => void {
    this.onStateChange = callback;
    return () => {
      this.onStateChange = null;
    };
  }

  public createRoom(creatorSide: "w" | "b" = "w", initialTimeMinutes: number = 10): MultiplayerGameState {
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    const roomId = `NK-${code}`;
    this.currentRoomId = roomId;

    const initialState: MultiplayerGameState = {
      roomId,
      creatorSide,
      fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
      history: [],
      lastMove: null,
      turn: "w",
      whiteTime: initialTimeMinutes * 60,
      blackTime: initialTimeMinutes * 60,
      status: "waiting",
      winner: null,
      drawOffer: null,
      connectedPlayers: 1,
    };

    this.saveState(initialState);
    return initialState;
  }

  public joinRoom(roomId: string): MultiplayerGameState | null {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}${roomId}`);
    if (!raw) return null;
    this.currentRoomId = roomId;
    const state = JSON.parse(raw) as MultiplayerGameState;
    state.connectedPlayers = 2;
    state.status = "active";
    this.saveState(state);
    this.broadcast({ type: "JOIN_ROOM", roomId, clientId: this.clientId });
    return state;
  }

  public getRoom(roomId: string): MultiplayerGameState | null {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}${roomId}`);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as MultiplayerGameState;
    } catch {
      return null;
    }
  }

  public sendMove(from: string, to: string, promotion: string | undefined, newFen: string, history: string[]): void {
    if (!this.currentRoomId) return;
    const state = this.getRoom(this.currentRoomId);
    if (!state) return;

    state.fen = newFen;
    state.history = history;
    state.lastMove = { from, to };
    state.turn = state.turn === "w" ? "b" : "w";
    this.saveState(state);

    this.broadcast({
      type: "MAKE_MOVE",
      roomId: this.currentRoomId,
      from,
      to,
      promotion,
      fen: newFen,
      history,
    });
  }

  public resign(side: "w" | "b"): void {
    if (!this.currentRoomId) return;
    const state = this.getRoom(this.currentRoomId);
    if (!state) return;
    state.status = "resigned";
    state.winner = side === "w" ? "b" : "w";
    this.saveState(state);
    this.broadcast({ type: "RESIGN", roomId: this.currentRoomId, side });
  }

  public offerDraw(side: "w" | "b"): void {
    if (!this.currentRoomId) return;
    const state = this.getRoom(this.currentRoomId);
    if (!state) return;
    state.drawOffer = side;
    this.saveState(state);
    this.broadcast({ type: "OFFER_DRAW", roomId: this.currentRoomId, fromSide: side });
  }

  public acceptDraw(): void {
    if (!this.currentRoomId) return;
    const state = this.getRoom(this.currentRoomId);
    if (!state) return;
    state.status = "draw";
    state.winner = "draw";
    state.drawOffer = null;
    this.saveState(state);
    this.broadcast({ type: "ACCEPT_DRAW", roomId: this.currentRoomId });
  }

  private saveState(state: MultiplayerGameState): void {
    try {
      localStorage.setItem(`${STORAGE_PREFIX}${state.roomId}`, JSON.stringify(state));
    } catch {
      // Storage quota or blocked
    }
    this.onStateChange?.(state);
    this.broadcast({ type: "ROOM_STATE", state });
  }

  private broadcast(message: MultiplayerMessage): void {
    try {
      this.channel?.postMessage(message);
    } catch {
      // Ignored
    }
  }

  private handleMessage(msg: MultiplayerMessage): void {
    if (!this.currentRoomId || ("roomId" in msg && msg.roomId !== this.currentRoomId)) return;

    if (msg.type === "ROOM_STATE") {
      this.onStateChange?.(msg.state);
    } else if (msg.type === "JOIN_ROOM") {
      const state = this.getRoom(this.currentRoomId);
      if (state) {
        state.connectedPlayers = 2;
        state.status = "active";
        this.saveState(state);
      }
    } else if (msg.type === "MAKE_MOVE") {
      const state = this.getRoom(this.currentRoomId);
      if (state) {
        state.fen = msg.fen;
        state.history = msg.history;
        state.lastMove = { from: msg.from, to: msg.to };
        state.turn = state.turn === "w" ? "b" : "w";
        this.saveState(state);
      }
    } else if (msg.type === "OFFER_DRAW") {
      const state = this.getRoom(this.currentRoomId);
      if (state) {
        state.drawOffer = msg.fromSide;
        this.saveState(state);
      }
    } else if (msg.type === "ACCEPT_DRAW") {
      const state = this.getRoom(this.currentRoomId);
      if (state) {
        state.status = "draw";
        state.winner = "draw";
        state.drawOffer = null;
        this.saveState(state);
      }
    } else if (msg.type === "RESIGN") {
      const state = this.getRoom(this.currentRoomId);
      if (state) {
        state.status = "resigned";
        state.winner = msg.side === "w" ? "b" : "w";
        this.saveState(state);
      }
    }
  }

  public destroy(): void {
    this.channel?.close();
  }
}
