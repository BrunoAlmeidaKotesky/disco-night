import type { DataConnection } from "peerjs";
import type Peer from "peerjs";

export interface P2PStore {
    peer: Peer | null;
    connections: DataConnection[];
    connectedPeerId: string | null;
    hostNickname: string;
    roomId: string;
    usersInRoom: string[];
}