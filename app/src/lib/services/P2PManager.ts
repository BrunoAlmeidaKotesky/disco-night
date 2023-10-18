// src/services/P2PManager.ts

import type { DataConnection, Peer } from "peerjs";
import {
    peerStore,
    connectionsStore,
    connectedPeerIdStore,
    roomIdStore,
    usersInRoomStore,
} from '$lib/stores/P2PConnection';  // Atualize isso para o caminho correto do seu arquivo de store


export class PeerManager {
    private peer: Peer | null = null;
    private isHost: boolean = false;

    constructor() { }

    async initializePeer(isHost: boolean): Promise<void> {
        this.isHost = isHost;
        const Peer = (await import("peerjs")).default;
        this.peer = new Peer({ debug: 2 });
        peerStore.set(this.peer);

        this.peer.on("open", (id) => {
            console.log(`Peer ID: ${id}`);
            roomIdStore.set(id);  // Atualize a store com o ID do peer
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
        // Lógica específica do host
        connectionsStore.update(connections => [...connections, conn]);  // Atualize a store com a conexão estabelecida
        usersInRoomStore.update(users => [...users, conn.metadata.nickname]);  // Atualize a lista de usuários
    }

    connectToPeer(peerId: string, nickname: string): DataConnection | null {
        if (!this.peer) {
            console.error("Peer object is not initialized");
            return null;
        }

        const conn = this.peer.connect(peerId, { metadata: { nickname } });
        conn.on("open", () => {
            console.log(`Connected to peer: ${conn.peer}`);
            connectedPeerIdStore.set(conn.peer);  // Atualize a store com o ID do peer conectado
            usersInRoomStore.update(users => [...users, conn.metadata.nickname]);
        });

        return conn;
    }
}