// src/services/P2PManager.ts

import type { DataConnection, Peer } from "peerjs";
import { updateP2PStore } from '$lib/stores/P2PConnection';  // Atualize isso para o caminho correto do seu arquivo de store


export class PeerManager {
    private peer: Peer | null = null;
    private isHost: boolean = false;


    async initializePeer(isHost: boolean): Promise<void> {
        this.isHost = isHost;
        const Peer = (await import("peerjs")).default;
        this.peer = new Peer({ debug: 2 });
        updateP2PStore(draft => {
            draft.peer = this.peer;
        });

        this.peer.on("open", (id) => {
            console.log(`Peer ID: ${id}`);
            updateP2PStore(draft => {
                draft.roomId = id;
            });
        });

        this.peer.on("connection", this.handleConnection.bind(this));
    }

    handleConnection(conn: DataConnection): void {
        console.log(`Connection established with: ${conn.peer}`);
        if (this.isHost) {
            this.handleHostConnection(conn);
        }
    }

    handleHostConnection(conn: DataConnection): void {
        updateP2PStore(draft => {
            draft.connections.push(conn);
            draft.usersInRoom.push(conn.metadata.nickname);
        });
    }

    connectToPeer(peerId: string, nickname: string): DataConnection | null {
        if (!this.peer) {
            console.error("Peer object is not initialized");
            return null;
        }

        const conn = this.peer.connect(peerId, { metadata: { nickname } });
        conn.on("open", () => {
            console.log(`Connected to peer: ${conn.peer}`);
            updateP2PStore(draft => {
                if (!draft.connections.find(c => c.peer === conn.peer))
                    draft.connections.push(conn);
                draft.usersInRoom.push(conn.metadata.nickname);
                draft.connectedPeerId = conn.peer;
            });
        });

        return conn;
    }
}